import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, Zap, Code, Database } from 'lucide-react'; 

const LoadingPage = ({ isLoading, networkError, onRetry }) => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [particles, setParticles] = useState([]); 

  const loadingSteps = [
    { text: 'Initializing AI Engine', icon: Zap, color: 'text-yellow-400' },
    { text: 'Loading Learning Modules', icon: Code, color: 'text-blue-400' },
    { text: 'Connecting to Database', icon: Database, color: 'text-green-400' },
    { text: 'Preparing Dashboard', icon: Wifi, color: 'text-purple-400' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate floating particles
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []); 

  useEffect(() => {
    if (isLoading) {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 8;
          
          // Update current step based on progress
          const stepProgress = Math.floor((newProgress / 100) * loadingSteps.length);
          setCurrentStep(Math.min(stepProgress, loadingSteps.length - 1));
          
          if (newProgress >= 95) return 95;
          return newProgress;
        });
      }, 150);
      return () => clearInterval(progressInterval);
    }
  }, [isLoading, loadingSteps.length]); 

  if (!isLoading && !networkError) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Geometric Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-400 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-purple-400 rotate-12 animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      </div>

      <div className="text-center relative z-10 max-w-md mx-auto px-6">
        {networkError ? (
          <div className="space-y-8">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <WifiOff className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto border-2 border-red-400 rounded-full animate-ping" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Connection Lost
              </h2>
              <p className="text-red-200">Please check your internet connection and try again</p>
            </div>

            <button
              onClick={onRetry}
              className="group flex items-center space-x-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 mx-auto shadow-lg shadow-red-500/25"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-semibold">Retry Connection</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Main Loading Icon */}
            <div className="relative">
              <div className="w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-spin opacity-75" />
                <div className="absolute inset-2 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 rounded-full flex items-center justify-center">
                  {loadingSteps[currentStep] && (() => {
                    const CurrentIcon = loadingSteps[currentStep].icon;
                    return <CurrentIcon className={`w-12 h-12 ${loadingSteps[currentStep].color} animate-pulse`} />;
                  })()}
                </div>
              </div>
              <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-blue-400 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }} />
            </div>

            {/* Progress Section */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  SkillPath AI
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-blue-300">
                  <span>Loading...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-80 h-3 bg-slate-800 rounded-full mx-auto overflow-hidden border border-slate-700">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-500 ease-out relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white bg-opacity-20 animate-shimmer" />
                  </div>
                </div>
              </div>

              {/* Current Step */}
              <div className="space-y-4">
                {loadingSteps[currentStep] && (() => {
                  const CurrentIcon = loadingSteps[currentStep].icon;
                  return (
                    <div className="flex items-center justify-center space-x-3 text-blue-200">
                      <CurrentIcon className={`w-5 h-5 ${loadingSteps[currentStep].color}`} />
                      <span className="font-medium">{loadingSteps[currentStep].text}{dots}</span>
                    </div>
                  );
                })()}

                {/* Step Indicators */}
                <div className="flex justify-center space-x-3">
                  {loadingSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index <= currentStep 
                          ? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-125' 
                          : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="flex justify-center space-x-6 opacity-60">
              {[Zap, Code, Database].map((Icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 text-blue-400 animate-float"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <Icon className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  ); 
};

export default LoadingPage;