import { Product } from "./product";
import { catchError, finalize } from "rxjs/operators";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { ProductsService } from "./products.service";

export class ProductsDataSource implements DataSource<Product> {
    
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private productsService: ProductsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productsSubject.complete();
    this.loadingSubject.complete();
  }

  loadProducts(sort = "id", order = "ASC", page = 0) {

    this.loadingSubject.next(true);

    this.productsService
      .findProducts(sort, order, page)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(products => this.productsSubject.next(products));
  }
}
