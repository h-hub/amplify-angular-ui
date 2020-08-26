
import { Component, ChangeDetectorRef, OnInit, NgZone  } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  groups: any[];

  constructor(private ref: ChangeDetectorRef, private _ngZone: NgZone, private router: Router,) {}

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;

      if(authState === 'signedin'){
        Auth.currentSession().then(res => {
          this.groups = res.getAccessToken().decodePayload()['cognito:groups'];
          this._ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        }).catch((error) => {
          this.groups.push("INVALID");
        })
      } else {
        this.ref.detectChanges();
      }
      
    })

    
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
