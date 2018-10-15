import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "./product";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

const productsUrl = "http://localhost:3000/products";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  // default get page 1 and sort ascending by id column
  findProducts(_sort = "id", _order = "ASC", _page = 0): Observable<Product[]> {
    return this.http
      .get(productsUrl, {
        params: new HttpParams()
          .set("_sort", _sort)
          .set("_order", _order)
          .set("_page", _page.toString())
      })
      // use the map() operator to return the data property of the response object
      // the operator enables us to map the response of the Observable stream
      // to the data value
      .pipe(map( res =>  res as Product[]));
  }
}
