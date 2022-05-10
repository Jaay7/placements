import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { Typography, Button, Stack, useMediaQuery, Tab, Tabs } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import StudentDetails from './StudentDetails';
import SavedJobs from './../screens/SavedJobs';

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

const useStyles = makeStyles({
  profilepic: {
    width: 120,
    height: 120,
    borderRadius: 25,
    border: '3px solid #fff',
    marginTop: 20,
  },
  coverPic: {
    width: '100%',
    height: 100,
    position: 'absolute',
    backgroundColor: '#e7ffd6',
    left: 0, top: 0,
    zIndex: -1,
  }
})

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  marginTop: 30,
  '& .MuiTabs-indicator': {
    backgroundColor: '#859d76',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  marginRight: theme.spacing(1),
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#b5cea5',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#859d76',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#859d76',
  },
}));

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  marginTop: '10px',
  width: 'max-content',
  height: '40px',
  padding: '6px 30px',
  fontSize: 14,
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
  backgroundColor: '#f8f8f8',
  height: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px'
  }
}));

const StyledCard = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '50px 30px',
  width: '100%',
  maxWidth: '920px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // backgroundColor: '#e7ffd6',
  backgroundColor: '#fff',
  backdropFilter: 'blur(5px)',
  borderRadius: '8px',
  // boxShadow: '0px 0px 6px #00000030',
  overflow: 'hidden',
  marginTop: '20px',
  [theme.breakpoints.down('md')]: {
    padding: '20px 20px',
    minWidth: '100%',
  }
}));

const Profile = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    navigate('/login');
  }

  return (
    loading ? <div>Loading...</div> :
    error ? <div>Error! {error.message}</div> :
    <StyledDiv>
      <StyledCard>
        <div className={classes.coverPic}></div>
        <Stack direction={matchesMD ? "column" : "row"}>
          <img src="https://picsum.photos/200" alt="profile pic" className={classes.profilepic} />
          <Stack style={{marginTop: matchesMD ? 10 : 50, marginLeft: matchesMD ? 0 : 30}}>
            <Typography variant="h6">{data.me.username}</Typography>
            <Typography>{data.me.email}</Typography>
            <Typography>{data.me.fullName}</Typography>
          </Stack>
          <span style={{flex: 1}}></span>
          <ContainedButton style={{marginTop: matchesMD ? 10 : 60}}>Edit Profile</ContainedButton>
        </Stack>
        <AntTabs 
          value={value} 
          onChange={handleChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="ant example"
        >
          <AntTab label="My Details" {...a11yProps(0)} />
          <AntTab label="Saved Jobs" {...a11yProps(1)} />
        </AntTabs>
        <TabPanel value={value} index={0}>
          <StudentDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SavedJobs />
        </TabPanel>
      </StyledCard>
        <ContainedButton
          onClick={handleLogout}
        >
          Logout
        </ContainedButton>
    </StyledDiv>
  )
}

export default Profile