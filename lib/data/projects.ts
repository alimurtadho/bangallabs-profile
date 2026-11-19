export type Project = {
  title: string;
  slug: string;
  industry: string;
  description: string;
  status?: string;
  capabilities: string[];
  technologies?: string[];
  caseStudyUrl?: string;
};

export const projects: Project[] = [
  {
    title: "AI Helmet Detection",
    slug: "ai-helmet-detection",
    industry: "Automotive Safety / Computer Vision",
    status: "Client vendor AHM engagement",
    description: "Computer vision solution for helmet detection with real-time monitoring dashboard and safety insight workflows.",
    capabilities: ["Helmet detection", "Realtime monitoring", "Safety analytics", "Dashboard reporting"],
    technologies: ["YOLO", "Roboflow", "Python", "FastAPI", "Next.js"]
  },
  {
    title: "AHM Safety Riding Analytics Website",
    slug: "ahm-safety-riding-analytics",
    industry: "Automotive / Safety",
    status: "Featured portfolio",
    description: "Analytics website for safety riding program monitoring, performance insight, participant reporting, and executive review.",
    capabilities: ["Web analytics dashboard", "Safety riding KPI", "Participant reporting", "Executive insight"],
    technologies: ["Next.js", "React", "PostgreSQL", "Cloud Deployment"]
  },
  {
    title: "Banking Product Metrics Platform",
    slug: "banking-product-metrics-platform",
    industry: "Banking",
    status: "Current project",
    description: "Designed business metrics and executive dashboard for banking product performance.",
    capabilities: ["Product metrics", "Executive dashboard", "KPI analytics", "Business reporting"],
    technologies: ["BigQuery", "React", "Python", "Data Modeling"]
  },
  {
    title: "Contractor Business Process Improvement",
    slug: "contractor-business-process-improvement",
    industry: "Contractor",
    description: "Business process improvement and financial analytics solution for contractor PT operations.",
    capabilities: ["Business process mapping", "Cash flow analytics", "Project cost monitoring", "SOP improvement", "Management reporting"],
    technologies: ["PostgreSQL", "Dashboard", "Workflow Automation"]
  },
  {
    title: "Freshstation ID Project Digitalization",
    slug: "freshstation-id-project-digitalization",
    industry: "Agribusiness / Distribution",
    description: "Digitalization initiative for project, inventory, operational workflow, and sales analytics.",
    capabilities: ["Inventory monitoring", "POS", "Farmer management", "Sales analytics", "Workflow digitalization"],
    technologies: ["Web Platform", "Analytics", "API"]
  }
];
