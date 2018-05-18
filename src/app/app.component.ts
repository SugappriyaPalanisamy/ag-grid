import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import "ag-grid-enterprise";
import {CarService} from './primengService';
export interface Car {
  athlete;
  age;
  country;
  year;
  date;
  sport;
  gold;
  silver;
  bronze;
  total
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  private gridApi;
  private gridColumnApi;
    private columnDefs;
    private rowGroupPanelShow;
    private columnDefsDetailGrid;
    private detailCellRendererParams;
  
  cars: Car[];
  cols: any[]

  constructor(private http: HttpClient,private carService: CarService) {
      this.columnDefs = [
        {
          headerName: "Athlete Details",
          children: [
            {
              headerName: "Athlete",
              field: "athlete",
              width: 200,
              filter: "agTextColumnFilter", 
              editable : true,
              //pinned : true,
              enableRowGroup: true,
              rowGroup: true

            },
            {
              headerName: "Age",
              field: "age",
              width: 190,
              filter: "agNumberColumnFilter",
              editable : true,  
              cellClassRules: {
                "rag-green": "x < 20",
                "rag-amber": "x >= 20 && x < 25",
                "rag-red": "x >= 25"
              }
            },
            {
              headerName: "Country",
              field: "country",
              width: 170,
              enableRowGroup: true

            },
          ]
        },
        {
          headerName: "Sports Results",
          children: [
            {
              headerName: "Sport",
              field: "sport",
              width: 120
            },
            {
              headerName: "Total",
          
              field: "total",
              width: 100,
              filter: "agNumberColumnFilter"
            },
            {
              headerName: "Gold",
            
              field: "gold",
              width: 140,
              filter: "agNumberColumnFilter"
            },
            {
              headerName: "Silver",
            
              field: "silver",
              width: 150,
              filter: "agNumberColumnFilter"
            },
            {
              headerName: "Bronze",
            
              field: "bronze",
              width: 160,
              filter: "agNumberColumnFilter"
            }
          ]
          
        }
      ];
      this.rowGroupPanelShow = "always";
      this.columnDefsDetailGrid = [
        {
          field: "name",
          cellRenderer: "agGroupCellRenderer"
        },
        { field: "account" },
        { field: "calls" },
        {
          field: "minutes",
          valueFormatter: "x.toLocaleString() + 'm'"
        }
      ];
      this.detailCellRendererParams = {
        detailGridOptions: {
          columnDefs: [
            { field: "callId" },
            { field: "direction" },
            { field: "number" },
            {
              field: "duration",
              valueFormatter: "x.toLocaleString() + 's'"
            },
            { field: "switchCode" }
          ],
          onGridReady: function(params) {
            params.api.sizeColumnsToFit();
          }
        },
        getDetailRowData: function(params) {
          params.successCallback(params.data.callRecords);
        }
      };
  }
  
    ngOnInit() {

     this.cols = [
       { field: 'athlete', header: 'Athlete' },
       { field: 'year', header: 'Year' },
       { field: 'brand', header: 'Brand' },
       { field: 'color', header: 'Color' }
     ];
     this.carService.getCarsSmall()
         .subscribe(cars => this.cars = cars);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get("https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json")
      .subscribe(data => {
        params.api.setRowData(data);
      });
  }
  onDetailGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json"
      )
      .subscribe(data => {
        params.api.setRowData(data);
      });

    params.api.sizeColumnsToFit();
    setTimeout(function() {
      var rowCount = 0;
      params.api.forEachNode(function(node) {
        node.setExpanded(rowCount++ === 1);
      });
    }, 500);
  }
  onBtExport() {
    var params = {
      skipHeader: false,
      columnGroups: false,
      skipFooters: false,
      skipGroups: false,
      skipPinnedTop: false,
      skipPinnedBottom: false,
      allColumns:false,
      onlySelected: false,
      suppressQuotes: false,
      
    };
this.gridApi.exportDataAsCsv(params);
  }
}
