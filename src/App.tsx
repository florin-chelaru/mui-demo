import React from 'react';
import ThemeProvider from "./theme";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import DashboardApp from "./pages/DashboardApp";

function App () {
  return (
    <ThemeProvider>
      <BaseOptionChartStyle/>
      <DashboardApp/>
    </ThemeProvider>
  );
}

export default App;
