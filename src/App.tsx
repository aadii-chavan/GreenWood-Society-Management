import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Residents from "./pages/Residents.tsx";
import Bills from "./pages/Bills.tsx";
import Complaints from "./pages/Complaints.tsx";
import Visitors from "./pages/Visitors.tsx";
import Notices from "./pages/Notices.tsx";
import Settings from "./pages/Settings.tsx";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/settings" element={<Settings />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

