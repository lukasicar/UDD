import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoriesService {

    private apiUrl = `${environment.BACKEND_URL}`;

    constructor(private http: Http) {
    }

    

    addCategory(category:any){
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
        return this.http.post(this.apiUrl + "/categories/addCategory",category,{headers:headers}).map(res=>res.text());
    }
    
   

}
