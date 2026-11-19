export type Service = {
  title: string;
  description: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    title: "AI Solution",
    description: "Computer vision, OCR, LLM, chatbot, and predictive systems for measurable operations impact.",
    capabilities: ["Computer Vision", "OCR", "LLM", "AI Chatbot", "Predictive Analytics"]
  },
  {
    title: "Data Engineering",
    description: "Reliable data platforms that connect operational sources into analytics-ready pipelines.",
    capabilities: ["Data Warehouse", "Data Lake", "CDC", "Kafka", "Airflow", "ClickHouse"]
  },
  {
    title: "Business Intelligence",
    description: "Executive dashboards and metric layers that turn business activity into clear decisions.",
    capabilities: ["Dashboard", "KPI", "Executive Report", "Product Metrics", "Customer Analytics"]
  },
  {
    title: "Digital Transformation",
    description: "Business process mapping and workflow automation for organizations ready to scale.",
    capabilities: ["SOP Digitalization", "Business Process Mapping", "Organization Design", "Workflow Automation", "ERP Integration"]
  },
  {
    title: "Software Engineering",
    description: "Production-grade platforms, APIs, and internal tools built around business workflows.",
    capabilities: ["Web Platform", "Internal Tools", "API", "Cloud Deployment"]
  }
];
