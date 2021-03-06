import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: HttpClient) { }

  verificarEmail(email: string) {
    return this.http.get('assets/dados/verificarEmail.json')
      .pipe(
        delay(2000),
        map((dados: {emails: any[]}) => dados.emails),
        map((dados: {email: string}[]) => dados.filter(v => v.email === email)),
        map((dados: any[]) => dados.length > 0)
      );
  }
}
