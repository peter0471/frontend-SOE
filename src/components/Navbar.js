import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Navbar() {

    const theme = createTheme({
        palette: {
          primary: {
            main: "#00000",
            contrastText: "#fff" //button text white instead of black
          },
          background: {
            default: "#3947i64"
          }
        }
      });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Smart Oto-Endoscope
          </Typography>
          <Button theme={theme} variant="outlined">
              Home
          </Button>
          <Button theme={theme} variant="outlined">
              Stats
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
