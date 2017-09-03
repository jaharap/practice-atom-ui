import { NgModule  }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {routing} from "./app.routing";
import {Location} from "@angular/common";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login.component";
import {FormsModule} from "@angular/forms";
import {Http, HttpModule} from "@angular/http";
import {ApiService} from "./common/api-service";
import {UserComponent} from "./components/user";
import {Session} from "./common/session";


@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        LoginComponent,
        UserComponent,
        AppComponent
    ],
    providers: [
        ApiService, Session
    ],
    bootstrap:    [
        AppComponent
    ]
})



export class AppModule { }
