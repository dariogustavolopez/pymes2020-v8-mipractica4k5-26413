import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent} from '../components/modal-dialog/modal-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
  private contadorBloqueo = 0;
  private modalBloqueoRef: NgbModalRef;

  constructor(private ngbModal: NgbModal) { }

  /// tipo: Info, Danger, Warning, Success
  Alert(mensaje?: string, titulo: string = 'Atencion', tipo: string = 'i') {
    const modalRef = this.ngbModal.open(ModalDialogComponent);
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.mensaje = mensaje;
    modalRef.componentInstance.textoBotonTrue = '';
    modalRef.componentInstance.textoBotonFalse = '';
    modalRef.componentInstance.setTipo(tipo);
    return modalRef;
  }


  Confirm(mensaje: string, titulo: string = 'Confirmacion',
          textoBotonTrue: string = 'Aceptar',
          textoBotonFalse: string = 'Cancelar',
          funcionTrue: any,
          functionFalse: any,
          tipo: string = 'w') {
    const modalRef = this.ngbModal.open(ModalDialogComponent);
    modalRef.componentInstance.mensaje = mensaje;
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.textoBotonTrue = textoBotonTrue;
    modalRef.componentInstance.textoBotonFalse = textoBotonFalse;
    modalRef.componentInstance.setTipo(tipo);
    modalRef.result.then(x => x ? funcionTrue() : functionFalse() );
    return modalRef;
  }

  BloquearPantalla() {
    this.contadorBloqueo++;
    if (this.contadorBloqueo === 1) {
      this.modalBloqueoRef = this.ngbModal.open(ModalDialogComponent, { backdrop: 'static', keyboard: false });
      this.modalBloqueoRef.componentInstance.titulo = 'Atencion';
      this.modalBloqueoRef.componentInstance.mensaje = 'Procesando, espere por favor!';
      this.modalBloqueoRef.componentInstance.textoBotonTrue = '';
      this.modalBloqueoRef.componentInstance.textoBotonFalse = '';
      this.modalBloqueoRef.componentInstance.bloquearPantalla = true;
      this.modalBloqueoRef.componentInstance.setTipo('i');
    }
  }
  DesbloquearPantalla() {
    this.contadorBloqueo--;
    if (this.contadorBloqueo === 0) {
      this.modalBloqueoRef.close();
    }
  }
}
