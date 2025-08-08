// 游戏引擎 - 完全弹窗模式
class LoveDiaryGame {
    constructor() {
        this.gameState = {
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
            characterRelationships: {},
            achievements: [],
            unlockedEndings: [],
            currentEnding: null,
            weekStats: {
                study: 0,
                social: 0,
                leisure: 0,
                encounter: 0
            },
            playerStats: {
                学习: 50,
                社交: 50,
                心情: 50,
                专注: 50,
                计划性: 50,
                条理: 50,
                感性: 50,
                理性: 50,
                勇气: 50,
                耐心: 50,
                创造力: 50,
                沟通: 50,
                领导力: 50,
                观察力: 50,
                艺术: 50,
                运动: 50,
                健康: 50,
                魅力: 50,
                知识: 50,
                经验: 50
            }
        };
        
        this.selectedDay = null;
        this.init();
    }

    init() {
        console.log('Love Diary Game 初始化完成');
        this.initializeCharacterRelationships();
        this.setupModalEventListeners();
        
        // 检查是否有存档，有的话自动加载
        this.checkAutoLoad();
    }

    checkAutoLoad() {
        try {
            const saveData = localStorage.getItem('loveDiarySave');
            if (saveData) {
                const data = JSON.parse(saveData);
                // 检查存档是否有效且游戏已开始
                if (data.gameState && data.gameState.player && data.gameState.player.name) {
                    // 显示自动加载提示
                    this.showAutoLoadPrompt(data);
                    return;
                }
            }
        } catch (error) {
            console.log('存档检查失败:', error);
        }
        
        // 没有有效存档，显示主菜单
        this.showMainMenu();
    }

    showAutoLoadPrompt(saveData) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.style.cssText = `
            z-index: 5000;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        modal.innerHTML = `
            <div class="modal-content" style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%; text-align: center;">
                <h3 style="color: #ff6b9d; margin-bottom: 20px;">🎮 发现存档</h3>
                <div style="background: linear-gradient(135deg, #ffeef8 0%, #f0e6ff 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #ff6b9d; margin-bottom: 10px;">💾 存档信息</h4>
                    <p style="margin: 5px 0;"><strong>角色：</strong>${saveData.gameState.player.name}</p>
                    <p style="margin: 5px 0;"><strong>进度：</strong>第${saveData.gameState.currentWeek}周</p>
                    <p style="margin: 5px 0;"><strong>专业：</strong>${saveData.gameState.player.major}</p>
                    <small style="color: #666;">${new Date(saveData.timestamp).toLocaleString()}</small>
                </div>
                <p style="line-height: 1.8; color: #555; margin-bottom: 25px;">是否继续之前的游戏？</p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="game.startNewGame(); this.parentElement.parentElement.parentElement.remove();" 
                            style="background: #f44336; color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 500;">
                        重新开始
                    </button>
                    <button onclick="game.autoLoadGame(); this.parentElement.parentElement.parentElement.remove();" 
                            style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 500;">
                        继续游戏
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    autoLoadGame() {
        if (this.loadGame()) {
            this.showGameScreen();
            this.showGameNotification('欢迎回来！游戏已自动加载', 'success');
        } else {
            this.showMainMenu();
        }
    }

    startNewGame() {
        // 清除旧存档
        localStorage.removeItem('loveDiarySave');
        this.resetGame();
        this.showMainMenu();
    }

    showMainMenu() {
        // 确保主菜单显示
        const mainMenu = document.getElementById('main-menu');
        if (mainMenu) {
            mainMenu.classList.add('active');
        }
    }

    initializeCharacterRelationships() {
        Object.keys(gameData.characters).forEach(characterName => {
            this.gameState.characterRelationships[characterName] = {
                affection: 0,
                trust: 0,
                events: [],
                specialEvents: []
            };
        });
    }

    updateCharacterRelationship(characterName, affectionChange, trustChange = 0) {
        console.log(`=== 更新角色关系 ===`);
        console.log(`角色: ${characterName}`);
        console.log(`好感度变化: ${affectionChange}`);
        console.log(`信任度变化: ${trustChange}`);
        
        if (!this.gameState.characterRelationships[characterName]) {
            console.warn(`角色 ${characterName} 的关系数据不存在，将初始化`);
            this.gameState.characterRelationships[characterName] = {
                affection: 0,
                trust: 0,
                events: [],
                specialEvents: []
            };
        }
        
        const relationship = this.gameState.characterRelationships[characterName];
        const oldAffection = relationship.affection;
        const oldTrust = relationship.trust;
        
        // 更新好感度和信任度，限制在0-100范围内
        relationship.affection = Math.max(0, Math.min(100, relationship.affection + affectionChange));
        relationship.trust = Math.max(0, Math.min(100, relationship.trust + trustChange));
        
        console.log(`好感度: ${oldAffection} -> ${relationship.affection}`);
        console.log(`信任度: ${oldTrust} -> ${relationship.trust}`);
        console.log(`=== 关系更新完成 ===`);
    }

    // 年级系统
    calculateGrade() {
        // 根据周数计算年级：每20周升一年级
        const weeksPerGrade = 20;
        const grade = Math.min(4, Math.floor((this.gameState.currentWeek - 1) / weeksPerGrade) + 1);
        return grade;
    }
    
    updateGradeAndActionPoints() {
        const newGrade = this.calculateGrade();
        const oldGrade = this.gameState.player.grade;
        
        if (newGrade !== oldGrade) {
            this.gameState.player.grade = newGrade;
            
            // 根据年级设置行动点数
            const gradeActionPoints = {
                1: 2,  // 大一：2点
                2: 3,  // 大二：3点  
                3: 5,  // 大三：5点
                4: 7   // 大四：7点
            };
            
            this.gameState.maxActionPoints = gradeActionPoints[newGrade];
            this.gameState.actionPoints = this.gameState.maxActionPoints; // 升级时补满行动点数
            
            // 显示升级提示
            this.showGradeUpNotification(oldGrade, newGrade);
        }
    }
    
    showGradeUpNotification(oldGrade, newGrade) {
        const gradeNames = {
            1: '大一',
            2: '大二', 
            3: '大三',
            4: '大四'
        };
        
        const modal = document.getElementById('scenario-modal');
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
                this.closeModal('scenario-modal');
            });
            
            choicesElement.appendChild(continueBtn);
        }
        
        this.showModal('scenario-modal');
    }
    
    getGradeName() {
        const gradeNames = {
            1: '大一',
            2: '大二',
            3: '大三', 
            4: '大四'
        };
        return gradeNames[this.gameState.player.grade] || '大一';
    }

    setupModalEventListeners() {
        // 点击弹窗外部关闭弹窗
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // 设置音量滑块事件
        const soundSlider = document.getElementById('sound-volume');
        const musicSlider = document.getElementById('music-volume');
        
        if (soundSlider) {
            soundSlider.addEventListener('input', (e) => {
                document.getElementById('sound-value').textContent = e.target.value;
            });
        }
        
        if (musicSlider) {
            musicSlider.addEventListener('input', (e) => {
                document.getElementById('music-value').textContent = e.target.value;
            });
        }
    }

    // 弹窗管理
    showModal(modalId) {
        console.log('显示弹窗:', modalId);
        const modal = document.getElementById(modalId);
        console.log('找到弹窗元素:', modal);
        if (modal) {
            modal.classList.add('active');
            console.log('弹窗已激活');
            
            // 根据不同弹窗加载相应内容
            switch(modalId) {
                case 'achievements-modal':
                    this.loadAchievements();
                    break;
                case 'gallery-modal':
                    this.loadGallery();
                    break;
                case 'load-game-modal':
                    this.loadSaveSlots();
                    break;
                // 移除 game-timeline-modal 的处理，改用 showGameScreen
            }
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // 智能关闭弹窗 - 根据游戏状态决定导航
    smartCloseModal(modalId) {
        this.closeModal(modalId);
        
        // 如果游戏已经开始，关闭弹窗后应该回到游戏界面
        if (this.gameState.player.name) {
            // 延迟一点时间确保关闭动画完成
            setTimeout(() => {
                this.showGameScreen();
            }, 100);
        }
    }

    // 游戏内通知系统
    showGameNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'game-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)' : 
                        type === 'success' ? 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)' :
                        type === 'warning' ? 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)' :
                        'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)'};
            color: white;
            padding: 15px 20px;
            border-radius: 15px;
            z-index: 3000;
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
            word-wrap: break-word;
            font-weight: 500;
        `;
        
        // 添加图标
        const icon = type === 'error' ? '❌' : 
                    type === 'success' ? '✅' : 
                    type === 'warning' ? '⚠️' : 'ℹ️';
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="font-size: 18px; margin-right: 10px;">${icon}</span>
                <span>${message}</span>
            </div>
        `;
        
        // 添加CSS动画
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // 自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.5s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 500);
            }
        }, duration);
    }

    // 游戏内确认对话框
    showGameConfirm(message, onConfirm, onCancel = null) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.style.cssText = `
            z-index: 4000;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        modal.innerHTML = `
            <div class="modal-content" style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; width: 90%; text-align: center;">
                <h3 style="color: #ff6b9d; margin-bottom: 20px;">🤔 确认操作</h3>
                <p style="line-height: 1.8; color: #555; margin-bottom: 25px; font-size: 16px;">${message}</p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="this.parentElement.parentElement.parentElement.remove(); (${onCancel ? onCancel.toString() : 'function(){}'})()" 
                            style="background: #f44336; color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 500;">
                        取消
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove(); (${onConfirm.toString()})()" 
                            style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 500;">
                        确认
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // 游戏流程控制
    startGame(playerData) {
        console.log('开始游戏，玩家数据:', playerData);
        this.gameState.player = playerData;
        // 初始化年级为大一
        this.gameState.player.grade = 1;
        
        console.log('当前游戏状态:');
        console.log('currentWeek:', this.gameState.currentWeek);
        console.log('actionPoints:', this.gameState.actionPoints);
        
        this.closeModal('character-creation-modal');
        
        // 检查是否是新游戏，如果是则显示开场故事线
        if (this.gameState.currentWeek === 1 && this.gameState.actionPoints === 2) {
            console.log('条件满足，显示新手引导');
            this.showIntroStoryline();
        } else {
            console.log('条件不满足，直接进入游戏界面');
            this.showGameScreen();
            this.updateGameUI();
        }
    }
    
    // 新手引导故事线
    showIntroStoryline() {
        console.log('开始显示新手引导');
        const modal = document.getElementById('scenario-modal');
        const titleElement = modal.querySelector('.scenario-title');
        const descElement = modal.querySelector('.scenario-description');
        const choicesElement = modal.querySelector('.scenario-choices');
        
        console.log('Modal元素:', modal);
        console.log('Title元素:', titleElement);
        console.log('Desc元素:', descElement);
        console.log('Choices元素:', choicesElement);
        
        if (titleElement) titleElement.textContent = '新的开始';
        
        if (descElement) {
            descElement.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 60px; margin-bottom: 20px;">🌸</div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="color: #ff6b9d; margin-bottom: 15px;">欢迎来到心动日记！</h4>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 15px;">
                            你是 <strong>${this.gameState.player.name}</strong>，一名${this.gameState.player.major}专业的大学生。
                            性格${this.gameState.player.personality}的你，即将开始一段充满可能性的校园恋爱故事。
                        </p>
                        <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <p style="color: #1976d2; font-weight: 500; margin: 0;">
                                💡 游戏玩法提示：<br>
                                • 现在是大一，每周有2个行动点数<br>
                                • 每20周升一年级，行动点数会增加<br>
                                • 大二3点、大三5点、大四7点<br>
                                • 点击不同日期进行各种活动<br>
                                • 通过互动提升与角色的好感度<br>
                                • 你的选择将影响故事的发展
                            </p>
                        </div>
                        <p style="line-height: 1.6; color: #555;">
                            在这所美丽的大学里，你将会遇到各种各样有趣的人物：
                            学霸顾言、阳光林舟、优雅宋之南、可爱周奕辰、才华江澈、
                            温柔苏云深、强势唐言，还有神秘的萧然...
                        </p>
                    </div>
                </div>
            `;
        }
        
        // 设置选择按钮
        if (choicesElement) {
            console.log('找到选择按钮容器，开始创建按钮');
            choicesElement.innerHTML = '';
            
            const startBtn = document.createElement('button');
            // 不使用 choice-btn 类避免样式冲突
            startBtn.textContent = '开始我的校园生活！';
            
            // 使用更强的内联样式确保可见性
            startBtn.style.cssText = `
                background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%) !important;
                color: white !important;
                padding: 15px 25px !important;
                border-radius: 25px !important;
                border: none !important;
                font-size: 16px !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                width: 100% !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                margin: 10px 0 !important;
                text-align: center !important;
                box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3) !important;
                position: relative !important;
                z-index: 10 !important;
                overflow: visible !important;
            `;
            startBtn.addEventListener('click', () => {
                console.log('开始游戏按钮被点击');
                this.closeModal('scenario-modal');
                this.showGameScreen();
                this.updateGameUI();
                // 显示第一天的特殊引导
                setTimeout(() => {
                    this.showFirstDayGuide();
                }, 1000);
            });
            
            // 添加 hover 效果
            startBtn.addEventListener('mouseenter', () => {
                startBtn.style.transform = 'translateY(-2px)';
                startBtn.style.boxShadow = '0 8px 20px rgba(255, 107, 157, 0.5)';
            });
            
            startBtn.addEventListener('mouseleave', () => {
                startBtn.style.transform = 'translateY(0)';
                startBtn.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.3)';
            });
            
            choicesElement.appendChild(startBtn);
            console.log('主按钮已添加到容器中');
            
        } else {
            console.error('未找到选择按钮容器');
        }
        
        this.showModal('scenario-modal');
        console.log('新手引导设置完成，弹窗应该已显示');
    }
    
    // 第一天引导
    showFirstDayGuide() {
        const modal = document.getElementById('scenario-modal');
        const titleElement = modal.querySelector('.scenario-title');
        const descElement = modal.querySelector('.scenario-description');
        const choicesElement = modal.querySelector('.scenario-choices');
        
        if (titleElement) titleElement.textContent = '第一天的校园';
        
        if (descElement) {
            descElement.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 60px; margin-bottom: 20px;">🏫</div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="line-height: 1.6; color: #555; margin-bottom: 15px;">
                            今天是你在这所大学的第一天，阳光明媚，微风轻拂。
                            校园里到处都是忙碌的学生，你可以选择不同的活动来度过这美好的一天。
                        </p>
                        <div style="background: linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%); padding: 15px; border-radius: 8px;">
                            <p style="color: #f57c00; font-weight: 500; margin: 0;">
                                💫 小贴士：不同的日期对应不同的活动类型，<br>
                                选择你感兴趣的日期开始你的故事吧！
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // 设置选择按钮
        if (choicesElement) {
            choicesElement.innerHTML = '';
            
            const continueBtn = document.createElement('button');
            continueBtn.className = 'choice-btn';
            continueBtn.textContent = '了解，开始选择活动';
            continueBtn.addEventListener('click', () => {
                this.closeModal('scenario-modal');
            });
            
            choicesElement.appendChild(continueBtn);
        }
        
        this.showModal('scenario-modal');
    }
    
    showGameScreen() {
        // 隐藏主菜单，显示游戏界面
        const mainMenu = document.getElementById('main-menu');
        const gameScreen = document.getElementById('game-screen');
        
        if (mainMenu) mainMenu.classList.remove('active');
        if (gameScreen) gameScreen.classList.add('active');
        
        console.log('切换到游戏界面');
    }
    
    returnToMenu() {
        // 显示确认对话框
        this.showGameConfirm(
            '确定要返回主菜单吗？未保存的进度将会丢失！',
            () => {
                this.showMainMenu();
            }
        );
    }
    
    showMainMenu() {
        // 隐藏游戏界面，显示主菜单
        const mainMenu = document.getElementById('main-menu');
        const gameScreen = document.getElementById('game-screen');
        
        if (gameScreen) gameScreen.classList.remove('active');
        if (mainMenu) mainMenu.classList.add('active');
        
        console.log('返回主菜单');
    }

    selectDay(day) {
        console.log('selectDay 被调用，day:', day);
        console.log('当前游戏状态:', this.gameState);
        console.log('当前行动点数:', this.gameState.actionPoints);
        
        if (this.gameState.actionPoints <= 0) {
            console.log('行动点数不足，询问是否进入下一周');
            this.askForNextWeek();
            return;
        }
        
        console.log('开始执行日期选择逻辑...');
        this.selectedDay = day;
        
        // 行动点数将在场景选择后消耗，这里不消耗
        console.log('当前行动点数:', this.gameState.actionPoints);
        
        // 更新统计数据
        this.updateWeekStatsByActivity(day);
        
        // 更新UI  
        this.updateGameUI();
        
        // 根据日期随机遇到角色，而不是让玩家选择
        this.randomEncounter(day);
    }
    
    updateWeekStatsByActivity(day) {
        const dayActivities = {
            1: 'study', 2: 'social', 3: 'leisure', 4: 'social',
            5: 'study', 6: 'leisure', 7: 'encounter'
        };
        
        const activityType = dayActivities[day];
        if (this.gameState.weekStats[activityType] !== undefined) {
            this.gameState.weekStats[activityType]++;
        }
    }
    
    askForNextWeek() {
        console.log('询问是否进入下一周');
        
        // 创建确认对话框
        const modal = document.getElementById('scenario-modal');
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
        
        // 设置选择按钮
        if (choicesElement) {
            choicesElement.innerHTML = '';
            
            const nextWeekBtn = document.createElement('button');
            nextWeekBtn.className = 'choice-btn';
            nextWeekBtn.textContent = '进入下一周';
            nextWeekBtn.style.background = '#4caf50';
            nextWeekBtn.addEventListener('click', () => {
                this.closeModal('scenario-modal');
                this.nextWeek();
            });
            
            const stayBtn = document.createElement('button');
            stayBtn.className = 'choice-btn';
            stayBtn.textContent = '留在本周查看';
            stayBtn.style.background = '#ff9800';
            stayBtn.addEventListener('click', () => {
                this.closeModal('scenario-modal');
            });
            
            choicesElement.appendChild(nextWeekBtn);
            choicesElement.appendChild(stayBtn);
        }
        
        this.showModal('scenario-modal');
    }
    
    nextWeek() {
        // 检查是否有足够的进展进入下一周
        if (this.gameState.actionPoints > 0) {
            this.showGameNotification('本周还有行动点数，请先完成所有活动！', 'warning');
            return;
        }
        
        // 进入下一周
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
        
        // 更新UI
        this.updateGameUI();
        
        // 显示新周开始的提示
        this.showGameNotification(`进入第${this.gameState.currentWeek}周！`, 'success');
        
        console.log('进入新的一周:', this.gameState.currentWeek);
    }

    // 随机遇到角色系统 - 增强版
    randomEncounter(day) {
        console.log('=== randomEncounter 开始执行 ===');
        console.log('日期:', day);
        
        // 根据不同日期有不同的遇到概率和活动类型
        const dayActivities = {
            1: { type: '学习', characters: ['顾言', '江澈', '苏云深'] }, // 星期一：学习日
            2: { type: '社交', characters: ['林舟', '唐言', '萧然'] },   // 星期二：社交日
            3: { type: '休闲', characters: ['宋之南', '江澈', '苏云深'] }, // 星期三：休闲日
            4: { type: '社交', characters: ['林舟', '周奕辰', '唐言'] }, // 星期四：社交日
            5: { type: '学习', characters: ['顾言', '江澈', '萧然'] },   // 星期五：学习日
            6: { type: '休闲', characters: ['宋之南', '周奕辰', '苏云深'] }, // 星期六：休闲日
            7: { type: '偶遇', characters: ['顾言', '林舟', '宋之南', '周奕辰'] } // 星期日：偶遇日
        };

        const dayActivity = dayActivities[day];
        const activityType = dayActivity.type;
        
        console.log('活动类型:', activityType);
        console.log('可能遇到的角色:', dayActivity.characters);
        
        // 从扩展数据中获取当前活动类型的场景
        const currentScenario = this.getRandomScenario(activityType);
        
        console.log('获取到的场景:', currentScenario);
        
        if (currentScenario) {
            console.log('播放场景:', currentScenario.name || currentScenario.id);
            this.playScenario(currentScenario, activityType, dayActivity.characters);
        } else {
            console.log('没有找到场景，使用回退逻辑');
            // 回退到原有的简单逻辑
            const availableCharacters = dayActivity.characters;
            const encounterChance = Math.random();
            
            console.log('遇到概率:', encounterChance);
            
            if (encounterChance > 0.3 && availableCharacters.length > 0) {
                // 随机选择一个角色
                const randomCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
                console.log('遇到角色:', randomCharacter);
                this.interactWithCharacter(randomCharacter);
            } else {
                // 独自活动
                console.log('独自活动');
                this.soloActivity(activityType);
            }
        }
        
        console.log('=== randomEncounter 结束 ===');
    }

    // 获取随机场景
    getRandomScenario(activityType) {
        console.log('=== getRandomScenario 开始 ===');
        console.log('查找活动类型:', activityType);
        console.log('gameData.scenarios:', gameData.scenarios);
        
        const scenarios = gameData.scenarios[activityType];
        console.log('找到的场景数组:', scenarios);
        
        if (!scenarios || scenarios.length === 0) {
            console.log('没有找到场景或场景数组为空');
            return null;
        }
        
        // 过滤符合条件的场景
        const availableScenarios = scenarios.filter(scenario => {
            // 检查时间要求
            if (scenario.time) {
                const currentHour = new Date().getHours();
                if (scenario.time === '早晨' && (currentHour < 6 || currentHour > 10)) return false;
                if (scenario.time === '上午' && (currentHour < 8 || currentHour > 12)) return false;
                if (scenario.time === '下午' && (currentHour < 12 || currentHour > 18)) return false;
                if (scenario.time === '晚上' && (currentHour < 18 || currentHour > 23)) return false;
                if (scenario.time === '深夜' && (currentHour < 22 && currentHour > 6)) return false;
            }
            
            // 检查其他条件（可以根据需要扩展）
            if (scenario.requirement) {
                // 这里可以添加更复杂的条件检查
                return true; // 暂时简化
            }
            
            return true;
        });
        
        if (availableScenarios.length === 0) return null;
        
        // 根据稀有度加权选择
        const weightedScenarios = [];
        availableScenarios.forEach(scenario => {
            let weight = 1;
            switch (scenario.rarity) {
                case 'common': weight = 6; break;
                case 'uncommon': weight = 3; break;
                case 'rare': weight = 1; break;
                case 'very_rare': weight = 0.3; break;
                case 'periodic': weight = 2; break;
                default: weight = 3; break;
            }
            
            // 根据权重添加到数组中
            const times = Math.ceil(weight);
            for (let i = 0; i < times; i++) {
                weightedScenarios.push(scenario);
            }
        });
        
        return weightedScenarios[Math.floor(Math.random() * weightedScenarios.length)];
    }

    // 播放场景
    playScenario(scenario, activityType, availableCharacters) {
        // 决定是否有角色遇到
        let encounteredCharacter = null;
        
        if (scenario.randomEncounter) {
            const encounter = scenario.randomEncounter;
            if (Math.random() < encounter.probability) {
                // 从场景指定的角色或默认角色中选择
                const possibleChars = encounter.characters || availableCharacters;
                const filteredChars = possibleChars.filter(char => 
                    gameData.characters[char] && availableCharacters.includes(char)
                );
                
                if (filteredChars.length > 0) {
                    encounteredCharacter = filteredChars[Math.floor(Math.random() * filteredChars.length)];
                }
            }
        } else {
            // 标准概率遇到角色
            if (Math.random() > 0.3) {
                encounteredCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
            }
        }
        
        // 显示场景
        this.showScenarioModal(scenario, encounteredCharacter, activityType);
    }

    // 显示场景弹窗
    showScenarioModal(scenario, character, activityType) {
        const modal = document.getElementById('scenario-modal');
        if (!modal) {
            console.error('场景弹窗元素未找到');
            return;
        }

        // 设置场景内容
        const titleElement = modal.querySelector('.scenario-title');
        const descElement = modal.querySelector('.scenario-description');
        const choicesElement = modal.querySelector('.scenario-choices');

        if (titleElement) titleElement.textContent = scenario.name || `${activityType}活动`;
        if (descElement) {
            let description = scenario.description || '你进行了一次活动...';
            if (character) {
                description += `\n\n在活动中，你遇到了${character}...`;
            }
            descElement.textContent = description;
        }

        // 清空并设置选择按钮
        if (choicesElement) {
            choicesElement.innerHTML = '';
            
            if (scenario.choices && scenario.choices.length > 0) {
                scenario.choices.forEach((choice, index) => {
                    const button = document.createElement('button');
                    button.className = 'choice-btn';
                    button.textContent = choice.text;
                    button.addEventListener('click', () => {
                        this.handleScenarioChoice(choice, character, scenario);
                        this.closeModal('scenario-modal');
                    });
                    choicesElement.appendChild(button);
                });
            } else {
                // 默认选择
                const button = document.createElement('button');
                button.className = 'choice-btn';
                button.textContent = '继续';
                button.addEventListener('click', () => {
                    this.handleScenarioChoice({effect: {}, outcome: '你度过了一段时光...'}, character, scenario);
                    this.closeModal('scenario-modal');
                });
                choicesElement.appendChild(button);
            }
        }

        this.showModal('scenario-modal');
    }

    // 处理场景选择
    handleScenarioChoice(choice, character, scenario) {
        console.log('=== handleScenarioChoice 开始 ===');
        console.log('选择内容:', choice);
        console.log('角色:', character);
        console.log('场景:', scenario);
        
        // 应用效果
        if (choice.effect) {
            console.log('开始应用效果:', choice.effect);
            console.log('当前玩家状态:', this.gameState.playerStats);
            
            Object.keys(choice.effect).forEach(attr => {
                console.log(`处理属性: ${attr}, 值: ${choice.effect[attr]}`);
                
                if (this.gameState.playerStats[attr] !== undefined) {
                    const oldValue = this.gameState.playerStats[attr];
                    this.gameState.playerStats[attr] = Math.max(0, 
                        Math.min(100, this.gameState.playerStats[attr] + choice.effect[attr])
                    );
                    console.log(`${attr}: ${oldValue} -> ${this.gameState.playerStats[attr]}`);
                } else {
                    console.warn(`属性 ${attr} 在 playerStats 中不存在，将初始化为50`);
                    // 如果属性不存在，初始化为50然后应用效果
                    this.gameState.playerStats[attr] = Math.max(0, 
                        Math.min(100, 50 + choice.effect[attr])
                    );
                    console.log(`新属性 ${attr} 初始化为: ${this.gameState.playerStats[attr]}`);
                }
            });
        }

        // 如果遇到了角色，处理角色关系
        if (character && gameData.characters[character]) {
            // 基础好感度变化
            const baseAffectionChange = Math.floor(Math.random() * 3) + 1;
            this.updateCharacterRelationship(character, baseAffectionChange, 1);
            
            // 如果有特定的好感度变化
            if (choice.affectionChange && choice.affectionChange[character]) {
                this.updateCharacterRelationship(character, choice.affectionChange[character], 1);
            }
        }

        // 显示结果
        let resultText = choice.outcome || '你的选择产生了一些影响...';
        if (character) {
            resultText += `\n\n与${character}的关系有所变化。`;
        }
        
        this.showGameNotification(resultText, 'success');
        
        // 消耗行动点
        this.gameState.actionPoints = Math.max(0, this.gameState.actionPoints - 1);
        this.updateGameUI();
        
        // 检查是否触发特殊事件
        if (character) {
            this.checkSpecialEvents(character);
        }
        
        // 检查行动点数是否用完
        if (this.gameState.actionPoints <= 0) {
            setTimeout(() => {
                this.askForNextWeek();
            }, 2000); // 2秒后询问是否进入下一周
        }
        
        console.log('=== handleScenarioChoice 结束 ===');
        console.log('更新后的玩家状态:', this.gameState.playerStats);
    }

    // 独自活动
    soloActivity(activityType) {
        console.log('=== soloActivity 开始 ===');
        console.log('活动类型:', activityType);
        
        const activities = {
            '学习': {
                title: '独自学习',
                description: '你在图书馆度过了安静的学习时光，感觉收获很多。',
                benefits: '学习能力有所提升！'
            },
            '社交': {
                title: '社团活动',
                description: '你参加了社团活动，虽然没有特别深入的交流，但度过了愉快的时光。',
                benefits: '社交经验有所增加！'
            },
            '休闲': {
                title: '放松时光',
                description: '你享受了一段悠闲的个人时光，心情变得更加愉悦。',
                benefits: '心情得到了很好的调节！'
            },
            '偶遇': {
                title: '漫步校园',
                description: '你在校园里漫步，虽然没有遇到特别的人，但欣赏了美丽的风景。',
                benefits: '心境变得更加平和！'
            }
        };

        const activity = activities[activityType];
        console.log('活动内容:', activity);
        
        // 消耗行动点
        this.gameState.actionPoints--;
        
        // 显示独自活动结果
        this.showSoloActivityResult(activity);
        
        console.log('=== soloActivity 结束 ===');
    }

    showSoloActivityResult(activity) {
        console.log('=== showSoloActivityResult 开始 ===');
        
        // 设置场景弹窗的内容
        const modal = document.getElementById('scenario-modal');
        const titleElement = modal.querySelector('.scenario-title');
        const descElement = modal.querySelector('.scenario-description');
        const choicesElement = modal.querySelector('.scenario-choices');
        
        if (titleElement) titleElement.textContent = activity.title;
        
        if (descElement) {
            descElement.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 60px; margin-bottom: 20px;">🌸</div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="line-height: 1.6; color: #555; margin-bottom: 15px;">${activity.description}</p>
                        <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); padding: 15px; border-radius: 8px;">
                            <p style="color: #1976d2; font-weight: 500; margin: 0;">✨ ${activity.benefits}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // 设置选择按钮
        if (choicesElement) {
            choicesElement.innerHTML = '';
            
            const continueBtn = document.createElement('button');
            continueBtn.className = 'choice-btn';
            continueBtn.textContent = '继续';
            continueBtn.addEventListener('click', () => {
                this.continueGame();
            });
            
            choicesElement.appendChild(continueBtn);
        }
        
        this.showModal('scenario-modal');
        
        console.log('=== showSoloActivityResult 结束 ===');
    }

    loadCharacterSelection() {
        const container = document.getElementById('character-selection');
        container.innerHTML = '';
        
        Object.entries(gameData.characters).forEach(([name, character]) => {
            const characterCard = document.createElement('div');
            characterCard.className = 'character-card';
            
            const relationship = this.gameState.characterRelationships[name];
            const portraitPath = `assets/images/${character.portrait}`;
            
            characterCard.innerHTML = `
                <div class="character-portrait">
                    <img src="${portraitPath}" alt="${character.name}" onerror="this.style.display='none'">
                </div>
                <div class="character-name">${character.name}</div>
                <div class="character-title">${character.title}</div>
                <div class="character-description">${character.description}</div>
                <div style="margin-top: 10px; font-size: 12px; color: #666;">
                    💖 好感度: ${relationship.affection} | 🤝 信任度: ${relationship.trust}
                </div>
            `;
            
            characterCard.addEventListener('click', () => {
                this.interactWithCharacter(name);
            });
            
            container.appendChild(characterCard);
        });
    }

    interactWithCharacter(characterName) {
        console.log('=== interactWithCharacter 开始 ===');
        console.log('角色名称:', characterName);
        
        if (this.gameState.actionPoints <= 0) {
            this.askForNextWeek();
            return;
        }

        const relationship = this.gameState.characterRelationships[characterName];
        console.log('角色关系数据:', relationship);
        
        // 从所有场景类型中查找涉及该角色的场景
        let allScenarios = [];
        Object.values(gameData.scenarios).forEach(scenarioArray => {
            if (Array.isArray(scenarioArray)) {
                allScenarios = allScenarios.concat(scenarioArray);
            }
        });
        
        // 筛选出与当前角色相关的场景
        const characterScenarios = allScenarios.filter(s => s.npc === characterName);
        let selectedScenario = null;
        
        console.log('找到的角色场景:', characterScenarios);
        
        if (characterScenarios.length > 0) {
            selectedScenario = characterScenarios[Math.floor(Math.random() * characterScenarios.length)];
        }

        // 增加关系值
        const affectionGain = Math.floor(Math.random() * 10) + 5;
        const trustGain = Math.floor(Math.random() * 5) + 2;
        
        relationship.affection += affectionGain;
        relationship.trust += trustGain;

        // 消耗行动点数
        this.gameState.actionPoints--;
        console.log('消耗1点行动点，当前行动点数:', this.gameState.actionPoints);

        console.log('显示互动结果...');
        // 显示互动结果
        this.showInteractionResult(characterName, selectedScenario, affectionGain, trustGain);

        // 更新游戏UI
        this.updateGameUI();

        // 检查特殊事件
        this.checkSpecialEvents(characterName);
        
        console.log('=== interactWithCharacter 结束 ===');
    }

    showInteractionResult(characterName, scenario, affectionGain, trustGain) {
        console.log('=== showInteractionResult 开始 ===');
        
        const character = gameData.characters[characterName];
        const portraitPath = `assets/images/${character.portrait}`;
        
        // 设置场景弹窗的内容
        const modal = document.getElementById('scenario-modal');
        const titleElement = modal.querySelector('.scenario-title');
        const descElement = modal.querySelector('.scenario-description');
        const choicesElement = modal.querySelector('.scenario-choices');
        
        if (titleElement) titleElement.textContent = `与 ${characterName} 的互动`;
        
        if (descElement) {
            let content = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <div class="character-portrait" style="margin: 0 auto 15px; width: 80px; height: 80px;">
                        <img src="${portraitPath}" alt="${characterName}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" onerror="this.style.display='none'">
                    </div>
                </div>
            `;
            
            if (scenario) {
                content += `
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="color: #333; margin-bottom: 10px;">${scenario.scene || '互动场景'}</h4>
                        <p style="line-height: 1.6; color: #555;">${scenario.dialogue || '你们进行了一次愉快的交流'}</p>
                    </div>
                `;
            } else {
                content += `
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="line-height: 1.6; color: #555;">你与${characterName}度过了愉快的时光，你们的关系变得更加亲密了。</p>
                    </div>
                `;
            }
            
            content += `
                <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8e8 100%); padding: 15px; border-radius: 10px;">
                    <h4 style="color: #2e7d32; margin-bottom: 10px;">💖 关系变化</h4>
                    <p style="color: #4caf50; margin: 5px 0;">好感度 +${affectionGain}</p>
                    <p style="color: #4caf50; margin: 5px 0;">信任度 +${trustGain}</p>
                    <p style="color: #666; font-size: 14px; margin-top: 10px;">
                        当前好感度: ${this.gameState.characterRelationships[characterName].affection} | 
                        信任度: ${this.gameState.characterRelationships[characterName].trust}
                    </p>
                </div>
            `;
            
            descElement.innerHTML = content;
        }
        
        // 设置选择按钮
        if (choicesElement) {
            choicesElement.innerHTML = '';
            
            const continueBtn = document.createElement('button');
            continueBtn.className = 'choice-btn';
            continueBtn.textContent = '继续游戏';
            continueBtn.addEventListener('click', () => {
                this.continueGame();
            });
            
            choicesElement.appendChild(continueBtn);
        }
        
        this.showModal('scenario-modal');
        
        console.log('=== showInteractionResult 结束 ===');
    }

    continueGame() {
        this.closeModal('scenario-modal');
        
        // 检查是否还有行动点
        if (this.gameState.actionPoints > 0) {
            // 直接回到游戏界面让玩家选择下一个活动
            this.showGameScreen();
            this.updateGameUI();
        } else {
            this.endWeek();
        }
    }

    returnToTimeline() {
        this.closeModal('scenario-modal');
        this.showGameScreen();
        this.updateGameUI();
    }

    checkSpecialEvents(characterName) {
        const relationship = this.gameState.characterRelationships[characterName];
        
        // 检查好感度里程碑
        if (relationship.affection >= 50 && !relationship.events.includes('first_date')) {
            relationship.events.push('first_date');
            this.unlockAchievement('first_love');
            setTimeout(() => {
                this.showSpecialEvent(`💕 与${characterName}的第一次约会`, 
                    `你和${characterName}度过了美好的第一次约会时光，彼此的心距离更近了...`);
            }, 1000);
        }
        
        if (relationship.affection >= 100 && !relationship.events.includes('confession')) {
            relationship.events.push('confession');
            setTimeout(() => {
                this.showSpecialEvent(`💖 ${characterName}的告白`, 
                    `${characterName}鼓起勇气向你表达了内心深处的情感，你们的关系发生了质的飞跃...`);
            }, 1000);
        }
    }

    showSpecialEvent(title, description) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.style.cssText = `
            z-index: 3500;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        modal.innerHTML = `
            <div class="modal-content" style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; width: 90%;">
                <span class="modal-close" onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; right: 15px; font-size: 24px; cursor: pointer; color: #999;">&times;</span>
                <div style="text-align: center;">
                    <h3 style="color: #ff6b9d; margin-bottom: 20px;">${title}</h3>
                    <p style="line-height: 1.8; color: #555; margin-bottom: 20px;">${description}</p>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 500;">
                        继续
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    endWeek() {
        this.gameState.currentWeek++;
        this.gameState.actionPoints = this.gameState.maxActionPoints;
        this.selectedDay = null;
        
        // 检查是否达到游戏结束条件
        if (this.gameState.currentWeek > 12) {
            this.endGame();
            return;
        }
        
        this.showWeekSummary();
    }

    showWeekSummary() {
        // 先关闭所有其他弹窗
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        
        // 清理所有动态创建的弹窗
        document.querySelectorAll('.modal:not([id])').forEach(modal => {
            modal.remove();
        });
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.style.cssText = `
            z-index: 3000;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        modal.innerHTML = `
            <div class="modal-content" style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; width: 90%;">
                <div style="text-align: center;">
                    <h3 style="color: #ff6b9d;">📅 第${this.gameState.currentWeek - 1}周总结</h3>
                    <p style="margin: 20px 0; line-height: 1.6;">
                        一周的校园生活结束了！<br>
                        你与心仪的人们度过了美好的时光。
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <button onclick="game.startNextWeek(); this.parentElement.parentElement.parentElement.remove();" 
                                style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 500;">
                            开始第${this.gameState.currentWeek}周
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // 开始下一周
    startNextWeek() {
        // 进入下一周，重置行动点数
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
        
        this.showGameNotification(`进入第${this.gameState.currentWeek}周！`, 'success');
        
        // 更新游戏界面
        this.updateGameUI();
        // 显示游戏界面
        this.showGameScreen();
    }

    endGame() {
        // 计算最终结局
        const ending = this.calculateEnding();
        this.gameState.currentEnding = ending;
        
        if (!this.gameState.unlockedEndings.includes(ending.id)) {
            this.gameState.unlockedEndings.push(ending.id);
            this.unlockAchievement('first_ending');
        }
        
        this.showEnding(ending);
    }

    calculateEnding() {
        const relationships = this.gameState.characterRelationships;
        let maxAffection = 0;
        let favoriteCharacter = null;
        
        Object.entries(relationships).forEach(([name, relationship]) => {
            if (relationship.affection > maxAffection) {
                maxAffection = relationship.affection;
                favoriteCharacter = name;
            }
        });
        
        // 根据最高好感度角色返回对应结局
        if (favoriteCharacter && maxAffection >= 100) {
            return gameData.endings.find(e => e.character === favoriteCharacter) || gameData.endings[0];
        }
        
        return gameData.endings[0]; // 默认结局
    }

    showEnding(ending) {
        // 不再需要关闭时间线弹窗，因为我们使用全屏界面
        
        const content = document.getElementById('ending-content');
        const character = ending.character ? gameData.characters[ending.character] : null;
        const portraitPath = character ? `assets/images/${character.portrait}` : '';
        
        content.innerHTML = `
            <div style="text-align: center;">
                <h2 style="color: #ff6b9d; margin-bottom: 20px;">🎉 ${ending.title} 🎉</h2>
                ${character ? `
                    <div class="character-portrait" style="margin: 0 auto 20px; width: 120px; height: 120px;">
                        <img src="${portraitPath}" alt="${character.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                    </div>
                ` : ''}
                <p style="line-height: 2; text-align: center; margin: 20px 0; font-size: 16px;">${ending.description}</p>
                <div style="margin-top: 30px;">
                    <button onclick="game.resetGame(); game.closeModal('ending-modal')" style="margin-right: 10px;">重新开始</button>
                    <button onclick="game.closeModal('ending-modal')">返回主菜单</button>
                </div>
            </div>
        `;
        
        this.showModal('ending-modal');
    }

    updateGameUI() {
        // 更新桌面端UI
        const currentWeekEl = document.getElementById('current-week');
        const currentActionsEl = document.getElementById('current-actions');
        const playerInfoEl = document.getElementById('player-info');
        
        if (currentWeekEl) currentWeekEl.textContent = `第${this.gameState.currentWeek}周`;
        if (currentActionsEl) currentActionsEl.textContent = `${this.gameState.actionPoints}/${this.gameState.maxActionPoints}`;
        if (playerInfoEl) playerInfoEl.textContent = 
            `${this.gameState.player.name} (${this.getGradeName()} | ${this.gameState.player.major} | ${this.gameState.player.personality})`;
        
        // 更新手机端UI
        const mobileWeekEl = document.getElementById('mobile-current-week');
        const mobileActionsEl = document.getElementById('mobile-current-actions');
        
        if (mobileWeekEl) mobileWeekEl.textContent = this.gameState.currentWeek;
        if (mobileActionsEl) mobileActionsEl.textContent = this.gameState.actionPoints;
        
        // 更新日历显示
        document.querySelectorAll('.day-slot').forEach(slot => {
            if (this.gameState.actionPoints <= 0) {
                slot.classList.add('disabled');
            } else {
                slot.classList.remove('disabled');
            }
        });
        
        // 更新周统计信息
        this.updateWeekStats();
        
        // 更新好感度显示
        this.updateAffectionStats();
        
        // 检查是否显示下一周按钮
        this.checkNextWeekButton();
    }
    
    updateWeekStats() {
        // 更新桌面端统计
        const studyCount = document.getElementById('study-count');
        const socialCount = document.getElementById('social-count');
        const leisureCount = document.getElementById('leisure-count');
        const encounterCount = document.getElementById('encounter-count');
        
        // 更新手机端统计
        const mobileStudyCount = document.getElementById('mobile-study-count');
        const mobileSocialCount = document.getElementById('mobile-social-count');
        const mobileLeisureCount = document.getElementById('mobile-leisure-count');
        
        const study = this.gameState.weekStats?.study || 0;
        const social = this.gameState.weekStats?.social || 0;
        const leisure = this.gameState.weekStats?.leisure || 0;
        const encounter = this.gameState.weekStats?.encounter || 0;
        
        // 桌面端更新
        if (studyCount) studyCount.textContent = study;
        if (socialCount) socialCount.textContent = social;
        if (leisureCount) leisureCount.textContent = leisure;
        if (encounterCount) encounterCount.textContent = encounter;
        
        // 手机端更新
        if (mobileStudyCount) mobileStudyCount.textContent = study;
        if (mobileSocialCount) mobileSocialCount.textContent = social;
        if (mobileLeisureCount) mobileLeisureCount.textContent = leisure;
    }
    
    updateAffectionStats() {
        const affectionContainer = document.getElementById('affection-stats');
        const mobileTopCharacter = document.getElementById('mobile-top-character');
        
        // 桌面端更新
        if (affectionContainer) {
            let html = '';
            Object.keys(this.gameState.characterRelationships).forEach(character => {
                const affection = this.gameState.characterRelationships[character].affection;
                if (affection > 0) {
                    html += `<div>${character}: ${affection}点</div>`;
                }
            });
            
            if (html === '') {
                html = '<div style="color: #6c757d;">暂无互动记录</div>';
            }
            
            affectionContainer.innerHTML = html;
        }
        
        // 手机端更新 - 显示好感度最高的角色
        if (mobileTopCharacter) {
            let topCharacter = null;
            let maxAffection = 0;
            
            Object.keys(this.gameState.characterRelationships).forEach(character => {
                const affection = this.gameState.characterRelationships[character].affection;
                if (affection > maxAffection) {
                    maxAffection = affection;
                    topCharacter = character;
                }
            });
            
            if (topCharacter && maxAffection > 0) {
                mobileTopCharacter.innerHTML = `
                    <span>💕</span>
                    <span>${topCharacter}${maxAffection}</span>
                `;
            } else {
                mobileTopCharacter.innerHTML = `
                    <span>💕</span>
                    <span>好感度</span>
                `;
            }
        }
    }
    
    checkNextWeekButton() {
        const nextWeekBtn = document.getElementById('next-week-btn');
        if (nextWeekBtn) {
            if (this.gameState.actionPoints <= 0) {
                nextWeekBtn.style.display = 'inline-block';
            } else {
                nextWeekBtn.style.display = 'none';
            }
        }
    }

    unlockAchievement(achievementId) {
        if (!this.gameState.achievements.includes(achievementId)) {
            this.gameState.achievements.push(achievementId);
            const achievement = gameData.achievements[achievementId];
            if (achievement) {
                this.showAchievementNotification(achievement);
            }
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 15px;
            z-index: 2500;
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
        `;
        
        // 添加CSS动画
        if (!document.querySelector('#achievement-styles')) {
            const style = document.createElement('style');
            style.id = 'achievement-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="font-size: 24px; margin-right: 10px;">🏆</span>
                <div>
                    <strong style="display: block;">成就解锁！</strong>
                    <span style="font-size: 14px;">${achievement.name}</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
    }

    loadAchievements() {
        const container = document.getElementById('achievements-list');
        container.innerHTML = '';
        
        Object.values(gameData.achievements).forEach(achievement => {
            const isUnlocked = this.gameState.achievements.includes(achievement.id);
            const achievementCard = document.createElement('div');
            achievementCard.style.cssText = `
                background: ${isUnlocked ? 'linear-gradient(135deg, #e8f5e8 0%, #f0f8e8 100%)' : '#f5f5f5'};
                border: 2px solid ${isUnlocked ? '#4caf50' : '#ddd'};
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 10px;
                opacity: ${isUnlocked ? '1' : '0.6'};
                transition: all 0.3s ease;
            `;
            
            achievementCard.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <span style="font-size: 24px; margin-right: 15px;">${isUnlocked ? '🏆' : '🔒'}</span>
                    <div>
                        <h4 style="margin: 0 0 5px 0; color: ${isUnlocked ? '#2e7d32' : '#666'};">${achievement.name}</h4>
                        <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.4;">${achievement.description}</p>
                    </div>
                </div>
            `;
            
            container.appendChild(achievementCard);
        });
        
        if (this.gameState.achievements.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">还没有解锁任何成就，快去游戏中努力吧！</p>';
        }
    }

    loadGallery() {
        const container = document.getElementById('gallery-content');
        container.innerHTML = '';
        
        if (this.gameState.unlockedEndings.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">还没有解锁任何结局，快去游戏中体验吧！</p>';
            return;
        }
        
        this.gameState.unlockedEndings.forEach(endingId => {
            const ending = gameData.endings.find(e => e.id === endingId);
            if (ending) {
                const endingCard = document.createElement('div');
                endingCard.style.cssText = `
                    background: linear-gradient(135deg, #ffeef8 0%, #f0e6ff 100%);
                    border: 2px solid #ff6b9d;
                    border-radius: 15px;
                    padding: 20px;
                    margin-bottom: 15px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                `;
                
                endingCard.innerHTML = `
                    <h4 style="color: #ff6b9d; margin-bottom: 10px;">🎭 ${ending.title}</h4>
                    <p style="line-height: 1.6; color: #555; margin-bottom: 10px;">${ending.description}</p>
                    ${ending.character ? `<small style="color: #888;">💕 角色：${ending.character}</small>` : ''}
                `;
                
                container.appendChild(endingCard);
            }
        });
    }

    loadSaveSlots() {
        const container = document.getElementById('save-slots');
        container.innerHTML = '';
        
        const saveData = localStorage.getItem('loveDiarySave');
        if (saveData) {
            try {
                const data = JSON.parse(saveData);
                const saveSlot = document.createElement('div');
                saveSlot.style.cssText = `
                    background: linear-gradient(135deg, #ffeef8 0%, #f0e6ff 100%);
                    border: 2px solid #ff6b9d;
                    border-radius: 15px;
                    padding: 20px;
                    margin-bottom: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;
                
                saveSlot.innerHTML = `
                    <h4 style="color: #ff6b9d; margin-bottom: 10px;">💾 存档槽位 1</h4>
                    <p style="margin: 5px 0;"><strong>进度：</strong>第${data.gameState.currentWeek}周</p>
                    <p style="margin: 5px 0;"><strong>角色：</strong>${data.gameState.player.name || '未命名'}</p>
                    <p style="margin: 5px 0;"><strong>专业：</strong>${data.gameState.player.major || '未设置'}</p>
                    <small style="color: #666;">${new Date(data.timestamp).toLocaleString()}</small>
                `;
                
                saveSlot.addEventListener('click', () => {
                    if (this.loadGame()) {
                        this.closeModal('load-game-modal');
                        this.showGameScreen();
                    }
                });
                
                saveSlot.addEventListener('mouseenter', () => {
                    saveSlot.style.transform = 'translateY(-2px)';
                    saveSlot.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                });
                
                saveSlot.addEventListener('mouseleave', () => {
                    saveSlot.style.transform = 'translateY(0)';
                    saveSlot.style.boxShadow = 'none';
                });
                
                container.appendChild(saveSlot);
            } catch (error) {
                container.innerHTML = '<p style="color: #f44336; text-align: center; padding: 20px;">存档数据损坏，无法读取</p>';
            }
        } else {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">没有找到任何存档文件</p>';
        }
    }

    saveGame() {
        try {
            const saveData = {
                gameState: this.gameState,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('loveDiarySave', JSON.stringify(saveData));
            
            // 显示保存成功提示
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
                color: white;
                padding: 15px 20px;
                border-radius: 15px;
                z-index: 2500;
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            `;
            notification.innerHTML = '💾 游戏保存成功！';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 2000);
            
        } catch (error) {
            this.showGameNotification('保存失败：' + error.message, 'error');
        }
    }

    loadGame() {
        try {
            const saveData = localStorage.getItem('loveDiarySave');
            if (saveData) {
                const data = JSON.parse(saveData);
                this.gameState = data.gameState;
                this.updateGameUI();
                return true;
            } else {
                this.showGameNotification('没有找到存档！', 'warning');
                return false;
            }
        } catch (error) {
            this.showGameNotification('加载失败：' + error.message, 'error');
            return false;
        }
    }

    resetGame() {
        this.gameState = {
            player: { name: '', major: '', personality: '' },
            currentWeek: 1,
            currentDay: 1,
            actionPoints: 2,
            maxActionPoints: 2,
            characterRelationships: {},
            achievements: [],
            unlockedEndings: [],
            currentEnding: null
        };
        this.initializeCharacterRelationships();
        this.selectedDay = null;
        this.updateGameUI();
    }
}

// 全局函数
function showCharacterCreation() {
    game.showModal('character-creation-modal');
}

function showLoadGame() {
    game.showModal('load-game-modal');
}

function showAchievements() {
    game.showModal('achievements-modal');
}

function showGallery() {
    game.showModal('gallery-modal');
}

function showSettings() {
    game.showModal('settings-modal');
}

function showGameSettings() {
    game.showModal('settings-modal');
}

function closeModal(modalId) {
    game.closeModal(modalId);
}

function startGameFromCreation() {
    const name = document.getElementById('player-name').value.trim();
    const major = document.getElementById('player-major').value;
    const personality = document.querySelector('input[name="personality"]:checked');

    if (!name) {
        game.showGameNotification('请输入角色名字！', 'warning');
        return;
    }
    
    if (!personality) {
        game.showGameNotification('请选择性格！', 'warning');
        return;
    }

    const playerData = {
        name: name,
        major: major,
        personality: personality.value
    };

    game.startGame(playerData);
}

function selectDay(day) {
    if (!game) {
        console.error('游戏未初始化，请刷新页面重试');
        alert('游戏未初始化，请刷新页面重试');
        return;
    }
    
    console.log('选择日期:', day);
    game.selectDay(day);
}

function closeGameAndReturnToMenu() {
    if (game) {
        game.returnToMenu();
    }
}

function returnToMenu() {
    if (game) {
        game.returnToMenu();
    }
}

function nextWeek() {
    if (game) {
        game.nextWeek();
    }
}

function saveGame() {
    game.saveGame();
}

function resetGameData() {
    game.showGameConfirm(
        '确定要重置所有游戏数据吗？此操作不可恢复！',
        function() {
            localStorage.removeItem('loveDiarySave');
            game.resetGame();
            game.showGameNotification('游戏数据已重置！', 'success');
            game.closeModal('settings-modal');
        }
    );
}

// 初始化游戏
let game;
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始初始化游戏...');
    try {
        game = new LoveDiaryGame();
        console.log('游戏初始化完成！');
        
        // 确保游戏对象全局可用
        window.game = game;
    } catch (error) {
        console.error('游戏初始化失败:', error);
        alert('游戏初始化失败，请刷新页面重试');
    }
});

// 备用初始化（确保兼容性）
window.addEventListener('load', function() {
    if (!game) {
        console.log('备用初始化启动...');
        try {
            game = new LoveDiaryGame();
            window.game = game;
            console.log('备用初始化完成！');
        } catch (error) {
            console.error('备用初始化失败:', error);
        }
    }
});
