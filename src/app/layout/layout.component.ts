import { Component } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { MaterialUIModule } from '../materialUI.module';
import { getCurrentUser, fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { ApiService } from '../services/api.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ AmplifyAuthenticatorModule, MaterialUIModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private apiService: ApiService){

  }


  async onGetUserCognitoInfo(){
    console.log('onGetUserCognitoInfo')
    this.apiService.getCurrentUser().subscribe(r => console.log('user: ', r));
    this.apiService.getAwsTestApiGateway().subscribe(r => {
      console.log('getAwsTestApiGateway: ', r)
    })

    const currentUser = await getCurrentUser()
    this.apiService.postAwsTestApiGateway(currentUser).subscribe(r => {
      console.log('postAwsTestApiGateway: ', r)
    })
    // this.apiService.getAwsTestApiGatewayUseUrl().subscribe(r => {
    //   console.log('r: ', r)
    // })
  }

}
