/**
 * 预置词库模块
 * 为常见场景预置识字词汇
 */

const VOCABULARY = {
    '超市': {
        '核心角色与设施': [
            { word: '收银员', pinyin: 'shōu yín yuán' },
            { word: '货架', pinyin: 'huò jià' },
            { word: '购物车', pinyin: 'gòu wù chē' },
            { word: '收银台', pinyin: 'shōu yín tái' },
            { word: '促销员', pinyin: 'cù xiāo yuán' }
        ],
        '常见物品/工具': [
            { word: '苹果', pinyin: 'píng guǒ' },
            { word: '牛奶', pinyin: 'niú nǎi' },
            { word: '面包', pinyin: 'miàn bāo' },
            { word: '鸡蛋', pinyin: 'jī dàn' },
            { word: '蔬菜', pinyin: 'shū cài' },
            { word: '糖果', pinyin: 'táng guǒ' },
            { word: '饼干', pinyin: 'bǐng gān' },
            { word: '果汁', pinyin: 'guǒ zhī' }
        ],
        '环境与装饰': [
            { word: '入口', pinyin: 'rù kǒu' },
            { word: '出口', pinyin: 'chū kǒu' },
            { word: '灯', pinyin: 'dēng' },
            { word: '价格标签', pinyin: 'jià gé biāo qiān' },
            { word: '购物篮', pinyin: 'gòu wù lán' }
        ]
    },

    '医院': {
        '核心角色与设施': [
            { word: '医生', pinyin: 'yī shēng' },
            { word: '护士', pinyin: 'hù shi' },
            { word: '病床', pinyin: 'bìng chuáng' },
            { word: '药房', pinyin: 'yào fáng' },
            { word: '挂号处', pinyin: 'guà hào chù' }
        ],
        '常见物品/工具': [
            { word: '听诊器', pinyin: 'tīng zhēn qì' },
            { word: '体温计', pinyin: 'tǐ wēn jì' },
            { word: '药片', pinyin: 'yào piàn' },
            { word: '口罩', pinyin: 'kǒu zhào' },
            { word: '针筒', pinyin: 'zhēn tǒng' },
            { word: '绷带', pinyin: 'bēng dài' },
            { word: '药水', pinyin: 'yào shuǐ' },
            { word: '压舌板', pinyin: 'yā shé bǎn' }
        ],
        '环境与装饰': [
            { word: '病房', pinyin: 'bìng fáng' },
            { word: '候诊区', pinyin: 'hòu zhěn qū' },
            { word: '急诊', pinyin: 'jí zhēn' },
            { word: '十字标志', pinyin: 'shí zì biāo zhì' },
            { word: '椅子', pinyin: 'yǐ zi' }
        ]
    },

    '公园': {
        '核心角色与设施': [
            { word: '园丁', pinyin: 'yuán dīng' },
            { word: '长椅', pinyin: 'cháng yǐ' },
            { word: '凉亭', pinyin: 'liáng tíng' },
            { word: '滑梯', pinyin: 'huá tī' },
            { word: '秋千', pinyin: 'qiū qiān' }
        ],
        '常见物品/工具': [
            { word: '树木', pinyin: 'shù mù' },
            { word: '花朵', pinyin: 'huā duǒ' },
            { word: '草地', pinyin: 'cǎo dì' },
            { word: '蝴蝶', pinyin: 'hú dié' },
            { word: '小鸟', pinyin: 'xiǎo niǎo' },
            { word: '风筝', pinyin: 'fēng zheng' },
            { word: '气球', pinyin: 'qì qiú' },
            { word: '足球', pinyin: 'zú qiú' }
        ],
        '环境与装饰': [
            { word: '小路', pinyin: 'xiǎo lù' },
            { word: '喷泉', pinyin: 'pēn quán' },
            { word: '石头', pinyin: 'shí tou' },
            { word: '太阳', pinyin: 'tài yáng' },
            { word: '云朵', pinyin: 'yún duǒ' }
        ]
    },

    '动物园': {
        '核心角色与设施': [
            { word: '饲养员', pinyin: 'sì yǎng yuán' },
            { word: '笼子', pinyin: 'lóng zi' },
            { word: '围栏', pinyin: 'wéi lán' },
            { word: '鸟舍', pinyin: 'niǎo shè' },
            { word: '科普牌', pinyin: 'kē pǔ pái' }
        ],
        '常见物品/工具': [
            { word: '狮子', pinyin: 'shī zi' },
            { word: '大象', pinyin: 'dà xiàng' },
            { word: '猴子', pinyin: 'hóu zi' },
            { word: '熊猫', pinyin: 'xióng māo' },
            { word: '长颈鹿', pinyin: 'cháng jǐng lù' },
            { word: '兔子', pinyin: 'tù zi' },
            { word: '孔雀', pinyin: 'kǒng què' },
            { word: '鹦鹉', pinyin: 'yīng wǔ' }
        ],
        '环境与装饰': [
            { word: '水池', pinyin: 'shuǐ chí' },
            { word: '假山', pinyin: 'jiǎ shān' },
            { word: '树林', pinyin: 'shù lín' },
            { word: '游客', pinyin: 'yóu kè' },
            { word: '地图', pinyin: 'dì tú' }
        ]
    },

    '学校': {
        '核心角色与设施': [
            { word: '老师', pinyin: 'lǎo shī' },
            { word: '黑板', pinyin: 'hēi bǎn' },
            { word: '讲台', pinyin: 'jiǎng tái' },
            { word: '课桌', pinyin: 'kè zhuō' },
            { word: '图书馆', pinyin: 'tú shū guǎn' }
        ],
        '常见物品/工具': [
            { word: '书本', pinyin: 'shū běn' },
            { word: '铅笔', pinyin: 'qiān bǐ' },
            { word: '橡皮', pinyin: 'xiàng pí' },
            { word: '书包', pinyin: 'shū bāo' },
            { word: '尺子', pinyin: 'chǐ zi' },
            { word: '剪刀', pinyin: 'jiǎn dāo' },
            { word: '胶水', pinyin: 'jiāo shuǐ' },
            { word: '彩笔', pinyin: 'cǎi bǐ' }
        ],
        '环境与装饰': [
            { word: '教室', pinyin: 'jiào shì' },
            { word: '操场', pinyin: 'cāo chǎng' },
            { word: '校门', pinyin: 'xiào mén' },
            { word: '国旗', pinyin: 'guó qí' },
            { word: '钟表', pinyin: 'zhōng biǎo' }
        ]
    },

    '图书馆': {
        '核心角色与设施': [
            { word: '图书管理员', pinyin: 'tú shū guǎn lǐ yuán' },
            { word: '书架', pinyin: 'shū jià' },
            { word: '阅览桌', pinyin: 'yuè lǎn zhuō' },
            { word: '服务台', pinyin: 'fú wù tái' },
            { word: '自助借书机', pinyin: 'zì zhù jiè shū jī' }
        ],
        '常见物品/工具': [
            { word: '故事书', pinyin: 'gù shi shū' },
            { word: '绘本', pinyin: 'huì běn' },
            { word: '杂志', pinyin: 'zá zhì' },
            { word: '报纸', pinyin: 'bào zhǐ' },
            { word: '书签', pinyin: 'shū qiān' },
            { word: '电脑', pinyin: 'diàn nǎo' },
            { word: '耳机', pinyin: 'ěr jī' },
            { word: '放大镜', pinyin: 'fàng dà jìng' }
        ],
        '环境与装饰': [
            { word: '安静标志', pinyin: 'ān jìng biāo zhì' },
            { word: '阅读区', pinyin: 'yuè dú qū' },
            { word: '儿童区', pinyin: 'ér tóng qū' },
            { word: '沙发', pinyin: 'shā fā' },
            { word: '台灯', pinyin: 'tái dēng' }
        ]
    },

    '厨房': {
        '核心角色与设施': [
            { word: '厨师', pinyin: 'chú shī' },
            { word: '灶台', pinyin: 'zào tái' },
            { word: '水槽', pinyin: 'shuǐ cáo' },
            { word: '抽油烟机', pinyin: 'chōu yóu yān jī' },
            { word: '橱柜', pinyin: 'chú guì' }
        ],
        '常见物品/工具': [
            { word: '锅', pinyin: 'guō' },
            { word: '铲子', pinyin: 'chǎn zi' },
            { word: '菜刀', pinyin: 'cài dāo' },
            { word: '砧板', pinyin: 'zhēn bǎn' },
            { word: '碗', pinyin: 'wǎn' },
            { word: '盘子', pinyin: 'pán zi' },
            { word: '筷子', pinyin: 'kuài zi' },
            { word: '勺子', pinyin: 'sháo zi' }
        ],
        '环境与装饰': [
            { word: '冰箱', pinyin: 'bīng xiāng' },
            { word: '微波炉', pinyin: 'wēi bō lú' },
            { word: '烤箱', pinyin: 'kǎo xiāng' },
            { word: '洗碗机', pinyin: 'xǐ wǎn jī' },
            { word: '垃圾桶', pinyin: 'lā jī tǒng' }
        ]
    },

    '火车站': {
        '核心角色与设施': [
            { word: '列车员', pinyin: 'liè chē yuán' },
            { word: '站台', pinyin: 'zhàn tái' },
            { word: '候车室', pinyin: 'hòu chē shì' },
            { word: '售票处', pinyin: 'shòu piào chù' },
            { word: '检票口', pinyin: 'jiǎn piào kǒu' }
        ],
        '常见物品/工具': [
            { word: '火车', pinyin: 'huǒ chē' },
            { word: '行李箱', pinyin: 'xíng li xiāng' },
            { word: '车票', pinyin: 'chē piào' },
            { word: '座位', pinyin: 'zuò wèi' },
            { word: '时刻表', pinyin: 'shí kè biǎo' },
            { word: '广播', pinyin: 'guǎng bō' },
            { word: '电梯', pinyin: 'diàn tī' },
            { word: '安检仪', pinyin: 'ān jiǎn yí' }
        ],
        '环境与装饰': [
            { word: '轨道', pinyin: 'guǐ dào' },
            { word: '信号灯', pinyin: 'xìn hào dēng' },
            { word: '指示牌', pinyin: 'zhǐ shì pái' },
            { word: '出口通道', pinyin: 'chū kǒu tōng dào' },
            { word: '大钟', pinyin: 'dà zhōng' }
        ]
    },

    '消防站': {
        '核心角色与设施': [
            { word: '消防员', pinyin: 'xiāo fáng yuán' },
            { word: '消防车', pinyin: 'xiāo fáng chē' },
            { word: '车库', pinyin: 'chē kù' },
            { word: '瞭望塔', pinyin: 'liào wàng tǎ' },
            { word: '训练场', pinyin: 'xùn liàn chǎng' }
        ],
        '常见物品/工具': [
            { word: '水带', pinyin: 'shuǐ dài' },
            { word: '水枪', pinyin: 'shuǐ qiāng' },
            { word: '斧头', pinyin: 'fǔ tou' },
            { word: '云梯', pinyin: 'yún tī' },
            { word: '头盔', pinyin: 'tóu kuī' },
            { word: '防护服', pinyin: 'fáng hù fú' },
            { word: '对讲机', pinyin: 'duì jiǎng jī' },
            { word: '灭火器', pinyin: 'miè huǒ qì' }
        ],
        '环境与装饰': [
            { word: '警报器', pinyin: 'jǐng bào qì' },
            { word: '滑竿', pinyin: 'huá gān' },
            { word: '烟囱', pinyin: 'yān cōng' },
            { word: '消防栓', pinyin: 'xiāo fáng shuān' },
            { word: '红色标志', pinyin: 'hóng sè biāo zhì' }
        ]
    },

    '邮局': {
        '核心角色与设施': [
            { word: '邮递员', pinyin: 'yóu dì yuán' },
            { word: '柜台', pinyin: 'guì tái' },
            { word: '信箱', pinyin: 'xìn xiāng' },
            { word: '称重台', pinyin: 'chēng zhòng tái' },
            { word: '分拣区', pinyin: 'fēn jiǎn qū' }
        ],
        '常见物品/工具': [
            { word: '信封', pinyin: 'xìn fēng' },
            { word: '邮票', pinyin: 'yóu piào' },
            { word: '包裹', pinyin: 'bāo guǒ' },
            { word: '明信片', pinyin: 'míng xìn piàn' },
            { word: '快递单', pinyin: 'kuài dì dān' },
            { word: '印章', pinyin: 'yìn zhāng' },
            { word: '胶带', pinyin: 'jiāo dài' },
            { word: '剪刀', pinyin: 'jiǎn dāo' }
        ],
        '环境与装饰': [
            { word: '邮箱', pinyin: 'yóu xiāng' },
            { word: '邮筒', pinyin: 'yóu tǒng' },
            { word: '排队线', pinyin: 'pái duì xiàn' },
            { word: '号码牌', pinyin: 'hào mǎ pái' },
            { word: '时钟', pinyin: 'shí zhōng' }
        ]
    }
};

/**
 * 从词库中获取词汇
 * @param {string} theme - 主题/场景
 * @returns {object} 词汇数据
 */
function getVocabulary(theme) {
    // 精确匹配
    if (VOCABULARY[theme]) {
        return VOCABULARY[theme];
    }

    // 模糊匹配（包含关键词）
    for (const [key, value] of Object.entries(VOCABULARY)) {
        if (theme.includes(key) || key.includes(theme)) {
            return value;
        }
    }

    // 未找到，返回通用词库
    return getGenericVocabulary(theme);
}

/**
 * 获取通用词库（当没有预置词库时）
 */
function getGenericVocabulary(theme) {
    return {
        '核心角色与设施': [
            { word: '工作人员', pinyin: 'gōng zuò rén yuán' },
            { word: '设施', pinyin: 'shè shī' }
        ],
        '常见物品/工具': [
            { word: '物品', pinyin: 'wù pǐn' },
            { word: '工具', pinyin: 'gōng jù' },
            { word: '设备', pinyin: 'shè bèi' }
        ],
        '环境与装饰': [
            { word: '环境', pinyin: 'huán jìng' },
            { word: '装饰', pinyin: 'zhuāng shì' }
        ]
    };
}

/**
 * 获取所有可用场景列表
 */
function getAvailableThemes() {
    return Object.keys(VOCABULARY);
}

// 导出词库
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VOCABULARY, getVocabulary, getAvailableThemes };
}
