import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import DoubleArrow from '@material-ui/icons/DoubleArrow';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'

import './FilterToggle.scss';

export default function FilterToggle(props) {
  const [toggled, setToggled] = useState(false);
  const [apply, setApply] = useState(false);

  const toggleChange = () => {
    (!apply && !toggled) && setApply(true); 
    setToggled(!toggled);
  };

  const applyChanged = () => {
    setApply(!apply);
  };

  return (
    <Box display='flex' flexDirection='row' className={props.outerClass ? props.outerClass + ' box-index' : 'box-index'}>
      <Checkbox checked={apply} onChange={applyChanged} />
      <Button onClick={toggleChange}>
        <DoubleArrow color={toggled ? 'primary' : 'secondary'} />
      </Button>
      {toggled ? props.children : <Typography style={{display:'inline'}}>{props.children.props.label}</Typography>}
    </Box>
  );
}
