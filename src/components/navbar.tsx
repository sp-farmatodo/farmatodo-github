import { Separator } from "@/components/ui/separator";

export function Navbar() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary-foreground rounded-full">
            <span className="text-primary font-black text-lg">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">Farmatodo</h1>
            <p className="text-xs opacity-80">Catálogo de Productos</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
            Home
          </a>
          <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
            Items
          </a>
          <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
            Contact us
          </a>
        </nav>
      </div>
      <Separator className="opacity-20" />
    </header>
  );
}
