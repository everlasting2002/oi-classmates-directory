# OI同学通讯录

专为信息学奥林匹克竞赛同学设计的通讯录系统

## 📋 项目简介

这是一个现代化的通讯录网站，专门为OI（信息学奥林匹克）同学们设计。提供了学生信息管理、教师信息展示、获奖记录查看等功能。

## ✨ 主要功能

- 📚 **学生信息管理** - 查看和管理学生基本信息
- 👨‍🏫 **教师信息展示** - 展示教师详细资料
- 🏆 **获奖记录** - 记录和展示各类竞赛获奖情况
- 🔍 **搜索功能** - 快速查找相关人员信息
- 📱 **响应式设计** - 支持各种设备访问

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **UI组件**: shadcn/ui + Radix UI
- **样式**: Tailwind CSS
- **路由**: React Router DOM
- **图标**: Lucide React
- **图表**: Recharts

## 🚀 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 查看项目

### 构建项目

```bash
npm run build
```

构建文件将生成在 `dist/` 目录中

### 预览构建结果

```bash
npm run preview
```

## 📁 项目结构

```
oi-classmates-directory/
├── .github/
│   └── workflows/
│       └── deploy.yml                        # GitHub Actions CI/CD 部署工作流
├── public/
│   ├── favicon.ico                           # 网站图标
│   └── photos/
│       ├── students/                         # 学生个人照片 ({id}-1.jpg)
│       └── teachers/                         # 教师个人照片 ({id}-1.jpg)
├── src/
│   ├── components/                           # 可复用业务组件
│   │   ├── error-boundary.tsx                #   错误边界
│   │   ├── flip-card.tsx                     #   学生卡片翻转动画
│   │   ├── mobile-nav.tsx                    #   移动端侧滑导航
│   │   ├── mobile-optimized-wrapper.tsx      #   移动端性能优化包装器
│   │   ├── theme-provider.tsx                #   浅色/深色主题切换
│   │   └── ui/                               #   shadcn/ui 组件库
│   ├── contexts/
│   │   └── filter-context.tsx                #   筛选状态管理
│   ├── data/                                 # 数据层
│   │   ├── students-data.ts                  #   学生数据
│   │   ├── teachers-data.ts                  #   教师数据
│   │   ├── awards-data.ts                    #   获奖数据
│   │   └── mock-data.ts                      #   数据导出聚合 + QQ 头像 URL 生成
│   ├── hooks/                                # 自定义 Hooks
│   │   ├── use-mobile.tsx                    #   移动端断点检测
│   │   ├── use-mobile-optimized.ts           #   移动端/平板/触摸设备检测
│   │   └── use-toast.ts                      #   Toast 通知 Hook
│   ├── lib/
│   │   └── utils.ts                          #   cn() 工具函数
│   ├── pages/                                # 页面组件
│   │   ├── students-page.tsx                 #   同学列表页
│   │   ├── teachers-page.tsx                 #   教师列表页
│   │   ├── awards-page.tsx                   #   获奖时间轴
│   │   └── person-detail-page.tsx            #   个人详情页
│   ├── styles/
│   │   └── mobile-optimizations.css          #   移动端优化样式
│   ├── utils/
│   │   ├── mobile-performance.ts             #   移动端性能优化
│   │   └── photo-utils.ts                    #   照片工具
│   ├── App.tsx                               # 根组件
│   ├── layout.tsx                            # 全局布局
│   ├── main.tsx                              # 应用入口
│   └── globals.css                           # 全局样式
├── index.html                                # HTML 入口
├── package.json                              # 项目依赖与脚本
├── vite.config.ts                            # Vite 构建配置
├── tailwind.config.ts                        # Tailwind CSS 配置
├── tsconfig.json                             # TypeScript 配置
├── components.json                           # shadcn/ui 配置
└── README.md
```

### 更新条目

本通讯录的数据存储在 `src/data/` 下的两个文件中，**添加新成员时只需按对应格式追加条目**，无需改动其他代码。

#### 添加学生 — `src/data/students-data.ts`

在 `students` 数组末尾追加一个新对象，字段说明如下：

| 字段 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `id` | `number` | ✅ | 唯一标识，按已有最大 id 递增 |
| `qq` | `string` | ✅ | QQ 号码 |
| `realName` | `string` | ✅ | 真实姓名 |
| `nickname` | `string` | ✅ | OI 常用昵称 (handle) |
| `signature` | `string` | ✅ | 个人签名 / 个性签名 |
| `graduationYear` | `number` | | 高中毕业年份 (在校生可省略) |
| `university` | `string` | | 就读大学 (已毕业者填写) |
| `wechat` | `string` | | 微信号 |
| `avatar` | `string` | | 照片路径，照片放入 `public/photos/students/`，命名为 `{id}-1.jpg` |
| `description` | `string` | | 个人描述 / 补充说明 |
| `socialLinks` | `array` | | 社交链接数组，每项含 `title`、`url`、`icon` (可选) |

**示例条目：**

```ts
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
  }
```

#### 添加教师 — `src/data/teachers-data.ts`

在 `teachers` 数组末尾追加一个新对象，字段说明如下：

| 字段 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `id` | `number` | ✅ | 唯一标识，按已有最大 id 递增 |
| `qq` | `string` | ✅ | QQ 号码 |
| `realName` | `string` | ✅ | 真实姓名 |
| `nickname` | `string` | ✅ | OI 常用昵称 (handle) |
| `signature` | `string` | ✅ | 个人签名 / 口头禅 |
| `title` | `string` | ✅ | 职称 (如"特级教练员"、"高级教练员"等) |
| `school` | `string` | ✅ | 所在学校 |
| `wechat` | `string` | | 微信号 |
| `avatar` | `string` | | 照片路径，照片放入 `public/photos/teachers/`，命名为 `{id}-1.jpg` |
| `description` | `string` | | 个人描述 / 补充说明 |
| `socialLinks` | `array` | | 社交链接数组，每项含 `title`、`url`、`icon` (可选) |

**示例条目：**

```ts
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
  }
```

## 🎨 设计特色

- 现代化的UI设计
- 深色/浅色主题切换
- 响应式布局适配
- 流畅的动画效果
- 直观的用户交互

## 📝 开发说明

项目使用了现代化的React开发模式，包含：

- TypeScript 类型安全
- ESLint 代码规范
- Tailwind CSS 原子化样式
- shadcn/ui 高质量组件库

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

## 📄 许可证

MIT License

---

**为OI同学们打造的专属通讯录系统** 🎯