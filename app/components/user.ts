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
    showCreateUserModal:boolean = false;

    showEditSaveButton:boolean = false;
    currentlyEditingUsername:string = null;
    currentlyEditingId:number = -1;
    currentlyEditingEmail:string = null;
    editPassword1:string = "";
    editPassword2:string = "";
    currentlyEditingRole:string = "";
    editUserModal:boolean = false;

    userToDelete:any = null;
    showDeleteButton:boolean = true;
    deleteModalMessage = "";


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
        this.showCreateUserModal = true;
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

        this.apiService.createUser(newUserObject)
            .then(response =>{
                console.log("New user created successfully.");
               this.userCreateMessage = "New user created successfully";
                this.loadData();
            })
            .catch(error =>{
                console.log("Could not create new User");
                this.userCreateMessage = "Could not create user, please try again.";
             });


        this.enableCreateSaveButton = false;
      //  this.showCreateUserModal = false;


    }

    editUser = function(user){
        this.editUserModal = "";
        this.currentlyEditingId = user.id;
        this.currentlyEditingUsername = user.username;
        this.currentlyEditingEmail = user.email;
        this.currentlyEditingRole = user.role;
        this.showEditSaveButton = true;
    }
    editSaveUser = function(){
        this.editUserModal = "";

        var updatedUser = {
            email: this.currentlyEditingEmail,
            role: parseInt(this.currentlyEditingRole)
        }

        if(!this.currentlyEditingEmail) {
            this.editUserModal = "Please enter email."
            return;
        }
        if(!this.currentlyEditingRole){
            this.editUserModal = "";
            return;
        }
        if(this.editPassword1 || this.editPassword2) {
            if (!this.editPassword1) {
                this.editUserModal = "Please enter password";
                return;
            }

            if (!this.editPassword2) {
                this.editUserModal = "Please confirm password";
                return;
            }
            if (this.editPassword1 != this.editPassword2) {
                this.editUserModal = "Passwords do not match";
                return;
            }
            updatedUser['password'] = this.editPassword2;
        }

    this.editUserModal = "Please wait while your changes are updated.";
        this.apiService.updateUser(this.currentlyEditingId, updatedUser)
            .then(response =>{
                console.log("In edituser handler success");
                this.editUserModal = "User has been updated successfully.";
                this.loadData();
            })
            .catch(error=>{
                console.log("In edit user handler catch.");
                this.editUserModal = "Sorry, user could not be updated. Please try again.";
            });

        console.log("Updated User :", updatedUser);


        this.showEditSaveButton = false;
    }

    onDeleteUser(index:number):void{

        this.userToDelete = this.users[index];
        this.showDeleteButton = true;
        this.deleteModalMessage = "";
        console.log("In delete user", this.userToDelete);
    }




}