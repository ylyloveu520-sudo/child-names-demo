/**
 * UI交互处理模块
 * 处理所有DOM操作和用户交互
 */

const UIHandler = {
    state: {
        isGenerating: false,
        currentGeneration: null
    },

    /**
     * 初始化UI
     */
    init() {
        this.bindEvents();
        this.loadHistory();
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        // 设置API密钥按钮
        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.showSettingsModal();
        });

        // 历史记录按钮
        document.getElementById('historyBtn').addEventListener('click', () => {
            this.showHistorySidebar();
        });

        // 生成按钮
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.handleGenerate();
        });

        // 保存API密钥
        document.getElementById('saveKeysBtn').addEventListener('click', () => {
            this.saveApiKeys();
        });

        // 下载图片
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadImage();
        });

        // 重新生成
        document.getElementById('regenerateBtn').addEventListener('click', () => {
            this.handleGenerate();
        });

        // 复制词汇
        document.getElementById('copyWordsBtn').addEventListener('click', () => {
            this.copyWords();
        });

        // 清空历史
        document.getElementById('clearHistoryBtn').addEventListener('click', () => {
            this.clearHistory();
        });

        // 模态框关闭
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // 点击模态框背景关闭
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // 侧边栏关闭
        document.querySelector('.sidebar-close').addEventListener('click', () => {
            document.getElementById('historySidebar').style.display = 'none';
        });
    },

    /**
     * 显示设置模态框
     */
    showSettingsModal() {
        const nanoKey = Storage.getNanoKey();
        document.getElementById('nanoKeyInput').value = nanoKey;

        document.getElementById('settingsModal').style.display = 'flex';
    },

    /**
     * 保存API密钥
     */
    saveApiKeys() {
        const nanoKey = document.getElementById('nanoKeyInput').value.trim();
        Storage.saveNanoKey(nanoKey);

        document.getElementById('settingsModal').style.display = 'none';
        this.showToast('API密钥已保存', 'success');
    },

    /**
     * 加载历史记录
     */
    loadHistory() {
        const history = Storage.getHistory();
        this.renderHistory(history);
    },

    /**
     * 渲染历史记录
     */
    renderHistory(history) {
        const container = document.getElementById('historyList');

        if (history.length === 0) {
            container.innerHTML = '<p class="empty-message">暂无生成记录</p>';
            return;
        }

        // 按日期分组
        const grouped = this.groupByDate(history);

        let html = '';
        for (const [date, records] of Object.entries(grouped)) {
            html += `<div class="history-group">
                <h4 class="history-date">${date}</h4>`;

            for (const record of records) {
                const time = new Date(record.timestamp).toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                html += `
                    <div class="history-item" data-id="${record.id}">
                        <div class="history-info">
                            <span class="history-title">${record.title}</span>
                            <span class="history-time">${time}</span>
                        </div>
                        <div class="history-actions">
                            <button class="btn-view" data-id="${record.id}">查看</button>
                            <button class="btn-delete" data-id="${record.id}">删除</button>
                        </div>
                    </div>
                `;
            }

            html += '</div>';
        }

        container.innerHTML = html;

        // 绑定历史记录事件
        container.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.viewHistoryRecord(id);
            });
        });

        container.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.deleteHistoryRecord(id);
            });
        });
    },

    /**
     * 按日期分组
     */
    groupByDate(records) {
        const grouped = {};

        for (const record of records) {
            const date = new Date(record.timestamp);
            const dateStr = date.toLocaleDateString('zh-CN', {
                month: 'long',
                day: 'numeric'
            });

            if (!grouped[dateStr]) {
                grouped[dateStr] = [];
            }

            grouped[dateStr].push(record);
        }

        return grouped;
    },

    /**
     * 查看历史记录
     */
    viewHistoryRecord(id) {
        const history = Storage.getHistory();
        const record = history.find(r => r.id === id);

        if (record) {
            this.state.currentGeneration = record;
            this.showResult(record.imageUrl, record);
            document.getElementById('historySidebar').style.display = 'none';
        }
    },

    /**
     * 删除历史记录
     */
    deleteHistoryRecord(id) {
        if (confirm('确定要删除这条记录吗？')) {
            Storage.deleteRecord(id);
            this.loadHistory();
            this.showToast('记录已删除', 'success');
        }
    },

    /**
     * 显示历史侧边栏
     */
    showHistorySidebar() {
        this.loadHistory();
        document.getElementById('historySidebar').style.display = 'block';
    },

    /**
     * 清空历史
     */
    clearHistory() {
        if (confirm('确定要清空所有历史记录吗？此操作不可恢复！')) {
            Storage.clearHistory();
            this.loadHistory();
            this.showToast('历史记录已清空', 'success');
        }
    },

    /**
     * 处理生成
     */
    async handleGenerate() {
        if (this.state.isGenerating) {
            return;
        }

        // 检查API密钥
        if (!Storage.hasValidKey()) {
            this.showToast('请先设置API密钥', 'error');
            this.showSettingsModal();
            return;
        }

        // 获取输入
        const theme = document.getElementById('themeInput').value.trim();
        const title = document.getElementById('titleInput').value.trim();

        if (!theme || !title) {
            this.showToast('请输入主题和标题', 'error');
            return;
        }

        // 开始生成
        this.state.isGenerating = true;
        this.updateGenerateButton(true);
        this.showProgressSection();

        try {
            // 调用应用层生成方法
            await App.startGeneration(theme, title);
        } catch (error) {
            this.showToast(error.message, 'error');
            this.hideProgressSection();
            this.state.isGenerating = false;
            this.updateGenerateButton(false);
        }
    },

    /**
     * 更新生成按钮状态
     */
    updateGenerateButton(isGenerating) {
        const btn = document.getElementById('generateBtn');
        btn.disabled = isGenerating;
        btn.innerHTML = isGenerating
            ? '<span>⏳</span> 生成中...'
            : '<span>🚀</span> 开始生成小报';
    },

    /**
     * 显示进度区域
     */
    showProgressSection() {
        document.getElementById('progressSection').style.display = 'block';
        document.getElementById('resultSection').style.display = 'none';
        this.resetProgressSteps();
    },

    /**
     * 隐藏进度区域
     */
    hideProgressSection() {
        document.getElementById('progressSection').style.display = 'none';
    },

    /**
     * 重置进度步骤
     */
    resetProgressSteps() {
        document.querySelectorAll('.progress-step').forEach(step => {
            step.classList.remove('completed', 'active');
            step.querySelector('.step-icon').textContent = '⏳';
        });
        document.getElementById('progressFill').style.width = '0%';
    },

    /**
     * 更新进度
     */
    updateProgress(step, message) {
        const steps = document.querySelectorAll('.progress-step');

        // 标记之前的步骤为完成
        for (let i = 1; i < step; i++) {
            steps[i - 1].classList.add('completed');
            steps[i - 1].classList.remove('active');
            steps[i - 1].querySelector('.step-icon').textContent = '✅';
        }

        // 标记当前步骤为活动
        steps[step - 1].classList.add('active');
        steps[step - 1].querySelector('.step-text').textContent = message;

        // 更新进度条
        const progress = (step / 3) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
    },

    /**
     * 显示生成结果
     */
    showResult(imageUrl, data) {
        // 隐藏进度区域
        this.hideProgressSection();

        // 显示结果区域
        document.getElementById('resultSection').style.display = 'block';

        // 设置图片
        document.getElementById('generatedImage').src = imageUrl;

        // 显示词汇列表
        this.renderWordsList(data.words);

        // 保存当前生成数据
        this.state.currentGeneration = {
            ...data,
            imageUrl
        };

        // 保存到历史
        Storage.saveGeneration(this.state.currentGeneration);

        // 重置生成状态
        this.state.isGenerating = false;
        this.updateGenerateButton(false);
    },

    /**
     * 渲染词汇列表
     */
    renderWordsList(wordsData) {
        const container = document.getElementById('wordsList');

        let html = '';
        for (const [category, words] of Object.entries(wordsData)) {
            html += `<div class="words-category">
                <h4>${category}</h4>
                <div class="words-items">`;

            for (const word of words) {
                html += `<span class="word-tag">
                    <span class="word-pinyin">${word.pinyin}</span>
                    <span class="word-hanzi">${word.word}</span>
                </span>`;
            }

            html += `</div></div>`;
        }

        container.innerHTML = html;
    },

    /**
     * 下载图片
     */
    async downloadImage() {
        if (!this.state.currentGeneration) {
            return;
        }

        const imageUrl = this.state.currentGeneration.imageUrl;
        const title = this.state.currentGeneration.title;

        try {
            // 尝试使用fetch下载（需要服务器支持CORS）
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `${title}_${Date.now()}.png`;
            link.click();

            URL.revokeObjectURL(url);
            this.showToast('图片已下载', 'success');
        } catch (error) {
            console.error('CORS下载失败，尝试新窗口打开:', error);
            // 如果CORS失败，在新标签页打开图片
            window.open(imageUrl, '_blank');
            this.showToast('图片已在新窗口打开，请右键"另存为"保存', 'warning');
        }
    },

    /**
     * 复制词汇
     */
    copyWords() {
        if (!this.state.currentGeneration) {
            return;
        }

        const wordsData = this.state.currentGeneration.words;
        let text = '';

        for (const [category, words] of Object.entries(wordsData)) {
            text += `${category}:\n`;
            for (const word of words) {
                text += `  ${word.pinyin} ${word.word}\n`;
            }
            text += '\n';
        }

        navigator.clipboard.writeText(text).then(() => {
            this.showToast('词汇列表已复制', 'success');
        }).catch(() => {
            this.showToast('复制失败', 'error');
        });
    },

    /**
     * 显示提示消息
     */
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'block';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
};

// 导出UI处理模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIHandler;
}
