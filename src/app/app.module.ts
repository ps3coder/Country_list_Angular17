import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'countries', component: CountryComponent },
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: '**', redirectTo: '/countries' }
]

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
