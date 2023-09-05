import { XmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { xml2js } from 'xml-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(    
  ) { }

  ngOnInit(): void {
  }

  name: string = "";
  file: any[];
  getName(name: string) {
    this.name = name;
  }

  getFile(event: any) {
    this.file = event.target.files;
    console.log("file", this.file)
  }

  submitData() {

    console.log(this.converterXmlToJson())
    
    let formData = new FormData();

    formData.set("name", this.name);
    //formData.set("file", this.file)

    /*this.http.post("http://localhost:3001/upload/uploadfiles", formData).subscribe(
      (reponse)=> {

      }
    )*/
  }

  
  converterXmlToJson():any {
    console.log(this.file[0].text)
    const leitor = new FileReader();

    leitor.addEventListener('load', function() {
      console.log(leitor.result);
    });

    
    if(this.file[0]) {
      var texto = leitor.readAsText(this.file[0]);

      const {XmlParser} = require('fast-xml-parser');

      return texto;
    }
    return null;
  }
}
