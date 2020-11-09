import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../models/cliente";

import { MockClientesService } from "../../services/mock-clientes.service";
import { clientesService } from "../../services/clientes.service";
 
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
 Titulo= "Clientes";
 Items: Cliente[]=[];
 

 
  constructor(
    //private clienteService:  ClientesService
    private clientesService:  MockClientesService
  ){}
 
  ngOnInit() {
    this.GetClientesService();
  }
 
  GetFamiliasArticulos() {
    this.articulosFamiliasService.get()
    .subscribe((res:ArticuloFamilia[]) => {
      this.Items = res;
    });
  }


}