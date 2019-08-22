//Angular imports
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//3rd party imports
import { map, tap } from 'rxjs/operators';

//Application imports
import { Employee } from './models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title: string = "Input Debounce";
  public searchResult: Employee[] = [];

  private timeout: any = null;
  private apiUrl: string = "./assets/data.json";

  constructor(private http: HttpClient) {}

  public search(searchTerm: string): void {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.http.get<Employee[]>(this.apiUrl).pipe(
        tap(() => console.log(searchTerm)),
        map(employee => employee.filter(e => e.fullName.toLowerCase().includes(searchTerm.toLowerCase()))))
        .subscribe(employees => {
          this.searchResult = employees;
        });
    }, 400);

  }
}
