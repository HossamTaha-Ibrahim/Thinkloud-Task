import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
  pure: false
})
export class SearchPipe implements PipeTransform {
  transform(contacts: any, term: string = "") {
    return contacts.filter(function(contacts: any) {
      return (
        contacts.name.toLowerCase().includes(term.toLowerCase()) ||
        contacts.phone.includes(term)
      );
    });
  }
}
