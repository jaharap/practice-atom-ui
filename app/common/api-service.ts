/**
 * Created by myuser on 8/15/17.
 */

import {Injectable} from "@angular/core";

import 'rxjs/Rx';
import{Http, Headers, RequestOptions, Request} from "@angular/http";
import {resolve} from "url";
import {Session} from './session';
import { User } from '../models'
import {Router} from "@angular/router";



@Injectable()
export class
ApiService {

    token: string = null;
    username: string = "";
    apiUrl="http://atomapi.techlark.com:8000";
    myToken: string;

    constructor(private http:Http,
                private session: Session,
                private router:Router
    ){
            this.myToken = "";
    }



    login(username,password):Promise<any> {

        return new Promise((resolve, reject)=> {

            var url = this.apiUrl + '/sessions';
            let headers = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({'headers': headers});
            var body = {
                username: username,
                password: password
            }
            this.http.post(url, body, options)
                .toPromise()
                .then(response => {
                    console.log("In apiServer success");
                    this.username = username;
                    this.myToken = response.json().content.token;
                    resolve({});
                })
                .catch(err => {
                    console.log("In apiServer fail");
                    if(err.status == 0) {
                        console.log("Login Error");
                        reject("Login failed");
                    } else
                        reject(err.json());
                })
        });

    }

    getUsers():Promise<User> {
        console.log("In ApiService getUsers", this.myToken);
        return new Promise((resolve, reject) =>{

            var url = this.apiUrl + "/users";
            let headers = new Headers({Authorization: 'Token ' + this.myToken})
            let options = new RequestOptions({'headers': headers});

            this.http.get(url, options)
                .toPromise()
                .then(response => {
                    console.log("In getUsers resolve", response);
                    resolve(this.mapUserListModel(response.json().content));
                })
                .catch(error =>{
                    console.log("In getUsers reject", error);
                    reject({});
                });
        });

    }

    mapUserListModel(json:any):User[]{
        return json.map(function(singleJson){

            return {
                id: singleJson.id,
                username: singleJson.username,
                password: singleJson.password,
                email: singleJson.email,
                role: singleJson.RoleId
            }
        });
    }

    createUser(user:any):Promise<any[]>{

        console.log("In API service createUser");

        return new Promise((resolve, reject)=>{

            var url = this.apiUrl + "/users";
            let headers = new Headers({Authorization: "Token " + this.myToken});
            let options = new RequestOptions({headers: headers});

            var body = {
                username: user.username,
                password: user.password,
                emailId: user.email,
                uRoleId: user.role
            }

            this.http.post(url, body, options)
                .toPromise()
                .then(response=>{
                    console.log("In API service create success", body);
                    resolve({});
                })
                .catch(error =>{
                    console.log("in api servuce create error");
                    reject(error.json());
                });

            console.log("In API servi", body);

        });


    }
    updateUser(id:number, user:any):Promise<any[]>{

        return new Promise((resolve, reject) =>{

            var url = this.apiUrl + "/users/" + id;
            var headers = new Headers({ Authorization: "Token " + this.myToken});
            var options = new RequestOptions({headers: headers});
            var body = {
                newEmail : user.email,
                newRoleId: user.role
            };
            if(user.password)
                body['newPassword'] = user.password;

            console.log("From apiService update user ", body);

            this.http.patch(url, body, options)
                .toPromise()
                .then(response =>{
                    console.log("In apiservice updateUser response", response);
                    resolve({});
                })
                .catch(error =>{
                    console.log("In apiservice catch");
                    reject("in apiservice reject");
                });

            resolve({});

        });

    }

}