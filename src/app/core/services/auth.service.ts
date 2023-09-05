import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import baserUrl from '../helpers/helperUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_USER_PWD = "/login/psw";
  URL_GOOGLE = "/login/google";

  constructor(private http: HttpClient) { }

  validateLoginDetails(user: Usuario) {
    window.sessionStorage.setItem("userdetails", JSON.stringify(user));
    return this.http.get(`${baserUrl}` + this.URL_USER_PWD, { observe: 'response', withCredentials: true });
  }
  
}
