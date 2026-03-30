import { Toaster } from "sonner";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <DashboardSidebar>
      {children}
      <Toaster richColors position="bottom-right" />
    </DashboardSidebar>
  );
}