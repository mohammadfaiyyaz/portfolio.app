export type TabType = 'overview' | 'experience' | 'projects' | 'skills' | 'contact';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'erp' | 'apis' | 'fullstack';
  tags: string[];
  bannerImage: string;
  imageAlt: string;
  badge: {
    text: string;
    icon?: string;
    variant: 'live' | 'event' | 'webrtc' | 'security';
  };
  metrics: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  description: string;
  codeSnippet?: {
    filename: string;
    code: string;
  };
  architectureNotes?: string[];
  caseStudyDetails?: {
    challenge: string;
    solution: string;
    results: string[];
    stack: string[];
  };
}

export interface ExperienceItem {
  period: string;
  duration: string;
  role: string;
  company: string;
  location: string;
  employmentType: string;
  domain: string;
  domainDescription: string;
  deliverables: {
    title: string;
    icon: string;
    description: string;
    iconColor: string;
  }[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  countLabel: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    highlight?: boolean;
    secondary?: boolean;
    primary?: boolean;
  }[];
}
