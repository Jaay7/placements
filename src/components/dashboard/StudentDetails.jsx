import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { Typography, CircularProgress, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { EditRounded } from '@mui/icons-material';

const get_student_details = gql`
query StudentDetails {
  studentDetails {
    education
    currentCgpa
    experience
    skills
  }
}
`

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    // padding: '20px 20px'
    border: '2px solid #e2e2e2',
    borderRadius: 5,
    alignSelf: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 20px',
    alignItems: 'baseline',
    // borderBottom: '1px solid #e2e2e2',
  },
  labels: {
    paddingRight: '10px',
    width: 'max-content',
    minWidth: '150px',
    fontWeight: 500,
    marginRight: '10px',
  }
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

const StudentDetails = () => {
  const classes = useStyles();

  const { data, loading, error } = useQuery(get_student_details, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    pollInterval: 500
  });

  const [edit, setEdit] = React.useState(false);
  const [education, setEducation] = React.useState('');
  const [currentCgpa, setCurrentCgpa] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [skills, setSkills] = React.useState('');

  return (
    loading ? <StyledDiv>
      <CircularProgress color="inherit" />
    </StyledDiv> :
    error ? <div>Error! {error.message}</div> :
    <StyledDiv>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        Student Details
      </Typography>
      <div className={classes.form}>
        <IconButton 
          size='small'
          disableRipple 
          style={{position: 'relative', right: 0}}
          onClick={() => setEdit(!edit)}
        >
          <EditRounded color="inherit" />
          <Typography>{!edit ? 'Edit details' : 'Cancel'}</Typography>
        </IconButton>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Education</Typography>
          <TextField
            disabled={!edit}
            value={data.studentDetails.education}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Current CGPA</Typography>
          <TextField
            disabled={!edit}
            value={data.studentDetails.currentCgpa}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => setCurrentCgpa(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Experience</Typography>
          <TextField
            disabled={!edit}
            value={data.studentDetails.experience}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Skills</Typography>
          <TextField
            disabled={!edit}
            value={data.studentDetails.skills}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
      </div>
    </StyledDiv>
  )
}

export default StudentDetails