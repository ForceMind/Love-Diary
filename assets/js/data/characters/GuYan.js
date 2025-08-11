// 顾言角色故事数据
window.GuYanStoryData = {
  first_meeting: {
    1: {
      description: "你在图书馆找书时，发现一位戴眼镜的男生正专注地敲打着键盘。",
      dialogue: "需要帮忙吗？你在找什么书？我是顾言，计算机系的。",
      choices: [
        { text: "请他帮忙找书", effect: { affection: 2, impression: 1 }, next: 2 },
        { text: "自己慢慢找", effect: { affection: 0 }, next: 2 },
        { text: "问他在做什么", effect: { trust: 1 }, next: 2 }
      ]
    },
    2: {
      description: "顾言很快帮你找到了目标书籍，还顺便推荐了几本相关的参考书。",
      dialogue: "这些书对你的课程很有帮助。你是哪个专业的？",
      choices: [
        { text: "如实回答自己的专业", effect: { affection: 1 }, next: 3 },
        { text: "反问他为什么这么热心", effect: { impression: 1 }, next: 3 },
        { text: "感谢他的帮助", effect: { affection: 2 }, next: 3 }
      ]
    },
    3: {
      description: "他推了推眼镜，微微一笑。",
      dialogue: "我平时喜欢帮同学解决问题，也算是兴趣吧。你喜欢编程吗？",
      choices: [
        { text: "有点兴趣，想学更多", effect: { trust: 2 }, next: 4 },
        { text: "觉得很难", effect: { affection: 0 }, next: 4 },
        { text: "其实更喜欢文科", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "你们聊起了各自的兴趣和大学生活。",
      dialogue: "大学其实很自由，找到喜欢的方向最重要。你平时喜欢做什么？",
      choices: [
        { text: "喜欢安静地看书", effect: { affection: 1 }, next: 5 },
        { text: "喜欢参加社团活动", effect: { impression: 1 }, next: 5 },
        { text: "喜欢运动", effect: { trust: 1 }, next: 5 }
      ]
    },
    5: {
      description: "顾言认真地听你分享，偶尔点头。",
      dialogue: "有空可以一起讨论学习或者参加活动。你觉得大学最难适应的是什么？",
      choices: [
        { text: "课程压力大", effect: { trust: 1 }, next: 6 },
        { text: "人际关系复杂", effect: { impression: 1 }, next: 6 },
        { text: "还没适应独立生活", effect: { affection: 1 }, next: 6 }
      ]
    },
    6: {
      description: "他给你一些建议，语气温和。",
      dialogue: "慢慢来，大家都会经历这些。遇到问题可以找我聊聊。你对未来有什么期待？",
      choices: [
        { text: "希望学业顺利", effect: { affection: 1 }, next: 7 },
        { text: "希望交到好朋友", effect: { trust: 1 }, next: 7 },
        { text: "希望遇到喜欢的人", effect: { impression: 2 }, next: 7 }
      ]
    },
    7: {
      description: "你们的谈话渐渐轻松起来，彼此留下了好印象。",
      dialogue: "很高兴认识你。以后在图书馆见到可以一起学习。加油！",
      choices: [
        { text: "期待下次见面", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "微笑道别", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  acquaintance: {
    1: {
      description: "你和顾言在自习室偶遇，他正在调试一段代码。",
      dialogue: "最近课程难度大吗？需要我帮忙讲讲吗？",
      choices: [
        { text: "请他讲解难题", effect: { affection: 2, trust: 1 }, next: 2 },
        { text: "和他讨论学习方法", effect: { trust: 2 }, next: 2 },
        { text: "聊聊生活琐事", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "顾言耐心地为你分析问题。",
      dialogue: "其实我也会遇到瓶颈，互相交流很重要。你最近有什么新发现吗？",
      choices: [
        { text: "分享学习心得", effect: { affection: 1 }, next: 3 },
        { text: "聊聊兴趣爱好", effect: { impression: 1 }, next: 3 },
        { text: "请教他时间管理", effect: { trust: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们的交流渐渐深入。",
      dialogue: "大学生活除了学习，还有什么让你觉得有意义的事？",
      choices: [
        { text: "结交朋友", effect: { affection: 1 }, next: 4 },
        { text: "参加社团", effect: { impression: 1 }, next: 4 },
        { text: "自我成长", effect: { trust: 1 }, next: 4 }
      ]
    },
    4: {
      description: "顾言认真倾听你的想法。",
      dialogue: "我觉得你很有想法。以后有机会可以一起参加项目。你对未来有什么规划？",
      choices: [
        { text: "考研/深造", effect: { trust: 2 }, next: 5 },
        { text: "找好工作", effect: { impression: 1 }, next: 5 },
        { text: "还没想好", effect: { affection: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们聊起了各自的梦想。",
      dialogue: "有目标就会有动力。遇到困难别怕，有我在。你喜欢团队合作还是独立完成任务？",
      choices: [
        { text: "团队合作", effect: { affection: 1 }, next: 6 },
        { text: "独立完成", effect: { trust: 1 }, next: 6 },
        { text: "看情况", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "顾言分享了自己做项目的经验。",
      dialogue: "以后有机会可以一起做项目。你觉得我这个人怎么样？",
      choices: [
        { text: "很靠谱", effect: { affection: 2 }, next: 7 },
        { text: "有点高冷", effect: { impression: 1 }, next: 7 },
        { text: "其实很温柔", effect: { trust: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们的关系更加熟悉，彼此信任加深。",
      dialogue: "很高兴认识你这样的朋友。以后常联系！",
      choices: [
        { text: "期待下次交流", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "微笑道别", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  familiar: {
    1: {
      description: "你和顾言在图书馆自习，气氛安静而温馨。",
      dialogue: "最近在看什么书？有推荐的吗？",
      choices: [
        { text: "推荐一本小说", effect: { affection: 2 }, next: 2 },
        { text: "推荐一本工具书", effect: { trust: 1 }, next: 2 },
        { text: "说自己最近没怎么看书", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "顾言认真听你讲述书的内容。",
      dialogue: "你喜欢安静的环境吗？我觉得图书馆很适合思考。",
      choices: [
        { text: "很喜欢", effect: { affection: 1 }, next: 3 },
        { text: "偶尔喜欢", effect: { trust: 1 }, next: 3 },
        { text: "更喜欢热闹", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的学习方法。",
      dialogue: "你复习的时候会做笔记吗？",
      choices: [
        { text: "会，喜欢整理笔记", effect: { affection: 1 }, next: 4 },
        { text: "偶尔做", effect: { trust: 1 }, next: 4 },
        { text: "不太做", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "顾言分享了自己的学习心得。",
      dialogue: "其实我也会偷懒，不过有你一起学习很有动力。你觉得我是不是有点无趣？",
      choices: [
        { text: "很有趣", effect: { affection: 2 }, next: 5 },
        { text: "挺踏实的", effect: { trust: 1 }, next: 5 },
        { text: "偶尔有点", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们一起讨论未来的规划。",
      dialogue: "你以后有什么打算？考研、工作还是其他？",
      choices: [
        { text: "考研", effect: { trust: 2 }, next: 6 },
        { text: "工作", effect: { impression: 1 }, next: 6 },
        { text: "还没想好", effect: { affection: 1 }, next: 6 }
      ]
    },
    6: {
      description: "顾言鼓励你勇敢追梦。",
      dialogue: "不管做什么，我都支持你。你觉得我们会一直是朋友吗？",
      choices: [
        { text: "当然会", effect: { affection: 2 }, next: 7 },
        { text: "希望如此", effect: { trust: 1 }, next: 7 },
        { text: "看缘分吧", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们的关系更加亲近。",
      dialogue: "谢谢你一直陪着我。以后一起加油！",
      choices: [
        { text: "一起努力", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "微笑点头", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  love: {
    1: {
      description: "你和顾言在校园湖边散步，气氛温馨。",
      dialogue: "最近总想和你多聊聊，有没有什么心事想和我说？",
      choices: [
        { text: "分享自己的烦恼", effect: { affection: 2 }, next: 2 },
        { text: "说最近很开心", effect: { trust: 1 }, next: 2 },
        { text: "微笑摇头", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "顾言认真倾听你的心声。",
      dialogue: "有你在身边，我觉得很安心。你觉得我们是什么关系？",
      choices: [
        { text: "很特别的朋友", effect: { affection: 2 }, next: 3 },
        { text: "像家人一样", effect: { trust: 1 }, next: 3 },
        { text: "还没想好", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了未来的憧憬。",
      dialogue: "如果以后能一直这样就好了。你会想和我一起去旅行吗？",
      choices: [
        { text: "很想", effect: { affection: 2 }, next: 4 },
        { text: "可以考虑", effect: { trust: 1 }, next: 4 },
        { text: "看时间安排", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "顾言轻声问你对感情的看法。",
      dialogue: "你相信一见钟情还是日久生情？",
      choices: [
        { text: "日久生情", effect: { affection: 2 }, next: 5 },
        { text: "一见钟情", effect: { impression: 1 }, next: 5 },
        { text: "都相信", effect: { trust: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们的距离越来越近。",
      dialogue: "其实我很喜欢和你在一起的感觉。你会介意我主动一点吗？",
      choices: [
        { text: "不会介意", effect: { affection: 2 }, next: 6 },
        { text: "有点害羞", effect: { impression: 1 }, next: 6 },
        { text: "主动也挺好", effect: { trust: 1 }, next: 6 }
      ]
    },
    6: {
      description: "顾言轻轻牵起你的手。",
      dialogue: "以后无论遇到什么事，我都想陪在你身边。你愿意吗？",
      choices: [
        { text: "愿意", effect: { affection: 3 }, next: 7 },
        { text: "点头微笑", effect: { affection: 2 }, next: 7 },
        { text: "害羞低头", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们的感情更加深厚。",
      dialogue: "谢谢你选择了我。以后一起走下去吧。",
      choices: [
        { text: "紧握他的手", effect: { affection: 3, trust: 2 }, next: 'end' },
        { text: "温柔拥抱", effect: { affection: 2 }, next: 'end' }
      ]
    }
  }
};
