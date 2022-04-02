import React from 'react'
import { TextField, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate, Link } from "react-router-dom"
import { styled } from '@mui/material/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 300
  },
  links: {
    color: '#eea852',
    textDecoration: 'none',
  }
})

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#eea852',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#eea852',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#eea852',
    },
  },
});

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  marginTop: '10px',
  padding: '10px 30px',
  fontSize: 14,
  height: 'max-content',
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  border: 'none',
  backgroundColor: '#eea852',
  textTransform: 'Capitalize',
  color: '#464646',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#eea152',
  }
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <Typography variant="h6">Login</Typography>
        <StyledTextField label="Email" margin="normal" />
        <StyledTextField label="Password" margin="normal" />
        <Link to="/login" className={classes.links} style={{alignSelf: 'flex-end'}}>Forgot Password?</Link>
        <ContainedButton
          onClick={() => navigate('/')}
        >Login</ContainedButton>
        <Typography style={{marginTop: 10}}>Don't have an account? <Link to="/signup" className={classes.links}>Signup</Link></Typography>
      </div>
    </div>
  )
}

export default Login