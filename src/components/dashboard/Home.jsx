import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { Typography } from '@mui/material';

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

const Home = () => {
  
  const { data, loading, error } = useQuery(get_user_data, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    pollInterval: 500
  });

  return (
    loading ? <div>Loading...</div> :
    error ? <div>Error! {error.message}</div> :
    <div>
      <Typography>{data.me.id}</Typography>
      <Typography>{data.me.username}</Typography>
      <Typography>{data.me.email}</Typography>
      <Typography>{data.me.fullName}</Typography>
    </div>
  )
}

export default Home