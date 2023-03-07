import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //on est obligé d'inisialiser la variable
  products!: Array<any>;
  errorMessage!: string;

  constructor(private productService: ProductService) {}

  // ca execute au démarage
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  //supprimer un produit, evenement au click
  handleDeleteProduct(p: any) {
    //je cherche l'element à supprimer
    let index = this.products?.indexOf(p);
    this.products.splice(index, 1);
  }
}
