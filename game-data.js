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
        },
        江澈: {
            name: "江澈",
            title: "文艺社长",
            description: "文学社社长，温文尔雅的诗人气质，总是在图书馆写作",
            portrait: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200' viewBox='0 0 150 200'%3E%3Crect width='150' height='200' fill='%23f5f0e8'/%3E%3Ctext x='75' y='100' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'%3E江澈%3C/text%3E%3C/svg%3E"
        },
        苏云深: {
            name: "苏云深",
            title: "医学天才",
            description: "医学院的天才学生，成熟稳重，有着治愈系的温柔",
            portrait: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200' viewBox='0 0 150 200'%3E%3Crect width='150' height='200' fill='%23e8f5f0'/%3E%3Ctext x='75' y='100' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'%3E苏云深%3C/text%3E%3C/svg%3E"
        },
        唐言: {
            name: "唐言",
            title: "霸道总裁",
            description: "商学院学生会主席，家境优渥，外表强势内心柔软",
            portrait: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200' viewBox='0 0 150 200'%3E%3Crect width='150' height='200' fill='%23f8e8f0'/%3E%3Ctext x='75' y='100' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'%3E唐言%3C/text%3E%3C/svg%3E"
        },
        萧然: {
            name: "萧然",
            title: "神秘画家",
            description: "美术系的才华横溢的画家，性格孤僻但内心热情",
            portrait: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200' viewBox='0 0 150 200'%3E%3Crect width='150' height='200' fill='%23f0e8f8'/%3E%3Ctext x='75' y='100' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'%3E萧然%3C/text%3E%3C/svg%3E"
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
                scene: "文学讲座",
                npc: "江澈",
                dialogue: "你参加了一场文学讲座，发现文学社社长江澈正在台上分享他的诗歌创作心得。",
                choices: [
                    { text: "认真聆听并做笔记", affectionChange: { 江澈: 3 }, next: "jiangche_lecture_notes" },
                    { text: "会后上前交流", affectionChange: { 江澈: 2 }, next: "jiangche_lecture_talk" },
                    { text: "安静离开", affectionChange: {}, next: "study_alone" }
                ]
            },
            {
                scene: "医学实验室",
                npc: "苏云深",
                dialogue: "在选修课上，你来到医学院参观。苏云深正在做实验，专注的神情很有魅力。",
                choices: [
                    { text: "好奇地询问实验内容", affectionChange: { 苏云深: 3 }, next: "suyunshen_lab_ask" },
                    { text: "默默观察", affectionChange: { 苏云深: 1 }, next: "suyunshen_lab_watch" },
                    { text: "觉得无聊，去别处", affectionChange: {}, next: "study_alone" }
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
            },
            {
                scene: "学生会办公室",
                npc: "唐言",
                dialogue: "你来到学生会办公室办事，发现学生会主席唐言正在处理一堆文件，看起来很忙碌。",
                choices: [
                    { text: "主动询问是否需要帮助", affectionChange: { 唐言: 3 }, next: "tangyan_office_help" },
                    { text: "安静等待", affectionChange: { 唐言: 1 }, next: "tangyan_office_wait" },
                    { text: "改天再来", affectionChange: {}, next: "social_leave" }
                ]
            },
            {
                scene: "美术展览",
                npc: "萧然",
                dialogue: "在校园美术展览上，你被一幅画深深吸引。画家萧然就站在旁边，神情有些紧张。",
                choices: [
                    { text: "真诚地赞美这幅画", affectionChange: { 萧然: 3 }, next: "xiaoran_art_praise" },
                    { text: "询问创作灵感", affectionChange: { 萧然: 2 }, next: "xiaoran_art_ask" },
                    { text: "默默欣赏", affectionChange: { 萧然: 1 }, next: "xiaoran_art_watch" }
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
                scene: "书店",
                npc: "江澈",
                dialogue: "在校外的书店里，你偶遇了江澈。他正在诗歌区域认真挑选书籍。",
                choices: [
                    { text: "上前推荐自己喜欢的诗集", affectionChange: { 江澈: 3 }, next: "jiangche_bookstore_recommend" },
                    { text: "询问他在看什么书", affectionChange: { 江澈: 2 }, next: "jiangche_bookstore_ask" },
                    { text: "保持距离，不打扰", affectionChange: {}, next: "leisure_leave" }
                ]
            },
            {
                scene: "咖啡厅",
                npc: "苏云深",
                dialogue: "在咖啡厅学习时，苏云深端着咖啡坐在了你对面。他似乎在看医学书籍。",
                choices: [
                    { text: "主动打招呼", affectionChange: { 苏云深: 2 }, next: "suyunshen_cafe_greet" },
                    { text: "继续学习，偶尔偷看", affectionChange: { 苏云深: 1 }, next: "suyunshen_cafe_study" },
                    { text: "换个位置坐", affectionChange: {}, next: "leisure_leave" }
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
            },
            {
                scene: "校医务室",
                npc: "苏云深",
                dialogue: "你因为轻微扭伤来到医务室，发现苏云深正在帮忙。他温柔地询问你的情况。",
                choices: [
                    { text: "详细说明情况", affectionChange: { 苏云深: 3 }, next: "suyunshen_medical_detail" },
                    { text: "说没什么大碍", affectionChange: { 苏云深: 1 }, next: "suyunshen_medical_simple" },
                    { text: "要求换别的医生", affectionChange: {}, next: "encounter_nod" }
                ]
            },
            {
                scene: "校园夜晚",
                npc: "萧然",
                dialogue: "深夜在校园里散步时，你看到萧然独自坐在湖边画夜景。月光下的他显得格外孤独。",
                choices: [
                    { text: "轻声询问可否一起欣赏", affectionChange: { 萧然: 3 }, next: "xiaoran_night_together" },
                    { text: "静静地在旁边坐下", affectionChange: { 萧然: 2 }, next: "xiaoran_night_sit" },
                    { text: "不想打扰，悄悄离开", affectionChange: {}, next: "encounter_nod" }
                ]
            },
            {
                scene: "校门口豪车",
                npc: "唐言",
                dialogue: "放学时在校门口，你看到唐言正在和司机说话。他注意到你的目光，朝你走来。",
                choices: [
                    { text: "等他过来", affectionChange: { 唐言: 2 }, next: "tangyan_car_wait" },
                    { text: "主动上前打招呼", affectionChange: { 唐言: 3 }, next: "tangyan_car_greet" },
                    { text: "假装没看见，快速离开", affectionChange: {}, next: "encounter_nod" }
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

        // 江澈相关剧情
        jiangche_lecture_notes: {
            scene: "文学讲座",
            npc: "江澈",
            dialogue: "讲座结束后，江澈注意到了你认真的笔记。'没想到有人这么用心地听我的分享，很感动。'",
            choices: [
                { text: "您的诗很有感染力", affectionChange: { 江澈: 2 }, next: "end_scene" },
                { text: "我对文学很感兴趣", affectionChange: { 江澈: 1 }, next: "end_scene" }
            ]
        },
        jiangche_lecture_talk: {
            scene: "文学讲座",
            npc: "江澈",
            dialogue: "江澈温和地笑了笑。'谢谢你的聆听，有什么想法可以和我交流。'",
            choices: [
                { text: "询问他的创作灵感", affectionChange: { 江澈: 2 }, next: "end_scene" },
                { text: "请教诗歌写作技巧", affectionChange: { 江澈: 1 }, next: "end_scene" }
            ]
        },
        jiangche_bookstore_recommend: {
            scene: "书店",
            npc: "江澈",
            dialogue: "江澈认真地听你推荐，眼中闪过一丝惊喜。'原来你也喜欢这位诗人，真是知音啊。'",
            choices: [
                { text: "可以一起讨论诗歌", affectionChange: { 江澈: 2 }, next: "end_scene" },
                { text: "微笑点头", affectionChange: { 江澈: 1 }, next: "end_scene" }
            ]
        },
        jiangche_bookstore_ask: {
            scene: "书店",
            npc: "江澈",
            dialogue: "江澈向你展示手中的诗集。'在寻找一些新的灵感，这本诗集的意境很美。'",
            choices: [
                { text: "请他分享感悟", affectionChange: { 江澈: 1 }, next: "end_scene" },
                { text: "一起挑选书籍", affectionChange: { 江澈: 2 }, next: "end_scene" }
            ]
        },

        // 苏云深相关剧情
        suyunshen_lab_ask: {
            scene: "医学实验室",
            npc: "苏云深",
            dialogue: "苏云深耐心地为你解释实验内容，声音温和。'这是在研究新的治疗方法，希望能帮助更多患者。'",
            choices: [
                { text: "你真的很了不起", affectionChange: { 苏云深: 2 }, next: "end_scene" },
                { text: "医学确实很神奇", affectionChange: { 苏云深: 1 }, next: "end_scene" }
            ]
        },
        suyunshen_lab_watch: {
            scene: "医学实验室",
            npc: "苏云深",
            dialogue: "苏云深注意到你的目光，温和地笑了笑，继续专注于实验。",
            choices: [
                { text: "继续观察", affectionChange: {}, next: "end_scene" }
            ]
        },
        suyunshen_cafe_greet: {
            scene: "咖啡厅",
            npc: "苏云深",
            dialogue: "苏云深抬起头，温暖地笑了。'你好，要一起学习吗？我可以帮你答疑。'",
            choices: [
                { text: "太好了，谢谢你", affectionChange: { 苏云深: 2 }, next: "end_scene" },
                { text: "不用麻烦了", affectionChange: { 苏云深: 1 }, next: "end_scene" }
            ]
        },
        suyunshen_cafe_study: {
            scene: "咖啡厅",
            npc: "苏云深",
            dialogue: "苏云深似乎感受到了你的目光，偶尔会朝你微笑。",
            choices: [
                { text: "继续学习", affectionChange: {}, next: "end_scene" }
            ]
        },
        suyunshen_medical_detail: {
            scene: "校医务室",
            npc: "苏云深",
            dialogue: "苏云深仔细检查你的伤势，动作很轻柔。'放心，只是轻微扭伤，我来帮你处理。'",
            choices: [
                { text: "谢谢你这么细心", affectionChange: { 苏云深: 2 }, next: "end_scene" },
                { text: "麻烦你了", affectionChange: { 苏云深: 1 }, next: "end_scene" }
            ]
        },
        suyunshen_medical_simple: {
            scene: "校医务室",
            npc: "苏云深",
            dialogue: "苏云深温和地说：'还是让我检查一下比较好，安全第一。'",
            choices: [
                { text: "那就麻烦你了", affectionChange: { 苏云深: 1 }, next: "end_scene" }
            ]
        },

        // 唐言相关剧情
        tangyan_office_help: {
            scene: "学生会办公室",
            npc: "唐言",
            dialogue: "唐言抬起头，眼中闪过一丝意外。'你愿意帮忙？那太好了，这些文件需要整理。'",
            choices: [
                { text: "没问题，我来帮你", affectionChange: { 唐言: 2 }, next: "end_scene" },
                { text: "我尽力而为", affectionChange: { 唐言: 1 }, next: "end_scene" }
            ]
        },
        tangyan_office_wait: {
            scene: "学生会办公室",
            npc: "唐言",
            dialogue: "唐言注意到你耐心等待，放下手中的工作。'不好意思让你久等了，有什么事吗？'",
            choices: [
                { text: "说明来意", affectionChange: { 唐言: 1 }, next: "end_scene" }
            ]
        },
        tangyan_car_wait: {
            scene: "校门口",
            npc: "唐言",
            dialogue: "唐言走到你面前，绅士地问道：'需要我送你回去吗？'",
            choices: [
                { text: "好的，谢谢", affectionChange: { 唐言: 2 }, next: "end_scene" },
                { text: "不用了，我自己回去", affectionChange: { 唐言: 1 }, next: "end_scene" }
            ]
        },
        tangyan_car_greet: {
            scene: "校门口",
            npc: "唐言",
            dialogue: "唐言露出惊喜的表情。'真巧遇到你，要不要一起去吃晚饭？'",
            choices: [
                { text: "好啊，去哪里呢？", affectionChange: { 唐言: 3 }, next: "end_scene" },
                { text: "今天不太方便", affectionChange: { 唐言: 1 }, next: "end_scene" }
            ]
        },

        // 萧然相关剧情
        xiaoran_art_praise: {
            scene: "美术展览",
            npc: "萧然",
            dialogue: "萧然的脸微微红了，低声说道：'谢谢...很久没有人这样认真地欣赏我的画了。'",
            choices: [
                { text: "你的画很有感染力", affectionChange: { 萧然: 2 }, next: "end_scene" },
                { text: "我很喜欢这种风格", affectionChange: { 萧然: 1 }, next: "end_scene" }
            ]
        },
        xiaoran_art_ask: {
            scene: "美术展览",
            npc: "萧然",
            dialogue: "萧然犹豫了一下，然后轻声说：'这幅画...是我在深夜时的感悟，关于孤独与美。'",
            choices: [
                { text: "能感受到你的情感", affectionChange: { 萧然: 2 }, next: "end_scene" },
                { text: "很有深度", affectionChange: { 萧然: 1 }, next: "end_scene" }
            ]
        },
        xiaoran_art_watch: {
            scene: "美术展览",
            npc: "萧然",
            dialogue: "萧然注意到你专注的神情，似乎放松了一些。",
            choices: [
                { text: "继续欣赏", affectionChange: {}, next: "end_scene" }
            ]
        },
        xiaoran_night_together: {
            scene: "校园夜晚",
            npc: "萧然",
            dialogue: "萧然抬起头看了看你，然后轻轻点头。'夜晚的确很美，一个人画画有时会觉得寂寞。'",
            choices: [
                { text: "我可以陪你", affectionChange: { 萧然: 3 }, next: "end_scene" },
                { text: "艺术需要静心", affectionChange: { 萧然: 1 }, next: "end_scene" }
            ]
        },
        xiaoran_night_sit: {
            scene: "校园夜晚",
            npc: "萧然",
            dialogue: "萧然注意到你坐下，没有说话，但嘴角微微上扬。你们一起静静地欣赏夜景。",
            choices: [
                { text: "享受这份宁静", affectionChange: { 萧然: 2 }, next: "end_scene" }
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
        },
        江澈: {
            sweet: {
                title: "诗意人生·甜蜜结局",
                content: "江澈为你写下了一首专属的诗。在文学社的毕业晚会上，他当众朗诵：'你是我笔下最美的诗行，愿与你共写人生华章。'文字见证了你们的爱情，诗意而永恒。",
                requirement: { affection: 80, personality: ["感性", "内向"] }
            },
            normal: {
                title: "文学知音·普通结局",
                content: "你们成为了文学路上的知音，经常一起讨论诗歌和文学。虽然没有发展成恋人，但这份精神上的契合让人羡慕。",
                requirement: { affection: 40 }
            },
            bad: {
                title: "诗意落空·BE结局",
                content: "毕业后，你们各自走上不同的道路。偶尔翻阅他的诗集，才会想起那个温文尔雅的文学社长。",
                requirement: { affection: 20 }
            }
        },
        苏云深: {
            sweet: {
                title: "医者仁心·甜蜜结局",
                content: "苏云深在医学院的樱花树下向你表白：'做医生是为了治愈别人，遇到你是为了治愈自己。'他的温柔如春风化雨，你们的爱情如医者仁心，温暖而治愈。",
                requirement: { affection: 80, personality: ["理性", "感性"] }
            },
            normal: {
                title: "温暖友谊·普通结局",
                content: "苏云深成为你生活中的温暖存在，偶尔身体不舒服时他总会细心照顾。这份友谊如医者般温暖可靠。",
                requirement: { affection: 40 }
            },
            bad: {
                title: "悬壶济世·BE结局",
                content: "苏云深专注于医学事业，你们渐渐失去联系。他成为了优秀的医生，而你只是他青春记忆中的一个片段。",
                requirement: { affection: 20 }
            }
        },
        唐言: {
            sweet: {
                title: "霸道深情·甜蜜结局",
                content: "唐言在学校最高的天台上，用满天的烟花向你表白：'我可以给你全世界最好的，但我最想要的是你的心。'霸道总裁式的爱情，却有着最真挚的感情。",
                requirement: { affection: 80, personality: ["开朗", "理性"] }
            },
            normal: {
                title: "良师益友·普通结局",
                content: "唐言成为你人生路上的导师，在职业规划上给你很多帮助。你们保持着良好的合作关系。",
                requirement: { affection: 40 }
            },
            bad: {
                title: "商海浮沉·BE结局",
                content: "唐言专注于商业发展，你们的世界越来越远。他成为了成功的企业家，而你只是他学生时代的一段回忆。",
                requirement: { affection: 20 }
            }
        },
        萧然: {
            sweet: {
                title: "艺术之恋·甜蜜结局",
                content: "萧然为你画了一幅肖像画，在个人画展上展出。'这是我画过最美的作品，因为画的是我最爱的人。'艺术见证了你们的爱情，孤独的画家找到了他的缪斯。",
                requirement: { affection: 80, personality: ["感性", "内向"] }
            },
            normal: {
                title: "艺术知音·普通结局",
                content: "你成为了萧然艺术路上的知音，经常欣赏他的画作，给他鼓励。这份精神上的支持对孤独的艺术家来说很珍贵。",
                requirement: { affection: 40 }
            },
            bad: {
                title: "孤独画师·BE结局",
                content: "萧然依然沉浸在自己的艺术世界中，你们渐渐疏远。他的画中偶尔还能看到你的影子，但那已经是过去了。",
                requirement: { affection: 20 }
            }
        }
    }
};
