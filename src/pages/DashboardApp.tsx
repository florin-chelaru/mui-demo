// @mui
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'
// components
import Page from '../components/Page';
// sections
import { AppWebsiteVisits, } from '../sections/@dashboard/app';
import { CustomTheme } from "../theme";
import { CustomPalette } from "../theme/palette";

// ----------------------------------------------------------------------

export default function DashboardApp () {
  const theme = useTheme<CustomTheme>();
  const palette = theme.palette as CustomPalette;


  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'GOOG',
                  type: 'line',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'AAPL',
                  type: 'line',
                  fill: 'solid',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'MSFT',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid2>
        </Grid2>
      </Container>
    </Page>
  );
}
