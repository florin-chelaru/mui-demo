import { Autocomplete, Box, Card, Divider, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import AccountPopover from "./AccountPopover";


interface SearchBarProps {
  options: string[]
}

const SearchBar = ({ options }: SearchBarProps) => {
  return (
    <Card sx={{ mt: { xs: 1, sm: 2 }, '&:hover': { boxShadow: 4 } }}>
      <Box sx={{ p: '2px 16px 2px 4px', display: 'flex', alignItems: 'center' }}>
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
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical"/>
        <AccountPopover/>
      </Box>
    </Card>)
}
export default SearchBar