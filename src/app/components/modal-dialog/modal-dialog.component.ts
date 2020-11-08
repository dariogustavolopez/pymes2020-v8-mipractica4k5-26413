import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
 
@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
 
  titulo = '';
  texto = '';
  textoBotonTrue = '';
  textoBotonFalse = '';
  bloquearPantalla = false;
  classHeader = 'bg-success';
  faIcon = 'far fa-check-circle';
  mensaje = '';
 
  ngOnInit(): void {
  }
  constructor(public activeModal: NgbActiveModal) {
    this.bloquearPantalla = false;
  }
  cerrar() {
      this.activeModal.close();
  }
  setTipo(tipo: string = 's') {
    tipo = tipo.toLowerCase();
   switch (tipo) {
      case 's':
          this.classHeader = 'bg-success';
          this.faIcon = 'far fa-check-circle';
          break;
        case 'd':
          this.classHeader = 'bg-danger';
          this.faIcon = 'fas fa-exclamation-triangle';
          break;
        case 'i':
          this.classHeader = 'bg-info';
          this.faIcon = 'fas fa-info-circle';
          break;
        case 'w':
          this.classHeader = 'bg-warning';
          this.faIcon = 'fas fa-exclamation-triangle';
          break;
          default:
        this.classHeader = 'bg-success';
        break;
    }
  }
}