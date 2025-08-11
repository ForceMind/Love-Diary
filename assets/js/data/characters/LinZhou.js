// 林舟角色故事数据
window.LinZhouStoryData = {
  first_meeting: {
    1: {
      description: "你在操场边散步时，一个篮球突然滚到你脚边。一个阳光男孩跑过来。",
      dialogue: "不好意思，球跑远了！我是林舟，体育系的。你也是新生吗？",
      choices: [
        { text: "递还篮球并自我介绍", effect: { affection: 2 }, next: 2 },
        { text: "微笑点头", effect: { affection: 1 }, next: 2 },
        { text: "有些害羞地说是", effect: { trust: 1 }, next: 2 }
      ]
    },
    2: {
      description: "林舟接过篮球，露出灿烂的笑容。",
      dialogue: "刚开学不习惯吧？我可以带你熟悉校园。你平时喜欢运动吗？",
      choices: [
        { text: "喜欢，尤其是篮球", effect: { affection: 2 }, next: 3 },
        { text: "偶尔锻炼", effect: { trust: 1 }, next: 3 },
        { text: "不太运动", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的兴趣。",
      dialogue: "大学生活很丰富，除了学习，运动和社团都很有趣。你最期待什么？",
      choices: [
        { text: "结识新朋友", effect: { affection: 1 }, next: 4 },
        { text: "参加比赛", effect: { trust: 1 }, next: 4 },
        { text: "体验自由生活", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "林舟热情地邀请你加入篮球社团。",
      dialogue: "有兴趣的话可以来篮球队试试！你平时喜欢什么运动？",
      choices: [
        { text: "篮球", effect: { affection: 2 }, next: 5 },
        { text: "跑步", effect: { trust: 1 }, next: 5 },
        { text: "羽毛球", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们一起在操场上走了一圈。",
      dialogue: "大学里朋友很重要，有什么困难可以找我。你觉得新环境怎么样？",
      choices: [
        { text: "很新鲜", effect: { affection: 1 }, next: 6 },
        { text: "有点紧张", effect: { trust: 1 }, next: 6 },
        { text: "还在适应", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "林舟鼓励你勇敢面对新生活。",
      dialogue: "慢慢来，大家都会适应的。以后一起加油吧！你喜欢热闹还是安静？",
      choices: [
        { text: "喜欢热闹", effect: { affection: 1 }, next: 7 },
        { text: "喜欢安静", effect: { trust: 1 }, next: 7 },
        { text: "都可以", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们愉快地结束了第一次相遇。",
      dialogue: "很高兴认识你！以后常来操场玩哦。",
      choices: [
        { text: "期待下次见面", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "挥手道别", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  acquaintance: {
    1: {
      description: "你和林舟在篮球场边偶遇，他正带队训练。",
      dialogue: "来观战吗？有兴趣一起打球吗？",
      choices: [
        { text: "加入训练", effect: { affection: 2 }, next: 2 },
        { text: "在旁边加油", effect: { trust: 1 }, next: 2 },
        { text: "聊聊篮球技巧", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "训练结束后你们一起休息。",
      dialogue: "运动完很舒服吧？你平时喜欢什么运动？",
      choices: [
        { text: "跑步", effect: { affection: 1 }, next: 3 },
        { text: "游泳", effect: { trust: 1 }, next: 3 },
        { text: "羽毛球", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "林舟分享了自己的运动经历。",
      dialogue: "运动能让人更有活力。你喜欢团队还是个人项目？",
      choices: [
        { text: "团队项目", effect: { affection: 1 }, next: 4 },
        { text: "个人项目", effect: { trust: 1 }, next: 4 },
        { text: "都喜欢", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "你们聊起了大学生活。",
      dialogue: "除了运动，大学还有什么让你觉得有趣的事？",
      choices: [
        { text: "社团活动", effect: { affection: 1 }, next: 5 },
        { text: "结交朋友", effect: { trust: 1 }, next: 5 },
        { text: "学习新知识", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "林舟邀请你参加篮球队聚会。",
      dialogue: "有空来聚会玩啊，大家都很友好。你喜欢热闹还是安静？",
      choices: [
        { text: "喜欢热闹", effect: { affection: 1 }, next: 6 },
        { text: "喜欢安静", effect: { trust: 1 }, next: 6 },
        { text: "都可以", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "你们的关系逐渐熟络。",
      dialogue: "以后有活动我会叫你。你觉得我这个人怎么样？",
      choices: [
        { text: "很阳光", effect: { affection: 2 }, next: 7 },
        { text: "很可靠", effect: { trust: 1 }, next: 7 },
        { text: "有点大大咧咧", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们的友谊更加深厚。",
      dialogue: "很高兴认识你！以后常联系。",
      choices: [
        { text: "期待下次见面", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "微笑道别", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  familiar: {
    1: {
      description: "你和林舟在操场慢跑，气氛轻松愉快。",
      dialogue: "平时喜欢运动吗？我觉得跑步很解压。",
      choices: [
        { text: "很喜欢", effect: { affection: 2 }, next: 2 },
        { text: "偶尔运动", effect: { trust: 1 }, next: 2 },
        { text: "不太运动", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "林舟分享了自己的运动习惯。",
      dialogue: "运动完会觉得很有成就感。你喜欢团队运动还是个人运动？",
      choices: [
        { text: "团队运动", effect: { affection: 1 }, next: 3 },
        { text: "个人运动", effect: { trust: 1 }, next: 3 },
        { text: "都可以", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的兴趣爱好。",
      dialogue: "除了运动，你还有什么兴趣？",
      choices: [
        { text: "音乐", effect: { affection: 1 }, next: 4 },
        { text: "阅读", effect: { trust: 1 }, next: 4 },
        { text: "美食", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "林舟邀请你一起参加社团活动。",
      dialogue: "有兴趣一起参加篮球赛吗？或者我们可以组队玩别的。",
      choices: [
        { text: "参加篮球赛", effect: { affection: 2 }, next: 5 },
        { text: "组队玩别的", effect: { trust: 1 }, next: 5 },
        { text: "暂时观望", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们一起讨论未来的计划。",
      dialogue: "大学生活很短暂，要多体验。你有什么想做的事吗？",
      choices: [
        { text: "旅行", effect: { affection: 1 }, next: 6 },
        { text: "学新技能", effect: { trust: 1 }, next: 6 },
        { text: "还没想好", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "林舟鼓励你勇敢尝试。",
      dialogue: "有想法就去做吧，我支持你。你觉得我们会一直是朋友吗？",
      choices: [
        { text: "当然会", effect: { affection: 2 }, next: 7 },
        { text: "希望如此", effect: { trust: 1 }, next: 7 },
        { text: "看缘分吧", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们的关系更加亲近。",
      dialogue: "以后一起加油！有你这样的朋友真好。",
      choices: [
        { text: "一起努力", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "微笑点头", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  love: {
    1: {
      description: "你和林舟在操场夜跑，星空下气氛浪漫。",
      dialogue: "夜晚的操场很安静，有你陪着真好。你喜欢夜跑吗？",
      choices: [
        { text: "很喜欢", effect: { affection: 2 }, next: 2 },
        { text: "偶尔跑", effect: { trust: 1 }, next: 2 },
        { text: "更喜欢白天", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "林舟轻声和你聊心事。",
      dialogue: "你觉得两个人一起运动会更有动力吗？",
      choices: [
        { text: "会的", effect: { affection: 2 }, next: 3 },
        { text: "看情况", effect: { trust: 1 }, next: 3 },
        { text: "有时喜欢独处", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了对未来的期待。",
      dialogue: "以后想和喜欢的人一起做什么？",
      choices: [
        { text: "一起旅行", effect: { affection: 2 }, next: 4 },
        { text: "一起运动", effect: { trust: 1 }, next: 4 },
        { text: "一起学习", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "林舟试探性地牵起你的手。",
      dialogue: "你会介意我主动一点吗？",
      choices: [
        { text: "不会介意", effect: { affection: 2 }, next: 5 },
        { text: "有点害羞", effect: { impression: 1 }, next: 5 },
        { text: "主动也挺好", effect: { trust: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们的距离越来越近。",
      dialogue: "其实我很喜欢和你在一起的感觉。你愿意以后一直陪着我吗？",
      choices: [
        { text: "愿意", effect: { affection: 3 }, next: 6 },
        { text: "点头微笑", effect: { affection: 2 }, next: 6 },
        { text: "害羞低头", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "林舟温柔地看着你。",
      dialogue: "以后无论遇到什么事，我都想和你一起面对。你相信我们能一直走下去吗？",
      choices: [
        { text: "相信", effect: { affection: 3 }, next: 7 },
        { text: "希望如此", effect: { trust: 1 }, next: 7 },
        { text: "顺其自然", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们的感情更加深厚。",
      dialogue: "谢谢你选择了我。以后一起努力吧。",
      choices: [
        { text: "紧握他的手", effect: { affection: 3, trust: 2 }, next: 'end' },
        { text: "温柔拥抱", effect: { affection: 2 }, next: 'end' }
      ]
    }
  }
};
