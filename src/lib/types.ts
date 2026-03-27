export type Category =
  | "Medicamentos"
  | "Vitaminas"
  | "Higiene Personal"
  | "Cuidado de la Piel"
  | "Bebés";

export type StockStatus = "Disponible" | "Stock Bajo" | "Agotado";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  stock: number;
  stockStatus: StockStatus;
  description: string;
  brand: string;
}
