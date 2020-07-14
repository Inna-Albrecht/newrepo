import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  image: any;
  @Input() imagenes;
  @Input() num: number;
  @Input() imageness: any[];

  constructor() {

  }

  ngOnInit(): void {

    this.imagenes = this.imageness[this.num].photo;
  }

  atras() {
    if (this.num !== 0) {
      this.num--;
      this.imagenes = this.imageness[this.num].photo;
      console.log(this.imagenes);

    }
  }
  adelante() {
    if (this.num <= this.imageness.length) {
      this.num++;
      this.imagenes = this.imageness[this.num].photo;
      console.log(this.imagenes);


    }
  }
}
