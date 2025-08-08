import React, { Suspense, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

// OBJ模型加载组件
function OBJModel({ url }: { url: string }) {
  const [obj, setObj] = useState<any>(null);
  const { scene } = useThree();
  
  React.useEffect(() => {
    const loader = new OBJLoader();
    loader.load(
      url,
      (loadedObj: any) => {
        // 计算模型边界框并居中
        const box = new THREE.Box3().setFromObject(loadedObj);
        const center = box.getCenter(new THREE.Vector3());
        loadedObj.position.sub(center);
        
        // 调整模型大小
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;
        loadedObj.scale.setScalar(scale);
        
        setObj(loadedObj);
        scene.add(loadedObj);
      },
      (progress: any) => {
        console.log('Loading progress:', progress);
      },
      (error: any) => {
        console.error('Error loading OBJ:', error);
      }
    );
    
    return () => {
      if (obj) {
        scene.remove(obj);
      }
    };
  }, [url, scene, obj]);
  
  return null;
}

// 加载中的占位组件
function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

interface Model3DViewerProps {
  modelPath: string;
  title?: string;
  description?: string;
}

const Model3DViewer: React.FC<Model3DViewerProps> = ({ modelPath, title = "3D模型展示", description }) => {
  const [error, setError] = useState<string | null>(null);
  
  return (
    <div className="w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 my-6">
      {title && (
        <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      )}
      {description && (
        <p className="text-white/80 text-sm mb-4">{description}</p>
      )}
      
      <div className="w-full h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-white/10">
        {error ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-400 mb-2">模型加载失败</p>
              <p className="text-white/60 text-sm">{error}</p>
            </div>
          </div>
        ) : (
          <Canvas
            camera={{ position: [5, 5, 5], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
            onCreated={() => setError(null)}
          >
            <Suspense fallback={<LoadingBox />}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} />
              <OBJModel url={modelPath} />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={10}
              />
              <gridHelper args={[10, 10]} />
            </Suspense>
          </Canvas>
        )}
      </div>
      
      <div className="mt-3 text-white/60 text-xs">
        <p>使用鼠标左键旋转，右键平移，滚轮缩放</p>
      </div>
    </div>
  );
};

export default Model3DViewer;