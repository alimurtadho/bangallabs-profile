import { site } from "@/lib/data/site";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  founder: {
    "@type": "Person",
    name: site.founder,
    jobTitle: site.role
  },
  sameAs: [site.linkedin, site.github, site.medium]
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: "AI and Data Solutions, R&D Engineering, and Digital Transformation"
};
