# 贡献指南 | Contributing Guide

感谢您对"心动日记｜Love Diary"项目的兴趣！我们欢迎各种形式的贡献，无论是代码、文档、设计还是反馈建议。

## 🤝 贡献方式

### 🐛 报告Bug
如果您发现了游戏中的错误，请：
1. 查看 [Issues](https://github.com/ForceMind/Love-Diary/issues) 确认问题未被报告
2. 创建新的Issue，详细描述问题
3. 提供复现步骤和环境信息

### ✨ 功能建议
对游戏有新的想法？
1. 在Issues中创建功能请求
2. 详细描述功能需求和预期效果
3. 讨论实现方案的可行性

### 💻 代码贡献
准备提交代码？请遵循以下流程：
1. Fork项目到您的GitHub账户
2. 创建功能分支
3. 编写代码并测试
4. 提交Pull Request

### 📝 文档改进
帮助完善项目文档：
- 修复文档中的错误
- 添加使用示例
- 改进API文档
- 翻译文档到其他语言

### 🎨 设计贡献
设计相关的贡献：
- UI/UX优化建议
- 角色立绘设计
- 界面图标设计
- 游戏背景音乐

## 📋 开发规范

### 代码风格

#### JavaScript规范
```javascript
// 使用驼峰命名法
const gameEngine = new LoveDiaryGame();

// 函数命名清晰明确
function updateCharacterRelationship(character, affection) {
    // 实现逻辑
}

// 使用const/let而不是var
const GAME_VERSION = "2.0.0";
let currentPlayer = null;

// 注释重要逻辑
/**
 * 计算角色好感度变化
 * @param {string} character - 角色名称
 * @param {number} change - 变化值
 * @returns {number} 新的好感度值
 */
function calculateAffectionChange(character, change) {
    // 实现计算逻辑
}
```

#### CSS规范
```css
/* 使用BEM命名约定 */
.modal__content {
    /* 样式规则 */
}

.modal__content--active {
    /* 修饰符样式 */
}

/* 变量命名清晰 */
:root {
    --primary-color: #ff8fab;
    --secondary-color: #ffb3c6;
}

/* 注释重要样式 */
/* 游戏主色调渐变背景 */
.game-background {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}
```

#### HTML规范
```html
<!-- 语义化标签 -->
<main class="game-container">
    <section class="character-selection">
        <h2>选择角色</h2>
        <!-- 角色列表 -->
    </section>
</main>

<!-- 适当的注释 -->
<!-- 角色互动弹窗 -->
<div id="character-modal" class="modal">
    <!-- 弹窗内容 -->
</div>
```

### 提交规范

#### Commit Message格式
使用[约定式提交](https://www.conventionalcommits.org/)格式：

```
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

#### 类型说明
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

#### 示例
```bash
feat(character): 添加新角色萧然的互动场景

- 新增萧然的个人资料和背景故事
- 添加5个专属互动场景
- 更新角色选择界面

Closes #23
```

### 分支管理

#### 分支命名规范
```bash
# 功能分支
feature/character-interaction-system
feature/save-system-enhancement

# 修复分支
fix/modal-display-issue
fix/character-relationship-bug

# 文档分支
docs/api-documentation
docs/deployment-guide

# 热修复分支
hotfix/critical-save-bug
```

#### 分支工作流
```bash
# 1. 从main分支创建功能分支
git checkout main
git pull origin main
git checkout -b feature/new-character-system

# 2. 开发功能
# ... 编写代码 ...

# 3. 提交更改
git add .
git commit -m "feat(character): 添加新角色系统"

# 4. 推送分支
git push origin feature/new-character-system

# 5. 创建Pull Request
```

## 🔍 代码审查

### Pull Request规范

#### PR标题格式
```
[类型] 简短描述功能或修复内容

示例：
[Feature] 添加角色好感度系统
[Fix] 修复存档读取失败问题
[Docs] 更新API文档
```

#### PR描述模板
```markdown
## 📝 描述
简要描述这个PR的目的和内容

## 🔄 变更类型
- [ ] Bug修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化

## 📋 变更清单
- [ ] 添加了什么功能
- [ ] 修复了什么问题
- [ ] 更新了什么内容

## 🧪 测试
- [ ] 功能测试通过
- [ ] 兼容性测试通过
- [ ] 性能测试通过

## 📷 截图/演示
如果有UI变更，请提供截图或GIF演示

## 📚 相关Issue
Closes #issue编号
```

### 代码审查要点

#### 功能性审查
- [ ] 功能是否按预期工作
- [ ] 是否有边界情况处理
- [ ] 错误处理是否完善
- [ ] 性能是否可接受

#### 代码质量审查
- [ ] 代码风格是否一致
- [ ] 命名是否清晰
- [ ] 注释是否充分
- [ ] 是否有重复代码

#### 安全性审查
- [ ] 输入验证是否充分
- [ ] 是否有XSS风险
- [ ] 存储数据是否安全

## 🧪 测试指南

### 测试类型

#### 功能测试
```javascript
// 测试角色关系更新
function testCharacterRelationshipUpdate() {
    const game = new LoveDiaryGame();
    game.initGame();
    
    // 测试好感度增加
    game.updateCharacterRelationship('顾言', 10, 5);
    const relationship = game.getCharacterRelationship('顾言');
    
    console.assert(relationship.affection === 10, '好感度更新失败');
    console.assert(relationship.trust === 5, '信任度更新失败');
}
```

#### 界面测试
```javascript
// 测试模态窗口显示
function testModalDisplay() {
    const game = new LoveDiaryGame();
    
    // 测试打开模态窗口
    game.openModal('character-creation-modal');
    const modal = document.getElementById('character-creation-modal');
    console.assert(modal.classList.contains('active'), '模态窗口未正确显示');
    
    // 测试关闭模态窗口
    game.closeModal('character-creation-modal');
    console.assert(!modal.classList.contains('active'), '模态窗口未正确关闭');
}
```

#### 存档测试
```javascript
// 测试存档功能
function testSaveLoad() {
    const game = new LoveDiaryGame();
    game.initGame();
    
    // 设置测试数据
    game.gameState.playerName = '测试玩家';
    game.gameState.week = 3;
    
    // 测试保存
    const saveResult = game.saveGame();
    console.assert(saveResult === true, '游戏保存失败');
    
    // 测试加载
    const newGame = new LoveDiaryGame();
    const loadResult = newGame.loadGame();
    console.assert(loadResult === true, '游戏加载失败');
    console.assert(newGame.gameState.playerName === '测试玩家', '数据加载不正确');
}
```

### 测试清单

#### 新功能测试
- [ ] 核心功能正常工作
- [ ] 边界情况处理正确
- [ ] 错误情况有适当提示
- [ ] 界面显示正确
- [ ] 移动端适配良好

#### 回归测试
- [ ] 现有功能未受影响
- [ ] 存档兼容性正常
- [ ] 角色互动系统正常
- [ ] 场景系统正常
- [ ] 成就系统正常

#### 兼容性测试
- [ ] Chrome浏览器
- [ ] Firefox浏览器
- [ ] Safari浏览器
- [ ] Edge浏览器
- [ ] 移动端浏览器

## 📦 发布流程

### 版本号规范
使用[语义化版本](https://semver.org/)：
- `主版本号.次版本号.修订号`
- 主版本号：不兼容的API修改
- 次版本号：向下兼容的功能新增
- 修订号：向下兼容的问题修正

### 发布步骤
```bash
# 1. 确保在main分支
git checkout main
git pull origin main

# 2. 更新版本号
# 编辑version.json和package.json

# 3. 更新CHANGELOG
# 记录本版本的所有变更

# 4. 提交版本更新
git add .
git commit -m "chore: 发布版本v2.1.0"

# 5. 创建标签
git tag v2.1.0

# 6. 推送到远程
git push origin main --tags

# 7. 创建GitHub Release
# 在GitHub上创建新的Release
```

## 🎯 开发任务

### 当前优先级任务
1. **高优先级**
   - Bug修复
   - 性能优化
   - 安全问题

2. **中优先级**
   - 新角色添加
   - 场景扩展
   - UI/UX改进

3. **低优先级**
   - 功能增强
   - 代码重构
   - 文档完善

### 待开发功能
- [ ] 语音系统
- [ ] 多语言支持
- [ ] 主题系统
- [ ] 数据统计
- [ ] 社交分享
- [ ] 云存档

## 💬 社区交流

### 讨论渠道
- **GitHub Issues**: 技术问题和功能讨论
- **GitHub Discussions**: 社区交流和想法分享
- **Pull Requests**: 代码审查和技术讨论

### 交流礼仪
- 保持友善和尊重
- 提供有建设性的反馈
- 详细描述问题和想法
- 耐心等待回复

## 🏆 贡献者认可

### 贡献类型认可
- **代码贡献者**: 提交有效PR的开发者
- **问题报告者**: 报告重要bug的用户
- **文档贡献者**: 改进文档的贡献者
- **设计贡献者**: 提供设计资源的创作者
- **测试贡献者**: 帮助测试的志愿者

### 贡献者列表
我们会在README中维护贡献者列表，感谢每一位贡献者的付出！

## 📄 许可证

通过为此项目做贡献，您同意您的贡献将在MIT许可证下授权。

---

🎉 **再次感谢您的贡献！您的每一份努力都让这个项目变得更好！**

如有任何问题，欢迎在Issues中提出或直接联系项目维护者。
