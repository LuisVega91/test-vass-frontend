import { AlertService } from './../services/alert.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, filter } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private alertService: AlertService,
    private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse),
      tap((resp: HttpResponse<any>) => this.auditEvent(resp)),
      catchError((err)=> this.error(err))
    );
  }

  private error(err) {
    this.alertService.mostrar(undefined, undefined, 'Error', 'error durante la solicitud');
    return throwError('Error');
  }

  private auditEvent(resp: HttpResponse<any>) {
    const eventMessage = resp.body;
    if (!eventMessage?.success) {
      this.alertService.mostrar(() => { }, undefined, 'Error', eventMessage?.error || 'error durante la solicitud');
    }
  }


}
