// 唐言角色故事数据
window.TangYanStoryData = {
  first_meeting: {
    1: {
      description: "你在学生会办公室门口遇到一位气场强大的学长。",
      dialogue: "新生？我是唐言，商学院学生会主席。找我有事吗？",
      choices: [
        { text: "主动自我介绍", effect: { affection: 2 }, next: 2 },
        { text: "有些紧张地点头", effect: { trust: 1 }, next: 2 },
        { text: "说只是路过", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "唐言认真打量你。",
      dialogue: "新生要多锻炼自己，学生会很锻炼人。你对学生会感兴趣吗？",
      choices: [
        { text: "很感兴趣", effect: { affection: 2 }, next: 3 },
        { text: "想了解一下", effect: { trust: 1 }, next: 3 },
        { text: "暂时没兴趣", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "他简要介绍了学生会的工作。",
      dialogue: "大学生活很精彩，主动争取机会很重要。你平时喜欢什么活动？",
      choices: [
        { text: "组织活动", effect: { affection: 1 }, next: 4 },
        { text: "参加比赛", effect: { trust: 1 }, next: 4 },
        { text: "安静看书", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "唐言分享了自己的成长经历。",
      dialogue: "我以前也很内向，是锻炼出来的。你觉得大学最难适应什么？",
      choices: [
        { text: "人际关系", effect: { affection: 1 }, next: 5 },
        { text: "学业压力", effect: { trust: 1 }, next: 5 },
        { text: "独立生活", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "他鼓励你勇敢面对挑战。",
      dialogue: "遇到问题可以来找我。你对未来有什么目标？",
      choices: [
        { text: "希望成为优秀学生", effect: { affection: 1 }, next: 6 },
        { text: "希望交到朋友", effect: { trust: 1 }, next: 6 },
        { text: "希望大学顺利", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "你们的谈话让彼此更了解。",
      dialogue: "大学机会很多，主动一点会有收获。你喜欢热闹还是安静？",
      choices: [
        { text: "喜欢热闹", effect: { affection: 1 }, next: 7 },
        { text: "喜欢安静", effect: { trust: 1 }, next: 7 },
        { text: "都可以", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们愉快地结束了第一次相遇。",
      dialogue: "很高兴认识你！以后有事随时来找我。",
      choices: [
        { text: "期待下次见面", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "微笑道别", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  acquaintance: {
    1: {
      description: "你和唐言在学生会办公室偶遇，他正在处理文件。",
      dialogue: "最近学生会有新活动，有兴趣参加吗？",
      choices: [
        { text: "报名参加", effect: { affection: 2 }, next: 2 },
        { text: "想了解详情", effect: { trust: 1 }, next: 2 },
        { text: "暂时没兴趣", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "他简要介绍了活动内容。",
      dialogue: "大学生活很精彩，主动争取机会很重要。你平时喜欢什么活动？",
      choices: [
        { text: "组织活动", effect: { affection: 1 }, next: 3 },
        { text: "参加比赛", effect: { trust: 1 }, next: 3 },
        { text: "安静看书", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "唐言分享了自己的成长经历。",
      dialogue: "我以前也很内向，是锻炼出来的。你觉得大学最难适应什么？",
      choices: [
        { text: "人际关系", effect: { affection: 1 }, next: 4 },
        { text: "学业压力", effect: { trust: 1 }, next: 4 },
        { text: "独立生活", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "他鼓励你勇敢面对挑战。",
      dialogue: "遇到问题可以来找我。你对未来有什么目标？",
      choices: [
        { text: "希望成为优秀学生", effect: { affection: 1 }, next: 5 },
        { text: "希望交到朋友", effect: { trust: 1 }, next: 5 },
        { text: "希望大学顺利", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们的谈话让彼此更了解。",
      dialogue: "大学机会很多，主动一点会有收获。你喜欢热闹还是安静？",
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
        { text: "很有领导力", effect: { affection: 2 }, next: 7 },
        { text: "有点强势", effect: { impression: 1 }, next: 7 },
        { text: "其实很温柔", effect: { trust: 1 }, next: 7 }
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
      description: "你和唐言在学生会办公室一起策划活动。",
      dialogue: "最近有个大型活动，你有什么好点子吗？",
      choices: [
        { text: "提出创意方案", effect: { affection: 2 }, next: 2 },
        { text: "建议团队合作", effect: { trust: 1 }, next: 2 },
        { text: "表示需要再想想", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "唐言认真听取你的建议。",
      dialogue: "你觉得组织活动最大的难点是什么？",
      choices: [
        { text: "协调沟通", effect: { affection: 1 }, next: 3 },
        { text: "时间安排", effect: { trust: 1 }, next: 3 },
        { text: "资源有限", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的成长经历。",
      dialogue: "我以前也很紧张，但慢慢就适应了。你会紧张吗？",
      choices: [
        { text: "偶尔会", effect: { affection: 1 }, next: 4 },
        { text: "不会", effect: { trust: 1 }, next: 4 },
        { text: "经常会", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "唐言邀请你一起参加团队建设。",
      dialogue: "有兴趣一起参加团建吗？",
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
      description: "唐言鼓励你勇敢尝试。",
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
      description: "你和唐言在学生会阳台夜谈，气氛温馨。",
      dialogue: "最近总想和你多聊聊，有没有什么心事想和我说？",
      choices: [
        { text: "分享自己的烦恼", effect: { affection: 2 }, next: 2 },
        { text: "说最近很开心", effect: { trust: 1 }, next: 2 },
        { text: "微笑摇头", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "唐言认真倾听你的心声。",
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
      description: "唐言轻声问你对感情的看法。",
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
      description: "唐言轻轻牵起你的手。",
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
