/**
 * 心动日记 - 游戏逻辑管理器
 * 负责游戏流程、状态管理、角色互动等核心逻辑
 */
class GameLogic {
    constructor(gameEngine) {
        this.engine = gameEngine;
        this.gameState = this.initializeGameState();
        this.selectedDay = null;
        this.currentStory = null;
        this.storyManager = null; // 稍后设置
        this.ui = null; // UI 管理器
        this.currentActivityInProgress = null; // 当前进行的活动
    }

    /**
     * 设置故事管理器
     */
    setStoryManager(storyManager) {
        this.storyManager = storyManager;
    }

    // 设置 UI 管理器
    setUIManager(uiManager) {
        this.ui = uiManager;
    }

    /**
     * 初始化游戏状态
     */
    initializeGameState() {
        return {
            player: {
                name: '',
                major: '',
                personality: '',
                grade: 1,
                knowledge: 0,
                studyProgress: 0,
                examsPassed: [],
                currentSemester: 1,
                isExamTime: false
            },
            currentWeek: 1,
            currentDay: 1,
            actionPoints: 2,  // 大一开始2点
            maxActionPoints: 2,
            
            // 角色关系系统
            characterRelationships: {},
            characterMeetStatus: {},
            
            // 成就和结局系统
            achievements: [],
            unlockedEndings: [],
            currentEnding: null,
            completedStorylines: [],
            specialEvents: [],
            
            // 周统计
            weekStats: {
                study: 0,
                social: 0,
                leisure: 0,
                encounter: 0
            },
            
            // 玩家属性
            playerStats: {
                学习: 50, 社交: 50, 心情: 50, 专注: 50,
                计划性: 50, 条理: 50, 感性: 50, 理性: 50,
                勇气: 50, 耐心: 50, 创造力: 50, 沟通: 50,
                领导力: 50, 观察力: 50, 艺术: 50, 运动: 50,
                健康: 50, 魅力: 50, 知识: 50, 经验: 50
            }
        };
    }

    /**
     * 初始化角色关系
     */
    initializeCharacterRelationships() {
        const characters = Object.keys(GameData.characters);
        
        // 初始化关系数据
        characters.forEach(characterName => {
            this.gameState.characterRelationships[characterName] = {
                affection: 0,      // 好感度
                trust: 0,          // 信任度
                impression: 0,     // 印象分
                intimacy: 0,       // 亲密度
                events: [],        // 互动事件记录
                specialEvents: []  // 特殊事件记录
            };
        });

        // 为新系统添加英文名角色
        const newSystemCharacters = ['LinZhou', 'SongYunshen', 'ZhouYichen', 'TangYan', 'JiangChe'];
        newSystemCharacters.forEach(characterName => {
            if (!this.gameState.characterRelationships[characterName]) {
                this.gameState.characterRelationships[characterName] = {
                    affection: 0,      // 好感度
                    trust: 0,          // 信任度
                    impression: 0,     // 印象分
                    intimacy: 0,       // 亲密度
                    events: [],        // 互动事件记录
                    specialEvents: []  // 特殊事件记录
                };
            }
        });

        // 初始化认识状态
        this.gameState.characterMeetStatus = {};
        characters.forEach(characterName => {
            this.gameState.characterMeetStatus[characterName] = {
                met: false,           // 是否认识
                meetWeek: 0,         // 认识的周数
                intimacyLevel: 0,    // 亲密等级
                lastInteraction: 0,   // 最后互动周数
                storyProgress: {      // 故事进度追踪
                    first_meeting: { completed: false, currentRound: 0 },
                    interaction: { completed: false, currentRound: 0, totalRounds: 0 },
                    background_exploration: { unlocked: [], completed: [] }
                }
            };
        });

        // 为新系统角色添加认识状态
        newSystemCharacters.forEach(characterName => {
            if (!this.gameState.characterMeetStatus[characterName]) {
                this.gameState.characterMeetStatus[characterName] = {
                    met: false,           // 是否认识
                    meetWeek: 0,         // 认识的周数
                    intimacyLevel: 0,    // 亲密等级
                    lastInteraction: 0,   // 最后互动周数
                    storyProgress: {      // 故事进度追踪
                        first_meeting: { completed: false, currentRound: 0 },
                        interaction: { completed: false, currentRound: 0, totalRounds: 0 },
                        background_exploration: { unlocked: [], completed: [] }
                    }
                };
            }
        });
    }

    /**
     * 开始新游戏
     */
    startGame(playerData) {
        console.log('开始新游戏，玩家数据:', playerData);
        
        // 设置玩家信息
        const safeName = (playerData.name || '').trim() || '新生';
        this.gameState.player = { ...playerData, name: safeName, grade: 1 };
        
        // 根据专业确定主要匹配角色
        this.gameState.matchedCharacter = this.getMatchedCharacterByMajor(this.gameState.player.major);
        
        // 初始化角色关系
        this.initializeCharacterRelationships();
        
        // 重置为全新游戏状态
        this.gameState.currentWeek = 1;
        this.gameState.currentDay = 1;
        this.gameState.actionPoints = 2;
        this.gameState.maxActionPoints = 2;
        
        // 初始化遇见状态
        this.gameState.metCharacters = new Set();
        
        // 更新UI显示
        this.updateUI();
        
        // 始终显示新手引导
        this.showIntroStoryline();
    }

    /**
     * 根据专业匹配主要角色
     */
    getMatchedCharacterByMajor(major) {
        const majorToCharacter = {
            '计算机科学': 'LinZhou',
            '软件工程': 'LinZhou', 
            '信息技术': 'LinZhou',
            '文学': 'SongYunshen',
            '中文': 'SongYunshen',
            '历史': 'SongYunshen',
            '哲学': 'SongYunshen',
            '商学': 'ZhouYichen',
            '经济学': 'ZhouYichen', 
            '管理学': 'ZhouYichen',
            '金融': 'ZhouYichen',
            '艺术': 'TangYan',
            '美术': 'TangYan',
            '设计': 'TangYan',
            '音乐': 'TangYan',
            '医学': 'JiangChe',
            '护理': 'JiangChe',
            '生物': 'JiangChe',
            '化学': 'JiangChe'
        };
        
        return majorToCharacter[major] || 'LinZhou'; // 默认匹配林舟
    }

    /**
     * 年级系统管理
     */
    calculateGrade() {
        const weeksPerGrade = 20; // 每20周升一年级
        return Math.min(4, Math.floor((this.gameState.currentWeek - 1) / weeksPerGrade) + 1);
    }
    
    updateGradeAndActionPoints() {
        const newGrade = this.calculateGrade();
        const oldGrade = this.gameState.player.grade;
        
        if (newGrade !== oldGrade) {
            this.gameState.player.grade = newGrade;
            
            // 根据年级设置行动点数
            const gradeActionPoints = { 1: 2, 2: 3, 3: 5, 4: 7 };
            this.gameState.maxActionPoints = gradeActionPoints[newGrade];
            this.gameState.actionPoints = this.gameState.maxActionPoints;
            
            // 更新UI显示
            this.updateUI();
            
            this.showGradeUpNotification(oldGrade, newGrade);
        }
    }

    /**
     * 角色关系管理
     */
    updateCharacterRelationship(characterName, changes = {}) {
        console.log(`=== 更新角色关系: ${characterName} ===`);
        
        if (!this.gameState.characterRelationships[characterName]) {
            console.warn(`角色 ${characterName} 的关系数据不存在，将创建新的关系数据`);
            // 为单个角色创建关系数据
            this.gameState.characterRelationships[characterName] = {
                affection: 0,      // 好感度
                trust: 0,          // 信任度
                impression: 0,     // 印象分
                intimacy: 0,       // 亲密度
                events: [],        // 互动事件记录
                specialEvents: []  // 特殊事件记录
            };
        }
        
        const relationship = this.gameState.characterRelationships[characterName];
        const oldValues = { ...relationship };
        
        // 更新各项数值，限制在0-100范围内
        Object.keys(changes).forEach(key => {
            if (relationship.hasOwnProperty(key) && typeof changes[key] === 'number') {
                relationship[key] = Math.max(0, Math.min(100, relationship[key] + changes[key]));
            }
        });
        
        console.log('关系变化:', {
            old: oldValues,
            new: relationship,
            changes: changes
        });
    this.updateUI();
    }

    /**
     * 日期选择逻辑
     */
    selectDay(day) {
        console.log('选择日期:', day);
        
        if (this.gameState.actionPoints <= 0) {
            this.askForNextWeek();
            return;
        }
        
        this.selectedDay = day;
        // 直接自动选一个活动（含课程/背景探索概率）
        this.autoExecuteDayActivity(day);
    }

    // 自动执行活动
    autoExecuteDayActivity(day) {
        // 使用新的每周活动系统
        const dayOfWeek = ((day - 1) % 7) + 1; // 转换为星期 (1=星期一, 2=星期二...7=星期日)
        const normalizedDay = dayOfWeek === 7 ? 0 : dayOfWeek; // 将星期日转换为0以匹配WeeklyActivityData
        const dayTheme = WeeklyActivityData.getDayTheme(normalizedDay);
        const dayActivities = WeeklyActivityData.getDayActivities(normalizedDay);
        
        // 根据已遇见角色过滤偶遇机会
        const filteredActivities = WeeklyActivityData.filterEncountersByMet(dayActivities, this.gameState.metCharacters);
        
        if (filteredActivities.length === 0) {
            this.engine.showNotification('当前无可执行活动', 'warning');
            return;
        }
        
        // 显示今日主题和活动选择
        this.showDayActivityChoice(day, dayTheme, filteredActivities);
    }

    /**
     * 显示当日活动选择
     */
    showDayActivityChoice(day, dayTheme, activities) {
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) {
                    titleElement.textContent = `${dayTheme.emoji} ${dayTheme.name}`;
                }
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 48px; margin-bottom: 15px;">${dayTheme.emoji}</div>
                            <div style="background: ${dayTheme.color}20; padding: 15px; border-radius: 10px; margin-bottom: 15px; border: 2px solid ${dayTheme.color};">
                                <h4 style="color: ${dayTheme.color}; margin-bottom: 10px;">${dayTheme.name}</h4>
                                <p style="line-height: 1.6; color: #555; margin: 0; font-size: 14px;">
                                    ${dayTheme.description}
                                </p>
                            </div>
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 8px;">
                                <p style="color: #666; font-size: 13px; margin: 0;">
                                    选择一个活动来度过这一天，不同的选择可能带来不同的收获...
                                </p>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    
                    activities.forEach((activity, index) => {
                        const btn = document.createElement('button');
                        btn.className = 'choice-btn';
                        btn.style.marginBottom = '8px';
                        btn.style.textAlign = 'left';
                        btn.style.position = 'relative';
                        
                        // 显示行动点消耗
                        const costIndicator = activity.timeRequired > 1 ? 
                            `<span style="color: #ff6b9d; font-weight: bold;">[${activity.timeRequired}点]</span> ` : 
                            `<span style="color: #4caf50; font-weight: bold;">[1点]</span> `;
                        
                        btn.innerHTML = `
                            ${costIndicator}${activity.name}
                            <div style="font-size: 12px; color: #666; margin-top: 4px;">
                                ${activity.description}
                            </div>
                        `;
                        
                        // 检查是否有足够的行动点
                        if (this.gameState.actionPoints < activity.timeRequired) {
                            btn.disabled = true;
                            btn.style.opacity = '0.5';
                            btn.style.cursor = 'not-allowed';
                        }
                        
                        btn.addEventListener('click', () => {
                            if (this.gameState.actionPoints >= activity.timeRequired) {
                                this.executeWeeklyActivity(day, activity, dayTheme);
                            }
                        });
                        
                        choicesElement.appendChild(btn);
                    });
                    
                    // 添加返回按钮
                    const backBtn = document.createElement('button');
                    backBtn.textContent = '返回';
                    backBtn.className = 'choice-btn';
                    backBtn.style.background = '#666';
                    backBtn.style.marginTop = '10px';
                    
                    backBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                    });
                    
                    choicesElement.appendChild(backBtn);
                }
            }
        });
    }

    /**
     * 执行每周活动
     */
    executeWeeklyActivity(day, activity, dayTheme) {
        this.engine.closeModal('scenario-modal');
        
        // 消耗行动点
        this.gameState.actionPoints -= activity.timeRequired;
        
        // 应用奖励
        this.applyActivityRewards(activity.rewards);
        
        // 更新周统计
        this.gameState.weekStats[dayTheme.type] += 1;
        
        // 检查偶遇机会
        const encounteredCharacter = this.checkEncounterChance(activity.encounterChance);
        
        // 显示活动结果
        this.showActivityResult(activity, dayTheme, encounteredCharacter);
    }

    /**
     * 应用活动奖励
     */
    applyActivityRewards(rewards) {
        if (!rewards) return;
        
        Object.entries(rewards).forEach(([rewardType, amount]) => {
            // 这里可以根据奖励类型更新玩家属性
            // 目前先简单记录
            if (!this.gameState.playerRewards) {
                this.gameState.playerRewards = {};
            }
            
            if (!this.gameState.playerRewards[rewardType]) {
                this.gameState.playerRewards[rewardType] = 0;
            }
            
            this.gameState.playerRewards[rewardType] += amount;
        });
    }

    /**
     * 检查偶遇机会
     */
    checkEncounterChance(encounterChance) {
        if (!encounterChance) return null;
        
        const random = Math.random();
        let cumulativeChance = 0;
        
        for (const [character, chance] of Object.entries(encounterChance)) {
            cumulativeChance += chance;
            if (random <= cumulativeChance) {
                // 标记角色为已遇见
                this.gameState.metCharacters.add(character);
                return character;
            }
        }
        
        return null;
    }

    /**
     * 显示活动结果
     */
    showActivityResult(activity, dayTheme, encounteredCharacter) {
        // 保存当前活动信息，供互动时使用
        this.currentActivityInProgress = activity;
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) {
                    titleElement.textContent = `${activity.name} - 完成`;
                }
                
                if (descElement) {
                    let rewardsText = '';
                    if (activity.rewards) {
                        rewardsText = Object.entries(activity.rewards)
                            .map(([type, amount]) => `${WeeklyActivityData.rewardTypes[type] || type} +${amount}`)
                            .join('、');
                    }
                    
                    let encounterText = '';
                    if (encounteredCharacter) {
                        const characterInfo = this.getCharacterIntroInfo(encounteredCharacter);
                        encounterText = `
                            <div style="background: linear-gradient(135deg, #ff6b9d20 0%, #c4456920 100%); padding: 15px; border-radius: 10px; margin: 15px 0; border: 2px solid #ff6b9d;">
                                <h4 style="color: #ff6b9d; margin-bottom: 10px;">💫 意外的相遇</h4>
                                <p style="color: #555; margin: 0;">
                                    在${activity.name}的过程中，你遇到了${characterInfo.name}！
                                </p>
                            </div>
                        `;
                    }
                    
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 48px; margin-bottom: 15px;">${dayTheme.emoji}</div>
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                                <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                                    ${activity.description}
                                </p>
                                ${rewardsText ? `
                                    <div style="background: #e8f5e8; padding: 10px; border-radius: 8px;">
                                        <p style="color: #2e7d32; font-weight: 500; margin: 0; font-size: 14px;">
                                            ✨ 获得：${rewardsText}
                                        </p>
                                    </div>
                                ` : ''}
                            </div>
                            ${encounterText}
                            <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); padding: 12px; border-radius: 8px;">
                                <p style="color: #1976d2; font-weight: 500; margin: 0; font-size: 14px;">
                                    🎯 剩余行动点：${this.gameState.actionPoints}/${this.gameState.maxActionPoints}
                                </p>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    
                    if (encounteredCharacter) {
                        // 如果遇到角色，提供互动选项
                        const interactBtn = document.createElement('button');
                        interactBtn.textContent = `与${this.getCharacterIntroInfo(encounteredCharacter).name}互动`;
                        interactBtn.className = 'choice-btn';
                        interactBtn.style.background = '#ff6b9d';
                        
                        interactBtn.addEventListener('click', () => {
                            this.engine.closeModal('scenario-modal');
                            this.startCharacterInteraction(encounteredCharacter);
                        });
                        
                        choicesElement.appendChild(interactBtn);
                        
                        // 如果遇到角色，也提供跳过互动的选项
                        const skipBtn = document.createElement('button');
                        skipBtn.textContent = '跳过互动';
                        skipBtn.className = 'choice-btn';
                        skipBtn.style.background = '#9e9e9e';
                        
                        skipBtn.addEventListener('click', () => {
                            this.engine.closeModal('scenario-modal');
                            this.completeActivityWithoutActionPoints(); // 不再消耗行动点，只更新UI
                        });
                        
                        choicesElement.appendChild(skipBtn);
                    } else {
                        // 没有遇到角色，显示普通的继续按钮
                        const continueBtn = document.createElement('button');
                        continueBtn.textContent = '继续';
                        continueBtn.className = 'choice-btn';
                        continueBtn.style.background = '#4caf50';
                        
                        continueBtn.addEventListener('click', () => {
                            this.engine.closeModal('scenario-modal');
                            this.completeActivityWithoutActionPoints(); // 不再消耗行动点，只更新UI
                        });
                        
                        choicesElement.appendChild(continueBtn);
                    }
                }
            }
        });
    }

    /**
     * 开始角色互动
     */
    startCharacterInteraction(characterName) {
        // 确保StoryManager存在
        if (!this.storyManager) {
            console.warn('StoryManager 未初始化，创建临时实例');
            this.storyManager = new StoryManager(this);
        }

        // 确保角色关系数据存在
        if (!this.gameState.characterRelationships[characterName]) {
            this.updateCharacterRelationship(characterName, {});
        }

        const relationship = this.gameState.characterRelationships[characterName];
        
        // 判断是否是第一次遇见
        const isFirstMeeting = !this.gameState.metCharacters.has(characterName);
        
        if (isFirstMeeting) {
            // 第一次遇见，标记为已遇见
            this.gameState.metCharacters.add(characterName);
            // 使用第一次见面的故事类型
            this.storyManager.startStory(characterName, 'encounter', 'first_meeting', 1);
        } else {
            // 非第一次遇见，使用普通互动故事
            const round = this.getNextInteractionRound(characterName);
            this.storyManager.startStory(characterName, 'encounter', 'interaction', round);
        }
    }

    /**
     * 显示活动菜单
     */
    showActivityMenu(day) {
        const activities = this.getAvailableActivities(day);
        const backgroundStories = this.getAvailableBackgroundExplorations();
        const dayNames = { 1: '星期一', 2: '星期二', 3: '星期三', 4: '星期四', 5: '星期五', 6: '星期六', 7: '星期日' };
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) {
                    titleElement.textContent = `${dayNames[day]} - 选择你的行动`;
                }
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 48px; margin-bottom: 15px;">📅</div>
                            <h3 style="color: #ff6b9d; margin-bottom: 15px;">今天你想做什么？</h3>
                            <p style="color: #666; line-height: 1.6;">
                                每个行动都有独特的故事和遇见不同角色的机会。<br>
                                选择你感兴趣的活动，开始你的校园故事！
                            </p>
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-top: 15px;">
                                <small style="color: #888;">💡 提示：不同的行动会影响你的能力值和人际关系</small>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    
                    // 添加常规活动
                    activities.forEach(activity => {
                        const button = document.createElement('button');
                        button.className = 'choice-btn';
                        button.innerHTML = `
                            <div style="text-align: left;">
                                <div style="font-weight: bold; margin-bottom: 5px;">${activity.icon} ${activity.title}</div>
                                <div style="font-size: 12px; color: #666; line-height: 1.4;">${activity.description}</div>
                            </div>
                        `;
                        button.addEventListener('click', () => {
                            this.engine.closeModal('scenario-modal');
                            this.startActivity(activity.id, day);
                        });
                        choicesElement.appendChild(button);
                    });
                    
                    // 添加学习课程分隔线
                    const studySeparator = document.createElement('div');
                    studySeparator.style.cssText = 'border-top: 1px solid #ddd; margin: 15px 0; text-align: center; color: #888; font-size: 12px;';
                    studySeparator.innerHTML = '<span style="background: white; padding: 0 10px;">— 学习课程 —</span>';
                    choicesElement.appendChild(studySeparator);
                    
                    // 添加学习课程选项
                    Object.entries(GameData.academicSystem.subjects).forEach(([courseType, course]) => {
                        // 根据年级限制课程
                        const currentGrade = this.gameState.player.grade;
                        let canTake = true;
                        
                        if (courseType === "高级课程" && currentGrade < 3) canTake = false;
                        if (courseType === "研究项目" && currentGrade < 4) canTake = false;
                        
                        if (canTake) {
                            const button = document.createElement('button');
                            button.className = 'choice-btn';
                            button.style.cssText = 'background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border: 1px solid #64b5f6;';
                            button.innerHTML = `
                                <div style="text-align: left;">
                                    <div style="font-weight: bold; margin-bottom: 5px;">📖 ${courseType}</div>
                                    <div style="font-size: 12px; color: #666; line-height: 1.4;">${course.description}</div>
                                    <div style="font-size: 11px; color: #888; margin-top: 4px;">
                                        知识值 +${course.knowledgeGain} | 行动点 -${course.timeRequired} | 难度 ${course.difficulty}/100
                                    </div>
                                </div>
                            `;
                            button.addEventListener('click', () => {
                                this.engine.closeModal('scenario-modal');
                                this.studyCourse(courseType);
                            });
                            choicesElement.appendChild(button);
                        }
                    });
                    
                    // 添加背景探索分隔线
                    if (backgroundStories.length > 0) {
                        const separator = document.createElement('div');
                        separator.style.cssText = 'border-top: 1px solid #ddd; margin: 15px 0; text-align: center; color: #888; font-size: 12px;';
                        separator.innerHTML = '<span style="background: white; padding: 0 10px;">— 深入了解 —</span>';
                        choicesElement.appendChild(separator);
                        
                        // 添加背景探索选项
                        backgroundStories.forEach(story => {
                            const button = document.createElement('button');
                            button.className = 'choice-btn';
                            button.style.cssText = 'background: linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%); border: 1px solid #ffab91;';
                            button.innerHTML = `
                                <div style="text-align: left;">
                                    <div style="font-weight: bold; margin-bottom: 5px;">💝 ${story.name} - ${story.characterName}</div>
                                    <div style="font-size: 12px; color: #666; line-height: 1.4;">${story.description}</div>
                                </div>
                            `;
                            button.addEventListener('click', () => {
                                this.engine.closeModal('scenario-modal');
                                this.startBackgroundExploration(story.characterName, story.type);
                            });
                            choicesElement.appendChild(button);
                        });
                    }
                }
            }
        });
    }

    /**
     * 获取可用活动
     */
    getAvailableActivities(day) {
        const baseActivities = [
            {
                id: 'library_study',
                title: '图书馆学习',
                icon: '📚',
                description: '在安静的图书馆中专心学习，可能遇到同样爱学习的同学',
                availableCharacters: ['顾言', '江澈', '苏云深'],
                statEffects: { 学习: 5, 专注: 3, 知识: 2 }
            },
            {
                id: 'sports_activities',
                title: '体育活动',
                icon: '🏃‍♀️',
                description: '参加体育运动，强身健体，可能遇到运动型的男生',
                availableCharacters: ['林舟', '宋之南', '萧然'],
                statEffects: { 运动: 5, 健康: 3, 心情: 2 }
            },
            {
                id: 'art_club',
                title: '社团活动',
                icon: '🎨',
                description: '参加各种社团活动，培养兴趣爱好和社交能力',
                availableCharacters: ['周奕辰', '唐言', '江澈'],
                statEffects: { 艺术: 5, 创造力: 3, 社交: 2 }
            },
            {
                id: 'campus_walk',
                title: '校园漫步',
                icon: '🌸',
                description: '在美丽的校园中散步，享受悠闲时光，可能有意外收获',
                availableCharacters: ['宋之南', '苏云深', '萧然'],
                statEffects: { 心情: 5, 观察力: 3, 感性: 2 }
            },
            {
                id: 'cafeteria_meal',
                title: '食堂用餐',
                icon: '🍽️',
                description: '在热闹的食堂享用美食，是社交的好地方',
                availableCharacters: ['林舟', '周奕辰', '唐言'],
                statEffects: { 社交: 5, 沟通: 3, 心情: 2 }
            }
        ];

        // 根据游戏进度过滤可用活动
        return baseActivities.filter(activity => {
            const hasUnmetCharacters = activity.availableCharacters.some(char => 
                !this.gameState.characterMeetStatus[char]?.met
            );
            
            const hasGrowableRelations = activity.availableCharacters.some(char => 
                this.gameState.characterMeetStatus[char]?.met && 
                this.gameState.characterMeetStatus[char]?.intimacyLevel < 10
            );
            
            return hasUnmetCharacters || hasGrowableRelations;
        });
    }

    /**
     * 开始活动
     */
    startActivity(activityId, day) {
        console.log('开始活动:', activityId);
        
        const activity = this.getAvailableActivities(day).find(a => a.id === activityId);
        if (!activity) {
            console.error('活动不存在:', activityId);
            return;
        }

        // 应用基础属性变化
        this.applyStatEffects(activity.statEffects);
        
        // 选择互动角色
        const targetCharacter = this.selectCharacterForStory(activity.availableCharacters);
        
        if (targetCharacter) {
            // 开始角色互动故事
            this.startCharacterStory(targetCharacter, activityId);
        } else {
            // 独自活动
            this.startSoloActivity(activityId);
        }
    }

    /**
     * 应用属性效果
     */
    applyStatEffects(effects) {
        Object.keys(effects).forEach(stat => {
            if (this.gameState.playerStats[stat] !== undefined) {
                this.gameState.playerStats[stat] = Math.max(0, Math.min(100, 
                    this.gameState.playerStats[stat] + effects[stat]
                ));
            }
        });
    }

    /**
     * 选择故事角色
     */
    selectCharacterForStory(availableCharacters) {
        // 优先选择未认识的角色
        const unmetCharacters = availableCharacters.filter(char => 
            !this.gameState.characterMeetStatus[char]?.met
        );
        
        if (unmetCharacters.length > 0) {
            return unmetCharacters[Math.floor(Math.random() * unmetCharacters.length)];
        }
        
        // 选择可以进一步发展关系的角色
        const growableCharacters = availableCharacters.filter(char => 
            this.gameState.characterMeetStatus[char]?.intimacyLevel < 10
        );
        
        if (growableCharacters.length > 0) {
            return growableCharacters[Math.floor(Math.random() * growableCharacters.length)];
        }
        
        return null;
    }

    /**
     * 开始角色故事
     */
    startCharacterStory(characterName, activityId) {
        const meetStatus = this.gameState.characterMeetStatus[characterName];
        const storyProgress = meetStatus?.storyProgress;
        
        if (!this.storyManager) {
            console.warn('StoryManager 未初始化，创建临时实例');
            this.storyManager = new StoryManager(this);
        }
        
        // 确定故事类型和轮次
        let storyType, round;
        
        if (!meetStatus?.met) {
            // 初次相遇
            storyType = 'first_meeting';
            round = 1;
            storyProgress.first_meeting.currentRound = 1;
        } else {
            // 判断是否有未完成的first_meeting
            if (!storyProgress.first_meeting.completed) {
                storyType = 'first_meeting';
                round = storyProgress.first_meeting.currentRound || 1;
            } else {
                // 进行日常互动
                storyType = 'interaction';
                round = this.getNextInteractionRound(characterName);
            }
        }
        
        // 检查是否有静态故事数据
        const hasStatic = GameData.storyData?.[storyType]?.[characterName]?.[round];
        
        if (hasStatic) {
            this.storyManager.startStory(characterName, activityId, storyType, round);
        } else if (GameData.dynamicStories?.interactions?.[characterName]) {
            // 使用动态故事作为后备
            this.startDynamicInteraction(characterName);
        } else {
            // 完全没有故事内容，显示简单互动
            this.showSimpleInteraction(characterName, activityId);
        }
    }
    
    /**
     * 获取下一个互动轮次
     */
    getNextInteractionRound(characterName) {
        const storyProgress = this.gameState.characterMeetStatus[characterName].storyProgress;
        
        // 确保角色关系数据存在
        if (!this.gameState.characterRelationships[characterName]) {
            this.updateCharacterRelationship(characterName, {});
        }
        
        const relationship = this.gameState.characterRelationships[characterName];
        
        // 根据关系深度决定互动类型
        if (relationship.affection >= 60 && relationship.trust >= 50) {
            // 深度互动
            return Math.min(5, storyProgress.interaction.totalRounds + 1);
        } else if (relationship.affection >= 30) {
            // 中等互动
            return Math.min(3, storyProgress.interaction.totalRounds + 1);
        } else {
            // 浅层互动
            return Math.min(2, storyProgress.interaction.totalRounds + 1);
        }
    }
    
    /**
     * 显示简单互动（当没有具体故事时）
     */
    showSimpleInteraction(characterName, activityId) {
        const character = GameData.characters[characterName];
        
        // 确保角色关系数据存在
        if (!this.gameState.characterRelationships[characterName]) {
            this.updateCharacterRelationship(characterName, {});
        }
        
        const relationship = this.gameState.characterRelationships[characterName];
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = `与${characterName}的互动`;
                
                if (descElement) {
                    const affectionLevel = relationship.affection < 20 ? '陌生' : 
                                         relationship.affection < 50 ? '熟悉' : 
                                         relationship.affection < 80 ? '亲密' : '深爱';
                    
                    descElement.innerHTML = `
                        <div style="padding: 20px; text-align: center;">
                            <div style="font-size: 48px; margin-bottom: 15px;">💭</div>
                            <p style="line-height: 1.6; color: #555;">
                                你和${characterName}进行了愉快的交流。虽然没有特别的事件发生，
                                但你们的关系正在慢慢发展。
                            </p>
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px;">
                                <p style="color: #666; margin: 0;">当前关系：${affectionLevel}</p>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    const continueBtn = document.createElement('button');
                    continueBtn.className = 'choice-btn';
                    continueBtn.textContent = '继续';
                    continueBtn.addEventListener('click', () => {
                        // 给予小幅关系提升
                        this.updateCharacterRelationship(characterName, { affection: 1, trust: 1 });
                        this.engine.closeModal('scenario-modal');
                        this.finishActivity();
                    });
                    choicesElement.appendChild(continueBtn);
                }
            }
        });
    }

    // 动态交互回退
    startDynamicInteraction(characterName) {
        const pool = GameData.dynamicStories?.interactions?.[characterName];
        if (!pool || pool.length === 0) {
            console.warn('无动态交互数据');
            this.finishActivity();
            return;
        }
        const item = pool[Math.floor(Math.random()*pool.length)];
        // 占位符替换（动态描述中可能也会含有 ${playerName}/${playerMajor}）
        const playerName = this.gameState.player.name || '你';
        const playerMajor = this.gameState.player.major || '';
        const replaceVars = (text) => text
            .replace(/\$\{playerName\}/g, playerName)
            .replace(/\$\{playerMajor\}/g, playerMajor);
        item.summary = replaceVars(item.summary);
        item.description = replaceVars(item.description);
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                if (titleElement) titleElement.textContent = `${characterName} · ${item.summary}`;
                if (descElement) {
                    descElement.innerHTML = `<div style=\"padding:15px;\"><p style=\"line-height:1.6;color:#555;\">${item.description}</p></div>`;
                }
                if (choicesElement) {
                    choicesElement.innerHTML='';
                    item.choices.forEach(ch => {
                        const btn = document.createElement('button');
                        btn.className='choice-btn';
                        btn.textContent = ch.text;
                        btn.addEventListener('click', () => {
                            this.updateCharacterRelationship(characterName, ch.effect || {});
                            this.engine.closeModal('scenario-modal');
                            this.finishActivity();
                        });
                        choicesElement.appendChild(btn);
                    });
                }
            }
        });
    }

    /**
     * 完成活动
     */
    finishActivity(actionPointCost = 1) {
        // 消耗行动点
        this.gameState.actionPoints = Math.max(0, this.gameState.actionPoints - actionPointCost);
        
        // 更新周统计
        this.updateWeekStats();
        this.updateUI();
        
        // 检查是否需要进入下一周
        if (this.gameState.actionPoints <= 0) {
            setTimeout(() => {
                this.askForNextWeek();
            }, 1500);
        }
    }

    /**
     * 完成活动（不消耗行动点，用于新周活动系统）
     */
    completeActivityWithoutActionPoints() {
        // 更新周统计
        this.updateWeekStats();
        this.updateUI();
        
        // 检查是否需要进入下一周
        if (this.gameState.actionPoints <= 0) {
            setTimeout(() => {
                this.askForNextWeek();
            }, 1500);
        }
    }

    /**
     * 更新周统计
     */
    updateWeekStats() {
        const dayActivities = {
            1: 'study', 2: 'social', 3: 'leisure', 4: 'social',
            5: 'study', 6: 'leisure', 7: 'encounter'
        };
        
        const activityType = dayActivities[this.selectedDay];
        if (this.gameState.weekStats[activityType] !== undefined) {
            this.gameState.weekStats[activityType]++;
        }
    }

    /**
     * 周管理
     */
    askForNextWeek() {
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = '本周行动结束';
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center;">
                            <div style="font-size: 60px; margin-bottom: 20px;">⏰</div>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                                <p style="line-height: 1.6; color: #555; margin-bottom: 15px;">
                                    本周的行动点数已经用完了！<br>
                                    你在这一周里度过了充实的校园生活。
                                </p>
                                <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); padding: 15px; border-radius: 8px;">
                                    <p style="color: #1976d2; font-weight: 500; margin: 0;">
                                        是否要进入下一周继续你的校园恋爱故事？
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    
                    const nextWeekBtn = document.createElement('button');
                    nextWeekBtn.className = 'choice-btn';
                    nextWeekBtn.textContent = '进入下一周';
                    nextWeekBtn.style.background = '#4caf50';
                    nextWeekBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                        this.nextWeek();
                    });
                    
                    const stayBtn = document.createElement('button');
                    stayBtn.className = 'choice-btn';
                    stayBtn.textContent = '留在本周查看';
                    stayBtn.style.background = '#ff9800';
                    stayBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                    });
                    
                    choicesElement.appendChild(nextWeekBtn);
                    choicesElement.appendChild(stayBtn);
                }
            }
        });
    }

    nextWeek() {
        this.gameState.currentWeek++;
        
        // 检查年级升级
        this.updateGradeAndActionPoints();
        
        // 如果没有升级，正常恢复行动点数
        if (this.gameState.actionPoints !== this.gameState.maxActionPoints) {
            this.gameState.actionPoints = this.gameState.maxActionPoints;
        }
        
        // 重置周统计
        this.gameState.weekStats = {
            study: 0, social: 0, leisure: 0, encounter: 0
        };
        
        // 更新UI显示
        this.updateUI();
        
        this.engine.showNotification(`进入第${this.gameState.currentWeek}周！`, 'success');
        console.log('进入新的一周:', this.gameState.currentWeek);
    }

    /**
     * 界面管理
     */
    showGameScreen() {
        const mainMenu = document.getElementById('main-menu');
        const gameScreen = document.getElementById('game-screen');
        
        if (mainMenu) mainMenu.classList.remove('active');
        if (gameScreen) gameScreen.classList.add('active');
        
    this.updateUI();
    }

    showMainMenu() {
        const mainMenu = document.getElementById('main-menu');
        const gameScreen = document.getElementById('game-screen');
        
        if (gameScreen) gameScreen.classList.remove('active');
        if (mainMenu) mainMenu.classList.add('active');
    }

    // 统一 UI 更新
    updateUI() {
        if (this.ui) {
            this.ui.updateAll();
        } else {
            const ap = document.getElementById('current-actions');
            if (ap) ap.textContent = `${this.gameState.actionPoints}/${this.gameState.maxActionPoints}`;
            const w = document.getElementById('current-week');
            if (w) w.textContent = `第${this.gameState.currentWeek}周`;
        }
    }

    /**
     * 新手引导
     */
    showIntroStoryline() {
        // 获取匹配的角色信息
        const matchedChar = this.gameState.matchedCharacter;
        const characterInfo = this.getCharacterIntroInfo(matchedChar);
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = '新的开始';
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center;">
                            <div style="font-size: 50px; margin-bottom: 15px;">🌸</div>
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                                <h4 style="color: #ff6b9d; margin-bottom: 10px;">欢迎来到心动日记！</h4>
                                <p style="line-height: 1.5; color: #555; margin-bottom: 10px; font-size: 14px;">
                                    你是 <strong>${this.gameState.player.name}</strong>，一名${this.gameState.player.major}专业的大学生。
                                    性格${this.gameState.player.personality}的你，即将开始一段充满可能性的校园恋爱故事。
                                </p>
                                <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); padding: 12px; border-radius: 8px; margin-bottom: 10px;">
                                    <p style="color: #1976d2; font-weight: 500; margin: 0; font-size: 13px; line-height: 1.4;">
                                        💡 游戏提示：基于你的专业，你更容易在<strong>${characterInfo.location}</strong>遇到有趣的人<br>
                                        记住：每周2个行动点，星期日是偶遇的最佳时机
                                    </p>
                                </div>
                                <p style="line-height: 1.4; color: #555; font-size: 13px;">
                                    这里有各种性格的男生等待与你相遇，每一个选择都会影响你们的故事...
                                </p>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    
                    const startBtn = document.createElement('button');
                    startBtn.textContent = '开始我的校园生活！';
                    startBtn.className = 'choice-btn';
                    startBtn.style.background = 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)';
                    startBtn.style.color = 'white';
                    startBtn.style.padding = '18px 30px';
                    startBtn.style.borderRadius = '30px';
                    startBtn.style.border = '3px solid #ff8fab';
                    startBtn.style.fontSize = '18px';
                    startBtn.style.fontWeight = '700';
                    startBtn.style.cursor = 'pointer';
                    startBtn.style.width = '100%';
                    startBtn.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.4)';
                    
                    startBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                        this.showGameScreen();
                        // 自动触发第一次偶遇
                        setTimeout(() => {
                            this.triggerFirstEncounter();
                        }, 1000);
                    });
                    
                    choicesElement.appendChild(startBtn);
                }
            }
        });
    }

    /**
     * 获取角色介绍信息
     */
    getCharacterIntroInfo(characterName) {
        const characterIntros = {
            'LinZhou': {
                name: '林舟',
                location: '计算机实验室',
                description: '技术宅学霸，内向但温柔',
                specialty: '编程'
            },
            'SongYunshen': {
                name: '宋云深', 
                location: '图书馆',
                description: '文艺诗人，浪漫主义',
                specialty: '文学创作'
            },
            'ZhouYichen': {
                name: '周弈辰',
                location: '学生会办公室', 
                description: '商业精英，自信果断',
                specialty: '领导力'
            },
            'TangYan': {
                name: '唐彦',
                location: '美术教室',
                description: '艺术家，自由奔放',
                specialty: '绘画'
            },
            'JiangChe': {
                name: '江澈',
                location: '校医院',
                description: '温柔医生，责任感强',
                specialty: '医学'
            }
        };
        
        return characterIntros[characterName] || characterIntros['LinZhou'];
    }

    /**
     * 触发第一次偶遇
     */
    triggerFirstEncounter() {
        const matchedChar = this.gameState.matchedCharacter;
        const characterInfo = this.getCharacterIntroInfo(matchedChar);
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = '意外的相遇';
                
                if (descElement) {
                    descElement.innerHTML = this.getFirstEncounterStory(matchedChar, characterInfo);
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    this.createFirstEncounterChoices(choicesElement, matchedChar);
                }
            }
        });
    }

    /**
     * 获取第一次偶遇的故事内容
     */
    getFirstEncounterStory(characterName, characterInfo) {
        const stories = {
            'LinZhou': `
                <div style="text-align: left; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="color: #1976d2; margin-bottom: 10px;">📍 ${characterInfo.location}</h4>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                            已经是晚上九点了，计算机实验室里只剩下几台电脑还在运行。你正准备离开，突然听到键盘敲击的声音。
                        </p>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                            角落里，一个男生正专注地盯着屏幕，手指在键盘上飞快地舞动。他的桌上放着一杯已经凉透的咖啡，
                            旁边散落着几张写满代码的草稿纸。
                        </p>
                        <div style="background: #fff; padding: 12px; border-left: 4px solid #ff6b9d; margin: 10px 0;">
                            <p style="margin: 0; font-style: italic; color: #666;">
                                "又是编译错误..."他轻声嘀咕着，揉了揉太阳穴。
                            </p>
                        </div>
                        <p style="line-height: 1.6; color: #555;">
                            这个男生似乎遇到了什么问题，你可以选择...
                        </p>
                    </div>
                </div>
            `,
            'SongYunshen': `
                <div style="text-align: left; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #fff3e0 0%, #f3e5f5 100%); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="color: #f57c00; margin-bottom: 10px;">📍 ${characterInfo.location}</h4>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                            夕阳透过图书馆的落地窗洒在古典文学区，金色的光线为整个空间增添了诗意的氛围。
                        </p>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                            你正在寻找一本《唐诗三百首》，却发现不远处的桌子上，一个男生正在专心地手写着什么。
                            他的身边放着一本《诗经》，旁边还有几张写满诗句的稿纸。
                        </p>
                        <div style="background: #fff; padding: 12px; border-left: 4px solid #ff6b9d; margin: 10px 0;">
                            <p style="margin: 0; font-style: italic; color: #666;">
                                "关关雎鸠，在河之洲..."他轻声朗读着，笔尖在纸上轻柔地划过。
                            </p>
                        </div>
                        <p style="line-height: 1.6; color: #555;">
                            在这个数字化的时代，还有人用手写诗歌，真是令人好奇...
                        </p>
                    </div>
                </div>
            `,
            'ZhouYichen': `
                <div style="text-align: left; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f3e5f5 100%); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="color: #4caf50; margin-bottom: 10px;">📍 ${characterInfo.location}</h4>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                            你走错了路，误打误撞地推开了学生会办公室的门。里面传来清晰而有条理的声音。
                        </p>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                            一个穿着得体的男生正在主持会议，他的声音充满自信，手势优雅而有力。
                            桌上摆放着整齐的文件和策划案，白板上写满了活动安排。
                        </p>
                        <div style="background: #fff; padding: 12px; border-left: 4px solid #ff6b9d; margin: 10px 0;">
                            <p style="margin: 0; font-style: italic; color: #666;">
                                "这次的社团招新活动，我们需要创新的思路..."他正在发表着自己的观点。
                            </p>
                        </div>
                        <p style="line-height: 1.6; color: #555;">
                            他注意到了门口的你，停下了讲话，其他学生会成员也转过头来...
                        </p>
                    </div>
                </div>
            `,
            'TangYan': `
                <div style="text-align: left; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #fff8e1 0%, #f3e5f5 100%); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="color: #ff9800; margin-bottom: 10px;">📍 ${characterInfo.location}</h4>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                            美术教室里弥漫着颜料的味道，阳光从天窗洒下，照亮了满墙的画作。
                        </p>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                            你被门口展示的一幅色彩绚烂的油画吸引，正准备细看，却听到里面传来画笔与画布摩擦的声音。
                            一个男生正站在画架前，专注地调配着颜料。
                        </p>
                        <div style="background: #fff; padding: 12px; border-left: 4px solid #ff6b9d; margin: 10px 0;">
                            <p style="margin: 0; font-style: italic; color: #666;">
                                "这个蓝色还是不够纯净..."他一边自言自语，一边在调色板上尝试不同的色彩搭配。
                            </p>
                        </div>
                        <p style="line-height: 1.6; color: #555;">
                            他的作品是一幅描绘校园春景的画，生动而富有感情...
                        </p>
                    </div>
                </div>
            `,
            'JiangChe': `
                <div style="text-align: left; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #e1f5fe 0%, #f3e5f5 100%); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="color: #0277bd; margin-bottom: 10px;">📍 ${characterInfo.location}</h4>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                            你因为轻微的头痛来到校医院，却发现这里比想象中要安静温馨。
                        </p>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">
                            一个穿着白大褂的男生正在认真地整理药品，动作轻柔而专业。
                            他注意到了你的到来，立刻放下手中的工作，温和地询问。
                        </p>
                        <div style="background: #fff; padding: 12px; border-left: 4px solid #ff6b9d; margin: 10px 0;">
                            <p style="margin: 0; font-style: italic; color: #666;">
                                "同学，你哪里不舒服？需要我帮助吗？"他的声音温柔而关切。
                            </p>
                        </div>
                        <p style="line-height: 1.6; color: #555;">
                            他的眼神中透着真诚的关心，让人不由得感到安心...
                        </p>
                    </div>
                </div>
            `
        };
        
        return stories[characterName] || stories['LinZhou'];
    }

    /**
     * 创建第一次偶遇的选择按钮
     */
    createFirstEncounterChoices(choicesElement, characterName) {
        const choices = this.getFirstEncounterChoices(characterName);
        
        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.style.marginBottom = '10px';
            
            btn.addEventListener('click', () => {
                this.handleFirstEncounterChoice(characterName, choice);
            });
            
            choicesElement.appendChild(btn);
        });
    }

    /**
     * 获取第一次偶遇的选择选项
     */
    getFirstEncounterChoices(characterName) {
        const choices = {
            'LinZhou': [
                { text: '"你在做什么项目？看起来很有趣"', value: 'interested', affection: 3 },
                { text: '"这么晚还在实验室，真努力呢"', value: 'praise', affection: 2 },
                { text: '"需要帮助吗？我也懂一些编程"', value: 'helpful', affection: 2 },
                { text: '"抱歉打扰了，我先走了"', value: 'leave', affection: 0 }
            ],
            'SongYunshen': [
                { text: '"你写的诗很美，可以看看吗？"', value: 'poetry_interest', affection: 3 },
                { text: '"没想到还有人手写诗歌，真难得"', value: 'appreciation', affection: 2 },
                { text: '"《诗经》是很好的灵感来源呢"', value: 'literary', affection: 2 },
                { text: '"图书馆要关门了"', value: 'reminder', affection: 0 }
            ],
            'ZhouYichen': [
                { text: '"抱歉打扰了，你们的讨论很精彩"', value: 'polite', affection: 2 },
                { text: '"我对学生会活动很感兴趣"', value: 'interested', affection: 3 },
                { text: '"看起来你们很专业，组织得很好"', value: 'praise', affection: 2 },
                { text: '"不好意思，我走错了"', value: 'awkward', affection: 1 }
            ],
            'TangYan': [
                { text: '"你的画真的很棒，色彩很有感觉"', value: 'artistic_praise', affection: 3 },
                { text: '"这是我们学校的春景吗？"', value: 'curious', affection: 2 },
                { text: '"抱歉打扰了，我只是被画作吸引"', value: 'polite', affection: 1 },
                { text: '"你经常在这里画画吗？"', value: 'interested', affection: 2 }
            ],
            'JiangChe': [
                { text: '"我有点头痛，可能是熬夜太多了"', value: 'honest', affection: 2 },
                { text: '"你看起来很专业，是医学院的吗？"', value: 'curious', affection: 2 },
                { text: '"谢谢你的关心，其实没什么大问题"', value: 'polite', affection: 1 },
                { text: '"你这么温柔，一定是个好医生"', value: 'compliment', affection: 3 }
            ]
        };
        
        return choices[characterName] || choices['LinZhou'];
    }

    /**
     * 处理第一次偶遇的选择
     */
    handleFirstEncounterChoice(characterName, choice) {
        // 标记角色为已遇见
        this.gameState.metCharacters.add(characterName);
        
        // 增加好感度
        if (choice.affection > 0) {
            // 确保角色关系数据存在
            if (!this.gameState.characterRelationships[characterName]) {
                this.initializeCharacterRelationships();
            }
            
            this.updateCharacterRelationship(characterName, {
                affection: choice.affection
            });
        }
        
        // 显示结果
        this.showFirstEncounterResult(characterName, choice);
    }

    /**
     * 显示第一次偶遇的结果
     */
    showFirstEncounterResult(characterName, choice) {
        const characterInfo = this.getCharacterIntroInfo(characterName);
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = `初识${characterInfo.name}`;
                
                if (descElement) {
                    const response = this.getEncounterResponse(characterName, choice);
                    descElement.innerHTML = `
                        <div style="text-align: left; padding: 20px;">
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                                ${response}
                            </div>
                            <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); padding: 12px; border-radius: 8px;">
                                <p style="color: #1976d2; font-weight: 500; margin: 0; font-size: 14px;">
                                    📝 你与${characterInfo.name}的初次相遇已记录
                                    ${choice.affection > 0 ? `<br>💝 好感度 +${choice.affection}` : ''}
                                </p>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    
                    const continueBtn = document.createElement('button');
                    continueBtn.textContent = '开始校园生活';
                    continueBtn.className = 'choice-btn';
                    continueBtn.style.background = '#4caf50';
                    
                    continueBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                    });
                    
                    choicesElement.appendChild(continueBtn);
                }
            }
        });
    }

    /**
     * 获取偶遇回应
     */
    getEncounterResponse(characterName, choice) {
        const responses = {
            'LinZhou': {
                'interested': '<p>林舟抬起头，眼中闪过一丝惊喜："这是一个智能推荐系统，不过遇到了算法优化的问题..."他详细地向你解释着项目。</p>',
                'praise': '<p>林舟不好意思地笑了笑："习惯了，编程的时候容易忘记时间。"</p>',
                'helpful': '<p>林舟有些意外："真的吗？那太好了，我正好需要有人帮我检查一下逻辑..."</p>',
                'leave': '<p>林舟点了点头，继续埋头工作，但你似乎错过了什么...</p>'
            },
            'SongYunshen': {
                'poetry_interest': '<p>宋云深的眼中闪过欣喜："你也喜欢诗吗？这是我最近的一些创作..."他小心地将诗稿递给你。</p>',
                'appreciation': '<p>宋云深温和地笑了："在这个快节奏的时代，我觉得手写更能表达内心的情感。"</p>',
                'literary': '<p>宋云深眼前一亮："你懂文学！《诗经》确实是中华文学的瑰宝..."</p>',
                'reminder': '<p>宋云深看了看时间，有些不舍地收起诗稿："谢谢提醒。"</p>'
            },
            // 其他角色的回应...
        };
        
        return responses[characterName]?.[choice.value] || '<p>他友好地回应了你。</p>';
    }

    /**
     * 年级升级通知
     */
    showGradeUpNotification(oldGrade, newGrade) {
        const gradeNames = { 1: '大一', 2: '大二', 3: '大三', 4: '大四' };
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = '升级了！';
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center;">
                            <div style="font-size: 60px; margin-bottom: 20px;">🎓</div>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                                <h4 style="color: #ff6b9d; margin-bottom: 15px;">恭喜升级！</h4>
                                <p style="line-height: 1.6; color: #555; margin-bottom: 15px;">
                                    经过努力的学习和生活，你从<strong>${gradeNames[oldGrade]}</strong>升级到了<strong>${gradeNames[newGrade]}</strong>！
                                </p>
                                <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8e8 100%); padding: 15px; border-radius: 8px;">
                                    <p style="color: #2e7d32; font-weight: 500; margin: 0;">
                                        ✨ 你的每周行动点数增加到了 ${this.gameState.maxActionPoints} 点！<br>
                                        现在可以进行更多的活动了！
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    
                    const continueBtn = document.createElement('button');
                    continueBtn.className = 'choice-btn';
                    continueBtn.textContent = '继续游戏';
                    continueBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                    });
                    
                    choicesElement.appendChild(continueBtn);
                }
            }
        });
    }

    /**
     * 获取可用的背景探索故事
     */
    getAvailableBackgroundExplorations() {
        const availableStories = [];
        
        // 安全检查
        if (!this.storyManager) {
            console.warn('StoryManager 未初始化');
            return availableStories;
        }
        
        Object.keys(this.gameState.characterRelationships).forEach(characterName => {
            const stories = this.storyManager.getAvailableBackgroundStories(characterName);
            stories.forEach(story => {
                availableStories.push({
                    characterName,
                    type: story.type,
                    name: story.name,
                    description: story.description
                });
            });
        });
        
        return availableStories;
    }

    /**
     * 开始背景探索
     */
    startBackgroundExploration(characterName, storyType) {
        console.log(`开始背景探索: ${characterName} - ${storyType}`);
        
        // 安全检查
        if (!this.storyManager) {
            console.error('StoryManager 未初始化');
            return;
        }
        
        // 消耗行动点
    this.gameState.actionPoints--;
    this.updateUI();
        
        // 开始背景探索故事
        this.storyManager.startBackgroundStory(characterName, storyType);
    }

    /**
     * 检查是否满足结局条件
     */
    checkEndingConditions(characterName) {
        const character = GameData.characters[characterName];
        if (!character) return false;

        const endingKey = `${characterName}_True_End`;
        const ending = GameData.endings[endingKey];
        if (!ending) return false;

        // 确保角色关系数据存在
        if (!this.gameState.characterRelationships[characterName]) {
            this.updateCharacterRelationship(characterName, {});
        }

        const relationship = this.gameState.characterRelationships[characterName];
        const conditions = ending.conditions;

        // 检查关系值条件
        if (relationship.affection < conditions.affection || 
            relationship.trust < conditions.trust) {
            return false;
        }

        // 检查玩家属性条件
        if (conditions.playerStats) {
            for (const [stat, required] of Object.entries(conditions.playerStats)) {
                if ((this.gameState.playerStats[stat] || 0) < required) {
                    return false;
                }
            }
        }

        // 检查背景故事完成情况
        if (conditions.requiredBackgroundStories && this.storyManager) {
            for (const storyType of conditions.requiredBackgroundStories) {
                if (!this.storyManager.hasStoryOccurred(characterName, storyType)) {
                    return false;
                }
            }
        }

        // 检查性格匹配
        if (conditions.requiredPersonalityMatch) {
            const playerPersonality = this.gameState.player.personality;
            const characterPersonality = character.personality;
            
            const hasMatchingTrait = conditions.requiredPersonalityMatch.some(trait => 
                playerPersonality.includes(trait) || characterPersonality.includes(trait)
            );
            
            if (!hasMatchingTrait) {
                return false;
            }
        }

        // 检查特殊事件（如果有）
        if (conditions.specialEvents) {
            for (const event of conditions.specialEvents) {
                if (!this.gameState.specialEvents.includes(event)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * 获取角色结局要求说明
     */
    getEndingRequirements(characterName) {
        const endingKey = `${characterName}_True_End`;
        const ending = GameData.endings[endingKey];
        if (!ending) return null;

        // 确保角色关系数据存在
        if (!this.gameState.characterRelationships[characterName]) {
            this.updateCharacterRelationship(characterName, {});
        }

        const relationship = this.gameState.characterRelationships[characterName];
        const conditions = ending.conditions;
        const requirements = [];

        // 关系值要求
        requirements.push({
            type: '关系发展',
            items: [
                `好感度: ${relationship.affection}/${conditions.affection}`,
                `信任度: ${relationship.trust}/${conditions.trust}`
            ],
            completed: relationship.affection >= conditions.affection && 
                      relationship.trust >= conditions.trust
        });

        // 背景故事要求
        if (conditions.requiredBackgroundStories && this.storyManager) {
            const storyItems = conditions.requiredBackgroundStories.map(storyType => {
                const storyInfo = GameData.backgroundStories[storyType];
                const completed = this.storyManager.hasStoryOccurred(characterName, storyType);
                return {
                    name: storyInfo ? storyInfo.name : storyType,
                    completed
                };
            });
            
            requirements.push({
                type: '背景了解',
                items: storyItems.map(item => `${item.name} ${item.completed ? '✅' : '❌'}`),
                completed: storyItems.every(item => item.completed)
            });
        }

        // 性格匹配要求
        if (conditions.requiredPersonalityMatch) {
            const playerPersonality = this.gameState.player.personality;
            const hasMatch = conditions.requiredPersonalityMatch.some(trait => 
                playerPersonality.includes(trait)
            );
            
            requirements.push({
                type: '性格匹配',
                items: [`需要具备: ${conditions.requiredPersonalityMatch.join('、')} 中的任一特质`],
                completed: hasMatch
            });
        }

        return {
            endingName: ending.name,
            requirements,
            canComplete: this.checkEndingConditions(characterName)
        };
    }

    /**
     * 显示结局要求
     */
    showEndingRequirements(characterName) {
        const requirements = this.getEndingRequirements(characterName);
        if (!requirements) return;

        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) {
                    titleElement.textContent = `${characterName} - 结局条件`;
                }
                
                if (descElement) {
                    let html = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 48px; margin-bottom: 15px;">💕</div>
                            <h3 style="color: #ff6b9d; margin-bottom: 15px;">${requirements.endingName}</h3>
                            <div style="text-align: left; background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    `;
                    
                    requirements.requirements.forEach(req => {
                        const statusIcon = req.completed ? '✅' : '⏳';
                        html += `
                            <div style="margin-bottom: 15px;">
                                <h4 style="color: #333; margin-bottom: 8px;">${statusIcon} ${req.type}</h4>
                                <ul style="margin-left: 20px; color: #666;">
                        `;
                        req.items.forEach(item => {
                            html += `<li style="margin-bottom: 4px;">${item}</li>`;
                        });
                        html += `</ul></div>`;
                    });
                    
                    if (requirements.canComplete) {
                        html += `
                            <div style="text-align: center; margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
                                <p style="color: #2e7d32; margin: 0; font-weight: bold;">🎉 恭喜！你已经满足所有条件，可以达成真爱结局！</p>
                            </div>
                        `;
                    } else {
                        html += `
                            <div style="text-align: center; margin-top: 20px; padding: 15px; background: #fff3e0; border-radius: 8px;">
                                <p style="color: #f57c00; margin: 0;">继续努力，完成所有要求就能达成真爱结局！</p>
                            </div>
                        `;
                    }
                    
                    html += `</div></div>`;
                    descElement.innerHTML = html;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    const closeBtn = document.createElement('button');
                    closeBtn.className = 'choice-btn';
                    closeBtn.textContent = '知道了';
                    closeBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                    });
                    choicesElement.appendChild(closeBtn);
                }
            }
        });
    }

    /**
     * 学习课程
     */
    studyCourse(courseType, options = {}) {
        const course = GameData.academicSystem.subjects[courseType];
        if (!course) return;

        // 检查是否有足够的行动点
        if (this.gameState.actionPoints < course.timeRequired) {
            this.engine.showNotification('行动点不足！', 'warning');
            return;
        }

        // 存储当前课程信息供后续使用
        this.currentStudyCourse = course;

        // 不在这里消耗行动点，留给finishActivity统一处理
        
        // 检查是否需要考试
        const shouldTakeExam = Math.random() < 0.3; // 30%概率触发考试
        
        if (shouldTakeExam && !options.auto) {
            this.startExam(courseType, course);
        } else {
            this.completeStudy(courseType, course, options);
        }
    }
    
    /**
     * 开始考试
     */
    startExam(courseType, course) {
        const examQuestions = GameData.academicSystem.examQuestions[courseType];
        if (!examQuestions || examQuestions.length === 0) {
            this.completeStudy(courseType, course);
            return;
        }
        
        const question = examQuestions[Math.floor(Math.random() * examQuestions.length)];
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = `${courseType} - 课堂测验`;
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="padding: 20px;">
                            <div style="font-size: 40px; text-align: center; margin-bottom: 20px;">📝</div>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                                <h4 style="color: #333; margin-bottom: 15px;">课堂测验</h4>
                                <p style="font-weight: bold; margin-bottom: 15px; line-height: 1.6;">${question.question}</p>
                                <p style="color: #666; font-size: 14px;">难度: ${question.difficulty}/100</p>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    question.options.forEach((option, index) => {
                        const button = document.createElement('button');
                        button.className = 'choice-btn';
                        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
                        button.addEventListener('click', () => {
                            this.handleExamAnswer(index, question.correct, courseType, course);
                        });
                        choicesElement.appendChild(button);
                    });
                }
            }
        });
    }
    
    /**
     * 处理考试答案
     */
    handleExamAnswer(selectedIndex, correctIndex, courseType, course) {
        const isCorrect = selectedIndex === correctIndex;
        const baseGain = course.knowledgeGain;
        const actualGain = isCorrect ? baseGain * 1.5 : baseGain * 0.5; // 答对加成50%，答错减半
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = isCorrect ? '答对了！' : '答错了...';
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 60px; margin-bottom: 20px;">${isCorrect ? '🎉' : '😔'}</div>
                            <div style="background: ${isCorrect ? '#e8f5e8' : '#ffebee'}; padding: 20px; border-radius: 10px;">
                                <h4 style="color: ${isCorrect ? '#2e7d32' : '#c62828'}; margin-bottom: 15px;">
                                    ${isCorrect ? '回答正确！' : '回答错误...'}
                                </h4>
                                <p style="line-height: 1.6; color: #555; margin-bottom: 15px;">
                                    ${isCorrect ? '你的理解很准确！' : '没关系，继续努力学习吧！'}
                                </p>
                                <p style="color: #666;">知识值 ${isCorrect ? '+' : '+'}${Math.floor(actualGain)}</p>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    const continueBtn = document.createElement('button');
                    continueBtn.className = 'choice-btn';
                    continueBtn.textContent = '继续学习';
                    continueBtn.addEventListener('click', () => {
                        this.completeStudyWithResult(courseType, course, actualGain, isCorrect);
                    });
                    choicesElement.appendChild(continueBtn);
                }
            }
        });
    }
    
    /**
     * 完成学习（带考试结果）
     */
    completeStudyWithResult(courseType, course, knowledgeGain, examPassed) {
        // 增加知识值
        this.gameState.player.knowledge += knowledgeGain;
        this.gameState.player.studyProgress += knowledgeGain;
        
        // 根据考试结果调整属性增长
        const statBonus = examPassed ? 1.5 : 1.0;
        this.applyStatEffects({ 
            学习: Math.floor(5 * statBonus), 
            专注: Math.floor(3 * statBonus), 
            知识: Math.floor(knowledgeGain / 10) 
        });
        
        if (examPassed) {
            this.gameState.playerStats.自信 = Math.min(100, this.gameState.playerStats.自信 + 3);
        }
        
        this.updateUI();
        this.showStudyResult(courseType, course, examPassed);
    }
    
    /**
     * 完成学习（常规）
     */
    completeStudy(courseType, course, options = {}) {
        // 增加知识值
        this.gameState.player.knowledge += course.knowledgeGain;
        this.gameState.player.studyProgress += course.knowledgeGain;
        
        // 增加学习相关属性
        this.applyStatEffects({ 学习: 5, 专注: 3, 知识: course.knowledgeGain / 10 });
        
        this.updateUI();
        if (options.auto) {
            // 自动模式：直接展示精简提示并结束本次行动
            this.engine.showModal('scenario-modal', {
                onShow: (modal) => {
                    const titleElement = modal.querySelector('.scenario-title');
                    const descElement = modal.querySelector('.scenario-description');
                    const choicesElement = modal.querySelector('.scenario-choices');
                    if (titleElement) titleElement.textContent = '学习完成';
                    if (descElement) {
                        descElement.innerHTML = `<div style="text-align:center;padding:20px;">
                            <div style=\"font-size:48px;margin-bottom:10px;\">📖</div>
                            <p style=\"color:#555;line-height:1.6;\">你完成了 <strong>${courseType}</strong>，知识值 +${course.knowledgeGain}</p>
                        </div>`;
                    }
                    if (choicesElement) {
                        choicesElement.innerHTML = '';
                        const btn = document.createElement('button');
                        btn.className = 'choice-btn';
                        btn.textContent = '继续';
                        btn.addEventListener('click', () => {
                            this.engine.closeModal('scenario-modal');
                            this.finishActivity(course.timeRequired);
                        });
                        choicesElement.appendChild(btn);
                    }
                }
            });
        } else {
            this.showStudyResult(courseType, course);
        }
    }

    /**
     * 显示学习结果
     */
    /**
     * 显示学习结果
     */
    showStudyResult(courseType, course, examPassed = null) {
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) {
                    titleElement.textContent = '学习完成';
                }
                
                if (descElement) {
                    let examHtml = '';
                    if (examPassed !== null) {
                        examHtml = `
                            <div style="background: ${examPassed ? '#e8f5e8' : '#fff3e0'}; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <h4 style="color: ${examPassed ? '#2e7d32' : '#f57c00'}; margin-bottom: 5px;">
                                    ${examPassed ? '📝 考试通过' : '📝 考试未通过'}
                                </h4>
                                <p style="color: #666; margin: 0; font-size: 14px;">
                                    ${examPassed ? '你的答案准确无误！' : '下次要更仔细地复习哦。'}
                                </p>
                            </div>
                        `;
                    }
                    
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 48px; margin-bottom: 15px;">📚</div>
                            <h3 style="color: #ff6b9d; margin-bottom: 15px;">完成了${courseType}！</h3>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                                <p style="color: #666; margin-bottom: 15px;">${course.description}</p>
                                ${examHtml}
                                <div style="background: #e8f5e8; padding: 15px; border-radius: 8px;">
                                    <h4 style="color: #2e7d32; margin-bottom: 10px;">📈 学习收获</h4>
                                    <p style="color: #4caf50; margin: 5px 0;">知识值 +${course.knowledgeGain}</p>
                                    <p style="color: #4caf50; margin: 5px 0;">学习能力 +5</p>
                                    <p style="color: #4caf50; margin: 5px 0;">专注力 +3</p>
                                    ${examPassed ? '<p style="color: #4caf50; margin: 5px 0;">自信心 +3</p>' : ''}
                                    <div style="margin-top: 10px; color: #666;">
                                        <small>当前知识值: ${this.gameState.player.knowledge}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    const continueBtn = document.createElement('button');
                    continueBtn.className = 'choice-btn';
                    continueBtn.textContent = '继续';
                    continueBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                        this.finishActivity(course.timeRequired); // 确保调用finishActivity来消耗行动点和更新UI
                    });
                    choicesElement.appendChild(continueBtn);
                }
            }
        });
    }

    /**
     * 检查是否需要参加期末考试
     */
    checkExamRequirement() {
        const currentGrade = this.gameState.player.grade;
        const gradeInfo = GameData.academicSystem.grades[currentGrade];
        const nextGradeInfo = GameData.academicSystem.grades[currentGrade + 1];
        
        // 检查是否到了学期末
    if (this.gameState.currentWeek % 8 === 0 && !this.gameState.player.isExamTime) {
            if (nextGradeInfo && this.gameState.player.knowledge >= nextGradeInfo.requiredKnowledge) {
                this.gameState.player.isExamTime = true;
                this.showExamNotice();
            } else if (nextGradeInfo) {
                this.showInsufficientKnowledge(nextGradeInfo.requiredKnowledge);
            }
        }
    }

    /**
     * 显示考试通知
     */
    showExamNotice() {
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) {
                    titleElement.textContent = '期末考试通知';
                }
                
                if (descElement) {
                    const currentGrade = this.gameState.player.grade;
                    const gradeInfo = GameData.academicSystem.grades[currentGrade];
                    
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 48px; margin-bottom: 15px;">📝</div>
                            <h3 style="color: #ff6b9d; margin-bottom: 15px;">期末考试来了！</h3>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                                <p style="color: #666; margin-bottom: 15px;">
                                    ${gradeInfo.name}的期末考试即将开始。你必须通过考试才能升入下一年级，
                                    否则将会留级，这可能会影响你与目标角色的关系发展。
                                </p>
                                <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin-top: 15px;">
                                    <p style="color: #f57c00; margin: 0;">
                                        <strong>考试难度:</strong> ${gradeInfo.examDifficulty}/100<br>
                                        <strong>你的知识水平:</strong> ${this.gameState.player.knowledge}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    
                    const examBtn = document.createElement('button');
                    examBtn.className = 'choice-btn';
                    examBtn.textContent = '参加考试';
                    examBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                        this.startExam();
                    });
                    choicesElement.appendChild(examBtn);
                    
                    const prepareBtn = document.createElement('button');
                    prepareBtn.className = 'choice-btn';
                    prepareBtn.style.background = '#ddd';
                    prepareBtn.textContent = '再准备一下';
                    prepareBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                    });
                    choicesElement.appendChild(prepareBtn);
                }
            }
        });
    }

    /**
     * 开始期末考试
     */
    startExam() {
        const currentGrade = this.gameState.player.grade;
        const gradeInfo = GameData.academicSystem.grades[currentGrade];
        
        // 根据当前年级选择考试题目类型
        let questionType = "基础课程";
        if (currentGrade >= 3) questionType = "高级课程";
        else if (currentGrade >= 2) questionType = "专业课程";
        
        const questions = GameData.academicSystem.examQuestions[questionType];
        const selectedQuestions = this.getRandomQuestions(questions, 3);
        
        this.currentExam = {
            questions: selectedQuestions,
            currentQuestion: 0,
            correctAnswers: 0,
            totalQuestions: selectedQuestions.length
        };
        
        this.showExamQuestion();
    }

    /**
     * 随机选择考试题目
     */
    getRandomQuestions(questions, count) {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    /**
     * 显示考试题目
     */
    showExamQuestion() {
        const exam = this.currentExam;
        const question = exam.questions[exam.currentQuestion];
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) {
                    titleElement.textContent = `期末考试 (${exam.currentQuestion + 1}/${exam.totalQuestions})`;
                }
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="padding: 20px;">
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                                <h4 style="color: #333; margin-bottom: 15px;">题目:</h4>
                                <p style="font-size: 16px; line-height: 1.6; color: #555;">${question.question}</p>
                            </div>
                            <div style="text-align: center; color: #888; font-size: 12px;">
                                难度: ${question.difficulty}/100
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    
                    question.options.forEach((option, index) => {
                        const optionBtn = document.createElement('button');
                        optionBtn.className = 'choice-btn';
                        optionBtn.style.cssText = 'text-align: left; margin-bottom: 10px;';
                        optionBtn.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${option}`;
                        optionBtn.addEventListener('click', () => {
                            this.answerExamQuestion(index);
                        });
                        choicesElement.appendChild(optionBtn);
                    });
                }
            }
        });
    }

    /**
     * 回答考试题目
     */
    answerExamQuestion(selectedIndex) {
        const exam = this.currentExam;
        const question = exam.questions[exam.currentQuestion];
        const isCorrect = selectedIndex === question.correct;
        
        if (isCorrect) {
            exam.correctAnswers++;
        }
        
        // 显示答题结果
        this.showAnswerResult(isCorrect, question.options[question.correct]);
    }

    /**
     * 显示答题结果
     */
    showAnswerResult(isCorrect, correctAnswer) {
        const exam = this.currentExam;
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) {
                    titleElement.textContent = isCorrect ? '回答正确！' : '回答错误';
                }
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 48px; margin-bottom: 15px;">${isCorrect ? '✅' : '❌'}</div>
                            <div style="background: ${isCorrect ? '#e8f5e8' : '#ffebee'}; padding: 20px; border-radius: 10px;">
                                <h4 style="color: ${isCorrect ? '#2e7d32' : '#d32f2f'}; margin-bottom: 15px;">
                                    ${isCorrect ? '恭喜你答对了！' : '很遗憾答错了'}
                                </h4>
                                ${!isCorrect ? `<p style="color: #666;">正确答案是: ${correctAnswer}</p>` : ''}
                                <div style="margin-top: 15px; color: #666; font-size: 14px;">
                                    当前得分: ${exam.correctAnswers}/${exam.currentQuestion + 1}
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'choice-btn';
                    nextBtn.textContent = exam.currentQuestion + 1 < exam.totalQuestions ? '下一题' : '查看结果';
                    nextBtn.addEventListener('click', () => {
                        exam.currentQuestion++;
                        if (exam.currentQuestion < exam.totalQuestions) {
                            this.showExamQuestion();
                        } else {
                            this.showExamResult();
                        }
                    });
                    choicesElement.appendChild(nextBtn);
                }
            }
        });
    }

    /**
     * 显示考试结果
     */
    showExamResult() {
        const exam = this.currentExam;
        const score = (exam.correctAnswers / exam.totalQuestions) * 100;
        const passed = score >= 60; // 60分及格
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) {
                    titleElement.textContent = '考试结果';
                }
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 48px; margin-bottom: 15px;">${passed ? '🎉' : '😢'}</div>
                            <div style="background: ${passed ? '#e8f5e8' : '#ffebee'}; padding: 20px; border-radius: 10px;">
                                <h3 style="color: ${passed ? '#2e7d32' : '#d32f2f'}; margin-bottom: 15px;">
                                    ${passed ? '恭喜通过考试！' : '考试未通过'}
                                </h3>
                                <div style="font-size: 24px; margin-bottom: 15px; color: #333;">
                                    得分: ${score.toFixed(0)}分
                                </div>
                                <div style="color: #666; margin-bottom: 15px;">
                                    正确题数: ${exam.correctAnswers}/${exam.totalQuestions}
                                </div>
                                <p style="color: #666; line-height: 1.6;">
                                    ${passed ? 
                                        '你成功通过了期末考试，可以升入下一年级！继续你的校园恋爱故事吧！' : 
                                        '很遗憾，你需要留级重修。这可能会影响你与心仪角色的关系发展...'}
                                </p>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    const continueBtn = document.createElement('button');
                    continueBtn.className = 'choice-btn';
                    continueBtn.textContent = '继续游戏';
                    continueBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                        this.processExamResult(passed);
                    });
                    choicesElement.appendChild(continueBtn);
                }
            }
        });
    }

    /**
     * 处理考试结果
     */
    processExamResult(passed) {
        this.gameState.player.isExamTime = false;
        
        if (passed) {
            // 通过考试，升级
            this.gameState.player.grade++;
            this.gameState.player.currentSemester++;
            this.gameState.player.examsPassed.push(this.gameState.player.grade - 1);
            
            // 增加属性
            this.applyStatEffects({ 学习: 10, 理性: 5, 自信: 3 });
            
            this.showGradePromotion();
        } else {
            // 未通过考试，留级
            this.gameState.player.knowledge = Math.max(0, this.gameState.player.knowledge - 20);
            
            // 影响与所有角色的关系
            Object.keys(this.gameState.characterRelationships).forEach(characterName => {
                this.updateCharacterRelationship(characterName, { affection: -5, trust: -3 });
            });
            
            this.showRepeatGrade();
        }
        
        this.updateUI();
    }

    /**
     * 显示升级通知
     */
    showGradePromotion() {
        const gradeNames = { 1: "大一", 2: "大二", 3: "大三", 4: "大四" };
        const newGrade = this.gameState.player.grade;
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = '升级成功！';
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 60px; margin-bottom: 20px;">🎓</div>
                            <div style="background: #e8f5e8; padding: 20px; border-radius: 10px;">
                                <h3 style="color: #2e7d32; margin-bottom: 15px;">升入${gradeNames[newGrade]}！</h3>
                                <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
                                    恭喜你成功通过期末考试，现在你是${gradeNames[newGrade]}的学生了！
                                    继续努力学习，追求你的校园恋情吧！
                                </p>
                                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                    <h4 style="color: #333; margin-bottom: 10px;">📈 能力提升</h4>
                                    <p style="color: #4caf50; margin: 0;">学习 +10, 理性 +5, 自信 +3</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    const continueBtn = document.createElement('button');
                    continueBtn.className = 'choice-btn';
                    continueBtn.textContent = '继续游戏';
                    continueBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                    });
                    choicesElement.appendChild(continueBtn);
                }
            }
        });
    }

    /**
     * 显示留级通知
     */
    showRepeatGrade() {
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = '留级了...';
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 60px; margin-bottom: 20px;">😢</div>
                            <div style="background: #ffebee; padding: 20px; border-radius: 10px;">
                                <h3 style="color: #d32f2f; margin-bottom: 15px;">很遗憾，你需要留级</h3>
                                <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
                                    由于考试未通过，你需要重读这一年级。这影响了你与所有角色的关系，
                                    他们可能会对你的学业表现感到失望...
                                </p>
                                <div style="background: #fff3e0; padding: 15px; border-radius: 8px;">
                                    <h4 style="color: #f57c00; margin-bottom: 10px;">📉 关系影响</h4>
                                    <p style="color: #ff5722; margin: 0;">所有角色好感度 -5, 信任度 -3</p>
                                    <p style="color: #ff5722; margin: 5px 0 0 0;">知识值 -20</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    const continueBtn = document.createElement('button');
                    continueBtn.className = 'choice-btn';
                    continueBtn.textContent = '重新努力';
                    continueBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                    });
                    choicesElement.appendChild(continueBtn);
                }
            }
        });
    }

    /**
     * 显示知识不足提示
     */
    showInsufficientKnowledge(requiredKnowledge) {
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) titleElement.textContent = '学业不足';
                
                if (descElement) {
                    descElement.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 48px; margin-bottom: 15px;">📚</div>
                            <div style="background: #fff3e0; padding: 20px; border-radius: 10px;">
                                <h3 style="color: #f57c00; margin-bottom: 15px;">需要更多学习</h3>
                                <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
                                    你的知识水平还不够参加下一年级的期末考试。
                                    继续学习更多课程来提升自己吧！
                                </p>
                                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                    <p style="color: #333; margin: 0;">
                                        当前知识值: ${this.gameState.player.knowledge}<br>
                                        升级所需: ${requiredKnowledge}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    const continueBtn = document.createElement('button');
                    continueBtn.className = 'choice-btn';
                    continueBtn.textContent = '继续学习';
                    continueBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                    });
                    choicesElement.appendChild(continueBtn);
                }
            }
        });
    }
}

// 补充：独自活动降级逻辑，防止报错
GameLogic.prototype.startSoloActivity = function(activityId) {
    this.engine.showModal('scenario-modal', {
        onShow: (modal) => {
            const titleElement = modal.querySelector('.scenario-title');
            const descElement = modal.querySelector('.scenario-description');
            const choicesElement = modal.querySelector('.scenario-choices');
            if (titleElement) titleElement.textContent = '活动完成';
            if (descElement) {
                descElement.innerHTML = `<div style="text-align:center;padding:20px;">
                    <div style=\"font-size:48px;margin-bottom:10px;\">🕒</div>
                    <p style=\"color:#555;line-height:1.6;\">你完成了 <strong>${activityId}</strong>，度过了平静的一天。</p>
                </div>`;
            }
            if (choicesElement) {
                choicesElement.innerHTML = '';
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = '继续';
                btn.addEventListener('click', () => {
                    this.engine.closeModal('scenario-modal');
                    this.finishActivity();
                });
                choicesElement.appendChild(btn);
            }
        }
    });
};
