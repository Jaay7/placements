import React from "react";
import { AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Slide, IconButton, Box, SwipeableDrawer, Icon, useMediaQuery } from "@mui/material"
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Global } from "@emotion/react";
import { styled, useTheme } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: '#6c8780',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const useStyles = makeStyles({
  tabbar: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none'
  },
  navLink: {
    color: '#ffffff90',
    textDecoration: 'none',
    padding: '4px 10px',
    '&:hover': {
      color: '#ffffffaa',
    }
  },
  mobileBoxItem: {
    padding: "6px 16px", 
    cursor: 'pointer', 
    width: 'max-content', 
    borderRadius: "50px", 
    display: 'flex', 
    flexDirection: "row", 
    margin: "6px", 
    justifyContent: "center", 
    alignItems: "center", 
    textAlign: "center", 
    border: "1.5px solid #eea852",
    backgroundColor: "#eea85210",
    color: "#eea852",
    textDecoration: 'none'
  },
  activeNavLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '4px 10px',
  }
})

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const BottomItems = [
  {name: "Home", icon: "home", route: "/home"},
  {name: "Registered Jobs", icon: "account_balance", route: "/my-jobs"},
  {name: "Student Details", icon: "credit_card", route: "/my-details"},
  {name: "Profile", icon: "subject", route: "/profile"},
]

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  let location = useLocation();

  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return(
    <React.Fragment>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <HideOnScroll {...props}>
        <AppBar className={classes.tabbar}>
          <Toolbar style={{backgroundColor: '#293934'}}>
          { !matches && <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          }
            <Typography variant="h6">Placements</Typography>
            <span style={{flexGrow: 0.1}}></span>
            { matches && 
              <>
                <Link className={location.pathname === '/home' ? classes.activeNavLink : classes.navLink} to="/home">Home</Link>
                <Link className={location.pathname === '/my-jobs' ? classes.activeNavLink : classes.navLink} to="/my-jobs">My Jobs</Link>
                <Link className={location.pathname === '/my-details' ? classes.activeNavLink : classes.navLink} to="/my-details">My Details</Link>
                <span style={{flexGrow: 1}}></span>
                <Link className={location.pathname === '/profile' ? classes.activeNavLink : classes.navLink} to="/profile">Profile</Link>
              </>
            }
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      { !matches && 
        <SwipeableDrawer
          // container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: 'text.primary', fontSize: 18 }}>
              {
                location.pathname === '/home' ? 'Home' : 
                location.pathname === '/my-jobs' ? 'Registered Jobs' :
                location.pathname === '/my-details' ? 'Student Details' :
                location.pathname === '/profile' ? 'Profile' : 'Placements'
              }
              </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
            }}
          >
            <div style={{display: 'flex', flexWrap: 'wrap', alignSelf: 'center', width: '100%'}}>
            {BottomItems.map((item, index) => (
              <Box component={Link} to={item.route} key={index} className={classes.mobileBoxItem} onClick={ toggleDrawer(false)}>
                <Icon baseClassName="material-icons-round" style={{color: '#eea852'}}>{item.icon}</Icon>
                <Typography style={{color: '#eea852', marginLeft: 6}}>{item.name}</Typography>
              </Box>
            ))}
            </div>
            {/* <Skeleton variant="rectangular" height="100%" /> */}
          </StyledBox>
        </SwipeableDrawer>
      }
    </React.Fragment>
  )
}

export default Header