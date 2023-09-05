import { Regiao } from './../../models/Regiao';
import { PrecoMedio } from './../../models/PrecoMedio';
import { XmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { xml2js } from 'xml-js';
import { UploadFileService } from './uploadFile.service';
import { readFileSync } from 'fs';
import { XMLParser } from 'fast-xml-parser';
import { Agente } from 'src/app/models/Agente';
import { ArquivoXML } from 'src/app/models/ArquivoXML';

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
  }

  name: string = "";
  files: Set<File>;
  filesXML: Set<string>;
  arquivoXML: ArquivoXML;

  getName(name: string) {
    this.name = name;
  }

  getFile(event: any) {
    const selectedFiles = <FileList> event.srcElement.files;
    console.log(selectedFiles[0].arrayBuffer);

    const fileNames = [];
    this.files = new Set();
    this.filesXML = new Set();
    for (let i=0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);   
      selectedFiles[i].text().then((data) => {
        //this.filesXML.add(data.toString());
                
        // Converte XML em JSON
        var convert = require('xml-js');
        var result = convert.xml2json(data.toString().replace('<?xml version="1.0" encoding="UTF-8"?>', ''), {compact: true, spaces: 1});
        console.log(result);
        console.log(typeof result);

        // Transforma o JSON em Objeto JS
        this.arquivoXML = JSON.parse(result);


        // Imprime o JSON no console
        console.log(this.arquivoXML);
        console.log(typeof this.arquivoXML.agentes[0]);
        Object.keys(this.arquivoXML).forEach((regiao) => {
          console.log(regiao);
        });
      });
      console.log("depois");
      

    }
    console.log("depois2");
    console.log(fileNames);

    document.getElementById('arquivos').innerHTML = fileNames.join(', ');

    this.filesXML.forEach(data => {
      console.log('Meu XML Finalmente!!!' + data);
    });
  }

  submitData() {
    if (this.files && this.files.size > 0) {
      var reader = new FileReader();
      this.service.upload(this.files, "url").subscribe(response => console.log('Upload Concluído'));
    }
  }
}
