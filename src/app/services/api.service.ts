import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { get, post, del, put } from 'aws-amplify/api'
import { getCurrentUser, fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { KeyValueStorageInterface } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  handleApiGatewayResponse(res: any){

  }

  getAwsTestApiGateway(): Observable<any> {
    return new Observable(sb => {
      get({
        apiName: 'demo-api-amplify',
        path: '/test',
        options: {
          withCredentials: false,
          headers: {
            Authorization: this.localStorageService.getItem('cognitoIdToken') || '',
          }
        }
      }).response
      .then(res => res.body.json())
      .then(r => sb.next(r))
      .catch(err => sb.error(err))
    })
  }

  postAwsTestApiGateway(data: any): Observable<any> {
    return new Observable(sb => {
      post({
        apiName: 'demo-api-amplify',
        path: '/test',
        options: {
          withCredentials: false,
          headers: {
            Authorization: this.localStorageService.getItem('cognitoIdToken') || '',
          },
          body: data
        }
      }).response
      .then(res => res.body.json())
      .then(r => sb.next(r))
      .catch(err => sb.error(err))
    })
  }

  getAwsTestApiGatewayUseUrl(): Observable<any> {
    return this.http.get(`https://e23yxqsbp6.execute-api.us-east-1.amazonaws.com/v1/test`)
  }


  getCurrentUser(): Observable<any>{
    return Observable.create((ob: any) => {
      getCurrentUser().then(user => {
        ob.next(user)
      })
    })
    
  }
  
}
