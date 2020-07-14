import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
declare var $: any;


@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements OnInit {
  @Input() posicion: any;
  @Input() key: any;
  @Input() emoji: any = "Emoji_default";

  boton: boolean = true;
  cambio: any = "Emoji_default";
  reacion: any = {};
  inicio: boolean = true;
  constructor(private db: AngularFireDatabase,) { }
  t: string

  ngOnInit(): void {
    this.t = localStorage.getItem("token");
    if (this.emoji.tipo != null) {
      this.cambio = this.emoji.tipo;

    }

    if (this.emoji['reacciones']!==null) {
      this.cambio =this.emoji['reacciones'][this.t.slice(2, -2)].tipo;
    }
  }

  traerEmo() {
    let t;
    this.db.object('publicaciones/' + this.key + '/reacciones/' + this.t.slice(2, -2)).valueChanges().subscribe(data => {

      if (data !== null) {
        this.reacion = data;
        t = this.reacion.tipo
        //   console.log(data, this.cambio);
        ///     $('.boton' + this.posicion).removeclass('likecambio')
      }

    })

    return this.t;
  }


  like(r?) {

    //aparecer true
    if (this.boton) {
      this.boton = false;
      // likecambio
      $('.boton' + this.posicion).toggleClass('likecambio')
      $('.' + this.posicion + '1').toggleClass('aparecer')
      $('.' + this.posicion + '2').toggleClass('aparecer')
      $('.' + this.posicion + '3').toggleClass('aparecer')
      $('.' + this.posicion + '4').toggleClass('aparecer')
      $('.' + this.posicion + '5').toggleClass('aparecer')
      setTimeout(() => {
        $('.' + this.posicion + '1').toggleClass('posicion1')
        $('.' + this.posicion + '2').toggleClass('posicion2')
        $('.' + this.posicion + '3').toggleClass('posicion3')
        $('.' + this.posicion + '4').toggleClass('posicion4')
        $('.' + this.posicion + '5').toggleClass('posicion5')
      }, 100);
    } else {
      this.boton = true;
      $('.' + this.posicion + '1').toggleClass('posicion1')
      $('.' + this.posicion + '2').toggleClass('posicion2')
      $('.' + this.posicion + '3').toggleClass('posicion3')
      $('.' + this.posicion + '4').toggleClass('posicion4')
      $('.' + this.posicion + '5').toggleClass('posicion5')
      setTimeout(() => {
        $('.' + this.posicion + '1').toggleClass('aparecer')
        $('.' + this.posicion + '2').toggleClass('aparecer')
        $('.' + this.posicion + '3').toggleClass('aparecer')
        $('.' + this.posicion + '4').toggleClass('aparecer')
        $('.' + this.posicion + '5').toggleClass('aparecer')
        setTimeout(() => {
          $('.boton' + this.posicion).toggleClass('likecambio')
        }, 100);
      }, 100);
    }
  }

  reaccionar(r, n) {
    $('.cambio' + this.posicion).css("background-image", 'assets/' + r);
    this.cambio = r;
    this.db.object('usuarios/' + this.t.slice(2, -2) + '/publicaciones/' + this.key).update(
      {
        'key': this.key,
        'tipo': r
      }
    )

    this.db.object('usuarios/' + this.t.slice(2, -2) + '/reacciones/' + this.key).update(
      {
        'key': this.key,
        'tipo': r
      }
    )

    this.db.object('publicaciones/' + this.key + '/reacciones/' + this.t.slice(2, -2)).update(
      {
        'uid': this.t.slice(2, -2),
        'key': this.key,
        'tipo': r
      }
    )

  }
}
