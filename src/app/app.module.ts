import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { routes } from './app.routing';

import { GettingStartedComponent } from './getting-started/getting-started.component';
import { MainMenuComponent } from './shared/main-menu/main-menu.component';
import { TopMenuComponent } from './shared/top-menu/top-menu.component';
import { SearchFilterPipe } from './shared/main-menu/search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    TopMenuComponent,
    MainMenuComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}