/**
 * 心动日记 - 每周活动系统数据
 * 基于星期的固定活动类型系统
 */

const WeeklyActivityData = {
    // 每周活动安排
    weeklySchedule: {
        1: { // 星期一 - 学习日
            type: 'study',
            name: '学习日',
            description: '专注学习的日子，提升专业技能',
            emoji: '📚',
            color: '#2196f3',
            activities: [
                {
                    id: 'morning_class',
                    name: '上午专业课',
                    timeRequired: 1,
                    type: 'course',
                    rewards: {
                        knowledge: 3,
                        stress: 1
                    },
                    description: '参加专业课程，学习理论知识'
                },
                {
                    id: 'library_study',
                    name: '图书馆自习',
                    timeRequired: 1,
                    type: 'study',
                    rewards: {
                        knowledge: 2,
                        focus: 2
                    },
                    description: '在安静的图书馆专心学习',
                    encounterChance: {
                        'SongYunshen': 0.3,
                        'JiangChe': 0.1
                    }
                },
                {
                    id: 'computer_lab',
                    name: '计算机实验室',
                    timeRequired: 2,
                    type: 'practical',
                    rewards: {
                        knowledge: 4,
                        technical: 3
                    },
                    description: '进行编程实践和技术研究',
                    encounterChance: {
                        'LinZhou': 0.4
                    }
                }
            ]
        },
        
        2: { // 星期二 - 社交日
            type: 'social',
            name: '社交日',
            description: '与同学朋友交流互动的日子',
            emoji: '👥',
            color: '#ff9800',
            activities: [
                {
                    id: 'student_union',
                    name: '学生会活动',
                    timeRequired: 1,
                    type: 'social',
                    rewards: {
                        charisma: 3,
                        leadership: 2
                    },
                    description: '参与学生会的各种活动',
                    encounterChance: {
                        'ZhouYichen': 0.5
                    }
                },
                {
                    id: 'cafe_chat',
                    name: '咖啡厅聊天',
                    timeRequired: 1,
                    type: 'social',
                    rewards: {
                        mood: 2,
                        social: 3
                    },
                    description: '和朋友在咖啡厅轻松聊天',
                    encounterChance: {
                        'SongYunshen': 0.2,
                        'TangYan': 0.2
                    }
                },
                {
                    id: 'club_meeting',
                    name: '社团聚会',
                    timeRequired: 2,
                    type: 'social',
                    rewards: {
                        charisma: 4,
                        friendship: 3
                    },
                    description: '参加各种兴趣社团的聚会',
                    encounterChance: {
                        'TangYan': 0.3,
                        'LinZhou': 0.2
                    }
                }
            ]
        },
        
        3: { // 星期三 - 休闲日
            type: 'leisure',
            name: '休闲日',
            description: '放松身心，享受闲暇时光',
            emoji: '🎵',
            color: '#4caf50',
            activities: [
                {
                    id: 'park_walk',
                    name: '校园漫步',
                    timeRequired: 1,
                    type: 'leisure',
                    rewards: {
                        mood: 3,
                        health: 2
                    },
                    description: '在美丽的校园里悠闲漫步',
                    encounterChance: {
                        'JiangChe': 0.2,
                        'TangYan': 0.3
                    }
                },
                {
                    id: 'music_room',
                    name: '音乐教室',
                    timeRequired: 1,
                    type: 'leisure',
                    rewards: {
                        mood: 4,
                        artistic: 2
                    },
                    description: '在音乐教室弹奏或听音乐',
                    encounterChance: {
                        'SongYunshen': 0.2
                    }
                },
                {
                    id: 'movie_night',
                    name: '看电影',
                    timeRequired: 2,
                    type: 'leisure',
                    rewards: {
                        mood: 5,
                        entertainment: 3
                    },
                    description: '观看喜欢的电影放松心情'
                }
            ]
        },
        
        4: { // 星期四 - 社交日
            type: 'social',
            name: '社交日',
            description: '继续社交互动，建立人际关系',
            emoji: '🤝',
            color: '#ff9800',
            activities: [
                {
                    id: 'sports_club',
                    name: '体育社团',
                    timeRequired: 1,
                    type: 'social',
                    rewards: {
                        health: 3,
                        teamwork: 2
                    },
                    description: '参加体育社团活动',
                    encounterChance: {
                        'LinZhou': 0.6
                    }
                },
                {
                    id: 'study_group',
                    name: '学习小组',
                    timeRequired: 1,
                    type: 'social',
                    rewards: {
                        knowledge: 2,
                        social: 2
                    },
                    description: '和同学组成学习小组',
                    encounterChance: {
                        'LinZhou': 0.3,
                        'JiangChe': 0.2
                    }
                },
                {
                    id: 'art_exhibition',
                    name: '艺术展览',
                    timeRequired: 2,
                    type: 'cultural',
                    rewards: {
                        artistic: 4,
                        culture: 3
                    },
                    description: '参观校园艺术展览',
                    encounterChance: {
                        'TangYan': 0.7
                    }
                }
            ]
        },
        
        5: { // 星期五 - 学习日
            type: 'study',
            name: '学习日',
            description: '一周学习的总结和提升',
            emoji: '💡',
            color: '#2196f3',
            activities: [
                {
                    id: 'advanced_course',
                    name: '高级课程',
                    timeRequired: 2,
                    type: 'course',
                    rewards: {
                        knowledge: 5,
                        specialization: 3
                    },
                    description: '参加更有挑战性的高级课程'
                },
                {
                    id: 'research_project',
                    name: '研究项目',
                    timeRequired: 1,
                    type: 'research',
                    rewards: {
                        knowledge: 3,
                        research: 4
                    },
                    description: '参与学术研究项目',
                    encounterChance: {
                        'LinZhou': 0.4,
                        'JiangChe': 0.3
                    }
                },
                {
                    id: 'skill_workshop',
                    name: '技能工作坊',
                    timeRequired: 1,
                    type: 'skill',
                    rewards: {
                        practical: 4,
                        confidence: 2
                    },
                    description: '参加各种技能培训工作坊'
                }
            ]
        },
        
        6: { // 星期六 - 休闲日
            type: 'leisure',
            name: '休闲日',
            description: '周末放松，享受自由时光',
            emoji: '🌟',
            color: '#4caf50',
            activities: [
                {
                    id: 'weekend_market',
                    name: '周末市集',
                    timeRequired: 1,
                    type: 'leisure',
                    rewards: {
                        mood: 3,
                        discovery: 2
                    },
                    description: '逛校园或附近的周末市集',
                    encounterChance: {
                        'TangYan': 0.4,
                        'SongYunshen': 0.2
                    }
                },
                {
                    id: 'hobby_time',
                    name: '个人爱好',
                    timeRequired: 1,
                    type: 'leisure',
                    rewards: {
                        mood: 4,
                        personal: 3
                    },
                    description: '专注于个人兴趣爱好'
                },
                {
                    id: 'nature_trip',
                    name: '自然之旅',
                    timeRequired: 2,
                    type: 'leisure',
                    rewards: {
                        mood: 6,
                        health: 4
                    },
                    description: '到校园外的自然环境中放松',
                    encounterChance: {
                        'JiangChe': 0.3
                    }
                }
            ]
        },
        
        0: { // 星期日 - 偶遇日
            type: 'encounter',
            name: '偶遇日',
            description: '充满可能性的一天，容易遇到特别的人',
            emoji: '💫',
            color: '#e91e63',
            activities: [
                {
                    id: 'campus_exploration',
                    name: '校园探索',
                    timeRequired: 1,
                    type: 'exploration',
                    rewards: {
                        discovery: 3,
                        adventure: 2
                    },
                    description: '在校园里探索新的地方',
                    encounterChance: {
                        'LinZhou': 0.25,
                        'SongYunshen': 0.25,
                        'ZhouYichen': 0.25,
                        'TangYan': 0.25,
                        'JiangChe': 0.25
                    }
                },
                {
                    id: 'library_reading',
                    name: '图书馆阅读',
                    timeRequired: 1,
                    type: 'quiet',
                    rewards: {
                        knowledge: 2,
                        peace: 3
                    },
                    description: '在图书馆安静地阅读',
                    encounterChance: {
                        'SongYunshen': 0.5,
                        'JiangChe': 0.2
                    }
                },
                {
                    id: 'random_event',
                    name: '随机事件',
                    timeRequired: 1,
                    type: 'random',
                    rewards: {
                        surprise: 4,
                        story: 3
                    },
                    description: '可能发生任何有趣的事情',
                    encounterChance: {
                        'LinZhou': 0.2,
                        'SongYunshen': 0.2,
                        'ZhouYichen': 0.2,
                        'TangYan': 0.2,
                        'JiangChe': 0.2
                    }
                }
            ]
        }
    },

    // 活动奖励说明
    rewardTypes: {
        knowledge: '知识',
        charisma: '魅力',
        health: '健康',
        mood: '心情',
        social: '社交',
        artistic: '艺术',
        technical: '技术',
        leadership: '领导力',
        teamwork: '团队合作',
        focus: '专注力',
        confidence: '自信',
        practical: '实践能力',
        research: '研究能力',
        culture: '文化素养',
        friendship: '友谊',
        entertainment: '娱乐',
        discovery: '探索',
        adventure: '冒险',
        peace: '宁静',
        surprise: '惊喜',
        story: '故事',
        personal: '个人成长',
        specialization: '专业化',
        stress: '压力' // 负面属性
    },

    // 获取当天的活动列表
    getDayActivities: function(dayOfWeek) {
        return this.weeklySchedule[dayOfWeek]?.activities || [];
    },

    // 获取当天的主题信息
    getDayTheme: function(dayOfWeek) {
        const dayData = this.weeklySchedule[dayOfWeek];
        return {
            type: dayData?.type || 'free',
            name: dayData?.name || '自由日',
            description: dayData?.description || '自由安排的一天',
            emoji: dayData?.emoji || '📅',
            color: dayData?.color || '#666666'
        };
    },

    // 根据已遇见角色过滤偶遇机会
    filterEncountersByMet: function(activities, metCharacters) {
        return activities.map(activity => {
            if (activity.encounterChance) {
                const filteredEncounters = {};
                Object.keys(activity.encounterChance).forEach(character => {
                    if (metCharacters.has(character)) {
                        // 已遇见的角色降低偶遇概率但不为0
                        filteredEncounters[character] = activity.encounterChance[character] * 0.3;
                    } else {
                        // 未遇见的角色保持原概率
                        filteredEncounters[character] = activity.encounterChance[character];
                    }
                });
                return {
                    ...activity,
                    encounterChance: filteredEncounters
                };
            }
            return activity;
        });
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeeklyActivityData;
}
