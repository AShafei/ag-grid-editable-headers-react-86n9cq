import React, { Component } from "react";
import { GridContext } from "./grid-context";
export default class CustomHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.displayName };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event) {
    console.log("handleChange");
    this.setState({ value: event.target.value });
  }

  handleKeyPress(event, toggleTheme) {
    if (event.key == "Enter") {
      let cols = this.props.api.getColumnDefs();

      let currentColumnId = this.props.column.getColId();

      let newCols = [];

      cols.forEach(colDef => {
        if (colDef.colId == currentColumnId) {
          newCols.push({ ...colDef, headerName: this.state.value });
        } else {
          newCols.push({ ...colDef });
        }
      });

      this.props.context.parentComponent.setState(state => ({
        columnDefs: newCols
      }));

      toggleTheme();
    }
  }

  render() {
    return (
      <GridContext.Consumer>
        {({ editingHeaderId, toggleTheme }) => {
          let menu = null;
          let column = null;

          if (editingHeaderId === this.props.column.getColId()) {
            column = (
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                onKeyUp={e => this.handleKeyPress(e, toggleTheme)}
              />
            );
          } else {
            column = (
              <div className="customHeaderLabel">{this.props.displayName}</div>
            );
          }

          if (this.props.enableMenu) {
            menu = (
              <div
                ref={menuButton => {
                  this.menuButton = menuButton;
                }}
                className="customHeaderMenuButton"
                onClick={this.onMenuClicked.bind(this)}
              >
                <i className={`fa ${this.props.menuIcon}`} />
              </div>
            );
          }

          return [column, menu];
        }}
      </GridContext.Consumer>
    );
  }

  renderCell = (val, func) => {
    return [column, menu];
  };

  onMenuClicked() {
    this.props.showColumnMenu(this.menuButton);
  }
}
