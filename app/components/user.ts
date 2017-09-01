import {Component} from "@angular/core";
import {LoginModel, User} from "../models";
import {ApiService} from "../common/api-service";
import { OnInit } from "@angular/core";

@Component({
    selector: 'user',
    templateUrl: "app/components/user.component.html"

})

export class UserComponent {

    users:User[];

    username:string = "";
    email: string = "";
    password: string = "";
    role: string = "";
    selectedRole = null;
    userCreateMessage:string = "";
    enableCreateSaveButton: boolean = false;


    constructor(
        private apiService: ApiService

    ){}


    ngOnInit():void{

            this.loadData();
    }

    loadData = function(){

        this.users = null;
        this.apiService.getUsers()
            .then(usersList => {

                this.users = usersList;
                console.log("Users: ", this.users);
            })
            .catch(error=>{
                console.log("In loadData ", error);
                this.users = null;
            });

    }

    clickNewUser = function(){
        this.username = null;
        this.password = null;
        this.email = null;
        this.role = "";
        this.selectedRole = 1;
        this.enableCreateSaveButton = true;
    }
    saveNewUser = function(){
        this.userCreateMessage = "";
        if(!this.username || !this.email) {
            this.userCreateMessage = "Please fill username or email";
            return;
        }
        if(!this.password) {
            this.userCreateMessage = "Please fill in password";
            return;
        }
        if(!this.selectedRole) {
            this.userCreateMessage = "Please select a role";
            return;
        }

        var newUserObject = {
            username: this.username,
            email: this.email,
            role: parseInt(this.selectedRole),
            password: this.password
        }

        console.log("User data: ", newUserObject);

      /*  this.apiService.createUser(newUserObject)
            .then(response =>{
                console.log("New user created successfully.");
               this.userCreateMessage = "New user created successfully";
               // this.loadData();
            })
            .catch(error =>{
                console.log("Could not create new User");
                this.userCreateMessage = "Could not create user, please try again.";
             });
             */

        this.enableCreateSaveButton = false;


    }





}