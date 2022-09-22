import { Backdrop, Box, Card, Container, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'
import Page from '../components/Page';
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import {
  ChartOptions,
  ChartThemeProvider,
  DateWindow,
  LineChart,
  MATERIAL_PALETTE,
  NavigationControl,
  NavigationProvider,
  SampleDataStore,
  ScatterPlot,
  StockDataTable,
  useClientRect
} from "@florin-chelaru/smart-charts";
import * as d3 from "d3";
import { useRef, useState } from "react";
import { ParentSize } from "@visx/responsive";
import SearchBar from "../components/chart/SearchBar";

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
    label: 'GOOGL'
  },
  yAxis: {
    format: d3.format(',.0%'),
    ticks: scatterPlotTicks,
    label: 'AAPL'
  },
  xGrid: { ticks: scatterPlotTicks },
  yGrid: { ticks: scatterPlotTicks }
}

export default function Dashboard () {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const store = new SampleDataStore()
  const data = useRef<StockDataTable>(store.stockDataTable)
  const initialDateWindow = new DateWindow('2022-03-01', '2022-05-01')

  const [navigationControl, navigationControlRef] = useClientRect()
  const chartHeight = 364

  return (
    <ChartThemeProvider palette={MATERIAL_PALETTE}>
      <NavigationProvider data={data.current} initialDateWindow={initialDateWindow}>
        <Page title="Dashboard" sx={{}}>
          <Container maxWidth="xl">
            <Grid2 container spacing={{ xs: 2, md: 1, lg: 3 }}>
              <Grid2 xs={12} xl={10} xlOffset={1}>
                <SearchBar options={symbols}/>
              </Grid2>
              <Grid2 xs={12} md={8} xl={7} xlOffset={1}>
                <Card>
                  <Box sx={{ p: { xs: 0, xl: 3 }, pb: 1, pt: 0 }} dir="ltr">
                    <NavigationControl ref={navigationControlRef}/>
                    <ParentSize>
                      {({ width, height }) => (
                        <LineChart width={width} height={chartHeight} options={lineChartOptions}/>
                      )}
                    </ParentSize>
                  </Box>
                </Card>
              </Grid2>
              <Grid2 xs={12} md={4} xl={3}>
                <Card>
                  <Box sx={{ p: { xs: 0, xl: 3 }, pb: 1, pt: 0 }} dir="ltr">
                    <ParentSize>
                      {({ width, height }) => (
                        <ScatterPlot
                          width={width}
                          height={(navigationControl?.height || 0) + chartHeight}
                          options={scatterPlotOptions}
                          xSymbol={store.stockDataTable.symbols[1]}
                          ySymbol={store.stockDataTable.symbols[0]}
                        />)}
                    </ParentSize>
                  </Box>
                </Card>
              </Grid2>
            </Grid2>
          </Container>
          <Backdrop
            open={open}
            sx={{ color: '#fff' }}
          />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
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
        </Page>
      </NavigationProvider>
    </ChartThemeProvider>
  )
    ;
}
