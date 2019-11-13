import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token: any;
        var user: any;
        user = sessionStorage.getItem('token');

        if (user != null)
        {
            console.log('token', user)

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user}`
                }
            });
        }
        return next.handle(request);
    }
}
