// 同学信息类型定义
export interface Student {
  id: number;
  qq: string;
  wechat?: string; // 微信
  realName: string; // 真实姓名
  nickname: string;
  graduationYear?: number; // 毕业年份，在校学生可为空
  signature: string;
  university?: string; // 可选
  avatar?: string; // 个人照片
  socialLinks?: {
    title: string;
    url: string;
    icon?: string;
  }[];
  description?: string; // 个人描述
}

// 根据毕业年份计算当前年级
export function getCurrentGrade(graduationYear?: number): string | null {
  if (!graduationYear) return null;
  
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 月份从0开始，所以+1
  
  // 如果当前月份在9月之前，说明还没到新学年，需要调整
  const schoolYear = currentMonth >= 7 ? currentYear : currentYear - 1;
  
  // 计算距离毕业还有几年
  const yearsToGraduation = graduationYear - schoolYear;
  
  // 如果已经毕业了，返回null
  if (yearsToGraduation <= 0) return null;
  
  // 根据距离毕业的年数确定年级
  switch (yearsToGraduation) {
    case 1: return '高三';
    case 2: return '高二';
    case 3: return '高一';
    case 4: return '初三';
    case 5: return '初二';
    case 6: return '初一';
    default: return null;
  }
}

// 模拟同学数据
export const students: Student[] = [
  {
    id: 1,
    qq: "851627835",
    realName: "王奕然",
    nickname: "everlasting",
    graduationYear: 2020,
    signature: "欢迎进入轨道🚀",
    university: "福州大学",
    description: "维护这个网站的，有了AI它可以变得好看了",
    socialLinks: [
      { title: "博客", url: "https://blog.example.com/algo-master", icon: "globe" },
      { title: "GitHub", url: "https://github.com/algo-master", icon: "github" },
      { title: "知乎", url: "https://zhihu.com/people/algo-master", icon: "book" }
    ]
  },
  {
    id: 2,
    qq: "502887765",
    realName: "邱兆林",
    nickname: "CircleLin",
    graduationYear: 2016,
    signature: "暂无签名",
    university: "浙江大学",
    description: "算法竞赛爱好者"
  },
  {
    id: 3,
    qq: "972646347",
    realName: "邹雨恒",
    nickname: "KuribohG",
    graduationYear: 2016,
    signature: "爱情似屏幕，dfs求最短路",
    university: "北京大学",
    description: "爱情似屏幕，dfs求最短路"
  },
  {
    id: 4,
    qq: "714439471",
    realName: "尹一航",
    nickname: "someday",
    graduationYear: 2016,
    signature: "今天就真的退役了，JL的孩子们啊，不要忘了Someday曾经也是一名OIer，OI再见。",
    university: "北京航空航天大学",
    description: "今天就真的退役了，JL的孩子们啊，不要忘了Someday曾经也是一名OIer，OI再见。"
  },
  {
    id: 5,
    qq: "1029076022",
    realName: "李思航",
    nickname: "lisihang",
    graduationYear: 2016,
    signature: "暂无签名",
    university: "北京大学",
    description: "算法竞赛爱好者"
  },
  {
    id: 6,
    qq: "569668658",
    realName: "尚柯宇",
    nickname: "devilily",
    graduationYear: 2016,
    signature: "我要揍你",
    description: "我要揍你"
  },
  {
    id: 7,
    qq: "814967611",
    realName: "李雪欣",
    nickname: "ISummerx",
    graduationYear: 2016,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 8,
    qq: "707185547",
    realName: "徐瑞帆",
    nickname: "xuruifan",
    graduationYear: 2017,
    signature: "靠！你是不是傻逼！",
    university: "北京大学",
    description: "计算机科学与技术专业，靠！你是不是傻逼！",
    socialLinks: [
      { title: "博客", url: "http://www.cnblogs.com/xuruifan", icon: "globe" },
      { title: "GitHub", url: "https://github.com/xuruifan", icon: "github" },
      { title: "B站", url: "https://space.bilibili.com/19206494", icon: "video" }
    ]
  },
  {
    id: 9,
    qq: "1213075831",
    realName: "王子航",
    nickname: "wzh1",
    graduationYear: 2017,
    signature: "暂无签名",
    university: "清华大学",
    description: "算法竞赛爱好者"
  },
  {
    id: 10,
    qq: "1823526105",
    realName: "甄瑞航",
    nickname: "ZMiG",
    graduationYear: 2017,
    signature: "暂无签名",
    university: "复旦大学",
    description: "算法竞赛爱好者",
    socialLinks: [
      { title: "B站", url: "https://space.bilibili.com/19213104", icon: "video" }
    ]
  },
  {
    id: 11,
    qq: "1012534745",
    realName: "王焱",
    nickname: "Thr__Fir_s",
    graduationYear: 2017,
    signature: "暂无签名",
    university: "北京大学",
    description: "算法竞赛爱好者",
    socialLinks: [
      { title: "B站", url: "https://space.bilibili.com/8132294", icon: "video" }
    ]
  },
  {
    id: 12,
    qq: "904095866",
    realName: "聂恺辰",
    nickname: "commonc",
    graduationYear: 2018,
    signature: "聂恺辰 第二天t1 输出格式错误",
    university: "北京大学",
    description: "智能科学与技术专业，聂恺辰 第二天t1 输出格式错误",
    socialLinks: [
      { title: "博客", url: "https://blog.csdn.net/commonc", icon: "globe" },
      { title: "B站", url: "https://space.bilibili.com/20974730", icon: "video" }
    ]
  },
  {
    id: 13,
    qq: "450993438",
    realName: "李佳实",
    nickname: "ljss",
    graduationYear: 2018,
    signature: "/+v",
    university: "北京大学",
    description: "计算机科学与技术专业，/+v"
  },
  {
    id: 14,
    qq: "859985722",
    realName: "姜淳誉",
    nickname: "neither",
    graduationYear: 2018,
    signature: "就让我永远不在这里写什么有意义的话",
    university: "清华大学",
    description: "计算机科学与技术专业，就让我永远不在这里写什么有意义的话",
    socialLinks: [
      { title: "博客", url: "https://blog.csdn.net/neither_nor", icon: "globe" },
      { title: "B站", url: "https://space.bilibili.com/32740908", icon: "video" }
    ]
  },
  {
    id: 15,
    qq: "136808543",
    realName: "程傲",
    nickname: "Oakley",
    graduationYear: 2018,
    signature: "暂无签名",
    university: "上海大学",
    description: "算法竞赛爱好者",
    socialLinks: [
      { title: "博客", url: "https://blog.csdn.net/Oakley_", icon: "globe" }
    ]
  },
  {
    id: 16,
    qq: "2586669575",
    realName: "尹涵",
    nickname: "ahcisy",
    graduationYear: 2018,
    signature: "暂无签名",
    university: "清华大学",
    description: "算法竞赛爱好者",
    socialLinks: [
      { title: "博客", url: "https://blog.csdn.net/ahcisy", icon: "globe" }
    ]
  },
  {
    id: 17,
    qq: "1085455474",
    realName: "白济明",
    nickname: "Raidriar",
    graduationYear: 2018,
    signature: "独者轻孤，孤者慎独",
    university: "北京邮电大学",
    description: "网络空间安全专业专业，独者轻孤，孤者慎独",
    socialLinks: [
      { title: "博客", url: "https://blog.csdn.net/bjmbjmbjmbjm", icon: "globe" }
    ]
  },
  {
    id: 18,
    qq: "1820092536",
    realName: "吴佳奕",
    nickname: "BeyondW",
    graduationYear: 2018,
    signature: "I'll still be thinkin' of you and the times we had",
    university: "天津大学",
    description: "电子科学与技术专业，I'll still be thinkin' of you and the times we had",
    socialLinks: [
      { title: "博客", url: "https://blog.csdn.net/BeyondW__", icon: "globe" }
    ]
  },
  {
    id: 19,
    qq: "1793432088",
    realName: "苑文雨",
    nickname: "foreverywy",
    graduationYear: 2018,
    signature: "神犇就我啊",
    university: "哈尔滨工业大学（深圳）",
    description: "环境科学与工程专业，神犇就我啊"
  },
  {
    id: 20,
    qq: "1280814449",
    realName: "唐熙霖",
    nickname: "_blackjack_",
    graduationYear: 2019,
    signature: "Whatever.",
    university: "中国人民大学",
    description: "计算机科学与技术专业，Whatever.",
    socialLinks: [
      { title: "博客", url: "https://blog.csdn.net/blackjack_/", icon: "globe" }
    ]
  },
  {
    id: 21,
    qq: "1047963985",
    realName: "吕昆航",
    nickname: "komqaq",
    graduationYear: 2019,
    signature: "梦醒了。",
    university: "北京大学",
    description: "计算机科学与技术专业，梦醒了。",
    socialLinks: [
      { title: "博客", url: "http://kylelv.com/", icon: "globe" }
    ]
  },
  {
    id: 22,
    qq: "2817629709",
    realName: "赵广泽",
    nickname: "l1ll5",
    graduationYear: 2019,
    signature: "暂无签名",
    university: "浙江大学",
    description: "计算机科学与技术专业，算法竞赛爱好者",
    socialLinks: [
      { title: "博客", url: "https://zgz233.xyz/", icon: "globe" },
      { title: "B站", url: "https://space.bilibili.com/1519204", icon: "video" }
    ]
  },
  {
    id: 23,
    qq: "1921969766",
    realName: "张翔睿",
    nickname: "dreamy_melody",
    graduationYear: 2019,
    signature: "时空将你我连接，信息将你我分开||我从梦幻而生，终将坠入梦幻",
    university: "吉林大学",
    description: "计算机科学与技术专业，时空将你我连接，信息将你我分开||我从梦幻而生，终将坠入梦幻"
  },
  {
    id: 24,
    qq: "3214341071",
    realName: "王知非",
    nickname: "a799091501",
    graduationYear: 2019,
    signature: "暂无签名",
    university: "北京邮电大学",
    description: "物联网工程专业，算法竞赛爱好者",
    socialLinks: [
      { title: "博客", url: "http://www.cnblogs.com/tsunderehome/", icon: "globe" }
    ]
  },
  {
    id: 25,
    qq: "1398660594",
    realName: "赵春源",
    nickname: "Claire",
    graduationYear: 2020,
    signature: "很多年以后，我有一个绰号叫西毒。任何人都可以变得狠毒，只要你尝试过什么叫嫉妒。",
    university: "北京大学",
    description: "很多年以后，我有一个绰号叫西毒。任何人都可以变得狠毒，只要你尝试过什么叫嫉妒。"
  },
  {
    id: 26,
    qq: "1137892110",
    realName: "李凡丁",
    nickname: "Michael_Bryant",
    graduationYear: 2020,
    signature: "这世上，无论多么短暂的瞬间，都有意义",
    university: "哈尔滨工业大学",
    description: "计算机科学与技术，这世上，无论多么短暂的瞬间，都有意义",
    socialLinks: [
      { title: "主页", url: "https://michael-li-bryant.github.io/", icon: "globe" },
      { title: "知乎", url: "https://www.zhihu.com/people/michael-bryant-34", icon: "book" },
      { title: "Github", url: "https://github.com/Michael-Li-Bryant", icon: "github" }
    ]
  },
  {
    id: 27,
    qq: "2034826488",
    realName: "汤云开",
    nickname: "Camouflager",
    graduationYear: 2020,
    signature: "暂无签名",
    university: "北京大学",
    description: "信息与计算科学专业，算法竞赛爱好者"
  },
  {
    id: 28,
    qq: "1145101354",
    realName: "李一錡",
    nickname: "thewalker88",
    graduationYear: 2020,
    signature: "与我一同踏上霞客之路吧",
    university: "北京航空航天大学",
    description: "高等理工专业，与我一同踏上霞客之路吧"
  },
  {
    id: 29,
    qq: "972808330",
    realName: "李天晓",
    nickname: "starria",
    graduationYear: 2020,
    signature: "That is not dead which can eternal lie,and with strange aeons even death may die.",
    university: "清华大学",
    description: "计算机科学与技术专业，That is not dead which can eternal lie,and with strange aeons even death may die.",
    socialLinks: [
      { title: "B站", url: "https://space.bilibili.com/8413874", icon: "video" }
    ]
  },
  {
    id: 30,
    qq: "1240280333",
    realName: "杜天睿",
    nickname: "Turtle_King",
    graduationYear: 2020,
    signature: "我依舊最喜歡我可愛的妹妹！",
    university: "吉林大学",
    description: "交通运输类专业，我依舊最喜歡我可愛的妹妹！",
    socialLinks: [
      { title: "知乎", url: "https://www.zhihu.com/people/jia-yu-shou-ling", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/20202543", icon: "video" }
    ]
  },
  {
    id: 31,
    qq: "1344988745",
    realName: "丁奥",
    nickname: "Dawn_Buendia",
    graduationYear: 2020,
    signature: "铁幕重重困青年，自由或许问心脏",
    university: "中国地质大学（北京）",
    description: "工商管理类专业，铁幕重重困青年，自由或许问心脏",
    socialLinks: [
      { title: "知乎", url: "https://www.zhihu.com/people/xue-fei-de-yu", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/250129967", icon: "video" }
    ]
  },
  {
    id: 32,
    qq: "1409111459",
    realName: "刘书任",
    nickname: "lsr",
    graduationYear: 2020,
    signature: "身在TJU啥算法都不会了的AFO选手",
    university: "天津大学",
    description: "计算机科学与技术专业，身在TJU啥算法都不会了的AFO选手",
    socialLinks: [
      { title: "博客", url: "https://lsr2002.com", icon: "globe" },
      { title: "B站", url: "https://space.bilibili.com/382376033", icon: "video" }
    ]
  },
  {
    id: 33,
    qq: "1635793282",
    realName: "高鸣宇",
    nickname: "coldhac",
    graduationYear: 2021,
    signature: "让我望而却步的，不是遥远，而是孤独",
    university: "北京大学",
    description: "信息与计算科学专业，让我望而却步的，不是遥远，而是孤独",
    socialLinks: [
      { title: "博客", url: "http://cod.ac.cn", icon: "globe" },
      { title: "知乎", url: "https://www.zhihu.com/people/xia-xian-lun-hui", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/9229336", icon: "video" }
    ]
  },
  {
    id: 34,
    qq: "1263354661",
    realName: "孙嘉伟",
    nickname: "namespace_std",
    graduationYear: 2022,
    signature: "Let all the disappointment go with wind.",
    university: "北京大学",
    description: "Let all the disappointment go with wind.",
    socialLinks: [
      { title: "博客", url: "https://www.luogu.org/blog/3-14159265358/", icon: "globe" }
    ]
  },
  {
    id: 35,
    qq: "727428727",
    realName: "李新年",
    nickname: "LebronDurant",
    graduationYear: 2022,
    signature: "从容中道",
    university: "北京大学",
    description: "从容中道",
    socialLinks: [
      { title: "博客", url: "https://www.luogu.org/blog/betrayer/", icon: "globe" }
    ]
  },
  {
    id: 36,
    qq: "1785860025",
    realName: "何松谕",
    nickname: "twilight118",
    graduationYear: 2022,
    signature: "我要一步一步往上爬，在最高点乘着叶片往前飞",
    university: "香港科技大学",
    description: "我要一步一步往上爬，在最高点乘着叶片往前飞"
  },
  {
    id: 37,
    qq: "1565909353",
    realName: "姜乃珲",
    nickname: "jiangnaihui",
    graduationYear: 2022,
    signature: "我还有什么话可说呢？",
    description: "我还有什么话可说呢？"
  },
  {
    id: 38,
    qq: "1340364178",
    realName: "孙伟哲",
    nickname: "SourFold",
    graduationYear: 2022,
    signature: "这不傻子题",
    university: "北京邮电大学",
    description: "这不傻子题"
  },
  {
    id: 39,
    qq: "168778017",
    realName: "王恕",
    nickname: "wolverine",
    graduationYear: 2023,
    signature: "暂无签名",
    university: "吉林大学",
    description: "算法竞赛爱好者",
    socialLinks: [
      { title: "博客", url: "https://www.luogu.org/blog/wangshu31/", icon: "globe" }
    ]
  },
  {
    id: 40,
    qq: "3232149367",
    realName: "刘朔",
    nickname: "Syzygy12",
    graduationYear: 2023,
    signature: "暂无签名",
    university: "清华大学",
    description: "算法竞赛爱好者",
    socialLinks: [
      { title: "博客", url: "https://84205.blog.luogu.org/", icon: "globe" }
    ]
  },
  {
    id: 41,
    qq: "2145705084",
    realName: "李子豪",
    nickname: "telesto",
    graduationYear: 2023,
    signature: "暂无签名",
    description: "算法竞赛爱好者",
    socialLinks: [
      { title: "博客", url: "https://www.luogu.com.cn/blog/CorCor-Xor-CorCor/#", icon: "globe" },
      { title: "B站", url: "https://space.bilibili.com/109673045", icon: "video" }
    ]
  },
  {
    id: 42,
    qq: "1194239942",
    realName: "王冠尧",
    nickname: "Celtic",
    graduationYear: 2024,
    signature: "我只想做个与世无争的垃圾，可是还要被分类...",
    university: "北京大学",
    description: "数学专业，我只想做个与世无争的垃圾，可是还要被分类...",
    socialLinks: [
      { title: "博客", url: "https://www.cnblogs.com/CelticBlog/", icon: "globe" },
      { title: "知乎", url: "https://www.zhihu.com/people/he-chou-qing-si-pei-bai-yi-40", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/489387130", icon: "video" }
    ]
  },
  {
    id: 43,
    qq: "2048455641",
    realName: "张铠麒",
    nickname: "ooooxxxx",
    graduationYear: 2024,
    signature: "暂无签名",
    university: "清华大学",
    description: "算法竞赛爱好者",
    socialLinks: [
      { title: "博客", url: "https://protons-z.github.io/", icon: "globe" }
    ]
  },
  {
    id: 44,
    qq: "2201685475",
    realName: "袁浩为",
    nickname: "accoder",
    graduationYear: 2025,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 45,
    qq: "1149395947",
    realName: "张一鸣",
    nickname: "swift",
    graduationYear: 2025,
    signature: "Write the Code. Change the world.",
    description: "Write the Code. Change the world.",
    socialLinks: [
      { title: "博客", url: "https://zhangyiming.tech/", icon: "globe" },
      { title: "知乎", url: "https://www.zhihu.com/people/swift-zym", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/492358939", icon: "video" }
    ]
  },
  {
    id: 46,
    qq: "529513043",
    realName: "王若溪",
    nickname: "Rancy",
    graduationYear: 2025,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 47,
    qq: "2088874580",
    realName: "夏铭飞",
    nickname: "SummerFlyFly",
    graduationYear: 2022,
    signature: "Time will prove.",
    description: "Time will prove.",
    socialLinks: [
      { title: "知乎", url: "https://www.zhihu.com/people/summerflyfly", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/384767875", icon: "video" }
    ]
  },
  {
    id: 48,
    qq: "3297686",
    realName: "高乃严",
    nickname: "qidirj",
    graduationYear: 2027,
    signature: "洛浔可爱！",
    description: "洛浔可爱！",
    socialLinks: [
      { title: "博客", url: "https://qidirj-im666.blog.luogu.org", icon: "globe" },
      { title: "知乎", url: "https://www.zhihu.com/people/qidirj", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/1331440146", icon: "video" }
    ]
  },
  {
    id: 49,
    qq: "2743055229",
    realName: "高启航",
    nickname: "FLAMEs_",
    graduationYear: 2026,
    signature: "青春追梦 多远都可以到达。",
    description: "青春追梦 多远都可以到达。"
  },
  {
    id: 50,
    qq: "84668277",
    realName: "刘子锌",
    nickname: "Steven_lzx",
    graduationYear: 2026,
    signature: "让希望 做我无声永存的墓志铭",
    description: "让希望 做我无声永存的墓志铭",
    socialLinks: [
      { title: "博客", url: "https://www.cnblogs.com/2020gyk080/", icon: "globe" },
      { title: "知乎", url: "https://www.zhihu.com/people/danna-31-61", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/651245617", icon: "video" }
    ]
  },
  {
    id: 51,
    qq: "2606759895",
    realName: "张瑞格",
    nickname: "Luoxun",
    graduationYear: 2025,
    signature: "唯有爱与科学能永远不朽。",
    description: "唯有爱与科学能永远不朽。",
    socialLinks: [
      { title: "B站", url: "https://space.bilibili.com/1706677744", icon: "video" }
    ]
  },
  {
    id: 52,
    qq: "3266455408",
    realName: "刘子涵",
    nickname: "Read_int",
    graduationYear: 2025,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 53,
    qq: "2032294521",
    realName: "姜博天",
    nickname: "jbt",
    graduationYear: 2018,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 54,
    qq: "19342928",
    realName: "于博源",
    nickname: "Abel51",
    graduationYear: 2028,
    signature: "I AK IOI.",
    description: "I AK IOI.",
    socialLinks: [
      { title: "博客", url: "https://298132.blog.luogu.org/", icon: "globe" },
      { title: "知乎", url: "https://www.zhihu.com/people/abel51", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/503874251", icon: "video" }
    ]
  },
  {
    id: 55,
    qq: "835924565",
    realName: "杜昆泰",
    nickname: "thiswill",
    graduationYear: 2015,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 56,
    qq: "1934161682",
    realName: "土金甲",
    nickname: "Th_Au_K",
    graduationYear: 2021,
    signature: "Kirov reporting",
    description: "Kirov reporting"
  },
  {
    id: 57,
    qq: "904957905",
    realName: "程籽实",
    nickname: "SpadeZ",
    graduationYear: 2023,
    signature: "来年はあらないが、再来年はまだある",
    description: "来年はあらないが、再来年はまだある"
  },
  {
    id: 58,
    qq: "351762385",
    realName: "尹榛菲",
    nickname: "unknown",
    graduationYear: 2015,
    signature: "暂无签名",
    description: "算法竞赛爱好者",
    socialLinks: [
      { title: "博客", url: "https://scholar.google.com.hk/citations?user=ngPR1dIAAAAJ&hl=zh-CN", icon: "globe" }
    ]
  },
  {
    id: 59,
    qq: "407694747",
    realName: "安玺儒",
    nickname: "Dawncx",
    graduationYear: 2022,
    signature: "回忆是捉不到的月光握紧就变黑暗～",
    description: "回忆是捉不到的月光握紧就变黑暗～",
    socialLinks: [
      { title: "博客", url: "blog.csdn.net/dhdhdhx", icon: "globe" }
    ]
  },
  {
    id: 60,
    qq: "3533426421",
    realName: "白孙赫",
    nickname: "Murakum0",
    graduationYear: 2020,
    signature: "学吧，学无止境兄弟",
    description: "学吧，学无止境兄弟"
  },
  {
    id: 61,
    qq: "284322317",
    realName: "金鹏远",
    nickname: "Whiter",
    graduationYear: 2010,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 62,
    qq: "1241717109",
    realName: "惠子轩",
    nickname: "HUIZIXUAN",
    graduationYear: 2019,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 63,
    qq: "2507754403",
    realName: "谭越珩",
    nickname: "dsfz202040",
    graduationYear: 2023,
    signature: "dsfz202013(曲神)yyds！",
    description: "dsfz202013(曲神)yyds！"
  },
  {
    id: 64,
    qq: "731689278",
    realName: "金奚",
    nickname: "jinxi20111",
    graduationYear: 2017,
    signature: "长春，想教竞赛的找我ᕕ ( ᐛ ) ᕗ",
    description: "长春，想教竞赛的找我ᕕ ( ᐛ ) ᕗ"
  },
  {
    id: 65,
    qq: "1514710165",
    realName: "杨默",
    nickname: "aranea-dawn",
    graduationYear: 2026,
    signature: "喵喵喵！",
    description: "喵喵喵！",
    socialLinks: [
      { title: "博客", url: "https://www.luogu.com.cn/blog/aranea-dawn/", icon: "globe" }
    ]
  },
  {
    id: 66,
    qq: "1838408184",
    realName: "史皓宇",
    nickname: "Hououin_Jaeger",
    graduationYear: 2026,
    signature: "我在进行一场豪赌，要么全部带走，要么一无所有",
    description: "我在进行一场豪赌，要么全部带走，要么一无所有",
    socialLinks: [
      { title: "博客", url: "https://www.cnblogs.com/hououinjaeger", icon: "globe" },
      { title: "知乎", url: "https://www.zhihu.com/people/hououin-jaeger", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/612278414", icon: "video" }
    ]
  },
  {
    id: 67,
    qq: "2254502134",
    realName: "李思彤",
    nickname: "LUHCUH",
    graduationYear: 2026,
    signature: "LUHCUH",
    description: "LUHCUH",
    socialLinks: [
      { title: "博客", url: "https://www.cnblogs.com/LUHCUH", icon: "globe" }
    ]
  },
  {
    id: 68,
    qq: "1973489424",
    realName: "栗铭远",
    nickname: "bdfs_then_csdn",
    graduationYear: 2025,
    signature: "deer god",
    university: "吉林大学",
    description: "deer god",
    socialLinks: [
      { title: "知乎", url: "https://www.zhihu.com/people/creature-of-the-", icon: "book" },
      { title: "B站", url: "https://space.bilibili.com/593445757", icon: "video" }
    ]
  },
  {
    id: 69,
    qq: "2041342267",
    realName: "金继烨",
    nickname: "cinccout",
    graduationYear: 2025,
    signature: "懵懂祈祷星光满路）",
    description: "懵懂祈祷星光满路）"
  },
  {
    id: 70,
    qq: "10066692",
    realName: "尹雪淳",
    nickname: "The_Endd",
    graduationYear: 2024,
    signature: "暂无签名",
    university: "吉林大学",
    description: "算法竞赛爱好者"
  },
  {
    id: 71,
    qq: "1142961220",
    realName: "孙一弘",
    nickname: "Helium",
    graduationYear: 2024,
    signature: "暂无签名",
    university: "北京航空航天大学",
    description: "算法竞赛爱好者"
  },
  {
    id: 72,
    qq: "11063075",
    realName: "李博扬",
    nickname: "Starstream",
    graduationYear: 2027,
    signature: "我们从不相信长夜将至，因为探索真理的火把就在我们手中。",
    description: "我们从不相信长夜将至，因为探索真理的火把就在我们手中。",
    socialLinks: [
      { title: "博客", url: "https://blog.csdn.net/xingchen_2008", icon: "globe" },
      { title: "知乎", url: "https://www.zhihu.com/people/1548983850", icon: "book" }
    ]
  },
  {
    id: 73,
    qq: "2428774829",
    realName: "王茂闻",
    nickname: "infinite2021",
    graduationYear: 2028,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 74,
    qq: "2781652082",
    realName: "陈奕含",
    nickname: "Tobiichi_Origami",
    graduationYear: 2028,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 75,
    qq: "249929183",
    realName: "唐诗晴",
    nickname: "Poemsunny",
    graduationYear: 2028,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 76,
    qq: "2705289885",
    realName: "刘瀚博",
    nickname: "Little_CarT",
    graduationYear: 2027,
    signature: "Make them believe.",
    description: "Make them believe.",
    socialLinks: [
      { title: "B站", url: "https://space.bilibili.com/30998899", icon: "video" }
    ]
  },
  {
    id: 77,
    qq: "2530615280",
    realName: "蔡依阳",
    nickname: "OneSheep",
    graduationYear: 2027,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 78,
    qq: "629481458",
    realName: "王诏平",
    nickname: "yyrwlj",
    graduationYear: 2029,
    signature: "暂无签名",
    description: "算法竞赛爱好者"
  },
  {
    id: 79,
    qq: "328349206",
    realName: "孙雪晖",
    nickname: "zidaneandmessi",
    graduationYear: 2016,
    signature: "假球，全是假球",
    university: "齐齐哈尔大学",
    description: "魔法炮",
    socialLinks: [
      { title: "博客", url: "https://zidaneandmessi.github.io/", icon: "globe" },
      { title: "GitHub", url: "https://github.com/zidaneandmessi", icon: "github" },
      { title: "GitHub", url: "https://github.com/nachovy", icon: "github" },
      { title: "B站", url: "https://space.bilibili.com/7929890", icon: "video" }
    ]
  },
  {
    id: 80,
    qq: "1947343700",
    realName: "曲冠衡",
    nickname: "Unk1ndled",
    graduationYear: 2023,
    signature: "dsfz202013，但是accoders又上不去了",
    university: "云南大学",
    description: "Ciallo～(∠・ω< )⌒★",
    socialLinks: [
      { title: "GitHub", url: "https://github.com/Unk1ndledAC", icon: "github" },
      { title: "B站", url: "https://space.bilibili.com/2049457736", icon: "video" },
      
    ]
  }
];

// 获取年级列表（包括毕业年份和在校年级）
export function getGraduationYears(): (number | string)[] {
  const graduationYears = students
    .filter(student => student.graduationYear !== undefined)
    .map(student => student.graduationYear!)
    .filter((year): year is number => year !== undefined);
  
  // 计算当前在校学生的年级
  const currentGrades = students
    .map(student => getCurrentGrade(student.graduationYear))
    .filter((grade): grade is string => grade !== null);
  
  const uniqueGraduationYears = [...new Set(graduationYears)].sort((a, b) => a - b);
  const uniqueCurrentGrades = [...new Set(currentGrades)];
  
  // 按年级大小排序在校年级
  const gradeOrder = ['高三', '高二', '高一', '初三', '初二', '初一'];
  const sortedCurrentGrades = uniqueCurrentGrades.sort((a, b) => {
    return gradeOrder.indexOf(a) - gradeOrder.indexOf(b);
  });
  
  // 返回合并后的列表：先是毕业年份，再是在校年级
  return [...uniqueGraduationYears, ...sortedCurrentGrades];
}

// 获取大学列表
export function getUniversities(): string[] {
  const universities = students
    .filter(student => student.university)
    .map(student => student.university as string);
  return [...new Set(universities)].sort();
}
