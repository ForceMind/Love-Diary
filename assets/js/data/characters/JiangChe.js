// 江澈角色故事数据
window.JiangCheStoryData = {
  first_meeting: {
    1: {
      description: "你在图书馆文学区看到一位安静写作的男生。",
      dialogue: "你好，需要找什么书吗？我是江澈，文学社的。",
      choices: [
        { text: "请他推荐书籍", effect: { affection: 2 }, next: 2 },
        { text: "好奇他在写什么", effect: { trust: 1 }, next: 2 },
        { text: "自顾自找书", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "江澈温和地为你介绍了几本经典文学作品。",
      dialogue: "我平时喜欢写诗和小说。你喜欢什么类型的书？",
      choices: [
        { text: "喜欢诗歌", effect: { affection: 2 }, next: 3 },
        { text: "喜欢小说", effect: { trust: 1 }, next: 3 },
        { text: "喜欢散文", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自喜欢的文学作品。",
      dialogue: "文学能让人思考和感受更多。你平时会写东西吗？",
      choices: [
        { text: "偶尔写日记", effect: { affection: 1 }, next: 4 },
        { text: "喜欢写诗", effect: { trust: 1 }, next: 4 },
        { text: "不太写", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "江澈分享了自己的创作经历。",
      dialogue: "有机会可以一起交流写作。你觉得大学生活最吸引你的是什么？",
      choices: [
        { text: "自由的氛围", effect: { affection: 1 }, next: 5 },
        { text: "丰富的社团", effect: { trust: 1 }, next: 5 },
        { text: "遇见有趣的人", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们在书架间继续交流。",
      dialogue: "我觉得每个人都有属于自己的故事。你喜欢独处还是热闹？",
      choices: [
        { text: "喜欢独处", effect: { affection: 1 }, next: 6 },
        { text: "喜欢热闹", effect: { trust: 1 }, next: 6 },
        { text: "都可以", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "江澈认真倾听你的想法。",
      dialogue: "有空可以一起讨论文学或者看展览。你对未来有什么期待？",
      choices: [
        { text: "希望写出好作品", effect: { affection: 1 }, next: 7 },
        { text: "希望遇到知己", effect: { trust: 1 }, next: 7 },
        { text: "希望大学生活精彩", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们的谈话让彼此留下了深刻印象。",
      dialogue: "很高兴认识你。以后常来文学区找我聊聊吧。",
      choices: [
        { text: "期待下次见面", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "微笑道别", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  acquaintance: {
    1: {
      description: "你和江澈在咖啡馆偶遇，他正在写作。",
      dialogue: "你喜欢咖啡还是奶茶？我觉得写作时喝点咖啡很有灵感。",
      choices: [
        { text: "喜欢咖啡", effect: { affection: 2 }, next: 2 },
        { text: "喜欢奶茶", effect: { trust: 1 }, next: 2 },
        { text: "都喜欢", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "你们聊起了各自的写作习惯。",
      dialogue: "你平时会写点什么吗？日记、诗歌还是小说？",
      choices: [
        { text: "偶尔写日记", effect: { affection: 1 }, next: 3 },
        { text: "喜欢写诗", effect: { trust: 1 }, next: 3 },
        { text: "不太写", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "江澈分享了自己的创作灵感。",
      dialogue: "有时候灵感来自生活。你觉得大学生活最有趣的是什么？",
      choices: [
        { text: "遇见有趣的人", effect: { affection: 1 }, next: 4 },
        { text: "参加社团", effect: { trust: 1 }, next: 4 },
        { text: "自由的氛围", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "你们在咖啡馆继续交流。",
      dialogue: "我觉得你很有想法。以后有机会可以一起写点东西。你喜欢独处还是热闹？",
      choices: [
        { text: "喜欢独处", effect: { affection: 1 }, next: 5 },
        { text: "喜欢热闹", effect: { trust: 1 }, next: 5 },
        { text: "都可以", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "江澈认真倾听你的想法。",
      dialogue: "有空可以一起讨论文学或者看展览。你对未来有什么期待？",
      choices: [
        { text: "希望写出好作品", effect: { affection: 1 }, next: 6 },
        { text: "希望遇到知己", effect: { trust: 1 }, next: 6 },
        { text: "希望大学生活精彩", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "你们的谈话让彼此更了解。",
      dialogue: "很高兴认识你。以后常来文学区找我聊聊吧。你觉得我这个人怎么样？",
      choices: [
        { text: "很温柔", effect: { affection: 2 }, next: 7 },
        { text: "有点文艺", effect: { impression: 1 }, next: 7 },
        { text: "很有想法", effect: { trust: 1 }, next: 7 }
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
      description: "你和江澈在文学社的活动室安静地喝茶。",
      dialogue: "最近在写什么新作品吗？我有点写作瓶颈。",
      choices: [
        { text: "鼓励他多尝试", effect: { affection: 2 }, next: 2 },
        { text: "分享自己的灵感", effect: { trust: 1 }, next: 2 },
        { text: "建议他休息一下", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "江澈认真听你分享。",
      dialogue: "你觉得写作最难的是什么？",
      choices: [
        { text: "坚持", effect: { affection: 1 }, next: 3 },
        { text: "表达真实情感", effect: { trust: 1 }, next: 3 },
        { text: "找到灵感", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的成长经历。",
      dialogue: "有时候觉得孤独，但也很享受创作的过程。你会因为写作而失眠吗？",
      choices: [
        { text: "偶尔会", effect: { affection: 1 }, next: 4 },
        { text: "不会", effect: { trust: 1 }, next: 4 },
        { text: "经常会", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "江澈邀请你一起参加文学沙龙。",
      dialogue: "有兴趣一起参加下周的文学沙龙吗？",
      choices: [
        { text: "很感兴趣", effect: { affection: 2 }, next: 5 },
        { text: "可以考虑", effect: { trust: 1 }, next: 5 },
        { text: "时间不确定", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们一起讨论未来的计划。",
      dialogue: "以后想尝试写长篇小说，你觉得怎么样？",
      choices: [
        { text: "很有挑战", effect: { affection: 1 }, next: 6 },
        { text: "支持他", effect: { trust: 1 }, next: 6 },
        { text: "建议先写短篇", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "江澈感谢你的建议。",
      dialogue: "有你这样的朋友真好。你觉得我们会一直是朋友吗？",
      choices: [
        { text: "当然会", effect: { affection: 2 }, next: 7 },
        { text: "希望如此", effect: { trust: 1 }, next: 7 },
        { text: "看缘分吧", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们的关系更加亲近。",
      dialogue: "谢谢你一直陪着我。以后常联系！",
      choices: [
        { text: "一起努力", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "微笑点头", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  love: {
    1: {
      description: "你和江澈在文学社的书架前低声交谈。",
      dialogue: "最近总想写点关于你的故事，你愿意成为我的灵感吗？",
      choices: [
        { text: "愿意", effect: { affection: 2 }, next: 2 },
        { text: "害羞点头", effect: { trust: 1 }, next: 2 },
        { text: "调侃他太文艺", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "江澈认真看着你。",
      dialogue: "你觉得我们是什么关系？",
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
      description: "江澈轻声问你对感情的看法。",
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
      description: "江澈轻轻牵起你的手。",
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
