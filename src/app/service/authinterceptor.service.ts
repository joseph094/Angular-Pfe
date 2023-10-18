import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

    constructor(private router: Router) {

    }
    headers = new Headers({
        'Content-Type': 'application/json',
        'Token': localStorage.getItem("token")
    });
    //Intercepter les tokens et les verifier 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("intercepted request ... ");

        // Cloner la demande pour ajouter le nouvel en-tête .
        if (localStorage.getItem("token")) {
            const authReq = req.clone({ headers: req.headers.set("token", localStorage.getItem("token")) });

            console.log("Sending request with new header now ...");

            //envoyer la demande nouvellement créée
            return next.handle(authReq)
                .pipe(catchError((err) => {
                    // onError
                    console.log(err);
                    if (err instanceof HttpErrorResponse) {
                        console.log(err.status);
                        console.log(err.statusText);
                        if (err.status === 401) {
                            this.router.navigate(['/signin']);
                        }
                    }
                    
                    return throwError(err);

                }))
        }else { return next.handle(req.clone());}
    }
}
