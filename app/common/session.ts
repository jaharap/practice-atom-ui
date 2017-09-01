import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
import {Router} from "@angular/router";




@Injectable()
export class
Session  {
    username: string = null;
    public authenticated: boolean = false;
    token: string = null;

    constructor(

    ) {
    }

    set(username, token) {
      //  this.logger.info("in Session : ");
        this.username = username;
        this.authenticated = true;
        this.token = token;
        console.log("User name from SET session ", this.username);

    }
    getUsername(){
        console.log("User name from GET session ", this.username);
        return this.username;
    }

    clear() {
        this.username = null;
        this.authenticated = false;
        this.token = null;

    }


};
