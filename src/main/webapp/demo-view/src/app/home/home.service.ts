import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {

    private apiUrl = `${environment.BACKEND_URL}`;

    constructor(private http: Http) {
    }

    getCategories(){
        var headers = new Headers();
        if(localStorage.getItem('user')!=null)
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
        return this.http.get(this.apiUrl + "/books/getCategories",{headers: headers}).map(res=>res.json());
    }
    
    getBooksByCategory(category:any){
        var headers = new Headers();
        if(localStorage.getItem('user')!=null)
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
        return this.http.post(this.apiUrl + "/books/getBooksByCategory",category,{headers: headers}).map(res=>res.json());
    }
    
    getLanguages(){
        var headers = new Headers();
        if(localStorage.getItem('user')!=null)
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
        return this.http.get(this.apiUrl + "/books/getLanguages",{headers:headers}).map(res=>res.json());
    }

    addBook(book:any){
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
        return this.http.post(this.apiUrl + "/books/addBook",book,{headers:headers}).map(res=>res.json());
    }
    
    sendFile(file:any){
            let formData:FormData = new FormData();
            formData.append('file', file);
            let headers = new Headers();
            /** No need to include Content-Type in Angular 4 */
            //headers.append('Content-Type', 'multipart/form-data');
            //headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
            let options = new RequestOptions({ headers: headers });
            return this.http.post(this.apiUrl+"/books/addFile",formData,options)
                .map(res => res.json());
    }
}
