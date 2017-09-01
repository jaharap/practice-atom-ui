import {Component} from "@angular/core";
import {LoginModel} from "../models";
import {ApiService} from "../common/api-service";
import {Router} from '@angular/router';

@Component({
    selector: 'user-login',
    templateUrl: "app/components/login.component.html"

})

export class LoginComponent {

    login: LoginModel;
    username: string;
    password: string;
    btnActive: boolean;
    loginMessage: string;

    constructor(
        private apiService: ApiService,
        private router: Router

    ){

        this.username = "";
        this.password = "";
        this.btnActive = true;
        this.loginMessage = "";

    }
    loginClick = function(){
        console.log("In loginClick");
        this.loginMessage = "";
        if(!this.username || !this.password) {
            this.loginMessage = "Username or password cannot be empty";
            return;
        }
        this.btnActive = false;
        this.apiService.login(this.username, this.password)
            .then(function() {
                console.log("Sign in success");
                this.loginMessage = "Login Success";
                this.router.navigate(['/users']);
              //  this.router.navigate(['/panel']);

            }.bind(this))
            .catch(function(err) {
               console.log("Sign in Failed",err);
               this.loginMessage = "Login failed, please try again";
               this.btnActive = true;
            }.bind(this));

        console.log("username :", this.username);
        console.log("password :", this.password);


      //  this.username = "";
        //this.password = "";
    }
}