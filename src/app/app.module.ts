import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { HttpClientModule } from '@angular/common/http';

import { DialogModule }  from 'primeng/dialog';
import { DataTableModule }  from 'primeng/datatable';
import {TableModule} from 'primeng/table';
import {CarService} from './primengService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  , HttpClientModule
  , AgGridModule.withComponents([])
  , DialogModule
  , DataTableModule
  , TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
