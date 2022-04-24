import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Stack, Button, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { PlaceRounded, BookmarkBorderRounded } from '@mui/icons-material';

const get_job = gql`
  query Job($id: ID!) {
    job(id: $id) {
      id
      companyName
			companyDescription
			companyLogo
			companyWebsite
			companyEmail
			companyPhone
			companyAddress
			companyCity
			companyState
			jobTitle
			jobDescription
			jobRequirements
			jobSalary
			jobLocation
			jobType
			jobCategory
			jobMinQualifications
			jobPrefQualifications
			jobExperience
			jobEducation
			jobSkills
			jobStartDate
			jobCreatedAt
			jobUpdatedAt
    }
  }
`;

const useStyles = makeStyles({
  imgLogo: {
    width: 100,
    height: 50,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
})

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 60px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px'
  }
}));

const StyledCard = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 30px',
  width: '100%',
  maxWidth: '1080px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#eea85230',
  backdropFilter: 'blur(5px)',
  borderRadius: '8px',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px'
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

const ViewJob = (props) => {
  const classes = useStyles();
  let { id } = useParams();
  const { data, loading, error } = useQuery(get_job, {
    variables: { id: id },
    pollInterval: 500
  });
  return (
    loading ? <StyledDiv>
      <CircularProgress color="inherit" style={{alignSelf: 'center'}} />
    </StyledDiv> :
    error ? <StyledDiv>Oops! Something went wrong.</StyledDiv> :
    <StyledDiv>
      <StyledCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="column">
              <Typography variant="h6">{data.job.companyName}</Typography>
              <Typography variant="h5">{data.job.jobTitle}</Typography>
            </Stack>
            <div className={classes.imgLogo}>
              <img src={data.job.companyLogo} alt={data.job.companyName} height="100%" width="100%" />
            </div>
          </Stack>
          <Stack direction="row" alignItems="center" flexWrap={'wrap'} sx={{marginTop: 1}}>
            <PlaceRounded />
            {data.job.jobLocation.split('|').map((item, index) => {
              return <Chip label={item} key={index} style={{marginTop: 5, marginLeft: 5}} />
            })}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{marginTop: 2}}>
            <BookmarkBorderRounded style={{color: '#293934'}} />
            <ContainedButton>Apply Job</ContainedButton>
          </Stack>
          <Divider sx={{marginTop: 3, marginBottom: 2}} />
          <Stack direction="column">
            <Typography variant="h6" sx={{marginTop: 2, marginBottom: 1}}>Job Description</Typography>
            {data.job.jobDescription.split('|').map((item, index) => {
              return <Typography variant="body1" key={index}>{item}</Typography>
            })}
          </Stack>
          <Stack direction="column">
            <Typography variant="h6" sx={{marginTop: 2, marginBottom: 1}}>Job Requirements</Typography>
            {data.job.jobRequirements.split('|').map((item, index) => {
              return <Typography variant="body1" key={index}>{item}</Typography>
            })}
          </Stack>
          <Stack direction="column">
            <Typography variant="h6" sx={{marginTop: 2, marginBottom: 1}}>Job Qualifications</Typography>
            {data.job.jobPrefQualifications.split('|').map((item, index) => {
              return <Typography variant="body1" key={index}>{item}</Typography>
            })}
          </Stack>
          <Stack direction="column">
            <Typography variant="h6" sx={{marginTop: 2, marginBottom: 1}}>Education</Typography>
            {data.job.jobEducation.split('|').map((item, index) => {
              return <Typography variant="body1" key={index}>{item}</Typography>
            })}
          </Stack>
        </StyledCard>
    </StyledDiv>
  )
}

export default ViewJob