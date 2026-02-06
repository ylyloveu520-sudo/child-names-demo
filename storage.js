/**
 * 存储管理模块
 * 封装localStorage操作
 */

const Storage = {
    /**
     * 保存Nano Banana Pro API密钥
     */
    saveNanoKey(apiKey) {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEYS.NANO_KEY, apiKey);
            return true;
        } catch (error) {
            console.error('保存Nano密钥失败:', error);
            return false;
        }
    },

    /**
     * 获取Nano Banana Pro API密钥
     */
    getNanoKey() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.NANO_KEY) || '';
    },

    /**
     * 检查是否有有效的API密钥
     */
    hasValidKey() {
        const nanoKey = this.getNanoKey();
        return nanoKey.length > 0;
    },

    /**
     * 保存生成记录
     */
    saveGeneration(record) {
        try {
            const history = this.getHistory();
            history.unshift(record); // 添加到开头

            // 最多保存50条记录
            if (history.length > 50) {
                history.pop();
            }

            localStorage.setItem(CONFIG.STORAGE_KEYS.HISTORY, JSON.stringify(history));
            return true;
        } catch (error) {
            console.error('保存生成记录失败:', error);
            return false;
        }
    },

    /**
     * 获取历史记录
     */
    getHistory() {
        try {
            const historyJson = localStorage.getItem(CONFIG.STORAGE_KEYS.HISTORY);
            return historyJson ? JSON.parse(historyJson) : [];
        } catch (error) {
            console.error('读取历史记录失败:', error);
            return [];
        }
    },

    /**
     * 删除单条记录
     */
    deleteRecord(id) {
        try {
            const history = this.getHistory();
            const filtered = history.filter(record => record.id !== id);
            localStorage.setItem(CONFIG.STORAGE_KEYS.HISTORY, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('删除记录失败:', error);
            return false;
        }
    },

    /**
     * 清空历史记录
     */
    clearHistory() {
        try {
            localStorage.removeItem(CONFIG.STORAGE_KEYS.HISTORY);
            return true;
        } catch (error) {
            console.error('清空历史记录失败:', error);
            return false;
        }
    }
};

// 导出存储模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
