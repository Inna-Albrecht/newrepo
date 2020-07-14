import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { VariablesService } from 'src/app/services/variables.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  datos: any = {};

  todosBuscar: any[] = [];

  buscarT: any;

  publicaciones: any[] = [];

  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth, public apiRest: ApiRestService, private router: Router, private route: ActivatedRoute, protected variables: VariablesService) { }

  ngOnInit(): void {
    if (this.variables.datosU.name !== undefined) {
      this.datos = this.variables.datosU;
    } else {
      this.retoken();
    }
    this.db.object('publicaciones').valueChanges().subscribe(data => {
      console.log(data);
      if (data !== undefined) {
        this.publicaciones = [];
        let keys: any[] = [];
        for (const i of Object['keys'](data)) {
          keys.push(i);
        }
        let n = 0;
        for (const i of Object['values'](data)) {
          i['keys'] = keys[n];
          console.log(i);
          this.publicaciones.push(i)
          console.log(this.publicaciones);
          n++
        }
        // if (this.datos.publicaciones !== undefined) {
        //   this.publicaciones = [];
        //   let keys: any[] = [];
        //   for (const i of Object['keys'](this.datos.publicaciones)) {
        //     keys.push(i);
        //   }
        //   let n = 0;
        //   for (const i of Object['values'](this.datos.publicaciones)) {
        //     i['keys'] = keys[n];
        //     this.db.object('usuarios/' + this.t + '/reacciones/' + keys[n]).valueChanges().subscribe(data => {
        //       i['tipo'] = data['tipo']
        //     })
        //     this.publicaciones.push(i)
        //     n++
        //   }
        // }
      }
    })
  }

  buscar() {
    console.log(this.datos.id_usuario);
    this.apiRest.buscador(this.buscarT, this.datos.id_usuario, this.datos.boqueados).subscribe(data => {
      if (!data['error']) {
        //    this.todosBuscar = data['usuarios'];
        if (this.datos.boqueados) {
          let d;
          // for (const i2 of Object["values"](this.datos.boqueados)) {
          //   for (const i1 of data['usuarios']) {
          //     if (i1.id === i2['id'] ) {
          //        data['usuarios']['id'];
          //        console.log(i2['id'],i1.name);
          //      // this.todosBuscar.push(i1);
          //     }else{
          //       this.todosBuscar=i1;
          //     }
          //   }
          // }
          for (let i = 0; i < data['usuarios'].length; i++) {
            for (const i2 of Object["values"](this.datos.boqueados)) {
              if (data['usuarios'][i].id === i2['id']) {
                console.log(data['usuarios'][i].id === i2['id']);
                this.removeItemsWithName(data['usuarios'], i2['id']);
                //delete data['usuarios'][data['usuarios'].findIndex(item => item.id == i2['id'])];
                // data['usuarios']=data['usuarios'].filter(item => item.id === i2['id']);
                console.log(data['usuarios']);
              }
              this.todosBuscar = data['usuarios']
              console.log(this.todosBuscar);
            }
          }
        } else {
          this.todosBuscar = data['usuarios'];
        }
      }
    })
  }
  verUsuario(id) {
    this.apiRest.traerDatosDeUsuario(id).subscribe(data => {
      this.variables.verOtroPerfil = data;
      this.router.navigate(['profile', { id: id }]);
    })
  }
  miPerfil() {
    this.router.navigate(['profile'])
  }
  retoken() {
    if (localStorage.getItem("token")) {
      let t: string = localStorage.getItem("token");
      this.db.object('usuarios/' + t.slice(2, -2)).valueChanges().subscribe(data => {
        if (data != {}) {
          this.datos = data;
        }
      })
    }
  }

  removeItemsWithName(items: any[], id: string): void {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items.splice(i--, 1);
      }
    }
  }
}
