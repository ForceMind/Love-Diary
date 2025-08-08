// 游戏引擎 - 完全弹窗模式
class LoveDiaryGame {
    constructor() {
        this.gameState = {
            player: {
                name: '',
                major: '',
                personality: ''
            },
            currentWeek: 1,
            currentDay: 1,
            actionPoints: 2,
            maxActionPoints: 2,
            characterRelationships: {},
            achievements: [],
            unlockedEndings: [],
            currentEnding: null
        };
        
        this.selectedDay = null;
        this.init();
    }

    init() {
        console.log('Love Diary Game 初始化完成');
        this.initializeCharacterRelationships();
        this.setupModalEventListeners();
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
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            
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
                case 'game-timeline-modal':
                    this.updateGameUI();
                    break;
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
        
        // 如果游戏已经开始，关闭弹窗后应该回到时间线
        if (this.gameState.player.name && modalId !== 'game-timeline-modal') {
            // 延迟一点时间确保关闭动画完成
            setTimeout(() => {
                this.showModal('game-timeline-modal');
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
        modal.style.zIndex = '3500';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px; text-align: center;">
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
        this.gameState.player = playerData;
        this.closeModal('character-creation-modal');
        this.showModal('game-timeline-modal');
        this.updateGameUI();
    }

    selectDay(day) {
        if (this.gameState.actionPoints <= 0) {
            this.showGameNotification('本周行动点数已用完！', 'warning');
            return;
        }
        
        this.selectedDay = day;
        this.showCharacterSelection();
    }

    showCharacterSelection() {
        this.closeModal('game-timeline-modal');
        this.showModal('character-selection-modal');
        this.loadCharacterSelection();
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
        if (this.gameState.actionPoints <= 0) {
            this.showGameNotification('本周行动点数已用完！', 'warning');
            return;
        }

        const relationship = this.gameState.characterRelationships[characterName];
        
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
        
        if (characterScenarios.length > 0) {
            selectedScenario = characterScenarios[Math.floor(Math.random() * characterScenarios.length)];
        }

        // 增加关系值
        const affectionGain = Math.floor(Math.random() * 10) + 5;
        const trustGain = Math.floor(Math.random() * 5) + 2;
        
        relationship.affection += affectionGain;
        relationship.trust += trustGain;

        // 消耗行动点
        this.gameState.actionPoints--;

        // 显示互动结果
        this.showInteractionResult(characterName, selectedScenario, affectionGain, trustGain);

        // 检查特殊事件
        this.checkSpecialEvents(characterName);
    }

    showInteractionResult(characterName, scenario, affectionGain, trustGain) {
        this.closeModal('character-selection-modal');
        
        const modalContent = document.getElementById('scenario-content');
        const character = gameData.characters[characterName];
        const portraitPath = `assets/images/${character.portrait}`;
        
        modalContent.innerHTML = `
            <div style="text-align: center;">
                <div class="character-portrait" style="margin: 0 auto 20px; width: 100px; height: 100px;">
                    <img src="${portraitPath}" alt="${characterName}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                </div>
                <h3 style="color: #ff6b9d; margin-bottom: 15px;">与 ${characterName} 的互动</h3>
                
                ${scenario ? `
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="color: #333; margin-bottom: 10px;">${scenario.scene}</h4>
                        <p style="line-height: 1.6; color: #555;">${scenario.dialogue}</p>
                    </div>
                ` : `
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="line-height: 1.6; color: #555;">你与${characterName}度过了愉快的时光，你们的关系变得更加亲密了。</p>
                    </div>
                `}
                
                <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8e8 100%); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #2e7d32; margin-bottom: 10px;">💖 关系变化</h4>
                    <p style="color: #4caf50; margin: 5px 0;">好感度 +${affectionGain}</p>
                    <p style="color: #4caf50; margin: 5px 0;">信任度 +${trustGain}</p>
                    <p style="color: #666; font-size: 14px; margin-top: 10px;">
                        当前好感度: ${this.gameState.characterRelationships[characterName].affection} | 
                        信任度: ${this.gameState.characterRelationships[characterName].trust}
                    </p>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="game.continueGame()" style="margin-right: 10px;">继续游戏</button>
                    <button onclick="game.returnToTimeline()">返回时间线</button>
                </div>
            </div>
        `;
        
        this.showModal('scenario-modal');
    }

    continueGame() {
        this.closeModal('scenario-modal');
        
        // 检查是否还有行动点
        if (this.gameState.actionPoints > 0) {
            this.showModal('character-selection-modal');
        } else {
            this.endWeek();
        }
    }

    returnToTimeline() {
        this.closeModal('scenario-modal');
        this.showModal('game-timeline-modal');
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
        modal.style.zIndex = '2000';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px;">
                <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <div style="text-align: center;">
                    <h3 style="color: #ff6b9d; margin-bottom: 20px;">${title}</h3>
                    <p style="line-height: 1.8; color: #555; margin-bottom: 20px;">${description}</p>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">继续</button>
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
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div style="text-align: center;">
                    <h3 style="color: #ff6b9d;">📅 第${this.gameState.currentWeek - 1}周总结</h3>
                    <p style="margin: 20px 0; line-height: 1.6;">
                        一周的校园生活结束了！<br>
                        你与心仪的人们度过了美好的时光。
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <button onclick="this.parentElement.parentElement.parentElement.remove(); game.returnToTimeline();">
                            开始第${this.gameState.currentWeek}周
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
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
        this.closeModal('game-timeline-modal');
        
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
        document.getElementById('current-week').textContent = `第${this.gameState.currentWeek}周`;
        document.getElementById('current-actions').textContent = this.gameState.actionPoints;
        document.getElementById('player-info').textContent = 
            `${this.gameState.player.name} (${this.gameState.player.major} | ${this.gameState.player.personality})`;
        
        // 更新日历显示
        document.querySelectorAll('.day-slot').forEach(slot => {
            if (this.gameState.actionPoints <= 0) {
                slot.classList.add('disabled');
            } else {
                slot.classList.remove('disabled');
            }
        });
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
                        this.showModal('game-timeline-modal');
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
    game.selectDay(day);
}

function closeGameAndReturnToMenu() {
    game.closeModal('game-timeline-modal');
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
window.addEventListener('load', function() {
    game = new LoveDiaryGame();
    console.log('游戏初始化完成！');
});
