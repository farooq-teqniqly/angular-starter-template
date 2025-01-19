import { StaticDatasource } from "./static.datasource";
import { computed, Signal } from "@angular/core";
import { Product } from "./product.model";

export class ProductRepository {
  products: Signal<Product[]>;
  categories: Signal<string[]>;

  constructor(private dataSource: StaticDatasource) {
    this.products = dataSource.products;

    this.categories = computed(() => {
      return this.dataSource
        .products()
        .map((p) => p.category ?? "(None)")
        .filter((cat, index, array) => array.indexOf(cat) == index)
        .sort();
    });
  }

  getProduct(id: number): Product | undefined {
    return this.dataSource.products().find((p) => p.id === id);
  }
}
