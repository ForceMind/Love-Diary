/**
 * 心动日记 - 完整游戏数据
 * 整合所有角色、故事、场景、对话数据
 */
const GameData = {
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

    // 故事对话数据
    storyData: {
        // 初次相遇故事
        first_meeting: {
            顾言: {
                1: {
                    description: "在图书馆的计算机区，你注意到一个戴着眼镜的学长正在专心调试代码。屏幕上密密麻麻的代码让你感到敬佩，他修长的手指在键盘上飞快地敲击着。",
                    dialogue: "（察觉到你的目光，他抬起头来）这个递归算法确实有点复杂...你也在学编程吗？",
                    choices: [
                        {
                            text: "是的，但我还是初学者，能请教一下吗？",
                            effect: { affection: 3, trust: 2, impression: 2 },
                            next: 2,
                            hint: "谦虚求教的态度会让他有好感"
                        },
                        {
                            text: "看你专注的样子真的很帅呢",
                            effect: { affection: 1, trust: 0, impression: 2 },
                            next: 3,
                            hint: "直接的夸奖可能让他害羞"
                        },
                        {
                            text: "不好意思打扰你学习了",
                            effect: { affection: 1, trust: 2, impression: 1 },
                            next: 4,
                            hint: "礼貌的态度总是好的"
                        }
                    ]
                },
                2: {
                    description: "顾言的眼中闪过一丝惊喜，他轻轻推了推眼镜，将屏幕转向你的方向。",
                    dialogue: "当然可以！编程确实不容易入门，但一旦掌握就会发现它的魅力。这是一个关于二叉树遍历的问题，我来解释给你听...",
                    choices: [
                        {
                            text: "哇，你解释得好清楚！谢谢你！",
                            effect: { affection: 3, trust: 3, impression: 3 },
                            next: 5,
                            hint: "真诚的感谢会让关系更亲近"
                        },
                        {
                            text: "原来如此，你真是太厉害了",
                            effect: { affection: 2, trust: 2, impression: 3 },
                            next: 5,
                            hint: "夸奖他的能力"
                        }
                    ]
                },
                3: {
                    description: "顾言的脸微微红了，他有些不知所措地低下头，推了推眼镜。",
                    dialogue: "呃...谢谢夸奖。我只是...比较喜欢专注做事情。你是哪个系的？叫什么名字？",
                    choices: [
                        {
                            text: "我叫${playerName}，是${playerMajor}系的",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: 6,
                            hint: "友好的自我介绍"
                        },
                        {
                            text: "我是新生，刚来不久，还在适应",
                            effect: { affection: 1, trust: 1, impression: 1 },
                            next: 6,
                            hint: "让他了解你的情况"
                        }
                    ]
                },
                4: {
                    description: "顾言温和地摇了摇头，合上了笔记本。",
                    dialogue: "不会打扰的，图书馆本来就是大家共同学习的地方。而且我也正好需要休息一下。我是计算机系研究生顾言，你是？",
                    choices: [
                        {
                            text: "我是${playerMajor}系的${playerName}，很高兴认识你",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: 7,
                            hint: "正式的自我介绍"
                        },
                        {
                            text: "我也经常来图书馆，以后可能会经常遇到",
                            effect: { affection: 1, trust: 1, impression: 2 },
                            next: 7,
                            hint: "暗示以后可以再见面"
                        }
                    ]
                },
                5: {
                    description: "顾言露出了难得的笑容，眼中带着温暖的光芒。",
                    dialogue: "能帮到你我很开心。如果以后有什么编程问题，可以随时来找我。我通常下午都在这里。",
                    choices: [
                        {
                            text: "真的吗？那太好了！我会经常来的",
                            effect: { affection: 3, trust: 3, impression: 2 },
                            next: "end",
                            hint: "表现出对再次见面的期待"
                        },
                        {
                            text: "谢谢你这么耐心，我是${playerName}",
                            effect: { affection: 2, trust: 2, impression: 3 },
                            next: "end",
                            hint: "表达感谢并自我介绍"
                        }
                    ]
                },
                6: {
                    description: "听到你的回答，顾言点点头，神情变得放松了一些。",
                    dialogue: "原来如此。${playerMajor}系也很不错，我有个朋友也是这个专业的。大学生活还适应吗？",
                    choices: [
                        {
                            text: "还在适应中，不过遇到你这样的学长就安心多了",
                            effect: { affection: 2, trust: 2, impression: 3 },
                            next: "end",
                            hint: "让他感到被需要"
                        },
                        {
                            text: "挺好的，就是有时候课业有点难",
                            effect: { affection: 1, trust: 2, impression: 2 },
                            next: "end",
                            hint: "分享你的困难"
                        }
                    ]
                },
                7: {
                    description: "顾言伸出手，准备和你握手，动作虽然有些拘谨，但很真诚。",
                    dialogue: "很高兴认识你，${playerName}。如果有什么需要帮助的地方，可以随时找我。",
                    choices: [
                        {
                            text: "（握手）谢谢你，顾言学长",
                            effect: { affection: 2, trust: 3, impression: 2 },
                            next: "end",
                            hint: "接受他的友好gesture"
                        },
                        {
                            text: "那我就不客气了，以后多多指教",
                            effect: { affection: 1, trust: 2, impression: 2 },
                            next: "end",
                            hint: "表现出愿意深交的意愿"
                        }
                    ]
                }
            },
            林舟: {
                1: {
                    description: "在体育馆的篮球场上，你看到一个高大阳光的男生正在投篮。他的动作标准而流畅，几乎每球必中，汗水在灯光下闪闪发光。",
                    dialogue: "（注意到你在看）嘿！你也喜欢篮球吗？要不要一起来投几个？我可以教你！",
                    choices: [
                        {
                            text: "好啊！不过我技术不太好，你别笑我",
                            effect: { affection: 3, trust: 2, impression: 2 },
                            next: 2,
                            hint: "参与运动会让他开心"
                        },
                        {
                            text: "我只是路过，你投得真的很准",
                            effect: { affection: 1, trust: 1, impression: 3 },
                            next: 3,
                            hint: "夸奖他的球技"
                        },
                        {
                            text: "我不太会运动，就不献丑了",
                            effect: { affection: 1, trust: 1, impression: 1 },
                            next: 4,
                            hint: "诚实表达担心"
                        }
                    ]
                },
                2: {
                    description: "林舟灿烂地笑了，立刻将篮球传给你，眼中充满了热情。",
                    dialogue: "没关系！篮球最重要的是开心。来，我教你标准姿势，手要这样放...对！就是这样！你学得很快呢！",
                    choices: [
                        {
                            text: "谢谢你这么耐心地教我，你真是个好老师",
                            effect: { affection: 3, trust: 3, impression: 3 },
                            next: 5,
                            hint: "赞美他的耐心和教学能力"
                        },
                        {
                            text: "和你一起运动感觉真开心",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: 5,
                            hint: "表达愉快的感受"
                        }
                    ]
                },
                3: {
                    description: "林舟挠了挠头，露出阳光的笑容，有些不好意思。",
                    dialogue: "哈哈，多练习的结果啦！我是体育系的林舟。其实运动不一定要很厉害，重要的是享受过程。你经常来体育馆吗？",
                    choices: [
                        {
                            text: "偶尔来，想要锻炼身体但不知道从哪开始",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: 6,
                            hint: "表现出想要改变的积极态度"
                        },
                        {
                            text: "第一次来，看起来很有趣的样子",
                            effect: { affection: 1, trust: 1, impression: 2 },
                            next: 6,
                            hint: "展现好奇心"
                        }
                    ]
                },
                4: {
                    description: "林舟点点头，露出理解的表情，丝毫没有失望的样子。",
                    dialogue: "那也完全没关系！运动有很多种呢，不一定要很激烈。散步、瑜伽、甚至拉伸都是很好的运动。最重要的是找到适合自己的方式。",
                    choices: [
                        {
                            text: "你说得对，也许我可以尝试一些轻松的运动",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: 7,
                            hint: "接受他的建议"
                        },
                        {
                            text: "你人真好，很为别人着想呢",
                            effect: { affection: 3, trust: 2, impression: 3 },
                            next: 7,
                            hint: "赞美他的人格"
                        }
                    ]
                },
                5: {
                    description: "林舟开心地拍了拍你的肩膀，脸上洋溢着真诚的笑容。",
                    dialogue: "能和新朋友一起运动我也很开心！对了，我还不知道你的名字呢。如果你想的话，我们可以经常一起来锻炼。",
                    choices: [
                        {
                            text: "我叫${playerName}，很高兴认识你！",
                            effect: { affection: 3, trust: 3, impression: 2 },
                            next: "end",
                            hint: "热情地自我介绍"
                        },
                        {
                            text: "好啊，有你带着我就不怕了",
                            effect: { affection: 2, trust: 3, impression: 2 },
                            next: "end",
                            hint: "表现出对他的依赖和信任"
                        }
                    ]
                },
                6: {
                    description: "林舟的眼睛亮了起来，显然对你的积极态度很感兴趣。",
                    dialogue: "那太好了！其实运动最重要的就是开始。我可以给你制定一个适合初学者的计划，从简单的开始，慢慢进步。",
                    choices: [
                        {
                            text: "真的吗？那就拜托你了！",
                            effect: { affection: 3, trust: 2, impression: 2 },
                            next: "end",
                            hint: "接受他的帮助"
                        },
                        {
                            text: "你真是太热心了，我是${playerName}",
                            effect: { affection: 2, trust: 2, impression: 3 },
                            next: "end",
                            hint: "感谢并自我介绍"
                        }
                    ]
                },
                7: {
                    description: "林舟认真地点点头，眼中充满了关怀。",
                    dialogue: "没问题！每个人的身体条件不同，找到适合自己的方式最重要。如果你想尝试，我随时可以陪你。我是林舟，你呢？",
                    choices: [
                        {
                            text: "我是${playerName}，谢谢你的耐心",
                            effect: { affection: 2, trust: 3, impression: 2 },
                            next: "end",
                            hint: "感谢他的理解"
                        },
                        {
                            text: "有你这样的朋友真是太好了",
                            effect: { affection: 3, trust: 2, impression: 3 },
                            next: "end",
                            hint: "直接表达友好"
                        }
                    ]
                }
            },
            宋之南: {
                1: {
                    description: "在音乐楼的钢琴教室里，你听到了优美的琴声。透过半开的门，你看到一位气质优雅的老师正在演奏德彪西的《月光》，他的神情专注而忘我。",
                    dialogue: "（演奏结束，优雅地转身）这首德彪西的《月光》，你觉得怎么样？",
                    choices: [
                        {
                            text: "非常美妙，您弹得真是太棒了",
                            effect: { affection: 2, trust: 1, impression: 3 },
                            next: 2,
                            hint: "真诚的赞美音乐"
                        },
                        {
                            text: "我不太懂音乐，但感觉很美很感动",
                            effect: { affection: 1, trust: 2, impression: 2 },
                            next: 3,
                            hint: "诚实表达感受"
                        },
                        {
                            text: "抱歉打扰您练习了",
                            effect: { affection: 1, trust: 1, impression: 2 },
                            next: 4,
                            hint: "礼貌的道歉"
                        }
                    ]
                },
                2: {
                    description: "宋之南温和地笑了，眼中闪过一丝欣赏的光芒。",
                    dialogue: "谢谢你的夸奖。能遇到欣赏古典音乐的学生真是难得。德彪西的印象派音乐需要用心去感受，你能听出它的美，说明你很有音乐天赋。",
                    choices: [
                        {
                            text: "我学过一点钢琴，但水平很一般",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: 5,
                            hint: "谦虚地提及自己的基础"
                        },
                        {
                            text: "没有天赋，只是单纯觉得好听",
                            effect: { affection: 1, trust: 2, impression: 1 },
                            next: 5,
                            hint: "过分谦虚"
                        },
                        {
                            text: "我很想学音乐，能向您请教吗？",
                            effect: { affection: 3, trust: 2, impression: 2 },
                            next: 5,
                            hint: "表现学习欲望"
                        }
                    ]
                },
                3: {
                    description: "宋之南点了点头，表情变得更加柔和。",
                    dialogue: "音乐不需要深奥的理论才能感受。你能感受到美，被音乐感动，这已经足够了。真正的音乐欣赏来自内心，而不是知识。",
                    choices: [
                        {
                            text: "你的话让我很感动，我是${playerName}",
                            effect: { affection: 2, trust: 1, impression: 3 },
                            next: 6,
                            hint: "表达被感动的心情"
                        },
                        {
                            text: "您真是位有智慧的老师",
                            effect: { affection: 1, trust: 1, impression: 3 },
                            next: 6,
                            hint: "夸奖他的深度"
                        }
                    ]
                },
                4: {
                    description: "宋之南轻轻摇头，眼神温和而包容。",
                    dialogue: "不会的，音乐本来就是要与人分享的。能有人愿意聆听，是我的荣幸。你是音乐学院的学生吗？",
                    choices: [
                        {
                            text: "不是，我是${playerMajor}系的，只是路过被吸引了",
                            effect: { affection: 1, trust: 2, impression: 2 },
                            next: 7,
                            hint: "说明自己的来历"
                        },
                        {
                            text: "我下次还能来听您弹琴吗？",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: 7,
                            hint: "表达继续聆听的愿望"
                        }
                    ]
                },
                5: {
                    description: "宋之南的眼中透露出欣慰的神色。",
                    dialogue: "无论基础如何，对音乐的热爱最为珍贵。如果你愿意，我很乐意为你演奏更多曲目，或者给你一些指导。",
                    choices: [
                        {
                            text: "真的吗？那太好了！我一定会认真学习",
                            effect: { affection: 3, trust: 3, impression: 3 },
                            next: "end",
                            hint: "表现出认真的学习态度"
                        },
                        {
                            text: "谢谢你的善意，我叫${playerName}",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: "end",
                            hint: "感谢并自我介绍"
                        }
                    ]
                },
                6: {
                    description: "宋之南优雅地点头致意。",
                    dialogue: "很高兴认识你，${playerName}。音乐是一种通用的语言，不分专业，不分年龄。如果你对音乐有兴趣，随时欢迎你来。",
                    choices: [
                        {
                            text: "谢谢您，宋老师，我一定会来的",
                            effect: { affection: 2, trust: 2, impression: 3 },
                            next: "end",
                            hint: "礼貌地称呼并表达意愿"
                        },
                        {
                            text: "能认识您真是我的荣幸",
                            effect: { affection: 1, trust: 1, impression: 3 },
                            next: "end",
                            hint: "表达敬意"
                        }
                    ]
                },
                7: {
                    description: "宋之南微微一笑，神情变得更加亲切。",
                    dialogue: "音乐没有界限，任何人都可以享受它的美。我通常在下午4点后会在这里练习，如果你有时间，欢迎随时来听。",
                    choices: [
                        {
                            text: "太好了，我叫${playerName}，谢谢你的邀请",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: "end",
                            hint: "接受邀请并自我介绍"
                        },
                        {
                            text: "您真是太友善了，我会珍惜这个机会",
                            effect: { affection: 1, trust: 2, impression: 3 },
                            next: "end",
                            hint: "表达珍惜"
                        }
                    ]
                }
            },
            周奕辰: {
                1: {
                    description: "在摄影社的活动室里，你看到一个年轻的男生正在整理相机设备，眼中闪烁着兴奋的光芒。他注意到你在门口，立刻友好地挥手。",
                    dialogue: "嗨！你是来参加摄影社活动的吗？我是周奕辰，大一新生！这里的设备都超棒的！",
                    choices: [
                        {
                            text: "你好！我是来看看的，你看起来很兴奋呢",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: 2,
                            hint: "友好回应他的热情"
                        },
                        {
                            text: "我对摄影有点兴趣，但完全是新手",
                            effect: { affection: 2, trust: 1, impression: 2 },
                            next: 3,
                            hint: "表达兴趣但承认不足"
                        },
                        {
                            text: "哇，这些相机看起来好专业",
                            effect: { affection: 1, trust: 1, impression: 2 },
                            next: 4,
                            hint: "专注于设备"
                        }
                    ]
                },
                2: {
                    description: "周奕辰开心地点点头，眼中充满了青春的活力。",
                    dialogue: "对啊！因为终于可以用这些专业设备了！高中的时候只能用手机拍照。你要不要试试？我可以教你基本操作！",
                    choices: [
                        {
                            text: "好啊！你真是太热心了",
                            effect: { affection: 3, trust: 2, impression: 2 },
                            next: 5,
                            hint: "接受他的好意"
                        },
                        {
                            text: "不会弄坏吧？这些设备看起来很贵",
                            effect: { affection: 1, trust: 1, impression: 1 },
                            next: 5,
                            hint: "表现出担心"
                        }
                    ]
                },
                3: {
                    description: "周奕辰的眼睛亮了起来，似乎找到了同道中人。",
                    dialogue: "太好了！我也是新手，我们可以一起学习！摄影最重要的不是技术，而是要有发现美的眼睛。你觉得什么最美？",
                    choices: [
                        {
                            text: "我觉得自然风景很美，特别是日出日落",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: 6,
                            hint: "分享你的美学观点"
                        },
                        {
                            text: "人与人之间的真诚感情最美",
                            effect: { affection: 3, trust: 2, impression: 3 },
                            next: 6,
                            hint: "表达对人文的关注"
                        },
                        {
                            text: "我还在摸索，希望能慢慢发现",
                            effect: { affection: 1, trust: 1, impression: 1 },
                            next: 6,
                            hint: "保持开放态度"
                        }
                    ]
                },
                4: {
                    description: "周奕辰兴奋地拿起一台相机，小心翼翼地展示给你看。",
                    dialogue: "对不对！这是尼康的最新款，还有这个佳能的镜头，拍人像特别棒！你想试试拍几张吗？",
                    choices: [
                        {
                            text: "可以吗？我会很小心的",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: 7,
                            hint: "表现出对体验的渴望"
                        },
                        {
                            text: "你对设备真的很了解呢",
                            effect: { affection: 1, trust: 1, impression: 3 },
                            next: 7,
                            hint: "夸奖他的专业知识"
                        }
                    ]
                },
                5: {
                    description: "周奕辰摆摆手，笑得很灿烂。",
                    dialogue: "不用担心！我会在旁边指导你的。而且这些设备没有想象中那么脆弱。来，先从这个基础款开始，感受一下拍照的乐趣！",
                    choices: [
                        {
                            text: "好，那我就试试看！",
                            effect: { affection: 3, trust: 3, impression: 2 },
                            next: "end",
                            hint: "勇敢尝试新事物"
                        },
                        {
                            text: "你真的很会鼓励人呢",
                            effect: { affection: 2, trust: 2, impression: 3 },
                            next: "end",
                            hint: "夸奖他的人格魅力"
                        }
                    ]
                },
                6: {
                    description: "周奕辰认真地点点头，显然被你的回答打动了。",
                    dialogue: "哇，说得真好！我觉得我们会成为很好的摄影伙伴。对了，我还不知道你的名字呢，我是周奕辰！",
                    choices: [
                        {
                            text: "我是${playerName}，很高兴认识你！",
                            effect: { affection: 3, trust: 2, impression: 2 },
                            next: "end",
                            hint: "友好地自我介绍"
                        },
                        {
                            text: "我也这么觉得，我们一起加油吧！",
                            effect: { affection: 2, trust: 3, impression: 2 },
                            next: "end",
                            hint: "表达合作意愿"
                        }
                    ]
                },
                7: {
                    description: "周奕辰开心地递给你相机，耐心地指导着。",
                    dialogue: "当然可以！来，这样握相机，对焦是这个按钮...哇，你第一次拍就很有感觉呢！继续保持这种好奇心！",
                    choices: [
                        {
                            text: "谢谢你的耐心指导，我是${playerName}",
                            effect: { affection: 2, trust: 3, impression: 2 },
                            next: "end",
                            hint: "感谢并自我介绍"
                        },
                        {
                            text: "和你一起真的很开心",
                            effect: { affection: 3, trust: 2, impression: 3 },
                            next: "end",
                            hint: "表达愉快的感受"
                        }
                    ]
                }
            }
            // 可以继续添加其他角色的初次相遇故事...
        },

        // 日常互动故事
        interaction: {
            顾言: {
                1: {
                    description: "你再次在图书馆遇到了顾言，他正在调试一段复杂的代码，眉头微皱，看起来遇到了难题。",
                    dialogue: "咦，是你啊。这个并发问题真是让人头疼...你最近学习怎么样？",
                    choices: [
                        {
                            text: "我也遇到了一些编程问题，能请教你吗？",
                            effect: { affection: 2, trust: 2, impression: 1 },
                            next: 2,
                            hint: "寻求他的帮助"
                        },
                        {
                            text: "看起来你遇到困难了，要不要一起想想办法？",
                            effect: { affection: 1, trust: 3, impression: 2 },
                            next: 3,
                            hint: "主动提供帮助"
                        },
                        {
                            text: "要不要休息一下？我带了咖啡",
                            effect: { affection: 2, trust: 1, impression: 2 },
                            next: 4,
                            hint: "关心他的状态"
                        }
                    ]
                },
                2: {
                    description: "顾言立刻转过身来，眼中透露出关心，暂时放下了自己的问题。",
                    dialogue: "当然可以！遇到什么问题了？我们一起看看，说不定我也能从你的问题中得到启发。",
                    choices: [
                        {
                            text: "谢谢你总是这么乐意帮助我",
                            effect: { affection: 3, trust: 3, impression: 2 },
                            next: "end",
                            hint: "表达感激之情"
                        },
                        {
                            text: "真的吗？那我们一起攻克难题吧！",
                            effect: { affection: 2, trust: 2, impression: 3 },
                            next: "end",
                            hint: "表现出合作精神"
                        }
                    ]
                },
                3: {
                    description: "顾言有些意外，但很快露出了感激的表情。",
                    dialogue: "你愿意帮我？这个问题确实很棘手...不过有时候新的视角能带来突破。谢谢你。",
                    choices: [
                        {
                            text: "我们是朋友嘛，互相帮助是应该的",
                            effect: { affection: 3, trust: 3, impression: 3 },
                            next: "end",
                            hint: "强调友谊关系"
                        },
                        {
                            text: "虽然我可能帮不上什么忙，但愿意尝试",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: "end",
                            hint: "谦虚但积极"
                        }
                    ]
                },
                4: {
                    description: "顾言抬头看着你，眼中闪过一丝温暖。",
                    dialogue: "你总是这么体贴...确实需要休息一下了。谢谢你的咖啡，我们一起坐一会儿吧。",
                    choices: [
                        {
                            text: "我注意到你经常熬夜，要注意身体",
                            effect: { affection: 2, trust: 2, impression: 3 },
                            next: "end",
                            hint: "表现出对他的关心"
                        },
                        {
                            text: "和你聊天总是很有收获",
                            effect: { affection: 3, trust: 2, impression: 2 },
                            next: "end",
                            hint: "表达对交流的喜爱"
                        }
                    ]
                }
            },
            林舟: {
                1: {
                    description: "在体育馆里，你又遇到了林舟。这次他在做拉伸运动，看到你进来，立刻挥手打招呼。",
                    dialogue: "嘿！${playerName}！你来得正好，我正准备做一些基础训练，要不要一起？",
                    choices: [
                        {
                            text: "好啊！上次你教我的还记得呢",
                            effect: { affection: 3, trust: 2, impression: 2 },
                            next: 2,
                            hint: "表现出进步和记忆"
                        },
                        {
                            text: "今天身体有点累，能先看你练习吗？",
                            effect: { affection: 1, trust: 2, impression: 1 },
                            next: 3,
                            hint: "诚实表达状态"
                        },
                        {
                            text: "你每天都这么有活力呢",
                            effect: { affection: 2, trust: 1, impression: 3 },
                            next: 4,
                            hint: "夸奖他的精神状态"
                        }
                    ]
                },
                2: {
                    description: "林舟开心地拍了拍手，眼中充满了欣慰。",
                    dialogue: "太好了！我就知道你很有运动天赋。今天我们可以尝试一些新的动作，你准备好了吗？",
                    choices: [
                        {
                            text: "准备好了！有你指导我很安心",
                            effect: { affection: 3, trust: 3, impression: 2 },
                            next: "end",
                            hint: "表达信任"
                        },
                        {
                            text: "我会努力跟上的！",
                            effect: { affection: 2, trust: 2, impression: 2 },
                            next: "end",
                            hint: "表现出努力的决心"
                        }
                    ]
                }
            }
            // 可以继续添加更多角色的互动故事...
        }
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
