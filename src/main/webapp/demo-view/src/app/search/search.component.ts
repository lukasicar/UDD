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
    
    constructor(private router: Router,private searchService:SearchService) {
    }

    
    ngOnInit() {
        var x=localStorage.getItem('app-token');
        if(x==null)
            this.router.navigate(['/login']);
        else{
            this.searchForm1 = new FormGroup({
                value: new FormControl('',[Validators.required])
            });
            this.title=localStorage.getItem('user');
        }
    }
    
    add(){
        let credentials = this.searchForm1.value;
        if(this.searchForm1.valid==false){
            alert("Popunite polja");
            return;
        }
        this.searchService.addUser(credentials)
            .subscribe(
                x => {
                    this.searchForm1 = new FormGroup({
                    value: new FormControl('',[Validators.required])
                    });
                    alert(x);
                },(err) => {
                    if (err === 'Internal server error') { alert("Vec postoji korisnik sa tim username-om");}
                });

     }
        
}
