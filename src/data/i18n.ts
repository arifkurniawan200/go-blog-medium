import {
  CONTACT_LINKS,
  PROFILE,
  SERVICES,
  SKILLS,
  STATS,
  type ExperienceLevel,
  type ServiceItem,
  type SkillCoin,
  type StatItem
} from './portfolio';

export type Language = 'en' | 'id';

export interface NavItemLocalized {
  id: string;
  label: string;
  href: string;
  world?: string;
  external?: boolean;
}

export interface WorldSectionLocalized {
  id: string;
  worldLabel: string;
  shortLabel: string;
}

export interface LocalizedPortfolioContent {
  lang: Language;
  profile: {
    name: string;
    initials: string;
    hudName: string;
    lives: string;
    title: string;
    headline: string;
    statusBadge: string;
    description: string;
    ctaPrimary: { label: string; target: string };
    ctaSecondary: { label: string; target: string };
    blogUrl: string;
    contactSubtitle: string;
    footerText: string;
  };
  nav: NavItemLocalized[];
  worldSections: WorldSectionLocalized[];
  stats: StatItem[];
  services: ServiceItem[];
  skills: SkillCoin[];
  experienceLevels: ExperienceLevel[];
  contactLinks: typeof CONTACT_LINKS;
  ui: {
    skipToContent: string;
    backToTitle: string;
    stageLabel: string;
    scoreLabel: string;
    coinsTitle: string;
    mode3D: string;
    modeClassic: string;
    switchTo3DTitle: string;
    switchToClassicTitle: string;
    soundOnTitle: string;
    soundOffTitle: string;
    muteSoundAria: string;
    enableSoundAria: string;
    toggleMenuAria: string;
    selectStage: string;
    warpArrow: string;
    starPowerShort: string;
    hireMe: string;
    languageLabel: string;
    switchLanguageAria: string;
    loadingBadge: string;
    loadingReady: string;
    skipIntro: string;
    loadingAria: string;
    hero: {
      playerPrefix: string;
      pressStart: string;
      enterWorld: string;
      scrollBadge: string;
      scrollDesc: string;
      keysBadge: string;
      keysDesc: string;
      tipHeader: string;
      tips: string[];
      tipNextHint: string;
      statBadge: string;
      statClickHint: string;
    };
    services: {
      worldBadge: string;
      heading: string;
      subtitlePrefix: string;
      subtitleSuffix: string;
      unlockAll: string;
      hitDone: string;
      hitPrefix: string;
      allUnlockedBadge: string;
    };
    skills: {
      worldBadge: string;
      heading: string;
      subtitle: (collected: number, total: number) => string;
      collectAll: string;
      allFilter: string;
      inspectorBadge: string;
      statusLabel: string;
      collectedBonus: string;
      tapToCollect: string;
      collectNowBtn: string;
      collectedBadge: string;
      allCollectedBanner: string;
    };
    experience: {
      worldBadge: string;
      heading: string;
      subtitle: string;
      pathBadge: string;
      activeStage: string;
      stageClear: string;
      finalCastleFooter: string;
      nextLevelFooter: string;
      goalPole: string;
      flagWaved: string;
      waveFlagHint: string;
    };
    contact: {
      worldBadge: string;
      heading: string;
      copyEmailAria: string;
      copied: string;
      copy: string;
      fireworksBtn: string;
      footerKonamiHint: string;
    };
    warp: {
      transitLabel: string;
    };
    konami: {
      title: string;
      subtitle: string;
    };
    controls: {
      jump: string;
      jumpAria: string;
      celebrate: string;
      celebrateAria: string;
      backToTop: string;
      worldProgress: string;
    };
    scene: {
      warpStart: string;
      warpSkills: string;
      warpLevels: string;
      coinCollected: string;
      coinClickToCollect: string;
    };
    popups: {
      allCoins: string;
      flagBonus: string;
      fireworks: string;
      langSwitched: string;
      jumpBoing: string;
    };
  };
}

const SERVICES_EN: ServiceItem[] = [
  {
    id: 'backend',
    title: 'Backend Development',
    powerUpName: 'Super Go Shroom',
    powerUpType: 'mushroom',
    accent: '#E52521',
    description:
      'Golang, REST & gRPC APIs, Kafka event-driven systems, and Clean Architecture — built to scale from early startups to enterprise traffic.',
    tags: ['Golang', 'REST & gRPC', 'Kafka', 'Clean Architecture']
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    powerUpName: 'Cloud Pipe Boost',
    powerUpType: 'cloud',
    accent: '#00A800',
    description:
      'GCP (Spanner, Compute Engine), Docker, Kubernetes, and distributed systems engineered for strong consistency and reliable deployments.',
    tags: ['GCP Spanner', 'Compute Engine', 'Docker', 'Kubernetes']
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    powerUpName: 'Super Star Blueprint',
    powerUpType: 'star',
    accent: '#FBD000',
    description:
      'Legacy-to-modern migrations, microservice decomposition, RBAC design, and full observability with OpenTelemetry & Datadog.',
    tags: ['Legacy Migration', 'Microservices', 'RBAC', 'OpenTelemetry & Datadog']
  }
];

const SERVICES_ID: ServiceItem[] = [
  {
    id: 'backend',
    title: 'Pengembangan Backend',
    powerUpName: 'Super Go Shroom',
    powerUpType: 'mushroom',
    accent: '#E52521',
    description:
      'Golang, REST & gRPC API, sistem event-driven berbasis Kafka, dan Clean Architecture — dirancang siap scale dari startup hingga enterprise.',
    tags: ['Golang', 'REST & gRPC', 'Kafka', 'Clean Architecture']
  },
  {
    id: 'cloud',
    title: 'Infrastruktur Cloud',
    powerUpName: 'Cloud Pipe Boost',
    powerUpType: 'cloud',
    accent: '#00A800',
    description:
      'GCP (Spanner, Compute Engine), Docker, Kubernetes, dan sistem terdistribusi dengan konsistensi kuat serta deployment yang andal.',
    tags: ['GCP Spanner', 'Compute Engine', 'Docker', 'Kubernetes']
  },
  {
    id: 'architecture',
    title: 'Arsitektur Sistem',
    powerUpName: 'Super Star Blueprint',
    powerUpType: 'star',
    accent: '#FBD000',
    description:
      'Migrasi sistem legacy ke arsitektur modern, pemecahan microservices, desain RBAC, serta observability menyeluruh dengan OpenTelemetry & Datadog.',
    tags: ['Migrasi Legacy', 'Microservices', 'RBAC', 'OpenTelemetry & Datadog']
  }
];

const SKILLS_ID: SkillCoin[] = [
  { id: 'golang', name: 'Golang', category: 'Bahasa', shortCode: 'GO', color: '#00ADD8', tooltip: 'Layanan backend concurrency tinggi & migrasi sistem legacy' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Basis Data', shortCode: 'PG', color: '#336791', tooltip: 'Pemodelan relasional, indexing & transaksi finansial presisi' },
  { id: 'kafka', name: 'Kafka', category: 'Streaming', shortCode: 'KF', color: '#E52521', tooltip: 'Messaging event-driven & pipeline throughput tinggi yang tangguh' },
  { id: 'gcp', name: 'GCP', category: 'Cloud', shortCode: 'GCP', color: '#4285F4', tooltip: 'Google Cloud Spanner, Compute Engine & operasional cloud-native' },
  { id: 'redis', name: 'Redis', category: 'Cache', shortCode: 'RD', color: '#DC382D', tooltip: 'Caching latensi ultra-rendah, distributed lock & rate limiting' },
  { id: 'docker', name: 'Docker', category: 'Kontainer', shortCode: 'DK', color: '#2496ED', tooltip: 'Multi-stage Go image & build yang konsisten di tiap environment' },
  { id: 'grpc', name: 'gRPC', category: 'RPC', shortCode: 'RPC', color: '#00A800', tooltip: 'Komunikasi antar-layanan berkecepatan tinggi dengan Protocol Buffers' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'Orkestrasi', shortCode: 'K8S', color: '#326CE5', tooltip: 'Orkestrasi workload berskala besar & rollout tanpa downtime' },
  { id: 'mysql', name: 'MySQL', category: 'Basis Data', shortCode: 'SQL', color: '#F29111', tooltip: 'Manajemen database produksi & penguatan keamanan query' },
  { id: 'linux', name: 'Linux', category: 'Infra', shortCode: 'LNX', color: '#C84C0C', tooltip: 'Operasional server, profiling & troubleshooting produksi' }
];

const EXPERIENCE_EN: ExperienceLevel[] = [
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
      'Collaborated with cross-functional teams to deliver high-quality technical solutions'
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
      'Led development of a critical business used-car platform ensuring high stability & scalability',
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

const EXPERIENCE_ID: ExperienceLevel[] = [
  {
    id: 'level-1-1',
    levelCode: 'Level 1-1',
    role: 'Junior Software Engineer',
    company: 'KoinWorks',
    period: 'Jan 2022 – Jan 2023',
    badgeColor: '#00A800',
    highlights: [
      'Mengembangkan dan memelihara produk investasi dengan performa dan keandalan tinggi',
      'Membangun fondasi arsitektur microservices serta komunikasi antar-layanan',
      'Mengintegrasikan platform pihak ketiga termasuk CleverTap dan sistem core banking SaaS',
      'Berkolaborasi dengan tim lintas fungsi untuk menghadirkan solusi teknis berkualitas tinggi'
    ]
  },
  {
    id: 'level-1-2',
    levelCode: 'Level 1-2',
    role: 'Software Engineer',
    company: 'PrivyID',
    period: 'Jan 2023 – Agu 2023',
    badgeColor: '#5C94FC',
    highlights: [
      'Memigrasikan sistem legacy Ruby on Rails ke Golang untuk meningkatkan performa dan skalabilitas',
      'Membangun fitur backend aman untuk klien perbankan (layanan KPR / mortgage)',
      'Merancang dan mengimplementasikan sistem manajemen RBAC menggunakan Golang',
      'Membangun layanan manajemen aset guna meningkatkan efisiensi operasional'
    ]
  },
  {
    id: 'level-1-3',
    levelCode: 'Level 1-3',
    role: 'Software Engineer',
    company: 'KB Finansia Multi Finance',
    period: 'Okt 2023 – Mei 2024',
    badgeColor: '#C84C0C',
    highlights: [
      'Menghilangkan celah kerentanan SQL injection dan menuntaskan technical debt kritis',
      'Mengimplementasikan alur kerja asinkron untuk meningkatkan performa dan efisiensi resource',
      'Memimpin pengembangan platform bisnis mobil bekas yang kritikal dengan stabilitas & skalabilitas tinggi',
      'Menulis ulang layanan dengan Clean Architecture sehingga kode jauh lebih rapi dan mudah dipelihara'
    ]
  },
  {
    id: 'level-1-4',
    levelCode: 'Level 1-4 (Final/Kastil)',
    isFinalCastle: true,
    role: 'Software Backend Engineer',
    company: 'Indodax',
    period: 'Mei 2024 – Sekarang',
    badgeColor: '#E52521',
    highlights: [
      'Merancang ulang sistem legacy menjadi arsitektur event-driven berbasis Kafka untuk fitur exchange kritikal',
      'Membangun layanan backend skalabel dengan Golang (migrasi dari PHP)',
      'Mengimplementasikan database terdistribusi (Google Spanner) dan Redis untuk akses data berlatensi ultra-rendah',
      'Meningkatkan keandalan messaging Kafka serta mengintegrasikan OpenTelemetry untuk monitoring terpusat'
    ]
  }
];

const CONTENT_BY_LANG: Record<Language, LocalizedPortfolioContent> = {
  en: {
    lang: 'en',
    profile: {
      ...PROFILE,
      title: 'Backend Engineer',
      headline: 'Backend Golang & Microservices',
      statusBadge: 'Available for Work',
      description:
        'I build scalable, high-performance backend systems with Golang, event-driven architectures, and cloud-native infrastructure. 5+ years turning complex problems into clean, reliable code.',
      ctaPrimary: { label: 'View Resume', target: '#experience' },
      ctaSecondary: { label: 'Contact Me', target: '#contact' },
      contactSubtitle:
        'Available for freelance projects, full-time roles, or consulting. Jakarta-based, remote-friendly.',
      footerText: '© 2026 Arif Kurniawan. Built with ♥ in Jakarta.'
    },
    nav: [
      { id: 'services', label: 'Services', href: '#services', world: 'WORLD 1-1' },
      { id: 'skills', label: 'Skills', href: '#skills', world: 'WORLD 1-2' },
      { id: 'experience', label: 'Experience', href: '#experience', world: 'WORLD 1-3' },
      { id: 'blog', label: 'Blog', href: PROFILE.blogUrl, external: true },
      { id: 'contact', label: 'Contact', href: '#contact', world: 'WORLD 1-4' }
    ],
    worldSections: [
      { id: 'hero', worldLabel: 'WORLD 1-0 · TITLE', shortLabel: '1-0' },
      { id: 'services', worldLabel: 'WORLD 1-1 · SERVICES', shortLabel: '1-1' },
      { id: 'skills', worldLabel: 'WORLD 1-2 · SKILLS', shortLabel: '1-2' },
      { id: 'experience', worldLabel: 'WORLD 1-3 · LEVELS', shortLabel: '1-3' },
      { id: 'contact', worldLabel: 'WORLD 1-4 · CASTLE', shortLabel: '1-4' }
    ],
    stats: STATS,
    services: SERVICES_EN,
    skills: SKILLS,
    experienceLevels: EXPERIENCE_EN,
    contactLinks: CONTACT_LINKS,
    ui: {
      skipToContent: 'Skip to Content',
      backToTitle: 'Back to Title Screen',
      stageLabel: 'STAGE',
      scoreLabel: 'SCORE',
      coinsTitle: 'Collect Tech Stack coins to increase your score!',
      mode3D: '3D Mode',
      modeClassic: 'Classic 2D',
      switchTo3DTitle: 'Switch to 3D WebGL World',
      switchToClassicTitle: 'Switch to lightweight 2D Classic Mode',
      soundOnTitle: 'Sound ON (click to mute)',
      soundOffTitle: 'Sound OFF (click to enable)',
      muteSoundAria: 'Mute sound effects',
      enableSoundAria: 'Enable sound effects',
      toggleMenuAria: 'Toggle Game Menu',
      selectStage: 'SELECT STAGE',
      warpArrow: 'WARP →',
      starPowerShort: '★ STAR POWER!',
      hireMe: '★ Hire Me',
      languageLabel: 'Language',
      switchLanguageAria: 'Switch language between English and Indonesian',
      loadingBadge: 'WORLD 1-1 LOADING',
      loadingReady: 'READY',
      skipIntro: 'Skip Intro →',
      loadingAria: 'Loading Arif Kurniawan 3D World Portfolio',
      hero: {
        playerPrefix: 'PLAYER 1',
        pressStart: 'PRESS START',
        enterWorld: 'ENTER WORLD 1-1 →',
        scrollBadge: 'SCROLL',
        scrollDesc: 'to explore World',
        keysBadge: '← → / SPACE',
        keysDesc: 'to run & jump',
        tipHeader: 'TIP · WORLD 1-0',
        tips: [
          'Hit ? Blocks for Services, collect 10 Coins in Skills, or try the classic Konami Code!',
          'Use the floating Jump button (bottom-right) or Spacebar to make AK leap in 3D!',
          'Click any Goal Pole in Work Experience to wave the flag and grab +50 bonus points!'
        ],
        tipNextHint: 'Click for next tip →',
        statBadge: '+STAT',
        statClickHint: 'Tap for +25 bonus!'
      },
      services: {
        worldBadge: 'WORLD 1-1 · POWER-UP BLOCKS',
        heading: 'Services',
        subtitlePrefix: 'Hit the',
        subtitleSuffix: 'blocks to unleash each backend power-up!',
        unlockAll: 'Unlock All 3 Blocks',
        hitDone: 'HIT!',
        hitPrefix: 'HIT #',
        allUnlockedBadge: '★ ALL POWER-UPS UNLOCKED!'
      },
      skills: {
        worldBadge: 'WORLD 1-2 · COIN VAULT',
        heading: 'Skills & Tech Stack',
        subtitle: (collected, total) =>
          `Hover, filter, or tap each collectible coin to inspect & collect (${collected}/${total} collected)`,
        collectAll: 'Collect All Coins',
        allFilter: 'All',
        inspectorBadge: 'COIN INSPECTOR',
        statusLabel: 'Status:',
        collectedBonus: 'Collected (+100)',
        tapToCollect: 'Tap coin to collect',
        collectNowBtn: 'Collect Coin (+100)',
        collectedBadge: 'Collected',
        allCollectedBanner: '★ 1-UP! ALL 10 TECH COINS COLLECTED!'
      },
      experience: {
        worldBadge: 'WORLD 1-3 · CAREER CAMPAIGN',
        heading: 'Work Experience',
        subtitle: '4 Levels cleared from Level 1-1 to the Final Castle! Tap any Goal Pole to wave the flag.',
        pathBadge: 'LEVEL 1-1 → LEVEL 1-4 (FINAL)',
        activeStage: 'ACTIVE STAGE',
        stageClear: 'STAGE CLEAR',
        finalCastleFooter: 'FINAL CASTLE · CURRENT QUEST',
        nextLevelFooter: 'WARP PIPE TO NEXT LEVEL ↓',
        goalPole: 'GOAL POLE',
        flagWaved: 'FLAG RAISED! +50',
        waveFlagHint: 'Click to wave Goal Pole flag'
      },
      contact: {
        worldBadge: 'WORLD 1-4 · GOAL POLE & FINAL CASTLE',
        heading: "Let's Work Together",
        copyEmailAria: 'Copy email address',
        copied: 'Copied!',
        copy: 'Copy',
        fireworksBtn: 'Launch Castle Fireworks',
        footerKonamiHint: 'THANK YOU FOR PLAYING! TRY ↑↑↓↓←→←→BA FOR STAR POWER ★'
      },
      warp: {
        transitLabel: 'WARP PIPE TRANSIT'
      },
      konami: {
        title: '★ STAR POWER ACTIVATED! ★',
        subtitle: 'Super Speed + Invincible Mode (10s) · +1000 BONUS!'
      },
      controls: {
        jump: 'JUMP',
        jumpAria: 'Make 3D character jump',
        celebrate: 'BOOM!',
        celebrateAria: 'Launch celebratory Mario fireworks',
        backToTop: 'Top',
        worldProgress: 'WORLD MAP'
      },
      scene: {
        warpStart: 'WORLD 1-1 START',
        warpSkills: 'WARP → SKILLS',
        warpLevels: 'WARP → LEVELS',
        coinCollected: 'Collected!',
        coinClickToCollect: 'Click to collect (+100)'
      },
      popups: {
        allCoins: '1-UP! 10/10 COINS ★',
        flagBonus: 'FLAG CLEAR +50!',
        fireworks: '★ CASTLE FIREWORKS! ★',
        langSwitched: 'ENGLISH MODE',
        jumpBoing: 'BOING! ↑'
      }
    }
  },
  id: {
    lang: 'id',
    profile: {
      ...PROFILE,
      title: 'Backend Engineer',
      headline: 'Backend Golang & Microservices',
      statusBadge: 'Terbuka untuk Kerja Sama',
      description:
        'Saya membangun sistem backend berperforma tinggi dan skalabel dengan Golang, arsitektur event-driven, dan infrastruktur cloud-native. 5+ tahun mengubah masalah kompleks menjadi kode yang bersih dan andal.',
      ctaPrimary: { label: 'Lihat Pengalaman', target: '#experience' },
      ctaSecondary: { label: 'Hubungi Saya', target: '#contact' },
      contactSubtitle:
        'Terbuka untuk proyek freelance, posisi full-time, atau konsultasi teknis. Berdomisili di Jakarta, siap kerja remote.',
      footerText: '© 2026 Arif Kurniawan. Dibuat dengan ♥ di Jakarta.'
    },
    nav: [
      { id: 'services', label: 'Layanan', href: '#services', world: 'WORLD 1-1' },
      { id: 'skills', label: 'Keahlian', href: '#skills', world: 'WORLD 1-2' },
      { id: 'experience', label: 'Pengalaman', href: '#experience', world: 'WORLD 1-3' },
      { id: 'blog', label: 'Blog', href: PROFILE.blogUrl, external: true },
      { id: 'contact', label: 'Kontak', href: '#contact', world: 'WORLD 1-4' }
    ],
    worldSections: [
      { id: 'hero', worldLabel: 'WORLD 1-0 · BERANDA', shortLabel: '1-0' },
      { id: 'services', worldLabel: 'WORLD 1-1 · LAYANAN', shortLabel: '1-1' },
      { id: 'skills', worldLabel: 'WORLD 1-2 · KEAHLIAN', shortLabel: '1-2' },
      { id: 'experience', worldLabel: 'WORLD 1-3 · LEVEL', shortLabel: '1-3' },
      { id: 'contact', worldLabel: 'WORLD 1-4 · KASTIL', shortLabel: '1-4' }
    ],
    stats: [
      { id: 'years', value: 5, suffix: '+', label: 'Tahun Pengalaman' },
      { id: 'companies', value: 4, suffix: '', label: 'Perusahaan' },
      { id: 'migrations', value: 3, suffix: '', label: 'Migrasi Teknologi' },
      { id: 'projects', value: 20, suffix: '+', label: 'Proyek Terselesaikan' }
    ],
    services: SERVICES_ID,
    skills: SKILLS_ID,
    experienceLevels: EXPERIENCE_ID,
    contactLinks: CONTACT_LINKS,
    ui: {
      skipToContent: 'Langsung ke Konten',
      backToTitle: 'Kembali ke Layar Awal',
      stageLabel: 'DUNIA',
      scoreLabel: 'SKOR',
      coinsTitle: 'Kumpulkan koin Tech Stack untuk menambah skormu!',
      mode3D: 'Mode 3D',
      modeClassic: 'Klasik 2D',
      switchTo3DTitle: 'Beralih ke Dunia WebGL 3D',
      switchToClassicTitle: 'Beralih ke Mode Klasik 2D ringan',
      soundOnTitle: 'Suara AKTIF (klik untuk senyapkan)',
      soundOffTitle: 'Suara MATI (klik untuk aktifkan)',
      muteSoundAria: 'Matikan efek suara',
      enableSoundAria: 'Aktifkan efek suara',
      toggleMenuAria: 'Buka/Tutup Menu Game',
      selectStage: 'PILIH STAGE',
      warpArrow: 'WARP →',
      starPowerShort: '★ STAR POWER!',
      hireMe: '★ Rekrut Saya',
      languageLabel: 'Bahasa',
      switchLanguageAria: 'Ganti bahasa antara Bahasa Indonesia dan Inggris',
      loadingBadge: 'MEMUAT WORLD 1-1',
      loadingReady: 'SIAP',
      skipIntro: 'Lewati Intro →',
      loadingAria: 'Memuat Portofolio 3D World Arif Kurniawan',
      hero: {
        playerPrefix: 'PEMAIN 1',
        pressStart: 'MULAI GAME',
        enterWorld: 'MASUK WORLD 1-1 →',
        scrollBadge: 'SCROLL',
        scrollDesc: 'untuk jelajahi Dunia',
        keysBadge: '← → / SPASI',
        keysDesc: 'untuk lari & lompat',
        tipHeader: 'TIPS · WORLD 1-0',
        tips: [
          'Pukul Blok ? untuk Layanan, kumpulkan 10 Koin di Keahlian, atau coba Konami Code klasik!',
          'Klik tombol Lompat (pojok kanan bawah) atau tekan Spasi agar karakter AK melompat di 3D!',
          'Klik tiang bendera di bagian Pengalaman untuk mengibarkan bendera dan raih bonus +50!'
        ],
        tipNextHint: 'Klik untuk tips berikutnya →',
        statBadge: '+STAT',
        statClickHint: 'Klik untuk bonus +25!'
      },
      services: {
        worldBadge: 'WORLD 1-1 · BLOK POWER-UP',
        heading: 'Layanan',
        subtitlePrefix: 'Pukul blok',
        subtitleSuffix: 'untuk membuka setiap power-up backend!',
        unlockAll: 'Buka Semua 3 Blok',
        hitDone: 'TERBUKA!',
        hitPrefix: 'PUKUL #',
        allUnlockedBadge: '★ SEMUA POWER-UP TERBUKA!'
      },
      skills: {
        worldBadge: 'WORLD 1-2 · GUDANG KOIN',
        heading: 'Keahlian & Tech Stack',
        subtitle: (collected, total) =>
          `Arahkan kursor, filter kategori, atau klik koin untuk melihat detail & mengumpulkan (${collected}/${total} terkumpul)`,
        collectAll: 'Ambil Semua Koin',
        allFilter: 'Semua',
        inspectorBadge: 'INSPEKTOR KOIN',
        statusLabel: 'Status:',
        collectedBonus: 'Terkumpul (+100)',
        tapToCollect: 'Klik koin untuk ambil',
        collectNowBtn: 'Ambil Koin (+100)',
        collectedBadge: 'Terkumpul',
        allCollectedBanner: '★ 1-UP! SEMUA 10 KOIN TECH TERKUMPUL!'
      },
      experience: {
        worldBadge: 'WORLD 1-3 · KAMPANYE KARIER',
        heading: 'Pengalaman Kerja',
        subtitle: '4 Level ditaklukkan dari Level 1-1 hingga Kastil Terakhir! Klik Goal Pole untuk mengibarkan bendera.',
        pathBadge: 'LEVEL 1-1 → LEVEL 1-4 (FINAL)',
        activeStage: 'STAGE AKTIF',
        stageClear: 'STAGE SELESAI',
        finalCastleFooter: 'KASTIL TERAKHIR · MISI SAAT INI',
        nextLevelFooter: 'PIPA WARP KE LEVEL BERIKUTNYA ↓',
        goalPole: 'TIANG BENDERA',
        flagWaved: 'BENDERA BERKIBAR! +50',
        waveFlagHint: 'Klik untuk kibarkan bendera'
      },
      contact: {
        worldBadge: 'WORLD 1-4 · TIANG BENDERA & KASTIL FINAL',
        heading: 'Mari Bekerja Sama',
        copyEmailAria: 'Salin alamat email',
        copied: 'Tersalin!',
        copy: 'Salin',
        fireworksBtn: 'Nyalakan Kembang Api Kastil',
        footerKonamiHint: 'TERIMA KASIH SUDAH BERMAIN! COBA ↑↑↓↓←→←→BA UNTUK STAR POWER ★'
      },
      warp: {
        transitLabel: 'TRANSIT PIPA WARP'
      },
      konami: {
        title: '★ STAR POWER AKTIF! ★',
        subtitle: 'Kecepatan Super + Mode Kebal (10d) · BONUS +1000!'
      },
      controls: {
        jump: 'LOMPAT',
        jumpAria: 'Buat karakter 3D melompat',
        celebrate: 'RAYAKAN!',
        celebrateAria: 'Nyalakan kembang api Mario',
        backToTop: 'Atas',
        worldProgress: 'PETA DUNIA'
      },
      scene: {
        warpStart: 'MULAI WORLD 1-1',
        warpSkills: 'WARP → KEAHLIAN',
        warpLevels: 'WARP → LEVEL',
        coinCollected: 'Terkumpul!',
        coinClickToCollect: 'Klik untuk ambil (+100)'
      },
      popups: {
        allCoins: '1-UP! 10/10 KOIN ★',
        flagBonus: 'BENDERA +50!',
        fireworks: '★ KEMBANG API KASTIL! ★',
        langSwitched: 'MODE INDONESIA',
        jumpBoing: 'LOMPAT! ↑'
      }
    }
  }
};

export function getPortfolioContent(lang: Language): LocalizedPortfolioContent {
  return CONTENT_BY_LANG[lang];
}

export function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem('ak_portfolio_lang');
    if (saved === 'id' || saved === 'en') return saved;
  } catch {
    // Ignore storage access errors in private browsing modes
  }
  return 'en';
}

export { SERVICES, SKILLS };
