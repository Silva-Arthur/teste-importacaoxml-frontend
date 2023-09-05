import { XmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { xml2js } from 'xml-js';
import { UploadFileService } from './uploadFile.service';
import { readFileSync } from 'fs';
import { XMLParser } from 'fast-xml-parser';

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
        console.log("durante");
        console.log(data)
        this.filesXML.add(data.toString());
        console.log("logo após");
        const options = {
          ignoreAttributes: false,
          attributeNamePrefix : "@_"
        };
        const parser = new XMLParser(options);
        const output = parser.parse(data.toString());
        console.log("Meu JSON", output)
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
