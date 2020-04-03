import { Component } from '@angular/core';
import { createPopper } from '@popperjs/core';
import { faHome, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Covid19';
  faHome = faHome;
  faBars = faBars;
  faTimes = faTimes;

  constructor() {}

}
