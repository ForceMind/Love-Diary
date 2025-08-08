/**
 * 心动日记 - 主游戏类
 * 整合所有系统，提供统一的游戏入口
 */
class LoveDiaryGame {
    constructor() {
        // 初始化核心系统
        this.engine = new GameEngine();
        this.logic = new GameLogic(this.engine);
        this.storyManager = new StoryManager(this.logic);
        
        // 绑定全局引用（保持兼容性）
        window.game = this;
        
        this.initialized = false;
    }

    /**
     * 初始化游戏
     */
    init() {
        if (this.initialized) return;
        
        console.log('Love Diary Game 初始化开始');
        
        // 初始化各个系统
        this.engine.init();
        this.logic.initializeCharacterRelationships();
        
        // 设置事件监听器
        this.setupEventListeners();
        
        // 检查自动加载
        this.checkAutoLoad();
        
        this.initialized = true;
        console.log('Love Diary Game 初始化完成');
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 主菜单按钮事件
        this.setupMainMenuEvents();
        
        // 游戏界面事件
        this.setupGameScreenEvents();
        
        // 角色创建事件
        this.setupCharacterCreationEvents();
    }

    /**
     * 设置主菜单事件
     */
    setupMainMenuEvents() {
        // 新游戏按钮
        const newGameBtn = document.querySelector('#new-game-btn');
        if (newGameBtn) {
            newGameBtn.addEventListener('click', () => {
                this.showCharacterCreation();
            });
        }

        // 继续游戏按钮
        const continueBtn = document.querySelector('#continue-game-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                this.loadAndContinueGame();
            });
        }

        // 设置按钮
        const settingsBtn = document.querySelector('#settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.engine.showModal('settings-modal');
            });
        }

        // 成就按钮
        const achievementsBtn = document.querySelector('#achievements-btn');
        if (achievementsBtn) {
            achievementsBtn.addEventListener('click', () => {
                this.showAchievements();
            });
        }

        // CG画廊按钮
        const galleryBtn = document.querySelector('#gallery-btn');
        if (galleryBtn) {
            galleryBtn.addEventListener('click', () => {
                this.showGallery();
            });
        }
    }

    /**
     * 设置游戏界面事件
     */
    setupGameScreenEvents() {
        // 返回菜单按钮
        const backToMenuBtn = document.querySelector('#back-to-menu-btn');
        if (backToMenuBtn) {
            backToMenuBtn.addEventListener('click', () => {
                this.confirmReturnToMenu();
            });
        }

        // 保存游戏按钮
        const saveGameBtn = document.querySelector('#save-game-btn');
        if (saveGameBtn) {
            saveGameBtn.addEventListener('click', () => {
                this.saveGame();
            });
        }

        // 日历日期点击事件
        this.setupCalendarEvents();
    }

    /**
     * 设置日历事件
     */
    setupCalendarEvents() {
        for (let day = 1; day <= 7; day++) {
            const dayElement = document.querySelector(`#day-${day}`);
            if (dayElement) {
                dayElement.addEventListener('click', () => {
                    this.logic.selectDay(day);
                });
            }
        }
    }

    /**
     * 设置角色创建事件
     */
    setupCharacterCreationEvents() {
        const createBtn = document.querySelector('#create-character-btn');
        if (createBtn) {
            createBtn.addEventListener('click', () => {
                this.createCharacter();
            });
        }
    }

    /**
     * 检查自动加载
     */
    checkAutoLoad() {
        const saveInfo = this.engine.getSaveInfo();
        if (saveInfo) {
            this.showAutoLoadPrompt(saveInfo);
        } else {
            this.showMainMenu();
        }
    }

    /**
     * 显示自动加载提示
     */
    showAutoLoadPrompt(saveInfo) {
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
                    <p style="margin: 5px 0;"><strong>角色：</strong>${saveInfo.playerName}</p>
                    <p style="margin: 5px 0;"><strong>进度：</strong>第${saveInfo.currentWeek}周</p>
                    <p style="margin: 5px 0;"><strong>专业：</strong>${saveInfo.playerMajor}</p>
                    <small style="color: #666;">${this.engine.formatDate(saveInfo.timestamp)}</small>
                </div>
                <p style="line-height: 1.8; color: #555; margin-bottom: 25px;">是否继续之前的游戏？</p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button class="new-game-btn" style="background: #f44336; color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 500;">
                        重新开始
                    </button>
                    <button class="continue-btn" style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 500;">
                        继续游戏
                    </button>
                </div>
            </div>
        `;

        // 绑定事件
        const newGameBtn = modal.querySelector('.new-game-btn');
        const continueBtn = modal.querySelector('.continue-btn');

        newGameBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            this.startNewGame();
        });

        continueBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            this.autoLoadGame();
        });

        document.body.appendChild(modal);
    }

    /**
     * 自动加载游戏
     */
    autoLoadGame() {
        const gameState = this.engine.loadGame();
        if (gameState) {
            this.logic.gameState = gameState;
            this.logic.showGameScreen();
            this.engine.showNotification('欢迎回来！游戏已自动加载', 'success');
        } else {
            this.showMainMenu();
        }
    }

    /**
     * 开始新游戏
     */
    startNewGame() {
        this.engine.deleteSave();
        this.logic.gameState = this.logic.initializeGameState();
        this.showMainMenu();
    }

    /**
     * 显示主菜单
     */
    showMainMenu() {
        const mainMenu = document.getElementById('main-menu');
        const gameScreen = document.getElementById('game-screen');
        
        if (gameScreen) gameScreen.classList.remove('active');
        if (mainMenu) mainMenu.classList.add('active');
        
        // 更新继续游戏按钮状态
        this.updateContinueButtonState();
    }

    /**
     * 更新继续游戏按钮状态
     */
    updateContinueButtonState() {
        const continueBtn = document.querySelector('#continue-game-btn');
        if (continueBtn) {
            continueBtn.disabled = !this.engine.hasSaveData();
            continueBtn.style.opacity = this.engine.hasSaveData() ? '1' : '0.5';
        }
    }

    /**
     * 显示角色创建界面
     */
    showCharacterCreation() {
        this.engine.showModal('character-creation-modal');
    }

    /**
     * 创建角色
     */
    createCharacter() {
        const nameInput = document.querySelector('#player-name');
        const majorSelect = document.querySelector('#player-major');
        const personalitySelect = document.querySelector('#player-personality');

        if (!nameInput || !majorSelect || !personalitySelect) {
            this.engine.showNotification('请确保所有输入框都存在', 'error');
            return;
        }

        const playerData = {
            name: nameInput.value.trim(),
            major: majorSelect.value,
            personality: personalitySelect.value
        };

        // 验证输入
        if (!playerData.name) {
            this.engine.showNotification('请输入角色名字', 'warning');
            return;
        }

        if (!playerData.major) {
            this.engine.showNotification('请选择专业', 'warning');
            return;
        }

        if (!playerData.personality) {
            this.engine.showNotification('请选择性格', 'warning');
            return;
        }

        // 开始游戏
        this.logic.startGame(playerData);
        this.engine.closeModal('character-creation-modal');
    }

    /**
     * 加载并继续游戏
     */
    loadAndContinueGame() {
        const gameState = this.engine.loadGame();
        if (gameState) {
            this.logic.gameState = gameState;
            this.logic.showGameScreen();
            this.engine.showNotification('游戏已加载', 'success');
        } else {
            this.engine.showNotification('没有找到存档', 'warning');
        }
    }

    /**
     * 保存游戏
     */
    saveGame() {
        if (this.engine.saveGame(this.logic.gameState)) {
            this.engine.showNotification('游戏已保存', 'success');
        }
    }

    /**
     * 确认返回主菜单
     */
    confirmReturnToMenu() {
        this.engine.showConfirm(
            '确定要返回主菜单吗？建议先保存游戏进度！',
            () => {
                this.logic.showMainMenu();
            },
            null,
            {
                title: '返回主菜单',
                confirmText: '确定',
                cancelText: '取消'
            }
        );
    }

    /**
     * 显示成就
     */
    showAchievements() {
        this.engine.showModal('achievements-modal', {
            onShow: (modal) => {
                this.loadAchievementsContent(modal);
            }
        });
    }

    /**
     * 加载成就内容
     */
    loadAchievementsContent(modal) {
        const contentElement = modal.querySelector('.achievements-content');
        if (!contentElement) return;

        const achievements = GameData.achievements;
        const playerAchievements = this.logic.gameState.achievements || [];

        let htmlContent = '<div class="achievements-grid">';
        
        Object.keys(achievements).forEach(achievementId => {
            const achievement = achievements[achievementId];
            const isUnlocked = playerAchievements.includes(achievementId);
            
            htmlContent += `
                <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}" style="padding: 15px; border-radius: 10px; margin-bottom: 10px; background: ${isUnlocked ? '#e8f5e8' : '#f5f5f5'};">
                    <div style="font-size: 24px; margin-bottom: 8px;">${achievement.icon}</div>
                    <h4 style="margin: 0 0 5px 0; color: ${isUnlocked ? '#2e7d32' : '#999'};">${achievement.name}</h4>
                    <p style="margin: 0; font-size: 12px; color: ${isUnlocked ? '#4caf50' : '#666'};">${achievement.description}</p>
                </div>
            `;
        });
        
        htmlContent += '</div>';
        contentElement.innerHTML = htmlContent;
    }

    /**
     * 显示CG画廊
     */
    showGallery() {
        this.engine.showModal('gallery-modal', {
            onShow: (modal) => {
                this.loadGalleryContent(modal);
            }
        });
    }

    /**
     * 加载画廊内容
     */
    loadGalleryContent(modal) {
        const contentElement = modal.querySelector('.gallery-content');
        if (!contentElement) return;

        // 这里可以根据解锁的CG来显示内容
        contentElement.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <div style="font-size: 48px; margin-bottom: 20px;">🖼️</div>
                <h3>CG画廊</h3>
                <p>随着剧情推进，这里会展示解锁的精美CG图片</p>
            </div>
        `;
    }

    /**
     * 检查成就解锁
     */
    checkAchievements() {
        const achievements = GameData.achievements;
        const playerAchievements = this.logic.gameState.achievements || [];
        
        Object.keys(achievements).forEach(achievementId => {
            if (playerAchievements.includes(achievementId)) return;
            
            const achievement = achievements[achievementId];
            if (this.isAchievementUnlocked(achievement)) {
                this.unlockAchievement(achievementId, achievement);
            }
        });
    }

    /**
     * 检查成就是否解锁
     */
    isAchievementUnlocked(achievement) {
        const condition = achievement.condition;
        
        // 检查玩家属性条件
        if (condition.playerStats) {
            for (const [stat, value] of Object.entries(condition.playerStats)) {
                if (this.logic.gameState.playerStats[stat] < value) {
                    return false;
                }
            }
        }
        
        // 检查角色好感度条件
        if (condition.allCharacterAffection) {
            const requiredAffection = condition.allCharacterAffection;
            for (const character of Object.keys(GameData.characters)) {
                const relationship = this.logic.gameState.characterRelationships[character];
                if (!relationship || relationship.affection < requiredAffection) {
                    return false;
                }
            }
        }
        
        return true;
    }

    /**
     * 解锁成就
     */
    unlockAchievement(achievementId, achievement) {
        if (!this.logic.gameState.achievements) {
            this.logic.gameState.achievements = [];
        }
        
        this.logic.gameState.achievements.push(achievementId);
        
        // 显示成就解锁通知
        this.engine.showNotification(
            `🏆 成就解锁：${achievement.name}`, 
            'success', 
            5000
        );
    }

    /**
     * 获取游戏统计信息
     */
    getGameStats() {
        return {
            currentWeek: this.logic.gameState.currentWeek,
            playerGrade: this.logic.gameState.player.grade,
            totalPlayTime: Date.now() - (this.startTime || Date.now()),
            charactersKnown: Object.values(this.logic.gameState.characterMeetStatus || {})
                .filter(status => status.met).length,
            achievementsUnlocked: (this.logic.gameState.achievements || []).length,
            storiesCompleted: this.storyManager.getStoryHistory().length
        };
    }

    /**
     * 导出存档数据（调试用）
     */
    exportSaveData() {
        const saveData = {
            gameState: this.logic.gameState,
            timestamp: Date.now(),
            version: '1.0.0',
            stats: this.getGameStats()
        };
        
        console.log('存档数据:', saveData);
        return saveData;
    }

    /**
     * 重置游戏（调试用）
     */
    resetGame() {
        this.engine.deleteSave();
        this.logic.gameState = this.logic.initializeGameState();
        this.storyManager.storyHistory = [];
        this.showMainMenu();
        this.engine.showNotification('游戏已重置', 'info');
    }
}
