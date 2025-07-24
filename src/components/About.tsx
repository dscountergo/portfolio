import React from 'react';
import { content } from '../data/content';

interface Certificate {
  name: string;
  date: string;
  url?: string;
  private?: boolean;
}

interface AboutProps {
  showToast: (msg: string) => void;
}

const About: React.FC<AboutProps> = ({ showToast }) => {
  const education = content.about.education || [
    {
      year: '2020 - 2024',
      school: 'University name',
      field: 'Field of study',
    },
  ];
  const certificates: Certificate[] = content.about.certificates || [
    {
      name: 'Certificate name',
      date: '2024',
    },
  ];

  const handleCertClick = (cert: Certificate, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cert.private) {
      e.preventDefault();
      showToast('This certificate is available upon request only. Please email me to receive a scanned copy.');
    }
    // by default opens link if not private
  };

  return (
    <div className="about">
      <div className="about-container">
        <h2 className="section-title section-title-gradient">{content.about.title}</h2>
        <div className="about-content">
          <div className="about-left">
            <div className="about-main">
              <div className="about-text">
                <p>{content.about.text}</p>
              </div>
            </div>
            <div className="about-certificates">
              <h3>Certificates</h3>
              <div className="certificates-list">
                {certificates.map((cert, idx) => (
                  <a
                    className="certificate-item"
                    key={idx}
                    href={cert.url && !cert.private ? cert.url : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                    onClick={e => handleCertClick(cert, e)}
                  >
                    <span className="certificate-name">{cert.name}</span>
                    <span className="certificate-date">{cert.date}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="about-education">
            <h3>Education</h3>
            {education.map((edu, idx) => (
              <div className="education-item" key={idx}>
                <h4 style={{ whiteSpace: 'pre-line' }}>{edu.school}</h4>
                <div className="education-year">{edu.year}</div>
                <p>{edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 