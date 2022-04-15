import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';

const get_user_data = gql`
  query {
    me {
      id
      username
      email
      fullName
    }
  }
`;

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  marginTop: '10px',
  padding: '6px 30px',
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  borderRadius: '50px',
  border: '1.5px solid #293934',
  textTransform: 'Capitalize',
  color: '#293934',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#293934da',
    color: '#f2f2f2',
  }
}));

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 60px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px'
  }
}));

const Profile = () => {
  
  const { data, loading, error } = useQuery(get_user_data, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    pollInterval: 500
  });

  const handleLogout = async() => {
    await localStorage.removeItem('token');
    return <Navigate to="/login" />
  }

  return (
    loading ? <div>Loading...</div> :
    error ? <div>Error! {error.message}</div> :
    <StyledDiv>
      <Typography>{data.me.id}</Typography>
      <Typography>{data.me.username}</Typography>
      <Typography>{data.me.email}</Typography>
      <Typography>{data.me.fullName}</Typography>
      <ContainedButton
        onClick={handleLogout}
      >
        Logout
      </ContainedButton>
    </StyledDiv>
  )
}

export default Profile