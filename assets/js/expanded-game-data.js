// 心动日记 - 大幅扩展游戏数据
const gameData = {
    // 角色数据
    characters: {
        顾言: {
            name: "顾言",
            age: 21,
            description: "计算机系学霸，性格内向但很温柔",
            affection: 0,
            trust: 0,
            personality: ["理性", "温柔", "专注", "内向"],
            hobbies: ["编程", "阅读", "下棋"],
            portrait: "GuYan.png"
        },
        林舟: {
            name: "林舟", 
            age: 20,
            description: "阳光开朗的体育系学长，总是充满活力",
            affection: 0,
            trust: 0,
            personality: ["阳光", "活泼", "忠诚", "直率"],
            hobbies: ["篮球", "跑步", "看漫画"],
            portrait: "LinZhou.png"
        },
        宋之南: {
            name: "宋之南",
            age: 28,
            description: "优雅的音乐老师，气质出众，技艺精湛",
            affection: 0,
            trust: 0,
            personality: ["优雅", "神秘", "才华横溢", "完美主义"],
            hobbies: ["钢琴", "古典音乐", "品茶"],
            portrait: "SongZhiNan.png"
        },
        周奕辰: {
            name: "周奕辰",
            age: 19,
            description: "可爱的学弟，天真烂漫，总是很有活力",
            affection: 0,
            trust: 0,
            personality: ["天真", "热情", "好奇", "单纯"],
            hobbies: ["摄影", "旅行", "尝试新事物"],
            portrait: "ZhouYiChen.png"
        },
        江澈: {
            name: "江澈",
            age: 22,
            description: "文学社社长，文艺青年，很有才华",
            affection: 0,
            trust: 0,
            personality: ["文艺", "深沉", "敏感", "理想主义"],
            hobbies: ["写作", "阅读", "看电影"],
            portrait: "JiangChe.png"
        },
        苏云深: {
            name: "苏云深",
            age: 24,
            description: "医学院的温柔学长，成熟可靠",
            affection: 0,
            trust: 0,
            personality: ["成熟", "可靠", "温和", "有责任感"],
            hobbies: ["研究医学", "照顾他人", "园艺"],
            portrait: "SuYunShen.png"
        },
        唐言: {
            name: "唐言",
            age: 23,
            description: "学生会主席，能力出众，有些强势",
            affection: 0,
            trust: 0,
            personality: ["强势", "自信", "有野心", "内心柔软"],
            hobbies: ["商业策划", "健身", "品酒"],
            portrait: "TangYan.png"
        },
        萧然: {
            name: "萧然",
            age: 21,
            description: "孤僻的艺术系天才，不善言辞但很有才华",
            affection: 0,
            trust: 0,
            personality: ["孤僻", "才华横溢", "敏感", "追求完美"],
            hobbies: ["绘画", "观察", "独处"],
            portrait: "XiaoRan.png"
        }
    },

    // 大幅扩展的场景数据
    scenarios: {
        学习: [
            // 早晨时段
            {
                id: "study_early_library",
                name: "清晨图书馆",
                description: "清晨6点的图书馆很安静，只有几个早起的学生。阳光透过窗户洒在空无一人的书桌上，你选择了一个靠窗的位置...",
                time: "早晨",
                weather: "晴天",
                mood: "平静",
                choices: [
                    { 
                        text: "享受宁静专心学习", 
                        effect: { 学习: 3, 专注: 2, 心情: 1 },
                        outcome: "你在安静的环境中效率很高，感觉一天有了个好开始"
                    },
                    { 
                        text: "整理今天的学习计划", 
                        effect: { 学习: 2, 计划性: 2, 条理: 1 },
                        outcome: "制定了详细的学习计划，心里更有底了"
                    },
                    { 
                        text: "观察窗外的校园", 
                        effect: { 心情: 2, 感性: 1 },
                        outcome: "校园在晨光中显得格外美丽，心情变得很好"
                    }
                ],
                randomEncounter: {
                    probability: 0.3,
                    characters: ["顾言", "江澈", "苏云深"],
                    scenario: "也有其他早起的学生来到图书馆"
                }
            },
            {
                id: "study_morning_class",
                name: "上午课堂",
                description: "上午的专业课，教授正在讲解重要的知识点。你坐在教室中间，周围的同学都在认真听讲...",
                time: "上午",
                requirement: "学期中",
                choices: [
                    { 
                        text: "全神贯注做笔记", 
                        effect: { 学习: 3, 专注: 2, 学术声誉: 1 },
                        outcome: "教授注意到了你的认真态度，课后还夸奖了你"
                    },
                    { 
                        text: "积极回答问题", 
                        effect: { 学习: 2, 自信: 2, 表达能力: 1 },
                        outcome: "你的回答得到了教授的认可，同学们也对你刮目相看"
                    },
                    { 
                        text: "和同桌小声讨论", 
                        effect: { 学习: 1, 社交: 2, 团队合作: 1 },
                        outcome: "通过讨论，你们都加深了对知识的理解"
                    },
                    { 
                        text: "偷偷看手机", 
                        effect: { 学习: -1, 自制力: -1 },
                        outcome: "虽然看了一些有趣的内容，但错过了重要的知识点"
                    }
                ],
                randomEncounter: {
                    probability: 0.4,
                    characters: ["顾言", "江澈", "苏云深", "唐言"],
                    scenario: "同班同学或其他专业的学生也在上课"
                }
            },
            {
                id: "study_library_afternoon",
                name: "午后图书馆",
                description: "下午的图书馆人渐渐多了起来，空气中弥漫着书香和淡淡的咖啡味。你需要找个合适的位置坐下...",
                time: "下午",
                mood: "专注",
                choices: [
                    { 
                        text: "找个角落安静学习", 
                        effect: { 学习: 3, 专注: 2 },
                        outcome: "在安静的角落里，你的学习效率很高"
                    },
                    { 
                        text: "和认识的同学拼桌", 
                        effect: { 学习: 2, 社交: 2, 合作: 1 },
                        outcome: "和同学一起学习，偶尔交流心得，氛围很好"
                    },
                    { 
                        text: "选择靠近窗户的位置", 
                        effect: { 学习: 2, 心情: 2 },
                        outcome: "阳光洒在书本上，心情变得很好"
                    },
                    { 
                        text: "去阅览室看期刊", 
                        effect: { 学习: 2, 见识: 2, 视野: 1 },
                        outcome: "从期刊中学到了很多课外知识"
                    }
                ],
                randomEncounter: {
                    probability: 0.6,
                    characters: ["顾言", "江澈", "萧然", "苏云深"],
                    scenario: "图书馆里经常能遇到其他学生"
                }
            },
            {
                id: "study_group_project",
                name: "小组项目讨论",
                description: "你们的小组在讨论期末项目，每个人都需要贡献自己的想法。会议室里气氛有些紧张...",
                time: "下午或晚上",
                requirement: "学期末",
                mood: "紧张",
                choices: [
                    { 
                        text: "提出创新的想法", 
                        effect: { 学习: 3, 创新: 3, 领导力: 2 },
                        outcome: "你的想法得到了大家的认可，项目方向因此确定"
                    },
                    { 
                        text: "主动承担更多工作", 
                        effect: { 学习: 2, 责任感: 3, 压力: 2 },
                        outcome: "虽然压力增大了，但你在小组中的地位提升了"
                    },
                    { 
                        text: "协调小组成员分工", 
                        effect: { 学习: 1, 组织能力: 3, 社交: 2 },
                        outcome: "在你的协调下，小组分工明确，效率提高了"
                    },
                    { 
                        text: "专注于技术实现", 
                        effect: { 学习: 4, 技术能力: 2 },
                        outcome: "你负责的技术部分完成得很出色"
                    }
                ]
            },
            {
                id: "study_night_library",
                name: "深夜图书馆",
                description: "晚上10点的图书馆，灯火通明。很多学生在这里奋战到深夜，空气中有种紧张而充实的氛围...",
                time: "深夜",
                mood: "紧张",
                choices: [
                    { 
                        text: "加入熬夜学习大军", 
                        effect: { 学习: 4, 意志力: 2, 疲劳: 3 },
                        outcome: "学习到了很多内容，但第二天会很累"
                    },
                    { 
                        text: "学习一会儿就回宿舍", 
                        effect: { 学习: 2, 健康: 1, 自制力: 1 },
                        outcome: "保持了良好的作息，虽然学习时间不长但效率不错"
                    },
                    { 
                        text: "和其他夜猫子一起学习", 
                        effect: { 学习: 3, 社交: 2, 团结: 1 },
                        outcome: "在深夜的图书馆里结识了一些志同道合的朋友"
                    }
                ],
                randomEncounter: {
                    probability: 0.7,
                    characters: ["顾言", "苏云深", "唐言"],
                    scenario: "深夜学习的学生中可能有熟悉的面孔"
                }
            },
            // 特殊学习场景
            {
                id: "study_exam_week",
                name: "期末考试周",
                description: "期末考试周到了，整个校园都弥漫着紧张的气氛。你需要制定策略来应对即将到来的考试...",
                time: "考试周",
                mood: "紧张",
                stress: "高",
                choices: [
                    { 
                        text: "制定详细的复习计划", 
                        effect: { 学习: 3, 计划性: 3, 压力: -1 },
                        outcome: "有序的复习计划让你更有信心面对考试"
                    },
                    { 
                        text: "和学霸组成学习小组", 
                        effect: { 学习: 4, 社交: 2, 合作: 2 },
                        outcome: "在学霸的帮助下，你的复习效率大大提高"
                    },
                    { 
                        text: "通宵达旦地复习", 
                        effect: { 学习: 5, 意志力: 1, 疲劳: 4, 健康: -2 },
                        outcome: "虽然复习了很多内容，但身体状况令人担忧"
                    },
                    { 
                        text: "保持正常作息", 
                        effect: { 学习: 2, 健康: 2, 心态: 1 },
                        outcome: "虽然学习时间有限，但保持了良好的状态"
                    }
                ]
            },
            {
                id: "study_competition",
                name: "学科竞赛准备",
                description: "你决定参加全国大学生学科竞赛，这是一个展示自己能力的好机会，但也需要付出很多努力...",
                time: "任意",
                requirement: "学习属性 > 40",
                mood: "兴奋",
                choices: [
                    { 
                        text: "独自深入钻研", 
                        effect: { 学习: 5, 专业能力: 3, 孤独: 2 },
                        outcome: "通过独自钻研，你对专业知识有了更深的理解"
                    },
                    { 
                        text: "寻找指导老师", 
                        effect: { 学习: 4, 师生关系: 3, 人脉: 1 },
                        outcome: "老师的指导让你少走了很多弯路"
                    },
                    { 
                        text: "组建竞赛团队", 
                        effect: { 学习: 3, 团队协作: 3, 领导力: 2 },
                        outcome: "团队的力量让你们在竞赛中表现出色"
                    }
                ]
            },
            {
                id: "study_research",
                name: "科研项目参与",
                description: "教授邀请你参与一个重要的科研项目，这对你的学术发展很有帮助，但也意味着更大的责任...",
                time: "任意",
                requirement: "学习属性 > 60, 教授好感 > 50",
                mood: "严肃",
                choices: [
                    { 
                        text: "全身心投入研究", 
                        effect: { 学习: 6, 研究能力: 4, 学术声誉: 3, 社交: -2 },
                        outcome: "你在研究中表现出色，但牺牲了一些社交时间"
                    },
                    { 
                        text: "平衡研究和生活", 
                        effect: { 学习: 4, 研究能力: 2, 平衡能力: 2 },
                        outcome: "你在研究和生活之间找到了平衡"
                    },
                    { 
                        text: "专注于学习基础知识", 
                        effect: { 学习: 3, 基础扎实: 3 },
                        outcome: "虽然研究贡献有限，但基础知识更加扎实"
                    }
                ]
            }
        ],

        社交: [
            // 基础社交场景
            {
                id: "social_cafeteria_lunch",
                name: "食堂午餐时光",
                description: "中午的食堂人来人往，各种香味混合在一起。你端着餐盘寻找合适的座位...",
                time: "中午",
                mood: "轻松",
                choices: [
                    { 
                        text: "和认识的同学拼桌", 
                        effect: { 社交: 3, 友谊: 2, 心情: 1 },
                        outcome: "和朋友一起用餐，聊天很愉快"
                    },
                    { 
                        text: "主动加入陌生人的桌子", 
                        effect: { 社交: 4, 勇气: 2, 外向: 2 },
                        outcome: "认识了新朋友，拓展了社交圈"
                    },
                    { 
                        text: "一个人安静用餐", 
                        effect: { 独立: 2, 内向: 1 },
                        outcome: "享受了一个人的宁静时光"
                    },
                    { 
                        text: "帮助需要帮助的同学", 
                        effect: { 社交: 2, 善良: 3, 助人: 2 },
                        outcome: "你的善良行为得到了大家的称赞"
                    }
                ],
                randomEncounter: {
                    probability: 0.8,
                    characters: ["林舟", "周奕辰", "唐言", "顾言"],
                    scenario: "食堂里总是能遇到各种同学"
                }
            },
            {
                id: "social_dorm_party",
                name: "宿舍楼聚会",
                description: "周末的夜晚，宿舍楼里组织了一个小型聚会。音乐声、笑声从活动室里传出来...",
                time: "周末晚上",
                mood: "兴奋",
                choices: [
                    { 
                        text: "积极参与各种游戏", 
                        effect: { 社交: 4, 心情: 3, 活力: 2 },
                        outcome: "你是聚会的焦点，大家都很喜欢和你一起玩"
                    },
                    { 
                        text: "主要负责拍照记录", 
                        effect: { 社交: 2, 细心: 2, 艺术: 1 },
                        outcome: "你拍的照片很棒，大家都要你发给他们"
                    },
                    { 
                        text: "和几个人深入聊天", 
                        effect: { 社交: 3, 深度交流: 3, 理解力: 1 },
                        outcome: "通过深入聊天，你和朋友们的关系更近了"
                    },
                    { 
                        text: "提前离开去学习", 
                        effect: { 社交: -2, 学习: 2, 自律: 1 },
                        outcome: "虽然错过了聚会，但完成了重要的学习任务"
                    }
                ]
            },
            {
                id: "social_club_recruitment",
                name: "社团招新现场",
                description: "新学期的社团招新开始了，各个社团都在展示自己的特色。你被眼花缭乱的选择弄得有些犹豫...",
                time: "开学季",
                mood: "期待",
                choices: [
                    { 
                        text: "加入学术科研社团", 
                        effect: { 学习: 3, 社交: 2, 专业素养: 2 },
                        outcome: "在学术社团里，你找到了志同道合的伙伴"
                    },
                    { 
                        text: "加入体育运动社团", 
                        effect: { 体力: 3, 社交: 3, 团队精神: 2 },
                        outcome: "运动让你结识了很多充满活力的朋友"
                    },
                    { 
                        text: "加入文艺创作社团", 
                        effect: { 艺术: 3, 社交: 2, 创造力: 2 },
                        outcome: "在文艺社团里，你的创作才能得到了发挥"
                    },
                    { 
                        text: "加入公益志愿社团", 
                        effect: { 社交: 2, 爱心: 4, 社会责任: 2 },
                        outcome: "志愿服务让你获得了帮助他人的快乐"
                    },
                    { 
                        text: "同时加入多个社团", 
                        effect: { 社交: 5, 时间管理: -2, 压力: 2 },
                        outcome: "虽然很忙碌，但你的社交圈大大扩展了"
                    }
                ]
            },
            {
                id: "social_festival",
                name: "校园文化节",
                description: "一年一度的校园文化节开幕了！整个校园都沉浸在节日的氛围中，到处都是精彩的表演和活动...",
                time: "文化节期间",
                mood: "热烈",
                special: true,
                choices: [
                    { 
                        text: "报名参加才艺表演", 
                        effect: { 社交: 4, 艺术: 3, 自信: 3, 压力: 2 },
                        outcome: "你的表演获得了热烈掌声，成为了校园名人"
                    },
                    { 
                        text: "担任志愿者工作", 
                        effect: { 社交: 3, 服务精神: 3, 组织能力: 2 },
                        outcome: "作为志愿者，你为活动的成功贡献了力量"
                    },
                    { 
                        text: "和朋友一起观看节目", 
                        effect: { 社交: 3, 心情: 3, 友谊: 2 },
                        outcome: "和朋友一起度过了难忘的文化节"
                    },
                    { 
                        text: "拍摄制作文化节纪录片", 
                        effect: { 社交: 2, 艺术: 3, 创作能力: 2 },
                        outcome: "你制作的纪录片记录了文化节的精彩瞬间"
                    }
                ]
            },
            // 进阶社交场景
            {
                id: "social_leadership_election",
                name: "学生会竞选",
                description: "学生会换届选举开始了，你考虑是否要参与竞选。这是一个锻炼领导能力的好机会...",
                time: "学期中",
                requirement: "社交属性 > 50",
                mood: "紧张",
                choices: [
                    { 
                        text: "竞选学生会主席", 
                        effect: { 社交: 5, 领导力: 4, 责任感: 3, 压力: 3 },
                        outcome: "竞选成功后，你肩负起了更大的责任"
                    },
                    { 
                        text: "竞选部门部长", 
                        effect: { 社交: 3, 领导力: 2, 专业能力: 2 },
                        outcome: "在部门工作中，你的能力得到了认可"
                    },
                    { 
                        text: "支持其他候选人", 
                        effect: { 社交: 2, 友谊: 2, 政治敏感: 1 },
                        outcome: "你的支持帮助朋友获得了成功"
                    },
                    { 
                        text: "专注于自己的学习", 
                        effect: { 学习: 2, 专注: 1 },
                        outcome: "虽然错过了机会，但学习成绩有所提升"
                    }
                ]
            },
            {
                id: "social_debate_competition",
                name: "校际辩论赛",
                description: "学校选拔队员参加校际辩论赛，你被推荐为候选人。这是展示口才和思辨能力的舞台...",
                time: "任意",
                requirement: "社交属性 > 40, 学习属性 > 40",
                mood: "兴奋",
                choices: [
                    { 
                        text: "接受挑战参加选拔", 
                        effect: { 社交: 4, 表达能力: 4, 逻辑思维: 3 },
                        outcome: "通过辩论训练，你的表达能力大大提升"
                    },
                    { 
                        text: "担任后勤支持工作", 
                        effect: { 社交: 2, 组织能力: 2, 团队精神: 2 },
                        outcome: "在后勤工作中，你为团队的成功贡献了力量"
                    },
                    { 
                        text: "婉拒邀请", 
                        effect: { 机会: -1, 谦逊: 1 },
                        outcome: "虽然错过了机会，但你更加明确了自己的兴趣"
                    }
                ]
            }
        ],

        休闲: [
            // 轻松休闲场景
            {
                id: "leisure_weekend_shopping",
                name: "周末逛街",
                description: "周末的商业街熙熙攘攘，各种店铺里传出音乐声。你和朋友们计划在这里度过愉快的下午...",
                time: "周末下午",
                mood: "轻松",
                choices: [
                    { 
                        text: "疯狂购物买买买", 
                        effect: { 心情: 4, 物质满足: 3, 金钱: -4 },
                        outcome: "购物带来了短暂的快乐，但钱包变瘪了"
                    },
                    { 
                        text: "只看不买，享受过程", 
                        effect: { 心情: 2, 理性: 2, 节俭: 2 },
                        outcome: "虽然没买什么，但享受了购物的乐趣"
                    },
                    { 
                        text: "精挑细选买必需品", 
                        effect: { 心情: 2, 实用性: 2, 金钱: -1 },
                        outcome: "买到了真正需要的东西，很有成就感"
                    },
                    { 
                        text: "主要陪朋友逛街", 
                        effect: { 社交: 3, 友谊: 2, 体贴: 2 },
                        outcome: "朋友很感谢你的陪伴，友谊更深了"
                    }
                ]
            },
            {
                id: "leisure_movie_night",
                name: "电影院之夜",
                description: "最新上映的电影口碑很好，你决定去电影院看看。售票厅里排着长队，气氛很热烈...",
                time: "晚上",
                mood: "期待",
                choices: [
                    { 
                        text: "看浪漫爱情片", 
                        effect: { 心情: 3, 浪漫情怀: 3, 感性: 2 },
                        outcome: "电影里的爱情故事让你对爱情有了新的憧憬"
                    },
                    { 
                        text: "看惊险动作片", 
                        effect: { 心情: 2, 刺激感: 3, 勇气: 1 },
                        outcome: "紧张刺激的情节让你肾上腺素飙升"
                    },
                    { 
                        text: "看深度文艺片", 
                        effect: { 心情: 1, 艺术修养: 3, 思考深度: 2 },
                        outcome: "电影引发了你对人生的深入思考"
                    },
                    { 
                        text: "看轻松喜剧片", 
                        effect: { 心情: 4, 幽默感: 2, 压力: -2 },
                        outcome: "笑声让你忘记了所有的烦恼"
                    }
                ],
                randomEncounter: {
                    probability: 0.5,
                    characters: ["林舟", "周奕辰", "江澈"],
                    scenario: "在电影院里可能会遇到其他同学"
                }
            },
            {
                id: "leisure_sports_activities",
                name: "运动健身时光",
                description: "天气很好，你决定出去运动一下。校园里的运动场所很多，你可以选择不同的运动方式...",
                time: "下午或傍晚",
                mood: "活力",
                weather: "晴天",
                choices: [
                    { 
                        text: "去健身房锻炼", 
                        effect: { 体力: 3, 肌肉: 2, 自律: 2, 金钱: -1 },
                        outcome: "系统的锻炼让你的身体素质有了明显提升"
                    },
                    { 
                        text: "在操场跑步", 
                        effect: { 体力: 3, 耐力: 3, 意志力: 1 },
                        outcome: "跑步让你感到身心舒畅，压力得到了释放"
                    },
                    { 
                        text: "和朋友打球", 
                        effect: { 体力: 2, 社交: 3, 团队协作: 2 },
                        outcome: "运动中的配合让你和朋友的默契更好了"
                    },
                    { 
                        text: "瑜伽冥想", 
                        effect: { 体力: 1, 心境: 3, 平衡感: 2 },
                        outcome: "瑜伽让你的身心都得到了很好的调节"
                    }
                ],
                randomEncounter: {
                    probability: 0.6,
                    characters: ["林舟", "唐言"],
                    scenario: "运动场所经常能遇到爱运动的同学"
                }
            },
            {
                id: "leisure_art_gallery",
                name: "艺术画廊参观",
                description: "市里新开了一个艺术画廊，展出的都是当代艺术家的作品。你对艺术很感兴趣，决定去看看...",
                time: "周末",
                mood: "文艺",
                choices: [
                    { 
                        text: "独自细细欣赏每幅作品", 
                        effect: { 艺术修养: 4, 审美能力: 3, 独立思考: 2 },
                        outcome: "艺术作品带给你很多灵感和思考"
                    },
                    { 
                        text: "和朋友一起讨论艺术", 
                        effect: { 艺术修养: 2, 社交: 3, 交流能力: 2 },
                        outcome: "和朋友的讨论让你对艺术有了新的理解"
                    },
                    { 
                        text: "参加导览讲解活动", 
                        effect: { 艺术修养: 3, 学习能力: 2, 知识面: 2 },
                        outcome: "专业的讲解让你学到了很多艺术知识"
                    },
                    { 
                        text: "尝试临摹一些作品", 
                        effect: { 艺术修养: 2, 创作能力: 3, 动手能力: 2 },
                        outcome: "通过临摹，你对艺术技法有了更深的体会"
                    }
                ],
                randomEncounter: {
                    probability: 0.4,
                    characters: ["萧然", "宋之南", "江澈"],
                    scenario: "艺术场所容易遇到有艺术气质的人"
                }
            },
            // 特殊休闲场景
            {
                id: "leisure_travel_plan",
                name: "短途旅行计划",
                description: "假期来了，你想来一次短途旅行。翻看着旅游攻略，心情格外激动...",
                time: "假期",
                mood: "兴奋",
                choices: [
                    { 
                        text: "一个人的自由之旅", 
                        effect: { 心情: 4, 独立性: 3, 见识: 3, 勇气: 2 },
                        outcome: "独自旅行让你更加了解自己，也更加自信"
                    },
                    { 
                        text: "和好友结伴同行", 
                        effect: { 心情: 4, 社交: 3, 友谊: 3, 分享: 2 },
                        outcome: "和朋友的旅行充满欢声笑语，留下美好回忆"
                    },
                    { 
                        text: "加入旅行团", 
                        effect: { 心情: 2, 社交: 2, 见识: 2, 安全感: 2 },
                        outcome: "虽然不够自由，但认识了很多新朋友"
                    },
                    { 
                        text: "制定详细的自助游攻略", 
                        effect: { 心情: 3, 计划能力: 3, 见识: 4 },
                        outcome: "详细的攻略让旅行更加充实和有意义"
                    }
                ]
            },
            {
                id: "leisure_cooking_class",
                name: "烹饪课程体验",
                description: "你报名参加了一个周末烹饪课程，学习制作不同的美食。厨房里香味四溢...",
                time: "周末",
                mood: "有趣",
                choices: [
                    { 
                        text: "认真学习每个步骤", 
                        effect: { 生活技能: 4, 耐心: 2, 成就感: 2 },
                        outcome: "你学会了好几道菜，以后可以自己做饭了"
                    },
                    { 
                        text: "和其他学员互相帮助", 
                        effect: { 生活技能: 2, 社交: 3, 合作精神: 2 },
                        outcome: "在互相帮助中，你不仅学会了做菜还交到了朋友"
                    },
                    { 
                        text: "创新改良菜谱", 
                        effect: { 生活技能: 3, 创造力: 3, 冒险精神: 2 },
                        outcome: "你的创新菜品得到了老师的称赞"
                    }
                ]
            }
        ],

        偶遇: [
            // 浪漫偶遇场景
            {
                id: "encounter_rainy_day",
                name: "雨天邂逅",
                description: "突然下起了大雨，你没有带伞。就在你躲雨的时候，一把伞出现在你的头顶...",
                time: "任意",
                weather: "雨天",
                mood: "浪漫",
                randomEncounter: {
                    probability: 1.0,
                    characters: ["顾言", "苏云深", "林舟"],
                    scenario: "有人为你撑伞"
                }
            },
            {
                id: "encounter_library_book",
                name: "图书馆书籍偶遇",
                description: "在图书馆里，你和另一个人同时伸手去拿同一本书...",
                time: "任意",
                location: "图书馆",
                mood: "有趣",
                randomEncounter: {
                    probability: 1.0,
                    characters: ["顾言", "江澈", "萧然"],
                    scenario: "因为一本书的邂逅"
                }
            },
            {
                id: "encounter_cafeteria_help",
                name: "食堂助人偶遇",
                description: "在食堂里，你看到有人需要帮助...",
                time: "用餐时间",
                location: "食堂",
                mood: "温暖",
                choices: [
                    { 
                        text: "主动上前帮助", 
                        effect: { 善良: 3, 社交: 2, 助人为乐: 2 },
                        outcome: "你的善举得到了感谢，也赢得了好感"
                    },
                    { 
                        text: "默默观察", 
                        effect: { 观察力: 1 },
                        outcome: "你注意到了这个善良的瞬间"
                    }
                ]
            }
        ]
    },

    // 成就系统
    achievements: {
        学霸之路: { 
            description: "学习属性达到80", 
            condition: "学习 >= 80", 
            unlocked: false 
        },
        社交达人: { 
            description: "社交属性达到80", 
            condition: "社交 >= 80", 
            unlocked: false 
        },
        全面发展: { 
            description: "所有属性都达到50", 
            condition: "all >= 50", 
            unlocked: false 
        },
        初恋萌芽: { 
            description: "与任意角色好感度达到30", 
            condition: "any_affection >= 30", 
            unlocked: false 
        },
        真爱无敌: { 
            description: "与任意角色好感度达到100", 
            condition: "any_affection >= 100", 
            unlocked: false 
        }
    },

    // 结局系统
    endings: {
        学霸结局: {
            condition: "学习 >= 90",
            title: "学术精英",
            description: "你成为了学校的学术明星，获得了保研资格..."
        },
        社交女王: {
            condition: "社交 >= 90", 
            title: "人气王者",
            description: "你成为了学校最受欢迎的学生..."
        },
        爱情结局: {
            condition: "any_affection >= 100",
            title: "甜蜜恋人", 
            description: "你找到了属于自己的真爱..."
        }
    }
};

// 导出数据供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = gameData;
}
