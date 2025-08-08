/**
 * 获取公共资源的完整路径
 * 支持GitHub Pages子路径部署
 */
export const getPublicPath = (path: string): string => {
  // 如果路径已经是完整的URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // 确保路径以 / 开头，并对每个段进行安全编码（避免中文/空格导致的 404）
  const rawPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedPath = (() => {
    const parts = rawPath.split('/');
    // 第一个元素为空字符串（因为以 / 开头），保留
    return parts
      .map((segment, index) => {
        if (index === 0) return segment; // 保留开头的空段
        if (!segment) return segment; // 跳过空段
        try {
          // 先解码再编码，避免二次编码
          const decoded = decodeURIComponent(segment);
          return encodeURIComponent(decoded);
        } catch {
          return encodeURIComponent(segment);
        }
      })
      .join('/');
  })();
  
  // 处理本地 file:// 打开场景（直接双击打开 HTML 或本地预览）
  const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';
  if (isFileProtocol) {
    // 返回相对路径，避免以 / 开头在 file 协议下指向系统根目录
    return `.${normalizedPath}`;
  }

  // 优先使用 CRA 注入的 PUBLIC_URL（由 package.json 的 homepage 推导），更稳妥
  // dev 环境下通常为空字符串；生产（如 GitHub Pages /plc）则为子路径前缀
  const publicUrl = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  if (publicUrl) {
    return `${publicUrl}${normalizedPath}`;
  }

  // 尝试从 HTML 中的静态资源标签推断 base（兼容某些托管/预览环境）
  try {
    if (typeof document !== 'undefined') {
      const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement | null;
      const iconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
      const baseCandidate = manifestLink?.href || iconLink?.href;
      if (baseCandidate) {
        const url = new URL(baseCandidate, window.location.href);
        // 去掉末尾文件名，得到前缀
        const basePrefix = url.href.replace(/\/?[^\/]*$/, '');
        // 确保不重复斜杠
        return `${basePrefix}${normalizedPath}`.replace(/([^:])\/\//g, '$1/');
      }
    }
  } catch (_) {
    // 安静降级
  }

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