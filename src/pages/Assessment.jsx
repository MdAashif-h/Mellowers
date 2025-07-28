import   { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, CheckCircle, Zap, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBackend } from '../hooks/useBackend';
import AuthModal from '../components/AuthModal';

const Assessment = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { createAssessment, submitAssessment, loading, error } = useBackend();

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated]);  

  const skills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'AWS', 'Docker',
    'Kubernetes', 'Jenkins', 'Git', 'MongoDB', 'PostgreSQL', 'REST APIs',
    'TypeScript', 'Angular', 'Vue.js', 'Spring Boot', 'Django', 'Flask',
    'Azure', 'GCP', 'Terraform', 'Ansible', 'GraphQL', 'Redis', 'Elasticsearch'
  ];

  const roles = [
    'Java Full Stack Developer', 'Frontend Developer', 'Backend Developer',
    'DevOps Engineer', 'Cloud Architect', 'Data Engineer', 'QA Engineer',
    'Product Manager', 'UI/UX Designer', 'Mobile Developer'
  ];

   const generateQuestionsWithAI = async (skills, role) => {
    setIsGeneratingQuestions(true);
    
    try {
      const assessment = await createAssessment(skills, role);
      setQuestions(assessment.questions);
    } catch (error) {
      console.error('Error generating assessment:', error);
      alert('Failed to generate assessment. Please try again.');
      setIsGeneratingQuestions(false);
      return;
    }
    
    setIsGeneratingQuestions(false);
  }; 

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

   const handleStartQuiz = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (selectedSkills.length === 0 || !selectedRole) {
      alert('Please select at least one skill and a target role');
      return;
    }
    
    await generateQuestionsWithAI(selectedSkills, selectedRole);
    setShowQuiz(true);
  }; 

   const handleAnswer = async (answerIndex) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      
      try {
        const result = await submitAssessment('assessment_' + Date.now(), newAnswers, questions);
        
        setTimeout(() => {
          navigate('/dashboard', { 
            state: { 
              score: result.correct, 
              total: result.total, 
              role: selectedRole, 
              skills: selectedSkills,
              level: result.level,
              percentage: result.percentage,
              points: result.totalPoints
            }
          });
        }, 3000);
      } catch (error) {
        console.error('Failed to submit assessment:', error);
        // Fallback navigation
        const score = newAnswers.reduce((acc, answer, idx) => 
          acc + (answer === questions[idx].correct ? 1 : 0), 0
        );
        
        setTimeout(() => {
          navigate('/dashboard', { 
            state: { 
              score, 
              total: questions.length, 
              role: selectedRole, 
              skills: selectedSkills,
              level: score <= 3 ? 'Beginner' : score <= 7 ? 'Intermediate' : 'Advanced'
            }
          });
        }, 3000);
      }
    }
  }; 

   if (!isAuthenticated) {
    return (
      <>
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glassmorphism p-12 rounded-2xl">
              <LogIn className="w-20 h-20 text-blue-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
              <p className="text-xl text-blue-200 mb-6">
                Please login to access the AI-powered skill assessment
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105"
              >
                Login to Continue
              </button>
            </div>
          </div>
        </div>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </>
    );
  }

  if (quizComplete) {
    return (
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glassmorphism p-12 rounded-2xl">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Assessment Complete!</h1>
            <p className="text-xl text-blue-200 mb-4">
              Your score: {answers.reduce((acc, answer, idx) => acc + (answer === questions[idx].correct ? 1 : 0), 0)} / {questions.length}
            </p>
            <p className="text-lg text-green-400 mb-6">
              Level: {answers.reduce((acc, answer, idx) => acc + (answer === questions[idx].correct ? 1 : 0), 0) <= 3 ? 'Beginner' : answers.reduce((acc, answer, idx) => acc + (answer === questions[idx].correct ? 1 : 0), 0) <= 7 ? 'Intermediate' : 'Advanced'}
            </p>
            <div className="animate-pulse text-blue-400 flex items-center justify-center">
              <Zap className="w-5 h-5 mr-2" />
              Generating your personalized learning roadmap...
            </div>
          </div>
        </div>
      </div>
    );
  } 

  if (isGeneratingQuestions) {
    return (
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glassmorphism p-12 rounded-2xl">
            <Zap className="w-16 h-16 text-blue-400 mx-auto mb-6 animate-pulse" />
            <h1 className="text-3xl font-bold text-white mb-4">AI is Crafting Your Assessment</h1>
            <p className="text-blue-200 mb-6">
              Creating personalized questions based on your selected skills and role...
            </p>
            <div className="w-full bg-blue-900 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showQuiz && questions.length > 0) {
    const question = questions[currentQuestion];
    return (
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glassmorphism p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center text-blue-400">
                <Clock className="w-5 h-5 mr-2" />
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="w-1/3 bg-blue-900 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full transition-all duration-500"
                  style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                ></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-8">{question.question}</h2>

            <div className="grid gap-4">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full p-6 text-left glassmorphism hover:bg-white hover:bg-opacity-5 border border-blue-600 hover:border-blue-400 rounded-xl text-white transition-all transform hover:scale-102 group"
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 group-hover:bg-blue-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
               </div>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>
    );
  }

  return ( 
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">AI Skill Assessment</h1>
          <p className="text-xl text-blue-200">Let AI create your personalized learning journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills Selection */}
          <div className="glassmorphism p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-blue-400" />
              Select Your Skills
            </h2>
            <p className="text-blue-200 mb-6">Choose the skills you want to be assessed on</p>
            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`p-3 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                    selectedSkills.includes(skill)
                      ? 'border-blue-400 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'border-blue-600 text-blue-200 hover:border-blue-400 hover:bg-blue-600 hover:bg-opacity-20'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            <p className="text-sm text-blue-300 mt-4">{selectedSkills.length} skills selected</p>
          </div>

          {/* Role Selection */}
          <div className="glassmorphism p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
              Target Role
            </h2>
            <p className="text-blue-200 mb-6">What role are you aiming for?</p>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between hover:scale-102 ${
                    selectedRole === role
                      ? 'border-green-400 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                      : 'border-blue-600 text-blue-200 hover:border-blue-400 hover:bg-blue-600 hover:bg-opacity-20'
                  }`}
                >
                  <span className="font-medium">{role}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="glassmorphism p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready for AI Assessment?</h3>
            <p className="text-blue-200 mb-6">
              Our AI will generate 10 personalized questions based on your selected skills and target role.
              The difficulty will adapt to your responses for accurate skill evaluation.
            </p>
            <button
              onClick={handleStartQuiz}
              disabled={selectedSkills.length === 0 || !selectedRole}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-semibold text-xl hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center mx-auto"
            >
              <Zap className="w-6 h-6 mr-2" />
              Generate AI Assessment
            </button>
            <div className="mt-4 text-sm text-blue-300">
              <p>Skills: {selectedSkills.length > 0 ? selectedSkills.slice(0, 3).join(', ') + (selectedSkills.length > 3 ? '...' : '') : 'None selected'}</p>
              <p>Role: {selectedRole || 'None selected'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
 