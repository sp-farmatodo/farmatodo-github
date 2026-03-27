import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

function StockBadge({ status }: { status: Product["stockStatus"] }) {
  const variants: Record<Product["stockStatus"], "default" | "secondary" | "destructive"> = {
    Disponible: "default",
    "Stock Bajo": "secondary",
    Agotado: "destructive",
  };
  return <Badge variant={variants[status]}>{status}</Badge>;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">{product.name}</CardTitle>
          <StockBadge status={product.stockStatus} />
        </div>
        <p className="text-xs text-muted-foreground">{product.brand}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Stock: {product.stock} unidades
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <span className="text-lg font-bold text-primary">
          ${product.price.toLocaleString("es-CO")}
        </span>
      </CardFooter>
    </Card>
  );
}
