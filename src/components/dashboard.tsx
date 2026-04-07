"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products, categories } from "@/lib/data";
import { Category, Product } from "@/lib/types";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Package,
  TrendingUp,
  AlertTriangle,
  XCircle,
  DollarSign,
  Search,
  X,
} from "lucide-react";

type SortField = keyof Pick<
  Product,
  "name" | "brand" | "price" | "stock" | "category" | "stockStatus"
>;
type SortDir = "asc" | "desc";
type CategoryFilter = "Todas" | Category;
type StockFilter = "Todos" | Product["stockStatus"];

const STOCK_STATUSES: StockFilter[] = [
  "Todos",
  "Disponible",
  "Stock Bajo",
  "Agotado",
];

const STOCK_BADGE_VARIANT: Record<
  Product["stockStatus"],
  "default" | "secondary" | "destructive"
> = {
  Disponible: "default",
  "Stock Bajo": "secondary",
  Agotado: "destructive",
};

function SortButton({
  field,
  label,
  sortField,
  sortDir,
  onSort,
  className,
}: {
  field: SortField;
  label: string;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (f: SortField) => void;
  className?: string;
}) {
  const active = sortField === field;
  return (
    <button
      onClick={() => onSort(field)}
      className={`inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors ${className ?? ""}`}
    >
      {label}
      {active ? (
        sortDir === "asc" ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
      )}
    </button>
  );
}

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Todas");
  const [selectedStock, setSelectedStock] = useState<StockFilter>("Todos");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const stats = useMemo(() => {
    const total = products.length;
    const available = products.filter(
      (p) => p.stockStatus === "Disponible"
    ).length;
    const lowStock = products.filter(
      (p) => p.stockStatus === "Stock Bajo"
    ).length;
    const outOfStock = products.filter(
      (p) => p.stockStatus === "Agotado"
    ).length;
    const totalValue = products.reduce(
      (sum, p) => sum + p.price * p.stock,
      0
    );
    return { total, available, lowStock, outOfStock, totalValue };
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    let result = products.filter((p) => {
      const matchSearch =
        term === "" ||
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      const matchCategory =
        selectedCategory === "Todas" || p.category === selectedCategory;
      const matchStock =
        selectedStock === "Todos" || p.stockStatus === selectedStock;
      const matchMin = minPrice === "" || p.price >= Number(minPrice);
      const matchMax = maxPrice === "" || p.price <= Number(maxPrice);
      return matchSearch && matchCategory && matchStock && matchMin && matchMax;
    });

    result = [...result].sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv), "es");
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [search, selectedCategory, selectedStock, minPrice, maxPrice, sortField, sortDir]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  function clearFilters() {
    setSearch("");
    setSelectedCategory("Todas");
    setSelectedStock("Todos");
    setMinPrice("");
    setMaxPrice("");
  }

  const hasActiveFilters =
    search ||
    selectedCategory !== "Todas" ||
    selectedStock !== "Todos" ||
    minPrice ||
    maxPrice;

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Dashboard de Productos
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Gestión y búsqueda del catálogo de productos Farmatodo
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2 flex-row items-center gap-2 space-y-0">
            <Package className="h-4 w-4 text-muted-foreground shrink-0" />
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Productos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex-row items-center gap-2 space-y-0">
            <TrendingUp className="h-4 w-4 text-emerald-500 shrink-0" />
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">
              {stats.available}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex-row items-center gap-2 space-y-0">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Stock Bajo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">
              {stats.lowStock}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex-row items-center gap-2 space-y-0">
            <XCircle className="h-4 w-4 text-red-500 shrink-0" />
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Agotados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {stats.outOfStock}
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-2 sm:col-span-3 lg:col-span-1">
          <CardHeader className="pb-2 flex-row items-center gap-2 space-y-0">
            <DollarSign className="h-4 w-4 text-primary shrink-0" />
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Valor en Inventario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-primary">
              ${stats.totalValue.toLocaleString("es-CO")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              Filtros de Búsqueda
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 px-2 text-xs text-muted-foreground gap-1"
              >
                <X className="h-3 w-3" />
                Limpiar filtros
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Text search */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Buscar
            </p>
            <div className="relative max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Nombre, marca o descripción..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Categoría
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat as CategoryFilter)}
                  className="h-7 text-xs rounded-full"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Stock status filter */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Estado de Stock
            </p>
            <div className="flex flex-wrap gap-2">
              {STOCK_STATUSES.map((status) => (
                <Button
                  key={status}
                  variant={selectedStock === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStock(status)}
                  className="h-7 text-xs rounded-full"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Rango de Precio (COP)
            </p>
            <div className="flex items-center gap-3 max-w-sm">
              <Input
                type="number"
                placeholder="Mínimo"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-8 text-sm"
                min={0}
              />
              <span className="text-muted-foreground shrink-0">—</span>
              <Input
                type="number"
                placeholder="Máximo"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-8 text-sm"
                min={0}
              />
            </div>
            {minPrice || maxPrice ? (
              <p className="text-xs text-muted-foreground">
                {minPrice && maxPrice
                  ? `Entre $${Number(minPrice).toLocaleString("es-CO")} y $${Number(maxPrice).toLocaleString("es-CO")}`
                  : minPrice
                  ? `Desde $${Number(minPrice).toLocaleString("es-CO")}`
                  : `Hasta $${Number(maxPrice).toLocaleString("es-CO")}`}
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Results summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          producto{filtered.length !== 1 ? "s" : ""} encontrado
          {filtered.length !== 1 ? "s" : ""}
          {hasActiveFilters && (
            <span className="text-xs ml-1">(filtrado de {products.length} total)</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground hidden sm:block">
          Ordenado por{" "}
          <span className="font-medium text-foreground">{sortField}</span>{" "}
          {sortDir === "asc" ? "↑" : "↓"}
        </p>
      </div>

      {/* Product table */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border rounded-lg bg-muted/20">
          <Package className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-base font-medium">No se encontraron productos</p>
          <p className="text-sm mt-1">Ajusta los filtros para ver resultados.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="mt-4"
          >
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-[30%]">
                  <SortButton
                    field="name"
                    label="Producto"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                </TableHead>
                <TableHead>
                  <SortButton
                    field="brand"
                    label="Marca"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                </TableHead>
                <TableHead>
                  <SortButton
                    field="category"
                    label="Categoría"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                </TableHead>
                <TableHead className="text-right">
                  <SortButton
                    field="price"
                    label="Precio"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                    className="ml-auto"
                  />
                </TableHead>
                <TableHead className="text-right">
                  <SortButton
                    field="stock"
                    label="Stock"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                    className="ml-auto"
                  />
                </TableHead>
                <TableHead>
                  <SortButton
                    field="stockStatus"
                    label="Estado"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id} className="group">
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm leading-snug">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {product.brand}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs font-normal">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-sm tabular-nums">
                    ${product.price.toLocaleString("es-CO")}
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                    {product.stock}
                  </TableCell>
                  <TableCell>
                    <Badge variant={STOCK_BADGE_VARIANT[product.stockStatus]}>
                      {product.stockStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </main>
  );
}
