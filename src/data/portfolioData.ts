import { ExperienceItem, Project, SkillCategory } from '../types/portfolio';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1XQsn60WvUG_08EL3-L6Xkfns4QDHHX9u462lWonVnh7XeP6kzMvLvSHxQXAWHNzevx5k47FhylE7Q0bjZXmpKswewexi3BGLnEOun9r3eBmGWJvui2Ao48S8x9KcNXzsC_58MYh_o4fIr1-nrPz1cee4CsKv2fzh-Da8waDkmYWSXGtXP0E8xPDREhQtC5KfNqrqZH_t7zwWx324Ws9_GXa9LzOZRnWwMYXw000jViUNS1bKIaMNV4',
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBhCsRmtQhWVWpz2QeWe_zb4NR3yF0MlgYY-A6BUvZrErYiz-jjhBJS-G2jdjwLyKF1fphEDuYis70_8GmBseZXiSHNqSSX1ZC4AIDz7b549YpJQfiFluI43X72pk8ozTqz8JEd8oo-8bnVjzTQhccQxEZ0OFDAbcBn94Af756W8krK7XUP6We_2sTvG5O_oj80fcmJzi7b2krsg6iHVT5uFm8V7y4wp5fh_N6pxl7wW3AQcUQ6NQ',
  caseStudyPreview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9mAmb9yZ8frmo-9Usotq0-xNU-TE1h98ifqjCPWsRdS98Bdt7Y1qMDlOq3TmwW-WpJ3aEo887IiI8HicZh41MZJ_UWTIbpUZ8QgZ7b5G3UqzTros-cp30ZTzqtsd0pj9hqoO2hl3v1uA5neNoQ-gICLSe46TmKAMbCtneimRO1NcWeAwUcsZDh_tjQF0bXTGe47LI5Aq849GRakmonXQQkqYYblV2jluij9smVJCdh1wIS4PbfEI',
  projectHims: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0zfZZykZl_OeLbG6FB0rBPHN2u10L_rMLkx86AoizDUIDGu_I5FGLqORJgj7xDkBot_BMSPyP85RrVKWmOD_rsxWCkeUN5PvXHFOAXT8ghs68umKRV3EpXoqXlaj6674Rk5wjgzZx5jbP9Dis3FYFyRnpvbZY_twMgYqgzP7OgkFUvYygB_Bt45OWb1luKhy3sjrBC4RM-Gn5ljlgbr7_x_9q59PLopuHkXFncNB8rA_LcxXms7o',
  projectBilling: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFbtYrNv2FDWiFVaZ8JWnUgUXf0dM5riClmicehduxoepQdSI0tq0VquBNgQYpu9rrjOdUFsB7uz-nZJ3s6ZQB6egKaGYlWE-_1qnGHzLdebTtxtENJmXMf1AAGC-KtJF6fd7LLUCMcsgroawZVV6fGaJEmMXlHabZb6Cqnn0plP671jKUme-yhgcLChQxZtsVuRLAey-25RnwzVN2u1xjmTTxhUCeplvUfYPh3GKjF30GNq_fki0',
  projectTelehealth: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYObDIVPO-ylSWEn2X0ewTNqLiBaVups3P6Gkx_r0szmErBYP9fOusmct3FhV7Tnibs7qe_oSbq_0QVdcimnMkjyaLjYPOy5BZJnBB11l14QOj266GXZbftvlXHLQSOh0OJ0E5NXwQ-EdHNKiFYHxlF_f-tTwFq_7Yh8S9ubIZAYgS0sHoHpZYUcZ45gaxo9a7gjabKw0WGxRB-ZlFV_g3D9O_dPld0phmrfgCvIbhjbTp9MfwRDY',
  mobilityMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCKrERDMF3vayTMQO1BIDD6wf2qM6pnh2zzlTgwEp8PZhUgep56ZQoD48F7x-ZvbS1N_93eiUzypVbp5iANmAbtKiGzMy8YdvtweW_smx2Q5b7qgJzbqA7nimNT52zSI7cFl3TvRUEnYzzj0Ace7kmLXMPf7owZhHLrIOx6wcTjZilzShgy5Sc10Gh6vTuBhqgcnVlWUi_LLw1-c_Lq92QLSJFG0Rh_Fe2ISDNqXAS8CjVfyPdnws',
};

export const PROJECTS: Project[] = [
  {
    id: 'hims',
    title: 'Enterprise Healthcare Information Management System (HIMS)',
    subtitle: '// CORE HEALTHCARE INFRASTRUCTURE',
    category: 'erp',
    tags: ['ASP.NET Core', 'C#', 'MS SQL Server', 'EF Core', 'Redis', 'Bootstrap'],
    bannerImage: ASSETS.projectHims,
    imageAlt: 'High tech dark themed medical dashboard user interface showing live clinical analytics hospital status monitor with electric cyan lines deep blue cards dark background futuristic clean software telemetry',
    badge: {
      text: 'Enterprise Live',
      variant: 'live',
    },
    metrics: [
      { label: 'THROUGHPUT', value: '50,000+ /day', highlight: true },
      { label: 'SLA GUARANTEE', value: '99.9% Uptime', highlight: false },
    ],
    description:
      'Comprehensive hospital ERP managing OPD, IPD, Billing, Pharmacy, and EHR workflows engineered for ultra-low latency record synchronization across multi-branch campuses.',
    caseStudyDetails: {
      challenge: 'Multi-speciality hospital networks faced bottlenecks during peak morning OP registrations and critical ER triage syncs, causing unneeded queue latencies.',
      solution: 'Decomposed monolithic transactions into asynchronous C# worker pipelines with Redis distributed caching and partitioned SQL execution plans.',
      results: [
        '50k+ daily transactions smoothly processed without table locking',
        'Reduced patient registration latency from 4.2s to sub-500ms',
        '99.9% verifiable SLA across 20+ partner healthcare facilities'
      ],
      stack: ['ASP.NET Core 7', 'Entity Framework Core', 'SQL Server 2022', 'Redis', 'SignalR', 'xUnit']
    }
  },
  {
    id: 'billing',
    title: 'High-Throughput Clinical Billing & Claims Engine',
    subtitle: '// CLAIMS & FINANCIAL PROCESSING',
    category: 'apis',
    tags: ['.NET 7 Web API', 'Dapper', 'SQL Server', 'Clean Architecture', 'RabbitMQ'],
    bannerImage: ASSETS.projectBilling,
    imageAlt: 'Dark abstract visualization of financial ledger transactions microsecond message queues and cryptographic auditing trails glowing indigo and cyan nodes against a deep slate matrix background',
    badge: {
      text: 'Event-Driven',
      variant: 'event',
    },
    metrics: [
      { label: 'SETTLED CLAIMS', value: '$10M+ Volume', highlight: true },
      { label: 'CYCLE EFFICIENCY', value: '-45% Processing', highlight: false },
    ],
    description:
      'Automated tariff engine and third-party insurance claims settlement gateway with distributed transactions, Clean Architecture, and real-time audit event sourcing.',
    caseStudyDetails: {
      challenge: 'Complex dynamic insurance tariff rules and governmental reimbursement policies caused delayed settlement reconciliation and dispute backlogs.',
      solution: 'Constructed an event-driven rules evaluation engine utilizing RabbitMQ message queues and high-performance Dapper micro-ORM querying.',
      results: [
        '$10M+ aggregate claims volume reconciled with zero loss',
        '45% decrease in end-to-end claim adjudication time',
        'Strict audit logging with tamper-evident event sourcing'
      ],
      stack: ['.NET 7 Web API', 'Dapper', 'RabbitMQ', 'Clean Architecture', 'MediatR', 'FluentValidation']
    }
  },
  {
    id: 'telehealth',
    title: 'Tele-Health Doctor-Patient Consultation Portal',
    subtitle: '// REAL-TIME TELEMEDICINE',
    category: 'fullstack',
    tags: ['C#', 'ASP.NET MVC', 'SignalR', 'Angular', 'WebRTC'],
    bannerImage: ASSETS.projectTelehealth,
    imageAlt: 'Futuristic clean tele-health application dashboard showing real-time encrypted video stream interface digital prescription pad and medical timeline deep slate and vibrant teal accents',
    badge: {
      text: 'WebRTC Encrypted',
      variant: 'webrtc',
    },
    metrics: [
      { label: 'CONSULT SESSIONS', value: '12,000+', highlight: true },
      { label: 'AVG STREAM LATENCY', value: '< 180ms', highlight: false },
    ],
    description:
      'Integrated appointment slot scheduler, browser-based WebRTC encrypted video consults, digital RX signing, and instant EHR longitudinal record sharing.',
    caseStudyDetails: {
      challenge: 'Clinicians required zero-install browser video consultations seamlessly linked to patient historical vitals and active medication allergies during live calls.',
      solution: 'Engineered peer-to-peer WebRTC signaling via ASP.NET Core SignalR hub, with automated digital cryptographic signatures on prescriptions.',
      results: [
        'Over 12,000 successful remote patient consults held',
        'Immediate cross-reference of allergies and ongoing prescriptions in-session',
        'Fully compliant with HIPAA and national clinical tele-practice guidelines'
      ],
      stack: ['ASP.NET MVC', 'SignalR', 'WebRTC', 'Angular 15', 'C#', 'SQL Server']
    }
  },
  {
    id: 'auth-service',
    title: 'Centralized Master Data Management & Auth Service',
    subtitle: '// SECURITY & MASTER DIRECTORY',
    category: 'apis',
    tags: ['ASP.NET Core Identity', 'JWT', 'Swagger', 'Docker'],
    bannerImage: '',
    imageAlt: 'Centralized Master Data Management & Auth Service code interface',
    badge: {
      text: 'IDENTITY CLUSTER',
      variant: 'security',
    },
    metrics: [
      { label: 'TOKEN REFRESH', value: '4ms Auth Time', highlight: true },
      { label: 'SECURITY POSTURE', value: 'Zero-Trust', highlight: false },
    ],
    description:
      'Zero-trust Identity & JWT-based role claim distributor with OAuth2 federated flows, granular permission matrix, IP rate limiting, and automated health checks.',
    codeSnippet: {
      filename: 'auth-policy.cs',
      code: `builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)\n  .AddJwtBearer(opts => opts.TokenValidationParameters = EnterpriseParams);`
    },
    caseStudyDetails: {
      challenge: 'Multi-branch hospitals required unified single-sign-on (SSO) with departmental role isolation (Nurse, Physician, Billing Admin, Auditor).',
      solution: 'Implemented ASP.NET Core Identity with cryptographically signed asymmetric JWT tokens, IP rate limiting middleware, and Docker deployment.',
      results: [
        'Unified authentication across 15+ sub-systems',
        'Sub-5ms token verification overhead',
        'Zero security incidents reported in production'
      ],
      stack: ['ASP.NET Core Identity', 'JWT Bearer', 'OAuth2', 'Docker', 'Swagger OpenAPI', 'Serilog']
    }
  }
];

export const EXPERIENCE_DATA: ExperienceItem = {
  period: 'Oct 2019 – Dec 2023',
  duration: '4 Yrs 2 Mos',
  role: 'Software Developer / Software Engineer',
  company: 'Triotree Technologies Pvt. Ltd.',
  location: 'Noida, India',
  employmentType: 'Full-time (Hybrid)',
  domain: 'Enterprise HIMS',
  domainDescription: 'Triotree is a pioneer in Hospital Information Management Systems (HIMS), delivering mission-critical workflows across leading multi-speciality healthcare networks.',
  deliverables: [
    {
      title: 'Core HIMS Engine',
      icon: 'hub',
      iconColor: 'text-primary-container',
      description: 'Engineered and maintained core operational modules for enterprise Hospital Management Systems utilizing ASP.NET Core, C#, and relational SQL Server architectures.'
    },
    {
      title: 'Resilient RESTful APIs',
      icon: 'api',
      iconColor: 'text-tertiary-fixed-dim',
      description: 'Designed scalable Web API micro-endpoints handling high-throughput patient admissions, dynamic automated billing, and pharmacy order inventory states.'
    },
    {
      title: 'Data Tier Latency Optimization',
      icon: 'database',
      iconColor: 'text-primary-fixed',
      description: 'Refactored complex SQL stored procedures, index clustering, and EF Core execution plans, reducing critical patient record retrieval latency by 35%.'
    },
    {
      title: 'Migration to .NET Core 6/7',
      icon: 'upgrade',
      iconColor: 'text-secondary-fixed',
      description: 'Spearheaded progressive migration phases converting legacy ASP.NET MVC codebases to clean-architecture .NET Core 6 & 7 runtime services.'
    },
    {
      title: 'Agile, CI/CD & Quality Rigor',
      icon: 'sync_alt',
      iconColor: 'text-tertiary',
      description: 'Championed sprint deliverables, continuous integration pipelines via Azure DevOps, rigorous peer code reviews, and automated unit testing suites with xUnit.'
    }
  ],
  technologies: [
    'C#',
    '.NET 6/7',
    'ASP.NET Core',
    'Web API',
    'SQL Server',
    'EF Core',
    'LINQ',
    'JavaScript',
    'jQuery',
    'Git',
    'IIS',
    'Postman',
    'Swagger'
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'cat-backend',
    title: 'Backend & Core Architecture',
    countLabel: '9 Core Capabilities',
    icon: 'dns',
    description: 'High-performance distributed systems, modular microservices, and enterprise domain layering.',
    skills: [
      { name: 'C#', highlight: true },
      { name: '.NET Core', highlight: true },
      { name: 'ASP.NET MVC' },
      { name: 'ASP.NET Web API' },
      { name: 'WCF' },
      { name: 'Microservices', secondary: true },
      { name: 'Clean Architecture' },
      { name: 'SOLID Principles' },
      { name: 'Design Patterns' }
    ]
  },
  {
    id: 'cat-db',
    title: 'Databases & ORM',
    countLabel: '7 Data Technologies',
    icon: 'database',
    description: 'Optimized relational modeling, low-latency in-memory cache design, and sub-millisecond execution pipelines.',
    skills: [
      { name: 'Microsoft SQL Server', highlight: true },
      { name: 'Entity Framework Core' },
      { name: 'Dapper', secondary: true },
      { name: 'T-SQL' },
      { name: 'Stored Procedures' },
      { name: 'Performance Indexing', primary: true },
      { name: 'Redis', highlight: true }
    ]
  },
  {
    id: 'cat-fe',
    title: 'Web Frontend & UI Systems',
    countLabel: '8 Client Frameworks',
    icon: 'devices',
    description: 'Strict typed interfaces, responsive component kits, and accessible design system implementations.',
    skills: [
      { name: 'JavaScript (ES6+)' },
      { name: 'TypeScript', highlight: true },
      { name: 'Angular', primary: true },
      { name: 'HTML5 / CSS3' },
      { name: 'Tailwind CSS', secondary: true },
      { name: 'Bootstrap' },
      { name: 'AJAX' },
      { name: 'JSON' }
    ]
  },
  {
    id: 'cat-cloud',
    title: 'Tools, Cloud & DevOps',
    countLabel: '9 DevOps Instruments',
    icon: 'cloud_sync',
    description: 'Automated deployment pipelines, modern API contract test suites, and containerized dev environments.',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Azure DevOps', highlight: true },
      { name: 'CI/CD Pipelines', secondary: true },
      { name: 'IIS' },
      { name: 'Docker Basics' },
      { name: 'Postman' },
      { name: 'Swagger' },
      { name: 'Visual Studio 2022' }
    ]
  }
];
