import React from "react";
import { Download } from "lucide-react";
import profileData from "../../data/profile.json";
import skillsData from "../../data/skills.json";
import { SkillProgressBar } from "../ui/SkillProgressBar";
import { CARD_ACTION_HOVER_CLASSES, CARD_HOVER_CLASSES } from "../ui/cardHover";

export const ResumeContent: React.FC = () => {
  const stackItems = [
    "HTML5 / CSS3",
    "JavaScript",
    "React.js",
    "Java",
    "Python",
    "SQL",
    "Jira",
    "Agile / Scrum",
    "Figma",
  ];

  return (
    <section id="resume" className="w-full bg-background pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Heading Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-foreground pb-4 mb-12">
          <div>
            <span className="font-mono text-xs uppercase bg-foreground text-background px-2.5 py-1 font-bold">
              CURRICULUM
            </span>
            <h2 className="font-display text-4xl sm:text-5xl uppercase text-foreground mt-3">
              Resume &amp; Skill Index
            </h2>
          </div>
          <p className="font-mono text-xs uppercase text-muted-foreground tracking-widest mt-2 md:mt-0 font-semibold">
            FORMAL REPOSITORY • REVISION 2026.1
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Resume Summary Card (A4 Spec) */}
          <div className={`${CARD_HOVER_CLASSES} lg:col-span-7 border-2 border-foreground bg-card p-6 sm:p-8`}>
            <div className="flex items-center justify-between border-b-2 border-foreground pb-4 mb-6">
              <div>
                <span className="font-mono text-sm font-bold uppercase text-foreground block">
                  {profileData.name}
                </span>
                <p className="font-mono text-xs text-muted-foreground uppercase">
                  FULL-STACK CLIENT ARCHITECT &amp; TECH LEAD
                </p>
              </div>
              <div className="font-mono text-[11px] uppercase bg-muted border border-foreground px-2 py-1 font-bold text-foreground">
                A4 DOCUMENT SPEC
              </div>
            </div>

            {/* Document Outline Breakdown */}
            <div className="space-y-6 font-body text-sm text-foreground">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground border-b border-border-light pb-1 mb-2">
                  Executive Profile
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Computer Science and Engineering graduate with interests in frontend development, project management, and UI/UX design. Skilled in building responsive web applications, creating user-friendly interfaces, and organizing software project workflows using modern development technologies and Agile methodologies. Passionate about problem-solving, continuous learning, and transforming ideas into practical digital solutions.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground border-b border-border-light pb-1 mb-3">
                  Core Skills &amp; Tools
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs uppercase">
                  {stackItems.map((item) => (
                    <div
                      key={item}
                      className="border-2 border-foreground p-2 bg-background font-semibold text-foreground text-center hover:bg-foreground hover:text-background transition-colors! duration-250! ease-in-out cursor-default"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground border-b border-border-light pb-1 mb-2">
                  Key Industrial Achievements
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1.5 leading-relaxed font-body">
                  <li>Won three prizes in a Web Development Hackathon, demonstrating technical skills and creative problem-solving.</li>
                  <li>Presented academic research on Crop Yield Prediction and Stock Price Prediction using Machine Learning techniques.</li>
                  <li>Developed software projects including responsive web applications, a Weather Dashboard, and an AI Assistant Website.</li>
                  <li>Served as an Event Coordinator for the Tectrix Symposium, contributing to event planning and coordination.</li>
                  <li>Earned Oracle Certified Professional: Java SE 17 Developer certification.</li>
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t-2 border-foreground flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase text-muted-foreground font-semibold">
                PDF FORMAT • 1.2 MB • SIGNED SHA-256
              </span>
              <a
                href={profileData.resumeUrl}
                download="Deepak_Haridass_Resume.pdf"
                className={`${CARD_ACTION_HOVER_CLASSES} hover:bg-background hover:text-foreground transition-colors! duration-400! inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-background hover:text-foreground border-2 border-foreground cursor-pointer focus-visible:outline focus-visible:outline-[3px] outline-offset-[3px] outline-foreground`}>
                <Download size={16} />
                Download Resume →
              </a>
            </div>
          </div>

          {/* Metric Proficiency Display */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className={`${CARD_HOVER_CLASSES} border-2 border-foreground bg-card p-6 sm:p-8`}>
              <h3 className="font-display text-2xl uppercase text-foreground font-bold mb-6 pb-2 border-b-2 border-foreground">
                Proficiency Quantifiers
              </h3>
              <div className="space-y-6">
                {skillsData.topProficiencies.map((item) => (
                  <SkillProgressBar
                    key={item.label}
                    name={item.label}
                    percentage={item.percentage}
                  />
                ))}
              </div>
            </div>

            {/* Document Verifications */}
            <div className={`${CARD_HOVER_CLASSES} border-2 border-foreground bg-card p-6`}>
              <span className="font-mono text-xs uppercase text-muted-foreground font-bold tracking-wider block mb-3">
                Certificates:
              </span>
              <div className="font-mono text-xs text-foreground space-y-2">
                {skillsData.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
