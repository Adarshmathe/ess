import { HttpErrorResponse, HttpEvent, HttpHandler,HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LoginService } from "./login.service";
import { LoaderService } from "../components/loader/loader.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login:LoginService, private router: Router, private loader: LoaderService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        //add the jwt token(local storage) request
        let authreq=req;
        const token = this.login.getToken();
        // console.log("inside interceptor");
        
        if(token!=null){
            authreq= authreq.clone({setHeaders: {Authorization: `Bearer ${token}`},});
        }
      
        // return next.handle(authreq);

        return next.handle(authreq).pipe(
            catchError((error) => {
                // console.log("error===>>",error.status)
                this.loader.stop();
                if(error.status==0){
                    this.login.logout();
                    this.router.navigate(['/login']);
                }
               
                return throwError(() => error);
            })
          );

    }

    
   
}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
];
