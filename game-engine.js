// 游戏引擎核心代码
class LoveDiaryGame {
    constructor() {
        this.gameState = {
            player: {
                name: "",
                major: "",
                personality: ""
            },
            currentWeek: 1,
            currentDay: 1,
            actionPoints: 2,
            maxActionPoints: 2,
            affection: {
                顾言: 0,
                林舟: 0,
                宋之南: 0,
                周奕辰: 0
            },
            weekActivities: {},
            currentDialogue: null,
            gameEnded: false
        };
        
        this.currentScreen = 'main-menu';
        this.selectedDay = null;
        this.init();
    }

    init() {
        this.updateDisplay();
        this.bindEvents();
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

        // 消耗行动点
        this.gameState.actionPoints--;
        
        // 记录活动
        if (!this.gameState.weekActivities[this.gameState.currentWeek]) {
            this.gameState.weekActivities[this.gameState.currentWeek] = {};
        }
        this.gameState.weekActivities[this.gameState.currentWeek][this.selectedDay] = activity;

        // 更新日历显示
        const daySlot = document.querySelector(`[data-day="${this.selectedDay}"]`);
        const activitiesDiv = daySlot.querySelector('.day-activities');
        activitiesDiv.textContent = activity;

        // 关闭活动面板
        this.closeActivityPanel();

        // 触发对应的剧情
        this.triggerScenario(activity);

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
        Object.keys(this.gameState.affection).forEach(character => {
            const value = this.gameState.affection[character];
            const meterFill = document.getElementById(`${this.getPinyinName(character)}-meter`);
            const valueSpan = document.getElementById(`${this.getPinyinName(character)}-value`);
            
            if (meterFill && valueSpan) {
                meterFill.style.width = `${value}%`;
                valueSpan.textContent = value;
            }
        });
    }

    getPinyinName(character) {
        const mapping = {
            '顾言': 'guyan',
            '林舟': 'linzhou',
            '宋之南': 'songzhinan',
            '周奕辰': 'zhouyichen'
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

        // 清空日历显示
        document.querySelectorAll('.day-activities').forEach(div => {
            div.textContent = '';
        });

        this.updateDisplay();

        // 检查是否达到结局条件
        if (this.gameState.currentWeek > 12) { // 12周后结束游戏
            this.checkEndings();
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
        
        const endingScreen = document.getElementById('ending-screen');
        const endingTitle = document.getElementById('ending-title');
        const endingContent = document.getElementById('ending-content');
        
        if (!character) {
            endingTitle.textContent = "单身结局";
            endingContent.textContent = "大学三年很快就过去了，虽然没有找到恋人，但你收获了知识和成长。单身也很精彩！";
        } else {
            const endings = gameData.endings[character];
            let ending;
            
            if (affection >= 80) {
                ending = endings.sweet;
            } else if (affection >= 40) {
                ending = endings.normal;
            } else {
                ending = endings.bad;
            }
            
            endingTitle.textContent = ending.title;
            endingContent.textContent = ending.content;
        }

        this.showScreen('ending-screen');
    }

    updateDisplay() {
        // 更新周数和行动点
        document.getElementById('current-week').textContent = `第${this.gameState.currentWeek}周`;
        document.getElementById('current-actions').textContent = this.gameState.actionPoints;

        // 更新玩家信息
        document.getElementById('player-display-name').textContent = this.gameState.player.name || '玩家';
        document.getElementById('player-display-major').textContent = this.gameState.player.major || '未选择专业';

        // 更新好感度显示
        this.updateAffectionDisplay();
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
    alert('设置功能敬请期待！');
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    game = new LoveDiaryGame();
});
