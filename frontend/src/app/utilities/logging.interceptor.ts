import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ResponseInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log('Request URL' + request.url);
        return next.handle(request).pipe(
            tap({
                next:() => {},//sucessfull ---so do nothing
                error: (error: HttpErrorResponse) => {alert(`Error:${error.message}`)}
            })
        )
    }
}

