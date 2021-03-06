import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    title = 'Demo';
    categories=[];
    private apiUrl = `${environment.BACKEND_URL}`;
    selectedValue:any;
    books=[];
    bookForm: FormGroup;
    languages=[];
    type:string;
    cat:string;    

    constructor(private app: AppService, private router: Router, private homeService: HomeService) {
    }

    
    ngOnInit() {
        var x=localStorage.getItem('app-token');
        //if(x==null)
            //this.router.navigate(['/login']);
        //else{
            this.bookForm = new FormGroup({
                title: new FormControl('',[Validators.required]),
                author: new FormControl('',[Validators.required]),
                publicationYear: new FormControl('',[Validators.required]),
                //category: new FormControl(''),
                language: new FormControl(''),
                keywords : new FormControl('',[Validators.required]),
                filename:new FormControl('')
            });
            this.title=localStorage.getItem('user');
            this.homeService.getCategories().subscribe(x=>{
                this.categories=x;
                this.selectedValue=x[0];
                this.homeService.getBooksByCategory(this.selectedValue).subscribe(x=>{
                    for(let y in x){
                        x[y].link=this.apiUrl+x[y].filename.substring(x[y].filename.lastIndexOf("\\"));
                    }
                    this.books=x;
                    });
            });
            this.homeService.getLanguages().subscribe(x=>this.languages=x);
            this.cat=localStorage.getItem('category');
            this.type=localStorage.getItem('type');
        //}
    }
    
    logout(){
        localStorage.removeItem('app-token');
        localStorage.removeItem('user');
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    change(){
        this.homeService.getBooksByCategory(this.selectedValue).subscribe(x=>this.books=x);
    }
    
    modify(book:any){
        this.bookForm = new FormGroup({
            title: new FormControl(book.title,[Validators.required]),
            author: new FormControl(book.author,[Validators.required]),
            publicationYear: new FormControl(book.publicationYear,[Validators.required]),
            //category: new FormControl(book.category),
            language: new FormControl(book.language),
            id:new FormControl(book.id),
            filename:new FormControl(book.filename),
            keywords : new FormControl(book.keywords)
            });
    }


    add(){
        let credentials = this.bookForm.value;
        if(this.bookForm.valid==false){
            alert("Popunite polja");
            return;
        }
        if(typeof credentials.language.id == "undefined"){
            alert("Odaberite jezilk");
            return;
        }
        if(credentials.filename==""){
            alert("Odaberite pdf fajl");
            return;
        }
        credentials.category=this.selectedValue;
        this.homeService.addBook(credentials).subscribe(
            x=>{
                if(x==false){
                    alert("Pdf vec postoji, duplikat");
                    return;
                }
                this.homeService.getBooksByCategory(this.selectedValue).subscribe(
                    x=>{this.books=x;
                        this.bookForm = new FormGroup({
                            title: new FormControl('',[Validators.required]),
                            author: new FormControl('',[Validators.required]),
                            publicationYear: new FormControl('',[Validators.required]),
                            //category: new FormControl(''),
                            language: new FormControl(''),
                            keywords : new FormControl('',[Validators.required]),
                            filename:new FormControl(credentials.filename)
                            });
                        })
            });
    }

    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    uploadFile(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            this.homeService.sendFile(file).subscribe(x=>{
                if(x['NOXML']!=null){
                    alert("Nema meta podataka");
                    this.bookForm = new FormGroup({
                        title: new FormControl('',[Validators.required]),
                        author: new FormControl('',[Validators.required]),
                        publicationYear: new FormControl('',[Validators.required]),
                        keywords : new FormControl(''),
                        //category: new FormControl(''),
                        language: new FormControl(''),
                        filename: new FormControl(x['filename'])
                        });
                    return;
                }
                this.bookForm = new FormGroup({
                        title: new FormControl(x['Title'],[Validators.required]),
                        author: new FormControl(x['Author'],[Validators.required]),
                        publicationYear: new FormControl('',[Validators.required]),
                        keywords : new FormControl(x['Keywords']),
                        //category: new FormControl(''),
                        language: new FormControl(''),
                        filename: new FormControl(x['filename'])
                });
            });
        }
    }
}
