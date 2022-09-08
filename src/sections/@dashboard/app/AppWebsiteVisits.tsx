import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import {
  ChartOptions,
  ChartTheme,
  DataView,
  DateWindow,
  LineChart,
  MATERIAL_PALETTE,
  Navigation,
  SampleDataStore
} from "@florin-chelaru/smart-charts";
import { ParentSize } from "@visx/responsive";
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
import { BaseOptionChart } from '../../../components/chart';
import Grid2 from "@mui/material/Unstable_Grid2";
import { useRef, useState } from "react";
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

interface ChartDatum {
  name: string
  type: string
  fill: string
  data: number[]
}

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

export default function AppWebsiteVisits ({ title, subheader, chartLabels, chartData, ...other }: any) {
  const store = new SampleDataStore()
  const initialDateWindow = new DateWindow('2022-03-01', '2022-05-01')
  const options: ChartOptions = {
    xGrid: { disabled: true }
  }
  const searchBarRef = useRef<HTMLDivElement>(null);
  const chartOptions: any = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i: ChartDatum) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    legend: {
      position: 'right',
      horizontalAlign: 'right',
      floating: true
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number | undefined) => {
          if (typeof y !== 'undefined') {
            return `$${y.toFixed(0)}`;
          }
          return y;
        },
      },
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card {...other}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Grid2 container margin={0}>
          <Grid2 sm={12}>
            <Card ref={searchBarRef}
                  sx={{ boxShadow: 0, '&:hover': { boxShadow: 4 } }}
            >
              <Paper
                elevation={0}
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
              >
                <IconButton
                  sx={{ p: '10px' }} aria-label="menu"
                  onClick={() => {
                    // if (cardRef.current?.style) {
                    //   cardRef.current.style.boxShadow = searchBoxElevated ? theme.shadows[0] : theme.shadows[4];
                    //   searchBoxElevated = !searchBoxElevated
                    // }

                  }}
                >
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
        {/*<ReactApexChart type="line" series={chartData} options={chartOptions} height={364}/>*/}
        <ParentSize>
          {({ width, height }) => (
            <ChartTheme palette={MATERIAL_PALETTE}>
              <DataView view={store.stockDataTable.view(initialDateWindow).asPercentChangeOfFirstRow}>
                <Navigation>
                  <LineChart width={width} height={364} options={options}/>
                  {/* <LineChart width={600} height={400} margin={chartMargin} /> */}
                </Navigation>
              </DataView>
            </ChartTheme>
          )}
        </ParentSize>
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
