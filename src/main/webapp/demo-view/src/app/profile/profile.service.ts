import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers } from "@angular/http";
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {

    private apiUrl = `${environment.BACKEND_URL}`;

    constructor(private http: Http) {
    }

    getUser(username:any){
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
        return this.http.post(this.apiUrl + "/login/getUser",username,{headers:headers}).map(res=>res.json());
    }
    
    updateProfile(credentials:any){
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
        headers.append('username',localStorage.getItem('user'));
        return this.http.post(this.apiUrl + "/login/updateProfile",credentials,{headers:headers}).map(res=>res.json()).catch(e => {
            if (e.status === 500) {
                return Observable.throw('Internal server error');
            }
        });
    }

}
