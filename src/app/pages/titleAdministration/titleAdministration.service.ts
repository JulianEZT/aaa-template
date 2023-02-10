import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getListaUsuarios(){
    return this.http.get<any>('assets/usuarios-lista.json');
  }
}