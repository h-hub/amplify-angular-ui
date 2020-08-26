import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { ServiceService } from '../service/service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accessToken: Object;
  error: String;
  name: String;
  host: String;
  status: String;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {

    Auth.currentSession().then(res => {

      this.accessToken = res.getAccessToken().getJwtToken();

      this.service.getDataFromApi(this.accessToken).subscribe(
        data => {
          this.name = data.name;
          this.host = data.host;
          this.status = data.status;
        },
        error => {
          this.error = "Unable to connect to the service.";
        }
      )
    })

  }

}
