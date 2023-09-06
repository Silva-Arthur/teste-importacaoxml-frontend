import { Geracao } from './../../models/Geracao';
import { Compra } from './../../models/Compra';
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
import * as X2JS from 'x2js';
import { splitAtColon } from '@angular/compiler/src/util';

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
    const fileNames = [];
    this.files = new Set();
    this.filesXML = new Set();

    for (let i=0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);   
      selectedFiles[i].text().then((data) => {

        var x2js = new X2JS();
        var document = x2js.xml2js(data);

        console.log(document);

        var agenteAux: Agente;
        var regiaoAux : Regiao;
        var geracaoAux: Geracao;
        var compraAux: Compra;        
        var listAuxAgentes: Array<Agente>;
        listAuxAgentes = new Array();
        
        for (var [key, value] of Object.entries(document)) {
          
          for (var [key, agentes] of Object.entries(value)) {
            agenteAux = new Agente();    
            for (var [key, agente] of Object.entries(agentes)) {
          
              if (key == 'codigo')
                agenteAux.codigo = agente;

              if (key == 'data')
                agenteAux.data = agente;

              if (key == 'regiao') {
                for (var [key, regioes] of Object.entries(agente)) {
                  
                  regiaoAux = new Regiao();
                  for (var [key, regiao] of Object.entries(regioes)) {

                    if (key == '_sigla')
                      regiaoAux.sigla = regiao;

                    if (key == 'geracao') {
                      geracaoAux = new Geracao();                       
                      for (var [key, geracao] of Object.entries(regiao)) {
                        geracao.toString().split(',').forEach((valor) => {
                          geracaoAux.valor.push(valor); 
                        });                       
                      }
                      regiaoAux.geracao = geracaoAux;
                    }

                    if (key == 'compra') {
                      compraAux = new Compra()
                      for (var [key, compra] of Object.entries(regiao)) {                        
                        compra.toString().split(',').forEach((valor) => {
                          compraAux.valor.push(valor); 
                        });
                      }
                      regiaoAux.compra = compraAux;
                    }

                    if (key == 'precoMedio') {
                      regiaoAux.precoMedio = new PrecoMedio();
                    }
                  }
                  agenteAux.regiao.push(regiaoAux);
                }
              }
            }
            listAuxAgentes.push(agenteAux);
          }
        }
        
        console.log('meu agente: ' + JSON.stringify(listAuxAgentes));

        var meuJson = JSON.stringify(document);
        
        console.log(meuJson)
        
      }); 
    }
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

  removerPrecoMedio(meuJSON) {
    meuJSON = meuJSON.filter(function(jsonObject) {
      return jsonObject["precoMedio"];
    });
    return meuJSON
  }
}
