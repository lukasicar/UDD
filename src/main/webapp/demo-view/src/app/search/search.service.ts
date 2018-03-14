import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';


@Injectable()
export class SearchService {

    private apiUrl = `${environment.BACKEND_URL}`;

    constructor(private http: Http) {
    }

    addUser(query:any){
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
        return this.http.post(this.apiUrl + "/search/queryParser",query,{headers:headers}).map(res=>res.json()).catch(e => {
            if (e.status === 500) {
                return Observable.throw('Internal server error');
            }
        });
    }
   

}
