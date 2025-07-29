import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Structure from "./pages/Structure";
import CouncilMembers from "./pages/CouncilMembers";
import ExpertCouncil from "./pages/ExpertCouncil";
import History from "./pages/History";
import News from "./pages/News";
import Reports from "./pages/Reports";
import RegulatoryFramework from "./pages/RegulatoryFramework";
import Publications from "./pages/Publications";
import UsefulLinks from "./pages/UsefulLinks";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="/council-members" element={<CouncilMembers />} />
            <Route path="/expert-council" element={<ExpertCouncil />} />
            <Route path="/history" element={<History />} />
            <Route path="/news" element={<News />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/regulatory-framework" element={<RegulatoryFramework />} />
            <Route path="/useful-links" element={<UsefulLinks />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
