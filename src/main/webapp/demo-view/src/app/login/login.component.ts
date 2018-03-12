import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

    loginForm: FormGroup;
    authenticate: any;
    

    constructor(private appService: AppService, private router: Router) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('',[Validators.required]),
            password: new FormControl('',[Validators.required])
        });
        var x=localStorage.getItem('app-token');
        if(x!=null)
            this.router.navigate(['/home']);
    }

    login(){
        let credentials = this.loginForm.value;
        this.appService.authenticate(credentials)
            .subscribe(
                data => {
                    this.authenticate = data;
                    console.log(this.authenticate);
                    localStorage.setItem('app-token',this.authenticate.token);
                    localStorage.setItem('user',this.authenticate.user);
                    this.router.navigate(['/home']);
                },(err) => {
                    if (err === 'Unauthorized') { alert("Pogresno korisnicko ime ili lozinka");}
                }

            );
        
        //loginService.login(credentials)
    }

}
