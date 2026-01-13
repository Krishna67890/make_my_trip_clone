import React from 'react';
import { Download, Mail, Phone, MessageCircle } from 'lucide-react';
import './QuickLinks.css';

const QuickLinks = () => {
  const quickLinks = [
    {
      icon: Download,
      title: 'Download App',
      description: 'Get exclusive app-only deals'
    },
    {
      icon: Mail,
      title: 'Subscribe',
      description: 'Get best offers in your inbox'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: '+91-9998887777'
    },
    {
      icon: MessageCircle,
      title: 'Chat Support',
      description: '24/7 customer support'
    }
  ];

  return (
    <div className="quick-links">
      <div className="quick-links-container">
        {quickLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <div key={index} className="quick-link-item">
              <div className="quick-link-icon">
                <Icon size={24} />
              </div>
              <div className="quick-link-content">
                <h4>{link.title}</h4>
                <p>{link.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;