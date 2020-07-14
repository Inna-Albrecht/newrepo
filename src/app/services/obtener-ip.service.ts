import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObtenerIpService {

  constructor(private http: HttpClient) { }

  obtenerIp() {
    return this.http.get("http://api.ipify.org/?format=json")

  }
}
