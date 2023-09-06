import { Agente } from 'src/app/models/Agente';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(agentes: Set<Agente>, url: string) {
    /*const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    const request = new HttpRequest("POST", url, formData);*/
    console.log(agentes);
    return this.http.post<any>(url, agentes);
  }
}
