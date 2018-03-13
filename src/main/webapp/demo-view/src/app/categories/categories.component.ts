import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './../home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    categories=[];
    categoryForm: FormGroup;
    title:string;
    
    constructor(private categoriesService:CategoriesService,private homeService: HomeService,private router:Router) { }

    ngOnInit() {
      var x=localStorage.getItem('app-token');
        if(x==null)
            this.router.navigate(['/login']);
        else{
            this.categoryForm = new FormGroup({
            name: new FormControl('',[Validators.required]),
            });
            this.title=localStorage.getItem('user');
            this.homeService.getCategories().subscribe(x=>{
                this.categories=x;
            });
        }
    }
    
    modify(category:any){
        this.categoryForm = new FormGroup({
            name: new FormControl(category.name,[Validators.required]),
            id:new FormControl(category.id)
            });
    }
    
    add(){
        let credentials = this.categoryForm.value;
        if(this.categoryForm.valid==false){
            alert("Popunite polja");
            return;
        }
        this.categoriesService.addCategory(credentials).subscribe(
            x=>this.homeService.getCategories().subscribe(
                x=>{this.categories=x;
                    this.categoryForm = new FormGroup({
                        name: new FormControl('',[Validators.required])
                        });
                    }));
    }

}
