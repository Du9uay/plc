import React, { useState, useEffect } from 'react';
import { getImagePath, getVideoPath } from '../utils/pathUtils';

const PathDebugger: React.FC = () => {
  const [imageLoadTest, setImageLoadTest] = useState<string>('未测试');
  const [videoLoadTest, setVideoLoadTest] = useState<string>('未测试');
  
  const sampleImagePath = `/images/${encodeURIComponent('1.1PLC行业认知与基础框架1(分辨率不够).jpg')}`;
  const sampleVideoPath = `/videos/${encodeURIComponent('1. 工业控制器定义与核心作用.mp4')}`;
  const tutorVideoPath = '/tutor-transparent.mp4';
  const testImagePath = '/test-image.jpg';
  
  useEffect(() => {
    // 测试图片加载
    const img = new Image();
    const processedImagePath = getImagePath(sampleImagePath);
    img.onload = () => setImageLoadTest('✅ 成功');
    img.onerror = () => setImageLoadTest('❌ 失败');
    img.src = processedImagePath;
    
    // 测试视频加载
    const video = document.createElement('video');
    const processedVideoPath = getVideoPath(sampleVideoPath);
    video.onloadstart = () => setVideoLoadTest('✅ 成功');
    video.onerror = () => setVideoLoadTest('❌ 失败');
    video.src = processedVideoPath;
  }, [sampleImagePath, sampleVideoPath]);
  
  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-md z-50 max-h-96 overflow-y-auto">
      <h4 className="font-bold mb-2">路径调试信息</h4>
      <div className="space-y-1">
        <div>
          <strong>当前域名:</strong> {window.location.hostname}
        </div>
        <div>
          <strong>当前路径:</strong> {window.location.pathname}
        </div>
        <div>
          <strong>完整URL:</strong> {window.location.href}
        </div>
        <hr className="my-2 border-gray-600" />
        <div>
          <strong>示例图片路径:</strong> 
          <br />原始: {sampleImagePath}
          <br />处理后: {getImagePath(sampleImagePath)}
          <br />加载测试: {imageLoadTest}
        </div>
        <hr className="my-2 border-gray-600" />
        <div>
          <strong>示例视频路径:</strong>
          <br />原始: {sampleVideoPath}
          <br />处理后: {getVideoPath(sampleVideoPath)}
          <br />加载测试: {videoLoadTest}
        </div>
        <hr className="my-2 border-gray-600" />
        <div>
          <strong>导师视频路径:</strong>
          <br />原始: {tutorVideoPath}
          <br />处理后: {getVideoPath(tutorVideoPath)}
        </div>
        <hr className="my-2 border-gray-600" />
        <div>
          <strong>测试图片(ASCII文件名):</strong>
          <br />原始: {testImagePath}
          <br />处理后: {getImagePath(testImagePath)}
        </div>
        <hr className="my-2 border-gray-600" />
        <div>
          <strong>GitHub Pages说明:</strong>
          <br />基础路径应该是: /plc
          <br />资源应该在: /plc/images/, /plc/videos/
        </div>
      </div>
    </div>
  );
};

export default PathDebugger;