// 同学信息类型定义
export interface Student {
  id: number;
  qq: string;
  realName: string; // 真实姓名
  nickname: string;
  graduationYear: number;
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

// 老师信息类型定义
export interface Teacher {
  id: number;
  qq: string;
  realName: string;
  nickname: string;
  signature: string;
  title: string; // 职称
  school: string; // 学校
  avatar?: string;
  socialLinks?: {
    title: string;
    url: string;
    icon?: string;
  }[];
  description?: string;
}

// 获奖信息类型定义
export interface Award {
  id: number;
  year: number;
  season: 'NOIP' | 'APIO' | 'NOI' | 'IOI' | 'ICPC' | '其他';
  competition: string;
  level: '金牌' | '银牌' | '铜牌' | '一等奖' | '二等奖' | '三等奖';
  students: number[]; // 获奖学生ID
  date?: string; // 具体日期
}

// 模拟同学数据
export const students: Student[] = [
  {
    id: 1,
    qq: "10001",
    realName: "张三",
    nickname: "算法大师",
    graduationYear: 2023,
    signature: "热爱算法，热爱生活",
    university: "清华大学",
    description: "专注于算法竞赛多年，擅长动态规划和图论算法。",
    socialLinks: [
      { title: "博客", url: "https://blog.example.com/algo-master", icon: "globe" },
      { title: "GitHub", url: "https://github.com/algo-master", icon: "github" },
      { title: "知乎", url: "https://zhihu.com/people/algo-master", icon: "book" }
    ]
  },
  {
    id: 2,
    qq: "10002",
    realName: "李四",
    nickname: "代码猫",
    graduationYear: 2023,
    signature: "写代码的猫",
    university: "北京大学",
    description: "喜欢用简洁的代码解决复杂问题。",
    socialLinks: [
      { title: "GitHub", url: "https://github.com/code-cat", icon: "github" },
      { title: "Codeforces", url: "https://codeforces.com/profile/codecat", icon: "code" }
    ]
  },
  {
    id: 3,
    qq: "10003",
    realName: "王五",
    nickname: "数据结构",
    graduationYear: 2022,
    signature: "数据结构是算法的基础",
    description: "对各种数据结构有深入理解，善于优化时间复杂度。"
  },
  {
    id: 4,
    qq: "10004",
    realName: "赵六",
    nickname: "动态规划",
    graduationYear: 2022,
    signature: "DP是一种解决问题的思想",
    university: "复旦大学",
    description: "动态规划专家，解决过多个经典DP问题。",
    socialLinks: [
      { title: "博客", url: "https://blog.example.com/dp-master", icon: "globe" }
    ]
  },
  {
    id: 5,
    qq: "10005",
    realName: "孙七",
    nickname: "图论专家",
    graduationYear: 2021,
    signature: "图论是我的最爱",
    university: "上海交通大学",
    description: "专注于图论算法研究，对最短路径和网络流算法有独到见解。"
  },
  {
    id: 6,
    qq: "10006",
    realName: "周八",
    nickname: "贪心算法",
    graduationYear: 2021,
    signature: "贪心策略往往是最优解",
    socialLinks: [
      { title: "GitHub", url: "https://github.com/greedy-algo", icon: "github" }
    ]
  },
  {
    id: 7,
    qq: "10007",
    realName: "吴九",
    nickname: "搜索之王",
    graduationYear: 2020,
    signature: "DFS和BFS是我的拿手好戏",
    university: "中国科学技术大学",
    description: "搜索算法专家，擅长解决复杂的搜索问题。"
  },
  {
    id: 8,
    qq: "10008",
    realName: "郑十",
    nickname: "数论爱好者",
    graduationYear: 2020,
    signature: "数学是算法的基础",
    university: "哈尔滨工业大学",
    description: "数论和数学算法专家，对密码学也有涉猎。",
    socialLinks: [
      { title: "博客", url: "https://blog.example.com/number-theory", icon: "globe" },
      { title: "GitHub", url: "https://github.com/number-theory", icon: "github" }
    ]
  }
];

// 模拟老师数据
export const teachers: Teacher[] = [
  {
    id: 1,
    qq: "20001",
    realName: "陈老师",
    nickname: "算法导师",
    signature: "教书育人，传承算法之美",
    title: "高级教师",
    school: "北京市第一中学",
    description: "从事信息学竞赛教学15年，培养了众多优秀学生。",
    socialLinks: [
      { title: "教学博客", url: "https://blog.example.com/teacher-chen", icon: "globe" },
      { title: "GitHub", url: "https://github.com/teacher-chen", icon: "github" }
    ]
  },
  {
    id: 2,
    qq: "20002",
    realName: "刘老师",
    nickname: "编程教练",
    signature: "用心培养每一位学生",
    title: "特级教师",
    school: "上海市实验中学",
    description: "专注于算法竞赛教学，注重培养学生的逻辑思维能力。"
  },
  {
    id: 3,
    qq: "20003",
    realName: "杨老师",
    nickname: "OI导师",
    signature: "让每个孩子都能享受编程的乐趣",
    title: "高级教师",
    school: "深圳中学",
    description: "年轻有为的信息学老师，善于用创新的方法教学。",
    socialLinks: [
      { title: "知乎", url: "https://zhihu.com/people/teacher-yang", icon: "book" }
    ]
  }
];

// 模拟获奖数据（按时间轴组织）
export const awards: Award[] = [
  // 2022年
  {
    id: 1,
    year: 2022,
    season: 'NOIP',
    competition: 'NOIP 2022',
    level: '一等奖',
    students: [1, 2],
    date: '2022-11'
  },
  {
    id: 2,
    year: 2022,
    season: 'APIO',
    competition: 'APIO 2022',
    level: '银牌',
    students: [1],
    date: '2022-05'
  },
  {
    id: 3,
    year: 2022,
    season: 'NOI',
    competition: 'NOI 2022',
    level: '金牌',
    students: [1, 2],
    date: '2022-07'
  },
  {
    id: 4,
    year: 2022,
    season: 'NOI',
    competition: 'NOI 2022',
    level: '银牌',
    students: [3, 4],
    date: '2022-07'
  },
  // 2021年
  {
    id: 5,
    year: 2021,
    season: 'NOIP',
    competition: 'NOIP 2021',
    level: '一等奖',
    students: [5, 6],
    date: '2021-11'
  },
  {
    id: 6,
    year: 2021,
    season: 'NOI',
    competition: 'NOI 2021',
    level: '金牌',
    students: [5],
    date: '2021-07'
  },
  {
    id: 7,
    year: 2021,
    season: 'NOI',
    competition: 'NOI 2021',
    level: '银牌',
    students: [6],
    date: '2021-07'
  },
  // 2020年
  {
    id: 8,
    year: 2020,
    season: 'NOI',
    competition: 'NOI 2020',
    level: '金牌',
    students: [7, 8],
    date: '2020-08'
  }
];

// 获取学生头像URL的函数
export function getAvatarUrl(qq: string): string {
  return `https://q.qlogo.cn/headimg_dl?bs=qq&dst_uin=${qq}&spec=4`;
}

// 获取年级列表
export function getGraduationYears(): number[] {
  const years = students.map(student => student.graduationYear);
  return [...new Set(years)].sort((a, b) => b - a); // 降序排列
}

// 获取大学列表
export function getUniversities(): string[] {
  const universities = students
    .filter(student => student.university)
    .map(student => student.university as string);
  return [...new Set(universities)].sort();
}

// 获取学校列表（老师）
export function getSchools(): string[] {
  const schools = teachers.map(teacher => teacher.school);
  return [...new Set(schools)].sort();
}

// 按年份和赛季组织获奖数据
export function getAwardsByTimeline(): { [year: number]: { [season: string]: Award[] } } {
  const timeline: { [year: number]: { [season: string]: Award[] } } = {};
  
  awards.forEach(award => {
    if (!timeline[award.year]) {
      timeline[award.year] = {};
    }
    if (!timeline[award.year][award.season]) {
      timeline[award.year][award.season] = [];
    }
    timeline[award.year][award.season].push(award);
  });
  
  return timeline;
}