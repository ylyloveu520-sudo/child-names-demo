/**
 * 提示词构建模块
 * 基于模板生成完整的图片生成提示词
 */

const PromptBuilder = {
    /**
     * 格式化词汇列表
     */
    formatWords(wordsData) {
        const categories = {
            '核心角色与设施': '',
            '常见物品/工具': '',
            '环境与装饰': ''
        };

        // 格式化每个类别的词汇
        for (const [category, words] of Object.entries(wordsData)) {
            if (categories.hasOwnProperty(category)) {
                categories[category] = words.map(w =>
                    `${w.pinyin} ${w.word}`
                ).join(', ');
            }
        }

        return categories;
    },

    /**
     * 构建完整提示词
     */
    build(theme, title, wordsData) {
        const formattedWords = this.formatWords(wordsData);

        let prompt = CONFIG.PROMPT_TEMPLATE;
        prompt = prompt.replace(/{theme}/g, theme);
        prompt = prompt.replace(/{title}/g, title);
        prompt = prompt.replace(/{category_1}/g, formattedWords['核心角色与设施'] || '请根据场景自行添加');
        prompt = prompt.replace(/{category_2}/g, formattedWords['常见物品/工具'] || '请根据场景自行添加');
        prompt = prompt.replace(/{category_3}/g, formattedWords['环境与装饰'] || '请根据场景自行添加');

        return prompt;
    }
};

// 导出提示词构建模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PromptBuilder;
}
