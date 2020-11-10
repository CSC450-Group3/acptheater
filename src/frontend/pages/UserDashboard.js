import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    backgroundColor: '#1890FF',
    color: 'black',
  },
}));

export default function LabTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar className={classes.menuButton} position="static">
          <TabList className={classes.menuButton} onChange={handleChange} aria-label="dashboard tabs" centered>
            <Tab label="Tickets" value="1" />
            <Tab label="Profile" value="2" />
            <Tab label="History" value="3" />
            <Tab label="Messaging" value="4" />
          </TabList>
        </AppBar>
        <TabPanel value="1"><marquee behavior="scroll" direction="left">UPCOMING SHOWINGS - LIVE LINKS</marquee></TabPanel>

        <TabPanel value="2"><div class="column" className="userCreationColumn">

          <form action="home.html" method="post">
            <div>
              <input
                //value={email}
                type="email"
                placeholder="Email"
                name="email"
                required
                className={classes.input}
              //onChange={event => {
              //setEmail(event.target.value);
              //setSameEmailError(false); 
              //}
              //} 
              />
            </div>
            <p></p>
            <p></p>
            <div>
              <input
                type="text"
                placeholder="First Name"
                name="fName"
                required
                className={classes.input}
              />
              <input
                //value={lastName}
                type="text"
                placeholder="Last Name"
                name="lName"
                required
                className={classes.input}
              />
            </div>
            <p></p>
            <p></p>
            <div>
              <input
                //value={birthday} 
                type="date"
                required
                className={classes.input}
              //onChange={event => setBirthday(event.target.value)}
              />
            </div>
            <p></p>
            <p></p>
            <div>
              <button>Update</button>
            </div>
          </form>
        </div></TabPanel>

        <TabPanel value="3"><marquee behavior="scroll" direction="left">HISTORY</marquee></TabPanel>

        <TabPanel value="4"><marquee behavior="scroll" direction="left">MESSAGING</marquee></TabPanel>
      </TabContext>
    </div>
  );
}