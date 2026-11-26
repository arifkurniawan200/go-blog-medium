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
  location?: string;
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
    company: 'PT Lunaria Annua Teknologi (KoinWorks)',
    location: 'Jakarta',
    period: 'Jan 2022 – Jan 2023',
    badgeColor: '#00A800',
    highlights: [
      'Accelerated the development and iteration of multiple digital investment products, maintaining smooth user experiences and robust platform stability',
      'Gained hands-on expertise in microservices architecture, designing lightweight, reliable inter-service communication protocols across distributed systems',
      'Integrated complex third-party platforms, including CleverTap marketing automation and a SaaS cloud core banking system, expanding core platform capabilities',
      'Maximized product uptime by proactively tracking application metrics, rapidly debugging production glitches, and resolving high-priority bugs',
      'Collaborated actively within cross-functional Agile teams to design, estimate, and deliver high-quality software solutions in fast-paced sprint cycles'
    ]
  },
  {
    id: 'level-1-2',
    levelCode: 'Level 1-2',
    role: 'Software Engineer',
    company: 'PT Privy Identitas Digital (PrivyID)',
    location: 'Yogyakarta',
    period: 'Jan 2023 – May 2024',
    badgeColor: '#5C94FC',
    highlights: [
      'Contributed to the successful migration of a legacy Ruby on Rails system to Golang, achieving substantial benchmarks in application performance and horizontal scalability',
      'Developed secure, high-availability backend features for client-facing mortgage-related services, ensuring a seamless digital signature experience for banking institution clients',
      'Designed and executed a comprehensive Role-Based Access Control (RBAC) management system in Go, strengthening enterprise platform security with granular access controls',
      'Built and optimized automated asset management services, streamlining internal asset tracking processes and operational efficiency for corporate clients'
    ]
  },
  {
    id: 'level-1-3',
    levelCode: 'Level 1-3',
    role: 'Software Backend Engineer',
    company: 'PT Indodax Nasional Indonesia',
    location: 'Jakarta',
    period: 'May 2024 – Oct 2025',
    badgeColor: '#C84C0C',
    highlights: [
      'Contributed to re-architecting legacy cryptocurrency exchange systems into a Kafka-based event-driven architecture, significantly increasing system throughput and real-time processing for critical trading features',
      'Spearheaded the migration of core backend services from PHP to Golang, drastically reducing endpoint latency while improving system maintainability and scalability',
      'Optimized database performance across high-traffic endpoints by implementing Google Spanner for strict data consistency and Redis for ultra-low-latency caching',
      'Enhanced Kafka messaging reliability and stream processing pipelines, ensuring seamless data delivery for mission-critical operations with zero data loss',
      'Integrated secure external REST APIs and Webhooks to automate complex business workflows and boost cross-platform operational efficiency'
    ]
  },
  {
    id: 'level-1-4',
    levelCode: 'Level 1-4 (Final/Castle)',
    isFinalCastle: true,
    role: 'Software Engineer',
    company: 'PT GDC Multi Sarana',
    location: 'Jakarta',
    period: 'Oct 2025 – Present',
    badgeColor: '#E52521',
    highlights: [
      'Detailed high-level system designs in close collaboration with product and cross-functional engineering teams to accelerate the delivery of new financial products',
      'Spearheaded the complete redesign and end-to-end rewrite of the core loan system, migrating legacy Python services into a high-performance, scalable Golang microservices architecture',
      'Systematically resolved critical technical debt by refactoring core codebases, enhancing overall system maintainability, performance, and operational efficiency',
      'Strengthened platform security and data compliance by implementing stringent controls to align with ISO standards and industry best practices',
      'Partnered with cross-departmental stakeholders to align technical specifications with evolving product requirements, ensuring smooth deployment cycles',
      'Engineered and maintained mission-critical financial transaction services—including fund disbursement, transaction status inquiry, and settlement—ensuring high data accuracy, idempotency, and reliable reconciliation'
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
