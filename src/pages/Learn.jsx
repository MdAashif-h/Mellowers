import  { useState, useEffect } from 'react';
import { Play, Code, Award, Globe, Book, ArrowRight, Target, CheckCircle } from 'lucide-react';
import { useBackend, useProgress } from '../hooks/useBackend'; 

const  Learn = () => { 
  const [activeModule, setActiveModule] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState('frontend');
  const [codeOutput, setCodeOutput] = useState('');
  const [userCode, setUserCode] = useState('');
  const { getModule, submitExercise, recordActivity } = useBackend();
  const { progress, updateModuleProgress } = useProgress(); 

  const learningTracks = {
    frontend: {
      name: 'Frontend Development',
      color: 'from-blue-500 to-cyan-500',
      modules: [
        {
          id: 1,
          title: 'HTML & CSS Mastery',
          description: 'Build beautiful, responsive web layouts',
          videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
          duration: '2.5 hours',
          exercises: [
            { title: 'Semantic HTML Structure', completed: true },
            { title: 'CSS Flexbox Layout', completed: true },
            { title: 'CSS Grid System', completed: false },
            { title: 'Responsive Design', completed: false }
          ],
          references: [
            { title: 'MDN HTML Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
            { title: 'CSS-Tricks Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
            { title: 'CSS Grid Garden Game', url: 'https://cssgridgarden.com/' }
          ]
        },
        {
          id: 2,
          title: 'JavaScript Fundamentals',
          description: 'Master modern JavaScript ES6+ features',
          videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
          duration: '4 hours',
          exercises: [
            { title: 'Variables and Data Types', completed: true },
            { title: 'Functions and Arrow Functions', completed: false },
            { title: 'Promises and Async/Await', completed: false },
            { title: 'DOM Manipulation', completed: false }
          ],
          references: [
            { title: 'JavaScript.info', url: 'https://javascript.info/' },
            { title: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net/' },
            { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' }
          ]
        },
        {
          id: 3,
          title: 'React Development',
          description: 'Build interactive user interfaces with React',
          videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
          duration: '6 hours',
          exercises: [
            { title: 'Components and JSX', completed: false },
            { title: 'State and Props', completed: false },
            { title: 'Event Handling', completed: false },
            { title: 'React Hooks', completed: false }
          ],
          references: [
            { title: 'React Official Docs', url: 'https://react.dev/' },
            { title: 'React Tutorial', url: 'https://reactjs.org/tutorial/tutorial.html' },
            { title: 'React Hook Examples', url: 'https://usehooks.com/' }
          ]
        }
      ]
    },
    backend: {
      name: 'Backend Development',
      color: 'from-green-500 to-emerald-500',
      modules: [
        {
          id: 1,
          title: 'Node.js Fundamentals',
          description: 'Server-side JavaScript development',
          videoUrl: 'https://www.youtube.com/embed/fBNz5xF-Kx4',
          duration: '3 hours',
          exercises: [
            { title: 'Node.js Runtime Basics', completed: true },
            { title: 'File System Operations', completed: false },
            { title: 'Event Loop Understanding', completed: false },
            { title: 'NPM and Package Management', completed: false }
          ],
          references: [
            { title: 'Node.js Official Docs', url: 'https://nodejs.org/en/docs/' },
            { title: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices' },
            { title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html' }
          ]
        },
        {
          id: 2,
          title: 'API Development',
          description: 'Build RESTful APIs and GraphQL endpoints',
          videoUrl: 'https://www.youtube.com/embed/pKd0Rpw7O48',
          duration: '5 hours',
          exercises: [
            { title: 'REST API Design', completed: false },
            { title: 'Authentication Middleware', completed: false },
            { title: 'Database Integration', completed: false },
            { title: 'Error Handling', completed: false }
          ],
          references: [
            { title: 'REST API Design Guide', url: 'https://restfulapi.net/' },
            { title: 'JWT Authentication', url: 'https://jwt.io/introduction/' },
            { title: 'GraphQL Documentation', url: 'https://graphql.org/learn/' }
          ]
        }
      ]
    },
    devops: {
      name: 'DevOps & Cloud',
      color: 'from-purple-500 to-pink-500',
      modules: [
        {
          id: 1,
          title: 'Docker Containerization',
          description: 'Package and deploy applications with Docker',
          videoUrl: 'https://www.youtube.com/embed/fqMOX6JJhGo',
          duration: '3.5 hours',
          exercises: [
            { title: 'Docker Basics', completed: false },
            { title: 'Dockerfile Creation', completed: false },
            { title: 'Multi-stage Builds', completed: false },
            { title: 'Docker Compose', completed: false }
          ],
          references: [
            { title: 'Docker Official Docs', url: 'https://docs.docker.com/' },
            { title: 'Docker Best Practices', url: 'https://docs.docker.com/develop/best-practices/' },
            { title: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials/' }
          ]
        }
      ]
    }
  };

  const skillMindmap = {
    center: 'Full Stack Mastery',
    branches: [
      {
        title: 'Frontend',
        color: 'bg-blue-500',
        position: 'top-left',
        skills: [
          { name: 'HTML/CSS', unlocked: true, level: 'Advanced' },
          { name: 'JavaScript', unlocked: true, level: 'Intermediate' },
          { name: 'React', unlocked: true, level: 'Beginner' },
          { name: 'TypeScript', unlocked: false, level: null },
          { name: 'Next.js', unlocked: false, level: null }
        ]
      },
      {
        title: 'Backend',
        color: 'bg-green-500',
        position: 'top-right',
        skills: [
          { name: 'Node.js', unlocked: true, level: 'Intermediate' },
          { name: 'Express.js', unlocked: false, level: null },
          { name: 'Databases', unlocked: false, level: null },
          { name: 'APIs', unlocked: false, level: null },
          { name: 'Authentication', unlocked: false, level: null }
        ]
      },
      {
        title: 'DevOps',
        color: 'bg-purple-500',
        position: 'bottom-left',
        skills: [
          { name: 'Git', unlocked: true, level: 'Advanced' },
          { name: 'Docker', unlocked: false, level: null },
          { name: 'CI/CD', unlocked: false, level: null },
          { name: 'Cloud Services', unlocked: false, level: null },
          { name: 'Monitoring', unlocked: false, level: null }
        ]
      },
      {
        title: 'Tools',
        color: 'bg-orange-500',
        position: 'bottom-right',
        skills: [
          { name: 'VS Code', unlocked: true, level: 'Advanced' },
          { name: 'Postman', unlocked: true, level: 'Intermediate' },
          { name: 'Jest', unlocked: false, level: null },
          { name: 'Webpack', unlocked: false, level: null },
          { name: 'Figma', unlocked: false, level: null }
        ]
      }
    ]
  };

   const codeChallenge = `// Complete this function to find the longest palindrome substring
function longestPalindrome(str) {
  // Your code here
  
}

// Test cases
console.log(longestPalindrome("babad")); // Should output: "bab" or "aba"
console.log(longestPalindrome("cbbd")); // Should output: "bb"`;

  const handleRunCode = () => {
    try {
      // In a real app, this would use a proper code execution service
      const result = eval(userCode || codeChallenge);
      setCodeOutput(String(result));
      recordActivity('code_execution', { moduleId: activeModule?.id });
    } catch (error) {
      setCodeOutput(`Error: ${error.message}`);
    }
  };

  const handleSubmitSolution = async () => {
    if (!activeModule) return;
    
    try {
      const result = await submitExercise(activeModule.id, 'code_challenge', userCode);
      if (result.success) {
        alert(`${result.feedback} You earned ${result.points} points!`);
        updateModuleProgress(activeModule.id, 100);
      } else {
        alert(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit solution:', error);
      alert('Failed to submit solution. Please try again.');
    }
  };

  useEffect(() => {
    setUserCode(codeChallenge);
  }, [activeModule]); 

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Interactive Learning</h1>
          <p className="text-xl text-blue-200">Master skills through hands-on practice and expert guidance</p>
        </div>

        {/* Track Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(learningTracks).map(([key, track]) => (
            <button
              key={key}
              onClick={() => setSelectedTrack(key)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all transform hover:scale-105 ${
                selectedTrack === key
                  ? `bg-gradient-to-r ${track.color} text-white shadow-xl`
                  : 'glassmorphism text-blue-200 hover:text-white'
              }`}
            >
              {track.name}
            </button>
          ))}
        </div>

        {/* Interactive Skill Mindmap */}
        <div className="glassmorphism p-8 rounded-2xl mb-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Target className="w-8 h-8 mr-3 text-blue-400" />
            Skill Development Roadmap
          </h2>
          
          <div className="relative min-h-[500px] flex items-center justify-center">
            {/* Center Node */}
            <div className="absolute z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-2xl font-bold text-lg shadow-2xl">
              {skillMindmap.center}
            </div>
            
            {/* Branch Connections */}
            <svg className="absolute inset-0 w-full h-full" style={{zIndex: 5}}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {/* Draw connecting lines */}
              <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="url(#lineGradient)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="url(#lineGradient)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="url(#lineGradient)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="url(#lineGradient)" strokeWidth="2" />
            </svg>
            
            {/* Skill Branches */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 flex items-center justify-center" style={{zIndex: 10}}>
              <div className="text-center">
                <div className={`${skillMindmap.branches[0].color} text-white px-4 py-2 rounded-xl font-bold mb-4 shadow-lg`}>
                  {skillMindmap.branches[0].title}
                </div>
                <div className="space-y-2">
                  {skillMindmap.branches[0].skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all hover:scale-105 ${
                        skill.unlocked 
                          ? 'bg-green-600 bg-opacity-30 border border-green-400' 
                          : 'bg-gray-600 bg-opacity-20 border border-gray-500'
                      }`}
                    >
                      <span className={`text-sm font-medium ${skill.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {skill.name}
                      </span>
                      <div className="flex items-center">
                        {skill.unlocked && (
                          <>
                            <span className="text-xs text-green-300 mr-2">{skill.level}</span>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </>
                        )}
                        {skill.unlocked && <Award className="w-4 h-4 text-yellow-400 ml-1" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-1/2 h-1/2 flex items-center justify-center" style={{zIndex: 10}}>
              <div className="text-center">
                <div className={`${skillMindmap.branches[1].color} text-white px-4 py-2 rounded-xl font-bold mb-4 shadow-lg`}>
                  {skillMindmap.branches[1].title}
                </div>
                <div className="space-y-2">
                  {skillMindmap.branches[1].skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all hover:scale-105 ${
                        skill.unlocked 
                          ? 'bg-green-600 bg-opacity-30 border border-green-400' 
                          : 'bg-gray-600 bg-opacity-20 border border-gray-500'
                      }`}
                    >
                      <span className={`text-sm font-medium ${skill.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {skill.name}
                      </span>
                      <div className="flex items-center">
                        {skill.unlocked && (
                          <>
                            <span className="text-xs text-green-300 mr-2">{skill.level}</span>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </>
                        )}
                        {skill.unlocked && <Award className="w-4 h-4 text-yellow-400 ml-1" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 flex items-center justify-center" style={{zIndex: 10}}>
              <div className="text-center">
                <div className={`${skillMindmap.branches[2].color} text-white px-4 py-2 rounded-xl font-bold mb-4 shadow-lg`}>
                  {skillMindmap.branches[2].title}
                </div>
                <div className="space-y-2">
                  {skillMindmap.branches[2].skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all hover:scale-105 ${
                        skill.unlocked 
                          ? 'bg-green-600 bg-opacity-30 border border-green-400' 
                          : 'bg-gray-600 bg-opacity-20 border border-gray-500'
                      }`}
                    >
                      <span className={`text-sm font-medium ${skill.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {skill.name}
                      </span>
                      <div className="flex items-center">
                        {skill.unlocked && (
                          <>
                            <span className="text-xs text-green-300 mr-2">{skill.level}</span>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </>
                        )}
                        {skill.unlocked && <Award className="w-4 h-4 text-yellow-400 ml-1" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 flex items-center justify-center" style={{zIndex: 10}}>
              <div className="text-center">
                <div className={`${skillMindmap.branches[3].color} text-white px-4 py-2 rounded-xl font-bold mb-4 shadow-lg`}>
                  {skillMindmap.branches[3].title}
                </div>
                <div className="space-y-2">
                  {skillMindmap.branches[3].skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all hover:scale-105 ${
                        skill.unlocked 
                          ? 'bg-green-600 bg-opacity-30 border border-green-400' 
                          : 'bg-gray-600 bg-opacity-20 border border-gray-500'
                      }`}
                    >
                      <span className={`text-sm font-medium ${skill.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {skill.name}
                      </span>
                      <div className="flex items-center">
                        {skill.unlocked && (
                          <>
                            <span className="text-xs text-green-300 mr-2">{skill.level}</span>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </>
                        )}
                        {skill.unlocked && <Award className="w-4 h-4 text-yellow-400 ml-1" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module List */}
          <div className="lg:col-span-1">
            <div className="glassmorphism p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Play className="w-6 h-6 mr-2 text-blue-400" />
                {learningTracks[selectedTrack].name}
              </h2>
              <div className="space-y-4">
                {learningTracks[selectedTrack].modules.map((module) => (
                  <div
                    key={module.id}
                    onClick={() => setActiveModule(module)}
                    className={`p-4 rounded-xl cursor-pointer transition-all transform hover:scale-102 ${
                      activeModule?.id === module.id 
                        ? `bg-gradient-to-r ${learningTracks[selectedTrack].color} bg-opacity-20 ring-2 ring-blue-400` 
                        : 'glassmorphism hover:bg-white hover:bg-opacity-5'
                    }`}
                  >
                    <div className="flex items-start mb-3">
                      <Play className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">{module.title}</h3>
                        <p className="text-blue-200 text-sm mb-2">{module.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-300">{module.duration}</span>
                          <span className="text-xs text-green-400">
                            {module.exercises.filter(ex => ex.completed).length}/{module.exercises.length} completed
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-blue-900 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${learningTracks[selectedTrack].color} h-2 rounded-full transition-all`}
                        style={{
                          width: `${(module.exercises.filter(ex => ex.completed).length / module.exercises.length) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            {activeModule ? (
              <div className="space-y-6">
                {/* Video Player */}
                <div className="glassmorphism p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">{activeModule.title}</h2>
                    <span className={`px-4 py-2 bg-gradient-to-r ${learningTracks[selectedTrack].color} text-white rounded-xl text-sm font-semibold`}>
                      {activeModule.duration}
                    </span>
                  </div>
                  <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
                    <iframe
                      src={activeModule.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                      title={activeModule.title}
                    ></iframe>
                  </div>
                  <p className="text-blue-200">{activeModule.description}</p>
                </div>

                {/* Exercises */}
                <div className="glassmorphism p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
                    Practice Exercises
                  </h3>
                  <div className="grid gap-4">
                    {activeModule.exercises.map((exercise, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 glassmorphism rounded-xl hover:bg-white hover:bg-opacity-5 transition-all">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                            exercise.completed ? 'bg-green-500' : 'bg-blue-600'
                          }`}>
                            {exercise.completed ? <CheckCircle className="w-5 h-5 text-white" /> : <span className="text-white font-bold">{idx + 1}</span>}
                          </div>
                          <span className="text-white font-medium">{exercise.title}</span>
                        </div>
                        <button className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                          exercise.completed 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}>
                          {exercise.completed ? 'Review' : 'Start'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reference Links */}
                <div className="glassmorphism p-6 rounded-2xl">
                  <div className="flex items-center mb-6">
                    <Book className="w-6 h-6 text-blue-400 mr-2" />
                    <h3 className="text-xl font-bold text-white">Reference Materials</h3>
                  </div>
                  <div className="grid gap-4">
                    {activeModule.references.map((ref, idx) => (
                      <a
                        key={idx}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 glassmorphism hover:bg-white hover:bg-opacity-5 rounded-xl transition-all group"
                      >
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-blue-400 mr-4" />
                          <span className="text-white font-medium">{ref.title}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Code Challenge */}
                <div className="glassmorphism p-6 rounded-2xl">
                  <div className="flex items-center mb-6">
                    <Code className="w-6 h-6 text-blue-400 mr-2" />
                    <h3 className="text-xl font-bold text-white">Code Challenge</h3>
                  </div>
                                 <div className="bg-gray-900 rounded-xl p-6 mb-6">
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-64 bg-transparent text-green-400 text-sm font-mono resize-none focus:outline-none"
                    placeholder="Write your code here..."
                  />
                  {codeOutput && (
                    <div className="mt-4 p-4 bg-gray-800 rounded border-l-4 border-blue-400">
                      <p className="text-blue-300 text-sm mb-1">Output:</p>
                      <pre className="text-white text-sm">{codeOutput}</pre>
                    </div>
                  )}
                </div> 
                                 <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={handleRunCode}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-semibold flex items-center"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Run Code
                  </button>
                  <button 
                    onClick={handleSubmitSolution}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 font-semibold"
                  >
                    Submit Solution
                  </button>
                  <button className="px-6 py-3 glassmorphism text-white rounded-xl hover:bg-white hover:bg-opacity-10 font-semibold">
                    Get Hint
                  </button>
                </div> 
                </div>
              </div>
            ) : (
              <div className="glassmorphism p-12 rounded-2xl text-center">
                <div className={`w-24 h-24 bg-gradient-to-r ${learningTracks[selectedTrack].color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Play className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Select a Module</h2>
                <p className="text-blue-200 text-lg mb-6">
                  Choose a {learningTracks[selectedTrack].name.toLowerCase()} module to start your learning journey
                </p>
                <div className="text-blue-300">
                  {learningTracks[selectedTrack].modules.length} modules available
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
 