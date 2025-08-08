/**
 * 心动日记 - 完整游戏数据
 * 整合所有角色、故事、场景、对话数据
 */


const GameData = {
// 导入各角色故事数据
    // 角色名称映射（英文 -> 中文）
    characterNameMapping: {
        'LinZhou': '林舟',
        'SongYunshen': '苏云深', 
        'SongZhinan': '宋之南',
        'JiangChe': '江澈',
        'GuYan': '顾言',
        'TangYan': '唐言',
        'XiaoRan': '萧然',
        'ZhouYichen': '周奕辰'
    },
    
    // 中文名称到英文的反向映射
    characterEnglishMapping: {
        '林舟': 'LinZhou',
        '苏云深': 'SongYunshen',
        '宋之南': 'SongZhinan', 
        '江澈': 'JiangChe',
        '顾言': 'GuYan',
        '唐言': 'TangYan',
        '萧然': 'XiaoRan',
        '周奕辰': 'ZhouYichen'
    },

    // 系统配置
    systemConfig: {
        autoActivity: {
            baseActivityWeight: 3,   // 普通活动基础权重
            courseWeight: 2,         // 课程权重
            backgroundWeight: 1,     // 背景探索权重
            backgroundUnlockMinWeek: 3 // 第几周后才随机进入背景探索
        }
    },
    // 角色基础信息
    characters: {
        顾言: {
            name: "顾言",
            age: 21,
            title: "计算机学霸",
            department: "计算机系",
            description: "计算机系研究生，外表冷酷但内心温柔，是学院里有名的技术大神",
            portrait: "GuYan.png",
            personality: ["理性", "温柔", "专注", "内向"],
            hobbies: ["编程", "阅读", "下棋", "听古典音乐"],
            fears: ["人多的场合", "表达情感", "被误解"],
            dreams: ["成为优秀的程序员", "找到真爱", "帮助更多人"],
            secrets: ["其实很想交朋友", "小时候很孤独", "偷偷写日记"],
            favoriteThings: ["黑咖啡", "安静的图书馆", "下雨天", "深夜编程"],
            relationshipStyle: "慢热型，需要时间建立信任",
            background: "从小就展现出编程天赋，因为专注于技术而显得不善社交。内心其实很渴望理解和陪伴。"
        },
        林舟: {
            name: "林舟",
            age: 20,
            title: "阳光体育生",
            department: "体育系",
            description: "体育系学长，阳光开朗，总是充满活力，是校篮球队的主力",
            portrait: "LinZhou.png",
            personality: ["阳光", "活泼", "忠诚", "直率"],
            hobbies: ["篮球", "跑步", "看漫画", "和朋友聚会"],
            fears: ["失去重要的人", "让人失望", "孤独"],
            dreams: ["成为体育老师", "保护喜欢的人", "建立大家庭"],
            secrets: ["其实很细心", "会做菜", "怕黑"],
            favoriteThings: ["阳光", "运动", "热闹的聚会", "甜食"],
            relationshipStyle: "直接坦率，用行动表达爱意",
            background: "从小热爱运动，性格开朗乐观。虽然看起来大大咧咧，但对重要的人非常细心体贴。"
        },
        宋之南: {
            name: "宋之南",
            age: 28,
            title: "神秘钢琴老师",
            department: "音乐学院",
            description: "音乐学院的年轻钢琴老师，气质优雅神秘，技艺精湛",
            portrait: "SongZhinan.png",
            personality: ["优雅", "神秘", "才华横溢", "完美主义"],
            hobbies: ["钢琴", "古典音乐", "品茶", "园艺"],
            fears: ["失去音乐才能", "不完美", "被看穿内心"],
            dreams: ["举办个人音乐会", "找到灵魂伴侣", "教出优秀学生"],
            secrets: ["有时会感到孤独", "害怕承诺", "收藏古董"],
            favoriteThings: ["月光", "钢琴声", "花香", "安静的夜晚"],
            relationshipStyle: "浪漫而深沉，追求精神共鸣",
            background: "出身音乐世家，从小接受严格的音乐训练。追求完美的同时也承受着巨大压力，内心渴望被理解。"
        },
        周奕辰: {
            name: "周奕辰",
            age: 19,
            title: "可爱学弟",
            department: "摄影系",
            description: "大一新生，性格开朗活泼，总是充满活力，对世界充满好奇",
            portrait: "ZhouYichen.png",
            personality: ["天真", "热情", "好奇", "单纯"],
            hobbies: ["摄影", "旅行", "尝试新事物", "交朋友"],
            fears: ["被拒绝", "长大", "失去好奇心"],
            dreams: ["环游世界", "拍出好照片", "永远保持年轻的心"],
            secrets: ["其实很成熟", "懂得察言观色", "想要被保护"],
            favoriteThings: ["日出", "新鲜事物", "温暖的拥抱", "冒险"],
            relationshipStyle: "纯真热烈，全心全意投入",
            background: "来自小城市的少年，对大学生活充满憧憬。虽然年纪小，但有着超越年龄的敏感和体贴。"
        },
        江澈: {
            name: "江澈",
            age: 22,
            title: "文艺社长",
            department: "文学院",
            description: "文学社社长，温文尔雅的诗人气质，总是在图书馆写作",
            portrait: "JiangChe.png",
            personality: ["文艺", "深沉", "敏感", "理想主义"],
            hobbies: ["写作", "阅读", "看电影", "独自思考"],
            fears: ["江郎才尽", "现实的残酷", "失去创作灵感"],
            dreams: ["成为知名作家", "写出传世之作", "找到精神伴侣"],
            secrets: ["内心很脆弱", "渴望被理解", "有轻微社交恐惧"],
            favoriteThings: ["文字", "秋天", "咖啡店", "独处时光"],
            relationshipStyle: "深情而细腻，用文字表达情感",
            background: "从小热爱文学，梦想成为作家。内心敏感细腻，常常为了追求完美的作品而苦恼。"
        },
        苏云深: {
            name: "苏云深",
            age: 24,
            title: "医学天才",
            department: "医学院",
            description: "医学院的天才学生，成熟稳重，有着治愈系的温柔",
            portrait: "SongYunshen.png",
            personality: ["成熟", "可靠", "温和", "有责任感"],
            hobbies: ["研究医学", "照顾他人", "园艺", "烹饪"],
            fears: ["失去病人", "无法救人", "让人失望"],
            dreams: ["成为名医", "救更多人", "拥有温暖的家庭"],
            secrets: ["其实很累", "需要被照顾", "喜欢小动物"],
            favoriteThings: ["白大褂", "干净整洁", "治愈他人", "安静的午后"],
            relationshipStyle: "温柔体贴，用行动关怀对方",
            background: "医学世家出身，从小被寄予厚望。虽然承担着巨大压力，但始终保持着救死扶伤的初心。"
        },
        唐言: {
            name: "唐言",
            age: 23,
            title: "霸道总裁",
            department: "商学院",
            description: "商学院学生会主席，家境优渥，外表强势内心柔软",
            portrait: "TangYan.png",
            personality: ["强势", "自信", "有野心", "内心柔软"],
            hobbies: ["商业策划", "健身", "品酒", "收藏"],
            fears: ["失去控制", "被看不起", "孤独终老"],
            dreams: ["建立商业帝国", "证明自己", "找到真爱"],
            secrets: ["其实很孤独", "渴望真诚的关系", "有童心"],
            favoriteThings: ["成功", "掌控感", "奢华", "被需要"],
            relationshipStyle: "霸道而深情，用实际行动宠爱",
            background: "出身豪门，从小接受精英教育。外表强势但内心渴望真诚的关系，害怕被人利用。"
        },
        萧然: {
            name: "萧然",
            age: 21,
            title: "神秘画家",
            department: "美术系",
            description: "美术系的才华横溢的画家，性格孤僻但内心热情",
            portrait: "XiaoRan.png",
            personality: ["孤僻", "才华横溢", "敏感", "追求完美"],
            hobbies: ["绘画", "观察", "独处", "收集美好事物"],
            fears: ["被误解", "才能枯竭", "失去创作灵感"],
            dreams: ["举办个人画展", "画出心中的美", "被人理解"],
            secrets: ["渴望友情", "内心很温暖", "喜欢小孩"],
            favoriteThings: ["颜料", "安静", "美丽的事物", "真诚的人"],
            relationshipStyle: "内向而深情，用艺术表达感情",
            background: "从小展现出绘画天赋，但性格内向孤僻。通过艺术表达内心世界，渴望被人理解。"
        }
    },

    // 活动场景数据
    activities: {
        library_study: {
            name: "图书馆学习",
            description: "在安静的图书馆中专心学习",
            icon: "📚",
            environments: [
                {
                    time: "早晨",
                    scene: "清晨的图书馆很安静，只有几个早起的学生。阳光透过窗户洒在空无一人的书桌上。",
                    mood: "平静专注"
                },
                {
                    time: "上午",
                    scene: "图书馆里人渐渐多了起来，大家都在埋头苦读，偶尔有翻书声和轻微的脚步声。",
                    mood: "认真学习"
                },
                {
                    time: "下午",
                    scene: "下午的图书馆人最多，座位几乎坐满。你好不容易找到一个靠窗的位置。",
                    mood: "有些繁忙"
                },
                {
                    time: "傍晚",
                    scene: "夕阳西下，图书馆里的人开始减少。温暖的灯光让人感到舒适。",
                    mood: "温馨安宁"
                }
            ]
        },
        sports_activities: {
            name: "体育活动",
            description: "参加体育运动，强身健体",
            icon: "🏃‍♀️",
            environments: [
                {
                    time: "早晨",
                    scene: "清晨的操场上有不少早起锻炼的同学，空气清新，充满活力。",
                    mood: "朝气蓬勃"
                },
                {
                    time: "上午",
                    scene: "体育馆里正在进行各种运动，篮球场上传来激烈的运球声。",
                    mood: "热血沸腾"
                },
                {
                    time: "下午",
                    scene: "操场上人声鼎沸，各种体育社团在进行训练。",
                    mood: "活力四射"
                },
                {
                    time: "傍晚",
                    scene: "夕阳下的操场特别美丽，有同学在慢跑，有人在踢毽子。",
                    mood: "悠闲惬意"
                }
            ]
        },
        art_club: {
            name: "社团活动",
            description: "参加各种社团活动，培养兴趣爱好",
            icon: "🎨",
            environments: [
                {
                    time: "早晨",
                    scene: "社团活动室里，早到的成员们正在准备今天的活动。",
                    mood: "期待兴奋"
                },
                {
                    time: "上午",
                    scene: "美术社的教室里，大家正在专心创作，空气中弥漫着颜料的味道。",
                    mood: "专注创作"
                },
                {
                    time: "下午",
                    scene: "文学社正在举行读书分享会，大家围坐在一起讨论文学作品。",
                    mood: "文艺氛围"
                },
                {
                    time: "傍晚",
                    scene: "音乐社的练习室里传出优美的旋律，有人在练习钢琴。",
                    mood: "艺术浪漫"
                }
            ]
        },
        campus_walk: {
            name: "校园漫步",
            description: "在美丽的校园中散步，享受悠闲时光",
            icon: "🌸",
            environments: [
                {
                    time: "早晨",
                    scene: "晨光照耀下的校园小径，樱花飘洒，鸟儿在枝头歌唱。",
                    mood: "诗意浪漫"
                },
                {
                    time: "上午",
                    scene: "校园里绿树成荫，学生们三三两两地走过，充满青春气息。",
                    mood: "青春洋溢"
                },
                {
                    time: "下午",
                    scene: "午后的校园有些慵懒，你漫步在林荫小道上，享受着这份宁静。",
                    mood: "悠闲宁静"
                },
                {
                    time: "傍晚",
                    scene: "夕阳西下，校园湖边的柳树在微风中摆动，景色格外迷人。",
                    mood: "浪漫温馨"
                }
            ]
        },
        cafeteria_meal: {
            name: "食堂用餐",
            description: "在热闹的食堂享用美食，社交的好地方",
            icon: "🍽️",
            environments: [
                {
                    time: "早晨",
                    scene: "早餐时间的食堂人不多，你悠闲地享受着早餐。",
                    mood: "安静惬意"
                },
                {
                    time: "上午",
                    scene: "食堂里开始热闹起来，各种美食的香味让人垂涎欲滴。",
                    mood: "食欲大开"
                },
                {
                    time: "下午",
                    scene: "午餐时间的食堂人声鼎沸，到处都是同学们的欢声笑语。",
                    mood: "热闹温馨"
                },
                {
                    time: "傍晚",
                    scene: "晚餐时间，食堂里灯火通明，同学们围桌而坐，气氛温馨。",
                    mood: "温暖融洽"
                }
            ]
        }
    },

    // 故事对话数据已迁移至各角色单独文件
    storyData: {
        顾言: window.GuYanStoryData,
        林舟: window.LinZhouStoryData,
        苏云深: window.SongYunshenStoryData,
        宋之南: window.SongZhinanStoryData,
        江澈: window.JiangCheStoryData,
        唐言: window.TangYanStoryData,
        萧然: window.XiaoRanStoryData,
        周奕辰: window.ZhouYichenStoryData
    },

    // 随机事件数据
    randomEvents: {
        weather: [
            {
                type: "sunny",
                description: "今天阳光明媚，是个适合户外活动的好天气",
                effects: { 心情: 2, 活力: 1 }
            },
            {
                type: "rainy",
                description: "今天下雨了，校园里弥漫着清新的雨香",
                effects: { 心情: 1, 感性: 2 }
            },
            {
                type: "cloudy",
                description: "今天多云，温度适中，很适合学习",
                effects: { 专注: 2, 学习: 1 }
            }
        ],
        campus: [
            {
                type: "festival",
                description: "校园正在举办文化节，到处都是热闹的活动",
                effects: { 社交: 3, 心情: 2, 文艺: 1 }
            },
            {
                type: "exam",
                description: "期末考试临近，图书馆里的人特别多",
                effects: { 学习: 2, 专注: 1, 压力: 1 }
            },
            {
                type: "new_semester",
                description: "新学期开始了，校园里充满了新气象",
                effects: { 心情: 2, 期待: 2, 活力: 1 }
            }
        ]
    },

    // 成就系统
    achievements: {
        学霸: {
            name: "学霸",
            description: "学习属性达到80以上",
            icon: "📚",
            condition: { playerStats: { 学习: 80 } }
        },
        社交达人: {
            name: "社交达人", 
            description: "社交属性达到80以上",
            icon: "🎭",
            condition: { playerStats: { 社交: 80 } }
        },
        万人迷: {
            name: "万人迷",
            description: "与所有角色的好感度都达到50以上",
            icon: "💖",
            condition: { allCharacterAffection: 50 }
        },
        艺术家: {
            name: "艺术家",
            description: "艺术属性达到80以上",
            icon: "🎨",
            condition: { playerStats: { 艺术: 80 } }
        },
        运动健将: {
            name: "运动健将",
            description: "运动属性达到80以上",
            icon: "🏃‍♀️",
            condition: { playerStats: { 运动: 80 } }
        }
    },

    // 结局条件
    endings: {
        顾言_True_End: {
            name: "代码之恋",
            description: "与顾言的真爱结局",
            character: "顾言",
            conditions: {
                affection: 80,
                trust: 70,
                playerStats: { 学习: 60, 理性: 50 },
                specialEvents: ["programming_together", "late_night_coding"],
                requiredBackgroundStories: ["dreams_exploration", "fears_understanding", "secrets_discovery"],
                requiredPersonalityMatch: ["内向", "理性"]
            }
        },
        林舟_True_End: {
            name: "阳光恋人",
            description: "与林舟的真爱结局",
            character: "林舟",
            conditions: {
                affection: 80,
                trust: 70,
                playerStats: { 运动: 60, 活力: 50 },
                specialEvents: ["basketball_game", "morning_run"],
                requiredBackgroundStories: ["dreams_exploration", "favorites_sharing", "past_memories"],
                requiredPersonalityMatch: ["开朗", "运动"]
            }
        },
        周奕辰_True_End: {
            name: "音乐之约",
            description: "与周奕辰的真爱结局",
            character: "周奕辰",
            conditions: {
                affection: 80,
                trust: 70,
                playerStats: { 艺术: 60, 感性: 50 },
                specialEvents: ["piano_duet", "music_competition"],
                requiredBackgroundStories: ["dreams_exploration", "fears_understanding", "favorites_sharing"],
                requiredPersonalityMatch: ["温柔", "艺术"]
            }
        },
        宋之南_True_End: {
            name: "文学之恋",
            description: "与宋之南的真爱结局",
            character: "宋之南",
            conditions: {
                affection: 80,
                trust: 70,
                playerStats: { 文学: 60, 感性: 50 },
                specialEvents: ["poetry_reading", "writing_together"],
                requiredBackgroundStories: ["dreams_exploration", "fears_understanding", "secrets_discovery"],
                requiredPersonalityMatch: ["安静", "文艺"]
            }
        },
        江澈_True_End: {
            name: "治愈之恋",
            description: "与江澈的真爱结局",
            character: "江澈",
            conditions: {
                affection: 80,
                trust: 70,
                playerStats: { 理性: 60, 责任感: 50 },
                specialEvents: ["volunteer_work", "medical_study"],
                requiredBackgroundStories: ["dreams_exploration", "past_memories", "favorites_sharing"],
                requiredPersonalityMatch: ["温柔", "理性"]
            }
        },
        唐言_True_End: {
            name: "霸总之恋",
            description: "与唐言的真爱结局",
            character: "唐言",
            conditions: {
                affection: 80,
                trust: 70,
                playerStats: { 社交: 60, 自信: 50 },
                specialEvents: ["business_project", "luxury_date"],
                requiredBackgroundStories: ["secrets_discovery", "fears_understanding", "past_memories"],
                requiredPersonalityMatch: ["自信", "社交"]
            }
        },
        萧然_True_End: {
            name: "艺术之恋",
            description: "与萧然的真爱结局",
            character: "萧然",
            conditions: {
                affection: 80,
                trust: 70,
                playerStats: { 艺术: 60, 观察力: 50 },
                specialEvents: ["art_exhibition", "painting_together"],
                requiredBackgroundStories: ["dreams_exploration", "fears_understanding", "favorites_sharing"],
                requiredPersonalityMatch: ["安静", "艺术"]
            }
        }
        // 继续其他角色的结局...
    },

    // 背景探索故事类型
    backgroundStories: {
        dreams_exploration: {
            name: "梦想探索",
            description: "深入了解角色的梦想和抱负",
            unlockCondition: { affection: 30, trust: 25 }
        },
        fears_understanding: {
            name: "恐惧理解", 
            description: "了解角色内心的恐惧和脆弱",
            unlockCondition: { affection: 40, trust: 35 }
        },
        secrets_discovery: {
            name: "秘密发现",
            description: "发现角色深藏的秘密",
            unlockCondition: { affection: 50, trust: 45 }
        },
        favorites_sharing: {
            name: "喜好分享",
            description: "分享彼此喜欢的事物",
            unlockCondition: { affection: 20, trust: 15 }
        },
        past_memories: {
            name: "往昔回忆",
            description: "了解角色的过去经历",
            unlockCondition: { affection: 35, trust: 40 }
        }
    },

    // 学业系统
    academicSystem: {
        grades: {
            1: { name: "大一", requiredKnowledge: 0, examDifficulty: 20 },
            2: { name: "大二", requiredKnowledge: 100, examDifficulty: 40 },
            3: { name: "大三", requiredKnowledge: 250, examDifficulty: 60 },
            4: { name: "大四", requiredKnowledge: 450, examDifficulty: 80 }
        },
        subjects: {
            "基础课程": {
                description: "大学基础必修课程",
                knowledgeGain: 15,
                difficulty: 20,
                timeRequired: 1
            },
            "专业课程": {
                description: "专业相关核心课程",
                knowledgeGain: 25,
                difficulty: 40,
                timeRequired: 1
            },
            "高级课程": {
                description: "高难度进阶课程",
                knowledgeGain: 40,
                difficulty: 60,
                timeRequired: 2
            },
            "研究项目": {
                description: "独立研究项目",
                knowledgeGain: 60,
                difficulty: 80,
                timeRequired: 3
            }
        },
        examQuestions: {
            "基础课程": [
                {
                    question: "在程序设计中，变量的作用域是指什么？",
                    options: ["变量的数据类型", "变量可以被访问的代码范围", "变量的内存大小", "变量的运算速度"],
                    correct: 1,
                    difficulty: 20
                },
                {
                    question: "数据库中的主键有什么特点？",
                    options: ["可以重复", "可以为空", "唯一且不为空", "只能是数字"],
                    correct: 2,
                    difficulty: 25
                }
            ],
            "专业课程": [
                {
                    question: "在面向对象编程中，封装的主要目的是什么？",
                    options: ["提高运行速度", "隐藏实现细节和保护数据", "减少代码量", "简化语法"],
                    correct: 1,
                    difficulty: 40
                },
                {
                    question: "什么是算法的时间复杂度？",
                    options: ["算法运行的实际时间", "算法代码的行数", "算法执行时间与输入规模的关系", "算法占用的内存大小"],
                    correct: 2,
                    difficulty: 45
                }
            ],
            "高级课程": [
                {
                    question: "在分布式系统中，CAP定理指的是什么？",
                    options: ["一致性、可用性、分区容错性", "并发性、原子性、持久性", "缓存、API、协议", "计算、存储、网络"],
                    correct: 0,
                    difficulty: 60
                },
                {
                    question: "机器学习中的过拟合现象是指什么？",
                    options: ["模型太简单", "数据太少", "模型在训练集上表现好但泛化能力差", "算法运行太慢"],
                    correct: 2,
                    difficulty: 65
                }
            ]
        }
    }
};
