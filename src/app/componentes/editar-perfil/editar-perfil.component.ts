import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  t: any;
  datos: any = {};
  constructor(private db: AngularFireDatabase, public variablesService: VariablesService) { }

  ngOnInit(): void {
    this.retoken()
    this.variablesService.edit
  }
  retoken() {
    if (localStorage.getItem("token")) {
      this.t = localStorage.getItem("token").slice(2, -2);
      this.db.object('usuarios/' + this.t).valueChanges().subscribe(data => {
        if (data !== {}) {
          this.datos = data;
        }
      })
    }
  }
  cerrar() {
    this.variablesService.edit = false
  }
  ir(n: any) {
    this.variablesService.elegirEdit = n;
  }
}
