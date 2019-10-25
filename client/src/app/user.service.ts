import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  headers: Object = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  baseURL: string = "http://127.0.0.1:3000/contacts";

  constructor(public HttpClient: HttpClient) {}

  getAllUsers() {
    return this.HttpClient.get(this.baseURL, this.headers);
  }

  addUser(userData) {
    var user = {
      name: userData.value.userName,
      phone: userData.value.userPhone
    };

    return this.HttpClient.post(this.baseURL, user, this.headers);
  }

  updateUser(contact) {
    // Destructing id property
    const { id, name, phone } = contact;

    const user = { name, phone };

    return this.HttpClient.patch(`${this.baseURL}/${id}`, user, this.headers);
  }

  deleteUser(contact) {
    // Destructing id property
    const { id } = contact;
    return this.HttpClient.delete(`${this.baseURL}/${id}`, this.headers);
  }
}
