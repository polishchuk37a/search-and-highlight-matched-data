import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { MatchNamePipe } from './shared/match-name.pipe';
import { HighlightLetters } from './shared/highlight-letters';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MatchNamePipe,
    HighlightLetters
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
