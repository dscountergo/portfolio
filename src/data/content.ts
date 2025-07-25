type ImageModule = { default: string };

const FFactorySimImages = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/projects/FFactorySim/*.png', { eager: true }))
    .map(([path, module]) => [path.split('/').pop()?.replace('.png', ''), (module as ImageModule).default])
) as Record<string, string>;

const LineControlImages = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/projects/LineAgent-Azure/*.png', { eager: true }))
    .map(([path, module]) => [path.split('/').pop()?.replace('.png', ''), (module as ImageModule).default])
) as Record<string, string>;

export const content = {
  hero: {
    title: "Software Developer",
    typewriterTexts: [
      "Software Engineer",
      "3D & Frontend Specialist",
      "Cloud Automation Enthusiast"
    ],
    description:
      "Creative developer combining frontend expertise with 3D graphics to build unique digital solutions. Passionate about creating immersive experiences and pushing the boundaries of modern technologies.",
  },
  about: {
    title: "About Me",
    text: `I am passionate about new technologies, 3D graphics and creative coding. I specialize in building modern, interactive web applications using React, TypeScript and Three.js. I also have experience with C#, C++, Blender, Photoshop, Illustrator, OpenGL and GitHub. I love combining design with technology to create unique digital experiences.\n\nI leverage AI tools and prompt engineering to accelerate development, ideation, and creative workflows.`,
    education: [
      {
        year: '2022 - Present',
        school: 'University of Łódź',
        field: 'BSc in Computer Science',
      },
      {
        year: '2018 - 2022',
        school: 'ZSP No. 1, Tomaszów Mazowiecki',
        field: 'IT Technician',
      }
    ],
    certificates: [
      {
        name: 'CCNAv7: Introduction to Networks',
        date: '2024',
        url: 'https://www.credly.com/badges/b13d0995-fdf2-45fd-91f1-0fc8ba56778f/public_url',
        private: false
      },
      {
        name: 'EE.08 – Computer Systems & Networks',
        date: '2022',
        url: '#',
        private: true
      },
      {
        name: 'EE.09 – Programming, Websites & Databases',
        date: '2022',
        url: '#',
        private: true
      }
    ]
  },
  skills: {
    title: "Skills",
    categories: [
      {
        name: "Languages",
        items: ["TypeScript", "JavaScript", "C#", "C++", "Kotlin"]
      },
      {
        name: "Frameworks & Libraries",
        items: ["React", "Three.js", "Jetpack Compose"]
      },
      {
        name: "3D & Graphics",
        items: ["Blender", "Photoshop", "Illustrator", "OpenGL"]
      },
      {
        name: "Cloud & Automation",
        items: ["Azure", "GitHub"]
      },
      {
        name: "Development Tools",
        items: ["VSCode", "Visual Studio"]
      }
    ]
  },
  projects: {
    title: "Projects",
    list: [
      {
        name: "FFactorySim",
        description: "Simple industrial device simulator with OPC UA integration.",
        technologies: ["C#", "OPC UA", "Simulation"],
        github: "https://github.com/dscountergo/FFactorySim",
        demo: "#",
        images: Object.values(FFactorySimImages)
      },
      {
        name: "LineAgent-Azure",
        description: "Production line management system that connects devices to Azure IoT platform for automated failure handling and stats tracking.",
        technologies: ["C#", "Azure", "Cloud Services"],
        github: "https://github.com/dscountergo/LineAgent-Azure",
        demo: "#",
        images: Object.values(LineControlImages)
      }
    ]
  },
  contact: {
    title: "Get in Touch",
    email: "contact.cyniak@gmail.com",
    github: "https://github.com/dscountergo",
    linkedin: "#",
    messageTitle: "Let’s Make It Happen",
    messageText: "Every great project starts with a conversation. If you're working on something exciting or just want to connect, feel free to drop me a message. I’m always open to new opportunities, challenges, and collaborations.",
    locationLabel: "Location",
    locationValue: "Poland, Łódź"
  }
}; 