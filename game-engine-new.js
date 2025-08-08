// 游戏引擎 - 弹窗模式
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
        this.availableCharacters = [];
        this.init();
    }

    init() {
        console.log('Love Diary Game 初始化完成');
        this.initializeCharacterRelationships();
        this.setupEventListeners();
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

    setupEventListeners() {
        // 为日历天数添加点击事件
        document.querySelectorAll('.day-slot').forEach(daySlot => {
            daySlot.addEventListener('click', () => {
                if (this.gameState.actionPoints > 0) {
                    this.selectDay(parseInt(daySlot.dataset.day));
                }
            });
        });

        // 点击弹窗外部关闭弹窗
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    selectDay(day) {
        this.selectedDay = day;
        this.showAvailableCharacters();
    }

    showAvailableCharacters() {
        const characterContainer = document.getElementById('character-selection');
        characterContainer.innerHTML = '';
        
        Object.entries(gameData.characters).forEach(([name, character]) => {
            const characterCard = document.createElement('div');
            characterCard.className = 'character-card';
            characterCard.innerHTML = `
                <div class="character-portrait">
                    <img src="${character.portrait}" alt="${character.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                </div>
                <div class="character-name">${character.name}</div>
                <div class="character-title">${character.title}</div>
                <div class="character-description">${character.description}</div>
                <div style="margin-top: 10px;">
                    <small>好感度: ${this.gameState.characterRelationships[name].affection}</small>
                </div>
            `;
            
            characterCard.addEventListener('click', () => {
                this.interactWithCharacter(name);
            });
            
            characterContainer.appendChild(characterCard);
        });
    }

    interactWithCharacter(characterName) {
        if (this.gameState.actionPoints <= 0) {
            alert('本周行动点数已用完！');
            return;
        }

        const relationship = this.gameState.characterRelationships[characterName];
        const character = gameData.characters[characterName];
        
        // 随机事件或对话
        const scenarios = gameData.scenarios.filter(s => s.character === characterName);
        if (scenarios.length > 0) {
            const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
            this.showScenario(randomScenario);
        }

        // 增加关系值
        relationship.affection += Math.floor(Math.random() * 10) + 5;
        relationship.trust += Math.floor(Math.random() * 5) + 2;

        // 消耗行动点
        this.gameState.actionPoints--;
        this.updateUI();

        // 检查是否触发特殊事件
        this.checkSpecialEvents(characterName);
        
        // 检查周末
        if (this.gameState.actionPoints <= 0) {
            this.endWeek();
        }
    }

    showScenario(scenario) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3>${scenario.title}</h3>
                <p style="margin: 20px 0; line-height: 1.6;">${scenario.description}</p>
                <div style="text-align: center;">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">继续</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    checkSpecialEvents(characterName) {
        const relationship = this.gameState.characterRelationships[characterName];
        
        // 检查好感度里程碑
        if (relationship.affection >= 50 && !relationship.events.includes('first_date')) {
            relationship.events.push('first_date');
            this.showSpecialEvent(`与${characterName}的第一次约会`, `你和${characterName}度过了美好的第一次约会时光...`);
        }
        
        if (relationship.affection >= 100 && !relationship.events.includes('confession')) {
            relationship.events.push('confession');
            this.showSpecialEvent(`${characterName}的告白`, `${characterName}向你表达了内心的情感...`);
        }
    }

    showSpecialEvent(title, description) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3 style="color: #ff6b9d;">💖 ${title} 💖</h3>
                <p style="margin: 20px 0; line-height: 1.6; text-align: center;">${description}</p>
                <div style="text-align: center;">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">继续游戏</button>
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
        this.updateUI();
    }

    showWeekSummary() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3>第${this.gameState.currentWeek - 1}周总结</h3>
                <p style="margin: 20px 0;">一周的校园生活结束了！</p>
                <div style="text-align: center;">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">开始新的一周</button>
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
        closeModal('game-main-modal');
        
        const modal = document.getElementById('ending-modal');
        const content = document.getElementById('ending-content');
        
        content.innerHTML = `
            <h2 style="text-align: center; color: #ff6b9d;">🎉 ${ending.title} 🎉</h2>
            <div style="text-align: center; margin: 20px 0;">
                ${ending.character ? `<img src="${gameData.characters[ending.character].portrait}" alt="${ending.character}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">` : ''}
            </div>
            <p style="line-height: 1.8; text-align: center; margin: 20px 0;">${ending.description}</p>
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="closeModal('ending-modal'); game.resetGame()">重新开始</button>
                <button onclick="closeModal('ending-modal')">返回主菜单</button>
            </div>
        `;
        
        showModal('ending-modal');
    }

    unlockAchievement(achievementId) {
        if (!this.gameState.achievements.includes(achievementId)) {
            this.gameState.achievements.push(achievementId);
            const achievement = gameData.achievements.find(a => a.id === achievementId);
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
            background: #4caf50;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 2000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            animation: slideInRight 0.5s ease-out;
        `;
        notification.innerHTML = `
            <strong>🏆 成就解锁！</strong><br>
            ${achievement.name}: ${achievement.description}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    updateUI() {
        document.getElementById('current-week').textContent = `第${this.gameState.currentWeek}周`;
        document.getElementById('current-actions').textContent = this.gameState.actionPoints;
        
        // 更新日历显示
        document.querySelectorAll('.day-slot').forEach(slot => {
            slot.classList.toggle('disabled', this.gameState.actionPoints <= 0);
        });
        
        // 重新显示角色列表以更新好感度
        if (this.selectedDay) {
            this.showAvailableCharacters();
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
        this.updateUI();
    }

    saveGame() {
        try {
            const saveData = {
                gameState: this.gameState,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('loveDiarySave', JSON.stringify(saveData));
            alert('游戏保存成功！');
        } catch (error) {
            alert('保存失败：' + error.message);
        }
    }

    loadGame() {
        try {
            const saveData = localStorage.getItem('loveDiarySave');
            if (saveData) {
                const data = JSON.parse(saveData);
                this.gameState = data.gameState;
                this.updateUI();
                alert('游戏加载成功！');
                return true;
            } else {
                alert('没有找到存档！');
                return false;
            }
        } catch (error) {
            alert('加载失败：' + error.message);
            return false;
        }
    }
}

// 弹窗管理函数
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        
        // 如果是成就或相册界面，需要填充内容
        if (modalId === 'achievements-modal') {
            loadAchievements();
        } else if (modalId === 'gallery-modal') {
            loadGallery();
        } else if (modalId === 'load-game-modal') {
            loadSaveSlots();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function loadAchievements() {
    const container = document.getElementById('achievements-list');
    container.innerHTML = '';
    
    gameData.achievements.forEach(achievement => {
        const isUnlocked = game.gameState.achievements.includes(achievement.id);
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card';
        achievementCard.style.cssText = `
            background: ${isUnlocked ? '#e8f5e8' : '#f5f5f5'};
            border: 2px solid ${isUnlocked ? '#4caf50' : '#ddd'};
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 10px;
            opacity: ${isUnlocked ? '1' : '0.6'};
        `;
        
        achievementCard.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="font-size: 24px; margin-right: 15px;">${isUnlocked ? '🏆' : '🔒'}</span>
                <div>
                    <h4 style="margin: 0 0 5px 0; color: ${isUnlocked ? '#2e7d32' : '#666'};">${achievement.name}</h4>
                    <p style="margin: 0; font-size: 14px; color: #666;">${achievement.description}</p>
                </div>
            </div>
        `;
        
        container.appendChild(achievementCard);
    });
}

function loadGallery() {
    const container = document.getElementById('gallery-content');
    container.innerHTML = '';
    
    if (game.gameState.unlockedEndings.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">还没有解锁任何结局，快去游戏中体验吧！</p>';
        return;
    }
    
    game.gameState.unlockedEndings.forEach(endingId => {
        const ending = gameData.endings.find(e => e.id === endingId);
        if (ending) {
            const endingCard = document.createElement('div');
            endingCard.style.cssText = `
                background: white;
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 15px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            `;
            
            endingCard.innerHTML = `
                <h4 style="color: #ff6b9d; margin-bottom: 10px;">${ending.title}</h4>
                <p style="line-height: 1.6; color: #555;">${ending.description}</p>
                ${ending.character ? `<small style="color: #888;">角色：${ending.character}</small>` : ''}
            `;
            
            container.appendChild(endingCard);
        }
    });
}

function loadSaveSlots() {
    const container = document.getElementById('save-slots');
    container.innerHTML = '';
    
    const saveData = localStorage.getItem('loveDiarySave');
    if (saveData) {
        try {
            const data = JSON.parse(saveData);
            const saveSlot = document.createElement('div');
            saveSlot.style.cssText = `
                background: white;
                border: 2px solid #ff6b9d;
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            saveSlot.innerHTML = `
                <h4>存档 1</h4>
                <p>第${data.gameState.currentWeek}周</p>
                <p>角色：${data.gameState.player.name || '未命名'}</p>
                <small>${new Date(data.timestamp).toLocaleString()}</small>
            `;
            
            saveSlot.addEventListener('click', () => {
                if (game.loadGame()) {
                    closeModal('load-game-modal');
                    showModal('game-main-modal');
                }
            });
            
            container.appendChild(saveSlot);
        } catch (error) {
            container.innerHTML = '<p style="color: #f44336;">存档数据损坏</p>';
        }
    } else {
        container.innerHTML = '<p style="text-align: center; color: #666;">没有找到存档</p>';
    }
}

// 游戏控制函数
function startGame() {
    const name = document.getElementById('player-name').value.trim();
    const major = document.getElementById('player-major').value;
    const personality = document.querySelector('input[name="personality"]:checked');

    if (!name) {
        alert('请输入角色名字！');
        return;
    }
    
    if (!personality) {
        alert('请选择性格！');
        return;
    }

    // 设置玩家信息
    game.gameState.player = {
        name: name,
        major: major,
        personality: personality.value
    };

    // 关闭角色创建弹窗，显示游戏主界面
    closeModal('character-creation-modal');
    showModal('game-main-modal');
    
    // 更新UI
    game.updateUI();
}

function resetGame() {
    if (confirm('确定要重置所有游戏数据吗？此操作不可恢复！')) {
        localStorage.removeItem('loveDiarySave');
        game.resetGame();
        alert('游戏数据已重置！');
    }
}

// 初始化游戏
let game;
window.addEventListener('load', function() {
    game = new LoveDiaryGame();
    console.log('游戏初始化完成！');
});
