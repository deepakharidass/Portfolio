import React from "react";
import { EducationSection } from "../sections/EducationSection";
import { ResumeContent } from "../sections/ResumeContent";
import { SectionRule } from "../ui/SectionRule";

export const EducationPage: React.FC = () => (
  <div className="flex flex-col w-full">
    <EducationSection />
    <SectionRule thick />
    <ResumeContent />
  </div>
);
