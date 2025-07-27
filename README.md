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
src/
├── components/          # 可复用组件
│   └── ui/             # shadcn/ui 组件
├── data/               # 数据文件
│   └── mock-data.ts    # 模拟数据
├── pages/              # 页面组件
│   ├── students-page.tsx
│   ├── teachers-page.tsx
│   ├── awards-page.tsx
│   └── person-detail-page.tsx
├── App.tsx             # 主应用组件
├── layout.tsx          # 布局组件
└── main.tsx           # 应用入口
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