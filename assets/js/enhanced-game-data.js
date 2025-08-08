// 增强版游戏数据 - 100倍故事内容
const enhancedGameData = {
    // 角色深度背景设定
    characterBackgrounds: {
        顾言: {
            personality: ["理性", "温柔", "专注", "内向"],
            hobbies: ["编程", "阅读", "下棋", "听古典音乐"],
            fears: ["人多的场合", "表达情感", "被误解"],
            dreams: ["成为优秀的程序员", "找到真爱", "帮助更多人"],
            secrets: ["其实很想交朋友", "小时候很孤独", "偷偷写日记"],
            favoriteThings: ["黑咖啡", "安静的图书馆", "下雨天", "深夜编程"],
            relationshipStyle: "慢热型，需要时间建立信任"
        },
        林舟: {
            personality: ["阳光", "活泼", "忠诚", "直率"],
            hobbies: ["篮球", "跑步", "看漫画", "和朋友聚会"],
            fears: ["失去重要的人", "让人失望", "孤独"],
            dreams: ["成为体育老师", "保护喜欢的人", "建立大家庭"],
            secrets: ["其实很细心", "会做菜", "怕黑"],
            favoriteThings: ["阳光", "运动", "热闹的聚会", "甜食"],
            relationshipStyle: "直接坦率，用行动表达爱意"
        },
        宋之南: {
            personality: ["优雅", "神秘", "才华横溢", "完美主义"],
            hobbies: ["钢琴", "古典音乐", "品茶", "园艺"],
            fears: ["失去音乐才能", "不完美", "被看穿内心"],
            dreams: ["举办个人音乐会", "找到灵魂伴侣", "教出优秀学生"],
            secrets: ["有时会感到孤独", "害怕承诺", "收藏古董"],
            favoriteThings: ["月光", "钢琴声", "花香", "安静的夜晚"],
            relationshipStyle: "浪漫而深沉，追求精神共鸣"
        },
        周奕辰: {
            personality: ["天真", "热情", "好奇", "单纯"],
            hobbies: ["摄影", "旅行", "尝试新事物", "交朋友"],
            fears: ["被拒绝", "长大", "失去好奇心"],
            dreams: ["环游世界", "拍出好照片", "永远保持年轻的心"],
            secrets: ["其实很成熟", "懂得察言观色", "想要被保护"],
            favoriteThings: ["日出", "新鲜事物", "温暖的拥抱", "冒险"],
            relationshipStyle: "纯真热烈，全心全意投入"
        },
        江澈: {
            personality: ["文艺", "深沉", "敏感", "理想主义"],
            hobbies: ["写作", "阅读", "看电影", "独自思考"],
            fears: ["江郎才尽", "现实的残酷", "失去创作灵感"],
            dreams: ["成为知名作家", "写出传世之作", "找到精神伴侣"],
            secrets: ["内心很脆弱", "渴望被理解", "有轻微社交恐惧"],
            favoriteThings: ["文字", "秋天", "咖啡店", "独处时光"],
            relationshipStyle: "深情而细腻，用文字表达情感"
        },
        苏云深: {
            personality: ["成熟", "可靠", "温和", "有责任感"],
            hobbies: ["研究医学", "照顾他人", "园艺", "烹饪"],
            fears: ["失去病人", "无法救人", "让人失望"],
            dreams: ["成为名医", "救更多人", "拥有温暖的家庭"],
            secrets: ["其实很累", "需要被照顾", "喜欢小动物"],
            favoriteThings: ["白大褂", "干净整洁", "治愈他人", "安静的午后"],
            relationshipStyle: "温柔体贴，用行动关怀对方"
        },
        唐言: {
            personality: ["强势", "自信", "有野心", "内心柔软"],
            hobbies: ["商业策划", "健身", "品酒", "收藏"],
            fears: ["失去控制", "被看不起", "孤独终老"],
            dreams: ["建立商业帝国", "证明自己", "找到真爱"],
            secrets: ["其实很孤独", "渴望真诚的关系", "有童心"],
            favoriteThings: ["成功", "掌控感", "奢华", "被需要"],
            relationshipStyle: "霸道而深情，用实际行动宠爱"
        },
        萧然: {
            personality: ["孤僻", "才华横溢", "敏感", "追求完美"],
            hobbies: ["绘画", "观察", "独处", "收集美好事物"],
            fears: ["被误解", "才能枯竭", "失去创作灵感"],
            dreams: ["举办个人画展", "画出心中的美", "被人理解"],
            secrets: ["渴望友情", "内心很温暖", "喜欢小孩"],
            favoriteThings: ["颜料", "安静", "美丽的事物", "真诚的人"],
            relationshipStyle: "内向而深情，用艺术表达感情"
        }
    },

    // 多层次互动系统
    interactionSystem: {
        // 基础互动
        basicInteractions: {
            学习: [
                {
                    scene: "图书馆偶遇",
                    characters: ["顾言", "江澈", "苏云深"],
                    baseScenario: "在安静的图书馆里，你专心学习时...",
                    variations: {
                        顾言: {
                            scenarios: [
                                {
                                    condition: "初次见面",
                                    dialogue: "你注意到一个戴着眼镜的学长正在专心看编程书籍，他的专注让你印象深刻。",
                                    choices: [
                                        { text: "悄悄观察他在看什么", affection: 1, trust: 1, outcome: "顾言注意到了你的目光，微微点头示意" },
                                        { text: "假装专心学习", affection: 0, trust: 0, outcome: "你继续自己的学习，但偶尔会偷瞄几眼" },
                                        { text: "主动上前请教", affection: 2, trust: 1, outcome: "顾言有些意外，但还是耐心回答了你的问题" }
                                    ]
                                },
                                {
                                    condition: "好感度 > 10",
                                    dialogue: "顾言看到你来了，主动朝你挥手，示意旁边有空位。",
                                    choices: [
                                        { text: "高兴地坐在他旁边", affection: 3, trust: 2, outcome: "你们一起学习，偶尔交流学习心得" },
                                        { text: "礼貌地打招呼后坐远一点", affection: 1, trust: 1, outcome: "顾言似乎有点失落，但理解你的选择" },
                                        { text: "走过去和他聊天", affection: 2, trust: 3, outcome: "顾言放下书本，认真地和你交流" }
                                    ]
                                },
                                {
                                    condition: "好感度 > 30",
                                    dialogue: "顾言正在为你准备的学习资料，看到你来了，脸微微发红。",
                                    choices: [
                                        { text: "感动地道谢", affection: 4, trust: 3, outcome: "顾言说这些资料很适合你，希望对你有帮助" },
                                        { text: "调侃他脸红了", affection: 3, trust: 2, outcome: "顾言更红了，但笑着说只是太热了" },
                                        { text: "提议一起学习", affection: 5, trust: 4, outcome: "顾言欣然同意，你们度过了充实的学习时光" }
                                    ]
                                }
                            ]
                        },
                        江澈: {
                            scenarios: [
                                {
                                    condition: "初次见面",
                                    dialogue: "在文学区域，你看到一个气质优雅的学长正在阅读诗集。",
                                    choices: [
                                        { text: "好奇地看看他在读什么", affection: 2, trust: 1, outcome: "江澈注意到你的视线，温和地笑了笑" },
                                        { text: "默默欣赏他的气质", affection: 1, trust: 0, outcome: "你被他的文艺气质深深吸引" },
                                        { text: "主动询问书籍推荐", affection: 3, trust: 2, outcome: "江澈很高兴有人对文学感兴趣，推荐了几本好书" }
                                    ]
                                },
                                {
                                    condition: "好感度 > 15",
                                    dialogue: "江澈看到你在为文学作业苦恼，主动过来提供帮助。",
                                    choices: [
                                        { text: "开心地接受帮助", affection: 4, trust: 3, outcome: "江澈耐心地为你分析文学作品，你受益匪浅" },
                                        { text: "谦虚地说不用麻烦", affection: 2, trust: 2, outcome: "江澈坚持要帮助你，说文学是需要交流的" },
                                        { text: "邀请他喝咖啡感谢", affection: 5, trust: 3, outcome: "江澈欣然接受，你们在咖啡厅聊了很久" }
                                    ]
                                }
                            ]
                        }
                    }
                }
            ],
            
            社交: [
                {
                    scene: "社团活动",
                    characters: ["林舟", "唐言", "周奕辰"],
                    baseScenario: "在热闹的社团活动中...",
                    variations: {
                        林舟: {
                            scenarios: [
                                {
                                    condition: "初次见面",
                                    dialogue: "你在篮球场看到一个阳光帅气的学长正在和朋友们打球。",
                                    choices: [
                                        { text: "在场边为他们加油", affection: 3, trust: 2, outcome: "林舟注意到你的加油声，投篮更准了" },
                                        { text: "默默欣赏他的球技", affection: 1, trust: 1, outcome: "你被他流畅的动作和阳光的笑容吸引" },
                                        { text: "主动请教篮球技巧", affection: 4, trust: 3, outcome: "林舟很热情地教你基本动作" }
                                    ]
                                },
                                {
                                    condition: "好感度 > 20",
                                    dialogue: "林舟看到你来了，立刻停下训练，满头大汗地跑过来。",
                                    choices: [
                                        { text: "递给他毛巾和水", affection: 5, trust: 4, outcome: "林舟感动地说你太贴心了" },
                                        { text: "夸赞他的球技", affection: 3, trust: 2, outcome: "林舟不好意思地挠头，说还要继续努力" },
                                        { text: "提议教你打球", affection: 6, trust: 5, outcome: "林舟兴奋地同意，亲自指导你的动作" }
                                    ]
                                }
                            ]
                        }
                    }
                }
            ],
            
            休闲: [
                {
                    scene: "咖啡厅邂逅",
                    characters: ["宋之南", "江澈", "苏云深"],
                    baseScenario: "在温馨的咖啡厅里...",
                    variations: {
                        宋之南: {
                            scenarios: [
                                {
                                    condition: "初次见面",
                                    dialogue: "你听到优美的钢琴声，循声望去，看到一位气质出众的老师在演奏。",
                                    choices: [
                                        { text: "安静地聆听", affection: 2, trust: 1, outcome: "宋之南注意到你专注的神情，演奏得更加投入" },
                                        { text: "录下这段演奏", affection: 1, trust: 0, outcome: "你被这美妙的音乐深深感动" },
                                        { text: "演奏结束后鼓掌", affection: 3, trust: 2, outcome: "宋之南微笑致谢，邀请你坐下聊天" }
                                    ]
                                }
                            ]
                        }
                    }
                }
            ],
            
            偶遇: [
                {
                    scene: "雨天邂逅",
                    characters: ["顾言", "苏云深", "萧然"],
                    baseScenario: "突然下雨了，你没带伞...",
                    variations: {
                        顾言: {
                            scenarios: [
                                {
                                    condition: "任何时候",
                                    dialogue: "就在你发愁的时候，顾言出现在你身边，默默撑起了伞。",
                                    choices: [
                                        { text: "感激地道谢", affection: 3, trust: 3, outcome: "顾言说举手之劳，但脸有点红" },
                                        { text: "坚持自己跑回去", affection: 1, trust: 1, outcome: "顾言担心地看着你，最后还是跟着你" },
                                        { text: "主动挽住他的胳膊", affection: 5, trust: 2, outcome: "顾言僵硬了一下，但没有推开你" }
                                    ]
                                }
                            ]
                        }
                    }
                }
            ]
        },

        // 深度互动系统
        deepInteractions: {
            // 约会系统
            dateScenarios: {
                电影院: {
                    availableCharacters: ["林舟", "周奕辰", "江澈"],
                    scenarios: [
                        {
                            movie: "浪漫爱情片",
                            dialogue: "电影中的浪漫情节让气氛变得微妙...",
                            characterReactions: {
                                林舟: "林舟看起来有点紧张，时不时偷看你的反应",
                                周奕辰: "周奕辰全神贯注地看着电影，还会小声评论剧情",
                                江澈: "江澈似乎在思考什么，对电影的艺术性很感兴趣"
                            },
                            choices: [
                                { text: "专心看电影", outcome: "你们都沉浸在电影中" },
                                { text: "小声和他聊电影", outcome: "你们交流了对电影的看法" },
                                { text: "故意吃爆米花出声", outcome: "轻松的氛围让你们都笑了" }
                            ]
                        }
                    ]
                },
                
                图书馆: {
                    availableCharacters: ["顾言", "江澈", "苏云深"],
                    scenarios: [
                        {
                            activity: "一起学习",
                            dialogue: "在安静的图书馆里，你们并肩而坐...",
                            characterBehaviors: {
                                顾言: "专注地帮你解答问题，偶尔会因为距离太近而脸红",
                                江澈: "推荐给你很多好书，和你分享阅读心得",
                                苏云深: "细心地为你整理笔记，关心你是否累了"
                            }
                        }
                    ]
                }
            },

            // 特殊事件系统
            specialEvents: {
                生日: {
                    trigger: "好感度 > 50",
                    scenarios: {
                        你的生日: {
                            characterActions: {
                                顾言: "悄悄为你准备了一个手工制作的程序，虽然简单但很用心",
                                林舟: "组织了一个小型聚会，邀请了你的朋友们",
                                宋之南: "为你弹奏了一首特别的生日歌",
                                周奕辰: "用相机为你拍了很多照片，制作成相册",
                                江澈: "写了一首诗送给你",
                                苏云深: "亲手做了生日蛋糕",
                                唐言: "准备了昂贵的礼物",
                                萧然: "画了一幅你的肖像"
                            }
                        },
                        他的生日: {
                            giftOptions: [
                                { item: "手工制作的礼物", effect: "大幅增加好感度和信任度" },
                                { item: "昂贵的礼物", effect: "增加好感度，但可能让某些角色感到压力" },
                                { item: "实用的礼物", effect: "稳定增加好感度" },
                                { item: "有纪念意义的礼物", effect: "大幅增加信任度" }
                            ]
                        }
                    }
                },

                节日: {
                    情人节: {
                        scenarios: [
                            {
                                condition: "单身",
                                dialogue: "情人节到了，校园里到处是成双成对的情侣...",
                                choices: [
                                    { text: "主动约喜欢的人", outcome: "根据好感度决定成功率" },
                                    { text: "和朋友一起过", outcome: "友情升温" },
                                    { text: "独自度过", outcome: "反思感情状况" }
                                ]
                            }
                        ]
                    },
                    
                    圣诞节: {
                        activities: ["交换礼物", "参加舞会", "制作装饰品"],
                        characterInvitations: "根据好感度，角色可能邀请你参加各种活动"
                    }
                }
            }
        }
    },

    // 多元化故事线
    storylines: {
        主线剧情: {
            学期开始: [
                "新学期报到",
                "选择课程",
                "加入社团",
                "宿舍生活开始"
            ],
            
            期中考试: [
                "紧张的复习期",
                "考试压力",
                "朋友间的相互支持",
                "成绩公布"
            ],
            
            校园节庆: [
                "校园文化节",
                "体育竞赛",
                "社团表演",
                "颁奖典礼"
            ],
            
            期末时光: [
                "期末复习",
                "实习安排",
                "毕业准备",
                "告别聚会"
            ]
        },

        个人成长线: {
            学业发展: [
                "专业课程深入学习",
                "参加学术竞赛",
                "获得奖学金",
                "发表学术论文"
            ],
            
            社交能力: [
                "克服内向性格",
                "建立友谊圈",
                "学会团队合作",
                "培养领导能力"
            ],
            
            兴趣爱好: [
                "发现新兴趣",
                "加入相关社团",
                "参加比赛",
                "成为专家"
            ]
        },

        角色专属线: {
            顾言: {
                技术之路: [
                    "一起参加编程比赛",
                    "开发校园APP",
                    "获得实习机会",
                    "创业计划"
                ],
                
                情感线: [
                    "初次心动",
                    "技术宅的浪漫",
                    "表白时刻",
                    "未来规划"
                ]
            },
            
            林舟: {
                体育之路: [
                    "训练日常",
                    "比赛挑战",
                    "受伤康复",
                    "体育梦想"
                ],
                
                青梅竹马线: [
                    "回忆童年",
                    "友情升温",
                    "意识到爱意",
                    "守护承诺"
                ]
            }
        }
    },

    // 选择后果系统
    consequenceSystem: {
        短期后果: {
            当日: "影响当天剩余互动",
            本周: "影响本周其他角色对你的态度"
        },
        
        长期后果: {
            学期: "影响期末的特殊事件",
            学年: "影响结局走向",
            终生: "影响最终的人生选择"
        },
        
        连锁反应: {
            角色关系: "和一个角色的关系变化会影响其他角色",
            校园声誉: "你的行为会在校园中传播",
            未来机会: "早期选择影响后期可选项"
        }
    }
};

// 将增强数据合并到原始游戏数据中
Object.assign(gameData, enhancedGameData);
