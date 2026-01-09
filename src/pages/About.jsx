import React, { useEffect } from 'react';
import { ChevronRight, Mail, Calendar, Briefcase } from 'lucide-react';
import Shihaan from '../../src/assets/download.jfif';
import Orbaco from '../../src/assets/orbaco.webp';
import Surajit from '../../src/assets/img.jpg';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  const experiences = [
    {
      company: "ShihanTech Global",
      logo: Shihaan,
      role: "Full Stack Developer",
      duration: "Current Position",
      description: "Working on cutting-edge web applications using React, Node.js, and cloud technologies.",
      technologies: ["Next.js", "Go", "Node.js", "AWS", "Express", "Asp.Net", "MongoDB"]
    },
    {
      company: "Orbaco Health LLP",
      logo: Orbaco,
      role: "Full Stack Developer",
      duration: "6 months",
      description: "Developed healthcare solutions and improved existing applications.",
      technologies: ["React", "Express", "PostgreSQL", "Docker"]
    }
  ];

  useEffect(() => {
    // Create glow effect element
    const glowEffect = document.createElement('div');
    glowEffect.className = 'glow-effect-right';
    document.querySelector('.about-container')?.appendChild(glowEffect);

    return () => {
      // Cleanup on unmount
      glowEffect?.remove();
    };
  }, []);

  return (
    <div className="about-container">
      {/* Career.AI Section */}
      <div className="product-area">
        <h1 className="" >About Surajit.aI</h1>
        <p className="product-description">
          Surajit.AI is an innovative platform designed to bridge the gap between job seekers and employers through advanced AI-driven technology.
          Our goal is to simplify the job search process, making it more efficient and user-friendly for both candidates and recruiters.
        </p>
      </div>

      {/* How It Works Section */}
      <div className="product-area">
        <h2>How It Works</h2>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="experience-card" style={{ flexDirection: 'column', alignItems: 'flex-start', height: 'auto', minHeight: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
              <div style={{ 
                background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', 
                padding: '15px', 
                borderRadius: '10px',
                marginRight: '20px',
                flexShrink: 0
              }}>
                <ChevronRight className="w-6 h-6" style={{ color: '#000' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ color: '#06b6d4', fontSize: '1.3rem', marginBottom: '10px' }}>AI-Powered Matching</h3>
                <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
                  Our platform utilizes advanced machine learning algorithms to analyze user profiles, skills, and preferences,
                  creating perfect matches between candidates and job openings.
                </p>
              </div>
            </div>
          </div>

          <div className="experience-card" style={{ flexDirection: 'column', alignItems: 'flex-start', height: 'auto', minHeight: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
              <div style={{ 
                background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', 
                padding: '15px', 
                borderRadius: '10px',
                marginRight: '20px',
                flexShrink: 0
              }}>
                <ChevronRight className="w-6 h-6" style={{ color: '#000' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ color: '#06b6d4', fontSize: '1.3rem', marginBottom: '10px' }}>Smart Profile Enhancement</h3>
                <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
                  Get personalized recommendations for improving your profile visibility and increasing your chances
                  of landing your dream job through our AI-driven insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="developer-area-wrapper" style={{ marginBottom: '80px' }}>
        <h2>About the Developer</h2>
        <div className="developer-area">
          <img
            src={Surajit}
            alt="Surajit Mandal"
            className="developer-photo"
          />
          <div className="details">
            <h3 className="title">Surajit Mandal</h3>
            <p style={{ fontSize: '1.1rem', color: '#d1d5db', margin: '5px 0' }}>B.Tech CSE @ CIEM</p>
            <p className="specialization">Full Stack Developer</p>
            <div className="contact" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '15px' }}>
              <Mail style={{ width: '20px', height: '20px', color: '#06b6d4' }} />
              <a href="mailto:surajitmandalcs@gmail.com" className="email">
                surajitmandalcs@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="experience-area">
        <h2>Professional Experience</h2>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="company-logo" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'white',
                borderRadius: '10px',
                padding: '10px'
              }}>
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              
              <div className="experience-details">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  marginBottom: '15px',
                  gap: '10px'
                }}>
                  <div>
                    <h3 style={{ margin: 0, marginBottom: '5px' }}>{exp.company}</h3>
                    <p style={{ 
                      fontSize: '1.2rem', 
                      color: '#ffffff',
                      fontWeight: '600',
                      margin: 0 
                    }}>
                      {exp.role}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar style={{ width: '18px', height: '18px', color: '#06b6d4' }} />
                    <span className="duration">{exp.duration}</span>
                  </div>
                </div>
                
                <p style={{ color: '#d1d5db', marginBottom: '15px', lineHeight: '1.6' }}>
                  {exp.description}
                </p>
                
                {/* Technologies */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {exp.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      style={{
                        padding: '6px 14px',
                        background: 'rgba(6, 182, 212, 0.1)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        color: '#06b6d4',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Section */}
      <div className="booking-section">
        <h2>Ready to Advance Your Career?</h2>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#d1d5db', 
          maxWidth: '700px', 
          margin: '0 auto 30px',
          lineHeight: '1.6'
        }}>
          Get personalized guidance from industry experts and accelerate your professional growth
        </p>
        <button
          onClick={() => navigate('/BookASession')}
          className="book-session-button"
        >
          Book a 1:1 Session
        </button>
      </div>
    </div>
  );
};

export default About;