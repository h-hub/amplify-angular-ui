import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
import { ServiceService } from '../service/service.service';
import { DbItem } from '../service/dbItem';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  
  error: String;
  dbItem: DbItem;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {

    Auth.currentCredentials().then( res => {

      this.service.getDataFromAws(res).subscribe(
        data => {
          this.dbItem = data;
        },
        error => {
          this.error = "Unable to connect to the service.";
        }
      )
      
    })

  }

}
