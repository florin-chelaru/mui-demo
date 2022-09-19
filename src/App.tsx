import React from 'react';
import ThemeProvider from "./theme";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import DashboardApp from "./pages/DashboardApp";
import Grid2 from "@mui/material/Unstable_Grid2";


function App () {
  return (
    <ThemeProvider>
      <BaseOptionChartStyle/>
      <Grid2 container alignItems='center' height='100%'>
      {/*<Grid2 container display='flex' alignItems='center' height='100%'>*/}
        <Grid2 xs={12}>
          <DashboardApp/>
        </Grid2>
      </Grid2>
    </ThemeProvider>
  );
}

export default App;
