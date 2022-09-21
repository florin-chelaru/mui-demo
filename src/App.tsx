import React from 'react';
import ThemeProvider from "./theme";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import Dashboard from "./pages/Dashboard";
import Grid2 from "@mui/material/Unstable_Grid2";


function App () {
  return (
    <ThemeProvider>
      <BaseOptionChartStyle/>
      <Grid2 container display='flex' alignItems='center' height='100%'>
        <Grid2 sm={12}>
          <Dashboard/>
        </Grid2>
      </Grid2>
    </ThemeProvider>
  );
}

export default App;
