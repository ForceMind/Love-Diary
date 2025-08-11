// 苏云深角色故事数据
window.SongYunshenStoryData = {
  first_meeting: {
    1: {
      description: "你在医学院门口遇到一位温柔的学长。",
      dialogue: "你好，我是苏云深，医学院的。需要帮忙吗？",
      choices: [
        { text: "请他带路", effect: { affection: 2 }, next: 2 },
        { text: "自我介绍", effect: { trust: 1 }, next: 2 },
        { text: "说自己没事", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "他耐心地为你介绍医学院环境。",
      dialogue: "刚入学会有点不适应，慢慢来就好。你为什么选择学医？",
      choices: [
        { text: "想救人", effect: { affection: 2 }, next: 3 },
        { text: "家里期望", effect: { trust: 1 }, next: 3 },
        { text: "兴趣使然", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的理想。",
      dialogue: "医学很辛苦，但也很有意义。你平时喜欢做什么？",
      choices: [
        { text: "看书", effect: { affection: 1 }, next: 4 },
        { text: "运动", effect: { trust: 1 }, next: 4 },
        { text: "做饭", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "苏云深分享了自己的兴趣。",
      dialogue: "我喜欢照顾别人，也喜欢养花。你觉得大学生活最难的是什么？",
      choices: [
        { text: "学业压力", effect: { affection: 1 }, next: 5 },
        { text: "人际关系", effect: { trust: 1 }, next: 5 },
        { text: "独立生活", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "他温柔地安慰你。",
      dialogue: "遇到困难可以找我聊聊。你对未来有什么期待？",
      choices: [
        { text: "希望成为好医生", effect: { affection: 1 }, next: 6 },
        { text: "希望交到朋友", effect: { trust: 1 }, next: 6 },
        { text: "希望大学顺利", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "你们的谈话让彼此更了解。",
      dialogue: "很高兴认识你。以后有需要随时找我。你喜欢热闹还是安静？",
      choices: [
        { text: "喜欢热闹", effect: { affection: 1 }, next: 7 },
        { text: "喜欢安静", effect: { trust: 1 }, next: 7 },
        { text: "都可以", effect: { impression: 1 }, next: 7 }
      ]
    },
    7: {
      description: "你们愉快地结束了第一次相遇。",
      dialogue: "希望你在大学过得开心。常联系哦。",
      choices: [
        { text: "期待下次见面", effect: { affection: 2, trust: 1 }, next: 'end' },
        { text: "微笑道别", effect: { affection: 1 }, next: 'end' }
      ]
    }
  },
  acquaintance: {
    1: {
      description: "你和苏云深在医学院自习室偶遇，他正在看医学书。",
      dialogue: "最近学习压力大吗？需要一起复习吗？",
      choices: [
        { text: "请他讲解难题", effect: { affection: 2 }, next: 2 },
        { text: "和他讨论生活", effect: { trust: 1 }, next: 2 },
        { text: "聊聊兴趣爱好", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "他耐心地为你分析问题。",
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
      description: "苏云深认真倾听你的想法。",
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
      description: "苏云深分享了自己做项目的经验。",
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
      description: "你和苏云深在医学院实验室一起做实验。",
      dialogue: "最近实验进展顺利吗？需要帮忙吗？",
      choices: [
        { text: "主动帮忙", effect: { affection: 2 }, next: 2 },
        { text: "请教实验技巧", effect: { trust: 1 }, next: 2 },
        { text: "聊聊生活琐事", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "苏云深耐心指导你。",
      dialogue: "你觉得做实验最大的挑战是什么？",
      choices: [
        { text: "数据分析", effect: { affection: 1 }, next: 3 },
        { text: "操作细节", effect: { trust: 1 }, next: 3 },
        { text: "时间管理", effect: { impression: 1 }, next: 3 }
      ]
    },
    3: {
      description: "你们聊起了各自的理想。",
      dialogue: "以后想做科研还是临床？",
      choices: [
        { text: "科研", effect: { affection: 2 }, next: 4 },
        { text: "临床", effect: { trust: 1 }, next: 4 },
        { text: "还没想好", effect: { impression: 1 }, next: 4 }
      ]
    },
    4: {
      description: "苏云深邀请你一起参加学术讲座。",
      dialogue: "有兴趣一起听讲座吗？",
      choices: [
        { text: "很感兴趣", effect: { affection: 2 }, next: 5 },
        { text: "可以考虑", effect: { trust: 1 }, next: 5 },
        { text: "时间不确定", effect: { impression: 1 }, next: 5 }
      ]
    },
    5: {
      description: "你们一起讨论未来的计划。",
      dialogue: "医学路很长，有你一起会更有动力。你觉得我们会一直是朋友吗？",
      choices: [
        { text: "当然会", effect: { affection: 2 }, next: 6 },
        { text: "希望如此", effect: { trust: 1 }, next: 6 },
        { text: "看缘分吧", effect: { impression: 1 }, next: 6 }
      ]
    },
    6: {
      description: "苏云深感谢你的陪伴。",
      dialogue: "谢谢你一直支持我。以后常联系！",
      choices: [
        { text: "一起努力", effect: { affection: 2, trust: 1 }, next: 7 },
        { text: "微笑点头", effect: { affection: 1 }, next: 7 }
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
      description: "你和苏云深在医学院天台夜谈，气氛温柔。",
      dialogue: "最近总想和你多聊聊，有没有什么心事想和我说？",
      choices: [
        { text: "分享自己的烦恼", effect: { affection: 2 }, next: 2 },
        { text: "说最近很开心", effect: { trust: 1 }, next: 2 },
        { text: "微笑摇头", effect: { impression: 1 }, next: 2 }
      ]
    },
    2: {
      description: "苏云深认真倾听你的心声。",
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
      description: "苏云深轻声问你对感情的看法。",
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
      description: "苏云深轻轻牵起你的手。",
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
