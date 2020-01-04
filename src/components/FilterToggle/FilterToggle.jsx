import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import DoubleArrow from '@material-ui/icons/DoubleArrow';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';

import { makeStyles } from '@material-ui/core/styles';

import './FilterToggle.scss';

const useStyles = makeStyles({
  arrow: {
    width: '2vw',
    height: '8vh',
    transition: 'all 0.3s'
  },
  arrowFlipped: {
    transform: 'scaleX(-1)'
  },
  filterBox: {
    width: '500px'
  }
});

export default function FilterToggle(props) {
  const [toggled, setToggled] = useState(false);
  const [apply, setApply] = useState(false);

  const classes = useStyles();

  const toggleChange = () => {
    !apply && !toggled && applyChanged();
    props.callback.toggleCounter(props.id, !toggled ? 1 : -1);
    setToggled(!toggled);
  };

  const applyChanged = () => {
    props.callback.toggleCheckbox(props.id, !apply);
    setApply(!apply);
  };

  return (
    <Box
      id={`filter_${props.id}`}
      display='flex'
      flexDirection='row'
      className={
        props.outerClass ? props.outerClass + ' box-index' : 'box-index'
      }
    >
      <Checkbox checked={apply} onChange={applyChanged} />
      <Slide direction='right' in={toggled} mountOnEnter unmountOnExit>
        {/*{toggled ? ( */}
        <div key={`props_${props.key}`}>{props.children}</div>
        {/* }) : (
          <>
             <Button onClick={toggleChange}>
            <DoubleArrow className={classes.arrow} color='primary' />
          </Button>
          <Typography style={{ display: 'inline' }}>
            {props.children.props.label}
          </Typography> 
           </> 
         ) */}
      </Slide>
      <Button onClick={toggleChange}>
        <DoubleArrow
          className={
            toggled ? [classes.arrow, classes.arrowFlipped] : classes.arrow
          }
          color={toggled ? 'primary' : 'secondary'}
        />
      </Button>
      {toggled || (
        <Typography>
          {props.children.props.label}
        </Typography>
      )}
    </Box>
  );
}
