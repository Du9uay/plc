import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Target, Settings, Network, Cpu, Zap } from '../components/Icons';
import PathDebugger from '../components/PathDebugger';

const HomePage: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const fullText = 'PLC控制器基础';
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  // 打字机效果
  useEffect(() => {
    if (textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [textIndex, fullText]);

  // 滚动动画控制
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const courseModules = [
    {
      title: '一. PLC行业认知与基础框架',
      description: '认识PLC在工业自动化领域的广泛应用场景，了解其发展历程与基础架构，重点掌握PLC在制造业等行业的定位及基本组成框架。',
      icon: BookOpen,
      path: '/course/automation-industry',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      title: '二. PLC核心定位与硬件基础',
      description: '明确PLC在自动化控制系统中作为核心控制器的功能，讲解其硬件构成，如CPU、输入输出模块等的作用。',
      icon: Cpu,
      path: '/course/plc-basics',
      color: 'from-purple-500 to-pink-500',
      delay: 0.2
    },
    {
      title: '三. 电气接线与信号认知',
      description: '学习电气线路连接的规范方法，认识数字信号、模拟信号等不同类型信号，重点掌握电气接线技巧和信号识别。',
      icon: Network,
      path: '/course/io-wiring',
      color: 'from-green-500 to-teal-500',
      delay: 0.3
    },
    {
      title: '四. PLC程序开发与调试',
      description: '教授使用编程软件进行PLC程序开发，包括编程语言运用，以及程序调试方法，让学员掌握程序开发流程和调试技巧。',
      icon: Zap,
      path: '/course/program-development',
      color: 'from-orange-500 to-red-500',
      delay: 0.4
    },
    {
      title: '五. PLC安全强化',
      description: '讲解PLC操作中的安全事项，如断电操作、防静电等规范，强化学员安全意识，保障操作时人身和设备安全。',
      icon: Settings,
      path: '/course/safety',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const cardHover = {
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* 主标题区域 - 带动画 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ y }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 360,
              transition: { duration: 0.3 }
            }}
          >
            <Cpu className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block">
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="text-blue-300"
              >
                |
              </motion.span>
            </span>
            <motion.span 
              className="block text-2xl font-normal text-blue-300 mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              工业自动化核心技术教学
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            通过系统性学习PLC技术基础，掌握工业自动化控制系统的核心知识，
            培养具备PLC系统设计、编程、调试和维护能力的技术人才。
          </motion.p>
        </motion.div>

        {/* 课程特色 - 滚动动画 */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {[
            { icon: Target, title: '实用性强', desc: '紧密结合工业现场实际需求，从理论基础到实践应用，培养学员解决实际问题的能力。', color: 'from-blue-500 to-cyan-500' },
            { icon: Users, title: '系统完整', desc: '涵盖PLC技术的各个方面，从行业认知到安全强化，构建完整的知识体系。', color: 'from-purple-500 to-pink-500' },
            { icon: Award, title: '就业导向', desc: '课程内容与岗位需求紧密对应，助力学员在工业自动化领域实现职业发展。', color: 'from-green-500 to-teal-500' }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  borderColor: "rgba(255, 255, 255, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 课程模块 - 3D效果 */}
        <motion.div 
          className="mb-16 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold text-white text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            课程章节
          </motion.h2>
          
          {/* 第一行：前3个课程模块 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {courseModules.slice(0, 3).map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: module.delay, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={cardHover}
                  style={{ transformStyle: "preserve-3d" }}
                  className="h-full"
                >
                  <Link
                    to={module.path}
                    className="group relative backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 block h-full"
                  >
                    <motion.div 
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${module.color.split(' ').join(', ')})` }}
                    />
                    
                    <div className="flex flex-col h-full relative z-10">
                      <div className="flex items-start space-x-4 mb-4">
                        <motion.div 
                          className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 15,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <motion.h3 
                            className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {module.title}
                          </motion.h3>
              </div>
            </div>
            
                      <p className="text-gray-300 mb-6 leading-relaxed flex-grow text-sm">
                        {module.description}
                      </p>
                      
                      <motion.div 
                        className={`flex items-center text-blue-300 group-hover:text-blue-200 mt-auto ${
                          index === 0 ? 'drop-shadow-md' : ''
                        }`}
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-sm font-medium">开始学习</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.div>
                      </motion.div>
              </div>
                </Link>
                </motion.div>
              );
            })}
          </div>

          {/* 第二行：后2个课程模块，居中对齐 */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {courseModules.slice(3).map((module, index) => {
                const Icon = module.icon;
                return (
                  <motion.div
                    key={index + 3}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: module.delay, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={cardHover}
                    style={{ transformStyle: "preserve-3d" }}
                    className="h-full"
                  >
                    <Link
                      to={module.path}
                      className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 block h-full"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"
                        style={{ background: `linear-gradient(135deg, ${module.color.split(' ').join(', ')})` }}
                      />
                      
                      <div className="flex flex-col h-full relative z-10">
                        <div className="flex items-start space-x-4 mb-4">
                          <motion.div 
                            className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center flex-shrink-0 ${
                              index === 0 ? 'shadow-lg' : ''
                            }`}
                            whileHover={{ 
                              scale: 1.2,
                              rotate: 15,
                              boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </motion.div>
                          
                          <div className="flex-1">
                            <motion.h3 
                              className={`text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight ${
                                index === 0 ? 'drop-shadow-lg' : ''
                              }`}
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {module.title}
                            </motion.h3>
                </div>
              </div>
              
                        <p className="text-gray-300 mb-6 leading-relaxed flex-grow text-sm">
                  {module.description}
                </p>
                
                        <motion.div 
                          className="flex items-center text-blue-300 group-hover:text-blue-200 mt-auto"
                          whileHover={{ x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="text-sm font-medium">开始学习</span>
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </motion.div>
                        </motion.div>
                      </div>
                </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* 学习路径指引 - 弹簧动画 */}
        <motion.div 
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center max-w-4xl mx-auto relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15,
            delay: 0.2 
          }}
          viewport={{ once: true }}
          whileHover={{ 
            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.3)"
          }}
        >
          {/* 背景动画粒子效果 */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{ 
              background: [
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <motion.h2 
            className="text-3xl font-bold text-white mb-6 relative z-10"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            开始你的PLC学习之旅
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            按照模块顺序学习，从基础认知到实践应用，循序渐进掌握PLC技术精髓。
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/objectives"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg inline-block"
              >
                查看学习目标
              </Link>
            </motion.div>
            

          </motion.div>
        </motion.div>
      </div>
      
      {/* 调试器 - 仅在开发和测试时显示 */}
      <PathDebugger />
    </div>
  );
};
  
export default HomePage; 