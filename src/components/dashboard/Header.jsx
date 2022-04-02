import React from "react";
import { AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Slide, IconButton, Box, SwipeableDrawer, Icon, useMediaQuery } from "@mui/material"
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Global } from "@emotion/react";
import { styled, useTheme } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: '#eea852',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const useStyles = makeStyles({
  tabbar: {
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '4px 10px',
    '&:hover': {
      color: '#ffffff90',
    }
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
  {name: "Home", icon: "home", route: "/"},
  {name: "Registered Jobs", icon: "account_balance", route: "/my-jobs"},
  {name: "Student Details", icon: "credit_card", route: "/my-details"},
  {name: "Profile", icon: "subject", route: "/profile"},
]

const Header = (props) => {
  const classes = useStyles();
  let collegeid = localStorage.getItem('collegeid');
  const theme = useTheme();

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
          <Toolbar style={{backgroundColor: '#eea852'}}>
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
            <span style={{flexGrow: 1}}></span>
            { matches && 
              <>
                <Link className={classes.navLink} to="/">Home</Link>
                <Link className={classes.navLink} to="/">My Jobs</Link>
                <Link className={classes.navLink} to="/">My Details</Link>
                <Link className={classes.navLink} to="/">Profile</Link>
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
            <Typography sx={{ p: 2, color: 'text.primary', fontSize: 18 }}>Placements</Typography>
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
              <Box component={Link} to={item.route} key={index} sx={{ padding: "2px 6px", cursor: 'pointer', width: 'max-content', borderRadius: "8px", display: 'flex', flexDirection: "row", margin: "6px", justifyContent: "center", alignItems: "center", textAlign: "center", boxShadow: "3px 3px 8px #12121220", backgroundColor: '#eea852', textDecoration: 'none'}} onClick={ toggleDrawer(false)}>
                <IconButton>
                  <Icon baseClassName="material-icons-round" style={{color: '#fff'}}>{item.icon}</Icon>
                </IconButton>
                <Typography style={{color: '#fff'}}>{item.name}</Typography>
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