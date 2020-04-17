import { Component } from '@angular/core';
import { faHome, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Covid19';
  faHome = faHome;
  faBars = faBars;
  faSearch = faSearch;

  constructor() {}
}
