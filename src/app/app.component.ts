import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import awsconfig from './../aws-exports';
import { AppModule } from './app.module';
import { MaterialUIModule } from './materialUI.module';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession } from 'aws-amplify/auth';
import { LocalStorageService } from './services/local-storage.service';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: '72oo3vi0d1gg2d8qubrh6a0imi',
      userPoolId: 'us-east-1_vVCIOF5hU',
    }
  },
  API: {
    REST: {
      'demo-api-amplify': {
        region: 'us-east-1',
        endpoint: 'https://e23yxqsbp6.execute-api.us-east-1.amazonaws.com/v1',
      }
    }
  },
});
cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AmplifyAuthenticatorModule, AppModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService){}

  ngOnInit(): void {
    console.log('AppComponent => ngOnInit');
    Hub.listen('auth', async ({ payload }: any) => {
      switch (payload.event) {
        case 'signedIn': {
            console.log('user have been signedIn successfully.');
            const session = await fetchAuthSession();
            const cognitoIdToken = session.tokens?.idToken?.toString() || ''
            this.localStorageService.setItem('cognitoIdToken', cognitoIdToken)
          }
          break;
        case 'signedOut':{
            console.log('user have been signedOut successfully.');
            this.localStorageService.removeItem('cognitoIdToken')
          }
          break;
        case 'tokenRefresh': {
            const session = await fetchAuthSession();
            const cognitoIdToken = session.tokens?.idToken?.toString() || ''
            console.log('auth tokens have been refreshed.');
          }
          break;
        case 'tokenRefresh_failure':
          console.log('failure while refreshing auth tokens.');
          break;
        case 'signInWithRedirect':
          console.log('signInWithRedirect API has successfully been resolved.');
          break;
        case 'signInWithRedirect_failure':
          console.log('failure while trying to resolve signInWithRedirect API.');
          break;
        case 'customOAuthState':
          console.log('custom state returned from CognitoHosted UI');
          break;
      }
    });
  }

  title = 'angular-amplify';
}
