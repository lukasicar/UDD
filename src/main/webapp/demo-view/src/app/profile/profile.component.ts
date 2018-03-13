import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    profileForm:FormGroup;
    title:string;
    
    constructor(private profileService:ProfileService,private router:Router) { }

    ngOnInit() {
        var x=localStorage.getItem('app-token');
        if(x==null)
            this.router.navigate(['/login']);
        else{
            this.profileForm = new FormGroup({
                    username: new FormControl('',[Validators.required]),
                    firstName: new FormControl('',[Validators.required]),
                    lastName: new FormControl('',[Validators.required])
            });
            this.profileService.getUser(localStorage.getItem('user')).subscribe(x=>{
                this.profileForm = new FormGroup({
                    username: new FormControl(x.username,[Validators.required]),
                    firstName: new FormControl(x.firstName,[Validators.required]),
                    lastName: new FormControl(x.lastName,[Validators.required])
                });
            });
            this.title=localStorage.getItem('user');
        }
    }
    
    
    add(){
        var credentials=this.profileForm.value;
        if(this.profileForm.valid==false){
            alert("Popunite polja");
            return;
        }
        this.profileService.updateProfile(credentials)
            .subscribe(
                data => {
                    alert("Promjena izvrsena");
                    this.profileForm = new FormGroup({
                    username: new FormControl(data.username,[Validators.required]),
                    firstName: new FormControl(data.firstName,[Validators.required]),
                    lastName: new FormControl(data.lastName,[Validators.required])
                });
                },(err) => {
                    if (err === 'Internal server error') { alert("Vec postoji korisnik sa tim username-om");}
                }

            );
    }

}
