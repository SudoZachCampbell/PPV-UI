import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import DoubleArrow from '@material-ui/icons/DoubleArrow';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

import './FilterToggle.scss';
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles({
  box: {
    width: '6.5vw',
    height: '6.5vw',
    backgroundColor: 'orange'
  }
});

export default function FilterToggle(props) {
  const [toggled, setToggled] = useState(false);
  const [apply, setApply] = useState(false);

  const classes = useStyles();

  const toggleChange = () => {
    !apply && !toggled && setApply(true);
    props.callback(!toggled ? 1 : -1);
    setToggled(!toggled);
  };

  const applyChanged = () => {
    setApply(!apply);
  };

  return (
    <Box
      display='flex'
      flexDirection='row'
      className={
        props.outerClass ? props.outerClass + ' box-index' : 'box-index'
      }
    >
      <div className={classes.box}>
        <Checkbox checked={apply} onChange={applyChanged} />
        <Button onClick={toggleChange}>
          <DoubleArrow color={toggled ? 'primary' : 'secondary'} />
        </Button>
      </div>
      {toggled ? (
        props.children
      ) : (
        <Typography style={{ display: 'inline' }}>
          {props.children.props.label}
        </Typography>
      )}
    </Box>
  );
}
