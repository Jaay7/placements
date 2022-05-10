import React from 'react'
import { useQuery, gql, useMutation } from "@apollo/client";
import { CircularProgress, Typography, Stack, Chip, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { PlaceRounded, BookmarkBorderRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom'

const get_registered_jobs = gql`
  query UserAppliedJobs {
    userAppliedJobs {
      id
      jobTitle
      companyName
      companyLogo
      jobLocation
    }
  }
`;

const remove_application = gql`
  mutation RemoveAppliedJob($aplId: ID!) {
    removeAppliedJob(aplId: $aplId) {
      response
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

  const [removeApplication] = useMutation(remove_application, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
  });

  return (
    loading ? <CircularProgress size="small" color="inherit" style={{alignSelf: 'center'}} /> :
    error ? <Typography>Oops! Something went wrong, {error.message}</Typography> :
    <StyledDiv>
      <div style={{alignSelf: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h6">Registered Jobs</Typography>
        { data.userAppliedJobs.length > 0 ? data.userAppliedJobs.map(regJob => (
          <StyledCard key={regJob.id}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="column">
                <Typography variant="h6">{regJob.companyName}</Typography>
                <Typography variant="h5">{regJob.jobTitle}</Typography>
              </Stack>
              <div className={classes.imgLogo}>
                <img src={regJob.companyLogo} alt={regJob.companyName} height="100%" width="100%" />
              </div>
            </Stack>
            <Stack direction="row" alignItems="center" flexWrap={'wrap'} sx={{marginTop: 1}}>
              <PlaceRounded />
              <Typography variant="body1">{regJob.jobLocation.split('|').length}</Typography>
              {regJob.jobLocation.split('|').sort().slice(0, 3).map((item, index) => {
                return <Chip label={item} key={index} style={{marginTop: 5, marginLeft: 5}} />
              })}
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{marginTop: 2}}>
              <BookmarkBorderRounded style={{color: '#293934'}} />
              <div>
                <ContainedButton component={Link} to={`/jobs/${regJob.id}`}>View Job</ContainedButton>
                <ContainedButton style={{ opacity: 0.65}}
                  onClick={() => {
                    removeApplication({
                      variables: {
                        aplId: regJob.id
                      },
                    })
                  }}
                >Remove</ContainedButton>
              </div>
            </Stack>
          </StyledCard>
        )) : 
          <Typography>You haven't applied for any jobs</Typography>
        }
      </div>
    </StyledDiv>
  )
}

export default RegisteredJobs