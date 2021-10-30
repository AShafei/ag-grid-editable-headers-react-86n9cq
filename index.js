import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CustomHeader from "./customHeader.js";

import { GridContext } from "./grid-context";

class App extends Component {
  constructor(props, context) {
    super(props);

    this.toggleTheme = (colId = null) => {
      this.setState({editingHeaderId: colId});
    };

    this.state = {
      editingHeaderId: null,
      toggleTheme: this.toggleTheme,
      columnDefs: [
        {
          colId: "athlete",
          field: "athlete",
          headerComponentParams: { menuIcon: "fa-bars" }
        },
        {
          headerName: 'Athlete2',
          colId: "athlete2",
          field: "athlete",
          headerComponentParams: { menuIcon: "fa-bars" }
        },
      ],
      rowData: null,
      context: {
        parentComponent: this
      },
      frameworkComponents: { agColumnHeader: CustomHeader },
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
        filter: true
      }
    };
  }

  getMainMenuItems = params => {
    var that = this;
    let colId = params.column.getId()
        var menuItems = params.defaultItems.slice(0);
        menuItems.push({
          name: `Update ${colId} header name`,
          action: function() {
            that.setState({editingHeaderId: colId});
          }
        });
        return menuItems;
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  render() {
    // const { signedInUser, theme } = this.props;

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <GridContext.Provider value={this.state}>
        <button onClick={() => this.toggleTheme('athlete')}>rename Athlete</button>
        <button onClick={() => this.toggleTheme('athlete2')}>rename Athlete2</button>
          <div
            id="myGrid"
            style={{
              height: "100%",
              width: "100%"
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              suppressMenuHide={true}
              context={this.state.context}
              getMainMenuItems={this.getMainMenuItems}
              frameworkComponents={this.state.frameworkComponents}
              defaultColDef={this.state.defaultColDef}
              onGridReady={this.onGridReady}
            />
          </div>
        </GridContext.Provider>
      </div>
    );
  }
}

App.contextType = GridContext;

render(<App />, document.querySelector("#root"));
