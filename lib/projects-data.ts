export interface Project {
  slug: string
  title: string
  shortDescription: string
  image: string
  gallery?: string[]
  tags: string[]
  impact: string

  // Detail page content
  role: string
  platform: string
  category: string
  overview: string
  metrics?: {
    label: string
    value: string
  }[]
  architecture?: {
    title: string
    content: string
  }
  phases?: {
    title: string
    description: string
    details: string[]
    nodeCount?: string
  }[]
  technicalHighlights?: {
    title: string
    code?: string
    points?: string[]
  }[]
  keySkills?: string[]
  useCases?: string[]
  whyItMatters?: string[]

  // Phase 4 additions
  featured?: boolean                    // if true, gets larger card in grid + flagship badge
  order?: number                        // sort order in the grid (lower = earlier)
  year?: string                         // e.g. "2025", "2024"
  status?: "shipped" | "in-production" | "research" | "archived"
  problem?: string                      // short one-paragraph problem statement
  approach?: string                     // short one-paragraph approach summary
  stack?: string[]                      // small tool chips (max 6) shown on card + top of detail page
  workflowNodes?: Array<{               // mini n8n-canvas visualization on card + detail page
    id: string
    label: string
    kind: "trigger" | "logic" | "llm" | "scrape" | "db" | "crm" | "notify" | "output"
  }>
  workflowLinks?: Array<[string, string]>   // node connections (source id, target id)
  externalLinks?: Array<{
    label: string                       // "Live workflow" / "Case study" / "GitHub"
    url: string
  }>
}

export const projects: Project[] = [
  {
    slug: "ariane-ai-system",
    title: "Ariane Client Management & AI Meeting Assistant",
    shortDescription: "End-to-end AI automation for meeting transcription, proposal generation, and client tracking",
    image: "/projects/ariane-ai-system/hero.png",
    gallery: [
      "/projects/ariane-ai-system/hero.png",
      "/projects/ariane-ai-system/invoice-generate.png",
      "/projects/ariane-ai-system/email-reminder.png",
    ],
    tags: ["n8n", "AI Agents", "Zoom API", "OpenAI"],
    impact: "Automated client lifecycle & meeting intelligence",
    role: "Lead Automation Architect",
    platform: "n8n + Zoom API + OpenAI + SMTP",
    category: "AI Meeting Assistant • Proposal Automation • CRM Intelligence",
    overview:
      "This is a comprehensive AI-powered client management system for Ariane that automates the entire client lifecycle. The system captures Zoom meeting data, transcribes conversations, extract key requirements, generates professional proposals, manages approval workflows, and monitors payments with intelligent follow-ups.",

    metrics: [
      { label: "Stages", value: "4 Core Stages" },
      { label: "AI Analysis", value: "Sentiment & Intent" },
      { label: "Integrations", value: "Zoom, SMTP, Airtable, AI" },
    ],

    architecture: {
      title: "Four-Stage Lifecycle Automation",
      content: `Ariane AI Ecosystem
├── Stage 1: Meeting Intelligence & Data Capture
├── Stage 2: Proposal Generation & Internal Approval
├── Stage 3: Client Response Tracking & CRM Updates
└── Stage 4: Payment Monitoring & Intelligent Follow-ups`,
    },

    phases: [
      {
        title: "Stage 1: Meeting Intelligence",
        description: "Capturing and analyzing client meetings automatically",
        details: [
          "Zoom Trigger: Automated retrieval of meeting metadata and transcripts",
          "AI Processing: Extraction of key discussion points, requirements, and pain points",
          "Structured Output: Generation of HTML summaries and sentiment analysis",
          "Task Automation: ClickUp and Outlook integration for action items",
        ],
      },
      {
        title: "Stage 2: Proposal Engine",
        description: "Automated proposal generation and approval routing",
        details: [
          "Dynamic Drafting: AI-generated proposals based on extracted client needs",
          "Approval Workflow: Multi-stage routing for internal Ariane sign-off",
          "Client Delivery: PDF generation and secure tracking link delivery",
          "Version Control: Automated handling of change requests and revisions",
        ],
      },
      {
        title: "Stage 3: Response Tracking",
        description: "Intelligent monitoring of client engagement",
        details: [
          "Email Parsing: AI classification of client replies (Accepted, Negotiating, Questions)",
          "Engagement Scoring: Link tracking to monitor proposal view time and focus",
          "CRM Sync: Real-time probability updates based on sentiment and behavior",
        ],
      },
      {
        title: "Stage 4: Payment & Follow-up",
        description: "Closing the loop with automated financial tracking",
        details: [
          "Payment Monitoring: Stripe/Bank webhook integration for invoice tracking",
          "Nurture Loops: Automated reminder sequences based on engagement scoring",
          "Outcome Analysis: Logging loss reasons or kickoff scheduling on success",
        ],
      },
    ],

    technicalHighlights: [
      {
        title: "AI Analysis Prompting",
        points: [
          "Multimodal extraction of budget, timeline, and decision-makers",
          "Speaker identification mapping for conversational clarity",
          "Sentiment-driven automated response drafting",
        ],
      },
    ],

    keySkills: [
      "n8n logic design",
      "AI Prompt Engineering",
      "API Orchestration (Zoom, SMTP)",
      "CRM State Management",
      "Automated Document Systems",
    ],

    whyItMatters: [
      "Replaces manual client management with intelligent agents",
      "Ensures zero-drop in client follow-ups",
      "Provides data-driven sales insights for leadership",
      "Scales professional proposal delivery without overhead",
    ],
  },
  {
    slug: "sign-up-workflow",
    title: "Sign Up & Authentication Workflow",
    shortDescription: "Complete user authentication system with password management and email verification",
    image: "/projects/sign-up-workflow/hero.png",
    tags: ["n8n", "Authentication", "Email Integration"],
    impact: "Secure user onboarding",
    role: "Workflow Architect",
    platform: "n8n Automation Platform",
    category: "Authentication System • User Management • Email Integration",
    overview:
      "This is a user account creation and authentication workflow that handles the complete sign-up process with robust password management features. Built entirely in n8n, it demonstrates secure authentication patterns and user lifecycle management.",

    phases: [
      {
        title: "SIGNUP Section (Account Creation)",
        description: "Complete user registration flow with validation and verification",
        details: [
          "Field Validation: Checks if required fields (name, email, password) are provided",
          "Email Verification: Sends confirmation email to verify email address",
          "Password Creation: Enforces password requirements (length, complexity)",
          "Account Creation: Stores user credentials in database securely",
          "Welcome Email: Sends welcome message/confirmation after successful signup",
        ],
      },
      {
        title: "LOGIN Section (Authentication)",
        description: "Secure authentication with password recovery capabilities",
        details: [
          "Check Email Assistance: Email validation/format checking and account lookup verification",
          "Update Password: Password change functionality with old password verification and new password validation",
          "Confirm Password Change: Success confirmation, notification to user, and session update",
        ],
      },
    ],

    technicalHighlights: [
      {
        title: "Expected User Flow",
        points: [
          "New User: Goes through SIGNUP → Creates account → Receives confirmation → Can LOGIN",
          "Existing User: LOGIN with credentials → Access account features",
          "Password Recovery: Use 'Check email assistance' → Update password → Confirm change",
        ],
      },
      {
        title: "Technical Components",
        points: [
          "Database operations (user storage, credential management)",
          "Email service integration (send confirmations, notifications)",
          "Authentication system (JWT, sessions, password hashing)",
          "Input validation (email format, password strength)",
          "Error handling (duplicate accounts, invalid credentials)",
        ],
      },
      {
        title: "Security Features",
        points: [
          "Password hashing before storage",
          "Email verification to prevent fake accounts",
          "Secure password reset flow",
          "Session management",
        ],
      },
    ],

    keySkills: [
      "n8n workflow design",
      "Authentication systems",
      "Email integration",
      "Database management",
      "Security best practices",
      "User experience design",
    ],

    whyItMatters: [
      "Demonstrates secure authentication implementation",
      "Shows understanding of user lifecycle management",
      "Implements industry-standard security practices",
      "Provides seamless user onboarding experience",
    ],
  },
  {
    slug: "amanda-enterprise",
    title: "Amanda Enterprise",
    shortDescription: "End-to-End Client Lifecycle Automation in n8n with 190+ nodes",
    image: "/projects/amanda-enterprise/hero.jpg",
    tags: ["n8n", "AI Integration", "Enterprise Automation"],
    impact: "Full client lifecycle automation",
    role: "Automation Architect & n8n Workflow Engineer",
    platform: "n8n (Self-Hosted / Cloud Compatible)",
    category: "Enterprise Workflow Automation • Document Systems • Client Operations",
    overview:
      "Amanda Enterprise is a fully automated, enterprise-grade client lifecycle system built entirely in n8n. It orchestrates client intake, asset management, AI-powered document generation, approval workflows, publishing, and reporting — all within a single automation ecosystem. This project demonstrates how n8n can replace multiple SaaS tools by functioning as a lightweight CRM, document management system, client approval engine, and publishing pipeline.",

    featured: true,
    order: 1,
    year: "2025",
    status: "in-production",
    stack: ["n8n", "TypeScript", "GPT-4", "Claude API", "GoHighLevel", "Supabase"],
    problem:
      "Multiple client teams juggling ClickUp, Airtable, Supabase, and GoHighLevel — every task classification, routing decision, and status update was manual. Ops overhead compounded per client.",
    approach:
      "One 190-node n8n orchestration layer sitting between all four platforms. LLM-driven task classification, autonomous routing, real-time cross-system syncs. Custom TypeScript nodes for platform-specific logic. Multi-tenant from day one.",
    workflowNodes: [
      { id: "hook", label: "Webhook", kind: "trigger" },
      { id: "cls", label: "Classify", kind: "llm" },
      { id: "route", label: "Route", kind: "logic" },
      { id: "cu", label: "ClickUp", kind: "output" },
      { id: "at", label: "Airtable", kind: "db" },
      { id: "sb", label: "Supabase", kind: "db" },
      { id: "ghl", label: "GHL", kind: "crm" },
    ],
    workflowLinks: [
      ["hook", "cls"],
      ["cls", "route"],
      ["route", "cu"],
      ["route", "at"],
      ["route", "sb"],
      ["route", "ghl"],
    ],

    metrics: [
      { label: "Total Nodes", value: "~190–220" },
      { label: "Primary Flows", value: "5 core flows" },
      { label: "Repeated Modular Lanes", value: "3" },
      { label: "Design Pattern", value: "Orchestrator + Modular Sub-Workflows" },
      { label: "Complexity Level", value: "Enterprise / System-Level" },
    ],

    architecture: {
      title: "High-Level Architecture",
      content: `Master Orchestrator (n8n)
├── Client Intake & Asset Collection
├── AI Transcript & Data Processing
├── Document Generation Engine
├── Approval State Machine
├── Publishing & Archiving
└── Notification & Monitoring System`,
    },

    phases: [
      {
        title: "Phase 1: Client Intake & Asset Collection",
        description: "Automated ingestion and processing of client information and assets",
        details: [
          "Trigger: Client call completed, transcript automatically ingested",
          "AI Processing: Call summarization, entity extraction (company, industry, objectives), intent & sentiment classification",
          "Asset Collection: Client URLs (website, social profiles), image assets (logos, headshots, product images), PDF assets (brochures, reports, prior publications)",
          "Validation & Storage: File type and size validation, structured Google Drive folder creation, metadata indexing in Airtable",
        ],
        nodeCount: "~25–30",
      },
      {
        title: "Phase 2: AI-Driven Document Drafting",
        description: "Intelligent document creation using AI",
        details: [
          "Industry-based template selection",
          "Automated press release drafting",
          "Smart content placement using extracted assets",
          "Initial formatting and structure validation",
          "Outputs: Internal working draft, status logged in Airtable",
        ],
        nodeCount: "~8–10",
      },
      {
        title: "Phase 3: Multi-Format Document Generation",
        description: "Dynamic content injection and multi-format output",
        details: [
          "Dynamic Content Injection: Hyperlinked URLs, auto-resized and positioned images, extracted PDF quotes and data",
          "Generated Formats: Google Docs (editable), PDF (client-ready), HTML (email compatible), social media snippets",
        ],
        nodeCount: "Integrated across core and modular lanes",
      },
      {
        title: "Phase 4: Client Approval State Machine",
        description: "Critical system component implementing state-driven approval workflow",
        details: [
          "Approval States: PENDING → SENT → VIEWED → APPROVED → PUBLISHED / REJECTED → REVISION / CHANGES_REQUESTED → REVISION / NO_RESPONSE → ESCALATION",
          "Automated Behaviors: Approval timestamp logging, change request parsing, revision task creation",
          "Follow-up reminders (Day 3 / Day 7 / Day 14)",
          "Escalation to internal owner",
        ],
        nodeCount: "~30–35",
      },
      {
        title: "Phase 5: Final Assembly & Publishing",
        description: "Quality control and publication pipeline",
        details: [
          "Final content merge",
          "Quality control validation",
          "Version locking",
          "Archive to long-term storage",
          "Publishing queue handoff",
        ],
        nodeCount: "~25–30",
      },
      {
        title: "Phase 6: Modular Processing Lanes",
        description: "Three parallel sub-workflows demonstrating reusable n8n design",
        details: [
          "Press Release Pipeline: Template logic, asset injection, formatting, version control (~35–40 nodes)",
          "Proposal Generation Pipeline: Pricing logic, terms insertion, client-specific customization (~35–40 nodes)",
          "Contract & Engagement Pipeline: Legal document assembly, e-signature integration, compliance checks, secure archiving (~35–40 nodes)",
        ],
        nodeCount: "~105–120 combined",
      },
    ],

    technicalHighlights: [
      {
        title: "Asset Management Engine",
        code: `Assets = {
  urls: { validate: true, autoLink: true },
  images: {
    formats: ["jpg", "png", "svg"],
    maxSize: "5MB",
    processing: "resize + optimize"
  },
  pdfs: {
    extraction: "text + metadata",
    secureStorage: true
  }
}`,
      },
      {
        title: "Error Handling Strategy",
        points: [
          "Section-level try/catch logic",
          "Centralized Airtable error logging",
          "Automatic retries for transient API failures",
        ],
      },
      {
        title: "Performance Optimization",
        points: ["Rate-limited API calls", "Parallel execution where safe", "Async handling for non-blocking tasks"],
      },
      {
        title: "Monitoring & Reporting",
        points: [
          "Airtable dashboard: Client status, approval stage, time-to-publish metrics",
          "Execution success tracking",
          "Manual override controls",
        ],
      },
    ],

    keySkills: [
      "n8n workflow architecture",
      "Complex conditional logic",
      "AI integration (OpenAI, Azure)",
      "Document automation",
      "Approval systems",
      "Asset management",
      "System observability",
    ],

    useCases: [
      "Agencies",
      "PR firms",
      "Consulting teams",
      "Content & publishing operations",
      "Client onboarding systems",
    ],

    whyItMatters: [
      "Demonstrates advanced n8n architecture design",
      "Shows large-scale automation planning capabilities",
      "Implements state-driven logic at enterprise scale",
      "Proves n8n can operate as a true enterprise platform",
      "Replaces multiple SaaS tools with a single, maintainable automation system",
    ],
  },
  {
    slug: "ai-hrm-system",
    title: "AI-Powered HRM System",
    shortDescription: "End-to-End Recruitment & Candidate Intelligence Automation in n8n",
    image: "/projects/ai-hrm-system/hero.png",
    tags: ["n8n", "AI/LLM", "Recruitment Automation"],
    impact: "Automated recruitment lifecycle",
    role: "Automation Architect",
    platform: "n8n + Zoom API + OpenAI + SMTP",
    category: "AI HRM • Recruitment Automation • CV Intelligence System",
    overview:
      "This project is a complete AI-driven Human Resource Management (HRM) system built entirely in n8n and integrated with a frontend application. The system automates the entire recruitment lifecycle, providing HR teams with quantified, AI-generated match scores for each candidate.",
    metrics: [
      { label: "Total Nodes", value: "~140–165" },
      { label: "AI Analysis", value: "CV Parsing & Scoring" },
      { label: "Database", value: "Postgres Integration" },
    ],
    architecture: {
      title: "HRM System Flow",
      content: `Frontend Application
└── n8n Webhook Layer
    ├── Company & Dept Management
    ├── Job CRUD Operations
    ├── CV Ingestion Flow
    ├── AI Analysis Engine (CV Parsing)
    ├── Job-Candidate Matching Logic
    └── HR Dashboard Reporting`,
    },
    phases: [
      {
        title: "CV Intelligence & Parsing",
        description: "Transforming unstructured CVs into machine-readable intelligence",
        details: [
          "AI extraction of skills, experience, and education",
          "Semantic analysis of candidate profiles",
          "Automated structured data storage in Postgres",
          "File handling for PDF and DOC CV formats",
        ],
        nodeCount: "~25–30",
      },
      {
        title: "Job-Candidate Matching Engine",
        description: "Quantified candidate evaluation using AI",
        details: [
          "Semantic comparison between job requirements and CV insights",
          "Automated match percentage calculation",
          "Categorization into Strong, Partial, or Weak matches",
          "Elimination of subjective hiring bias through data-driven scoring",
        ],
        nodeCount: "~20–25",
      },
    ],
    technicalHighlights: [
      {
        title: "Recruitment Pipeline",
        points: [
          "Full recruitment status tracking (Applied → Hired)",
          "Automated department and job role management",
          "Real-time HR dashboard data aggregation",
          "Scalable multi-company support",
        ],
      },
    ],
    keySkills: [
      "n8n workflow architecture",
      "AI/LLM integration",
      "CV parsing & NLP",
      "Database design (Postgres)",
      "API orchestration",
    ],
    whyItMatters: [
      "Demonstrates advanced AI integration for real business use",
      "Shows large-scale workflow structuring (140+ nodes)",
      "Implements production-ready recruitment intelligence",
      "Orchestrates frontend and backend automation seamlessly",
    ],
  },
  {
    slug: "ai-crm-backend",
    title: "AI-Ready CRM System",
    shortDescription: "API-First CRM Backend Built in n8n with Frontend Integration",
    image: "/projects/ai-crm-backend/hero.png",
    tags: ["n8n", "CRM", "API-First"],
    impact: "Custom CRM backend automation",
    role: "Automation Engineer & Backend Architect",
    platform: "n8n",
    category: "CRM • Backend Automation • SaaS Infrastructure",
    overview:
      "A complete Customer Relationship Management (CRM) system built entirely in n8n using REST-style Webhook APIs. The system acts as a custom CRM backend, managing accounts, contacts, leads, and opportunities without a traditional server.",
    metrics: [
      { label: "Total Nodes", value: "~110–120" },
      { label: "Architecture", value: "API-Driven / Stateless" },
      { label: "CRUD Layers", value: "5 Entity Lanes" },
    ],
    architecture: {
      title: "CRM API Architecture",
      content: `Frontend App
└── n8n Webhook API Layer
    ├── Accounts Entity (CRUD)
    ├── Contacts Entity (CRUD)
    ├── Leads Entity (CRUD)
    ├── Opportunities Entity (CRUD)
    └── Activities Entity (CRUD)`,
    },
    phases: [
      {
        title: "Modular CRUD Architecture",
        description: "Organized vertical API lanes for CRM entities",
        details: [
          "REST-style Webhook endpoints for all operations",
          "Full CRUD database operations (Create, List, Update, Delete)",
          "Stateless execution with structured JSON responses",
          "Validation and business logic handled at the n8n layer",
        ],
        nodeCount: "~100 nodes for CRUD",
      },
      {
        title: "Data Modeling & Integration",
        description: "Relational data management for CRM entities",
        details: [
          "Relational links: Account → Contacts → Leads",
          "Opportunity and Activity tracking logic",
          "Frontend communication via standard API patterns",
          "Scalable SaaS-ready infrastructure design",
        ],
      },
    ],
    technicalHighlights: [
      {
        title: "API Design Principles",
        points: [
          "Frontend-controlled UX via API responses",
          "Modular, scalable workflow design",
          "Stateless webhook execution",
          "Token-based access and authentication ready",
        ],
      },
    ],
    keySkills: [
      "Backend engineering in n8n",
      "Clean API design",
      "CRM data modeling",
      "Database CRUD operations",
      "System scalability",
    ],
    whyItMatters: [
      "Proves n8n can serve as a full software backend",
      "Demonstrates advanced data modeling without a server",
      "Shows clean, modular software engineering in low-code",
      "Provides a scalable foundation for SaaS applications",
    ],
  },
  {
    slug: "ai-ceo-onboarding",
    title: "AI-Powered CEO Onboarding Agent",
    shortDescription: "Intelligent RAG-based agent conducting 90-question strategic interviews",
    image: "/projects/ai-ceo-onboarding/hero.png",
    tags: ["n8n", "AI Agent", "RAG", "PGVector"],
    impact: "Strategic executive integration",
    role: "AI Workflow Architect",
    platform: "n8n + PGVector + OpenAI/Claude",
    category: "AI Agent • RAG Implementation • Strategic Onboarding",
    overview:
      "An intelligent AI agent system built with n8n that conducts comprehensive CEO onboarding interviews. The agent asks 90 strategic questions fetched from a database and processes strategic planning documents using RAG (Retrieval-Augmented Generation) with PGVector for enhanced contextual responses.",
    metrics: [
      { label: "Strategic Questions", value: "90" },
      { label: "Vector Search", value: "PGVector Integration" },
      { label: "Document Processing", value: "PDF RAG Pipeline" },
    ],
    architecture: {
      title: "RAG System Architecture",
      content: `CEO Interface (Chat/File Upload)
└── n8n Orchestrator
    ├── Question Manager (SQL Bank)
    ├── Document Intelligence (PDF Extraction)
    ├── Vector Database (PGVector Embeddings)
    └── Multi-Channel Notifications (Slack/Teams)`,
    },
    phases: [
      {
        title: "Intelligent Questioning & RAG",
        description: "Semantic search-driven interview process",
        details: [
          "Adaptive Questioning: AI adjusts flow based on CEO responses",
          "PGVector Integration: Real-time retrieval of strategic document context",
          "Automated summaries and key insight extraction",
          "Multi-channel reporting to HR and Board members",
        ],
        nodeCount: "~45–55",
      },
    ],
    technicalHighlights: [
      {
        title: "n8n AI Agents",
        points: [
          "Multimodal extraction of budget, timeline, and decision-makers",
          "Speaker identification mapping for conversational clarity",
          "Sentiment-driven automated response drafting",
        ],
      },
    ],
    keySkills: [
      "n8n AI Agents",
      "RAG Architecture",
      "Board-Level Report Generation",
    ],
  },
  {
    slug: "viral-post-creation",
    title: "Viral Post Creation & Social Intelligence Engine",
    shortDescription: "AI-powered social media content generation that scrapes viral posts, analyzes patterns, and creates brand-aligned content calendar",
    image: "/projects/viral-post-creation/hero.png",
    gallery: [
      "/projects/viral-post-creation/hero.png",
      "/projects/viral-post-creation/content-calendar.png",
      "/projects/viral-post-creation/content-review.png",
      "/projects/viral-post-creation/scraped-posts.png",
    ],
    tags: ["n8n", "AI Analysis", "Multi-Platform Scraping", "Content Generation"],
    impact: "Monthly generation of 12 posts, 12 carousels, 8 scripts aligned with brand voice",
    role: "Social Media Automation Architect",
    platform: "n8n + OpenAI + Multi-Platform Scrapers",
    category: "Content Intelligence • Viral Pattern Analysis • Social Automation",
    overview:
      "A sophisticated AI-powered system that monitors social media trends across Facebook, TikTok, LinkedIn, and Instagram, analyzes viral patterns, and generates brand-aligned content. The platform scrapes 300+ viral posts monthly, extracts engagement patterns (hooks, captions, hashtags), and regenerates 30 contextually optimized posts. Clients review content in a visual carousel with accompanying scripts before approval, then automatically generate image and carousel poster templates for download.",

    metrics: [
      { label: "Monthly Output", value: "12 Posts + 12 Carousels + 8 Scripts" },
      { label: "Content Scraped", value: "300+ Viral Posts" },
      { label: "Platforms", value: "Facebook, TikTok, LinkedIn, Instagram" },
      { label: "Pattern Analysis", value: "Hook, Caption, Hashtag Extraction" },
    ],

    architecture: {
      title: "Multi-Stage Viral Content Pipeline",
      content: `Viral Post Creation Ecosystem
├── Stage 1: Multi-Platform Scraping & Collection (300+ viral posts)
├── Stage 2: AI Pattern Analysis (hooks, captions, hashtags, engagement signals)
├── Stage 3: Brand Voice Alignment & Content Regeneration (30 posts)
├── Stage 4: Client Review & Approval (Carousel + Script Preview)
└── Stage 5: Automatic Template Generation & Calendar Creation`,
    },

    phases: [
      {
        title: "Stage 1: Multi-Platform Viral Collection",
        description: "Automated scraping and aggregation from major social platforms",
        details: [
          "Facebook Scraper: High-engagement post extraction with like/share metrics",
          "TikTok Integration: Trending audio and caption harvesting",
          "LinkedIn Scraper: B2B professional content collection",
          "Instagram Scraper: Visual trend and carousel post analysis",
          "Webhook Processing: Real-time data normalization and deduplication",
        ],
        nodeCount: "~12–15",
      },
      {
        title: "Stage 2: Viral Pattern Intelligence",
        description: "AI-driven extraction of viral engagement mechanics",
        details: [
          "Hook Analysis: Opening line patterns that drive engagement",
          "Caption Intelligence: Word choice, emoji usage, CTA placement",
          "Hashtag Strategy: Trending and niche hashtag combination patterns",
          "Engagement Signals: Comment/share ratios, sentiment polarity",
          "Temporal Analysis: Optimal posting times by platform",
        ],
        nodeCount: "~18–22",
      },
      {
        title: "Stage 3: Brand Voice Alignment & Content Gen",
        description: "AI regenerates 30 new posts matching client brand identity",
        details: [
          "Brand Guidelines Injection: Client tone, values, and style parameters",
          "AI Post Generation: Multiple variants per concept with viral patterns",
          "Hashtag Customization: Platform-specific and brand-aligned hashtag selection",
          "Visual Direction: Recommended image styles and carousel layouts",
          "One-Month Calendar: Automated scheduling and theme organization",
        ],
        nodeCount: "~25–30",
      },
      {
        title: "Stage 4: Client Review & Approval",
        description: "Interactive carousel preview with script and script download",
        details: [
          "Visual Carousel UI: Swipe through 30 generated posts with thumbnails",
          "Script Preview: Full copy, hashtags, and calls-to-action",
          "Approval Workflow: Client comment, revision request, or final sign-off",
          "Revision Loop: AI-powered quick regeneration based on feedback",
          "Sign-Off Tracking: Audit trail and approval timestamp recording",
        ],
        nodeCount: "~20–25",
      },
      {
        title: "Stage 5: Template & Asset Generation",
        description: "Automatic poster and carousel template creation",
        details: [
          "Image Poster Generation: AI-designed static post graphics with brand colors",
          "Carousel Template: Multi-slide Instagram carousel layouts",
          "Reel/Video Scripts: Accompanying 15–30 second video script content",
          "Brand Asset Application: Logo placement, color scheme, font consistency",
          "Download Package: Zip file with all assets, calendar, and scripts",
        ],
        nodeCount: "~30–35",
      },
    ],

    technicalHighlights: [
      {
        title: "Multi-Platform Data Collection",
        points: [
          "Concurrent scraping from 4+ social platforms without rate limits",
          "Webhook-based real-time ingestion for latest viral trends",
          "Deduplication and normalization of heterogeneous data formats",
          "Engagement metric aggregation and ranking algorithm",
        ],
      },
      {
        title: "AI Pattern Intelligence Engine",
        points: [
          "NLP-based hook and CTA pattern extraction",
          "Sentiment and engagement signal correlation analysis",
          "Temporal trend analysis for optimal posting schedules",
          "Cross-platform pattern transfer and adaptation",
        ],
      },
      {
        title: "Brand Voice Alignment & Generation",
        points: [
          "Context-aware prompt engineering for consistent brand tone",
          "Multi-variant generation for A/B testing and choice",
          "Personalized hashtag strategy based on audience demographics",
          "Dynamic calendar generation with content themes and seasonal hooks",
        ],
      },
      {
        title: "Interactive Approval & Asset Generation",
        points: [
          "Real-time carousel carousel carousel UI for intuitive browsing",
          "AI-powered instant revision regeneration without workflow restart",
          "Automated image and carousel poster design with brand identity",
          "Bulk download with calendar, scripts, and design source files",
        ],
      },
    ],

    keySkills: [
      "n8n Multi-Platform Scrapers",
      "AI Pattern Analysis",
      "Brand Voice Synthesis",
      "Webhook Real-Time Processing",
      "Dynamic Calendar Generation",
      "Automated Asset Design",
    ],
    useCases: [
      "Marketing agencies automating client content calendars",
      "Brands maintaining consistent social presence at scale",
      "Influencers leveraging viral patterns for growth",
      "Social media managers reducing content creation time by 80%",
      "Agencies delivering monthly content packages as service",
    ],
    whyItMatters: [
      "Viral content creation at scale without manual research",
      "Brand consistency enforced through AI-powered voice alignment",
      "Reduced content creation time from weeks to days",
      "Data-driven insights into trending engagement patterns",
      "Measurable monthly output: 12 posts, 12 carousels, 8 scripts ready for immediate use",
    ],
  },
  {
    slug: "linkedin-gtm-lead-engine",
    title: "LinkedIn GTM Lead Engine",
    shortDescription:
      "End-to-end LinkedIn lead extraction, enrichment, and drip — job posts, user posts, and comment threads mined into a running Brevo sequence.",
    image: "/projects/linkedin-gtm-lead-engine/hero.png",
    tags: ["n8n", "Apify", "Brevo", "LinkedIn", "GTM"],
    impact: "Zero-touch lead pipeline running weekly",
    role: "Sole Architect & Engineer",
    platform: "n8n · Apify · Brevo",
    category: "GTM Automation · Lead Generation · Email Sequences",
    featured: true,
    order: 2,
    year: "2025",
    status: "in-production",
    stack: ["n8n", "Apify", "Brevo", "OpenAI", "Postgres"],
    problem:
      "Manual LinkedIn prospecting caps at ~30 quality leads per rep per week. Comment threads under viral posts are gold — but nobody has time to scrape and enrich them at scale.",
    approach:
      "Three parallel Apify actors (job posts, user posts, post comments) feed one enrichment pipeline. Each raw lead gets email-extracted, LLM-scored for fit, deduped against the CRM, then dropped into a 21-day Brevo drip. Replies and unsubscribes auto-suppress mid-sequence. Runs weekly, unattended.",
    overview:
      "The LinkedIn GTM Lead Engine is a fully autonomous prospecting system that mines three different LinkedIn surfaces for buyer signals — active job posts, user posts, and comment threads under high-engagement posts — then enriches, scores, and sequences the leads into a live drip campaign. The system runs every Monday morning and requires zero human input between scrape and email.",
    workflowNodes: [
      { id: "cron", label: "Weekly Cron", kind: "trigger" },
      { id: "jobs", label: "Apify Jobs", kind: "scrape" },
      { id: "posts", label: "Apify Posts", kind: "scrape" },
      { id: "cmts", label: "Comments", kind: "scrape" },
      { id: "merge", label: "Merge", kind: "logic" },
      { id: "email", label: "Email Extract", kind: "logic" },
      { id: "score", label: "LLM Score", kind: "llm" },
      { id: "dedup", label: "Dedup", kind: "logic" },
      { id: "brevo", label: "Brevo Drip", kind: "notify" },
    ],
    workflowLinks: [
      ["cron", "jobs"],
      ["cron", "posts"],
      ["cron", "cmts"],
      ["jobs", "merge"],
      ["posts", "merge"],
      ["cmts", "merge"],
      ["merge", "email"],
      ["email", "score"],
      ["score", "dedup"],
      ["dedup", "brevo"],
    ],
    phases: [
      {
        title: "Phase 1 — Multi-surface Apify scrape",
        description: "Three Apify actors run in parallel for maximum surface coverage.",
        details: [
          "LinkedIn Jobs actor filtered by target ICP keywords + geography",
          "User Posts actor scraping recent activity from a maintained watchlist of accounts",
          "Post Comments actor targeting high-engagement threads (posts above N reactions)",
          "All three actors write raw results into a shared n8n execution context",
        ],
      },
      {
        title: "Phase 2 — Enrichment & scoring",
        description: "Every raw record gets a full enrichment pass before it's allowed into a sequence.",
        details: [
          "Email extraction via multi-provider fallback (Apollo → Hunter → regex on public profile)",
          "GPT-4 fit-scoring against the client's ideal customer profile (JSON output, cached per contact)",
          "Deduplication against Supabase (prior sequenced contacts + suppression list)",
          "Enrichment failures land in a manual-review queue, not the sequence",
        ],
      },
      {
        title: "Phase 3 — Brevo 21-day drip",
        description: "Scored leads flow into a live sequence with automatic suppression.",
        details: [
          "21-day sequence: 5 touches, spaced with intentional gaps (not daily hammering)",
          "Reply detection via Brevo webhooks auto-pauses the sequence for that contact",
          "Unsubscribes propagate back to the suppression list in Supabase",
          "Weekly report auto-generated: leads in, leads scored, leads sequenced, replies received",
        ],
      },
    ],
    technicalHighlights: [
      {
        title: "Parallel Apify orchestration",
        points: [
          "Three actors invoked concurrently, results merged with source-attribution retained",
          "Actor failures don't block the other two — partial pipeline runs still ship value",
        ],
      },
      {
        title: "LLM scoring with structured output",
        points: [
          "GPT-4 called with strict JSON schema + validation retry loop",
          "Score, tier, and 1-line reasoning stored per contact for audit",
          "Cache layer prevents rescoring the same LinkedIn profile within 30 days",
        ],
      },
      {
        title: "Suppression as a first-class concept",
        points: [
          "Every outbound touch checks the suppression list before firing",
          "Reply, unsubscribe, and manual-flag all feed the same suppression store",
          "No lead ever gets two competing sequences from adjacent runs",
        ],
      },
    ],
    keySkills: [
      "n8n workflow architecture",
      "Apify actor design",
      "LLM structured output",
      "Brevo campaign orchestration",
      "Multi-source deduplication",
    ],
    useCases: [
      "B2B founders running LinkedIn-first GTM without an SDR team",
      "Agencies who need a repeatable prospecting layer per client",
      "Anyone tired of paying $500/mo for a lead tool that outputs unqualified spam",
    ],
    whyItMatters: [
      "Comment mining alone unlocks a lead surface most tools ignore entirely",
      "The full pipeline runs unattended — the operator's job becomes closing replies, not prospecting",
      "Every enrichment and suppression decision is logged, so campaigns are auditable and defensible",
    ],
  },
  {
    slug: "ml-ddos-detection-sdn",
    title: "ML-Based DDoS Detection for SDN",
    shortDescription:
      "Machine-learning classifier for detecting DDoS attacks in Software-Defined Networks — 99.20% accuracy across balanced test set.",
    image: "/projects/ml-ddos-detection-sdn/hero.png",
    tags: ["Machine Learning", "SDN", "Security", "Python", "Research"],
    impact: "99.20% classification accuracy",
    role: "Sole Researcher & Engineer",
    platform: "Python · scikit-learn · Mininet",
    category: "Machine Learning · Network Security · Research",
    featured: false,
    order: 8,
    year: "2024",
    status: "research",
    stack: ["Python", "scikit-learn", "Mininet", "Ryu Controller", "Pandas"],
    problem:
      "Traditional DDoS detection in SDN environments relies on threshold rules that miss subtle attacks and false-positive under normal traffic bursts. Signature-based tools don't generalize to novel attack patterns.",
    approach:
      "Feature-engineered flow-level dataset from Mininet-emulated SDN topology. Trained and compared multiple classifiers (Random Forest, Gradient Boosting, SVM) on labeled benign vs attack traffic. Random Forest won on the accuracy/interpretability trade-off with 99.20% test accuracy.",
    overview:
      "Final year research project targeting a real gap in SDN-native security: how to detect DDoS without relying on brittle threshold rules or signature databases. The system emulates a full SDN topology in Mininet, generates both benign and attack traffic patterns, engineers 12 flow-level features from the OpenFlow statistics, and trains a Random Forest classifier that hits 99.20% accuracy on a balanced held-out test set.",
    phases: [
      {
        title: "Phase 1 — Topology & dataset generation",
        description: "Built the emulated SDN environment and collected labeled traffic.",
        details: [
          "Mininet topology with Ryu controller, 8 hosts across 3 switches",
          "Benign traffic: synthetic mixed workload (HTTP, ICMP, DNS) at realistic rates",
          "Attack traffic: SYN flood, ICMP flood, UDP flood variants",
          "Flow statistics collected via OpenFlow at 5-second intervals",
        ],
      },
      {
        title: "Phase 2 — Feature engineering",
        description: "Extracted 12 flow-level features from raw OpenFlow stats.",
        details: [
          "Packet count, byte count, flow duration per flow",
          "Packet rate + byte rate deltas across time windows",
          "Protocol distribution ratios per switch",
          "Source-IP entropy per window (key discriminator for flood attacks)",
        ],
      },
      {
        title: "Phase 3 — Model comparison & selection",
        description: "Trained and benchmarked three classifiers on the balanced dataset.",
        details: [
          "Random Forest (100 trees): 99.20% test accuracy",
          "Gradient Boosting: 98.7% test accuracy",
          "SVM (RBF kernel): 96.4% test accuracy",
          "Random Forest picked for accuracy + feature-importance interpretability",
        ],
      },
    ],
    keySkills: [
      "Supervised ML",
      "Feature engineering",
      "SDN emulation (Mininet)",
      "OpenFlow/Ryu",
      "Model evaluation",
    ],
    whyItMatters: [
      "Signature-free detection generalizes to attack variants the training set never saw",
      "Feature-importance output tells network operators why a flow was flagged — not a black box",
      "Runs at flow-collection cadence, not per-packet — deployable inside a real SDN controller",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getSortedProjects(): Project[] {
  return [...projects].sort((a, b) => {
    const ao = a.order ?? 999
    const bo = b.order ?? 999
    if (ao !== bo) return ao - bo
    if ((a.featured ? 1 : 0) !== (b.featured ? 1 : 0)) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    return a.title.localeCompare(b.title)
  })
}
