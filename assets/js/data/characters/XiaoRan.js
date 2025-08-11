// 萧然角色故事数据
window.XiaoRanStoryData = {
  first_meeting: {
    1: {
      description: "你在美术楼画室门口遇到一位安静的男生。",
      dialogue: "你好，我是萧然，美术系的。你喜欢画画吗？",
      choices: [
        { text: "喜欢", effect: { affection: 2 }, next: 2 },
        { text: "只是路过", effect: { impression: 1 }, next: 2 },
        { text: "好奇他在画什么", effect: { trust: 1 }, next: 2 }
      ]
    },
    2: {
      description: "他邀请你参观自己的画作。",
      dialogue: "我喜欢用画笔表达情感。你平时喜欢什么艺术？",
      choices: [
        { text: "绘画", effect: { affection: 2 }, next: 3 },
        { text: "音乐", effect: { trust: 1 }, next: 3 },
        { text: "文学", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的兴趣。",
      dialogue: "艺术让人心灵自由。你觉得大学生活怎么样？",
      choices: [
        { text: "很新鲜", effect: { affection: 1 }, next: 4 },
        { text: "有点孤独", effect: { trust: 1 }, next: 4 },
        { text: "还在适应", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "萧然认真倾听你的想法。",
      dialogue: "有空可以一起画画。你喜欢独处还是热闹？",
      choices: [
        { text: "喜欢独处", effect: { affection: 1 }, next: 5 },
        { text: "喜欢热闹", effect: { trust: 1 }, next: 5 },
        { text: "都可以", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们在画室里继续交流。",
      dialogue: "我觉得每个人都有独特的色彩。你对未来有什么期待？",
      choices: [
        { text: "希望画出好作品", effect: { affection: 1 }, next: 6 },
        { text: "希望遇到知己", effect: { trust: 1 }, next: 6 },
        { text: "希望大学生活精彩", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "萧然分享了自己的梦想。",
      dialogue: "很高兴认识你。以后常来画室玩吧。你喜欢什么颜色？",
      choices: [
        { text: "蓝色", effect: { affection: 1 }, next: 7 },
        { text: "红色", effect: { trust: 1 }, next: 7 },
        { text: "绿色", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们愉快地结束了第一次相遇。",
      dialogue: "希望以后能成为朋友。常联系哦。",
      choices: [
        { text: "期待下次见面", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "微笑道别", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  acquaintance: {
    1: {
      description: "你和萧然在画室偶遇，他正在创作新画。",
      dialogue: "你喜欢画画吗？我觉得艺术能表达很多情感。",
      choices: [
        { text: "喜欢画画", effect: { affection: 2 }, next: 2 },
        { text: "喜欢欣赏艺术", effect: { trust: 1 }, next: 2 },
        { text: "只是路过", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "他邀请你一起创作。",
      dialogue: "你平时喜欢什么风格的画？",
      choices: [
        { text: "写实", effect: { affection: 1 }, next: 3 },
        { text: "抽象", effect: { trust: 1 }, next: 3 },
        { text: "水彩", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的艺术追求。",
      dialogue: "艺术让人心灵自由。你觉得大学生活怎么样？",
      choices: [
        { text: "很新鲜", effect: { affection: 1 }, next: 4 },
        { text: "有点孤独", effect: { trust: 1 }, next: 4 },
        { text: "还在适应", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "萧然认真倾听你的想法。",
      dialogue: "有空可以一起画画。你喜欢独处还是热闹？",
      choices: [
        { text: "喜欢独处", effect: { affection: 1 }, next: 5 },
        { text: "喜欢热闹", effect: { trust: 1 }, next: 5 },
        { text: "都可以", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们在画室里继续交流。",
      dialogue: "我觉得每个人都有独特的色彩。你对未来有什么期待？",
      choices: [
        { text: "希望画出好作品", effect: { affection: 1 }, next: 6 },
        { text: "希望遇到知己", effect: { trust: 1 }, next: 6 },
        { text: "希望大学生活精彩", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "萧然分享了自己的梦想。",
      dialogue: "很高兴认识你。以后常来画室玩吧。你觉得我这个人怎么样？",
      choices: [
        { text: "很有才华", effect: { affection: 2 }, next: 7 },
        { text: "有点孤僻", effect: { impression: 1 }, next: 7 },
        { text: "其实很温暖", effect: { trust: 1 }, next: 7 }
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
      description: "你和萧然在画室一起创作新画。",
      dialogue: "最近有什么灵感吗？我觉得你的色彩很独特。",
      choices: [
        { text: "分享创作灵感", effect: { affection: 2 }, next: 2 },
        { text: "请教绘画技巧", effect: { trust: 1 }, next: 2 },
        { text: "说最近没灵感", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "萧然认真听你分享。",
      dialogue: "你觉得画画最大的乐趣是什么？",
      choices: [
        { text: "表达情感", effect: { affection: 1 }, next: 3 },
        { text: "探索色彩", effect: { trust: 1 }, next: 3 },
        { text: "放松心情", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的梦想。",
      dialogue: "以后想办一次个人画展，你觉得怎么样？",
      choices: [
        { text: "很有意义", effect: { affection: 2 }, next: 4 },
        { text: "支持他", effect: { trust: 1 }, next: 4 },
        { text: "建议先小范围尝试", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "萧然邀请你一起参加艺术沙龙。",
      dialogue: "有兴趣一起参加下周的艺术沙龙吗？",
      choices: [
        { text: "很感兴趣", effect: { affection: 2 }, next: 5 },
        { text: "可以考虑", effect: { trust: 1 }, next: 5 },
        { text: "时间不确定", effect: { impression: 1 }, next: 5 }
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
      description: "萧然鼓励你勇敢尝试。",
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
      description: "你和萧然在画室夜谈，气氛温柔。",
      dialogue: "最近总想和你多聊聊，有没有什么心事想和我说？",
      choices: [
        { text: "分享自己的烦恼", effect: { affection: 2 }, next: 2 },
        { text: "说最近很开心", effect: { trust: 1 }, next: 2 },
        { text: "微笑摇头", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "萧然认真倾听你的心声。",
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
      description: "萧然轻声问你对感情的看法。",
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
      description: "萧然轻轻牵起你的手。",
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
