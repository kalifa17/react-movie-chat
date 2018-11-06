import AppBar from "@material-ui/core/AppBar";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const TopBar = ({title}) => (
  <AppBar position="fixed">
    <Toolbar>
      {/* <FontAwesomeIcon className={classes.leftIcon} icon={faGlobe} /> */}
      <Typography variant="h6" color="inherit">
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default TopBar;
