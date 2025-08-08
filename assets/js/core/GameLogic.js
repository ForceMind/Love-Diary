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
                grade: 1  // 年级：1=大一, 2=大二, 3=大三, 4=大四
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

        // 初始化认识状态
        this.gameState.characterMeetStatus = {};
        characters.forEach(characterName => {
            this.gameState.characterMeetStatus[characterName] = {
                met: false,           // 是否认识
                meetWeek: 0,         // 认识的周数
                intimacyLevel: 0,    // 亲密等级
                lastInteraction: 0   // 最后互动周数
            };
        });
    }

    /**
     * 开始新游戏
     */
    startGame(playerData) {
        console.log('开始新游戏，玩家数据:', playerData);
        
        // 设置玩家信息
        this.gameState.player = { ...playerData, grade: 1 };
        
        // 初始化角色关系
        this.initializeCharacterRelationships();
        
        // 检查是否是全新游戏
        if (this.gameState.currentWeek === 1 && this.gameState.actionPoints === 2) {
            this.showIntroStoryline();
        } else {
            this.showGameScreen();
        }
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
            
            this.showGradeUpNotification(oldGrade, newGrade);
        }
    }

    /**
     * 角色关系管理
     */
    updateCharacterRelationship(characterName, changes = {}) {
        console.log(`=== 更新角色关系: ${characterName} ===`);
        
        if (!this.gameState.characterRelationships[characterName]) {
            console.warn(`角色 ${characterName} 的关系数据不存在，将初始化`);
            this.initializeCharacterRelationships();
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
        this.showActivityMenu(day);
    }

    /**
     * 显示活动菜单
     */
    showActivityMenu(day) {
        const activities = this.getAvailableActivities(day);
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
        const isMet = this.gameState.characterMeetStatus[characterName]?.met;
        const storyType = isMet ? 'interaction' : 'first_meeting';
        
        // 从故事数据中获取故事内容
        const storyInstance = new StoryManager(this);
        storyInstance.startStory(characterName, activityId, storyType);
    }

    /**
     * 完成活动
     */
    finishActivity() {
        // 消耗行动点
        this.gameState.actionPoints = Math.max(0, this.gameState.actionPoints - 1);
        
        // 更新周统计
        this.updateWeekStats();
        
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
        
        this.updateGameUI();
    }

    showMainMenu() {
        const mainMenu = document.getElementById('main-menu');
        const gameScreen = document.getElementById('game-screen');
        
        if (gameScreen) gameScreen.classList.remove('active');
        if (mainMenu) mainMenu.classList.add('active');
    }

    updateGameUI() {
        // 更新玩家信息显示
        this.updatePlayerInfo();
        // 更新行动点数显示
        this.updateActionPoints();
        // 更新周信息显示
        this.updateWeekInfo();
    }

    updatePlayerInfo() {
        const playerNameElement = document.querySelector('.player-name');
        const playerMajorElement = document.querySelector('.player-major');
        const playerGradeElement = document.querySelector('.player-grade');
        
        if (playerNameElement) playerNameElement.textContent = this.gameState.player.name;
        if (playerMajorElement) playerMajorElement.textContent = this.gameState.player.major;
        if (playerGradeElement) {
            const gradeNames = { 1: '大一', 2: '大二', 3: '大三', 4: '大四' };
            playerGradeElement.textContent = gradeNames[this.gameState.player.grade];
        }
    }

    updateActionPoints() {
        const actionPointsElement = document.querySelector('.action-points');
        if (actionPointsElement) {
            actionPointsElement.textContent = `${this.gameState.actionPoints}/${this.gameState.maxActionPoints}`;
        }
    }

    updateWeekInfo() {
        const weekElement = document.querySelector('.current-week');
        if (weekElement) {
            weekElement.textContent = `第${this.gameState.currentWeek}周`;
        }
    }

    /**
     * 新手引导
     */
    showIntroStoryline() {
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
                                        💡 游戏玩法：现在是大一，每周2个行动点数<br>
                                        每20周升一年级，行动点数会增加<br>
                                        点击日期进行活动，与角色互动提升好感度
                                    </p>
                                </div>
                                <p style="line-height: 1.4; color: #555; font-size: 13px;">
                                    你将遇到：学霸顾言、阳光林舟、优雅宋之南、可爱周奕辰、才华江澈、温柔苏云深、强势唐言，还有神秘的萧然...
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
                    startBtn.style.cssText = `
                        background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%) !important;
                        color: white !important;
                        padding: 18px 30px !important;
                        border-radius: 30px !important;
                        border: 3px solid #ff8fab !important;
                        font-size: 18px !important;
                        font-weight: 700 !important;
                        cursor: pointer !important;
                        width: 100% !important;
                        box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4) !important;
                    `;
                    
                    startBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                        this.showGameScreen();
                    });
                    
                    choicesElement.appendChild(startBtn);
                }
            }
        });
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
}
