import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

const ROLE = 'roles';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  user = new Usuario;

  constructor() { }

  public clean(): void {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  public isLoggedIn(): boolean {
    if (sessionStorage.getItem('userdetails')) {
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
    return this.user ? true : false;
  }

  public getRole() {
    return localStorage.getItem(ROLE);
  }

}
