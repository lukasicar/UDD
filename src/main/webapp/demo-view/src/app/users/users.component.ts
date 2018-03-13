import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HomeService } from './../home/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    title = 'Demo';
    users=[];
    private apiUrl = `${environment.BACKEND_URL}`;
    selectedValue:any;
    usersForm: FormGroup; 
    categories=[];
    
    constructor(private router: Router, private homeService: HomeService,private usersService:UsersService) {
    }

    
    ngOnInit() {
        var x=localStorage.getItem('app-token');
        if(x==null)
            this.router.navigate(['/login']);
        else{
            this.usersForm = new FormGroup({
                username: new FormControl('',[Validators.required]),
                firstName: new FormControl('',[Validators.required]),
                password: new FormControl('',[Validators.required]),
                category: new FormControl(''),
                lastName: new FormControl('',[Validators.required]),
                type:new FormControl('',[Validators.required])
            });
            this.title=localStorage.getItem('user');
            this.usersService.getUsers().subscribe(x=>{
                this.users=x;
            });
            this.homeService.getCategories().subscribe(x=>this.categories=x);
        }
    }
    
    
    modify(user:any){
        this.usersForm = new FormGroup({
                username: new FormControl(user.username,[Validators.required]),
                firstName: new FormControl(user.firstName,[Validators.required]),
                password: new FormControl(user.password,[Validators.required]),
                category: new FormControl(user.category),
                lastName: new FormControl(user.lastName,[Validators.required]),
                type:new FormControl(user.type,[Validators.required]),
                id:new FormControl(user.id)
        });
    }

    add(){
        let credentials = this.usersForm.value;
        if(this.usersForm.valid==false){
            alert("Popunite polja");
            return;
        }
        if(typeof credentials.category.id == "undefined"){
            alert("Odaberite kategoriju");
            return;
        }
        this.usersService.addUser(credentials)
            .subscribe(
                user => {
                    this.usersForm = new FormGroup({
                        username: new FormControl('',[Validators.required]),
                        firstName: new FormControl('',[Validators.required]),
                        password: new FormControl('',[Validators.required]),
                        category: new FormControl(''),
                        lastName: new FormControl('',[Validators.required]),
                        type:new FormControl('',[Validators.required])
                    });
                    this.usersService.getUsers().subscribe(x=>{
                        this.users=x;
                    });
                },(err) => {
                    if (err === 'Internal server error') { alert("Vec postoji korisnik sa tim username-om");}
                });

            
    }

    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

}
