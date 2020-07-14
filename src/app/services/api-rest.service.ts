import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) { }

  url: String ="http://localhost/apiRest/index.php/"

  public login(email, password) {
    return this.http.post(this.url + 'login', { email: email, password: password })
  }
  public buscador(nombre,id,bloqueados){
    console.log(nombre,id);

    return this.http.post(this.url + 'buscar', { name: nombre ,id:id})

  }

  public todos(){

    return this.http.get(this.url +'UsuariosInfo/todos');
  }
  public traerDatosDeUsuario(id:String){


    return this.http.post(this.url + 'UsuariosInfo', { id: id })

  }
}
