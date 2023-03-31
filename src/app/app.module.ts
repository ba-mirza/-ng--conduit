import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {TopBarModule} from './shared/modules/topBar/topBar.module';
import {PersistanceService} from './shared/services/persistance.service';
import {Authinterceptor} from './shared/services/authinterceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot([]),
    TopBarModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Authinterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
