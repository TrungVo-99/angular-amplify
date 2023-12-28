import { NgModule } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialUIModule } from './materialUI.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
// import awsconfig from './../aws-exports';

// Amplify.configure(awsconfig);

const Components = [
    LayoutComponent
]

@NgModule({
    declarations: [],
    imports: [ ...Components, MaterialUIModule, HttpClientModule ],
    providers: [ ApiService ],
    exports: [ ...Components ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}