/**
 * 主应用模块
 * 协调各模块，处理整体流程
 */

const App = {
    state: {
        nanoKey: null
    },

    /**
     * 初始化应用
     */
    async init() {
        try {
            // 初始化UI
            UIHandler.init();

            console.log('应用初始化完成');
        } catch (error) {
            console.error('应用初始化失败:', error);
            UIHandler.showToast('应用初始化失败', 'error');
        }
    },

    /**
     * 开始生成流程
     */
    async startGeneration(theme, title) {
        try {
            // 步骤1：获取词汇
            UIHandler.updateProgress(1, '正在获取词汇...');
            const words = APIHandler.generateWords(theme);

            // 构建提示词
            const prompt = PromptBuilder.build(theme, title, words);

            // 步骤2：创建图片任务并轮询
            UIHandler.updateProgress(2, '正在生成图片...');
            const taskId = await APIHandler.createImageTask(prompt);

            // 步骤3：轮询等待结果
            UIHandler.updateProgress(3, '正在渲染...');
            const imageUrl = await APIHandler.pollTaskCompletion(taskId);

            // 准备数据
            const data = {
                id: Date.now(),
                theme,
                title,
                words,
                prompt,
                timestamp: Date.now()
            };

            // 显示结果
            UIHandler.showResult(imageUrl, data);

        } catch (error) {
            console.error('生成失败:', error);
            throw error;
        }
    }
};

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// 导出应用对象
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
