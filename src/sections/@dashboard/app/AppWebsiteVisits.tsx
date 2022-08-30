import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import {
  Autocomplete,
  Backdrop,
  Box,
  Card,
  CardClasses,
  Divider,
  IconButton,
  InputBase,
  Paper,
  SpeedDial, SpeedDialAction,
  SpeedDialIcon, TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
// components
import { BaseOptionChart } from '../../../components/chart';
import Grid2 from "@mui/material/Unstable_Grid2";
import { ElementType, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
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

  // var options = {
  //   series: [{
  //     name: 'XYZ MOTORS',
  //     data: dates
  //   }],
  //   chart: {
  //     type: 'area',
  //     stacked: false,
  //     height: 350,
  //     zoom: {
  //       type: 'x',
  //       enabled: true,
  //       autoScaleYaxis: true
  //     },
  //     toolbar: {
  //       autoSelected: 'zoom'
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   markers: {
  //     size: 0,
  //   },
  //   title: {
  //     text: 'Stock Price Movement',
  //     align: 'left'
  //   },
  //   fill: {
  //     type: 'gradient',
  //     gradient: {
  //       shadeIntensity: 1,
  //       inverseColors: false,
  //       opacityFrom: 0.5,
  //       opacityTo: 0,
  //       stops: [0, 90, 100]
  //     },
  //   },
  //   yaxis: {
  //     labels: {
  //       formatter: function (val) {
  //         return (val / 1000000).toFixed(0);
  //       },
  //     },
  //     title: {
  //       text: 'Price'
  //     },
  //   },
  //   xaxis: {
  //     type: 'datetime',
  //   },
  //   tooltip: {
  //     shared: false,
  //     y: {
  //       formatter: function (val) {
  //         return (val / 1000000).toFixed(0)
  //       }
  //     }
  //   }
  // };

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
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364}/>
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
