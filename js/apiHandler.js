/**
 * API调用封装模块
 * 处理所有API请求
 */

const APIHandler = {
    /**
     * 从词库获取词汇
     */
    generateWords(theme) {
        // 直接从词库获取词汇
        const wordsData = getVocabulary(theme);
        return wordsData;
    },

    /**
     * 创建图片生成任务
     */
    async createImageTask(prompt) {
        const apiKey = Storage.getNanoKey();
        if (!apiKey) {
            throw new Error('请先设置Nano Banana Pro API密钥');
        }

        try {
            const response = await fetch(`${CONFIG.NANO_BANANA_API.BASE_URL}/createTask`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: CONFIG.NANO_BANANA_API.MODEL,
                    input: {
                        prompt: prompt,
                        aspect_ratio: CONFIG.IMAGE_PARAMS.ASPECT_RATIO,
                        resolution: CONFIG.IMAGE_PARAMS.RESOLUTION,
                        output_format: CONFIG.IMAGE_PARAMS.OUTPUT_FORMAT
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`创建任务失败: ${errorData.msg || response.statusText}`);
            }

            const data = await response.json();

            if (data.code !== 200) {
                throw new Error(`创建任务失败: ${data.msg}`);
            }

            return data.data.taskId;

        } catch (error) {
            console.error('创建图片任务失败:', error);
            throw error;
        }
    },

    /**
     * 查询任务状态
     */
    async queryTaskStatus(taskId) {
        const apiKey = Storage.getNanoKey();

        try {
            const response = await fetch(
                `${CONFIG.NANO_BANANA_API.BASE_URL}/recordInfo?taskId=${taskId}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`查询任务失败: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.code !== 200) {
                throw new Error(`查询任务失败: ${data.msg}`);
            }

            return data.data;

        } catch (error) {
            console.error('查询任务状态失败:', error);
            throw error;
        }
    },

    /**
     * 轮询任务直到完成
     */
    async pollTaskCompletion(taskId) {
        const startTime = Date.now();

        while (true) {
            // 检查超时
            const elapsed = Date.now() - startTime;
            if (elapsed > CONFIG.NANO_BANANA_API.MAX_POLL_TIME) {
                throw new Error('生成超时，请重试');
            }

            // 查询任务状态
            const taskData = await this.queryTaskStatus(taskId);

            // 检查状态
            if (taskData.state === 'success') {
                // 解析结果
                const resultJson = JSON.parse(taskData.resultJson);
                if (resultJson.resultUrls && resultJson.resultUrls.length > 0) {
                    return resultJson.resultUrls[0];
                }
                throw new Error('未获取到图片URL');
            }

            if (taskData.state === 'fail') {
                throw new Error(`生成失败: ${taskData.failMsg || '未知错误'}`);
            }

            // 等待后继续轮询
            await this.sleep(CONFIG.NANO_BANANA_API.POLL_INTERVAL);
        }
    },

    /**
     * 延迟函数
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * 完整生成流程（供外部调用）
     */
    async generateImage(theme, title) {
        // 步骤1：从词库获取词汇
        const words = this.generateWords(theme);

        // 步骤2：构建提示词
        const prompt = PromptBuilder.build(theme, title, words);

        // 步骤3：创建任务
        const taskId = await this.createImageTask(prompt);

        // 步骤4：轮询完成
        const imageUrl = await this.pollTaskCompletion(taskId);

        return {
            imageUrl,
            words,
            prompt
        };
    }
};

// 导出API处理模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIHandler;
}
