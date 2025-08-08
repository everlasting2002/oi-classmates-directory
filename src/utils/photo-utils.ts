/**
 * 照片工具函数
 */

// 缓存已检查的照片路径结果
const photoExistsCache = new Map<string, boolean>();

/**
 * 检查照片是否存在
 * @param photoPath 照片路径
 * @returns Promise<boolean> 照片是否存在
 */
export const checkPhotoExists = async (photoPath: string): Promise<boolean> => {
  // 如果已经缓存了结果，直接返回
  if (photoExistsCache.has(photoPath)) {
    return photoExistsCache.get(photoPath)!;
  }

  try {
    const response = await fetch(photoPath, { method: 'HEAD' });
    const exists = response.ok;
    
    // 缓存结果
    photoExistsCache.set(photoPath, exists);
    return exists;
  } catch (error) {
    // 网络错误或其他错误，认为照片不存在
    photoExistsCache.set(photoPath, false);
    return false;
  }
};

/**
 * 获取学生照片路径
 * @param studentId 学生ID
 * @returns 照片路径
 */
export const getStudentPhotoPath = (studentId: number): string => {
  return `/photos/students/${studentId}-1.jpg`;
};

/**
 * 获取老师照片路径
 * @param teacherId 老师ID
 * @returns 照片路径
 */
export const getTeacherPhotoPath = (teacherId: number): string => {
  return `/photos/teachers/${teacherId}-1.jpg`;
};

/**
 * 预加载照片并检查是否存在
 * @param photoPath 照片路径
 * @returns Promise<boolean> 照片是否成功加载
 */
export const preloadPhoto = (photoPath: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      photoExistsCache.set(photoPath, true);
      resolve(true);
    };
    
    img.onerror = () => {
      photoExistsCache.set(photoPath, false);
      resolve(false);
    };
    
    img.src = photoPath;
  });
};

/**
 * 批量预加载照片
 * @param photoPaths 照片路径数组
 * @returns Promise<Map<string, boolean>> 每个照片路径的存在状态
 */
export const batchPreloadPhotos = async (photoPaths: string[]): Promise<Map<string, boolean>> => {
  const results = new Map<string, boolean>();
  
  const promises = photoPaths.map(async (path) => {
    const exists = await preloadPhoto(path);
    results.set(path, exists);
    return { path, exists };
  });
  
  await Promise.all(promises);
  return results;
};