import { Component, OnInit } from '@angular/core';
import { VariablesService } from 'src/app/services/variables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AngularFireDatabase } from '@angular/fire/database';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  datos: any = {};
  foto: any[] = [];
  texArea: any = "";
  fotoPreviews: any[] = [];
  publicaciones: any[] = [];
  editar: boolean = false;
  botonTexto: boolean = false;
  index: any;
  t: string;
  galeri: boolean = false;
  tt: string;
  changeText: boolean = false;
  id: string;
  constructor(private db: AngularFireDatabase, public apiRest: ApiRestService, protected variables: VariablesService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.tt = localStorage.getItem("token").slice(2, -2);
    if (this.datos.idF !== this.tt) {
      this.variables.verOtroPerfil = {}
    }
    if (this.variables.verOtroPerfil.name !== undefined) {
      this.datos = this.variables.verOtroPerfil;
      this.fotos(this.datos)
    } else {
      if (this.route.snapshot.paramMap.get('id') !== null) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.apiRest.traerDatosDeUsuario(this.id).subscribe(data => {
          this.datos = data;
          this.fotos(this.datos)
        })
      } else if (localStorage.getItem("token")) {
        this.retoken();
      }
    }
    // $(function () {
    //   var textArea = $('#content'),
    //     hiddenDiv = $(document.createElement('div')),
    //     content = null;
    //   textArea.addClass('noscroll');
    //   hiddenDiv.addClass('hiddendiv');
    //   $(textArea).after(hiddenDiv);
    //   textArea.on('keyup', function () {
    //     content = $(this).val();
    //     content = content.replace(/\n/g, '<br>');
    //     hiddenDiv.html(content + '<br class="lbr">');
    //     $(this).css('height', hiddenDiv.height());
    //   });
    // });
  }

  fotos(datos) {
    this.foto = [];
    let n = 0;
    for (let i of datos.fotos) {
      if (n <= 5) {
        n++; this.foto.push(i)
      }
      this.fotoPreviews.push(i)
    }
  }

  ver(i) {
    this.index = i;
    this.galeri = true;
  }

  cerrar() {
    this.galeri = false;
  }

  retoken() {
    if (localStorage.getItem("token")) {
      this.t = localStorage.getItem("token").slice(2, -2);
      this.db.object('usuarios/' + this.t).valueChanges().subscribe(data => {
        if (data !== {}) {
          this.datos = data;
          if (this.datos.publicaciones !== undefined) {
            this.publicaciones = [];
            let keys: any[] = [];
            for (const i of Object['keys'](this.datos.publicaciones)) {
              keys.push(i);
            }
            let n = 0;
            for (const i of Object['values'](this.datos.publicaciones)) {
              i['keys'] = keys[n];
              this.db.object('usuarios/' + this.t + '/reacciones/' + keys[n]).valueChanges().subscribe(data => {
                i['tipo'] = data['tipo']
              })
              this.publicaciones.push(i)
              n++
            }
          }
          this.fotos(this.datos)
        }
      })

    }
  }

  accion(accion: boolean) {
    if (accion) {
      this.variables.edit ? this.variables.edit = false : this.variables.edit = true;
    } else {
      console.log("seguir");
    }
  }

  dioclick() {
    console.log("dio click");
  }

  bloquear(dato: any) {
    console.log(this.t);
    this.db.object('usuarios/' + localStorage.getItem("token").slice(2, -2) + '/boqueados/' + dato.id_usuario).update({
      "id": dato.id_usuario,
      'name': dato.name,
      'photo_profile': dato.photo_profile
    })
    // this.db.object('usuarios/' + localStorage.getItem("token").slice(2, -2) + '/boqueados/' + dato.id_usuario).update({
    //   "id": dato.id_usuario,
    //   'name': dato.name,
    //   'photo_profile': dato.photo_profile
    // })
    this.router.navigate(['home'])
  }

  publicar(
    booleano: boolean
  ) {
    if (!this.botonTexto) {
      this.botonTexto = true;
      $('.fondoApuntar').toggleClass('fondoApuntarAbierto')
      $('.apuntar').toggleClass('apuntarAbierto')
      $('textarea').toggleClass('textareaT')
    } else {
      this.db.object('seguidores/' + localStorage.getItem("token").slice(2, -2)).update({
      })
      //   this.botonTexto = false;
    }
    //textareaT
  }

  b() {
    this.botonTexto = false;
    $('.fondoApuntar').toggleClass('fondoApuntarAbierto');
    $('.apuntar').toggleClass('apuntarAbierto');
    $('textarea').toggleClass('textareaT');
    //uid
    if (localStorage.getItem("uid") === this.id) {
      this.db.list('publicaciones/').push({
        "textArea": this.texArea,
        "id": this.datos.id_usuario,
        'name': this.datos.name,
        'photo_profile': this.datos.photo_profile
      });
      this.db.list('usuarios/' + localStorage.getItem("token").slice(2, -2) + '/publicaciones/').push({
        "textArea": this.texArea,
        'photo_profile': this.datos.photo_profile,
        'name': this.datos.name,
      });
    } else {
      console.log((localStorage.getItem("uid") + "-" + this.id));

      this.db.list('publicaciones/').push({
        "textArea": this.texArea,
        "id": this.datos.id_usuario,
        'name': this.datos.name,
        'photo_profile': this.datos.photo_profile
      });
      this.db.list('usuarios/' + localStorage.getItem("token").slice(2, -2) + '/publicaciones/').push({
        "textArea": this.texArea,
        'photo_profile': this.datos.photo_profile,
        'name': this.datos.name,
      });

      console.log("Hare una publicacion");

    }


    /*----------------------------------------------------------------------------------------------------*/
    console.log({
      "textArea": this.texArea,
      "id": this.datos.id_usuario,
      'name': this.datos.name,
      'photo_profile': this.datos.photo_profile
    });

  }
}
