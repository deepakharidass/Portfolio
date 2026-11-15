import React from "react";
import educationData from "../../data/education.json";
import { CARD_HOVER_CLASSES } from "../ui/cardHover";

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="w-full bg-background relative pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Diagonal Hairline Hash Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none texture-diagonal-lines" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Section Heading Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-foreground pb-4 mb-12">
          <div>
            <span className="font-mono text-xs uppercase bg-foreground text-background px-2.5 py-1 font-bold">
              EDUCATION
            </span>
            <h2 className="font-display text-4xl sm:text-5xl uppercase text-foreground mt-3">
              Academic Journey
            </h2>
          </div>
          <p className="font-mono text-xs uppercase text-muted-foreground tracking-widest mt-2 md:mt-0 font-semibold">
            EDUCATION, QUALIFICATIONS &amp; ACADEMIC PROJECTS
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 space-y-12">
          {/* Vertical Timeline Line */}
          <div
            aria-hidden="true"
            className="absolute left-2 md:left-4 top-2 bottom-4 w-[2px] bg-foreground"
          />

          {educationData.academicMilestones.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Square Node on Timeline */}
              <div
                aria-hidden="true"
                className={`absolute -left-6 md:-left-10 top-1.5 w-4 h-4 border-2 border-foreground flex items-center justify-center ${
                  index % 2 === 0 ? "bg-foreground" : "bg-background"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 ${
                    index % 2 === 0 ? "bg-background" : "bg-foreground"
                  }`}
                />
              </div>

              {/* Milestone Card */}
              <div className={`${CARD_HOVER_CLASSES} border-2 border-foreground bg-card p-6 md:p-8`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-foreground pb-3">
                  <span className="font-mono text-xs font-bold uppercase bg-foreground text-background px-2.5 py-1">
                    {item.period}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-foreground font-bold">
                  {item.title}
                </h3>
                <p className="font-mono text-sm text-foreground mt-1 font-semibold">
                  {item.institution} • {item.score}
                </p>
                <p className="font-body text-base text-muted-foreground mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Modular Metadata Grid */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border-light">
                  {item.focusModules && (
                    <div>
                      <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider block">
                        Focus Modules
                      </span>
                      <span className="font-body text-sm text-foreground font-medium">
                        {item.focusModules}
                      </span>
                    </div>
                  )}
                  {item.capstone && (
                    <div>
                      <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider block">
                        Capstone Project
                      </span>
                      <span className="font-body text-sm text-foreground font-medium">
                        {item.capstone}
                      </span>
                    </div>
                  )}
                  {item.honors && (
                    <div>
                      <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider block">
                        Honors
                      </span>
                      <span className="font-body text-sm text-foreground font-medium">
                        {item.honors}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
