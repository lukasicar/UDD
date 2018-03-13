import { Component, OnInit } from '@angular/core';
import { PasswordService } from './password.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

    passwordForm:FormGroup;
    title:string;
    
    constructor(private passwordService:PasswordService,private router:Router) { }

    ngOnInit() {
        var x=localStorage.getItem('app-token');
        if(x==null)
            this.router.navigate(['/login']);
        else{
            this.passwordForm = new FormGroup({
                password: new FormControl('',[Validators.required]),
                username: new FormControl('',[Validators.required])
            });
            this.title=localStorage.getItem('user');
        }
    }
    
    
    add(){
        var credentials=this.passwordForm.value;
        if(this.passwordForm.valid==false){
            alert("Popunite polja");
            return;
        }else if(this.passwordForm.value.password != this.passwordForm.value.username){
            alert("Sifre se moraju poklapati");
            return;
        }
        credentials.username = localStorage.getItem('user');
        this.passwordService.changePassword(credentials).subscribe(x=>{
            alert("Sifra promijenjena");
            this.passwordForm = new FormGroup({
                password: new FormControl('',[Validators.required]),
                username: new FormControl('',[Validators.required])
            });
        });
    }

}
