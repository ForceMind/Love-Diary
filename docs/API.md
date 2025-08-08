# API文档 | API Documentation

## 🎮 游戏引擎API

### 核心游戏类
```javascript
class LoveDiaryGame {
    constructor()
    // 游戏状态管理
    // 界面控制
    // 数据持久化
}
```

---

## 📊 游戏状态管理

### `gameState` 对象结构
```javascript
gameState: {
    playerName: String,           // 玩家姓名
    currentDate: Date,            // 当前游戏日期
    week: Number,                 // 当前周次
    actionPoints: Number,         // 行动点数 (0-7)
    playerStats: {                // 玩家属性
        学习: Number,             // 学习能力 (0-100)
        社交: Number,             // 社交能力 (0-100)
        艺术: Number,             // 艺术修养 (0-100)
        体力: Number              // 体力值 (0-100)
    },
    characterRelationships: {     // 角色关系
        [角色名]: {
            affection: Number,    // 好感度 (0-100)
            trust: Number,        // 信任度 (0-100)
            events: Array,        // 已触发事件
            specialEvents: Array, // 特殊事件
            lastInteraction: Date, // 最后互动时间
            interactionCount: Number // 互动次数
        }
    },
    unlockedAchievements: Array,  // 已解锁成就
    gameHistory: Array            // 游戏历史记录
}
```

### 游戏控制方法

#### `initGame()`
初始化游戏，设置默认状态
```javascript
initGame()
// 返回: void
// 用途: 游戏首次启动或重置时调用
```

#### `startNewGame()`
开始新游戏
```javascript
startNewGame()
// 返回: void
// 用途: 清除旧存档，重置游戏状态
```

#### `saveGame()`
保存游戏进度
```javascript
saveGame()
// 返回: boolean
// 成功: true, 失败: false
// 用途: 将当前游戏状态保存到localStorage
```

#### `loadGame(saveData?)`
加载游戏进度
```javascript
loadGame(saveData?: Object)
// 参数: saveData - 可选的存档数据对象
// 返回: boolean
// 成功: true, 失败: false
// 用途: 从localStorage或指定数据加载游戏状态
```

#### `resetGame()`
重置游戏状态
```javascript
resetGame()
// 返回: void
// 用途: 将游戏状态重置为初始值
```

---

## 🎨 界面控制API

### 模态窗口管理

#### `openModal(modalId)`
打开指定模态窗口
```javascript
openModal(modalId: String)
// 参数: modalId - 模态窗口的ID
// 返回: void
// 示例: game.openModal('character-creation-modal')
```

#### `closeModal(modalId)`
关闭指定模态窗口
```javascript
closeModal(modalId: String)
// 参数: modalId - 模态窗口的ID
// 返回: void
// 示例: game.closeModal('settings-modal')
```

#### `smartCloseModal(modalId)`
智能关闭模态窗口（自动导航到合适的界面）
```javascript
smartCloseModal(modalId: String)
// 参数: modalId - 模态窗口的ID
// 返回: void
// 用途: 关闭弹窗后自动判断显示主菜单或游戏界面
```

### 通知系统

#### `showGameNotification(message, type, duration?)`
显示游戏内通知
```javascript
showGameNotification(
    message: String,    // 通知消息
    type: String,       // 通知类型: 'success'|'warning'|'error'|'info'
    duration?: Number   // 显示时长(毫秒)，默认3000
)
// 返回: void
// 示例: game.showGameNotification('游戏已保存！', 'success')
```

---

## 👥 角色互动API

### 角色关系管理

#### `updateCharacterRelationship(character, affectionChange, trustChange)`
更新角色关系
```javascript
updateCharacterRelationship(
    character: String,      // 角色名称
    affectionChange: Number, // 好感度变化值
    trustChange: Number     // 信任度变化值
)
// 返回: void
// 示例: game.updateCharacterRelationship('顾言', 5, 2)
```

#### `getCharacterRelationship(character)`
获取角色关系信息
```javascript
getCharacterRelationship(character: String)
// 参数: character - 角色名称
// 返回: Object - 角色关系对象
// 示例: const relationship = game.getCharacterRelationship('顾言')
```

#### `interactWithCharacter(character)`
与指定角色互动
```javascript
interactWithCharacter(character: String)
// 参数: character - 角色名称
// 返回: void
// 用途: 开始与指定角色的互动场景
```

### 特殊事件系统

#### `checkSpecialEvents(character)`
检查角色特殊事件
```javascript
checkSpecialEvents(character: String)
// 参数: character - 角色名称
// 返回: Array - 可触发的特殊事件列表
// 用途: 根据关系值检查是否可触发特殊事件
```

#### `triggerSpecialEvent(eventId, character)`
触发特殊事件
```javascript
triggerSpecialEvent(
    eventId: String,    // 事件ID
    character: String   // 相关角色
)
// 返回: boolean
// 用途: 手动触发特定的特殊事件
```

---

## 🎲 场景系统API

### 场景生成和管理

#### `getRandomScenario(activityType)`
获取随机场景
```javascript
getRandomScenario(activityType: String)
// 参数: activityType - 活动类型 ('学习'|'社交'|'休闲'|'偶遇')
// 返回: Object|null - 场景对象或null
// 用途: 根据活动类型和条件生成合适的场景
```

#### `playScenario(scenario, activityType, availableCharacters)`
播放场景
```javascript
playScenario(
    scenario: Object,          // 场景对象
    activityType: String,      // 活动类型
    availableCharacters: Array // 可遇到的角色列表
)
// 返回: void
// 用途: 执行指定场景，显示场景界面
```

#### `showScenarioModal(scenario, character, activityType)`
显示场景模态窗口
```javascript
showScenarioModal(
    scenario: Object,      // 场景对象
    character: String|null, // 遇到的角色（可为null）
    activityType: String   // 活动类型
)
// 返回: void
// 用途: 显示场景互动界面
```

#### `handleScenarioChoice(choice, character, scenario)`
处理场景选择
```javascript
handleScenarioChoice(
    choice: Object,    // 选择对象
    character: String|null, // 相关角色
    scenario: Object   // 场景对象
)
// 返回: void
// 用途: 处理玩家在场景中的选择，应用效果
```

### 场景数据结构

#### 场景对象 (Scenario Object)
```javascript
{
    id: String,              // 场景唯一标识
    name: String,            // 场景名称
    description: String,     // 场景描述
    time?: String,           // 时间要求
    weather?: String,        // 天气条件
    mood?: String,           // 场景氛围
    rarity?: String,         // 稀有度
    requirement?: String,    // 触发条件
    choices: Array<Choice>,  // 选择列表
    randomEncounter?: {      // 随机遇到设置
        probability: Number,    // 遇到概率 (0-1)
        characters: Array<String>, // 可遇到角色
        scenario: String        // 遇到描述
    }
}
```

#### 选择对象 (Choice Object)
```javascript
{
    text: String,            // 选择文本
    effect?: Object,         // 属性影响 {属性名: 变化值}
    outcome?: String,        // 结果描述
    affectionChange?: Object, // 好感度变化 {角色名: 变化值}
    requirement?: String     // 选择条件
}
```

---

## 📅 时间系统API

### 时间管理

#### `selectDay(day)`
选择游戏日期
```javascript
selectDay(day: Number)
// 参数: day - 星期几 (1-7)
// 返回: void
// 用途: 玩家选择进行活动的日期
```

#### `randomEncounter(day)`
执行随机遇到逻辑
```javascript
randomEncounter(day: Number)
// 参数: day - 星期几 (1-7)
// 返回: void
// 用途: 根据日期执行相应的随机遇到逻辑
```

#### `nextWeek()`
进入下一周
```javascript
nextWeek()
// 返回: void
// 用途: 重置行动点数，增加周次
```

---

## 🏆 成就系统API

### 成就管理

#### `checkAchievements()`
检查成就解锁条件
```javascript
checkAchievements()
// 返回: Array - 新解锁的成就列表
// 用途: 检查当前状态是否满足任何成就的解锁条件
```

#### `unlockAchievement(achievementId)`
解锁指定成就
```javascript
unlockAchievement(achievementId: String)
// 参数: achievementId - 成就ID
// 返回: boolean
// 成功: true, 失败: false
// 用途: 手动解锁指定成就
```

#### `showAchievements()`
显示成就界面
```javascript
showAchievements()
// 返回: void
// 用途: 打开成就查看界面
```

---

## 💾 数据持久化API

### 存档管理

#### `checkAutoLoad()`
检查自动加载
```javascript
checkAutoLoad()
// 返回: boolean
// true: 有可用存档, false: 无存档
// 用途: 游戏启动时检查是否有可用的存档数据
```

#### `showAutoLoadPrompt()`
显示自动加载提示
```javascript
showAutoLoadPrompt()
// 返回: void
// 用途: 显示是否要加载存档的提示界面
```

#### `autoLoadGame()`
自动加载游戏
```javascript
autoLoadGame()
// 返回: boolean
// 用途: 自动加载localStorage中的存档数据
```

#### `validateSaveData(data)`
验证存档数据
```javascript
validateSaveData(data: Object)
// 参数: data - 存档数据对象
// 返回: boolean
// 用途: 验证存档数据的完整性和有效性
```

---

## 🔧 实用工具API

### 界面更新

#### `updateUI()`
更新用户界面
```javascript
updateUI()
// 返回: void
// 用途: 更新显示的游戏状态信息
```

#### `updateCharacterDisplay()`
更新角色显示
```javascript
updateCharacterDisplay()
// 返回: void
// 用途: 更新角色关系界面的显示
```

### 数据处理

#### `formatDate(date)`
格式化日期显示
```javascript
formatDate(date: Date)
// 参数: date - 日期对象
// 返回: String - 格式化的日期字符串
// 用途: 将日期格式化为游戏中的显示格式
```

#### `calculateWeekProgress()`
计算周进度
```javascript
calculateWeekProgress()
// 返回: Number - 进度百分比 (0-100)
// 用途: 计算当前周的完成进度
```

---

## 🚨 错误处理

### 异常处理方法

#### `handleError(error, context)`
统一错误处理
```javascript
handleError(
    error: Error,      // 错误对象
    context: String    // 错误上下文
)
// 返回: void
// 用途: 统一处理游戏中的错误
```

#### `validateGameState()`
验证游戏状态
```javascript
validateGameState()
// 返回: boolean
// 用途: 验证当前游戏状态的完整性
```

---

## 📝 使用示例

### 基础游戏流程
```javascript
// 1. 初始化游戏
const game = new LoveDiaryGame();
game.initGame();

// 2. 开始新游戏或加载存档
if (game.checkAutoLoad()) {
    game.showAutoLoadPrompt();
} else {
    game.openModal('character-creation-modal');
}

// 3. 游戏进行中
game.selectDay(1); // 选择星期一
// 系统自动执行随机遇到逻辑

// 4. 与角色互动
game.interactWithCharacter('顾言');
game.updateCharacterRelationship('顾言', 5, 2);

// 5. 保存游戏
game.saveGame();
```

### 场景处理示例
```javascript
// 获取随机场景
const scenario = game.getRandomScenario('学习');

if (scenario) {
    // 播放场景
    game.playScenario(scenario, '学习', ['顾言', '江澈']);
}
```

### 成就检查示例
```javascript
// 更新角色关系后检查成就
game.updateCharacterRelationship('顾言', 10, 5);
const newAchievements = game.checkAchievements();

if (newAchievements.length > 0) {
    newAchievements.forEach(achievement => {
        game.showGameNotification(
            `🏆 解锁新成就：${achievement.name}`, 
            'success'
        );
    });
}
```

---

📚 **注意**: 所有API方法都遵循ES6+标准，确保在支持的浏览器环境中运行。
