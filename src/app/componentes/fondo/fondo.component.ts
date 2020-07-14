import { Component, OnInit } from '@angular/core';
import { CambioColoresService } from 'src/app/services/cambio-colores.service';

@Component({
  selector: 'app-fondo',
  templateUrl: './fondo.component.html',
  styleUrls: ['./fondo.component.scss']
})
export class FondoComponent implements OnInit {

  color:String="";
  constructor(public cambioDeColores: CambioColoresService) { }

  ngOnInit(): void {
    this.color=this.cambioDeColores.color;
    console.log(this.color);
    
  }

}
