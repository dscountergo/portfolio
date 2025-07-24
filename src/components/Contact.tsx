import React from 'react';
import { content } from '../data/content';
import { FiMail, FiGithub, FiMapPin } from 'react-icons/fi';

const Contact: React.FC = () => {
  return (
    <div className="contact">
      <div className="contact-container">
        <h2 className="section-title section-title-gradient">{content.contact.title}</h2>
        <div className="contact-split-box">
          <div className="contact-split-left">
            <div className="contact-message-block">
              <h3 className="contact-message-title contact-message-title-gradient">{content.contact.messageTitle}</h3>
              <p className="contact-placeholder-text">{content.contact.messageText}</p>
            </div>
          </div>
          {/* <div className="contact-split-divider" /> */}
          <div className="contact-split-right">
            <div className="contact-links-vertical">
              <div className="contact-link-section">
                <FiMail className="contact-link-icon" />
                <div>
                  <div className="contact-link-label">Email</div>
                  <a href={`mailto:${content.contact.email}`} className="contact-link-sub">
                    {content.contact.email}
                  </a>
                </div>
              </div>
              <div className="contact-link-section">
                <FiGithub className="contact-link-icon" />
                <div>
                  <div className="contact-link-label">GitHub</div>
                  <a href={content.contact.github} target="_blank" rel="noopener noreferrer" className="contact-link-sub">
                    {content.contact.github.replace('https://', '').replace('github.com/', 'github.com/')}
                  </a>
                </div>
              </div>
              <div className="contact-link-section">
                <FiMapPin className="contact-link-icon" />
                <div>
                  <div className="contact-link-label">{content.contact.locationLabel}</div>
                  <div className="contact-link-sub">{content.contact.locationValue}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 