import { Agente } from 'src/app/models/Agente';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlToHttpOptions } from 'url';
import { delay, first, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  async upload(jsonEnviar: any, url: string) {
    return await this.http.post(url, jsonEnviar,{responseType: 'text'}).toPromise();
  }
}
