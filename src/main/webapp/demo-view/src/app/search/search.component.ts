import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HomeService } from './../home/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    title = 'Demo';
    searchForm1: FormGroup;
    results=[];
    searchForm2: FormGroup;
    private apiUrl = `${environment.BACKEND_URL}`; 
    
    constructor(private router: Router,private searchService:SearchService) {
    }

    
    ngOnInit() {
        var x=localStorage.getItem('app-token');
        //if(x==null)
        //    this.router.navigate(['/login']);
        //else{
            this.searchForm1 = new FormGroup({
                value: new FormControl('',[Validators.required]),
                field: new FormControl('',[Validators.required]),
                type: new FormControl('',[Validators.required])
            });
            this.searchForm2 = new FormGroup({
                value1: new FormControl('',[Validators.required]),
                field1: new FormControl('',[Validators.required]),
                value2: new FormControl('',[Validators.required]),
                field2: new FormControl('',[Validators.required]),
                operation: new FormControl('',[Validators.required])
            });    
            this.title=localStorage.getItem('user');
        //}
    }
    
    search1(){
        let credentials = this.searchForm1.value;
        if(this.searchForm1.valid==false){
            alert("Popunite polja");
            return;
        }
        this.searchService.search1(credentials)
            .subscribe(
                x => {
                    for(let y in x){
                        x[y].location=this.apiUrl+x[y].location.substring(x[y].location.lastIndexOf("\\"));
                    }
                    this.results=x;
                },(err) => {
                    if (err === 'Internal server error') { alert("Vec postoji korisnik sa tim username-om");}
                });

     }

    search2(){
        let credentials = this.searchForm2.value;
        if(this.searchForm2.valid==false){
            alert("Popunite polja");
            return;
        }
        this.searchService.search2(credentials)
            .subscribe(
                x => {
                    for(let y in x){
                        x[y].location=this.apiUrl+x[y].location.substring(x[y].location.lastIndexOf("\\"));
                    }
                    this.results=x;
                },(err) => {
                    if (err === 'Internal server error') { alert("Vec postoji korisnik sa tim username-om");}
                });

     }

    
}
