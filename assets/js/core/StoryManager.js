/**
 * 心动日记 - 故事管理器
 * 负责处理所有故事相关的逻辑：对话、选择、剧情分支等
 */
class StoryManager {
    constructor(gameLogic) {
        this.gameLogic = gameLogic;
        this.engine = gameLogic.engine;
        this.currentStory = null;
        this.storyHistory = [];
    }

    /**
     * 开始故事
     * @param {string} characterName - 角色名称
     * @param {string} activityId - 活动ID
     * @param {string} storyType - 故事类型（first_meeting/interaction）
     */
    startStory(characterName, activityId, storyType) {
        console.log(`开始故事: ${characterName} - ${activityId} - ${storyType}`);
        
        this.currentStory = {
            characterName,
            activityId,
            storyType,
            round: 1,
            choices: [],
            effects: {}
        };

        this.showStoryRound(1);
    }

    /**
     * 显示故事轮次
     */
    showStoryRound(round) {
        const storyContent = this.getStoryContent(
            this.currentStory.characterName, 
            this.currentStory.activityId, 
            this.currentStory.storyType, 
            round
        );

        if (!storyContent) {
            console.error('故事内容不存在');
            this.endStory();
            return;
        }

        this.displayStoryModal(storyContent, round);
    }

    /**
     * 获取故事内容
     */
    getStoryContent(characterName, activityId, storyType, round) {
        try {
            // 从GameData中获取故事数据
            const storyData = GameData.storyData[storyType];
            if (!storyData || !storyData[characterName] || !storyData[characterName][round]) {
                console.warn(`故事内容缺失: ${characterName} - ${storyType} - 第${round}轮`);
                return this.generateFallbackContent(characterName, activityId, storyType, round);
            }

            const content = storyData[characterName][round];
            
            // 动态替换玩家信息
            return this.processStoryContent(content);
        } catch (error) {
            console.error('获取故事内容失败:', error);
            return this.generateFallbackContent(characterName, activityId, storyType, round);
        }
    }

    /**
     * 处理故事内容（替换变量等）
     */
    processStoryContent(content) {
        const processedContent = JSON.parse(JSON.stringify(content)); // 深拷贝
        const playerName = this.gameLogic.gameState.player.name;
        const playerMajor = this.gameLogic.gameState.player.major;

        // 替换描述中的变量
        if (processedContent.description) {
            processedContent.description = processedContent.description
                .replace(/\$\{playerName\}/g, playerName)
                .replace(/\$\{playerMajor\}/g, playerMajor);
        }

        // 替换对话中的变量
        if (processedContent.dialogue) {
            processedContent.dialogue = processedContent.dialogue
                .replace(/\$\{playerName\}/g, playerName)
                .replace(/\$\{playerMajor\}/g, playerMajor);
        }

        // 替换选择项中的变量
        if (processedContent.choices) {
            processedContent.choices.forEach(choice => {
                choice.text = choice.text
                    .replace(/我叫.*?，/g, `我叫${playerName}，`)
                    .replace(/我是.*?系的/g, `我是${playerMajor}系的`);
            });
        }

        return processedContent;
    }

    /**
     * 生成后备内容
     */
    generateFallbackContent(characterName, activityId, storyType, round) {
        const character = GameData.characters[characterName];
        const isFirstMeeting = storyType === 'first_meeting';
        
        return {
            description: isFirstMeeting 
                ? `你遇到了${characterName}，${character.description}`
                : `你和${characterName}进行了愉快的互动。`,
            dialogue: isFirstMeeting 
                ? "你好，很高兴认识你。"
                : "又见面了呢。",
            choices: [
                {
                    text: "继续对话",
                    effect: { affection: 1, trust: 1 },
                    next: "end"
                }
            ]
        };
    }

    /**
     * 显示故事弹窗
     */
    displayStoryModal(storyContent, round) {
        const characterName = this.currentStory.characterName;
        const character = GameData.characters[characterName];
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                // 设置标题
                if (titleElement) {
                    const titleText = this.currentStory.storyType === 'first_meeting' 
                        ? `初次相遇 - ${characterName}` 
                        : `与${characterName}的互动`;
                    titleElement.textContent = titleText;
                }
                
                // 设置描述内容
                if (descElement) {
                    descElement.innerHTML = this.generateStoryHTML(character, storyContent, round);
                }
                
                // 设置选择按钮
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    this.createChoiceButtons(storyContent.choices, choicesElement);
                }
            }
        });
    }

    /**
     * 生成故事HTML内容
     */
    generateStoryHTML(character, storyContent, round) {
        const portraitPath = `assets/images/${character.portrait}`;
        
        return `
            <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px;">
                <div class="character-portrait" style="width: 80px; height: 80px; flex-shrink: 0;">
                    <img src="${portraitPath}" alt="${character.name}" 
                         style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid #ff8fab;" 
                         onerror="this.style.display='none'">
                </div>
                <div style="flex: 1;">
                    <h4 style="color: #ff6b9d; margin: 0 0 10px 0; font-size: 18px;">
                        ${character.name} 
                        <span style="font-size: 12px; color: #999; font-weight: normal;">${character.title}</span>
                    </h4>
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

    /**
     * 创建选择按钮
     */
    createChoiceButtons(choices, container) {
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            
            // 生成选择按钮HTML
            button.innerHTML = `
                <div style="text-align: left; line-height: 1.4;">
                    ${choice.text}
                    ${choice.hint ? `<div style="font-size: 11px; color: #888; margin-top: 4px;">${choice.hint}</div>` : ''}
                    ${this.generateEffectPreview(choice.effect)}
                </div>
            `;
            
            // 绑定点击事件
            button.addEventListener('click', () => {
                this.handleChoice(choice);
            });
            
            container.appendChild(button);
        });
    }

    /**
     * 生成效果预览
     */
    generateEffectPreview(effect) {
        if (!effect || Object.keys(effect).length === 0) return '';
        
        const effectTexts = [];
        Object.keys(effect).forEach(key => {
            const value = effect[key];
            if (value > 0) {
                effectTexts.push(`<span style="color: #4caf50;">${key} +${value}</span>`);
            } else if (value < 0) {
                effectTexts.push(`<span style="color: #f44336;">${key} ${value}</span>`);
            }
        });
        
        if (effectTexts.length === 0) return '';
        
        return `<div style="font-size: 10px; margin-top: 4px; color: #888;">${effectTexts.join(' ')}</div>`;
    }

    /**
     * 处理选择
     */
    handleChoice(choice) {
        console.log('处理选择:', choice);
        
        // 记录选择
        this.currentStory.choices.push(choice);
        
        // 应用即时效果
        this.applyChoiceEffects(choice.effect);
        
        // 检查下一步
        if (choice.next === 'end') {
            this.endStory();
        } else if (typeof choice.next === 'number') {
            this.showStoryRound(choice.next);
        } else {
            // 特殊结局或其他处理
            this.handleSpecialNext(choice.next);
        }
    }

    /**
     * 应用选择效果
     */
    applyChoiceEffects(effects) {
        if (!effects) return;
        
        const characterName = this.currentStory.characterName;
        const relationshipChanges = {};
        const statChanges = {};
        
        // 分类效果
        Object.keys(effects).forEach(key => {
            if (['affection', 'trust', 'impression', 'intimacy'].includes(key)) {
                relationshipChanges[key] = effects[key];
            } else if (this.gameLogic.gameState.playerStats[key] !== undefined) {
                statChanges[key] = effects[key];
            }
        });
        
        // 应用关系变化
        if (Object.keys(relationshipChanges).length > 0) {
            this.gameLogic.updateCharacterRelationship(characterName, relationshipChanges);
        }
        
        // 应用属性变化
        if (Object.keys(statChanges).length > 0) {
            this.gameLogic.applyStatEffects(statChanges);
        }
        
        // 累积到当前故事效果中
        Object.keys(effects).forEach(key => {
            this.currentStory.effects[key] = (this.currentStory.effects[key] || 0) + effects[key];
        });
    }

    /**
     * 处理特殊下一步
     */
    handleSpecialNext(next) {
        switch (next) {
            case 'special_event':
                this.triggerSpecialEvent();
                break;
            case 'bad_end':
                this.showBadEnding();
                break;
            default:
                console.warn('未知的下一步类型:', next);
                this.endStory();
        }
    }

    /**
     * 结束故事
     */
    endStory() {
        console.log('故事结束');
        
        // 更新角色认识状态
        this.updateCharacterMeetStatus();
        
        // 记录故事到历史
        this.storyHistory.push({ ...this.currentStory, endTime: Date.now() });
        
        // 显示结果
        this.showStoryResult();
    }

    /**
     * 更新角色认识状态
     */
    updateCharacterMeetStatus() {
        const characterName = this.currentStory.characterName;
        const meetStatus = this.gameLogic.gameState.characterMeetStatus[characterName];
        
        if (this.currentStory.storyType === 'first_meeting') {
            meetStatus.met = true;
            meetStatus.meetWeek = this.gameLogic.gameState.currentWeek;
        }
        
        // 提升亲密等级
        meetStatus.intimacyLevel = Math.min(10, meetStatus.intimacyLevel + 1);
        meetStatus.lastInteraction = this.gameLogic.gameState.currentWeek;
    }

    /**
     * 显示故事结果
     */
    showStoryResult() {
        const characterName = this.currentStory.characterName;
        const relationship = this.gameLogic.gameState.characterRelationships[characterName];
        const meetStatus = this.gameLogic.gameState.characterMeetStatus[characterName];
        const isFirstMeeting = this.currentStory.storyType === 'first_meeting';
        
        this.engine.showModal('scenario-modal', {
            onShow: (modal) => {
                const titleElement = modal.querySelector('.scenario-title');
                const descElement = modal.querySelector('.scenario-description');
                const choicesElement = modal.querySelector('.scenario-choices');
                
                if (titleElement) {
                    titleElement.textContent = isFirstMeeting ? '初次相遇完成' : '互动完成';
                }
                
                if (descElement) {
                    descElement.innerHTML = this.generateResultHTML(
                        characterName, relationship, meetStatus, isFirstMeeting
                    );
                }
                
                if (choicesElement) {
                    choicesElement.innerHTML = '';
                    
                    const continueBtn = document.createElement('button');
                    continueBtn.className = 'choice-btn';
                    continueBtn.textContent = '继续游戏';
                    continueBtn.addEventListener('click', () => {
                        this.engine.closeModal('scenario-modal');
                        this.gameLogic.finishActivity();
                    });
                    
                    choicesElement.appendChild(continueBtn);
                }
            }
        });
    }

    /**
     * 生成结果HTML
     */
    generateResultHTML(characterName, relationship, meetStatus, isFirstMeeting) {
        const activityName = this.getActivityName(this.currentStory.activityId);
        
        return `
            <div style="text-align: center;">
                <div style="font-size: 40px; margin-bottom: 15px;">${isFirstMeeting ? '💫' : '✨'}</div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <h4 style="color: #ff6b9d; margin-bottom: 15px;">
                        ${isFirstMeeting ? `认识了${characterName}！` : `与${characterName}度过了愉快的时光`}
                    </h4>
                    <p style="line-height: 1.6; color: #555; margin-bottom: 15px;">
                        ${isFirstMeeting ? 
                            `通过这次${activityName}，你认识了${characterName}。他给你留下了很好的印象。` :
                            `你们的关系在这次${activityName}中得到了进一步发展。`
                        }
                    </p>
                    <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8e8 100%); padding: 15px; border-radius: 10px;">
                        <h4 style="color: #2e7d32; margin-bottom: 10px;">💖 关系变化</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; text-align: left;">
                            <p style="color: #4caf50; margin: 2px 0;">好感度: ${relationship.affection}</p>
                            <p style="color: #4caf50; margin: 2px 0;">信任度: ${relationship.trust}</p>
                            <p style="color: #4caf50; margin: 2px 0;">印象分: ${relationship.impression || 0}</p>
                            <p style="color: #ff9800; margin: 2px 0;">亲密等级: ${meetStatus.intimacyLevel}</p>
                        </div>
                        ${this.generateEffectSummary()}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 生成效果总结
     */
    generateEffectSummary() {
        const effects = this.currentStory.effects;
        if (!effects || Object.keys(effects).length === 0) return '';
        
        const effectTexts = [];
        Object.keys(effects).forEach(key => {
            const value = effects[key];
            if (value !== 0) {
                effectTexts.push(`${key}: ${value > 0 ? '+' : ''}${value}`);
            }
        });
        
        if (effectTexts.length === 0) return '';
        
        return `
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd;">
                <small style="color: #666;">本次互动效果: ${effectTexts.join(', ')}</small>
            </div>
        `;
    }

    /**
     * 获取活动名称
     */
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

    /**
     * 触发特殊事件
     */
    triggerSpecialEvent() {
        // 实现特殊事件逻辑
        console.log('触发特殊事件');
        this.endStory();
    }

    /**
     * 显示坏结局
     */
    showBadEnding() {
        // 实现坏结局逻辑
        console.log('触发坏结局');
        this.endStory();
    }

    /**
     * 获取故事历史
     */
    getStoryHistory() {
        return this.storyHistory;
    }

    /**
     * 获取与特定角色的互动次数
     */
    getInteractionCount(characterName) {
        return this.storyHistory.filter(story => 
            story.characterName === characterName
        ).length;
    }

    /**
     * 检查是否已经发生特定故事
     */
    hasStoryOccurred(characterName, storyType) {
        return this.storyHistory.some(story => 
            story.characterName === characterName && story.storyType === storyType
        );
    }
}
