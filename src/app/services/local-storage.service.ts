import { Injectable } from '@angular/core';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { KeyValueStorageInterface } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storageObject: Record<string, string> = {};
  constructor() { }

  setItem(key: string, value: string){
    this.storageObject[key] = value;
    localStorage.setItem(key, value)
  }
  getItem(key: string) {
    const item = localStorage.getItem(key)
    return item
    return this.storageObject[key];
  }
  removeItem(key: string) {
    delete this.storageObject[key];
    localStorage.removeItem(key)
  }
  clear(){
    this.storageObject = {};
    localStorage.clear()
  }
}
