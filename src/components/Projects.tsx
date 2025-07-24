import React from 'react';
import { content } from '../data/content';

const MAX_VISIBLE = 4;

const Projects: React.FC = () => {
  const [showAll, setShowAll] = React.useState(false);
  const visibleProjects = showAll ? content.projects.list : content.projects.list.slice(0, MAX_VISIBLE);
  const hasMore = content.projects.list.length > MAX_VISIBLE;

  return (
    <div className="projects">
      <div className="projects-container">
        <h2 className="section-title section-title-gradient">{content.projects.title}</h2>
        <div className="projects-grid custom-projects-grid">
          {visibleProjects.map((project, idx) => (
            <div key={idx} className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <span>{project.name}</span>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="technology-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo && project.demo !== '#' && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button className="show-more-btn" onClick={() => setShowAll(true)}>
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects; 