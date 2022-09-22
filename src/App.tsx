import React from 'react';
import Dashboard from "./pages/Dashboard";
import Grid2 from "@mui/material/Unstable_Grid2";
import CustomThemeProvider from "./theme/CustomThemeProvider";

function App () {
  return (
    <CustomThemeProvider>
      <Grid2 container display='flex' alignItems='center' height='100%'>
        <Grid2 xs={12}>
          <Dashboard/>
        </Grid2>
      </Grid2>
    </CustomThemeProvider>
  );
}

export default App;
