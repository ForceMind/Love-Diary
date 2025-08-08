// 游戏引擎核心代码
class LoveDiaryGame {
    constructor() {
        this.gameState = {
            player: {
                name: "",
                major: "",
                personality: "",
                money: 100,
                energy: 100,
                maxEnergy: 100
            },
            currentWeek: 1,
            currentDay: 1,
            actionPoints: 2,
            maxActionPoints: 2,
            affection: {
                顾言: 0,
                林舟: 0,
                宋之南: 0,
                周奕辰: 0,
                江澈: 0,
                苏云深: 0,
                唐言: 0,
                萧然: 0
            },
            weekActivities: {},
            currentDialogue: null,
            gameEnded: false,
            achievements: {},
            gallery: {},
            statistics: {
                totalActivities: 0,
                socialActivities: 0,
                studyActivities: 0,
                leisureActivities: 0,
                encounterActivities: 0,
                endingsUnlocked: 0,
                gamesCompleted: 0
            },
            settings: {
                bgmVolume: 50,
                sfxVolume: 70,
                textSpeed: 'normal',
                autoSave: true
            }
        };
        
        this.currentScreen = 'main-menu';
        this.selectedDay = null;
        this.init();
    }

    init() {
        try {
            // 初始化成就和相册数据
            if (typeof gameData !== 'undefined') {
                this.gameState.achievements = JSON.parse(JSON.stringify(gameData.achievements));
                this.gameState.gallery = JSON.parse(JSON.stringify(gameData.gallery));
                console.log('Game data loaded successfully');
            } else {
                console.warn('gameData not found, using empty data');
            }
            
            this.updateDisplay();
            this.bindEvents();
            console.log('Game initialization complete');
        } catch (error) {
            console.error('Error during game initialization:', error);
        }
    }

    bindEvents() {
        // 日历点击事件
        document.querySelectorAll('.day-slot').forEach(slot => {
            slot.addEventListener('click', (e) => {
                const day = parseInt(e.currentTarget.dataset.day);
                this.selectDay(day);
            });
        });
    }

    selectDay(day) {
        if (this.gameState.actionPoints <= 0) {
            alert('今天的行动点数已用完！');
            return;
        }

        // 移除之前的选中状态
        document.querySelectorAll('.day-slot').forEach(slot => {
            slot.classList.remove('selected');
        });

        // 选中当前天
        document.querySelector(`[data-day="${day}"]`).classList.add('selected');
        this.selectedDay = day;
        this.showActivityPanel();
    }

    showActivityPanel() {
        document.getElementById('activity-panel').classList.remove('hidden');
    }

    closeActivityPanel() {
        document.getElementById('activity-panel').classList.add('hidden');
        document.querySelectorAll('.day-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
        this.selectedDay = null;
    }

    selectActivity(activity) {
        if (this.selectedDay === null || this.gameState.actionPoints <= 0) {
            return;
        }

        // 检查体力
        if (this.gameState.player.energy < 20) {
            this.showNotification('体力不足，需要休息！', 'warning');
            return;
        }

        // 消耗行动点和体力
        this.gameState.actionPoints--;
        this.gameState.player.energy = Math.max(0, this.gameState.player.energy - 15);
        
        // 记录活动
        if (!this.gameState.weekActivities[this.gameState.currentWeek]) {
            this.gameState.weekActivities[this.gameState.currentWeek] = {};
        }
        this.gameState.weekActivities[this.gameState.currentWeek][this.selectedDay] = activity;

        // 更新统计
        this.gameState.statistics.totalActivities++;
        switch(activity) {
            case '社交': this.gameState.statistics.socialActivities++; break;
            case '学习': this.gameState.statistics.studyActivities++; break;
            case '休闲': this.gameState.statistics.leisureActivities++; break;
            case '偶遇': this.gameState.statistics.encounterActivities++; break;
        }

        // 更新日历显示
        const daySlot = document.querySelector(`[data-day="${this.selectedDay}"]`);
        const activitiesDiv = daySlot.querySelector('.day-activities');
        activitiesDiv.textContent = activity;

        // 关闭活动面板
        this.closeActivityPanel();

        // 触发对应的剧情
        this.triggerScenario(activity);

        // 检查成就
        this.checkAchievements();

        // 自动保存
        if (this.gameState.settings.autoSave) {
            this.autoSave();
        }

        // 更新显示
        this.updateDisplay();
    }

    triggerScenario(activity) {
        const scenarios = gameData.scenarios[activity];
        if (scenarios && scenarios.length > 0) {
            // 随机选择一个场景
            const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
            this.showDialogue(scenario);
        }
    }

    showDialogue(scenario) {
        this.gameState.currentDialogue = scenario;
        
        const dialogueSystem = document.getElementById('dialogue-system');
        const characterImage = document.getElementById('character-image');
        const speakerName = document.getElementById('speaker-name');
        const dialogueText = document.getElementById('dialogue-text');
        const dialogueChoices = document.getElementById('dialogue-choices');

        // 设置角色立绘
        if (scenario.npc && gameData.characters[scenario.npc]) {
            characterImage.src = gameData.characters[scenario.npc].portrait;
            characterImage.style.display = 'block';
            speakerName.textContent = scenario.npc;
        } else {
            characterImage.style.display = 'none';
            speakerName.textContent = scenario.scene || '旁白';
        }

        // 设置对话文本
        dialogueText.textContent = scenario.dialogue;

        // 设置选择选项
        dialogueChoices.innerHTML = '';
        scenario.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.onclick = () => this.makeChoice(choice);
            dialogueChoices.appendChild(button);
        });

        dialogueSystem.classList.remove('hidden');
    }

    makeChoice(choice) {
        // 更新好感度
        if (choice.affectionChange) {
            Object.keys(choice.affectionChange).forEach(character => {
                this.gameState.affection[character] += choice.affectionChange[character];
                this.gameState.affection[character] = Math.max(0, Math.min(100, this.gameState.affection[character]));
            });
        }

        // 更新好感度显示
        this.updateAffectionDisplay();

        // 检查成就
        this.checkAchievements();

        // 处理下一个场景
        if (choice.next && choice.next !== 'return_to_game' && choice.next !== 'end_scene') {
            const nextScenario = gameData.continuations[choice.next];
            if (nextScenario) {
                this.showDialogue(nextScenario);
                return;
            }
        }

        // 结束对话
        this.hideDialogue();
    }

    hideDialogue() {
        document.getElementById('dialogue-system').classList.add('hidden');
        this.gameState.currentDialogue = null;
    }

    updateAffectionDisplay() {
        try {
            Object.keys(this.gameState.affection).forEach(character => {
                const value = this.gameState.affection[character];
                const meterFill = document.getElementById(`${this.getPinyinName(character)}-meter`);
                const valueSpan = document.getElementById(`${this.getPinyinName(character)}-value`);
                
                if (meterFill && valueSpan) {
                    meterFill.style.width = `${value}%`;
                    valueSpan.textContent = value;
                }
            });
        } catch (error) {
            console.error('Error in updateAffectionDisplay:', error);
        }
    }

    getPinyinName(character) {
        const mapping = {
            '顾言': 'guyan',
            '林舟': 'linzhou',
            '宋之南': 'songzhinan',
            '周奕辰': 'zhouyichen',
            '江澈': 'jiangche',
            '苏云深': 'suyunshen',
            '唐言': 'tangyan',
            '萧然': 'xiaoran'
        };
        return mapping[character] || character;
    }

    nextWeek() {
        if (this.gameState.actionPoints > 0) {
            const confirm = window.confirm(`你还有${this.gameState.actionPoints}个行动点数未使用，确定要进入下一周吗？`);
            if (!confirm) return;
        }

        this.gameState.currentWeek++;
        this.gameState.actionPoints = this.gameState.maxActionPoints;
        this.gameState.currentDay = 1;
        
        // 恢复体力
        this.gameState.player.energy = Math.min(this.gameState.player.maxEnergy, this.gameState.player.energy + 30);

        // 清空日历显示
        document.querySelectorAll('.day-activities').forEach(div => {
            div.textContent = '';
        });

        this.updateDisplay();

        // 检查成就
        this.checkAchievements();

        // 检查是否达到结局条件
        if (this.gameState.currentWeek > 12) { // 12周后结束游戏
            this.checkEndings();
        }
    }

    checkAchievements() {
        const achievements = this.gameState.achievements;
        const stats = this.gameState.statistics;
        const affection = this.gameState.affection;
        
        // 检查各项成就
        this.checkAndUnlockAchievement('first_love', () => {
            return Object.values(affection).some(value => value >= 20);
        });
        
        this.checkAndUnlockAchievement('social_butterfly', () => {
            return stats.socialActivities >= 10;
        });
        
        this.checkAndUnlockAchievement('bookworm', () => {
            return stats.studyActivities >= 10;
        });
        
        this.checkAndUnlockAchievement('leisure_lover', () => {
            return stats.leisureActivities >= 10;
        });
        
        this.checkAndUnlockAchievement('lucky_encounter', () => {
            return stats.encounterActivities >= 10;
        });
        
        this.checkAndUnlockAchievement('popular_girl', () => {
            return Object.values(affection).filter(value => value >= 40).length >= 3;
        });
        
        this.checkAndUnlockAchievement('true_love', () => {
            return Object.values(affection).some(value => value >= 100);
        });
        
        this.checkAndUnlockAchievement('perfect_student', () => {
            let consecutiveWeeks = 0;
            for (let week = 1; week <= this.gameState.currentWeek; week++) {
                if (this.gameState.weekActivities[week] && Object.keys(this.gameState.weekActivities[week]).length === 7) {
                    consecutiveWeeks++;
                    if (consecutiveWeeks >= 4) return true;
                } else {
                    consecutiveWeeks = 0;
                }
            }
            return false;
        });
    }

    checkAndUnlockAchievement(achievementId, condition) {
        const achievement = this.gameState.achievements[achievementId];
        if (!achievement.unlocked && condition()) {
            achievement.unlocked = true;
            this.showNotification(`🎉 成就解锁: ${achievement.name}`, 'success');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    quickSave() {
        try {
            const quickSaveData = {
                gameState: this.gameState,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('loveDiaryQuickSave', JSON.stringify(quickSaveData));
            this.showNotification('快速保存成功！', 'success');
        } catch (error) {
            this.showNotification('快速保存失败！', 'error');
        }
    }

    quickLoad() {
        try {
            const quickSaveData = localStorage.getItem('loveDiaryQuickSave');
            if (quickSaveData) {
                const parsedData = JSON.parse(quickSaveData);
                this.gameState = parsedData.gameState;
                this.updateDisplay();
                this.showScreen('game-main');
                this.showNotification('快速读取成功！', 'success');
            } else {
                this.showNotification('没有快速存档！', 'warning');
            }
        } catch (error) {
            this.showNotification('快速读取失败！', 'error');
        }
    }

    autoSave() {
        try {
            const autoSaveData = {
                gameState: this.gameState,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('loveDiaryAutoSave', JSON.stringify(autoSaveData));
        } catch (error) {
            console.warn('自动保存失败:', error);
        }
    }

    showAchievements() {
        this.showScreen('achievements-screen');
        this.updateAchievementsDisplay();
    }

    updateAchievementsDisplay() {
        const achievements = this.gameState.achievements;
        const achievementsList = document.getElementById('achievements-list');
        const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
        const totalCount = Object.keys(achievements).length;
        
        document.getElementById('unlocked-achievements').textContent = unlockedCount;
        document.getElementById('total-achievements').textContent = totalCount;
        document.getElementById('achievement-progress').textContent = `${Math.round(unlockedCount / totalCount * 100)}%`;
        
        achievementsList.innerHTML = '';
        Object.values(achievements).forEach(achievement => {
            const item = document.createElement('div');
            item.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            item.innerHTML = `
                <span class="achievement-icon">${achievement.icon}</span>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            `;
            achievementsList.appendChild(item);
        });
    }

    showGallery() {
        this.showScreen('gallery-screen');
        this.showGalleryTab('endings');
    }

    showGalleryTab(tab) {
        // 更新标签状态
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        const content = document.getElementById('gallery-content');
        content.innerHTML = '';
        
        switch(tab) {
            case 'endings':
                this.showEndingsGallery(content);
                break;
            case 'characters':
                this.showCharactersGallery(content);
                break;
            case 'scenes':
                this.showScenesGallery(content);
                break;
        }
    }

    showEndingsGallery(container) {
        const grid = document.createElement('div');
        grid.className = 'gallery-grid';
        
        Object.keys(gameData.endings).forEach(character => {
            Object.keys(gameData.endings[character]).forEach(endingType => {
                const ending = gameData.endings[character][endingType];
                const isUnlocked = this.gameState.gallery.endings[`${character}_${endingType}`] || false;
                
                const item = document.createElement('div');
                item.className = `gallery-item ${isUnlocked ? 'unlocked' : 'locked'}`;
                item.innerHTML = `
                    <div class="gallery-item-image">${isUnlocked ? '💕' : '❓'}</div>
                    <div class="gallery-item-title">${isUnlocked ? ending.title : '???'}</div>
                    <div class="gallery-item-description">${isUnlocked ? ending.content.substring(0, 50) + '...' : '完成对应剧情解锁'}</div>
                `;
                grid.appendChild(item);
            });
        });
        
        container.appendChild(grid);
    }

    showCharactersGallery(container) {
        const grid = document.createElement('div');
        grid.className = 'gallery-grid';
        
        Object.keys(gameData.characters).forEach(characterName => {
            const character = gameData.characters[characterName];
            const isUnlocked = this.gameState.affection[characterName] > 0;
            
            const item = document.createElement('div');
            item.className = `gallery-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            item.innerHTML = `
                <div class="gallery-item-image">${isUnlocked ? '👤' : '❓'}</div>
                <div class="gallery-item-title">${isUnlocked ? character.name : '???'}</div>
                <div class="gallery-item-description">${isUnlocked ? character.title + ' - ' + character.description : '与角色互动解锁'}</div>
            `;
            grid.appendChild(item);
        });
        
        container.appendChild(grid);
    }

    showScenesGallery(container) {
        const grid = document.createElement('div');
        grid.className = 'gallery-grid';
        
        // 示例场景收集
        const scenes = [
            { name: '初次相遇', description: '与某位角色的第一次邂逅', unlocked: this.gameState.statistics.totalActivities > 0 },
            { name: '图书馆约会', description: '在安静的图书馆中度过的美好时光', unlocked: this.gameState.statistics.studyActivities > 5 },
            { name: '雨中共伞', description: '浪漫的雨中时刻', unlocked: Object.values(this.gameState.affection).some(v => v > 30) },
            { name: '告白现场', description: '心动的告白瞬间', unlocked: Object.values(this.gameState.affection).some(v => v > 60) }
        ];
        
        scenes.forEach(scene => {
            const item = document.createElement('div');
            item.className = `gallery-item ${scene.unlocked ? 'unlocked' : 'locked'}`;
            item.innerHTML = `
                <div class="gallery-item-image">${scene.unlocked ? '🎬' : '❓'}</div>
                <div class="gallery-item-title">${scene.unlocked ? scene.name : '???'}</div>
                <div class="gallery-item-description">${scene.unlocked ? scene.description : '完成相关剧情解锁'}</div>
            `;
            grid.appendChild(item);
        });
        
        container.appendChild(grid);
    }

    showSettings() {
        this.showScreen('settings-screen');
        this.updateSettingsDisplay();
    }

    updateSettingsDisplay() {
        const settings = this.gameState.settings;
        
        document.getElementById('bgm-volume').value = settings.bgmVolume;
        document.getElementById('bgm-value').textContent = settings.bgmVolume + '%';
        
        document.getElementById('sfx-volume').value = settings.sfxVolume;
        document.getElementById('sfx-value').textContent = settings.sfxVolume + '%';
        
        document.getElementById('text-speed').value = settings.textSpeed;
        document.getElementById('auto-save').checked = settings.autoSave;
        
        // 绑定设置事件
        document.getElementById('bgm-volume').oninput = (e) => {
            this.gameState.settings.bgmVolume = parseInt(e.target.value);
            document.getElementById('bgm-value').textContent = e.target.value + '%';
        };
        
        document.getElementById('sfx-volume').oninput = (e) => {
            this.gameState.settings.sfxVolume = parseInt(e.target.value);
            document.getElementById('sfx-value').textContent = e.target.value + '%';
        };
        
        document.getElementById('text-speed').onchange = (e) => {
            this.gameState.settings.textSpeed = e.target.value;
        };
        
        document.getElementById('auto-save').onchange = (e) => {
            this.gameState.settings.autoSave = e.target.checked;
        };
    }

    resetGame() {
        if (confirm('确定要重置所有游戏数据吗？此操作不可撤销！')) {
            localStorage.removeItem('loveDiarySave');
            localStorage.removeItem('loveDiaryQuickSave');
            localStorage.removeItem('loveDiaryAutoSave');
            location.reload();
        }
    }

    checkEndings() {
        // 找到好感度最高的角色
        let maxAffection = 0;
        let bestCharacter = null;
        
        Object.keys(this.gameState.affection).forEach(character => {
            if (this.gameState.affection[character] > maxAffection) {
                maxAffection = this.gameState.affection[character];
                bestCharacter = character;
            }
        });

        if (bestCharacter && maxAffection > 0) {
            this.showEnding(bestCharacter, maxAffection);
        } else {
            this.showEnding(null, 0);
        }
    }

    showEnding(character, affection) {
        this.gameState.gameEnded = true;
        this.gameState.statistics.gamesCompleted++;
        
        const endingScreen = document.getElementById('ending-screen');
        const endingTitle = document.getElementById('ending-title');
        const endingContent = document.getElementById('ending-content');
        
        if (!character) {
            endingTitle.textContent = "单身结局";
            endingContent.textContent = "大学三年很快就过去了，虽然没有找到恋人，但你收获了知识和成长。单身也很精彩！";
            
            // 解锁单身结局
            this.gameState.gallery.endings['single'] = true;
        } else {
            const endings = gameData.endings[character];
            let ending;
            let endingType;
            
            if (affection >= 80) {
                ending = endings.sweet;
                endingType = 'sweet';
                this.checkAndUnlockAchievement('sweet_ending', () => true);
            } else if (affection >= 40) {
                ending = endings.normal;
                endingType = 'normal';
            } else {
                ending = endings.bad;
                endingType = 'bad';
            }
            
            endingTitle.textContent = ending.title;
            endingContent.textContent = ending.content;
            
            // 解锁结局到相册
            this.gameState.gallery.endings[`${character}_${endingType}`] = true;
            this.gameState.statistics.endingsUnlocked++;
        }

        // 检查收集成就
        this.checkAndUnlockAchievement('collector', () => {
            return this.gameState.statistics.endingsUnlocked >= 5;
        });
        
        this.checkAndUnlockAchievement('all_endings', () => {
            return Object.keys(this.gameState.gallery.endings).length >= 24;
        });

        // 检查快速通关成就
        this.checkAndUnlockAchievement('speedrun', () => {
            return this.gameState.currentWeek <= 6 && affection >= 80;
        });

        this.showScreen('ending-screen');
    }

    updateDisplay() {
        try {
            // 更新周数和行动点
            const currentWeekEl = document.getElementById('current-week');
            const currentActionsEl = document.getElementById('current-actions');
            const currentWeekDisplayEl = document.getElementById('current-week-display');
            
            if (currentWeekEl) currentWeekEl.textContent = `第${this.gameState.currentWeek}周`;
            if (currentActionsEl) currentActionsEl.textContent = this.gameState.actionPoints;
            if (currentWeekDisplayEl) currentWeekDisplayEl.textContent = this.gameState.currentWeek;

            // 更新玩家信息
            const playerNameEl = document.getElementById('player-display-name');
            const playerMajorEl = document.getElementById('player-display-major');
            const personalityElement = document.getElementById('player-display-personality');
            
            if (playerNameEl) playerNameEl.textContent = this.gameState.player.name || '玩家';
            if (playerMajorEl) playerMajorEl.textContent = this.gameState.player.major || '未选择专业';
            if (personalityElement) personalityElement.textContent = this.gameState.player.personality || '未选择性格';
            
            // 更新金钱和体力
            const moneyElement = document.getElementById('player-money');
            const energyElement = document.getElementById('player-energy');
            if (moneyElement) moneyElement.textContent = this.gameState.player.money;
            if (energyElement) energyElement.textContent = this.gameState.player.energy;

            // 更新好感度显示
            this.updateAffectionDisplay();
        } catch (error) {
            console.error('Error in updateDisplay:', error);
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;
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
                const parsedData = JSON.parse(saveData);
                this.gameState = parsedData.gameState;
                this.updateDisplay();
                this.showScreen('game-main');
                alert('读取存档成功！');
            } else {
                alert('没有找到存档文件！');
            }
        } catch (error) {
            alert('读取存档失败：' + error.message);
        }
    }
}

// 全局游戏实例
let game;

// 全局函数
function showCharacterCreation() {
    if (!game) {
        console.error('Game not initialized!');
        return;
    }
    game.showScreen('character-creation');
}

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

    game.gameState.player.name = name;
    game.gameState.player.major = major;
    game.gameState.player.personality = personality.value;

    game.updateDisplay();
    game.showScreen('game-main');
}

function selectActivity(activity) {
    game.selectActivity(activity);
}

function closeActivityPanel() {
    game.closeActivityPanel();
}

function nextWeek() {
    game.nextWeek();
}

function saveGame() {
    game.saveGame();
}

function loadGame() {
    game.loadGame();
}

function showMainMenu() {
    game.showScreen('main-menu');
}

function showSettings() {
    game.showSettings();
}

function showAchievements() {
    game.showAchievements();
}

function showGallery() {
    game.showGallery();
}

function showGalleryTab(tab) {
    game.showGalleryTab(tab);
}

function quickSave() {
    game.quickSave();
}

function quickLoad() {
    game.quickLoad();
}

function resetGame() {
    game.resetGame();
}

// 页面加载完成后初始化游戏
window.addEventListener('load', function() {
    console.log('Window loaded, initializing game...');
    try {
        game = new LoveDiaryGame();
        console.log('Game initialized successfully:', game);
    } catch (error) {
        console.error('Failed to initialize game:', error);
    }
});
