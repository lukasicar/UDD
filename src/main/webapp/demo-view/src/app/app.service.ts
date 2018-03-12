import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';


@Injectable()
export class AppService {

    authenticated = false;
    private apiUrl = `${environment.BACKEND_URL}`;

    constructor(private http: Http) {
    }

    authenticate(credentials:any){
        return this.http.post(this.apiUrl + "/login", credentials).map(res=>res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }

}