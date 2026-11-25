export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  powerUpName: string;
  powerUpType: 'mushroom' | 'cloud' | 'star';
  accent: string;
  description: string;
  tags: string[];
}

export interface SkillCoin {
  id: string;
  name: string;
  category: string;
  shortCode: string;
  color: string;
  tooltip: string;
}

export interface ExperienceLevel {
  id: string;
  levelCode: string;
  isFinalCastle?: boolean;
  role: string;
  company: string;
  period: string;
  badgeColor: string;
  highlights: string[];
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
  color: string;
  external?: boolean;
}

export const PROFILE = {
  name: 'Arif Kurniawan',
  initials: 'AK',
  hudName: 'ARIF',
  lives: '05',
  title: 'Backend Engineer',
  headline: 'Backend Golang & Microservices',
  statusBadge: 'Available for Work',
  description:
    'I build scalable, high-performance backend systems with Golang, event-driven architectures, and cloud-native infrastructure. 5+ years turning complex problems into clean, reliable code.',
  ctaPrimary: { label: 'View Resume', target: '#experience' },
  ctaSecondary: { label: 'Contact Me', target: '#contact' },
  blogUrl: 'https://arif-kurniawan.site/blog/',
  contactSubtitle:
    'Available for freelance projects, full-time roles, or consulting. Jakarta-based, remote-friendly.',
  footerText: '© 2026 Arif Kurniawan. Built with ♥ in Jakarta.'
} as const;

export const NAV_ITEMS = [
  { id: 'experience', label: 'Experience', href: '#experience', world: 'WORLD 1-3' },
  { id: 'services', label: 'Services', href: '#services', world: 'WORLD 1-1' },
  { id: 'skills', label: 'Skills', href: '#skills', world: 'WORLD 1-2' },
  { id: 'blog', label: 'Blog', href: PROFILE.blogUrl, external: true },
  { id: 'contact', label: 'Contact', href: '#contact', world: 'WORLD 1-4' }
] as const;

/**
 * Edit `projectsDelivered` easily below to update the Projects Delivered stat.
 */
export const STATS: StatItem[] = [
  { id: 'years', value: 5, suffix: '+', label: 'Years Experience' },
  { id: 'companies', value: 4, suffix: '', label: 'Companies Served' },
  { id: 'migrations', value: 3, suffix: '', label: 'Tech Migrations' },
  {
    id: 'projects',
    value: 20, // <-- Placeholder: easy to edit
    suffix: '+',
    label: 'Projects Delivered'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'backend',
    title: 'Backend Development',
    powerUpName: 'Super Go Shroom',
    powerUpType: 'mushroom',
    accent: '#E52521',
    description:
      'Golang, REST & gRPC APIs, Kafka event-driven systems, Clean Architecture, dibangun untuk scale dari startup sampai enterprise.',
    tags: ['Golang', 'REST & gRPC', 'Kafka', 'Clean Architecture']
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    powerUpName: 'Cloud Pipe Boost',
    powerUpType: 'cloud',
    accent: '#00A800',
    description:
      'GCP (Spanner, Compute Engine), Docker, Kubernetes, distributed systems dengan strong consistency dan deployment andal.',
    tags: ['GCP Spanner', 'Compute Engine', 'Docker', 'Kubernetes']
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    powerUpName: 'Super Star Blueprint',
    powerUpType: 'star',
    accent: '#FBD000',
    description:
      'Legacy-to-modern migration, microservice decomposition, RBAC design, observability dengan OpenTelemetry & Datadog.',
    tags: ['Legacy Migration', 'Microservices', 'RBAC', 'OpenTelemetry & Datadog']
  }
];

export const SKILLS: SkillCoin[] = [
  { id: 'golang', name: 'Golang', category: 'Language', shortCode: 'GO', color: '#00ADD8', tooltip: 'High-concurrency backend services & legacy migrations' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database', shortCode: 'PG', color: '#336791', tooltip: 'Relational modeling, indexing & financial transactions' },
  { id: 'kafka', name: 'Kafka', category: 'Streaming', shortCode: 'KF', color: '#E52521', tooltip: 'Event-driven messaging & resilient high-throughput pipelines' },
  { id: 'gcp', name: 'GCP', category: 'Cloud', shortCode: 'GCP', color: '#4285F4', tooltip: 'Google Cloud Spanner, Compute Engine & cloud-native ops' },
  { id: 'redis', name: 'Redis', category: 'Cache', shortCode: 'RD', color: '#DC382D', tooltip: 'Ultra-low-latency caching, locks & rate limiting' },
  { id: 'docker', name: 'Docker', category: 'Containers', shortCode: 'DK', color: '#2496ED', tooltip: 'Multi-stage Go images & reproducible builds' },
  { id: 'grpc', name: 'gRPC', category: 'RPC', shortCode: 'RPC', color: '#00A800', tooltip: 'Fast Protocol Buffers inter-service communication' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'Orchestration', shortCode: 'K8S', color: '#326CE5', tooltip: 'Scalable workload orchestration & zero-downtime rollouts' },
  { id: 'mysql', name: 'MySQL', category: 'Database', shortCode: 'SQL', color: '#F29111', tooltip: 'Production database management & query security hardening' },
  { id: 'linux', name: 'Linux', category: 'Infra', shortCode: 'LNX', color: '#C84C0C', tooltip: 'Server operations, profiling & production troubleshooting' }
];

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  {
    id: 'level-1-1',
    levelCode: 'Level 1-1',
    role: 'Junior Software Engineer',
    company: 'KoinWorks',
    period: 'Jan 2022 – Jan 2023',
    badgeColor: '#00A800',
    highlights: [
      'Developed and maintained investment products with high performance and reliability',
      'Built experience in microservice architecture and inter-service communication',
      'Integrated third-party platforms including CleverTap and SaaS core banking system',
      'Collaborated cross-functional teams to deliver high-quality technical solutions'
    ]
  },
  {
    id: 'level-1-2',
    levelCode: 'Level 1-2',
    role: 'Software Engineer',
    company: 'PrivyID',
    period: 'Jan 2023 – Aug 2023',
    badgeColor: '#5C94FC',
    highlights: [
      'Migrated legacy Ruby on Rails system to Golang, improving performance and scalability',
      'Built secure backend features for banking clients (mortgage services)',
      'Designed and implemented RBAC management system in Golang',
      'Built asset management services streamlining operational efficiency'
    ]
  },
  {
    id: 'level-1-3',
    levelCode: 'Level 1-3',
    role: 'Software Engineer',
    company: 'KB Finansia Multi Finance',
    period: 'Oct 2023 – May 2024',
    badgeColor: '#C84C0C',
    highlights: [
      'Eliminated SQL injection vulnerabilities and resolved critical technical debt',
      'Implemented async workflows improving system performance and resource utilization',
      'Led development of a critical business-used car platform ensuring high stability & scalability',
      'Rewrote services using Clean Architecture, improving maintainability and code quality'
    ]
  },
  {
    id: 'level-1-4',
    levelCode: 'Level 1-4 (Final/Castle)',
    isFinalCastle: true,
    role: 'Software Backend Engineer',
    company: 'Indodax',
    period: 'May 2024 – Present',
    badgeColor: '#E52521',
    highlights: [
      'Re-architected legacy systems into Kafka-based event-driven architecture for critical exchange features',
      'Built scalable backend services in Golang (migrating from PHP)',
      'Implemented distributed databases (Google Spanner) and Redis for ultra-low-latency data access',
      'Enhanced Kafka messaging reliability and integrated OpenTelemetry for centralized monitoring'
    ]
  }
];

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/arifkurniawan200',
    href: 'https://linkedin.com/in/arifkurniawan200',
    color: '#0A66C2',
    external: true
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/arifkurniawan200',
    href: 'https://github.com/arifkurniawan200',
    color: '#1A1C2C',
    external: true
  },
  {
    id: 'email',
    label: 'Email',
    value: 'Arifkurniawan98@outlook.com',
    href: 'mailto:Arifkurniawan98@outlook.com',
    color: '#E52521',
    external: false
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: 'wa.me/6288806897532',
    href: 'https://wa.me/6288806897532',
    color: '#00A800',
    external: true
  }
];

export const WORLD_SECTIONS = [
  { id: 'hero', worldLabel: 'WORLD 1-0 · TITLE' },
  { id: 'services', worldLabel: 'WORLD 1-1 · SERVICES' },
  { id: 'skills', worldLabel: 'WORLD 1-2 · SKILLS' },
  { id: 'experience', worldLabel: 'WORLD 1-3 · LEVELS' },
  { id: 'contact', worldLabel: 'WORLD 1-4 · CASTLE' }
] as const;
