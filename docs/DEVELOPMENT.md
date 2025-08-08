# 开发文档 | Development Guide

## 🏗️ 项目架构

### 整体架构
```
心动日记采用前端单页应用(SPA)架构：

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    HTML 结构    │────│   CSS 样式      │────│  JavaScript     │
│   (UI Layout)   │    │  (Presentation) │    │   (Logic)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  localStorage   │
                    │   (Persistence) │
                    └─────────────────┘
```

### 核心模块

#### 1. 游戏引擎 (Game Engine)
**文件**: `assets/js/game-engine.js`

```javascript
class LoveDiaryGame {
    constructor() {
        this.gameState = {
            playerName: '',
            currentDate: new Date(),
            week: 1,
            actionPoints: 7,
            playerStats: {...},
            characterRelationships: {...}
        };
    }
    
    // 核心方法
    initGame()                  // 游戏初始化
    checkAutoLoad()             // 自动加载检测
    saveGame()                  // 游戏存档
    loadGame()                  // 游戏读档
    randomEncounter()           // 随机遇到系统
    playScenario()              // 场景播放
    updateCharacterRelationship() // 角色关系更新
}
```

#### 2. 数据管理 (Data Management)
游戏数据采用分层管理：

- **基础数据**: `game-data.js` - 角色信息、基础场景
- **扩展数据**: `expanded-game-data.js` - 70+丰富场景
- **增强系统**: `enhanced-game-data.js` - 深度互动系统

```javascript
// 数据结构示例
const gameData = {
    characters: {
        角色名: {
            name: "角色名",
            age: 21,
            description: "角色描述",
            personality: ["性格1", "性格2"],
            hobbies: ["爱好1", "爱好2"],
            portrait: "头像文件名"
        }
    },
    scenarios: {
        活动类型: [
            {
                id: "场景ID",
                name: "场景名称",
                description: "场景描述",
                choices: [...],
                randomEncounter: {...}
            }
        ]
    }
};
```

## 🔧 开发环境配置

### 1. 环境要求
- **浏览器**: 支持ES6+的现代浏览器
- **编辑器**: VS Code (推荐)
- **版本控制**: Git
- **本地服务器**: Python/Node.js/Live Server

### 2. 推荐VS Code插件
```json
{
    "recommendations": [
        "ms-vscode.live-server",        // 实时预览
        "bradlc.vscode-tailwindcss",    // CSS智能提示
        "esbenp.prettier-vscode",       // 代码格式化
        "ms-vscode.js-debug",           // JavaScript调试
        "formulahendry.auto-rename-tag", // HTML标签重命名
        "christian-kohler.path-intellisense" // 路径智能提示
    ]
}
```

### 3. 开发工作流
```bash
# 1. 启动开发服务器
npm run dev
# 或者
python -m http.server 8000

# 2. 监控文件变化
# 使用Live Server插件自动刷新

# 3. 代码格式化
npm run format
# 或者使用Prettier插件

# 4. 提交代码
git add .
git commit -m "feat: 添加新功能"
git push origin feature-branch
```

## 🎮 核心系统详解

### 1. 场景系统 (Scenario System)

#### 场景结构
```javascript
{
    id: "场景唯一标识",
    name: "场景显示名称",
    description: "场景描述文本",
    time: "时间要求(早晨/上午/下午/晚上/深夜)",
    weather: "天气条件(可选)",
    mood: "氛围设定",
    rarity: "稀有度(common/uncommon/rare/very_rare)",
    requirement: "触发条件",
    choices: [
        {
            text: "选择文本",
            effect: { 属性: 变化值 },
            outcome: "结果描述",
            affectionChange: { 角色名: 好感度变化 }
        }
    ],
    randomEncounter: {
        probability: 0.6,  // 遇到概率
        characters: ["角色1", "角色2"],  // 可遇到角色
        scenario: "遇到描述"
    }
}
```

#### 场景选择算法
```javascript
getRandomScenario(activityType) {
    // 1. 过滤符合条件的场景
    const availableScenarios = scenarios.filter(scenario => {
        return this.checkTimeRequirement(scenario.time) &&
               this.checkRequirement(scenario.requirement);
    });
    
    // 2. 根据稀有度加权
    const weightedScenarios = [];
    availableScenarios.forEach(scenario => {
        const weight = this.getRarityWeight(scenario.rarity);
        for (let i = 0; i < weight; i++) {
            weightedScenarios.push(scenario);
        }
    });
    
    // 3. 随机选择
    return weightedScenarios[Math.floor(Math.random() * weightedScenarios.length)];
}
```

### 2. 角色关系系统 (Character Relationship System)

#### 关系数据结构
```javascript
characterRelationships: {
    角色名: {
        affection: 0,      // 好感度 (0-100)
        trust: 0,          // 信任度 (0-100)
        events: [],        // 已触发事件
        specialEvents: [], // 特殊事件记录
        lastInteraction: null, // 最后互动时间
        interactionCount: 0    // 互动次数
    }
}
```

#### 关系变化算法
```javascript
updateCharacterRelationship(character, affectionChange, trustChange) {
    const relationship = this.gameState.characterRelationships[character];
    
    // 应用基础变化
    relationship.affection = Math.max(0, Math.min(100, 
        relationship.affection + affectionChange));
    relationship.trust = Math.max(0, Math.min(100, 
        relationship.trust + trustChange));
    
    // 检查特殊事件触发
    this.checkSpecialEvents(character);
    
    // 更新互动记录
    relationship.lastInteraction = new Date();
    relationship.interactionCount++;
    
    // 保存变化
    this.saveGame();
}
```

### 3. 存档系统 (Save System)

#### 存档数据结构
```javascript
{
    version: "2.0.0",
    saveDate: "2024-12-21T10:30:00.000Z",
    gameState: {
        playerName: "玩家名",
        currentDate: "2024-12-21",
        week: 3,
        actionPoints: 5,
        playerStats: {
            学习: 45,
            社交: 32,
            艺术: 28,
            体力: 38
        },
        characterRelationships: {...},
        unlockedAchievements: [...],
        gameHistory: [...]
    }
}
```

#### 自动加载逻辑
```javascript
checkAutoLoad() {
    const saveData = localStorage.getItem('loveDiarySave');
    if (saveData) {
        try {
            const parsed = JSON.parse(saveData);
            if (this.validateSaveData(parsed)) {
                this.showAutoLoadPrompt();
                return true;
            }
        } catch (error) {
            console.error('存档数据损坏:', error);
        }
    }
    return false;
}
```

## 🎨 UI/UX 设计

### 1. 色彩方案
```css
:root {
    /* 主色调 - 粉色系 */
    --primary-pink: #ff8fab;
    --light-pink: #ffb3c6;
    --soft-pink: #fff0f3;
    
    /* 辅助色 */
    --accent-purple: #d63384;
    --warm-white: #fff5f5;
    --text-gray: #5a5a5a;
    
    /* 功能色 */
    --success-green: #28a745;
    --warning-orange: #ffc107;
    --error-red: #dc3545;
}
```

### 2. 动画效果
```css
/* 模态窗口动画 */
@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 按钮悬停效果 */
.choice-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 139, 171, 0.4);
}

/* 漂浮爱心动画 */
@keyframes floatHeart {
    0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
    }
    15% {
        transform: translateY(85vh) scale(1);
        opacity: 1;
    }
    85% {
        opacity: 1;
    }
    100% {
        transform: translateY(-10vh) scale(0);
        opacity: 0;
    }
}
```

### 3. 响应式设计
```css
/* 移动端适配 */
@media (max-width: 768px) {
    .modal-content {
        max-width: 90%;
        margin: 10% auto;
    }
    
    .character-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }
    
    .timeline-container {
        padding: 10px;
    }
}

/* 平板适配 */
@media (min-width: 769px) and (max-width: 1024px) {
    .modal-content {
        max-width: 80%;
    }
    
    .character-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

## 🧪 测试策略

### 1. 功能测试清单
```markdown
## 基础功能测试
- [ ] 游戏启动和初始化
- [ ] 角色创建流程
- [ ] 存档/读档功能
- [ ] 自动加载检测

## 互动系统测试
- [ ] 场景随机生成
- [ ] 选择结果应用
- [ ] 角色关系变化
- [ ] 特殊事件触发

## UI/UX测试
- [ ] 模态窗口显示/隐藏
- [ ] 动画效果流畅性
- [ ] 响应式设计适配
- [ ] 跨浏览器兼容性

## 数据完整性测试
- [ ] 存档数据完整性
- [ ] 版本兼容性
- [ ] 异常数据处理
```

### 2. 调试工具
```javascript
// 开发者调试功能
if (window.location.hostname === 'localhost') {
    // 调试模式
    window.gameDebug = {
        // 直接修改属性
        setAffection: (character, value) => {
            game.gameState.characterRelationships[character].affection = value;
        },
        
        // 触发特定场景
        triggerScenario: (scenarioId) => {
            // 实现场景触发逻辑
        },
        
        // 解锁所有成就
        unlockAllAchievements: () => {
            // 实现成就解锁逻辑
        }
    };
}
```

## 📈 性能优化

### 1. 代码优化
```javascript
// 防抖函数避免频繁操作
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用对象池避免频繁创建对象
class ScenarioPool {
    constructor() {
        this.pool = [];
    }
    
    getScenario() {
        return this.pool.pop() || this.createNewScenario();
    }
    
    releaseScenario(scenario) {
        this.resetScenario(scenario);
        this.pool.push(scenario);
    }
}
```

### 2. 资源优化
```javascript
// 图片懒加载
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}
```

## 🔐 安全考虑

### 1. 数据验证
```javascript
// 存档数据验证
function validateSaveData(data) {
    const requiredFields = ['version', 'saveDate', 'gameState'];
    const hasRequiredFields = requiredFields.every(field => 
        data.hasOwnProperty(field));
    
    if (!hasRequiredFields) return false;
    
    // 版本兼容性检查
    const currentVersion = "2.0.0";
    if (!isVersionCompatible(data.version, currentVersion)) {
        return false;
    }
    
    return true;
}
```

### 2. XSS防护
```javascript
// 安全的文本显示
function safeSetTextContent(element, text) {
    element.textContent = text; // 使用textContent而不是innerHTML
}

// 输入过滤
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}
```

## 📚 API文档

### 游戏引擎API
```javascript
// 游戏控制API
game.startNewGame()           // 开始新游戏
game.loadGame(saveData)       // 加载游戏
game.saveGame()               // 保存游戏
game.resetGame()              // 重置游戏

// 界面控制API
game.openModal(modalId)       // 打开模态窗口
game.closeModal(modalId)      // 关闭模态窗口
game.showGameNotification(text, type) // 显示游戏通知

// 角色互动API
game.interactWithCharacter(character) // 与角色互动
game.updateCharacterRelationship(character, affection, trust) // 更新关系

// 场景系统API
game.getRandomScenario(type)  // 获取随机场景
game.playScenario(scenario)   // 播放场景
```

## 🔄 扩展指南

### 添加新角色
1. 在 `gameData.characters` 中添加角色数据
2. 准备角色头像图片 (推荐 400x400px PNG格式)
3. 在各个场景中添加该角色的遇到可能性
4. 编写角色专属的互动场景

### 添加新场景
1. 确定场景类型 (学习/社交/休闲/偶遇)
2. 编写场景数据结构
3. 设计多个选择分支
4. 测试场景触发条件和效果

### 添加新功能
1. 在游戏引擎中添加相应方法
2. 更新UI界面
3. 添加相应的CSS样式
4. 更新存档数据结构 (如需要)
5. 编写测试用例

---

📝 **注意**: 修改核心系统前请务必备份，建议在功能分支上开发新特性。
