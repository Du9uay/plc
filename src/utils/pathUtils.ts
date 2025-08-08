/**
 * 获取公共资源的完整路径
 * 支持GitHub Pages子路径部署
 */
export const getPublicPath = (path: string): string => {
  // 如果路径已经是完整的URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 检测是否在GitHub Pages环境
  const isGitHubPages = typeof window !== 'undefined' && 
                       (window.location.hostname === 'du9uay.github.io' ||
                        window.location.pathname.startsWith('/plc') ||
                        window.location.href.includes('du9uay.github.io'));
  
  // 检测是否在开发环境
  const isDevelopment = typeof window !== 'undefined' && 
                       (window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1');
  
  if (isGitHubPages && !isDevelopment) {
    // GitHub Pages环境，确保添加/plc前缀
    if (normalizedPath.startsWith('/plc/')) {
      return normalizedPath;
    }
    return `/plc${normalizedPath}`;
  }
  
  // 开发环境或其他环境直接返回路径
  return normalizedPath;
};

/**
 * 获取图片路径
 */
export const getImagePath = (imagePath: string): string => {
  return getPublicPath(imagePath);
};

/**
 * 获取视频路径
 */
export const getVideoPath = (videoPath: string): string => {
  return getPublicPath(videoPath);
};

/**
 * 获取模型路径
 */
export const getModelPath = (modelPath: string): string => {
  return getPublicPath(modelPath);
};