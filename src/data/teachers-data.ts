// 老师信息类型定义
export interface Teacher {
  id: number;
  qq: string;
  wechat?: string;
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

// 模拟老师数据
export const teachers: Teacher[] = [
  {
    id: 1,
    realName: "王晓光",
    nickname: "friendi",
    qq: "23058720",
    wechat: "13844055086",
    signature: "一定要改题，不能抄代码，比赛都得打",
    school: "东北师范大学附属中学",
    title: "特级教练员",
    description: "特级教练员，一定要改题，不能抄代码，比赛都得打"
  },
  {
    id: 2,
    realName: "王昌平",
    nickname: "net_assassin",
    qq: "903484399",
    wechat: "15948756996",
    signature: "就那啥嘛，一横一竖，然后gzotpa",
    school: "东北师范大学附属中学",
    title: "高级教练员",
    description: "高级教练员，就那啥嘛，一横一竖，然后gzotpa",
    socialLinks: [
      { title: "博客", url: "https://blog.csdn.net/net_assassin/", icon: "globe" }
    ]
  },
  {
    id: 3,
    realName: "孔维玲",
    nickname: "ling",
    qq: "147729099",
    wechat: "kwling123",
    signature: "我替学校谢谢你们",
    school: "东北师范大学附属中学",
    title: "特级教练员",
    description: "特级教练员，我替学校谢谢你们",
  },
  {
    id: 4,
    realName: "任雪亮",
    nickname: "moonlight131",
    qq: "703180800",
    signature: "你斜~的吗",
    school: "东北师范大学附属中学",
    title: "一级教练员",
    description: "一级教练员，你斜~的吗"
  },
];

// 获取学校列表（老师）
export function getSchools(): string[] {
  const schools = teachers.map(teacher => teacher.school);
  return [...new Set(schools)].sort();
}