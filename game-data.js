// 游戏数据定义
const gameData = {
    characters: {
        顾言: {
            name: "顾言",
            title: "冷酷学长",
            description: "计算机系研究生，外表冷酷但内心温柔",
            portrait: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200' viewBox='0 0 150 200'%3E%3Crect width='150' height='200' fill='%23e8f4fd'/%3E%3Ctext x='75' y='100' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'%3E顾言%3C/text%3E%3C/svg%3E"
        },
        林舟: {
            name: "林舟",
            title: "青梅竹马",
            description: "从小一起长大的邻家男孩，现在是体育系学生",
            portrait: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200' viewBox='0 0 150 200'%3E%3Crect width='150' height='200' fill='%23f0f8e8'/%3E%3Ctext x='75' y='100' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'%3E林舟%3C/text%3E%3C/svg%3E"
        },
        宋之南: {
            name: "宋之南",
            title: "神秘钢琴老师",
            description: "音乐学院的年轻钢琴老师，气质优雅神秘",
            portrait: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200' viewBox='0 0 150 200'%3E%3Crect width='150' height='200' fill='%23f8f0e8'/%3E%3Ctext x='75' y='100' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'%3E宋之南%3C/text%3E%3C/svg%3E"
        },
        周奕辰: {
            name: "周奕辰",
            title: "阳光学弟",
            description: "大一新生，性格开朗活泼，总是充满活力",
            portrait: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200' viewBox='0 0 150 200'%3E%3Crect width='150' height='200' fill='%23fff8e8'/%3E%3Ctext x='75' y='100' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'%3E周奕辰%3C/text%3E%3C/svg%3E"
        }
    },

    scenarios: {
        学习: [
            {
                scene: "图书馆",
                npc: "顾言",
                dialogue: "你在图书馆复习功课时，发现顾言学长也在这里。他正在专心看一本编程书籍。你想...",
                choices: [
                    { text: "走过去请教问题", affectionChange: { 顾言: 3 }, next: "guyan_study_talk" },
                    { text: "安静地在旁边学习", affectionChange: { 顾言: 1 }, next: "guyan_study_quiet" },
                    { text: "换个位置坐", affectionChange: {}, next: "study_alone" }
                ]
            },
            {
                scene: "自习室",
                npc: "",
                dialogue: "你在自习室认真复习，感觉学习效率很高。",
                choices: [
                    { text: "继续学习", affectionChange: {}, next: "study_continue" }
                ]
            }
        ],
        社交: [
            {
                scene: "宿舍",
                npc: "室友",
                dialogue: "室友们在讨论周末要不要一起去看电影。",
                choices: [
                    { text: "积极参与讨论", affectionChange: {}, next: "social_active" },
                    { text: "礼貌地拒绝", affectionChange: {}, next: "social_decline" }
                ]
            },
            {
                scene: "社团活动",
                npc: "林舟",
                dialogue: "在社团活动中遇到了林舟，他正在和其他人组织篮球比赛。",
                choices: [
                    { text: "主动上前打招呼", affectionChange: { 林舟: 3 }, next: "linzhou_social_greet" },
                    { text: "在一旁观看", affectionChange: { 林舟: 1 }, next: "linzhou_social_watch" },
                    { text: "离开去做别的事", affectionChange: {}, next: "social_leave" }
                ]
            }
        ],
        休闲: [
            {
                scene: "咖啡厅",
                npc: "宋之南",
                dialogue: "在校园咖啡厅里，你听到了优美的钢琴声。是宋老师在演奏。",
                choices: [
                    { text: "走近聆听", affectionChange: { 宋之南: 2 }, next: "songzhinan_music_listen" },
                    { text: "点一杯咖啡安静欣赏", affectionChange: { 宋之南: 1 }, next: "songzhinan_music_coffee" },
                    { text: "不想打扰，离开", affectionChange: {}, next: "leisure_leave" }
                ]
            },
            {
                scene: "公园",
                npc: "",
                dialogue: "你在校园附近的公园里散步，感觉心情很放松。",
                choices: [
                    { text: "继续散步", affectionChange: {}, next: "leisure_walk" }
                ]
            }
        ],
        偶遇: [
            {
                scene: "食堂",
                npc: "周奕辰",
                dialogue: "在食堂排队买饭时，前面的学弟周奕辰突然转过身来。'学姐！好巧啊！'",
                choices: [
                    { text: "热情地回应", affectionChange: { 周奕辰: 3 }, next: "zhouyichen_encounter_warm" },
                    { text: "礼貌地打招呼", affectionChange: { 周奕辰: 1 }, next: "zhouyichen_encounter_polite" },
                    { text: "只是点点头", affectionChange: {}, next: "encounter_nod" }
                ]
            },
            {
                scene: "雨天",
                npc: "顾言",
                dialogue: "突然下雨了，你没带伞。这时顾言学长出现在身边，默默撑起了伞。",
                choices: [
                    { text: "感谢他并一起走", affectionChange: { 顾言: 4 }, next: "guyan_rain_together" },
                    { text: "谢谢但是拒绝", affectionChange: { 顾言: 1 }, next: "guyan_rain_refuse" },
                    { text: "什么都不说", affectionChange: { 顾言: 2 }, next: "guyan_rain_silent" }
                ]
            }
        ]
    },

    continuations: {
        // 顾言相关剧情
        guyan_study_talk: {
            scene: "图书馆",
            npc: "顾言",
            dialogue: "顾言抬起头看着你，表情依然冷淡，但还是耐心地回答了你的问题。'这个算法的核心思想是...'",
            choices: [
                { text: "认真听讲", affectionChange: { 顾言: 2 }, next: "end_scene" },
                { text: "表示感谢", affectionChange: { 顾言: 1 }, next: "end_scene" }
            ]
        },
        guyan_study_quiet: {
            scene: "图书馆",
            npc: "顾言",
            dialogue: "你安静地在旁边学习，偶尔能感受到顾言学长专注的气场。他似乎注意到了你的存在，但没有说话。",
            choices: [
                { text: "继续学习", affectionChange: {}, next: "end_scene" }
            ]
        },
        guyan_rain_together: {
            scene: "雨中",
            npc: "顾言",
            dialogue: "两人在伞下并肩而行，你能闻到他身上淡淡的清香。'下次记得看天气预报。'他的声音很轻。",
            choices: [
                { text: "'会的，谢谢学长'", affectionChange: { 顾言: 1 }, next: "end_scene" },
                { text: "只是点点头", affectionChange: {}, next: "end_scene" }
            ]
        },

        // 林舟相关剧情
        linzhou_social_greet: {
            scene: "社团活动",
            npc: "林舟",
            dialogue: "林舟看到你，脸上露出灿烂的笑容。'哎呀，你也来了！要不要一起玩？'",
            choices: [
                { text: "好啊，一起玩", affectionChange: { 林舟: 2 }, next: "end_scene" },
                { text: "我就看看", affectionChange: { 林舟: 1 }, next: "end_scene" }
            ]
        },

        // 宋之南相关剧情
        songzhinan_music_listen: {
            scene: "咖啡厅",
            npc: "宋之南",
            dialogue: "宋老师注意到了你，演奏结束后向你微笑。'喜欢这首曲子吗？'",
            choices: [
                { text: "很喜欢，很美", affectionChange: { 宋之南: 2 }, next: "end_scene" },
                { text: "不太懂音乐", affectionChange: { 宋之南: 1 }, next: "end_scene" }
            ]
        },

        // 周奕辰相关剧情
        zhouyichen_encounter_warm: {
            scene: "食堂",
            npc: "周奕辰",
            dialogue: "周奕辰的眼睛亮了起来。'学姐，要不要一起吃饭？我请客！'",
            choices: [
                { text: "好啊，那就麻烦你了", affectionChange: { 周奕辰: 2 }, next: "end_scene" },
                { text: "不用了，我自己来", affectionChange: { 周奕辰: 1 }, next: "end_scene" }
            ]
        },

        // 默认结束
        end_scene: {
            scene: "",
            npc: "",
            dialogue: "今天的活动结束了。",
            choices: [
                { text: "继续", affectionChange: {}, next: "return_to_game" }
            ]
        }
    },

    endings: {
        顾言: {
            sweet: {
                title: "冰山融化·甜蜜结局",
                content: "经过这段时间的相处，顾言学长逐渐对你敞开心扉。在毕业典礼那天，他主动向你表白：'虽然我不善表达，但我想和你一直在一起。'你们的爱情如春日暖阳，温暖而长久。",
                requirement: { affection: 80, personality: ["理性", "内向"] }
            },
            normal: {
                title: "朋友以上·普通结局",
                content: "你和顾言学长成为了很好的朋友，他会在学习上给你帮助，你们保持着舒适的距离。虽然没有更进一步，但这份友谊也很珍贵。",
                requirement: { affection: 40 }
            },
            bad: {
                title: "擦肩而过·BE结局",
                content: "毕业后，你们各自忙碌着自己的生活。偶尔在社交媒体上看到他的动态，才会想起大学时代那个冷漠却温柔的学长。有些缘分，注定只能是青春回忆。",
                requirement: { affection: 20 }
            }
        },
        林舟: {
            sweet: {
                title: "青梅竹马·甜蜜结局",
                content: "从小到大的陪伴，终于在这个春天开花结果。林舟在你们经常去的那棵樱花树下向你表白：'从小就喜欢你，想要一直保护你。'青梅竹马的爱情，是最美好的童话。",
                requirement: { affection: 80, personality: ["开朗", "感性"] }
            },
            normal: {
                title: "挚友情深·普通结局",
                content: "你们依然是最好的朋友，就像小时候一样。虽然没有发展成恋人，但这份超越友谊的感情，让你们的关系更加珍贵和持久。",
                requirement: { affection: 40 }
            },
            bad: {
                title: "渐行渐远·BE结局",
                content: "随着各自生活圈子的变化，你们联系得越来越少。那个总是陪在你身边的男孩，慢慢变成了回忆中的影子。",
                requirement: { affection: 20 }
            }
        },
        宋之南: {
            sweet: {
                title: "琴瑟和鸣·甜蜜结局",
                content: "在一场音乐会后，宋老师为你弹奏了一首专属的曲子。'这首曲子，是我为你而作。'音乐成为了你们爱情的见证，优雅而浪漫。",
                requirement: { affection: 80, personality: ["感性"] }
            },
            normal: {
                title: "师生情谊·普通结局",
                content: "你们保持着师生的关系，他会指导你的音乐修养，你会欣赏他的才华。这份纯净的师生情，如音乐般美好。",
                requirement: { affection: 40 }
            },
            bad: {
                title: "曲终人散·BE结局",
                content: "毕业后你再没有接触音乐，那些美好的琴声也只存在于记忆中。你们的故事，如一首未完成的乐章。",
                requirement: { affection: 20 }
            }
        },
        周奕辰: {
            sweet: {
                title: "青春活力·甜蜜结局",
                content: "周奕辰的阳光感染了你，让你的大学生活变得更加精彩。在社团联谊会上，他大声向所有人宣布：'我要和最好的学姐在一起！'青春的爱情，就是这么直接而美好。",
                requirement: { affection: 80, personality: ["开朗"] }
            },
            normal: {
                title: "学长学弟·普通结局",
                content: "你们保持着很好的学长学弟关系，他总是很尊敬你，你也会关照这个可爱的学弟。",
                requirement: { affection: 40 }
            },
            bad: {
                title: "青春散场·BE结局",
                content: "毕业后你们失去了联系，那个总是充满活力的学弟，成为了青春记忆中的一抹亮色。",
                requirement: { affection: 20 }
            }
        }
    }
};
