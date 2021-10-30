import React, { Component } from "react";
export const GridContext = React.createContext({
  editingHeaderId: undefined,
  toggleHeaderName: () => {}
});
