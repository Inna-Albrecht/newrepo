import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  @Input() datos: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
