import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  accessToken: Object;
  error: String;
  file: any;
  submitted = false;
  url = "../assets/angular.png";
  msg: string;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(){

    if(this.file===undefined){
      alert("No file was provided.")
    }

    Auth.currentSession().then(res => {

      this.accessToken = res.getAccessToken().getJwtToken();

      this.service.uploadImage(this.accessToken, this.file).subscribe(
        data => {
          this.url = data.url;
          this.msg = "Uploaded Image"
          this.file = null;
        },
        error => {
          this.error = "Unable to connect to the service.";
        }
      )
    })
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
}

}
