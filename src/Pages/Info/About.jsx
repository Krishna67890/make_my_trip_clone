import React, { useState } from 'react';
import './About.css';

// Social media icons (you would import actual icons)
const SocialIcon = ({ platform, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className={`social-icon ${platform}`}>
    <i className={`fab fa-${platform}`}></i>
  </a>
);

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');

  // Developer information
  const developerInfo = {
    name: "Alex Johnson",
    title: "Full Stack Developer & UI/UX Designer",
    bio: "Passionate coder with 5+ years of experience creating beautiful, functional web and mobile applications. I specialize in React, React Native, and modern web technologies.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    socialMedia: [
      { platform: "github", url: "https://github.com/alexjohnson" },
      { platform: "linkedin", url: "https://linkedin.com/in/alexjohnson" },
      { platform: "twitter", url: "https://twitter.com/alexjohnson" },
      { platform: "dribbble", url: "https://dribbble.com/alexjohnson" },
      { platform: "behance", url: "https://behance.net/alexjohnson" }
    ],
    skills: {
      frontend: ["React", "React Native", "Vue.js", "TypeScript", "Redux", "CSS/SCSS"],
      backend: ["Node.js", "Express", "Python", "Django", "Firebase", "MongoDB"],
      tools: ["Git", "Webpack", "Figma", "Adobe XD", "Jest", "Docker"]
    },
    projects: [
      { name: "E-Commerce App", tech: "React Native, Firebase", description: "Mobile shopping app with 50k+ downloads" },
      { name: "Portfolio Builder", tech: "React, Node.js", description: "Drag-and-drop website builder for developers" },
      { name: "Task Management", tech: "Vue.js, Express", description: "Team collaboration tool with real-time updates" }
    ],
    experience: [
      { company: "TechInnovate", role: "Senior Frontend Developer", period: "2020-Present" },
      { company: "WebSolutions Inc", role: "React Native Developer", period: "2018-2020" },
      { company: "DevStudio", role: "UI/UX Designer", period: "2016-2018" }
    ]
  };

  return (
    <div className="about-container">
      <div className="about-header">
        <div className="profile-section">
          <div className="avatar-container">
            <img src={developerInfo.avatar} alt={developerInfo.name} className="profile-avatar" />
            <div className="status-indicator"></div>
          </div>
          <div className="profile-info">
            <h1>{developerInfo.name}</h1>
            <h2>{developerInfo.title}</h2>
            <p>{developerInfo.bio}</p>
            <div className="social-links">
              {developerInfo.socialMedia.map((social, index) => (
                <SocialIcon key={index} platform={social.platform} url={social.url} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="about-content">
        <div className="tabs">
          <button 
            className={activeTab === 'skills' ? 'tab active' : 'tab'} 
            onClick={() => setActiveTab('skills')}
          >
            Skills & Technologies
          </button>
          <button 
            className={activeTab === 'projects' ? 'tab active' : 'tab'} 
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={activeTab === 'experience' ? 'tab active' : 'tab'} 
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'skills' && (
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Frontend Development</h3>
                <div className="skills-list">
                  {developerInfo.skills.frontend.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3>Backend Development</h3>
                <div className="skills-list">
                  {developerInfo.skills.backend.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3>Tools & Technologies</h3>
                <div className="skills-list">
                  {developerInfo.skills.tools.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="projects-grid">
              {developerInfo.projects.map((project, index) => (
                <div key={index} className="project-card">
                  <h3>{project.name}</h3>
                  <p className="project-tech">{project.tech}</p>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-links">
                    <button className="btn-primary">View Demo</button>
                    <button className="btn-secondary">GitHub</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="experience-timeline">
              {developerInfo.experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>{exp.role}</h3>
                    <p className="company">{exp.company}</p>
                    <p className="period">{exp.period}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="tech-stack">
        <h2>Tech Stack & Website Builder Expertise</h2>
        <div className="stack-items">
          <div className="stack-item">
            <h3>React Native</h3>
            <p>Cross-platform mobile app development with responsive UI components</p>
          </div>
          <div className="stack-item">
            <h3>Webflow</h3>
            <p>Visual website builder with custom code integration capabilities</p>
          </div>
          <div className="stack-item">
            <h3>WordPress</h3>
            <p>Custom theme development and plugin customization</p>
          </div>
          <div className="stack-item">
            <h3>Shopify</h3>
            <p>E-commerce store development with liquid templating</p>
          </div>
        </div>
      </div>

      <div className="contact-cta">
        <h2>Let's Build Something Amazing Together</h2>
        <p>I'm available for freelance projects and full-time opportunities</p>
        <button className="cta-button">Get In Touch</button>
      </div>
    </div>
  );
};

export default About;