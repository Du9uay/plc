import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// 懒加载3D模型组件
const EnhancedPLCModel = lazy(() => import('./EnhancedPLCModel'));

// 加载状态组件
const LoadingPlaceholder: React.FC<{ height?: string }> = ({ height = "500px" }) => (
  <div 
    className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 rounded-xl flex items-center justify-center"
    style={{ height }}
  >
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-white/70">加载3D模型中...</p>
    </div>
  </div>
);

// 错误边界组件
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('3D模型加载错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-8 text-center">
            <p className="text-red-400">3D模型加载失败</p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              重试
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

interface LazyLoadedPLCModelProps {
  type?: 'enhanced' | 'detailed';
  className?: string;
  delay?: number;
}

const LazyLoadedPLCModel: React.FC<LazyLoadedPLCModelProps> = ({ 
  type = 'enhanced',
  className = "",
  delay = 100
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);

  useEffect(() => {
    // 延迟加载3D模型，确保其他内容先加载
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (shouldLoad) {
      // 使用IntersectionObserver实现懒加载
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setModelVisible(true);
            }
          });
        },
        { threshold: 0.1 }
      );

      const element = document.getElementById(`plc-model-${type}`);
      if (element) {
        observer.observe(element);
      }

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  }, [shouldLoad, type]);

  return (
    <div id={`plc-model-${type}`} className={className}>
      {shouldLoad && modelVisible ? (
        <ModelErrorBoundary>
          <Suspense fallback={<LoadingPlaceholder />}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {type === 'enhanced' ? (
                <EnhancedPLCModel className={className} />
              ) : (
                <LoadingPlaceholder />
              )}
            </motion.div>
          </Suspense>
        </ModelErrorBoundary>
      ) : (
        <LoadingPlaceholder height={type === 'enhanced' ? '500px' : '400px'} />
      )}
    </div>
  );
};

export default LazyLoadedPLCModel;