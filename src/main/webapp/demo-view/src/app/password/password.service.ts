import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PasswordService {

    private apiUrl = `${environment.BACKEND_URL}`;

    constructor(private http: Http) {
    }

    getUser(username:string){
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
        return this.http.post(this.apiUrl + "/login/getUser",username,{headers:headers}).map(res=>res.json());
    }

    changePassword(credentials:any){
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
        return this.http.post(this.apiUrl + "/login/changePassword",credentials,{headers:headers}).map(res=>res.text());
    }

}
