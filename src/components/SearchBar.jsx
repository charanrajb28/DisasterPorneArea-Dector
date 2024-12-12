import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ setLocation }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query.trim() === '') return; // Prevent search if the input is empty

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=ba8138cd4144e8d3bba8475f7c0f4a54`
      );
      const { lat, lon } = response.data.coord;
      // Update the location with the fetched coordinates
      setLocation([lat, lon]);
    } catch (error) {
      console.error('Error fetching location:', error);
      // Optionally handle the error, like showing an alert or message to the user
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        // maxWidth: '500px',
        margin: 'auto',
        padding: 2,
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a location"
        InputProps={{
          style: { backgroundColor: '#fff' },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
        sx={{
          height: '56px',
          textTransform: 'none',
          fontWeight: 'bold',
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
