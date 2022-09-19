import {
  ChartOptions,
  ChartThemeProvider,
  DateWindow,
  LineChart,
  MATERIAL_PALETTE,
  NavigationProvider,
  SampleDataStore, ScatterPlot,
  StockDataTable
} from "@florin-chelaru/smart-charts";
import { ParentSize } from "@visx/responsive";
import * as d3 from 'd3'
// @mui
import {
  Autocomplete,
  Backdrop,
  Box,
  Card,
  IconButton,
  InputBase,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// components
import Grid2 from "@mui/material/Unstable_Grid2";
import { useRef, useState } from "react";
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

// ----------------------------------------------------------------------

const actions = [
  { name: 'Custom action' },
  { icon: <FileCopyIcon/>, name: 'Copy' },
  { icon: <SaveIcon/>, name: 'Save' },
  { icon: <PrintIcon/>, name: 'Print' },
  { icon: <ShareIcon/>, name: 'Share' },
];

const symbols = [
  'GOOG',
  'AAPL',
  'MSFT',
  'VOO'
];

export default function AppWebsiteVisits ({ ...other }: any) {
  const store = new SampleDataStore()
  const initialDateWindow = new DateWindow('2022-03-01', '2022-05-01')
  const lineChartTicks = (size: number) => size / 120
  const scatterPlotTicks = (size: number) => size / 60
  const lineChartOptions: ChartOptions = {
    xAxis: { ticks: lineChartTicks },
    yAxis: { ticks: lineChartTicks },
    xGrid: { ticks: lineChartTicks },
    yGrid: { ticks: lineChartTicks }
  }

  const scatterPlotOptions: ChartOptions = {
    xAxis: {
      format: d3.format(',.0%'),
      ticks: scatterPlotTicks,
      label: store.stockDataTable.symbols[1]
    },
    yAxis: {
      format: d3.format(',.0%'),
      ticks: scatterPlotTicks,
      label: store.stockDataTable.symbols[0]
    },
    xGrid: { ticks: scatterPlotTicks },
    yGrid: { ticks: scatterPlotTicks }
  }
  const searchBarRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const data = useRef<StockDataTable>(store.stockDataTable)

  return (
    <Card {...other}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Grid2 container margin={0}>
          <Grid2 xs={12}>
            <Card ref={searchBarRef} sx={{ boxShadow: 0, '&:hover': { boxShadow: 4 } }}>
              <Paper elevation={0} component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <SearchIcon/>
                </IconButton>

                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={symbols}
                  freeSolo
                  fullWidth
                  // getOptionLabel={(option) => option.title}
                  defaultValue={[symbols[0]]}
                  filterSelectedOptions
                  renderInput={(params) => {
                    const { InputLabelProps, InputProps, ...rest } = params;
                    return <InputBase {...params.InputProps} {...rest} />;
                  }}
                />
              </Paper>
            </Card>
          </Grid2>
        </Grid2>
      </Box>

      <Box sx={{ p: 3, pb: 1, pt: 0 }} dir="ltr">
        <ChartThemeProvider palette={MATERIAL_PALETTE}>
          <NavigationProvider data={data.current} initialDateWindow={initialDateWindow}>
            <Grid2 container margin={0}>
              <Grid2 xs={12} md={8} sx={{ p: 0 }}>
                <ParentSize>
                  {({ width, height }) => (
                    <LineChart width={width} height={364} options={lineChartOptions}/>
                  )}
                </ParentSize>
              </Grid2>
              <Grid2 xs={12} md={4} sx={{ p: 0 }}>
                <ParentSize>
                  {({ width, height }) => (
                    <ScatterPlot
                      width={width}
                      height={364}
                      options={scatterPlotOptions}
                      xSymbol={store.stockDataTable.symbols[1]}
                      ySymbol={store.stockDataTable.symbols[0]}
                    />)}
                </ParentSize>
              </Grid2>
            </Grid2>
          </NavigationProvider>
        </ChartThemeProvider>
      </Box>

      <Backdrop
        open={open}
        sx={{ color: '#fff' }}
      />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon/>}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Card>
  );
}
