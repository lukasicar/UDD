import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private app: AppService, private router: Router) {
      //this.app.authenticate({}, undefined);
    }
}
