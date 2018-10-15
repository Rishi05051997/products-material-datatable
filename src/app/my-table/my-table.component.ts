import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { tap } from "rxjs/operators";
import { ProductsDataSource } from "../products-data-source";
import { Product } from "../product";
import { ProductsService } from "../products.service";

@Component({
  selector: "app-my-table",
  templateUrl: "./my-table.component.html",
  styleUrls: ["./my-table.component.css"]
})
export class MyTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ["id", "name", "price", "rating"];
  dataSource: ProductsDataSource;
  data: Product[] = [];

  productsCount = 100;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.dataSource = new ProductsDataSource(this.productsService);
    this.dataSource.loadProducts("id", "ASC", 0);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadProductsPage())).subscribe();
  }

  loadProductsPage() {
    this.dataSource.loadProducts("id", "ASC", this.paginator.pageIndex+1);
  }
}
