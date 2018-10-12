import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
		  menuItem: {
		    '&:focus': {
		      backgroundColor: theme.palette.primary.main,
		      '& $primary, & $icon': {
		        color: theme.palette.common.white,
		      },
		    },
		  },
		  primary: {},
		  icon: {},
		});

class MenuBar extends Component {

	render(){
		const { classes, handleNextIdeas } = this.props;
		return(
		
				<MenuList>
					<MenuItem className={classes.menuItem}>
			          <ListItemText classes={{ primary: classes.primary }} inset primary="Draw Cluster" />
			        </MenuItem>
			        <MenuItem className={classes.menuItem} onClick={handleNextIdeas}>
			          <ListItemText classes={{ primary: classes.primary }} inset primary="Next Ideas" />
			        </MenuItem>
			    </MenuList>
		
			)
	}
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);