import type { Product } from "./ProductType";

export type SearchResult = {
    count: number;
    products: Product[];
}