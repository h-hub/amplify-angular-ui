import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { DbItem } from './dbItem';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrl = 'http://localhost:89';

  constructor(private http: HttpClient) {}

  getDataFromAws(creds): Observable<DbItem> {

    const dbItem = new DbItem();

    var dynamodb = new AWS.DynamoDB({ credentials: creds, region: "ap-southeast-1", apiVersion: '2012-08-10' });

    var params = {
      Key: {
        "id": {
          S: "123"
        },
      },
      TableName: "my_table"
    };

    dynamodb.getItem(params, function (err, data) {
      if (err) {
        console.log(err);
      }
      else {
        dbItem.id = data.Item.id.S;
        dbItem.host = data.Item.host.S;
        dbItem.name = data.Item.name.S;
        dbItem.count = parseInt(data.Item.count.N);
        dbItem.isUp = data.Item.isUp.BOOL;

      }
    });

    return of(dbItem);
  }

  getDataFromApi(token) {
    const  headers = new  HttpHeaders().set("authorization", "Bearer "+token);

    return this.http.get<any>( this.apiUrl+'/test', {headers} );
  }

}
