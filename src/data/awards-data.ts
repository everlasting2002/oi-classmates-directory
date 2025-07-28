// 获奖信息类型定义
export interface Award {
  id: number;
  year: number;
  season: 'WC' | 'CTSC' | 'APIO' | 'NOI' | 'IOI';
  competition: string;
  students: {
    gold: number[];    // 金牌获奖学生ID
    silver: number[];  // 银牌获奖学生ID
    bronze: number[];  // 铜牌获奖学生ID
  };
}

// 模拟获奖数据（按时间轴组织）
export const awards: Award[] = [
  {
    id: 1,
    year: 2013,
    season: 'APIO',
    competition: 'APIO 2013',
    students: {
      gold: [],
      silver: [],
      bronze: [55]
    }
  },
  {
    id: 2,
    year: 2014,
    season: 'CTSC',
    competition: 'CTSC 2014',
    students: {
      gold: [],
      silver: [],
      bronze: [55]
    }
  },
  {
    id: 3,
    year: 2014,
    season: 'APIO',
    competition: 'APIO 2014',
    students: {
      gold: [],
      silver: [],
      bronze: [55, 3, 5, 12]
    }
  },
  {
    id: 4,
    year: 2014,
    season: 'NOI',
    competition: 'NOI 2014',
    students: {
      gold: [],
      silver: [],
      bronze: [55]
    }
  },
  {
    id: 5,
    year: 2015,
    season: 'WC',
    competition: 'WC 2015',
    students: {
      gold: [],
      silver: [3],
      bronze: [5, 6, 12]
    }
  },
  {
    id: 6,
    year: 2015,
    season: 'CTSC',
    competition: 'CTSC 2015',
    students: {
      gold: [],
      silver: [3, 5],
      bronze: [4]
    }
  },
  {
    id: 7,
    year: 2015,
    season: 'APIO',
    competition: 'APIO 2015',
    students: {
      gold: [],
      silver: [3, 5],
      bronze: [4, 6, 79, 12]
    }
  },
  {
    id: 8,
    year: 2015,
    season: 'NOI',
    competition: 'NOI 2015',
    students: {
      gold: [3],
      silver: [5],
      bronze: [79]
    }
  },
  {
    id: 9,
    year: 2016,
    season: 'WC',
    competition: 'WC 2016',
    students: {
      gold: [],
      silver: [8, 9, 12, 13, 14],
      bronze: [10]
    }
  },
  {
    id: 10,
    year: 2016,
    season: 'CTSC',
    competition: 'CTSC 2016',
    students: {
      gold: [],
      silver: [8, 9, 12, 13],
      bronze: [14]
    }
  },
  {
    id: 11,
    year: 2016,
    season: 'APIO',
    competition: 'APIO 2016',
    students: {
      gold: [8],
      silver: [9, 10, 12],
      bronze: [13, 14]
    }
  },
  {
    id: 12,
    year: 2016,
    season: 'NOI',
    competition: 'NOI 2016',
    students: {
      gold: [8, 12],
      silver: [10, 13],
      bronze: [9, 11, 14]
    }
  },
  {
    id: 13,
    year: 2017,
    season: 'WC',
    competition: 'WC 2017',
    students: {
      gold: [13],
      silver: [29],
      bronze: [14, 16]
    }
  },
  {
    id: 14,
    year: 2017,
    season: 'CTSC',
    competition: 'CTSC 2017',
    students: {
      gold: [12, 13],
      silver: [14, 16],
      bronze: [15]
    }
  },
  {
    id: 15,
    year: 2017,
    season: 'APIO',
    competition: 'APIO 2017',
    students: {
      gold: [13],
      silver: [15, 16],
      bronze: [14, 21, 22]
    }
  },
  {
    id: 16,
    year: 2017,
    season: 'NOI',
    competition: 'NOI 2017',
    students: {
      gold: [13, 14, 16],
      silver: [],
      bronze: [12, 15, 22]
    }
  },
  {
    id: 17,
    year: 2018,
    season: 'CTSC',
    competition: 'CTSC 2018',
    students: {
      gold: [],
      silver: [],
      bronze: [20, 21, 22, 27, 29]
    }
  },
  {
    id: 18,
    year: 2018,
    season: 'NOI',
    competition: 'NOI 2018',
    students: {
      gold: [],
      silver: [29],
      bronze: [20, 21, 22, 27]
    }
  },
  {
    id: 19,
    year: 2018,
    season: 'WC',
    competition: 'WC 2018',
    students: {
      gold: [],
      silver: [],
      bronze: [21, 22, 29]
    }
  },
  {
    id: 20,
    year: 2018,
    season: 'APIO',
    competition: 'APIO 2018',
    students: {
      gold: [21, 29],
      silver: [22],
      bronze: [1, 27]
    }
  },
  {
    id: 21,
    year: 2019,
    season: 'WC',
    competition: 'WC 2019',
    students: {
      gold: [27, 29],
      silver: [33],
      bronze: [1, 25]
    }
  },
  {
    id: 22,
    year: 2019,
    season: 'APIO',
    competition: 'APIO 2019',
    students: {
      gold: [27, 29],
      silver: [],
      bronze: [1, 25, 33]
    }
  },
  {
    id: 23,
    year: 2019,
    season: 'NOI',
    competition: 'NOI 2019',
    students: {
      gold: [29],
      silver: [27],
      bronze: [1, 25, 33]
    }
  },
  {
    id: 24,
    year: 2019,
    season: 'CTSC',
    competition: 'CTS 2019',
    students: {
      gold: [],
      silver: [25, 27],
      bronze: [29, 33]
    }
  },
  {
    id: 25,
    year: 2020,
    season: 'NOI',
    competition: 'NOI 2020',
    students: {
      gold: [],
      silver: [33, 34, 35, 40],
      bronze: [39]
    }
  },
  {
    id: 26,
    year: 2020,
    season: 'WC',
    competition: 'WC 2020',
    students: {
      gold: [],
      silver: [34],
      bronze: []
    }
  },
  {
    id: 27,
    year: 2020,
    season: 'APIO',
    competition: 'APIO 2020',
    students: {
      gold: [34],
      silver: [35, 43],
      bronze: [39, 40, 45]
    }
  },
  {
    id: 28,
    year: 2021,
    season: 'WC',
    competition: 'WC 2021',
    students: {
      gold: [34],
      silver: [35, 40, 42, 43],
      bronze: [36, 47, 57, 44, 45]
    }
  },
  {
    id: 29,
    year: 2021,
    season: 'APIO',
    competition: 'APIO 2021',
    students: {
      gold: [34],
      silver: [35, 38, 40],
      bronze: [36, 47, 39, 57]
    }
  },
  {
    id: 30,
    year: 2021,
    season: 'NOI',
    competition: 'NOI 2021',
    students: {
      gold: [34],
      silver: [35, 40, 43],
      bronze: [36, 38, 47, 39, 41, 57, 42]
    }
  },
  {
    id: 31,
    year: 2022,
    season: 'APIO',
    competition: 'APIO 2022',
    students: {
      gold: [],
      silver: [40, 67],
      bronze: [39, 57, 42, 43, 71]
    }
  },
  {
    id: 32,
    year: 2022,
    season: 'WC',
    competition: 'WC 2022',
    students: {
      gold: [],
      silver: [44, 45, 67],
      bronze: [40, 41, 57, 42, 43]
    }
  },
  {
    id: 33,
    year: 2022,
    season: 'NOI',
    competition: 'NOI 2022',
    students: {
      gold: [],
      silver: [42, 43, 44, 45],
      bronze: [40, 57]
    }
  },
  {
    id: 34,
    year: 2023,
    season: 'WC',
    competition: 'WC 2023',
    students: {
      gold: [44],
      silver: [45, 67],
      bronze: [42, 43, 52, 68, 77]
    }
  },
  {
    id: 35,
    year: 2023,
    season: 'APIO',
    competition: 'APIO 2023',
    students: {
      gold: [44],
      silver: [43, 45],
      bronze: [42, 52, 68, 67]
    }
  },
  {
    id: 36,
    year: 2023,
    season: 'NOI',
    competition: 'NOI 2023',
    students: {
      gold: [43],
      silver: [42, 44, 45],
      bronze: [71, 52, 69, 67]
    }
  },
  {
    id: 37,
    year: 2024,
    season: 'WC',
    competition: 'WC 2024',
    students: {
      gold: [45],
      silver: [],
      bronze: [44]
    }
  },
  {
    id: 38,
    year: 2024,
    season: 'APIO',
    competition: 'APIO 2024',
    students: {
      gold: [44, 45],
      silver: [67],
      bronze: [52, 69]
    }
  },
  {
    id: 39,
    year: 2024,
    season: 'NOI',
    competition: 'NOI 2024',
    students: {
      gold: [],
      silver: [44, 45, 69],
      bronze: [52, 68, 66, 48]
    }
  },
  {
    id: 40,
    year: 2025,
    season: 'NOI',
    competition: 'NOI 2025',
    students: {
      gold: [],
      silver: [67, 48],
      bronze: [66, 76, 77, 75]
    }
  },
  {
    id: 41,
    year: 2025,
    season: 'APIO',
    competition: 'APIO 2025',
    students: {
      gold: [],
      silver: [76],
      bronze: [67, 48]
    }
  },
];

// 定义赛季顺序
const SEASON_ORDER: { [key: string]: number } = {
  'WC': 1,
  'CTSC': 2,
  'APIO': 3,
  'NOI': 4,
  'IOI': 5
};

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
  
  // 对每年的赛季按照预定义顺序排序
  Object.keys(timeline).forEach(year => {
    const yearData = timeline[parseInt(year)];
    const sortedSeasons: { [season: string]: Award[] } = {};
    
    // 按照SEASON_ORDER排序
    Object.keys(yearData)
      .sort((a, b) => (SEASON_ORDER[a] || 999) - (SEASON_ORDER[b] || 999))
      .forEach(season => {
        sortedSeasons[season] = yearData[season];
      });
    
    timeline[parseInt(year)] = sortedSeasons;
  });
  
  return timeline;
}

// 获取所有比赛年份
export function getAwardYears(): number[] {
  const years = [...new Set(awards.map(award => award.year))];
  return years.sort((a, b) => b - a); // 降序排列
}

// 获取所有比赛类型
export function getCompetitionTypes(): string[] {
  const types = [...new Set(awards.map(award => award.season))];
  return types;
}

// 根据学生ID获取其获奖记录
export function getAwardsByStudentId(studentId: number): Award[] {
  return awards.filter(award => 
    award.students.gold.includes(studentId) ||
    award.students.silver.includes(studentId) ||
    award.students.bronze.includes(studentId)
  );
}

// 获取学生在特定奖项中的等级
export function getStudentAwardLevel(award: Award, studentId: number): '金牌' | '银牌' | '铜牌' | null {
  if (award.students.gold.includes(studentId)) return '金牌';
  if (award.students.silver.includes(studentId)) return '银牌';
  if (award.students.bronze.includes(studentId)) return '铜牌';
  return null;
}