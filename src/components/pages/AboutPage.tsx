import React from "react";
import { HeroSection } from "../sections/HeroSection";
import { AboutSection } from "../sections/AboutSection";
import { SectionRule } from "../ui/SectionRule";

export const AboutPage: React.FC = () => (
  <div className="flex flex-col w-full">
    <HeroSection />
    <SectionRule thick />
    <AboutSection />
  </div>
);
