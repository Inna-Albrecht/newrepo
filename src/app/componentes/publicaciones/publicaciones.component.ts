import { Component, OnInit,Input } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {
  @Input() fotos:any[];
  @Input() datos: any;
  @Input() profile;
  @Input() texto;
  @Input() posicion;
  @Input() key;



//posicion

  constructor() {

  }

  ngOnInit(): void {
    
  }

  like($event){
    console.log(this.datos);

    $(this).toggleClass('likeEstado2')


  }

}
