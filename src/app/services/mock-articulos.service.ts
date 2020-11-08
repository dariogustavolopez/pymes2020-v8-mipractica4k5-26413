import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Articulo, Articulos } from "../models/articulo";

@Injectable({
  providedIn: "root"
})
export class MockArticulosService {
  constructor() {}
  get(Nombre: string, Activo: boolean, pagina: number): any {
    var Lista = Articulos.filter(
      item =>
        // Nombre == null  chequea por null y undefined
        // Nombre === null  chequea solo por null
        (Nombre == null ||
          Nombre == "" ||
          item.Nombre.toUpperCase().includes(Nombre.toUpperCase())) &&
        (Activo == null || item.Activo == Activo)
    );
    //ordenar
    Lista = Lista.sort( (a,b) => a.Nombre.toUpperCase() > b.Nombre.toUpperCase() ? 1 : -1 );
    // paginar con slice
    var RegistrosTotal = Lista.length;
    var RegistroDesde = (pagina - 1) * 10;
    Lista = Lista.slice(RegistroDesde, RegistroDesde + 10);
    return of({ Lista: Lista, RegistrosTotal: RegistrosTotal });
  }
  // no usamos get con parametros porque javascript no soporta sobrecarga de metodos!
  getById(Id: number) {
    var items: Articulo = Articulos.filter(x => x.IdArticulo === Id)[0];
    return of(items);
  }

  post(obj: Articulo) {
    obj.IdArticulo = new Date().getTime();
    Articulos.push(obj);
    return of(obj);
  }

  put(Id: number, obj: Articulo) {
    var indice;
    var items = Articulos.filter(function(item, index) {
      if (item.IdArticulo === Id) {
        indice = index;
      }
    });
    Articulos[indice] = obj;
    return of(obj);
  }

  delete(Id: number) {
    var items = Articulos.filter(x => x.IdArticulo === Id);
    items[0].Activo = !items[0].Activo;
    return of(items[0]);
  }
}
