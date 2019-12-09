import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import DoubleArrow from '@material-ui/icons/DoubleArrow';
import Checkbox from '@material-ui/core/Checkbox';

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
    <>
      <Checkbox checked={apply} onChange={applyChanged} />
      <Button onClick={toggleChange}>
        <DoubleArrow color={toggled ? 'primary' : 'secondary'} />
        {toggled ? props.children : props.children.props.label}
      </Button>
    </>
  );
}
