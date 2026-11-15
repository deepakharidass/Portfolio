import React from "react";
import { Code2, GitFork, Layers, ArrowRight } from "lucide-react";
import skillsData from "../../data/skills.json";
import { CARD_HOVER_CLASSES } from "../ui/cardHover";

interface DomainsSectionProps {
  onSelectDomain: (domainId: string) => void;
}

export const DomainsSection: React.FC<DomainsSectionProps> = ({ onSelectDomain }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case "frontend":
        return <Code2 size={28} strokeWidth={1.5} />;
      case "pm":
        return <GitFork size={28} strokeWidth={1.5} />;
      case "uiux":
        return <Layers size={28} strokeWidth={1.5} />;
      default:
        return <Code2 size={28} strokeWidth={1.5} />;
    }
  };

  const getButtonLabel = (id: string) => {
    switch (id) {
      case "frontend":
        return "EXPLORE REPOSITORIES";
      case "pm":
        return "REVIEW METHODOLOGY";
      case "uiux":
        return "INSPECT WIREFRAMES";
      default:
        return "VIEW DETAILS";
    }
  };

  return (
    <section id="domains" className="w-full bg-background pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Heading Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-foreground pb-4 mb-12">
          <div>
            <span className="font-mono text-xs uppercase bg-foreground text-background px-2.5 py-1 font-bold">
              ARCHITECTURE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl uppercase text-foreground mt-3">
              Operational Domains
            </h2>
          </div>
          <p className="font-mono text-xs uppercase text-muted-foreground tracking-widest mt-2 md:mt-0 font-semibold">
            TRI-PILLAR SYSTEM CAPABILITIES
          </p>
        </div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.domains.map((domain) => (
            <div
              key={domain.id}
              onClick={() => onSelectDomain(domain.id)}
              className={`${CARD_HOVER_CLASSES} group border-2 border-foreground bg-card hover:bg-foreground p-6 sm:p-8 flex flex-col justify-between cursor-pointer`}
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-foreground group-hover:border-background pb-3 mb-6">
                  <span className="font-mono text-sm font-bold text-foreground group-hover:text-background tracking-widest">
                    {domain.code}
                  </span>
                  <div className="text-foreground group-hover:text-background">
                    {getIcon(domain.id)}
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-foreground group-hover:text-background font-bold mb-3">
                  {domain.title}
                </h3>

                <p className="font-body text-sm text-muted-foreground group-hover:text-background/80 leading-relaxed mb-6">
                  {domain.description}
                </p>

                <div className="space-y-1.5 font-mono text-xs text-foreground group-hover:text-background uppercase">
                  {domain.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-foreground group-hover:bg-background shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t-2 border-foreground group-hover:border-background flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-bold text-foreground group-hover:text-background tracking-wider">
                  {getButtonLabel(domain.id)}
                </span>
                <span className="w-8 h-8 border border-foreground group-hover:border-background bg-card group-hover:bg-background text-foreground group-hover:text-foreground flex items-center justify-center">
                  <ArrowRight size={16} strokeWidth={1.5} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};