import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { faTrash, faCheck, faPen } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  icons = { faTrash, faCheck, faPen };
  usersContainer: any = [];
  userName: string = "";
  userPhone: string = "";
  isUnique: boolean = true;
  userNameUpdate: string = "";
  userPhoneUpdate: string = "";
  term: string = "";
  isEditing: boolean = false;

  constructor(public UserService: UserService) {}

  ngOnInit() {
    this.UserService.getAllUsers().subscribe(res => {
      Object.values(res).map(user => (user.isEditing = false));
      this.usersContainer = res;
    });
  }

  add(userData, update = false) {
    // Reset Form Inputs
    this.userName = null;
    this.userPhone = null;

    // Reset Validation Error Messages
    userData.controls.userName.touched = false;
    userData.controls.userPhone.touched = false;

    // Check For Duplicate Number
    if (this.exists(userData.value.userPhone)) {
      this.isUnique = false;
      return;
    }

    this.UserService.addUser(userData).subscribe(res => {
      this.usersContainer.push(res);
      this.isUnique = true;
    });
  }

  exists(phone) {
    return this.usersContainer.find(user => user.phone === phone);
  }

  delete(contact) {
    // TODO: SHOW CONFIRMATION MESSAGE BEFORE DELETE
    this.UserService.deleteUser(contact).subscribe(res => {
      const index = this.usersContainer.indexOf(contact);
      this.usersContainer.splice(index, 1);
    });
  }

  edit(contact) {
    contact.isEditing = true;
  }

  update(contact) {
    contact.isEditing = false;
    // Check For Duplicate Number
    this.UserService.updateUser(contact).subscribe(res => {});
  }
}
