import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Signin.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserInfo from '../UserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';

const Icon=styled.img`
    height: 100px;
    width: 100px;
`
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        TaskRoom
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function SignInSide(props) {
  const navigateTo=useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [failed , setFailed] = useState(false);
  const [isVisble,setVisible]  = useState(false);
const [loading, setLoading] = useState(false);



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

const submitHandler = async (event) => {
  event.preventDefault();
 
  if (!email || !password) {
    console.log("failed");
    setVisible(true);
    setFailed(false);

  
    return;
  }

  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
    };

    const {data} = await axios.post(
      `http://localhost:${PORT}/api/user/login`,
      { email, password },
      config
    );
    setLoading(true);
    dispatch(setCredentials(data));
  localStorage.setItem("userInfo", JSON.stringify(data))
     data.isAdmin? navigateTo("/admin-dashboard"):navigateTo("/dashboard");
    
  } catch (error) {
    console.log(error);
    if(error.response.status===401){
      setFailed(true);
      setVisible(false);
    }

  }
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(../images/19321.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            
          >

              <Icon src="/images/taskroomicon.png" alt="Custom Icon" />
       
            <Typography component="h1" variant="h5">
            <strong><span style={{color:"#384454"}}>Sign in</span></strong>
            </Typography>
            <Box component="form" noValidate  method='POST' sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address or Username"
                name="email"
                autoComplete="off"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            <span style={{display: isVisble? 'inline':'none',color:'red'}}>Please fill all the fields</span>
            <span style={{display: failed? 'inline':'none',color:'red'}}>Please verify your credentials</span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="bg-white"
                onClick={submitHandler}
                disabled={loading}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </ThemeProvider>
  );
}
