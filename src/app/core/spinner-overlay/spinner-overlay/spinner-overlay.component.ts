import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, OnInit, Component } from '@angular/core';
import { SpinnerOverlayComponent } from '@app/core/spinner-overlay/spinner-overlay.component';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.css']
})
export class SpinnerOverlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
