import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  isShow: boolean;
  topPosToStartShowing = 100;
  faArrowCircleUp = faArrowCircleUp;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
