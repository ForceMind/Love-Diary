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
                padding: 18px 30px !important;
                border-radius: 30px !important;
                border: 3px solid #ff8fab !important;
                font-size: 18px !important;
                font-weight: 700 !important;
                cursor: pointer !important;
                width: 100% !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                margin: 20px 0 10px 0 !important;
                text-align: center !important;
                box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4) !important;
                position: relative !important;
                z-index: 100 !important;
                overflow: visible !important;
                min-height: 50px !important;
                line-height: 1.2 !important;
            `;
            startBtn.addEventListener('click', () => {
                console.log('开始游戏按钮被点击');
                this.closeModal('scenario-modal');
                // 开始第一个故事线 - 校园偶遇
                this.startFirstMeetingStory();
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
    
    // 第一个故事线 - 在校园中偶遇第一个男生
    startFirstMeetingStory() {
        // 随机选择第一个偶遇的男生
        const firstMaleCharacters = ['林舟', '周奕辰', '江澈'];
        const firstCharacter = firstMaleCharacters[Math.floor(Math.random() * firstMaleCharacters.length)];
        
        this.gameState.firstMet = firstCharacter;
        
        // 开始对话剧情
        this.showCharacterStoryline(firstCharacter, 'first_meeting', 1);
    }
    
    // 显示角色故事线（多轮对话）
    showCharacterStoryline(characterName, storyType, round) {
        const character = gameData.characters[characterName];
        const modal = document.getElementById('scenario-modal');
        const titleElement = modal.querySelector('.scenario-title');
        const descElement = modal.querySelector('.scenario-description');
        const choicesElement = modal.querySelector('.scenario-choices');
        
        // 设置标题
        if (titleElement) titleElement.textContent = `偶遇${characterName}`;
        
        // 获取故事内容
        const storyContent = this.getStoryContent(characterName, storyType, round);
        
        // 设置描述（包含头像）
        if (descElement) {
            const portraitPath = `assets/images/${character.portrait}`;
            descElement.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px;">
                    <div class="character-portrait" style="width: 80px; height: 80px; flex-shrink: 0;">
                        <img src="${portraitPath}" alt="${characterName}" 
                             style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid #ff8fab;" 
                             onerror="this.style.display='none'">
                    </div>
                    <div style="flex: 1;">
                        <h4 style="color: #ff6b9d; margin: 0 0 10px 0; font-size: 18px;">${characterName}</h4>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; border-left: 4px solid #ff8fab;">
                            <p style="margin: 0; line-height: 1.6; color: #555;">${storyContent.description}</p>
                        </div>
                        ${storyContent.dialogue ? `
                        <div style="background: rgba(255, 183, 197, 0.1); padding: 12px; border-radius: 8px; margin-top: 10px; border-left: 3px solid #ffb7c5;">
                            <p style="margin: 0; font-style: italic; color: #666;">"${storyContent.dialogue}"</p>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }
        
        // 设置选择按钮
        if (choicesElement) {
            choicesElement.innerHTML = '';
            
            storyContent.choices.forEach((choice, index) => {
                const button = document.createElement('button');
                button.className = 'choice-btn';
                button.textContent = choice.text;
                button.addEventListener('click', () => {
                    this.handleStoryChoice(characterName, storyType, round, choice);
                });
                choicesElement.appendChild(button);
            });
        }

        this.showModal('scenario-modal');
    }
    
    // 获取故事内容
    getStoryContent(characterName, storyType, round) {
        const stories = {
            林舟: {
                first_meeting: {
                    1: {
                        description: "你正在篮球场边的小径上走着，突然一个篮球朝你滚过来。你弯腰捡起球，抬头就看到一个阳光男孩跑了过来。",
                        dialogue: "不好意思不好意思！球跑到你那边了。咦？你是新生吧？我叫林舟，体育系的。谢谢你帮我捡球！",
                        choices: [
                            { text: "没关系，我叫" + this.gameState.player.name, effect: { affection: 1 }, next: 2 },
                            { text: "你怎么知道我是新生？", effect: { affection: 1 }, next: 2 },
                            { text: "小心一点，别砸到人", effect: { affection: 0 }, next: 2 }
                        ]
                    },
                    2: {
                        description: "林舟接过篮球，脸上带着歉意的笑容，你能感受到他身上散发的运动员特有的阳光气息。",
                        dialogue: "哈哈，因为你看起来还有点紧张，像刚入学的样子。别担心，大学生活会很有趣的！你是什么专业的？",
                        choices: [
                            { text: "我是" + this.gameState.player.major + "专业的", effect: { affection: 1 }, next: 3 },
                            { text: "我确实还在熟悉环境", effect: { trust: 1 }, next: 3 },
                            { text: "你很了解新生呢", effect: { affection: 1 }, next: 3 }
                        ]
                    },
                    3: {
                        description: "林舟把篮球抱在怀里，真诚地看着你。",
                        dialogue: "太好了！如果有什么不懂的尽管问我，我已经在这里待了一年了。对了，如果你有兴趣的话，欢迎来看我们的篮球比赛！",
                        choices: [
                            { text: "谢谢你，林舟", effect: { affection: 2, trust: 1 }, next: 'end' },
                            { text: "我会考虑去看比赛的", effect: { affection: 2 }, next: 'end' },
                            { text: "有时间的话", effect: { affection: 1, trust: 1 }, next: 'end' }
                        ]
                    }
                }
            },
            周奕辰: {
                first_meeting: {
                    1: {
                        description: "你走过图书馆旁的小花园，发现一个看起来比你还小的男孩正拿着相机对着花朵拍照，听到脚步声后转过身来。",
                        dialogue: "啊！不好意思，我挡到你的路了吗？我叫周奕辰，大家都叫我小辰。你是新同学吧？看起来好有气质啊！",
                        choices: [
                            { text: "你好小辰，我叫" + this.gameState.player.name, effect: { affection: 1 }, next: 2 },
                            { text: "你在拍什么呢？", effect: { affection: 1, trust: 1 }, next: 2 },
                            { text: "没关系，你继续拍", effect: { affection: 0 }, next: 2 }
                        ]
                    },
                    2: {
                        description: "周奕辰兴奋地举起相机，眼睛亮晶晶的。",
                        dialogue: "我在拍这些秋海棠！你看，这个角度的光线特别美。我想把校园里的每个美丽角落都记录下来。你要不要也来看看？",
                        choices: [
                            { text: "好啊，让我看看", effect: { affection: 2 }, next: 3 },
                            { text: "你很喜欢摄影呢", effect: { affection: 1 }, next: 3 },
                            { text: "我不太懂摄影", effect: { affection: 0 }, next: 3 }
                        ]
                    },
                    3: {
                        description: "小辰开心地向你展示相机里的照片，他的热情很有感染力。",
                        dialogue: "你看！这张是梧桐大道，这张是图书馆，还有这张湖景...我觉得大学生活一定会很精彩！以后在校园里遇到可以一起探索吗？",
                        choices: [
                            { text: "当然！我也很期待", effect: { affection: 2, trust: 1 }, next: 'end' },
                            { text: "你的照片拍得真好", effect: { affection: 2 }, next: 'end' },
                            { text: "有机会的话", effect: { affection: 1 }, next: 'end' }
                        ]
                    }
                }
            },
            江澈: {
                first_meeting: {
                    1: {
                        description: "你在图书馆里寻找座位，发现角落里有个文艺气质的男生正在安静地写着什么，你走过去时他抬起头。",
                        dialogue: "你好，请问这里有人坐吗？我是江澈。抱歉，看起来你在找座位，这里挺安静的，适合学习。",
                        choices: [
                            { text: "没有人，我是" + this.gameState.player.name, effect: { affection: 1 }, next: 2 },
                            { text: "你在写什么？", effect: { affection: 1, trust: 1 }, next: 2 },
                            { text: "谢谢，这里确实很安静", effect: { affection: 1 }, next: 2 }
                        ]
                    },
                    2: {
                        description: "江澈放下笔，温和地看着你，眼神中带着文艺青年特有的深邃。",
                        dialogue: "刚才在写一首诗，关于初秋的校园。你知道吗？图书馆这个角落光线特别好，很有诗意。你也是来学习的吗？",
                        choices: [
                            { text: "听起来很浪漫", effect: { affection: 2 }, next: 3 },
                            { text: "你是文学专业的？", effect: { affection: 1, trust: 1 }, next: 3 },
                            { text: "我是来借书的", effect: { affection: 0 }, next: 3 }
                        ]
                    },
                    3: {
                        description: "江澈微微一笑，那种温和的气质让人印象深刻。",
                        dialogue: "文学是我的专业，也是我的爱好。如果你有兴趣，以后可以一起在这里学习，或者聊聊书和诗。希望能在这个安静的角落再次遇见你。",
                        choices: [
                            { text: "我很乐意和你交流", effect: { affection: 2, trust: 1 }, next: 'end' },
                            { text: "希望能成为朋友", effect: { affection: 2 }, next: 'end' },
                            { text: "以后多多指教", effect: { affection: 1, trust: 1 }, next: 'end' }
                        ]
                    }
                }
            }
        };

        return stories[characterName]?.[storyType]?.[round] || {
            description: "故事内容加载中...",
            dialogue: "",
            choices: [{ text: "继续", effect: {}, next: 'end' }]
        };
    }
    
    // 处理故事选择
    handleStoryChoice(characterName, storyType, round, choice) {
        // 应用效果
        if (choice.effect) {
            Object.keys(choice.effect).forEach(attr => {
                if (attr === 'affection' || attr === 'trust') {
                    // 更新角色关系
                    if (!this.gameState.characterRelationships[characterName]) {
                        this.gameState.characterRelationships[characterName] = { affection: 0, trust: 0, events: [] };
                    }
                    this.gameState.characterRelationships[characterName][attr] += choice.effect[attr];
                }
            });
        }
        
        // 检查是否继续对话
        if (choice.next === 'end') {
            // 结束对话，显示结果
            this.showStoryResult(characterName, storyType);
        } else {
            // 继续下一轮对话
            this.showCharacterStoryline(characterName, storyType, choice.next);
        }
    }
    
    // 显示故事结果
    showStoryResult(characterName, storyType) {
        const modal = document.getElementById('scenario-modal');
        const titleElement = modal.querySelector('.scenario-title');
        const descElement = modal.querySelector('.scenario-description');
        const choicesElement = modal.querySelector('.scenario-choices');
        
        if (titleElement) titleElement.textContent = '校园偶遇完成';
        
        if (descElement) {
            const relationship = this.gameState.characterRelationships[characterName];
            descElement.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 40px; margin-bottom: 15px;">✨</div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                        <h4 style="color: #ff6b9d; margin-bottom: 15px;">与${characterName}的偶遇</h4>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 15px;">
                            通过这次偶然的相遇，你对${characterName}有了初步的了解。他给你留下了很好的印象。
                        </p>
                        <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8e8 100%); padding: 15px; border-radius: 10px;">
                            <h4 style="color: #2e7d32; margin-bottom: 10px;">💖 关系变化</h4>
                            <p style="color: #4caf50; margin: 5px 0;">好感度: ${relationship.affection}</p>
                            <p style="color: #4caf50; margin: 5px 0;">信任度: ${relationship.trust}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        if (choicesElement) {
            choicesElement.innerHTML = '';
            
            const continueBtn = document.createElement('button');
            continueBtn.className = 'choice-btn';
            continueBtn.textContent = '开始大学生活';
            continueBtn.addEventListener('click', () => {
                this.closeModal('scenario-modal');
                this.showGameScreen();
                this.updateGameUI();
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

    // 初始化角色认识状态
    initializeCharacterMeetStatus() {
        // 8个男生的认识状态
        this.gameState.characterMeetStatus = {
            '顾言': { met: false, meetWeek: 0, intimacyLevel: 0 },
            '林舟': { met: false, meetWeek: 0, intimacyLevel: 0 },
            '宋之南': { met: false, meetWeek: 0, intimacyLevel: 0 },
            '周奕辰': { met: false, meetWeek: 0, intimacyLevel: 0 },
            '江澈': { met: false, meetWeek: 0, intimacyLevel: 0 },
            '苏云深': { met: false, meetWeek: 0, intimacyLevel: 0 },
            '唐言': { met: false, meetWeek: 0, intimacyLevel: 0 },
            '萧然': { met: false, meetWeek: 0, intimacyLevel: 0 }
        };
        
        // 已完成的故事线记录
        this.gameState.completedStorylines = [];
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
        
        // 初始化角色认识状态（如果还没有）
        if (!this.gameState.characterMeetStatus) {
            this.initializeCharacterMeetStatus();
        }
        
        // 显示行动选择菜单
        this.showActivityMenu(day);
    }
    
    // 显示行动选择菜单
    showActivityMenu(day) {
        const modal = document.getElementById('scenario-modal');
        const titleElement = modal.querySelector('.scenario-title');
        const descElement = modal.querySelector('.scenario-description');
        const choicesElement = modal.querySelector('.scenario-choices');
        
        const dayNames = { 1: '星期一', 2: '星期二', 3: '星期三', 4: '星期四', 5: '星期五', 6: '星期六', 7: '星期日' };
        
        if (titleElement) titleElement.textContent = `${dayNames[day]} - 选择你的行动`;
        
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
            
            // 根据当前周数和已认识的角色，提供不同的行动选项
            const availableActivities = this.getAvailableActivities(day);
            
            availableActivities.forEach(activity => {
                const button = document.createElement('button');
                button.className = 'choice-btn';
                button.innerHTML = `
                    <div style="text-align: left;">
                        <div style="font-weight: bold; margin-bottom: 5px;">${activity.icon} ${activity.title}</div>
                        <div style="font-size: 12px; color: #666; line-height: 1.4;">${activity.description}</div>
                    </div>
                `;
                button.addEventListener('click', () => {
                    this.closeModal('scenario-modal');
                    this.startStoryline(activity.id, day);
                });
                choicesElement.appendChild(button);
            });
        }
        
        this.showModal('scenario-modal');
    }
    
    // 获取可用的行动选项
    getAvailableActivities(day) {
        const activities = [
            {
                id: 'library_study',
                title: '图书馆学习',
                icon: '📚',
                description: '在安静的图书馆中专心学习，可能遇到同样爱学习的同学',
                availableCharacters: ['顾言', '江澈', '苏云深']
            },
            {
                id: 'sports_activities',
                title: '体育活动',
                icon: '🏃‍♀️',
                description: '参加体育运动，强身健体，可能遇到运动型的男生',
                availableCharacters: ['林舟', '宋之南', '萧然']
            },
            {
                id: 'art_club',
                title: '社团活动',
                icon: '🎨',
                description: '参加各种社团活动，培养兴趣爱好和社交能力',
                availableCharacters: ['周奕辰', '唐言', '江澈']
            },
            {
                id: 'campus_walk',
                title: '校园漫步',
                icon: '🌸',
                description: '在美丽的校园中散步，享受悠闲时光，可能有意外收获',
                availableCharacters: ['宋之南', '苏云深', '萧然']
            },
            {
                id: 'cafeteria_meal',
                title: '食堂用餐',
                icon: '🍽️',
                description: '在热闹的食堂享用美食，是社交的好地方',
                availableCharacters: ['林舟', '周奕辰', '唐言']
            }
        ];
        
        // 根据当前进度过滤可用行动
        return activities.filter(activity => {
            // 检查是否还有未认识的角色
            const hasUnmetCharacters = activity.availableCharacters.some(char => 
                !this.gameState.characterMeetStatus[char].met
            );
            
            // 检查是否有可以发展的关系
            const hasRelationshipToGrow = activity.availableCharacters.some(char => 
                this.gameState.characterMeetStatus[char].met && 
                this.gameState.characterMeetStatus[char].intimacyLevel < 5
            );
            
            return hasUnmetCharacters || hasRelationshipToGrow;
        });
    }
    
    // 开始故事线
    startStoryline(activityId, day) {
        console.log('开始故事线:', activityId);
        
        // 根据活动类型选择角色
        const activity = this.getAvailableActivities(day).find(a => a.id === activityId);
        if (!activity) return;
        
        // 选择一个角色进行故事
        const targetCharacter = this.selectCharacterForStory(activity.availableCharacters);
        
        if (targetCharacter) {
            // 根据是否认识决定故事类型
            const isMet = this.gameState.characterMeetStatus[targetCharacter].met;
            const storyType = isMet ? 'interaction' : 'first_meeting';
            
            this.showMultiRoundStory(targetCharacter, activityId, storyType, 1);
        } else {
            // 如果没有合适的角色，进行独自活动
            this.showSoloActivity(activityId);
        }
    }
    
    // 选择故事角色
    selectCharacterForStory(availableCharacters) {
        // 优先选择未认识的角色
        const unmetCharacters = availableCharacters.filter(char => 
            !this.gameState.characterMeetStatus[char].met
        );
        
        if (unmetCharacters.length > 0) {
            return unmetCharacters[Math.floor(Math.random() * unmetCharacters.length)];
        }
        
        // 如果都认识了，选择关系可以进一步发展的角色
        const growableRelations = availableCharacters.filter(char => 
            this.gameState.characterMeetStatus[char].intimacyLevel < 5
        );
        
        if (growableRelations.length > 0) {
            return growableRelations[Math.floor(Math.random() * growableRelations.length)];
        }
        
        return null;
    }
    
    // 显示多轮故事对话
    showMultiRoundStory(characterName, activityId, storyType, round) {
        const modal = document.getElementById('scenario-modal');
        const titleElement = modal.querySelector('.scenario-title');
        const descElement = modal.querySelector('.scenario-description');
        const choicesElement = modal.querySelector('.scenario-choices');
        
        // 获取故事内容
        const storyContent = this.getStoryContent(characterName, activityId, storyType, round);
        const character = gameData.characters[characterName];
        
        // 设置标题
        const titleText = storyType === 'first_meeting' ? 
            `初次相遇 - ${characterName}` : 
            `与${characterName}的互动`;
        if (titleElement) titleElement.textContent = titleText;
        
        // 设置描述（包含头像和对话）
        if (descElement) {
            const portraitPath = `assets/images/${character.portrait}`;
            descElement.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px;">
                    <div class="character-portrait" style="width: 80px; height: 80px; flex-shrink: 0;">
                        <img src="${portraitPath}" alt="${characterName}" 
                             style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid #ff8fab;" 
                             onerror="this.style.display='none'">
                    </div>
                    <div style="flex: 1;">
                        <h4 style="color: #ff6b9d; margin: 0 0 10px 0; font-size: 18px;">${characterName}</h4>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; border-left: 4px solid #ff8fab;">
                            <p style="margin: 0; line-height: 1.6; color: #555;">${storyContent.description}</p>
                        </div>
                        ${storyContent.dialogue ? `
                        <div style="background: rgba(255, 183, 197, 0.1); padding: 12px; border-radius: 8px; margin-top: 10px; border-left: 3px solid #ffb7c5;">
                            <p style="margin: 0; font-style: italic; color: #666;">"${storyContent.dialogue}"</p>
                        </div>
                        ` : ''}
                        <div style="text-align: center; margin-top: 10px;">
                            <small style="color: #999; background: #f0f0f0; padding: 4px 8px; border-radius: 12px;">
                                第 ${round} 轮对话
                            </small>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // 设置选择按钮
        if (choicesElement) {
            choicesElement.innerHTML = '';
            
            storyContent.choices.forEach((choice, index) => {
                const button = document.createElement('button');
                button.className = 'choice-btn';
                button.innerHTML = `
                    <div style="text-align: left; line-height: 1.4;">
                        ${choice.text}
                        ${choice.hint ? `<div style="font-size: 11px; color: #888; margin-top: 4px;">${choice.hint}</div>` : ''}
                    </div>
                `;
                button.addEventListener('click', () => {
                    this.handleMultiRoundChoice(characterName, activityId, storyType, round, choice);
                });
                choicesElement.appendChild(button);
            });
        }

        this.showModal('scenario-modal');
    }
    
    // 处理多轮对话选择
    handleMultiRoundChoice(characterName, activityId, storyType, round, choice) {
        // 应用即时效果
        if (choice.effect) {
            Object.keys(choice.effect).forEach(attr => {
                if (attr === 'affection' || attr === 'trust' || attr === 'impression') {
                    // 更新角色关系
                    if (!this.gameState.characterRelationships[characterName]) {
                        this.gameState.characterRelationships[characterName] = { 
                            affection: 0, trust: 0, impression: 0, events: [] 
                        };
                    }
                    this.gameState.characterRelationships[characterName][attr] += choice.effect[attr];
                } else if (this.gameState.playerStats[attr] !== undefined) {
                    // 更新玩家属性
                    this.gameState.playerStats[attr] = Math.max(0, 
                        Math.min(100, this.gameState.playerStats[attr] + choice.effect[attr])
                    );
                }
            });
        }
        
        // 检查是否继续对话
        if (choice.next === 'end') {
            // 结束对话，显示结果
            this.showStoryResult(characterName, activityId, storyType, round);
        } else if (typeof choice.next === 'number') {
            // 继续下一轮对话
            this.showMultiRoundStory(characterName, activityId, storyType, choice.next);
        } else {
            // 特殊结局处理
            this.handleSpecialEnding(characterName, activityId, storyType, choice.next);
        }
    }
    
    // 显示故事结果
    showStoryResult(characterName, activityId, storyType, round) {
        const modal = document.getElementById('scenario-modal');
        const titleElement = modal.querySelector('.scenario-title');
        const descElement = modal.querySelector('.scenario-description');
        const choicesElement = modal.querySelector('.scenario-choices');
        
        // 更新角色认识状态
        if (storyType === 'first_meeting') {
            this.gameState.characterMeetStatus[characterName].met = true;
            this.gameState.characterMeetStatus[characterName].meetWeek = this.gameState.currentWeek;
        }
        
        // 提升亲密度
        this.gameState.characterMeetStatus[characterName].intimacyLevel += 1;
        
        const relationship = this.gameState.characterRelationships[characterName] || { affection: 0, trust: 0, impression: 0 };
        const meetStatus = this.gameState.characterMeetStatus[characterName];
        
        if (titleElement) {
            titleElement.textContent = storyType === 'first_meeting' ? '初次相遇完成' : '互动完成';
        }
        
        if (descElement) {
            const isFirstMeeting = storyType === 'first_meeting';
            descElement.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 40px; margin-bottom: 15px;">${isFirstMeeting ? '💫' : '✨'}</div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                        <h4 style="color: #ff6b9d; margin-bottom: 15px;">
                            ${isFirstMeeting ? `认识了${characterName}！` : `与${characterName}度过了愉快的时光`}
                        </h4>
                        <p style="line-height: 1.6; color: #555; margin-bottom: 15px;">
                            ${isFirstMeeting ? 
                                `通过这次${this.getActivityName(activityId)}，你认识了${characterName}。他给你留下了很好的印象。` :
                                `你们的关系在这次${this.getActivityName(activityId)}中得到了进一步发展。`
                            }
                        </p>
                        <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8e8 100%); padding: 15px; border-radius: 10px;">
                            <h4 style="color: #2e7d32; margin-bottom: 10px;">💖 关系变化</h4>
                            <p style="color: #4caf50; margin: 5px 0;">好感度: ${relationship.affection}</p>
                            <p style="color: #4caf50; margin: 5px 0;">信任度: ${relationship.trust}</p>
                            <p style="color: #4caf50; margin: 5px 0;">印象分: ${relationship.impression}</p>
                            <p style="color: #ff9800; margin: 5px 0;">亲密等级: ${meetStatus.intimacyLevel}</p>
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
                this.finishActivity();
            });
            
            choicesElement.appendChild(continueBtn);
        }

        this.showModal('scenario-modal');
    }
    
    // 获取活动名称
    getActivityName(activityId) {
        const names = {
            'library_study': '图书馆学习',
            'sports_activities': '体育活动',
            'art_club': '社团活动',
            'campus_walk': '校园漫步',
            'cafeteria_meal': '食堂用餐'
        };
        return names[activityId] || '校园活动';
    }
    
    // 完成活动
    finishActivity() {
        // 消耗行动点
        this.gameState.actionPoints = Math.max(0, this.gameState.actionPoints - 1);
        
        // 更新统计
        this.updateWeekStatsByActivity(this.selectedDay);
        
        // 更新UI
        this.updateGameUI();
        
        // 检查是否行动点用完
        if (this.gameState.actionPoints <= 0) {
            setTimeout(() => {
                this.askForNextWeek();
            }, 1500);
        }
    }
    
    // ===== 顾言故事线 =====
    getGuYanLibraryFirstMeeting(round) {
        const rounds = {
            1: {
                description: "你在图书馆寻找专业课的参考书籍，在书架间转了好久都没找到。这时一个戴眼镜的男生走过来，看起来很有学者气质。",
                dialogue: "需要帮忙吗？看你在这一排找了很久。我是法学系的顾言，对图书馆的书籍分布比较熟悉。",
                choices: [
                    { text: "谢谢！我在找专业课的参考书", effect: { affection: 2, impression: 1 }, next: 2, hint: "表现出对学习的重视" },
                    { text: "你看起来很眼熟，是学生会的吗？", effect: { affection: 1, trust: 1 }, next: 2, hint: "表现出对他身份的好奇" },
                    { text: "不用了，我自己能找到", effect: { affection: -1 }, next: 2, hint: "可能显得有点冷淡" }
                ]
            },
            2: {
                description: "顾言推了推眼镜，温和地笑了笑。他在书架间轻松地找到了你需要的书籍。",
                dialogue: "你说得对，我确实在学生会工作。这些专业书籍确实不好找，图书管理员经常放错位置。你是哪个专业的？",
                choices: [
                    { text: "我是" + (this.gameState?.player?.major || '商学') + "专业的，谢谢你的帮助", effect: { affection: 2, trust: 2 }, next: 3, hint: "真诚地表达感谢" },
                    { text: "学生会的工作一定很忙吧？", effect: { affection: 1, impression: 1 }, next: 3, hint: "表现出对他的关心" },
                    { text: "你为什么要帮助陌生人？", effect: { impression: -1 }, next: 3, hint: "可能让他觉得你多疑" }
                ]
            },
            3: {
                description: "顾言整理了一下手中的资料，眼神中闪烁着智慧的光芒。",
                dialogue: "帮助同学是我的责任，也是我的快乐。如果以后在学习上有什么困难，可以随时找我。对了，我经常在这个时间来图书馆，或许我们还会再遇见。",
                choices: [
                    { text: "好的，我会记住的。希望能成为朋友", effect: { affection: 3, trust: 2, impression: 2 }, next: 'end', hint: "建立良好的第一印象" },
                    { text: "谢谢学长，以后多多指教", effect: { affection: 2, trust: 1 }, next: 'end', hint: "表现出尊重和礼貌" },
                    { text: "那就不打扰你学习了", effect: { affection: 1 }, next: 'end', hint: "礼貌但距离感较强" }
                ]
            }
        };
        return rounds[round] || rounds[1];
    }
    
    getGuYanLibraryInteraction(round) {
        const rounds = {
            1: {
                description: "你再次在图书馆遇到了顾言，他正在整理一摞法律书籍，看到你时友善地点头致意。",
                dialogue: "又见面了！看你这次找书找得很顺利。最近的学习怎么样？有什么学术上的困惑吗？",
                choices: [
                    { text: "有个专业问题想请教你", effect: { affection: 2, trust: 1 }, next: 2, hint: "求教会让他有被需要的感觉" },
                    { text: "学习挺好的，你呢？", effect: { affection: 1 }, next: 2, hint: "礼貌的社交对话" },
                    { text: "在准备期末考试，压力有点大", effect: { trust: 2 }, next: 2, hint: "敞开心扉分享压力" }
                ]
            },
            2: {
                description: "顾言认真地听着你的话，然后给出了很有见地的建议。",
                dialogue: "我理解你的感受。其实学习的关键是找到适合自己的方法。我有一些学习笔记和资料，如果你需要的话可以借给你看看。",
                choices: [
                    { text: "真的吗？太感谢了！", effect: { affection: 3, trust: 2 }, next: 3, hint: "表现出真诚的感激" },
                    { text: "你真是太好了，但这样会不会太麻烦你？", effect: { affection: 2, impression: 1 }, next: 3, hint: "体贴但略显客气" },
                    { text: "我自己再试试吧", effect: { affection: 0 }, next: 3, hint: "可能让他觉得你太独立" }
                ]
            },
            3: {
                description: "顾言的眼神变得更加温和，显然很高兴能帮助到你。",
                dialogue: "能帮到你我很开心。对了，下周我要去参加一个学术讲座，如果你有兴趣的话，我们可以一起去。相信你会有收获的。",
                choices: [
                    { text: "好啊！我很感兴趣", effect: { affection: 3, trust: 2, impression: 2 }, next: 'end', hint: "积极参与能加深关系" },
                    { text: "听起来不错，让我考虑一下", effect: { affection: 1 }, next: 'end', hint: "表现出一定兴趣但不确定" },
                    { text: "谢谢邀请，不过我可能没时间", effect: { affection: -1 }, next: 'end', hint: "拒绝可能让他失望" }
                ]
            }
        };
        return rounds[round] || rounds[1];
    }
    
    // ===== 江澈故事线 =====
    getJiangCheLibraryFirstMeeting(round) {
        const rounds = {
            1: {
                description: "你在文学区域寻找一本经典小说，发现角落里有个文艺气质的男生正在安静地阅读诗集。阳光透过窗户洒在他身上，很有画面感。",
                dialogue: "这里很安静对吧？我经常来这个角落读书，很少有人打扰。你也喜欢文学吗？我注意到你在看那一排的书。",
                choices: [
                    { text: "是的，我在找一些经典文学作品", effect: { affection: 2, impression: 2 }, next: 2, hint: "展现文学素养" },
                    { text: "这里确实很安静，适合思考", effect: { affection: 1, trust: 1 }, next: 2, hint: "表现出对环境的欣赏" },
                    { text: "不好意思打扰你了", effect: { affection: 0 }, next: 2, hint: "显得比较拘谨" }
                ]
            },
            2: {
                description: "江澈轻抚着手中的诗集，眼中带着温和的光芒。",
                dialogue: "不会打扰的，能遇到同样爱好文学的人是很难得的事。我叫江澈，中文系的。你看起来有种特别的气质，很适合这样的环境。",
                choices: [
                    { text: "谢谢夸奖，我叫" + (this.gameState?.player?.name || '小雪'), effect: { affection: 2, trust: 1 }, next: 3, hint: "自然地介绍自己" },
                    { text: "能推荐一些好的诗集吗？", effect: { affection: 2, impression: 2 }, next: 3, hint: "表现出学习的渴望" },
                    { text: "你经常来这里吗？", effect: { affection: 1 }, next: 3, hint: "询问他的习惯" }
                ]
            },
            3: {
                description: "江澈的笑容很温暖，让人感到很舒适。他推荐了几本书给你。",
                dialogue: "这几本诗集都很不错，有现代诗也有古典诗词。如果你有兴趣，我们可以一起讨论。文学就是要有人分享才更有意义。",
                choices: [
                    { text: "太好了！我很期待与你的讨论", effect: { affection: 3, trust: 2, impression: 2 }, next: 'end', hint: "建立深度连接" },
                    { text: "谢谢你的推荐，我会认真阅读的", effect: { affection: 2, impression: 1 }, next: 'end', hint: "表现出认真的态度" },
                    { text: "我先看看这些书，以后再联系", effect: { affection: 1 }, next: 'end', hint: "比较保守的回应" }
                ]
            }
        };
        return rounds[round] || rounds[1];
    }
    
    getJiangCheLibraryInteraction(round) {
        const rounds = {
            1: {
                description: "你在熟悉的角落找到了江澈，他正在写作，看到你时眼中闪过一丝惊喜。",
                dialogue: "是你啊！真是巧合。我正在写一首关于校园秋天的诗，你来得正好，能帮我看看吗？有时候需要一个读者的视角。",
                choices: [
                    { text: "当然可以！我很荣幸能先读到你的作品", effect: { affection: 3, trust: 1 }, next: 2, hint: "表现出对他创作的重视" },
                    { text: "虽然我不太懂诗，但愿意听听", effect: { affection: 2, impression: 1 }, next: 2, hint: "谦虚但愿意尝试" },
                    { text: "我怕给不了专业意见", effect: { affection: 1 }, next: 2, hint: "过于谦虚可能显得不自信" }
                ]
            },
            2: {
                description: "江澈轻柔地朗读了他的诗作，他的声音很好听，诗的意境也很美。",
                dialogue: "这首诗写的是梧桐叶落的意境，想表达时光流逝中的美好。你觉得怎么样？有什么感受吗？",
                choices: [
                    { text: "很美，我仿佛看到了落叶纷飞的画面", effect: { affection: 3, impression: 2 }, next: 3, hint: "用心感受并表达出来" },
                    { text: "你的声音很好听，很有感染力", effect: { affection: 2, trust: 1 }, next: 3, hint: "注意到他的个人魅力" },
                    { text: "写得不错，但我不太懂诗的技巧", effect: { affection: 1 }, next: 3, hint: "诚实但可能显得不够投入" }
                ]
            },
            3: {
                description: "江澈看起来很受鼓舞，眼中有种创作者被理解的光芒。",
                dialogue: "谢谢你的感受，这让我觉得写作是有意义的。你知道吗？有时候写作会很孤独，能有人理解真是太好了。下次如果我有新作品，还能分享给你吗？",
                choices: [
                    { text: "当然！我很期待你的新作品", effect: { affection: 3, trust: 2, impression: 2 }, next: 'end', hint: "成为他的文学知音" },
                    { text: "我会很认真地听的", effect: { affection: 2, trust: 1 }, next: 'end', hint: "表现出认真的态度" },
                    { text: "如果有时间的话", effect: { affection: 1 }, next: 'end', hint: "回应比较保守" }
                ]
            }
        };
        return rounds[round] || rounds[1];
    }
    
    // ===== 简化其他角色故事（先提供基础框架）=====
    getSuYunShenLibraryFirstMeeting(round) {
        return {
            description: "你遇到了温文尔雅的苏云深...",
            dialogue: "很高兴认识你...",
            choices: [
                { text: "选择1", effect: { affection: 2 }, next: 2 },
                { text: "选择2", effect: { affection: 1 }, next: 2 },
                { text: "选择3", effect: { affection: 0 }, next: 'end' }
            ]
        };
    }
    
    getSuYunShenLibraryInteraction(round) {
        return {
            description: "与苏云深的进一步交流...",
            dialogue: "我们的关系在加深...",
            choices: [
                { text: "继续", effect: { affection: 2 }, next: 'end' }
            ]
        };
    }
    
    // ===== 林舟体育故事线 =====
    getLinZhouSportsFirstMeeting(round) {
        const rounds = {
            1: {
                description: "你正在篮球场边的小径上走着，突然一个篮球朝你滚过来。你弯腰捡起球，抬头就看到一个阳光男孩跑了过来。",
                dialogue: "不好意思不好意思！球跑到你那边了。咦？你是新生吧？我叫林舟，体育系的。谢谢你帮我捡球！",
                choices: [
                    { text: "没关系，我叫" + (this.gameState?.player?.name || '小雪'), effect: { affection: 2 }, next: 2, hint: "友善地自我介绍" },
                    { text: "你怎么知道我是新生？", effect: { affection: 1 }, next: 2, hint: "表现出好奇心" },
                    { text: "小心一点，别砸到人", effect: { affection: 0 }, next: 2, hint: "可能显得有些严厉" }
                ]
            },
            2: {
                description: "林舟接过篮球，脸上带着歉意的笑容，你能感受到他身上散发的运动员特有的阳光气息。",
                dialogue: "哈哈，因为你看起来还有点紧张，像刚入学的样子。别担心，大学生活会很有趣的！你是什么专业的？",
                choices: [
                    { text: "我是" + (this.gameState?.player?.major || '商学') + "专业的", effect: { affection: 2, trust: 1 }, next: 3, hint: "分享专业信息" },
                    { text: "我确实还在熟悉环境", effect: { trust: 2 }, next: 3, hint: "坦承地表达状态" },
                    { text: "你很了解新生呢", effect: { affection: 1 }, next: 3, hint: "转移话题的回应" }
                ]
            },
            3: {
                description: "林舟把篮球抱在怀里，真诚地看着你。",
                dialogue: "太好了！如果有什么不懂的尽管问我，我已经在这里待了一年了。对了，如果你有兴趣的话，欢迎来看我们的篮球比赛！",
                choices: [
                    { text: "谢谢你，林舟。我会去看你比赛的", effect: { affection: 3, trust: 2, impression: 1 }, next: 'end', hint: "积极响应邀请" },
                    { text: "我会考虑去看比赛的", effect: { affection: 2 }, next: 'end', hint: "表现出一定兴趣" },
                    { text: "有时间的话", effect: { affection: 1 }, next: 'end', hint: "比较敷衍的回应" }
                ]
            }
        };
        return rounds[round] || rounds[1];
    }
    
    getLinZhouSportsInteraction(round) {
        return {
            description: "再次遇到林舟，他刚训练完...",
            dialogue: "又见面了！要不要一起运动？",
            choices: [
                { text: "好的", effect: { affection: 2 }, next: 'end' }
            ]
        };
    }
    
    // ===== 为其他角色添加简化版本（可以后续扩展）=====
    getSongZhiNanSportsFirstMeeting(round) { return this.getDefaultStory('宋之南', '体育活动'); }
    getSongZhiNanSportsInteraction(round) { return this.getDefaultStory('宋之南', '体育互动'); }
    getXiaoRanSportsFirstMeeting(round) { return this.getDefaultStory('萧然', '体育活动'); }
    getXiaoRanSportsInteraction(round) { return this.getDefaultStory('萧然', '体育互动'); }
    
    getZhouYiChenClubFirstMeeting(round) { return this.getDefaultStory('周奕辰', '社团活动'); }
    getZhouYiChenClubInteraction(round) { return this.getDefaultStory('周奕辰', '社团互动'); }
    getTangYanClubFirstMeeting(round) { return this.getDefaultStory('唐言', '社团活动'); }
    getTangYanClubInteraction(round) { return this.getDefaultStory('唐言', '社团互动'); }
    getJiangCheClubFirstMeeting(round) { return this.getDefaultStory('江澈', '社团活动'); }
    getJiangCheClubInteraction(round) { return this.getDefaultStory('江澈', '社团互动'); }
    
    getSongZhiNanWalkFirstMeeting(round) { return this.getDefaultStory('宋之南', '校园漫步'); }
    getSongZhiNanWalkInteraction(round) { return this.getDefaultStory('宋之南', '漫步互动'); }
    getSuYunShenWalkFirstMeeting(round) { return this.getDefaultStory('苏云深', '校园漫步'); }
    getSuYunShenWalkInteraction(round) { return this.getDefaultStory('苏云深', '漫步互动'); }
    getXiaoRanWalkFirstMeeting(round) { return this.getDefaultStory('萧然', '校园漫步'); }
    getXiaoRanWalkInteraction(round) { return this.getDefaultStory('萧然', '漫步互动'); }
    
    getLinZhouCafeteriaFirstMeeting(round) { return this.getDefaultStory('林舟', '食堂用餐'); }
    getLinZhouCafeteriaInteraction(round) { return this.getDefaultStory('林舟', '用餐互动'); }
    getZhouYiChenCafeteriaFirstMeeting(round) { return this.getDefaultStory('周奕辰', '食堂用餐'); }
    getZhouYiChenCafeteriaInteraction(round) { return this.getDefaultStory('周奕辰', '用餐互动'); }
    getTangYanCafeteriaFirstMeeting(round) { return this.getDefaultStory('唐言', '食堂用餐'); }
    getTangYanCafeteriaInteraction(round) { return this.getDefaultStory('唐言', '用餐互动'); }
    
    // 默认故事模板
    getDefaultStory(characterName, activityType) {
        return {
            description: `你在${activityType}中遇到了${characterName}，这是一次特别的相遇...`,
            dialogue: "很高兴认识你！",
            choices: [
                { text: "我也很高兴认识你", effect: { affection: 2, trust: 1 }, next: 2 },
                { text: "你好", effect: { affection: 1 }, next: 2 },
                { text: "嗯", effect: { affection: 0 }, next: 'end' }
            ]
        };
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
