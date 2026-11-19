import Image from "next/image";
import { BookOpen, BrainCircuit, Building2, CheckCircle2, Cloud, Code2, Database, Factory, Github, LineChart, Linkedin, Mail, MessageCircle, Workflow } from "lucide-react";
import { Header } from "@/components/Header";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { articles } from "@/lib/data/articles";
import { additionalBuilds } from "@/lib/data/builds";
import { industries } from "@/lib/data/industries";
import { projects, type Project } from "@/lib/data/projects";
import { services } from "@/lib/data/services";
import { site, whatsappMessage } from "@/lib/data/site";
import { technologyGroups } from "@/lib/data/technologies";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const stats = [
  ["6+", "Years Experience"],
  ["6+", "Industry Domains"],
  ["8", "Selected Projects"],
  ["E2E", "Solution Delivery"]
];

const serviceIcons = [BrainCircuit, Database, LineChart, Workflow, Building2];

const expertise = [
  ["AI & R&D", "AI solutions, LLM integration, AI automation, and technology research"],
  ["Business Solutions", "Business analysis, solution design, and digital transformation"],
  ["Data Architecture", "CDC, ETL/ELT, data warehouse, and real-time analytics"],
  ["Engineering Leadership", "Team leadership, technical strategy, and agile delivery"],
  ["Software Engineering", "Backend, frontend, API, and mobile architecture"],
  ["Cloud & Infrastructure", "AWS, Google Cloud, Docker, Kubernetes, and CI/CD"],
  ["Business Operations", "Workflow digitalization, operational improvement, and sales analytics"],
  ["Data Analytics", "BI, dashboards, business metrics, and data governance"]
];

const experienceHighlights = [
  {
    role: "Architecture Lead",
    industry: "Digital Synx",
    description: "Led solution and system architecture initiatives supporting digital products and technology delivery."
  },
  {
    role: "Data Lead",
    industry: "Banking Industry",
    description: "Led data initiatives in a regulated banking environment, connecting data architecture and analytics with business needs."
  },
  {
    role: "Technology & Data Professional",
    industry: "Game Industry — Current",
    description: "Currently applying technology, data, and cross-functional problem solving within the game industry."
  }
];

const careerPositions = [
  "Enterprise / Solution Architecture Lead",
  "Lead R&D Engineer – AI Solutions",
  "AI Solutions Architect",
  "Data & AI Solutions Lead",
  "Digital Transformation Lead"
];

const technologyIcons = [Code2, Database, Cloud, BrainCircuit];

const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

const digitalProducts = projects.filter((project) => project.kind === "product");
const selectedEngagements = projects.filter((project) => project.kind === "engagement");

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded border border-ink/10 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded bg-ink px-3 py-1 text-xs font-semibold text-white">{project.industry}</span>
        {project.status ? <span className="rounded bg-teal/[0.14] px-3 py-1 text-xs font-semibold text-ink">{project.status}</span> : null}
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-ink">{project.title}</h3>
      <p className="mt-3 leading-7 text-ink/[0.68]">{project.description}</p>
      <div className="mt-5 grid gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/[0.48]">Capabilities</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.capabilities.map((capability) => (
              <span key={capability} className="chip rounded px-2.5 py-1 text-xs font-medium">
                {capability}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/[0.48]">Technology</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies?.map((technology) => (
              <span key={technology} className="rounded bg-[#edf3f1] px-2.5 py-1 text-xs font-medium text-ink/[0.72]">
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-ink transition hover:text-teal">
          Visit project
        </a>
      ) : null}
    </article>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[92vh] overflow-hidden bg-ink text-white">
          <Image
            src="/images/hero-command-center.png"
            alt="Enterprise analytics and computer vision command center"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,19,22,0.94)_0%,rgba(8,19,22,0.72)_38%,rgba(8,19,22,0.16)_74%)]" />
          <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-5 pt-24 lg:px-8">
            <div className="max-w-3xl pb-16 pt-14">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-teal">AI & Data Solutions Lead | R&D Engineering | Digital Transformation</p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-normal sm:text-6xl lg:text-7xl">
                Driving Business Transformation Through Research, Data, AI & Scalable Technology
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.76]">
                Translating business requirements into practical solutions, scalable systems, AI integration, analytics platforms, and better operational workflows.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappUrl} data-analytics="hero_whatsapp_click" className="inline-flex items-center justify-center gap-2 rounded bg-teal px-6 py-3 font-semibold text-ink transition hover:bg-white" aria-label="Contact BangAl Labs on WhatsApp">
                  Let&apos;s Talk
                  <MessageCircle size={18} />
                </a>
                <a href="#projects" data-analytics="hero_portfolio_click" className="inline-flex items-center justify-center gap-2 rounded border border-white/[0.22] px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10">
                  View Portfolio
                </a>
              </div>
              <div className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="border-l border-teal/70 pl-4">
                    <p className="text-2xl font-semibold">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-white/[0.62]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-pad bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="relative overflow-hidden rounded bg-ink p-8 text-white shadow-soft">
              <div className="absolute inset-x-0 bottom-0 h-28 bg-teal/[0.18]" />
              <div className="relative">
                <div className="grid size-24 place-items-center rounded bg-teal text-3xl font-black text-ink">AM</div>
                <p className="mt-8 text-sm uppercase tracking-[0.2em] text-teal">Founder Profile</p>
                <h2 className="mt-3 text-3xl font-semibold">{site.founder}</h2>
                <p className="mt-2 text-white/[0.72]">{site.role}</p>
                <p className="mt-1 text-sm text-white/[0.54]">{site.secondaryRole}</p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {stats.map(([value, label]) => (
                    <div key={label} className="rounded border border-white/12 bg-white/[0.07] p-4">
                      <p className="text-2xl font-semibold text-teal">{value}</p>
                      <p className="mt-1 text-sm text-white/[0.68]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal">About BangAl Labs</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">Technical leadership grounded in business outcomes.</h2>
              <p className="mt-5 text-lg leading-8 text-ink/70">
                AI and data solutions professional with 6+ years of experience in technology, data engineering, system architecture, and digital transformation across healthcare, government, edutech, FMCG, banking, and the game industry.
              </p>
              <p className="mt-4 leading-8 text-ink/70">
                I translate business requirements into practical technology solutions, lead cross-functional engineering work, and develop end-to-end digital platforms. The perspective is strengthened by hands-on experience building digital products and managing an avocado agribusiness.
              </p>
              <div className="mt-8 grid gap-3 text-ink/[0.76] sm:grid-cols-2">
                {["Business-led solution architecture", "Cross-functional technical leadership", "End-to-end product development", "Hands-on business operations"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section-pad bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Leadership Experience"
              title="Architecture and data leadership across fast-moving industries"
              description="Experience spans digital architecture, banking data leadership, and current work in the game industry."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              {experienceHighlights.map((experience) => (
                <article key={`${experience.role}-${experience.industry}`} className="rounded border border-white/12 bg-white/[0.07] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">{experience.industry}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{experience.role}</h3>
                  <p className="mt-4 leading-7 text-white/70">{experience.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="expertise" className="section-pad bg-[#edf3f1]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Core Expertise"
              title="A connected view of business, data, AI, and engineering"
              description="Capabilities span strategy and delivery, making it easier to move from an operational problem to a working technology solution."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {expertise.map(([area, description]) => (
                <article key={area} className="rounded border border-ink/10 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-ink">{area}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/[0.64]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-pad bg-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Services"
              title="Consulting capabilities for AI, data, and operational scale"
              description="Each engagement starts from business outcomes, then maps the right architecture, data flow, and delivery plan."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {services.map((service, index) => {
                const Icon = serviceIcons[index] ?? BrainCircuit;
                return (
                  <article key={service.title} className="rounded border border-ink/10 bg-white p-5 shadow-sm">
                    <Icon className="text-teal" size={28} />
                    <h3 className="mt-5 text-xl font-semibold text-ink">{service.title}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-6 text-ink/[0.64]">{service.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.capabilities.map((capability) => (
                        <span key={capability} className="chip rounded px-2.5 py-1 text-xs font-medium">
                          {capability}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="section-pad bg-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Portfolio"
              title="Products and engagements built around real business problems"
              description="The portfolio separates owned digital products from selected professional engagements, making the scope and context of each project clear."
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">Digital Products</p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">Platforms developed and deployed end to end</h3>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {digitalProducts.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
            <div className="mt-16 border-t border-ink/10 pt-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">Selected Engagements</p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">Enterprise solutions across automotive, banking, and contractor operations</h3>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {selectedEngagements.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
            <div className="mt-16 border-t border-ink/10 pt-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">Additional Builds & Product Lab</p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">Production tools, foundations, and products in development</h3>
              <p className="mt-3 max-w-3xl leading-7 text-ink/65">
                Supporting work is labelled by maturity so deployed applications, technical foundations, and product concepts remain easy to distinguish.
              </p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {additionalBuilds.map((build) => (
                <article key={build.title} className="rounded border border-ink/10 bg-[#f6f8f7] p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-ink px-3 py-1 text-xs font-semibold text-white">{build.category}</span>
                    <span className="rounded bg-teal/[0.14] px-3 py-1 text-xs font-semibold text-ink">{build.status}</span>
                  </div>
                  <h4 className="mt-5 text-xl font-semibold text-ink">{build.title}</h4>
                  <p className="mt-3 leading-7 text-ink/65">{build.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {build.technologies.map((technology) => (
                      <span key={technology} className="chip rounded px-2.5 py-1 text-xs font-medium">{technology}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="section-pad bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Industry Experience"
              title="Comfortable across enterprise, medium business, and startup contexts"
              description="BangAl Labs translates domain complexity into practical systems, metrics, and workflow improvements."
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {industries.map((industry) => (
                <div key={industry} className="flex min-h-24 items-center gap-3 rounded border border-white/12 bg-white/[0.07] p-4">
                  <Factory className="shrink-0 text-teal" size={22} />
                  <span className="font-medium text-white/[0.86]">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="technology" className="section-pad bg-[#f6f8f7]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Technical Skills" title="Tools grouped by the problems they help solve" />
            <div className="grid gap-4 md:grid-cols-2">
              {technologyGroups.map((group, index) => {
                const Icon = technologyIcons[index] ?? Code2;
                return (
                  <article key={group.title} className="rounded border border-ink/10 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded bg-teal/15 text-ink"><Icon size={21} /></div>
                      <h3 className="text-lg font-semibold text-ink">{group.title}</h3>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((technology) => (
                        <span key={technology} className="chip rounded px-3 py-1.5 text-sm font-medium">{technology}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="positioning" className="section-pad bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal">Career Positioning</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">Leadership roles at the intersection of AI, data, and business.</h2>
              <p className="mt-5 max-w-xl leading-8 text-ink/70">
                Best suited to roles that combine solution architecture, engineering leadership, research, stakeholder collaboration, and measurable transformation.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {careerPositions.map((position) => (
                <div key={position} className="flex items-center gap-4 rounded border border-ink/10 bg-[#f6f8f7] p-5">
                  <CheckCircle2 className="shrink-0 text-teal" size={22} />
                  <span className="font-semibold leading-6 text-ink">{position}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="section-pad bg-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Blog"
              title="Notes on AI, data, and digital transformation"
              description="MVP uses curated article placeholders and can be wired to Medium RSS during the next integration step."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {articles.map((article) => (
                <a
                  key={article.title}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-ink/10 bg-[#f6f8f7] p-5 transition hover:border-teal hover:bg-white"
                >
                  <h3 className="min-h-20 text-lg font-semibold leading-6 text-ink">{article.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-ink/[0.64]">{article.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                    Read Article
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad bg-ink text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal">Contact</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">Ready to discuss AI, data, or digital transformation?</h2>
              <p className="mt-5 leading-8 text-white/70">
                Share the business problem, current workflow, and expected outcome. BangAl Labs can help shape the solution direction, architecture, and delivery plan.
              </p>
              <div className="mt-8 grid gap-3">
                <a href={whatsappUrl} data-analytics="contact_whatsapp_click" className="inline-flex items-center gap-3 rounded border border-white/[0.14] px-4 py-3 text-white/[0.86] transition hover:border-teal hover:text-white">
                  <MessageCircle className="text-teal" size={20} />
                  WhatsApp
                </a>
                <a href={`mailto:${site.email}`} data-analytics="contact_email_click" className="inline-flex items-center gap-3 rounded border border-white/[0.14] px-4 py-3 text-white/[0.86] transition hover:border-teal hover:text-white">
                  <Mail className="text-teal" size={20} />
                  {site.email}
                </a>
                <a href={site.linkedin} data-analytics="contact_linkedin_click" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded border border-white/[0.14] px-4 py-3 text-white/[0.86] transition hover:border-teal hover:text-white">
                  <Linkedin className="text-teal" size={20} />
                  LinkedIn
                </a>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded border border-white/[0.14] px-4 py-3 text-white/[0.86] transition hover:border-teal hover:text-white">
                  <Github className="text-teal" size={20} />
                  GitHub
                </a>
                <a href={site.medium} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded border border-white/[0.14] px-4 py-3 text-white/[0.86] transition hover:border-teal hover:text-white">
                  <BookOpen className="text-teal" size={20} />
                  Medium
                </a>
              </div>
            </div>
            <div className="rounded border border-white/12 bg-white/[0.07] p-5 sm:p-7">
              <ContactForm whatsapp={site.whatsapp} />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-ink/10 bg-white px-5 py-8 text-sm text-ink/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>&copy; {new Date().getFullYear()} {site.name}. AI, Data & Digital Transformation Consulting.</p>
          <p>Built for proposal, portfolio, and lead generation.</p>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
    </>
  );
}
