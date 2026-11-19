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
  sameAs: [site.linkedin]
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: "AI, Data, and Digital Transformation Consulting"
};
