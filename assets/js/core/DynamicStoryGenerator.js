/**
 * DynamicStoryGenerator
 * 根据角色背景批量生成交互与对话（占位随机模板，可后续精修）
 */
class DynamicStoryGenerator {
    constructor(gameLogic) {
        this.logic = gameLogic;
        this.characters = GameData.characters;
        this.generated = false;
    }

    generateIfNeeded() {
        if (this.generated) return;
        GameData.dynamicStories = { interactions: {}, dialogues: {} };
        Object.keys(this.characters).forEach(name => {
            GameData.dynamicStories.interactions[name] = this.buildInteractions(name, 520); // 500+
            GameData.dynamicStories.dialogues[name] = this.buildDialogues(name, 320);     // 300+
        });
        this.generated = true;
        console.log('[DynamicStoryGenerator] 批量动态剧情生成完成');
    }

    pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    buildInteractions(name, count) {
        const c = this.characters[name];
        const tags = [...c.personality, ...c.hobbies.slice(0,3)];
        const list = [];
        for (let i=0;i<count;i++) {
            const tag = this.pick(tags);
            list.push({
                id: `${name}_inter_${i}`,
                summary: `${tag}情境交互 #${i+1}`,
                description: `你与${name}围绕“${tag}”展开了一段简短互动。${c.title}的气质在这一刻显得尤其鲜明。`,
                choices: [
                    { text: '积极回应', effect: { affection: 1, trust: 1 } },
                    { text: '认真倾听', effect: { trust: 2 } },
                    { text: '幽默回应', effect: { affection: 2, impression: 1 } }
                ]
            });
        }
        return list;
    }

    buildDialogues(name, count) {
        const c = this.characters[name];
        const seeds = [...c.dreams, ...c.fears, ...c.favoriteThings];
        const list = [];
        for (let i=0;i<count;i++) {
            const topic = this.pick(seeds);
            list.push({
                id: `${name}_dlg_${i}`,
                line: `${name} 提到关于“${topic}”的想法，声音里带着细微情绪。`,
                mood: this.pick(['平静','认真','轻松','感性','犹豫','愉悦'])
            });
        }
        return list;
    }
}
