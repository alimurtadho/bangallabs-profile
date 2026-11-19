export type Article = {
  title: string;
  url: string;
  publishedAt?: string;
  excerpt?: string;
};

export const articles: Article[] = [
  {
    title: "Building AI Systems That Solve Business Problems",
    url: "https://medium.com/",
    excerpt: "A practical view on connecting model capability, data readiness, and business process change."
  },
  {
    title: "From Dashboard to Decision: Designing Better Product Metrics",
    url: "https://medium.com/",
    excerpt: "How executive reporting becomes more useful when metrics are tied to operating rhythm."
  },
  {
    title: "Computer Vision in Safety Monitoring",
    url: "https://medium.com/",
    excerpt: "Notes from deploying detection workflows for industrial and safety use cases."
  },
  {
    title: "Data Engineering Foundations for Growing Companies",
    url: "https://medium.com/",
    excerpt: "A simple architecture path from spreadsheets and apps into reliable data products."
  },
  {
    title: "Digital Transformation Starts With Process Clarity",
    url: "https://medium.com/",
    excerpt: "Why SOP, workflow ownership, and analytics should be designed together."
  }
];
