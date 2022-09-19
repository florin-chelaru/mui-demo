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
          <Grid2 xs={12} md={10} mdOffset={1} lg={10} lgOffset={1}>
            <AppWebsiteVisits/>
          </Grid2>
        </Grid2>
      </Container>
    </Page>
  );
}
