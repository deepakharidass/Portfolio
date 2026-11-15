import React from "react";
import {
  ArrowLeft,
  ExternalLink,
  Terminal,
  CheckCircle2,
  FileText,
  ClipboardList,
} from "lucide-react";
import skillsData from "../../data/skills.json";
import projectsData from "../../data/projects.json";
import { SkillProgressBar } from "../ui/SkillProgressBar";
import { SectionRule } from "../ui/SectionRule";
import { Project } from "../../types";
import { CARD_ACTION_HOVER_CLASSES, CARD_HOVER_CLASSES } from "../ui/cardHover";

interface DomainViewProps {
  domainId: string;
  onBackToHome: () => void;
}

export const DomainView: React.FC<DomainViewProps> = ({ domainId, onBackToHome }) => {
  const domain = skillsData.domains.find((d) => d.id === domainId);

  const domainProjects = (projectsData.projects as Project[]).filter(
    (p) => p.category === domainId
  );

  if (!domain) return null;

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Back Link & Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 border-2 border-foreground bg-card text-foreground px-4 py-2 font-mono text-xs uppercase font-bold hover:bg-foreground hover:text-background transition-colors! duration-300! cursor-pointer focus-visible:outline focus-visible:outline-[3px] outline-offset-[2px]"
          >
            <ArrowLeft size={16} /> Return to Architectural Dossier
          </button>
        </div>

        {/* Oversized Domain Header */}
        <div className="border-b-4 border-foreground pb-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase bg-foreground text-background px-3 py-1 font-bold">
              {domain.code}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              SPECIALIZED CAPABILITY ARCHITECTURE
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl uppercase text-foreground leading-[0.95] tracking-tight">
            {domain.title}
          </h1>

          <p className="font-body text-xl sm:text-2xl text-foreground mt-6 max-w-3xl leading-relaxed">
            {domain.tagline}
          </p>

          <p className="font-body text-base text-muted-foreground mt-4 max-w-3xl leading-relaxed">
            {domain.description}
          </p>
        </div>

        {/* Section 1: Domain Skills Matrix */}
        <div className="mb-20">
          <div className="flex items-center justify-between border-b-2 border-foreground pb-4 mb-8">
            <h2 className="font-display text-3xl uppercase font-bold text-foreground">
              Core Technical Competencies ({domain.skills.length})
            </h2>
            <span className="font-mono text-xs uppercase text-muted-foreground font-semibold">
              INDEXED &amp; QUANTIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domain.skills.map((skill) => (
              <div
                key={skill.name}
                className={`${CARD_HOVER_CLASSES} border-2 border-foreground bg-card p-6 flex flex-col justify-between`}
              >
                <div>
                  <SkillProgressBar
                    name={skill.name}
                    percentage={skill.proficiency}
                    years={skill.years}
                    category={skill.category}
                  />
                  <p className="font-body text-xs text-muted-foreground mt-4 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SectionRule thick label={`${domain.title} Project Deliverables`} />

        {/* Section 2: Domain Project Showcases */}
        <div className="my-16">
          <div className="flex items-center justify-between border-b-2 border-foreground pb-4 mb-8">
            <h2 className="font-display text-3xl uppercase font-bold text-foreground">
              Production Works &amp; Case Studies
            </h2>
            <span className="font-mono text-xs uppercase text-muted-foreground font-semibold">
              VERIFIABLE ARTIFACTS
            </span>
          </div>

          <div className="space-y-12">
            {domainProjects.map((project) => (
              <div
                key={project.id}
                className={`${CARD_HOVER_CLASSES} border-2 border-foreground bg-card p-6 sm:p-10`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Image & Badges */}
                  <div className="lg:col-span-5">
                    <div className="aspect-[16/10] w-full border-2 border-foreground overflow-hidden bg-foreground">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 375'%3E%3Crect width='600' height='375' fill='%23111111'/%3E%3Crect x='20' y='20' width='560' height='335' fill='none' stroke='%23333333' stroke-width='2'/%3E%3Ctext x='300' y='180' font-family='serif' font-size='22' fill='%23ffffff' text-anchor='middle'%3EARCHITECTURAL ARTIFACT%3C/text%3E%3Ctext x='300' y='210' font-family='monospace' font-size='12' fill='%23888888' text-anchor='middle'%3EMONOCHROME BLUEPRINT%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between font-mono text-xs text-muted-foreground">
                      <span>{project.subBadge}</span>
                      <span className="font-bold text-foreground">{project.year}</span>
                    </div>
                  </div>

                  {/* Right Column: Case Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl text-foreground font-bold mb-3">
                        {project.title}
                      </h3>
                      <p className="font-body text-base text-foreground leading-relaxed mb-6">
                        {project.fullDescription}
                      </p>

                      {/* Domain-specific Highlights */}
                      {project.features && (
                        <div className="mb-6">
                          <h4 className="font-mono text-xs uppercase font-bold text-muted-foreground mb-2">
                            Key Architectural Features:
                          </h4>
                          <ul className="space-y-1.5 font-body text-sm text-foreground">
                            {project.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 size={16} className="text-foreground shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.responsibilities && (
                        <div className="mb-6">
                          <h4 className="font-mono text-xs uppercase font-bold text-muted-foreground mb-2">
                            Governance &amp; Responsibilities:
                          </h4>
                          <ul className="space-y-1.5 font-body text-sm text-foreground">
                            {project.responsibilities.map((r, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-foreground mt-2 shrink-0" />
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.designProcess && (
                        <div className="mb-6">
                          <h4 className="font-mono text-xs uppercase font-bold text-muted-foreground mb-2">
                            Design &amp; Discovery Process:
                          </h4>
                          <div className="space-y-2 font-mono text-xs">
                            {project.designProcess.map((step, i) => (
                              <div key={i} className={`${CARD_HOVER_CLASSES} border border-foreground p-2.5 bg-muted`}>
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.outcome && (
                        <div className={`${CARD_HOVER_CLASSES} mb-6 border-2 border-foreground p-4 bg-muted font-mono text-xs`}>
                          <span className="font-bold uppercase text-foreground block mb-1">
                            Deliverable Outcome:
                          </span>
                          <span className="text-foreground">{project.outcome}</span>
                        </div>
                      )}

                      {/* Technology tags */}
                      <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="border border-foreground px-2.5 py-1 bg-background text-foreground font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-foreground">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${CARD_ACTION_HOVER_CLASSES} hover:bg-background hover:text-foreground transition-colors! duration-400! border-2 border-foreground bg-foreground text-background px-6 py-2.5 font-mono text-xs uppercase font-bold hover:bg-background hover:text-foreground flex items-center gap-2 cursor-pointer`}
                        >
                          <ExternalLink size={15} /> Hosted Website
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${CARD_ACTION_HOVER_CLASSES} hover:bg-background hover:text-foreground transition-colors! duration-400! border-2 border-foreground bg-foreground text-background px-6 py-2.5 font-mono text-xs uppercase font-bold hover:bg-background hover:text-foreground flex items-center gap-2 cursor-pointer`}>
                          <Terminal size={15} /> Repository
                        </a>
                      )}
                      {project.documentUrl && (
                        <a
                          href={project.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${CARD_ACTION_HOVER_CLASSES} hover:bg-background hover:text-foreground transition-colors! duration-400! border-2 border-foreground bg-foreground text-background px-6 py-2.5 font-mono text-xs uppercase font-bold hover:bg-background hover:text-foreground flex items-center gap-2 cursor-pointer`}>
                          <FileText size={15} /> Document View
                        </a>
                      )}
                      {project.jiraUrl && (
                        <a
                          href={project.jiraUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${CARD_ACTION_HOVER_CLASSES} hover:bg-background hover:text-foreground transition-colors! duration-400! border-2 border-foreground bg-foreground text-background px-6 py-2.5 font-mono text-xs uppercase font-bold hover:bg-background hover:text-foreground flex items-center gap-2 cursor-pointer`}>
                          <ClipboardList size={15} /> Jira View
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-16 text-center">
          <button
            onClick={onBackToHome}
            className="border-2 border-foreground bg-foreground text-background px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-background hover:text-foreground transition-none transition-colors! duration-300! cursor-pointer"
          >
            ← Return to Full Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
