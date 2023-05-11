import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/interfaces/orden';
import { ProductOrder } from 'src/app/interfaces/productOrder';
import { Product } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent {
  productoSeleccionado!: ProductOrder

  productosSeleccionados: ProductOrder[] = []
  precioTotal: number = 0
  reciboProducto(product: Product) {

    const findProductById = (id: number): ProductOrder | undefined => {
      return this.productosSeleccionados.find((productOrder: { product: { id: number; }; }) => productOrder.product.id === id);
    }

    const existingProduct = findProductById(product.id);
    if (existingProduct) {
      existingProduct.qty++;
      existingProduct.totalPrice += product.price;
    } else {

      this.productosSeleccionados.push({
        qty: 1,
        product: product,
        totalPrice: product.price
      });
    }

    const waiterUserId = localStorage.getItem('userId')
    this.newOrder.userId = waiterUserId!

    // console.log(waiterUserId)
    console.log(this.newOrder)
    console.log(this.productoSeleccionado)
    console.log(this.productosSeleccionados)

    this.newOrder.products = this.productosSeleccionados;
    this.totalPriceOrder()
  }
  reciboCliente(newOrderClient: string) {
    this.newOrder.client = newOrderClient
    // console.log(newOrderClient);
  }

  totalPriceOrder() {
    this.precioTotal = 0;
    for (let i = 0; i < this.productosSeleccionados.length; i++) {
      this.precioTotal += this.productosSeleccionados[i].totalPrice;

    }
    this.newOrder.total = this.precioTotal;
    console.log(this.precioTotal)
    // console.log(this.totalPriceOrder)
  }
  newOrder: Order = {
    id: 0,
    userId: '',
    client: '',
    products: [],
    total: 0,
    status: '',
    dataEntry: ''
  }


}
