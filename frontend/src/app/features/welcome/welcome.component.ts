import { Component, Inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, MatButton, MatCardModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  //these are for Okta
  public isAuthenticated$!: Observable<boolean>;
  public name$!: Observable<string>;

  constructor(
    private _router: Router,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
  ){}

  public ngOnInit() {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  
  public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }

}
