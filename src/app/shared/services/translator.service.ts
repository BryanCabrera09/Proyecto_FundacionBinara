import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  public lang: any = 'es';

  private headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Ocp-Apim-Subscription-Key', '95967bc89cc0413e99850e47d60d51bd')
    .set('Ocp-Apim-Subscription-Region', 'eastus');

  private URL = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=';

  constructor(private httpClient: HttpClient) {

    if (localStorage.getItem('lamguage')) {
      this.lang = localStorage.getItem('lamguage');
    }
  }

  translateText(input: string): Observable<string> {

    let body = [
      {
        "text": input
      }
    ]

    return this.httpClient.post<any>(this.URL + this.lang, body, { headers: this.headers })
      .pipe(map(data => data[0]['translations'][0].text), catchError(
        err => {
          console.log('caught mapping error and rethrowing', err);
          return of(input);
        }
      ));
  }

}
