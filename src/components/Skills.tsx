import React from 'react';
import { content } from '../data/content';
import TypeScriptLogo from '../assets/logos/TypeScript.svg';
import JavaScriptLogo from '../assets/logos/JavaScript.svg';
import CSharpLogo from '../assets/logos/CSharp.svg';
import CppLogo from '../assets/logos/Cpp.svg';
import ReactLogo from '../assets/logos/React.svg';
import ThreejsLogo from '../assets/logos/Three.js.svg';
import BlenderLogo from '../assets/logos/Blender.svg';
import PhotoshopLogo from '../assets/logos/Adobe_Photoshop.svg';
import IllustratorLogo from '../assets/logos/Adobe_Illustrator.svg';
import AzureLogo from '../assets/logos/Azure.svg';
import GitHubLogo from '../assets/logos/GitHub.svg';
import VSCodeLogo from '../assets/logos/VSCode.svg';
import VisualStudioLogo from '../assets/logos/Visual_Studio.svg';
import JetpackComposeLogo from '../assets/logos/JetpackCompose.svg';
import KotlinLogo from '../assets/logos/Kotlin.svg';
import OpenGLLogo from '../assets/logos/OpenGL.svg';

const logoMap: Record<string, string> = {
  'TypeScript': TypeScriptLogo,
  'JavaScript': JavaScriptLogo,
  'C#': CSharpLogo,
  'C++': CppLogo,
  'Kotlin': KotlinLogo,
  'React': ReactLogo,
  'Three.js': ThreejsLogo,
  'Jetpack Compose': JetpackComposeLogo,
  'Blender': BlenderLogo,
  'Photoshop': PhotoshopLogo,
  'Illustrator': IllustratorLogo,
  'OpenGL': OpenGLLogo,
  'Azure': AzureLogo,
  'GitHub': GitHubLogo,
  'VSCode': VSCodeLogo,
  'Visual Studio': VisualStudioLogo,
};

const Skills: React.FC = () => {
  return (
    <div className="skills">
      <div className="skills-container">
        <h2 className="section-title section-title-gradient">{content.skills.title}</h2>
        <div className="skills-grid">
          {content.skills.categories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.name}</h3>
              <div className="skills-list">
                {category.items.map((skill: string, skillIndex: number) => {
                  const logoSrc = logoMap[skill];
                  return (
                    <div key={skillIndex} className="skill-item">
                      {logoSrc ? (
                        <img src={logoSrc} alt={skill} className="skill-icon" style={{ width: '2rem', height: '2rem' }} />
                      ) : (
                        <span className="skill-icon">⚡</span>
                      )}
                      <span className="skill-name">{skill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills; 