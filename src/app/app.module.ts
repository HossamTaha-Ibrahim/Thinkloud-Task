import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { UserComponent } from "./user/user.component";

import { UserService } from "./user.service";
import { SearchPipe } from "./search.pipe";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { from } from "rxjs";

@NgModule({
  declarations: [AppComponent, UserComponent, SearchPipe],
  imports: [BrowserModule, FormsModule, HttpClientModule, FontAwesomeModule],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
