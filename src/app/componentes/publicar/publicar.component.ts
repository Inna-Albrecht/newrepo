import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.scss']
})
export class PublicarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cerrar() {
    // this.variablesService.edit = false
  }

}
