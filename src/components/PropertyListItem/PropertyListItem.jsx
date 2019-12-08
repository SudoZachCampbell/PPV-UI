import React from 'react';

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

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <ExpansionPanel
        expanded={expanded === `panel${props.property.id}`}
        onChange={handleChange(`panel${props.property.id}`)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${props.property.id}bh-content`}
          id={`panel${props.property.id}bh-header`}
        >
          <Typography className={classes.heading}>
            {props.property.address}, {props.property.postcode}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {props.property.rent}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{props.property.description}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}
