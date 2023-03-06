import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //on est obligé d'inisialiser la variable
  products!: Array<any>;

  constructor() {}

  // ca execute au démarage
  ngOnInit(): void {
    this.products = [
      { id: 1, name: 'Computer', price: 6500 },
      { id: 2, name: 'Printer', price: 1200 },
      { id: 3, name: 'Smart phone', price: 1400 },
    ];
  }

  //supprimer un produit, evenement au click
  handleDeleteProduct(p: any) {
    //je cherche l'element à supprimer
    let index = this.products?.indexOf(p);

    this.products.splice(index, 1);
  }
}
