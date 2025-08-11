// 周奕辰角色故事数据
window.ZhouYichenStoryData = {
  first_meeting: {
    1: {
      description: "你在校园花坛旁遇到一个拿着相机的学弟。",
      dialogue: "你好！我是周奕辰，摄影系新生。你也喜欢拍照吗？",
      choices: [
        { text: "喜欢摄影", effect: { affection: 2 }, next: 2 },
        { text: "只是路过", effect: { impression: 1 }, next: 2 },
        { text: "好奇他在拍什么", effect: { trust: 1 }, next: 2 }
      ]
    },
    2: {
      description: "他兴奋地展示自己的作品。",
      dialogue: "我喜欢记录校园的美好瞬间。你最喜欢校园的哪里？",
      choices: [
        { text: "图书馆", effect: { affection: 1 }, next: 3 },
        { text: "操场", effect: { trust: 1 }, next: 3 },
        { text: "食堂", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的兴趣。",
      dialogue: "大学生活很新鲜吧？你最期待什么？",
      choices: [
        { text: "结识朋友", effect: { affection: 1 }, next: 4 },
        { text: "参加社团", effect: { trust: 1 }, next: 4 },
        { text: "体验自由生活", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "周奕辰热情地邀请你参加摄影社。",
      dialogue: "有兴趣可以来摄影社玩！你平时喜欢什么活动？",
      choices: [
        { text: "拍照", effect: { affection: 2 }, next: 5 },
        { text: "运动", effect: { trust: 1 }, next: 5 },
        { text: "看电影", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们一起在校园里散步。",
      dialogue: "大学里有很多有趣的事。你觉得新环境怎么样？",
      choices: [
        { text: "很新鲜", effect: { affection: 1 }, next: 6 },
        { text: "有点紧张", effect: { trust: 1 }, next: 6 },
        { text: "还在适应", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "他鼓励你多尝试新事物。",
      dialogue: "慢慢来，大家都会适应的。以后一起加油吧！你喜欢热闹还是安静？",
      choices: [
        { text: "喜欢热闹", effect: { affection: 1 }, next: 7 },
        { text: "喜欢安静", effect: { trust: 1 }, next: 7 },
        { text: "都可以", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们愉快地结束了第一次相遇。",
      dialogue: "很高兴认识你！以后常联系哦。",
      choices: [
        { text: "期待下次见面", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "挥手道别", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  acquaintance: {
    1: {
      description: "你和周奕辰在摄影社活动室偶遇，他正在整理相机。",
      dialogue: "你喜欢拍照吗？我最近在拍校园风景。",
      choices: [
        { text: "喜欢拍照", effect: { affection: 2 }, next: 2 },
        { text: "喜欢被拍", effect: { trust: 1 }, next: 2 },
        { text: "只是路过", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "他邀请你一起拍照。",
      dialogue: "你最喜欢校园的哪个角落？",
      choices: [
        { text: "图书馆", effect: { affection: 1 }, next: 3 },
        { text: "操场", effect: { trust: 1 }, next: 3 },
        { text: "花坛", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的兴趣。",
      dialogue: "大学生活很新鲜吧？你最期待什么？",
      choices: [
        { text: "结识朋友", effect: { affection: 1 }, next: 4 },
        { text: "参加社团", effect: { trust: 1 }, next: 4 },
        { text: "体验自由生活", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "周奕辰热情地邀请你参加摄影社。",
      dialogue: "有兴趣可以来摄影社玩！你平时喜欢什么活动？",
      choices: [
        { text: "拍照", effect: { affection: 2 }, next: 5 },
        { text: "运动", effect: { trust: 1 }, next: 5 },
        { text: "看电影", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们一起在校园里散步。",
      dialogue: "大学里有很多有趣的事。你觉得新环境怎么样？",
      choices: [
        { text: "很新鲜", effect: { affection: 1 }, next: 6 },
        { text: "有点紧张", effect: { trust: 1 }, next: 6 },
        { text: "还在适应", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "他鼓励你多尝试新事物。",
      dialogue: "慢慢来，大家都会适应的。以后一起加油吧！你喜欢热闹还是安静？",
      choices: [
        { text: "喜欢热闹", effect: { affection: 1 }, next: 7 },
        { text: "喜欢安静", effect: { trust: 1 }, next: 7 },
        { text: "都可以", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们愉快地结束了这次交流。",
      dialogue: "很高兴认识你！以后常联系哦。",
      choices: [
        { text: "期待下次见面", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "挥手道别", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  familiar: {
    1: {
      description: "你和周奕辰在摄影社一起整理照片。",
      dialogue: "最近拍到什么有趣的画面吗？",
      choices: [
        { text: "分享有趣瞬间", effect: { affection: 2 }, next: 2 },
        { text: "请他推荐拍照技巧", effect: { trust: 1 }, next: 2 },
        { text: "说最近没拍什么", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "周奕辰热情地和你交流。",
      dialogue: "你觉得摄影最大的乐趣是什么？",
      choices: [
        { text: "记录生活", effect: { affection: 1 }, next: 3 },
        { text: "表达自我", effect: { trust: 1 }, next: 3 },
        { text: "发现美好", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的梦想。",
      dialogue: "以后想办一次个人摄影展，你觉得怎么样？",
      choices: [
        { text: "很有意义", effect: { affection: 2 }, next: 4 },
        { text: "支持他", effect: { trust: 1 }, next: 4 },
        { text: "建议先小范围尝试", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "周奕辰邀请你一起外拍。",
      dialogue: "有兴趣一起去郊外拍照吗？",
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
      description: "周奕辰鼓励你勇敢尝试。",
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
      description: "你和周奕辰在摄影社暗房里低声交谈。",
      dialogue: "最近总想拍你的照片，你愿意当我的专属模特吗？",
      choices: [
        { text: "愿意", effect: { affection: 2 }, next: 2 },
        { text: "害羞点头", effect: { trust: 1 }, next: 2 },
        { text: "调侃他太直接", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "周奕辰认真看着你。",
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
      description: "周奕辰轻声问你对感情的看法。",
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
      description: "周奕辰轻轻牵起你的手。",
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
