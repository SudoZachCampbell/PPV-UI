import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import './PropertyListItem.scss';

const classes = {
  root: {
    width: '100%'
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0
  }
};

export default function PropertyListItem(props) {
  const [expanded, setExpanded] = React.useState(false);

  console.log(props);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fullDetailsClicked = () => {
    props.callback(props.property.id);
  };

  return (
    <ExpansionPanel
      expanded={expanded === `panel${props.id}`}
      onChange={handleChange(`panel${props.id}`)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${props.id}bh-content`}
        id={`panel${props.id}bh-header`}
      >
        <Typography className={classes.heading}>
          {props.property.address}, {props.property.postcode}
        </Typography>
        <Typography className={classes.secondaryHeading}>
          {props.property.rent}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box display='flex' flexDirection='row'>
          <div style={{ width: '60%', padding: '50px 50px' }}>
            <Typography>{props.property.description}</Typography>
            <Button
              style={{ margin: '30px 0' }}
              variant='contained'
              color='primary'
              onClick={fullDetailsClicked}
            >
              Full Details
            </Button>
          </div>
          <div style={{ width: '40%' }}>
            <img
              style={{ width: '100%', height: 'auto' }}
              src={props.property.images[0]}
            />
          </div>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
