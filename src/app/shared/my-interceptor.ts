
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ModalDialogService } from '../services/modal-dialog.service';


@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private ms: ModalDialogService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  
    this.ms.BloquearPantalla();

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // 401 handled in auth.interceptor
        if (error.status !== 401 && error.error && error.error.ExceptionMessage) {
          this.ms.Alert( error.error.ExceptionMessage, 'Error', 'd');
        }
        return throwError(error);
      }),
      finalize( () => this.ms.DesbloquearPantalla()),
    );
  }
}
