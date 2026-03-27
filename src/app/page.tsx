import { Navbar } from "@/components/navbar";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Dashboard />
      <footer className="mt-auto border-t py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Farmatodo · Curso de GitHub Colaborativo</p>
      </footer>
    </div>
  );
}
