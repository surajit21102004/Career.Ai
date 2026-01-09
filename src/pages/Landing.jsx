import React, { useState, useEffect } from 'react';
import { ArrowRight, Brain, Loader2, TrendingUp, Target, Zap, Phone, Clock, Shield, Rocket, Lightbulb, CheckCircle, Users, Award, Star, Sparkles, Trophy, BookOpen, Briefcase, GraduationCap, ChevronDown } from 'lucide-react';

// Separate datasets for different paths
const schoolCareers = {
  it: [
    {
      title: "Software Developer",
      keywords: ["coding", "programming", "apps", "software", "games", "tech"],
      skills: ["Problem Solving", "Basic Programming", "Logic Building", "Computer Fundamentals"],
      roadmap: [
        "Learn basic programming (Python/JavaScript)",
        "Build small projects and games",
        "Join coding bootcamps or online courses",
        "Practice on coding platforms",
        "Create a portfolio of projects"
      ]
    },
    {
      title: "Web Designer",
      keywords: ["design", "creative", "art", "websites", "visual", "colors"],
      skills: ["Creativity", "Basic Design Tools", "HTML Basics", "Color Theory"],
      roadmap: [
        "Learn design fundamentals",
        "Practice with Canva and Figma",
        "Study basic HTML/CSS",
        "Create website mockups",
        "Build a design portfolio"
      ]
    },
    {
      title: "Game Developer",
      keywords: ["games", "gaming", "play", "unity", "3d", "animation"],
      skills: ["Game Logic", "Creativity", "Programming Basics", "Storytelling"],
      roadmap: [
        "Learn game development basics",
        "Start with simple game engines (Scratch, Roblox Studio)",
        "Study basic programming",
        "Create mini games",
        "Learn advanced game engines (Unity/Unreal)"
      ]
    },
    {
      title: "Mobile App Developer",
      keywords: ["mobile", "apps", "android", "ios", "smartphone"],
      skills: ["Mobile Platforms", "UI Design", "Programming Basics", "User Experience"],
      roadmap: [
        "Understand mobile app basics",
        "Learn app development platforms",
        "Study Java/Kotlin or Swift",
        "Build simple apps",
        "Publish apps on app stores"
      ]
    }
  ],
  nonIt: [
    {
      title: "Digital Artist",
      keywords: ["art", "drawing", "creative", "painting", "illustration", "design"],
      skills: ["Creativity", "Drawing", "Digital Tools", "Color Theory"],
      roadmap: [
        "Practice traditional and digital art",
        "Learn digital art tools (Procreate, Photoshop)",
        "Study art fundamentals",
        "Build an art portfolio",
        "Join art communities and contests"
      ]
    },
    {
      title: "Content Creator",
      keywords: ["youtube", "video", "social media", "influencer", "content"],
      skills: ["Communication", "Video Editing", "Creativity", "Social Media"],
      roadmap: [
        "Learn content creation basics",
        "Practice video editing",
        "Build a social media presence",
        "Create consistent content",
        "Grow your audience"
      ]
    },
    {
      title: "Entrepreneur",
      keywords: ["business", "startup", "selling", "ideas", "innovation"],
      skills: ["Leadership", "Problem Solving", "Communication", "Business Basics"],
      roadmap: [
        "Learn business fundamentals",
        "Identify problems to solve",
        "Start small business projects",
        "Learn marketing basics",
        "Build entrepreneurial skills"
      ]
    },
    {
      title: "Writer/Author",
      keywords: ["writing", "stories", "books", "blog", "creative writing"],
      skills: ["Writing", "Creativity", "Grammar", "Storytelling"],
      roadmap: [
        "Practice writing daily",
        "Read extensively",
        "Learn storytelling techniques",
        "Start a blog or write short stories",
        "Submit work to publications"
      ]
    }
  ]
};

const collegeCareers = {
  it: [
    {
      title: "Data Scientist",
      keywords: ["data", "analytics", "machine learning", "python", "statistics"],
      skills: ["Python", "Data Analysis", "Machine Learning", "Statistics", "SQL"],
      roadmap: [
        "Master Python and R programming",
        "Learn statistics and mathematics",
        "Study machine learning algorithms",
        "Work on real-world datasets",
        "Build a portfolio with Kaggle projects",
        "Get internships in data science",
        "Pursue certifications (Google Data Analytics, IBM Data Science)"
      ]
    },
    {
      title: "AI/ML Engineer",
      keywords: ["artificial intelligence", "AI", "deep learning", "neural networks"],
      skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "Mathematics"],
      roadmap: [
        "Strong foundation in mathematics and statistics",
        "Learn Python and ML libraries",
        "Study neural networks and deep learning",
        "Work on AI projects (NLP, Computer Vision)",
        "Contribute to open-source AI projects",
        "Get research experience or internships",
        "Consider advanced degrees (MS in AI/ML)"
      ]
    },
    {
      title: "Full Stack Developer",
      keywords: ["web", "development", "frontend", "backend", "mern", "mean"],
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git"],
      roadmap: [
        "Master HTML, CSS, and JavaScript",
        "Learn a frontend framework (React/Angular/Vue)",
        "Study backend development (Node.js/Django/Spring)",
        "Understand databases (SQL and NoSQL)",
        "Learn version control (Git)",
        "Build full-stack projects",
        "Contribute to open-source and get internships"
      ]
    },
    {
      title: "DevOps Engineer",
      keywords: ["devops", "automation", "cloud", "CI/CD", "docker", "kubernetes"],
      skills: ["Docker", "Kubernetes", "AWS/Azure", "Git", "CI/CD Tools", "Linux"],
      roadmap: [
        "Learn Linux and networking basics",
        "Master version control (Git)",
        "Study cloud platforms (AWS/Azure/GCP)",
        "Learn containerization (Docker, Kubernetes)",
        "Understand CI/CD pipelines",
        "Get hands-on with infrastructure as code",
        "Obtain cloud certifications"
      ]
    },
    {
      title: "Cybersecurity Specialist",
      keywords: ["security", "cyber", "hacking", "ethical hacking", "penetration testing"],
      skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Cryptography", "Linux"],
      roadmap: [
        "Learn networking fundamentals",
        "Study security principles and practices",
        "Practice ethical hacking techniques",
        "Get hands-on with security tools",
        "Participate in CTF competitions",
        "Obtain certifications (CEH, CompTIA Security+)",
        "Gain experience through internships"
      ]
    },
    {
      title: "Blockchain Developer",
      keywords: ["blockchain", "cryptocurrency", "web3", "smart contracts", "ethereum"],
      skills: ["Solidity", "Blockchain Concepts", "Smart Contracts", "Cryptography", "JavaScript"],
      roadmap: [
        "Understand blockchain fundamentals",
        "Learn cryptography basics",
        "Study smart contract development (Solidity)",
        "Practice on Ethereum test networks",
        "Build DApps (Decentralized Applications)",
        "Contribute to blockchain projects",
        "Stay updated with Web3 trends"
      ]
    }
  ],
  nonIt: [
    {
      title: "Business Analyst",
      keywords: ["business", "analysis", "data", "strategy", "consulting"],
      skills: ["Business Analysis", "Data Visualization", "Communication", "Problem Solving", "Excel"],
      roadmap: [
        "Learn business fundamentals",
        "Master data analysis tools (Excel, Tableau, Power BI)",
        "Study business process modeling",
        "Develop communication skills",
        "Work on business case studies",
        "Get internships in consulting/analysis",
        "Consider MBA or business certifications"
      ]
    },
    {
      title: "Product Manager",
      keywords: ["product", "management", "strategy", "market", "user experience"],
      skills: ["Market Research", "Product Strategy", "Communication", "Analytical Skills", "Leadership"],
      roadmap: [
        "Understand product lifecycle",
        "Learn market research and analysis",
        "Study user experience and design thinking",
        "Develop business and tech understanding",
        "Build product roadmaps and strategies",
        "Get experience through PM internships",
        "Network with product management communities"
      ]
    },
    {
      title: "UI/UX Designer",
      keywords: ["design", "user experience", "user interface", "prototyping", "figma"],
      skills: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping", "Design Thinking"],
      roadmap: [
        "Learn design principles and theory",
        "Master design tools (Figma, Adobe XD, Sketch)",
        "Study user research methods",
        "Practice wireframing and prototyping",
        "Build a strong design portfolio",
        "Get freelance projects or internships",
        "Stay updated with design trends"
      ]
    },
    {
      title: "Digital Marketing Specialist",
      keywords: ["marketing", "social media", "seo", "advertising", "content marketing"],
      skills: ["SEO", "Social Media Marketing", "Content Strategy", "Analytics", "Copywriting"],
      roadmap: [
        "Learn digital marketing fundamentals",
        "Master SEO and SEM techniques",
        "Study social media marketing",
        "Understand content marketing",
        "Practice with Google Analytics and Ads",
        "Build marketing campaigns",
        "Get certifications (Google Ads, HubSpot)"
      ]
    },
    {
      title: "Financial Analyst",
      keywords: ["finance", "investment", "stocks", "accounting", "financial planning"],
      skills: ["Financial Modeling", "Excel", "Accounting", "Investment Analysis", "Economics"],
      roadmap: [
        "Strong foundation in accounting and finance",
        "Master Excel and financial modeling",
        "Learn investment and portfolio management",
        "Study financial markets",
        "Get internships in finance/banking",
        "Consider CFA or finance certifications",
        "Build analytical case studies"
      ]
    },
    {
      title: "Human Resources Manager",
      keywords: ["hr", "people", "recruitment", "training", "organization"],
      skills: ["Recruitment", "Communication", "Employee Relations", "Training", "Labor Laws"],
      roadmap: [
        "Study HR fundamentals and psychology",
        "Learn recruitment and talent acquisition",
        "Understand labor laws and compliance",
        "Develop interpersonal skills",
        "Get HR software experience",
        "Intern in HR departments",
        "Consider HR certifications (SHRM, PHR)"
      ]
    }
  ]
};

const schoolQuestions = {
  it: [
    "What excites you most about technology? (apps, games, websites, robots, etc.)",
    "Do you enjoy solving puzzles or building things?",
    "What subjects do you like most in school?",
    "Have you ever tried coding or making something digital?",
    "What kind of tech project would you love to create?"
  ],
  nonIt: [
    "What creative activities do you enjoy the most?",
    "What are your favorite subjects in school?",
    "Do you like sharing ideas with others or creating content?",
    "What would you love to create or build in the future?",
    "What problems in the world would you like to solve?"
  ]
};

const collegeQuestions = {
  it: [
    "What aspects of technology fascinate you the most?",
    "Which programming languages or technologies have you worked with?",
    "What kind of technical problems do you enjoy solving?",
    "Do you prefer working on frontend, backend, or data-related projects?",
    "What's your ultimate tech career goal in the next 5 years?"
  ],
  nonIt: [
    "What industries or sectors interest you the most?",
    "What are your strongest skills outside of technical programming?",
    "Do you prefer strategic thinking, creative work, or people management?",
    "What kind of impact do you want to make in your career?",
    "Where do you see yourself professionally in 5 years?"
  ]
};

const notificationNames = [
  "Isha", "Mimmi", "Ayush", "Priya", "Rahul", "Aditi", "Amit", 
  "Pooja", "Rohan", "Kavya", "Arjun", "Neha", "Vikram", "Anjali"
];

const CareerDetection = () => {
  const [stage, setStage] = useState('home');
  const [standardType, setStandardType] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [careerAnalytics, setCareerAnalytics] = useState([]);
  const [notification, setNotification] = useState(null);
  const [rocketLaunched, setRocketLaunched] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const randomName = notificationNames[Math.floor(Math.random() * notificationNames.length)];
      setNotification(randomName);
      setTimeout(() => setNotification(null), 3000);
    };

    const interval = setInterval(showNotification, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStandardSelect = (type) => {
    setStandardType(type);
    setStage('field');
  };

  const handleFieldSelect = (type) => {
    setFieldType(type);
    setStage('questions');
  };

  const getCurrentQuestions = () => {
    if (standardType === 'school') {
      return schoolQuestions[fieldType];
    } else {
      return collegeQuestions[fieldType];
    }
  };

  const getCurrentCareers = () => {
    if (standardType === 'school') {
      return schoolCareers[fieldType];
    } else {
      return collegeCareers[fieldType];
    }
  };

  const handleNext = () => {
    const questions = getCurrentQuestions();
    if (step < questions.length - 1) {
      const updatedAnswers = { ...answers, [step]: currentAnswer };
      setAnswers(updatedAnswers);
      checkCareerAnalytics(currentAnswer);
      setCurrentAnswer('');
      setStep(step + 1);
    }
  };

  const checkCareerAnalytics = (input) => {
    const careers = getCurrentCareers();
    const matchedCareers = careers.filter(career =>
      career.keywords.some(keyword => input.toLowerCase().includes(keyword))
    );
    if (matchedCareers.length > 0) {
      setCareerAnalytics(prev => [...new Set([...prev, ...matchedCareers])]);
    }
  };

  const handleAnalyze = () => {
    const updatedAnswers = { ...answers, [step]: currentAnswer };
    setAnswers(updatedAnswers);
    checkCareerAnalytics(currentAnswer);
    setStage('analyzing');
    setIsAnalyzing(true);
    setRocketLaunched(true);

    setTimeout(() => {
      const careers = getCurrentCareers();
      const topCareer = careerAnalytics.length > 0 ? careerAnalytics[0] : careers[0];
      
      const otherCareers = careers.filter(c => c.title !== topCareer.title).slice(0, 3);
      
      setResult({
        topCareer: topCareer.title,
        match: careerAnalytics.length > 0 ? Math.floor(Math.random() * 8) + 92 : Math.floor(Math.random() * 8) + 85,
        alternativePaths: otherCareers.map(c => c.title),
        skills: topCareer.skills,
        roadmap: topCareer.roadmap,
      });
      setIsAnalyzing(false);
      setStage('result');
    }, 4000);
  };

  const handleBookSession = () => {
    window.open('/BookASession', '_blank');
  };

  const scrollToDetection = () => {
    setStage('standard');
    setTimeout(() => {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }, 100);
  };

  const questions = stage === 'questions' ? getCurrentQuestions() : [];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in-up">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-3 rounded-lg shadow-[0_0_30px_rgba(234,179,8,0.6)] border-2 border-yellow-400 font-bold flex items-center gap-3">
            <div className="animate-pulse">⚡</div>
            <span>{notification} just booked a call!</span>
            <div className="animate-pulse">⚡</div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[128px]"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[128px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-0 lg:px-8 py-12 relative z-10">
        
        {/* HOME PAGE */}
        {stage === 'home' && (
          <>
            {/* Hero Section */}
           <div className="text-center relative mt-10 sm:mt-10">
              <div className=" inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full ">
                <Sparkles className="text-cyan-400" size={20} />
                <span className=" text-cyan-400 font-semibold">AI-Powered Career Guidance</span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  Discover Your
                </span>
                <br />
                <span className="text-white">Perfect Career Path</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                Let our advanced AI analyze your interests, skills, and goals to reveal the career that's meant for you
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button
                  onClick={scrollToDetection}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl flex items-center justify-center gap-3 transition-all font-bold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)]"
                >
                  <Rocket size={24} />
                  <span>Start Career Detection</span>
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={handleBookSession}
                  className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 border border-cyan-500/30 hover:border-cyan-500 rounded-xl flex items-center gap-3 transition-all font-semibold"
                >
                  <Phone size={20} />
                  <span>Book Expert Call</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span>100% Free Analysis</span>
                </div>
                <div className="w-px h-4 bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span>AI-Powered Results</span>
                </div>
                <div className="w-px h-4 bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span>Instant Roadmap</span>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              <div className="group p-8 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 border border-cyan-500/20 rounded-2xl hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="text-cyan-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI Analysis</h3>
                <p className="text-gray-400 leading-relaxed">Advanced algorithms analyze your responses to match you with the perfect career path</p>
              </div>

              <div className="group p-8 bg-gradient-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/20 rounded-2xl hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all">
                <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="text-purple-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Personalized Roadmap</h3>
                <p className="text-gray-400 leading-relaxed">Get a step-by-step plan tailored to your goals and current skill level</p>
              </div>

              <div className="group p-8 bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 rounded-2xl hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all">
                <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Expert Support</h3>
                <p className="text-gray-400 leading-relaxed">Connect with professionals for in-depth guidance and career counseling</p>
              </div>
            </div>

            {/* Enhanced Impact Section */}
            <div className="relative mb-20">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
              
              <div className="relative bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-12 border border-cyan-500/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full mb-4">
                      <Trophy className="text-yellow-400" size={20} />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold">Our Impact</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                        Transforming Futures
                      </span>
                    </h2>
                    <p className="text-xl text-gray-400">Helping students achieve their dream careers</p>
                  </div>

                  <div className="grid sm:grid-cols-4 gap-6 mb-10">
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative p-8 bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/30 group-hover:border-cyan-400 transition-all text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Users className="text-cyan-400" size={32} />
                        </div>
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">500+</div>
                        <p className="text-gray-400 font-medium">Students Guided</p>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative p-8 bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-green-500/30 group-hover:border-green-400 transition-all text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="text-green-400" size={32} />
                        </div>
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">50+</div>
                        <p className="text-gray-400 font-medium">Problems Solved</p>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative p-8 bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-yellow-500/30 group-hover:border-yellow-400 transition-all text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Star className="text-yellow-400" size={32} />
                        </div>
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">4.9</div>
                        <p className="text-gray-400 font-medium">Average Rating</p>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative p-8 bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 group-hover:border-purple-400 transition-all text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Award className="text-purple-400" size={32} />
                        </div>
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">100%</div>
                        <p className="text-gray-400 font-medium">Success Rate</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="text-cyan-400" size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2">Career Counseling</h4>
                          <p className="text-gray-400 text-sm">Personalized guidance from industry experts</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/20 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="text-purple-400" size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2">Skill Development</h4>
                          <p className="text-gray-400 text-sm">Comprehensive roadmaps for skill building</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Briefcase className="text-blue-400" size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2">Interview Preparation</h4>
                          <p className="text-gray-400 text-sm">Mock interviews and expert feedback</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-pink-500/5 to-transparent border border-pink-500/20 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Target className="text-pink-400" size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2">Resume Building</h4>
                          <p className="text-gray-400 text-sm">Professional resume review and optimization</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full">
                      <Sparkles className="text-cyan-400 animate-pulse" size={20} />
                      <span className="text-gray-300">Helping students find their perfect career path since 2023</span>
                      <Sparkles className="text-purple-400 animate-pulse" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-xl rounded-3xl p-12 border border-cyan-500/20">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Transform</span> Your Future?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join hundreds of students who have discovered their perfect career path with our AI-powered platform
              </p>
              <button
                onClick={scrollToDetection}
                className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl flex items-center justify-center gap-3 transition-all font-bold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] mx-auto"
              >
                <Rocket size={24} />
                <span>Start Your Journey Now</span>
                <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </>
        )}

        {/* CAREER DETECTION SECTION */}
        {stage !== 'home' && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  Career Path
                </span>
                <br />
                <span className="text-white">Detection</span>
              </h1>
            </div>

            {/* Standard Selection */}
            {stage === 'standard' && (
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Choose Your Current Standard</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleStandardSelect('school')}
                    className="group relative p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-xl hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all"
                  >
                    <div className="text-6xl mb-4">🎓</div>
                    <h3 className="text-2xl font-bold text-white mb-2">School Student</h3>
                    <p className="text-gray-400">Exploring future career paths</p>
                  </button>
                  
                  <button
                    onClick={() => handleStandardSelect('college')}
                    className="group relative p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl hover:border-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all"
                  >
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-2xl font-bold text-white mb-2">College Student</h3>
                    <p className="text-gray-400">Ready to specialize and launch career</p>
                  </button>
                </div>
              </div>
            )}

            {/* Field Selection */}
            {stage === 'field' && (
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  {standardType === 'school' ? 'What Interests You?' : 'Choose Your Field'}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleFieldSelect('it')}
                    className="group relative p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-xl hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all"
                  >
                    <div className="text-6xl mb-4">💻</div>
                    <h3 className="text-2xl font-bold text-white mb-2">IT Field</h3>
                    <p className="text-gray-400">Technology, coding, and innovation</p>
                  </button>
                  
                  <button
                    onClick={() => handleFieldSelect('nonIt')}
                    className="group relative p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl hover:border-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all"
                  >
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Non-IT Field</h3>
                    <p className="text-gray-400">Business, design, and creative paths</p>
                  </button>
                </div>
              </div>
            )}

            {/* Questions Stage */}
            {stage === 'questions' && questions && (
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{step + 1}/{questions.length} Questions</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
                        <span className="text-cyan-400 font-bold">{step + 1}</span>
                      </div>
                      <h2 className="text-2xl font-semibold text-white">Question {step + 1} of {questions.length}</h2>
                    </div>
                    <p className="text-xl text-gray-300 ml-13">{questions[step]}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      className="flex-1 p-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-cyan-500 outline-none text-white placeholder-gray-500 transition-all"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && currentAnswer && (step === questions.length - 1 ? handleAnalyze() : handleNext())}
                    />
                    <button
                      onClick={step === questions.length - 1 ? handleAnalyze : handleNext}
                      disabled={!currentAnswer}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                    >
                      {step === questions.length - 1 ? 'Analyze' : 'Next'} <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Animation */}
            {stage === 'analyzing' && isAnalyzing && (
              <div className="text-center py-16 space-y-6">
                <div className="flex justify-center mb-8 relative">
                  <div className={`transition-all duration-[3000ms] ${rocketLaunched ? 'transform -translate-y-[500px] opacity-0' : ''}`}>
                    <Rocket size={80} className="text-cyan-400 animate-pulse" />
                  </div>
                  <div className="absolute bottom-0 w-32 h-32 bg-orange-500/30 rounded-full filter blur-2xl animate-pulse"></div>
                </div>
                
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Lightbulb size={32} className="text-yellow-400 animate-pulse" />
                  <h3 className="text-3xl font-bold text-white">AI Analysis in Progress</h3>
                  <Brain size={32} className="text-cyan-400 animate-pulse" />
                </div>
                
                <p className="text-xl text-gray-300">Processing your responses with advanced AI algorithms...</p>
                <p className="text-lg text-cyan-400 font-semibold">🚀 Launching your career trajectory...</p>
                
                <div className="flex justify-center gap-2 mt-8">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}

            {/* Result Display */}
            {stage === 'result' && result && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400 rounded-full">
                    <Brain className="text-cyan-400" size={24} />
                    <span className="text-white font-semibold">Analyzed by Advanced AI</span>
                    <Zap className="text-yellow-400" size={20} />
                  </div>
                  <p className="text-gray-400 mt-3 text-sm">
                    *AI can make mistakes. For 100% accurate guidance, book a call with our professionals.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-zinc-900 p-8 rounded-2xl border border-cyan-500/50">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="text-cyan-400 font-semibold mb-2 uppercase tracking-wider text-sm">Your Predicted Career Path</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3">{result.topCareer}</h2>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="text-green-400" size={20} />
                            <span className="text-green-400 font-semibold">{result.match}% Match</span>
                          </div>
                          <div className="w-px h-6 bg-zinc-700"></div>
                          <span className="text-gray-400">AI-Powered Analysis</span>
                        </div>
                      </div>
                      <Target className="text-cyan-400" size={48} />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition-all">
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Zap className="text-cyan-400" size={24} />
                      Required Skills
                    </h4>
                    <ul className="space-y-3">
                      {result.skills.map(skill => (
                        <li key={skill} className="text-gray-300 font-medium flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50 transition-all">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition-all">
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Target className="text-purple-400" size={24} />
                      Career Roadmap
                    </h4>
                    <ol className="space-y-3">
                      {result.roadmap.map((stepItem, index) => (
                        <li key={index} className="text-gray-300 font-medium flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-800/50 transition-all">
                          <span className="text-cyan-400 font-bold min-w-[24px]">{index + 1}.</span>
                          <span className="flex-1">{stepItem}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-xl border border-zinc-800">
                  <h4 className="text-xl font-semibold text-white mb-4">Alternative Career Paths</h4>
                  <div className="flex flex-wrap gap-3">
                    {result.alternativePaths.map(path => (
                      <span key={path} className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-full text-gray-300 hover:border-cyan-500/50 transition-all">
                        {path}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-12 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-zinc-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-400 rounded-full mb-4">
                        <span className="text-yellow-400 text-sm font-bold">⚠️ AI Can Make Mistakes</span>
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl font-bold text-white">
                        But Professionals Can't!
                      </h3>
                      <p className="text-xl text-gray-300 leading-relaxed">
                        Get <span className="text-cyan-400 font-semibold">100% accurate guidance</span> from our career experts. Book your call today!
                      </p>
                      
                      <div className="grid sm:grid-cols-3 gap-4 py-6">
                        <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                          <Shield className="text-cyan-400 mx-auto mb-2" size={32} />
                          <p className="text-sm text-gray-300">Expert Guidance</p>
                        </div>
                        <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                          <Target className="text-cyan-400 mx-auto mb-2" size={32} />
                          <p className="text-sm text-gray-300">Personalized Roadmap</p>
                        </div>
                        <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                          <TrendingUp className="text-cyan-400 mx-auto mb-2" size={32} />
                          <p className="text-sm text-gray-300">Career Acceleration</p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={handleBookSession}
                          className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl flex items-center justify-center gap-3 transition-all font-bold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] mx-auto"
                        >
                          <Phone size={24} />
                          <span>Book Your 1:1 Call Now</span>
                          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-cyan-400 mt-4 font-semibold">First 5 Minutes Free • No Credit Card Required</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CareerDetection;