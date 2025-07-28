// 导入类型定义和数据
export type { Student } from './students-data';
export type { Teacher } from './teachers-data';
export type { Award } from './awards-data';
export { students, getGraduationYears, getUniversities } from './students-data';
export { teachers, getSchools } from './teachers-data';
export { awards, getAwardsByTimeline, getAwardYears, getCompetitionTypes, getAwardsByStudentId } from './awards-data';

// 获取头像URL的函数
export function getAvatarUrl(qq: string): string {
  return `https://q.qlogo.cn/headimg_dl?bs=qq&dst_uin=${qq}&spec=4`;
}

