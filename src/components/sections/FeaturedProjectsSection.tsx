import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  Eye,
  Terminal,
  X,
  ExternalLink,
  FileText,
  ClipboardList,
} from "lucide-react";
import projectsData from "../../data/projects.json";
import { Project } from "../../types";
import {
  CARD_ACTION_HOVER_CLASSES,
  CARD_BASE_CLASSES,
  CARD_HOVER_CLASSES,
} from "../ui/cardHover";

export const FeaturedProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: `All (0${projectsData.projects.length})` },
    { id: "frontend", label: "Frontend" },
    { id: "pm", label: "Project Management" },
    { id: "uiux", label: "UI / UX" },
  ];

  const filteredProjects = useMemo(() => {
    return (projectsData.projects as Project[]).filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="w-full bg-background pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Heading Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-foreground pb-4 mb-8">
          <div>
            <span className="font-mono text-xs uppercase bg-foreground text-background px-2.5 py-1 font-bold">
              PORTFOLIO
            </span>
            <h2 className="font-display text-4xl sm:text-5xl uppercase text-foreground mt-3">
              Selected Works &amp; Cases
            </h2>
          </div>
          <p className="font-mono text-xs uppercase text-muted-foreground tracking-widest mt-2 md:mt-0 font-semibold">
            SELECTED PROJECTS • DEVELOPMENT &amp; INNOVATION
          </p>
        </div>

        {/* Controls: Filter Tabs & Search Bar */}
        <div className=" flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 border-b-2 border-foreground pb-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{ transition: "background-color 1000ms ease-in-out, color 1000ms ease-in-out" }}
                  className={`border-2 border-foreground px-4 py-2 font-mono text-xs uppercase font-bold tracking-wider cursor-pointer focus-visible:outline focus-visible:outline-[3px] outline-offset-[2px] ${
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-card text-foreground hover:bg-foreground! hover:text-background!"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="FILTER BY STACK / KEYWORD..."
              className="w-full border-2 border-foreground bg-card px-4 py-2 font-mono text-xs uppercase placeholder:text-muted-foreground text-foreground focus:outline-none focus:border-foreground"
            />
            <Search
              size={16}
              className="absolute right-3 top-3 text-muted-foreground pointer-events-none"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className={`${CARD_HOVER_CLASSES} border-2 border-foreground bg-card p-12 text-center my-8`}>
            <h3 className="font-display text-2xl uppercase font-bold text-foreground mb-2">
              No Projects Match Specification
            </h3>
            <p className="font-mono text-xs text-muted-foreground uppercase">
              Adjust active filter criteria or clear search query to inspect other works.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className={`${CARD_ACTION_HOVER_CLASSES} mt-6 border-2 border-foreground bg-foreground text-background px-6 py-2.5 font-mono text-xs uppercase font-bold hover:bg-background hover:text-foreground cursor-pointer`}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className={`group ${selectedProject ? CARD_BASE_CLASSES : CARD_HOVER_CLASSES} border-2 border-foreground bg-card flex flex-col justify-between`}
              >
                <div>
                  {/* Image Container with Grayscale hover transition */}
                  <div className="aspect-[16/10] w-full border-b-2 border-foreground overflow-hidden bg-foreground relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="className= w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all! duration-350! ease-in-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 375'%3E%3Crect width='600' height='375' fill='%23111111'/%3E%3Crect x='20' y='20' width='560' height='335' fill='none' stroke='%23333333' stroke-width='2'/%3E%3Ctext x='300' y='180' font-family='serif' font-size='22' fill='%23ffffff' text-anchor='middle'%3EARCHITECTURAL ARTIFACT%3C/text%3E%3Ctext x='300' y='210' font-family='monospace' font-size='12' fill='%23888888' text-anchor='middle'%3EMONOCHROME BLUEPRINT%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <span className="absolute top-2 right-2 bg-foreground text-background px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                      {project.badge}
                    </span>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-muted-foreground font-mono text-xs uppercase mb-2">
                      <span>{project.subBadge}</span>
                      <span className="font-bold">{project.year}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="font-display text-xl sm:text-2xl text-foreground font-bold mb-2 group-hover:underline cursor-pointer leading-snug"
                    >
                      {project.title}
                    </h3>

                    <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="border border-foreground px-2 py-0.5 bg-background font-medium text-foreground uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="border border-foreground px-2 py-0.5 bg-muted font-bold text-foreground">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="border-t-2 border-foreground p-3 flex items-center justify-between bg-muted font-mono text-xs font-bold uppercase">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={`${CARD_ACTION_HOVER_CLASSES} hover:bg-background hover:text-foreground transition-colors! duration-400! text-foreground hover:underline flex items-center gap-1.5 cursor-pointer`}
                  >
                    <Eye size={15} /> Case Dossier
                  </button>

                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live preview for ${project.title}`}
                        className={`${CARD_ACTION_HOVER_CLASSES} hover:bg-background hover:text-foreground transition-colors! duration-400! text-foreground hover:underline flex items-center gap-1`}>
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code repository for ${project.title}`}
                        className={`${CARD_ACTION_HOVER_CLASSES} text-foreground hover:underline flex items-center gap-1`}
                      >
                        <Terminal size={14} /> Repo →
                      </a>
                    )}
                    {project.documentUrl && (
                      <a
                        href={project.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View project document for ${project.title}`}
                        className={`${CARD_ACTION_HOVER_CLASSES} text-foreground hover:underline flex items-center gap-1`}
                      >
                        <FileText size={14} /> Document
                      </a>
                    )}
                    {project.jiraUrl && (
                      <a
                        href={project.jiraUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View Jira project for ${project.title}`}
                        className={`${CARD_ACTION_HOVER_CLASSES} text-foreground hover:underline flex items-center gap-1`}
                      >
                        <ClipboardList size={14} /> Jira
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Project Case Study Dossier Modal */}
        {selectedProject && createPortal(
          <div
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedProject(null);
              }
            }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/80"
          >
            <div
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  setSelectedProject(null);
                }
              }}
              className="min-h-full flex items-center justify-center p-4 sm:p-6"
            >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Dossier for ${selectedProject.title}`}
              className={`${CARD_BASE_CLASSES} my-auto bg-background text-foreground border-4 border-foreground max-w-3xl w-full max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain p-6 sm:p-10`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b-2 border-foreground pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase text-muted-foreground">
                    <span>{selectedProject.subBadge}</span>
                    <span>•</span>
                    <span>{selectedProject.year}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl uppercase font-bold text-foreground mt-1">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project dossier"
                  className={`${CARD_ACTION_HOVER_CLASSES} w-10 h-10 border-2 border-foreground bg-background text-foreground flex items-center justify-center hover:bg-foreground hover:text-background cursor-pointer`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Image */}
              <div className="aspect-[16/9] w-full border-2 border-foreground overflow-hidden mb-6 bg-foreground">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 375'%3E%3Crect width='600' height='375' fill='%23111111'/%3E%3Crect x='20' y='20' width='560' height='335' fill='none' stroke='%23333333' stroke-width='2'/%3E%3Ctext x='300' y='180' font-family='serif' font-size='22' fill='%23ffffff' text-anchor='middle'%3EARCHITECTURAL ARTIFACT%3C/text%3E%3Ctext x='300' y='210' font-family='monospace' font-size='12' fill='%23888888' text-anchor='middle'%3EMONOCHROME BLUEPRINT%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              {/* Description & Metrics */}
              <div className="space-y-6 font-body text-base text-foreground leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold tracking-wider text-muted-foreground mb-1">
                    Architectural Summary
                  </h4>
                  <p>{selectedProject.fullDescription}</p>
                </div>

                {selectedProject.features && (
                  <div>
                    <h4 className="font-mono text-xs uppercase font-bold tracking-wider text-muted-foreground mb-2">
                      Key Technical Features
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                      {selectedProject.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.designProcess && (
                  <div>
                    <h4 className="font-mono text-xs uppercase font-bold tracking-wider text-muted-foreground mb-2">
                      Design &amp; Discovery Process
                    </h4>
                    <div className="space-y-2 font-mono text-xs">
                      {selectedProject.designProcess.map((step, i) => (
                        <div key={i} className="border border-foreground p-2.5 bg-muted">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.outcome && (
                  <div className="border-2 border-foreground p-4 bg-muted font-mono text-xs">
                    <span className="font-bold uppercase block mb-1">
                      Business &amp; Technical Outcome:
                    </span>
                    <p className="text-foreground">{selectedProject.outcome}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-mono text-xs uppercase font-bold tracking-wider text-muted-foreground mb-2">
                    Complete Technology Vector
                  </h4>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block border-2 border-foreground px-3 py-1 bg-card text-foreground font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Action Links */}
              <div className="mt-8 pt-6 border-t-2 border-foreground flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`${CARD_ACTION_HOVER_CLASSES} border-2 border-foreground px-6 py-2.5 font-mono text-xs uppercase font-bold hover:bg-muted`}
                >
                  Close Dossier
                </button>

                <div className="flex items-center gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${CARD_ACTION_HOVER_CLASSES} border-2 border-foreground bg-foreground text-background px-6 py-2.5 font-mono text-xs uppercase font-bold hover:bg-background hover:text-foreground flex items-center gap-2`}
                    >
                      <ExternalLink size={16} /> Live Preview
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${CARD_ACTION_HOVER_CLASSES} border-2 border-foreground bg-background text-foreground px-6 py-2.5 font-mono text-xs uppercase font-bold hover:bg-foreground hover:text-background flex items-center gap-2`}
                    >
                      <Terminal size={16} /> Repository
                    </a>
                  )}
                  {selectedProject.documentUrl && (
                    <a
                      href={selectedProject.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${CARD_ACTION_HOVER_CLASSES} border-2 border-foreground bg-background text-foreground px-6 py-2.5 font-mono text-xs uppercase font-bold hover:bg-foreground hover:text-background flex items-center gap-2`}
                    >
                      <FileText size={16} /> Document View
                    </a>
                  )}
                  {selectedProject.jiraUrl && (
                    <a
                      href={selectedProject.jiraUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${CARD_ACTION_HOVER_CLASSES} border-2 border-foreground bg-background text-foreground px-6 py-2.5 font-mono text-xs uppercase font-bold hover:bg-foreground hover:text-background flex items-center gap-2`}
                    >
                      <ClipboardList size={16} /> Jira View
                    </a>
                  )}
                </div>
              </div>
            </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
};
