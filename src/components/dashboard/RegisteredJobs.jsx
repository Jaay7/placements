import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { CircularProgress, Typography, Stack, Chip, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { PlaceRounded, BookmarkBorderRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom'

const get_registered_jobs = gql`
  query RegisteredJobs {
    registeredJobs {
      job {
        id
        jobTitle
        companyName
        companyLogo
        jobLocation
      }
      user {
        id
        username
      }
      createdAt
    }
  }
`;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 20px'
  },
  imgLogo: {
    width: 100,
    height: 50,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
})

const StyledCard = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 30px',
  width: '100%',
  minWidth: '720px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#e7ffd6',
  backdropFilter: 'blur(5px)',
  borderRadius: '8px',
  marginTop: '20px',
  [theme.breakpoints.down('md')]: {
    padding: '20px 20px',
    minWidth: '100%',
  }
}));

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  width: 'max-content',
  padding: '6px 20px',
  outline: 'none',
  border: '2px solid #293934',
  borderRadius: '50px',
  backgroundColor: '#293934',
  textTransform: 'Capitalize',
  color: '#f2f2f2',
  transition: 'all 0.3s ease-in-out',
  fontWeight: 500,
  '&:hover': {
    color: '#293934da',
    backgroundColor: 'transparent',
    border: '2px solid #293934',
  }
}));

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 60px',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px'
  }
}));


const RegisteredJobs = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(get_registered_jobs, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    pollInterval: 500
  });

  return (
    loading ? <CircularProgress size="small" color="inherit" style={{alignSelf: 'center'}} /> :
    error ? <Typography>Oops! Something went wrong.</Typography> :
    <StyledDiv>
      <div style={{alignSelf: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h6">Registered Jobs</Typography>
        {data.registeredJobs.map(regJob => (
          <StyledCard key={regJob.job.id}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="column">
                <Typography variant="h6">{regJob.job.companyName}</Typography>
                <Typography variant="h5">{regJob.job.jobTitle}</Typography>
              </Stack>
              <div className={classes.imgLogo}>
                <img src={regJob.job.companyLogo} alt={regJob.job.companyName} height="100%" width="100%" />
              </div>
            </Stack>
            <Stack direction="row" alignItems="center" flexWrap={'wrap'} sx={{marginTop: 1}}>
              <PlaceRounded />
              <Typography variant="body1">{regJob.job.jobLocation.split('|').length}</Typography>
              {regJob.job.jobLocation.split('|').sort().slice(0, 3).map((item, index) => {
                return <Chip label={item} key={index} style={{marginTop: 5, marginLeft: 5}} />
              })}
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{marginTop: 2}}>
              <BookmarkBorderRounded style={{color: '#293934'}} />
              <div>
                <ContainedButton component={Link} to={`/jobs/${regJob.job.id}`}>View Job</ContainedButton>
                <ContainedButton style={{ opacity: 0.65}}>Remove</ContainedButton>
              </div>
            </Stack>
          </StyledCard>
        ))}
      </div>
    </StyledDiv>
  )
}

export default RegisteredJobs