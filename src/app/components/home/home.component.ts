import { Agente } from './../../models/Agente';
import { ConversorService } from './../../services/ConversorService';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './home.service';
import * as X2JS from 'x2js';
import { Observable } from 'rxjs';
import { delay} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private service: UploadFileService
    ) { }
    
  ngOnInit(): void {
    this.retorno$ = true;
  }
  
  name: string = "";
  files: Set<File>;
  arquivosJson: Array<any> = new Array();
  conversor: ConversorService = new ConversorService();
  retorno$: Observable<boolean> | boolean;

  getName(name: string) {
    this.name = name;
  }

  getFile(event: any) {
    const selectedFiles = <FileList>event.srcElement.files;
    const fileNames = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
      selectedFiles[i].text().then((data) => {

        var x2js = new X2JS();
        var document = x2js.xml2js(data);
        this.arquivosJson.push(document);

      });
    }
    document.getElementById('arquivos').innerHTML = fileNames.join(', ');
  }

  async enviarArquivos() {
    this.retorno$ = false;
    if (this.arquivosJson && this.arquivosJson.length > 0) {
      for (var jsonFile of this.arquivosJson) {
        var jsonAux = this.conversor.converter(jsonFile)
        this.service.upload(jsonAux, "http://localhost:8080/upload").subscribe(response => console.log('Upload Concluído'));        
      }
    }
    this.arquivosJson = new Array();
    this.files = null;
    document.getElementById('arquivos').innerHTML = '';
    document.getElementById('buttonSubmit').setAttribute('disabled', '');
    console.log('aqui')
    this.retorno$ = true;
  }

}
