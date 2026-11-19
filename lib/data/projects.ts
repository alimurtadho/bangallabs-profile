export type Project = {
  title: string;
  slug: string;
  kind: "product" | "engagement";
  industry: string;
  description: string;
  status?: string;
  capabilities: string[];
  technologies?: string[];
  url?: string;
};

export const projects: Project[] = [
  {
    title: "BangAl Labs",
    slug: "bangallabs",
    kind: "product",
    industry: "Technology & AI Solutions",
    status: "Developed",
    description: "Technology consulting and digital solutions portfolio showcasing AI, data, software engineering, and solution architecture capabilities.",
    capabilities: ["Solution consulting", "AI & data portfolio", "Technical expertise", "Lead generation"],
    technologies: ["Next.js", "TypeScript", "Docker", "Caddy", "VPS"],
    url: "https://bangallabs.web.id"
  },
  {
    title: "Freshstation",
    slug: "freshstation",
    kind: "product",
    industry: "Digital Agribusiness Platform",
    status: "Developed",
    description: "Digital agribusiness ecosystem combining a premium avocado website with operational tools for sales, inventory, customers, cash flow, and partner purchase orders.",
    capabilities: ["Digital sales", "Inventory & POS", "Cash-flow reporting", "B2B purchase orders", "PWA operations"],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "PWA"],
    url: "https://freshstation.web.id"
  },
  {
    title: "Family Connect",
    slug: "family-connect",
    kind: "product",
    industry: "Digital Family Platform",
    status: "Foundation / Release 0",
    description: "Multi-tenant family-community platform foundation for member directories, family networks, collaboration, archives, and reunion management.",
    capabilities: ["Multi-tenant architecture", "Tenant isolation", "Family directory foundation", "VPS & database setup"],
    technologies: ["Next.js 16", "FastAPI", "PostgreSQL", "Row-Level Security", "Docker"],
    url: "https://family-connect.bangallabs.web.id/app"
  },
  {
    title: "Aneka Berkah Ukur Operations Platform",
    slug: "aneka-berkah-ukur-operations",
    kind: "product",
    industry: "Contractor Operations",
    status: "Built & Deployed",
    description: "Internal project-monitoring and operational-control platform replacing fragmented WhatsApp, phone, and manual reporting workflows.",
    capabilities: ["Project & task monitoring", "Progress tracking", "Invoice & payment tracking", "Executive dashboard"],
    technologies: ["Next.js 15", "React 19", "PostgreSQL", "Recharts", "Docker", "Caddy"],
    url: "https://admin.anekaberkahukur.com/"
  },
  {
    title: "AI Helmet Detection",
    slug: "ai-helmet-detection",
    kind: "engagement",
    industry: "Automotive Safety / Computer Vision",
    status: "Client vendor AHM engagement",
    description: "Video-based motorcycle helmet-compliance system using a trained nine-class detection model and API-based inference pipeline.",
    capabilities: ["Helmet compliance detection", "Rider & passenger classification", "Video inference", "Analytics API"],
    technologies: ["YOLO", "Roboflow", "Python", "FastAPI", "OpenCV", "PyTorch"]
  },
  {
    title: "AHM Safety Riding Analytics Website",
    slug: "ahm-safety-riding-analytics",
    kind: "engagement",
    industry: "Automotive / Safety",
    status: "Featured portfolio",
    description: "Interactive helmet-compliance analytics application for processing videos, reviewing detection results, monitoring monthly usage, and exporting reports.",
    capabilities: ["Interactive compliance charts", "Child compliance KPI", "Monthly dashboard", "JSON & Excel export"],
    technologies: ["Streamlit", "Python", "Pandas", "YOLO", "PostgreSQL", "Docker"],
    url: "https://safety-riding.bangallabs.web.id/"
  },
  {
    title: "Banking Product Metrics Platform",
    slug: "banking-product-metrics-platform",
    kind: "engagement",
    industry: "Banking",
    status: "Current project",
    description: "Business metrics and executive dashboard designed for banking product performance and decision support.",
    capabilities: ["Product metrics", "Executive dashboard", "KPI analytics", "Business reporting"],
    technologies: ["BigQuery", "React", "Python", "Data Modeling"]
  },
  {
    title: "Contractor Business Process Improvement",
    slug: "contractor-business-process-improvement",
    kind: "engagement",
    industry: "Contractor",
    status: "Business digitalization",
    description: "Business process improvement and financial analytics solution supporting contractor operations and management control.",
    capabilities: ["Business process mapping", "Cash-flow analytics", "Project cost monitoring", "SOP improvement", "Management reporting"],
    technologies: ["Next.js", "PostgreSQL", "Business Analytics", "Workflow Automation"],
    url: "https://admin.anekaberkahukur.com/"
  }
];
