import * as React from 'react';
import { Fab } from 'react-onsenui';

export const RoundButton = (props) => (
  <Fab
    position={props.position}
    onClick={props.onClick}
  >
    <span className={props.iconClassName} />
  </Fab>
);