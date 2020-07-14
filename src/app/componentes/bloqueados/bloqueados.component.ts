import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-bloqueados',
  templateUrl: './bloqueados.component.html',
  styleUrls: ['./bloqueados.component.scss']
})
export class BloqueadosComponent implements OnInit {
  // @Input() foto: any;
  t: any;
  datos: any[] = [];
  constructor(private db: AngularFireDatabase, public variablesService: VariablesService) { }

  ngOnInit(): void {
    this.retoken()
    // this.variablesService.edit
  }

  retoken() {

    if (localStorage.getItem("token")) {

      this.t = localStorage.getItem("token").slice(2, -2);
      this.db.object('usuarios/' + this.t + '/boqueados').valueChanges().subscribe(data => {
        this.datos=[];
        if (data !== {}) {
          for (const i of Object['values'](data)) {
            this.datos.push(i);
          }

          console.log(this.datos[0].photo_profile);

        }

      })
    }

  }
  eliminar(id: string) {
    this.db.object('usuarios/' + this.t + '/boqueados/' + id).remove()
  }

}
