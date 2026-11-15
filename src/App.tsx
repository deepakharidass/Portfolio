import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { BackToTop } from "./components/layout/BackToTop";
import { LoadingScreen } from "./components/layout/LoadingScreen";
import { DomainsSection } from "./components/sections/DomainsSection";
import { FeaturedProjectsSection } from "./components/sections/FeaturedProjectsSection";
import { ContactSection } from "./components/sections/ContactSection";
import { DomainView } from "./components/domain/DomainView";
import { ChatWidget } from "./components/chatbot/ChatWidget";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { AboutPage } from "./components/pages/AboutPage";
import { EducationPage } from "./components/pages/EducationPage";
import skillsData from "./data/skills.json";

const domainIds = new Set(skillsData.domains.map((domain) => domain.id));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function DomainRoute() {
  const { domainId } = useParams();
  const navigate = useNavigate();

  if (!domainId || !domainIds.has(domainId)) {
    return <NotFoundPage />;
  }

  return (
    <DomainView
      domainId={domainId}
      onBackToHome={() => navigate("/domains")}
    />
  );
}

function AppLayout() {
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-body selection:bg-foreground selection:text-background">
        <LoadingScreen />
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />

        <main id="main-content" className="flex-1 w-full bg-background">
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/resume" element={<Navigate to="/education" replace />} />
            <Route
              path="/domains"
              element={
                <DomainsSection
                  onSelectDomain={(domainId) => navigate(`/domains/${domainId}`)}
                />
              }
            />
            <Route path="/domains/:domainId" element={<DomainRoute />} />
            <Route path="/projects" element={<FeaturedProjectsSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <BackToTop />
        <ChatWidget />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      <AppLayout />
    </BrowserRouter>
  );
}
