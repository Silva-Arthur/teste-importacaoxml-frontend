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
  arquivoXML: Set<Agente> = new Set();
  jsonEnviar: string = "";

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
        var arquivoXML2 = convert.xml2js(data.toString().replace('<?xml version="1.0" encoding="UTF-8"?>', ''), {compact: true, spaces: 1});
        this.jsonEnviar = convert.xml2json(data.toString().replace('<?xml version="1.0" encoding="UTF-8"?>', ''), {compact: true, spaces: 1});
        console.log(arquivoXML2);

        //console.log(arquivoXML2.agentes.agente[0].regiao.precoMedio = null);

        // Acessar no multi agentes
        //console.log(arquivoXML2.agentes.agente[0].regiao[0].precoMedio.valor[0])

        // Acessar no single agentes
        //console.log(arquivoXML2.agentes.agente.regiao[0].precoMedio.valor[0]);

        this.arquivoXML.add(arquivoXML2.agentes);

        console.log(this.arquivoXML);
        // Imprime o JSON no console
        /*console.log(this.arquivoXML);
        console.log(typeof this.arquivoXML.agentes[0]);
        Object.keys(this.arquivoXML).forEach((regiao) => {
          console.log(regiao);
        });*/
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
    if (this.arquivoXML && this.arquivoXML.size > 0) {
      var reader = new FileReader();


      this.service.upload(this.arquivoXML, "http://localhost:8080/upload", this.jsonEnviar).subscribe(response => console.log('Upload Concluído'));

     /* for (let i=0; i < this.files.size; i++) {
        this.files[i].text().then((data) => {
          //this.filesXML.add(data.toString());
                  
          // Converte XML em JSON
          var convert = require('xml-js');
          var arquivoXML2 = convert.xml2js(data.toString().replace('<?xml version="1.0" encoding="UTF-8"?>', ''), {compact: true, spaces: 1});
          console.log(arquivoXML2);
  
          //console.log(arquivoXML2.agentes.agente[0].regiao.precoMedio = null);
  
          // Acessar no multi agentes
          //console.log(arquivoXML2.agentes.agente[0].regiao[0].precoMedio.valor[0])
  
          // Acessar no single agentes
          //console.log(arquivoXML2.agentes.agente.regiao[0].precoMedio.valor[0]);
  
          this.arquivoXML.add(arquivoXML2.agentes);
  
          console.log(this.arquivoXML);
          this.service.upload(this.arquivoXML, "localhost:8080").subscribe(response => console.log('Upload Concluído'));
        });
        console.log("depois");
      }*/
    }
  }
}
