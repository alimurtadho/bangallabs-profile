export type AdditionalBuild = {
  title: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
};

export const additionalBuilds: AdditionalBuild[] = [
  {
    title: "Freshstation Ops",
    category: "Agribusiness Backoffice",
    status: "Foundation in Development",
    description: "Backoffice foundation for B2B supply, farmer and partner portals, QC, lot-based inventory, demand matching, working-capital planning, and margin visibility.",
    technologies: ["Node.js", "Vite", "PostgreSQL 17", "pnpm", "Docker"]
  },
  {
    title: "Agribusiness Kasir PWA",
    category: "Operations & Finance",
    status: "Production",
    description: "Role-based sales, inventory, customer, cash-flow, purchase-order, receipt, and financial dashboard system installable as a mobile PWA.",
    technologies: ["Next.js 14", "Supabase", "PostgreSQL", "PWA", "JWT"]
  },
  {
    title: "Luna Makeup Artist Website",
    category: "Client Website",
    status: "Developed",
    description: "Mobile-first marketing website with service packages, portfolio galleries, social integration, SEO structure, and direct WhatsApp booking.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Wedding Invitation Studio",
    category: "Product Design",
    status: "PRD / In Development",
    description: "Product concept for customizable digital invitations with templates, real-time content editing, guest management, distribution, and RSVP tracking.",
    technologies: ["Product Architecture", "Responsive Web", "Template Editor", "RSVP Workflow"]
  }
];
