import {Component} from "@angular/core";



@Component({
    selector: 'application',
    template: `        
        <div class="container" style="background:grey;color:white">
            <router-outlet></router-outlet>
        </div>

    `
})

export class AppComponent {

}