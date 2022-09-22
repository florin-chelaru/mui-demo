import { Autocomplete, Box, Card, Container, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  options: string[]
}

const SearchBar = ({ options }: SearchBarProps) => {
  return (
    <Card sx={{ mt: 2,  '&:hover': { boxShadow: 4 } }}>
      <Box  sx={{ p: '2px 16px 2px 4px', display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <SearchIcon/>
        </IconButton>

        <Autocomplete
          multiple
          id="tags-outlined"
          options={options}
          freeSolo
          fullWidth
          // getOptionLabel={(option) => option.title}
          defaultValue={[options[0]]}
          filterSelectedOptions
          renderInput={(params) => {
            const { InputLabelProps, InputProps, ...rest } = params;
            return <InputBase {...params.InputProps} {...rest} />;
          }}
        />
      </Box>
    </Card>)
}
export default SearchBar