import { ProductoDescripcion } from './../../interfaces/producto-descripcion.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {


  //OTRA MANERA DE REALIZARLO SERIA PONIENDO OPCIOMNALES LOS ATYRIBUTOS DE LA INTERFAZ  con ?
  producto!: ProductoDescripcion;

  id!: string;

  constructor( private route: ActivatedRoute,
              public productoService: ProductosService ) { }

  ngOnInit(): void {


    this.route.params.subscribe(
      parametros => {
        // console.log(parametros['id']);
        this.productoService.getProducto(parametros['id']).subscribe(
          //Carajo de nuevo no me deja poner la interface en la respuesta pero si funciono y luego quize usar una propiedad y ya no
          (producto: any) => {
            this.id = parametros['id'];
            this.producto = producto;
            // console.log(producto);
          }
        )
      }
    )
  }

}
