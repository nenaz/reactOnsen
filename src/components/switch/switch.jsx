import * as React from 'react';
import {
  Switch as SwitchO,
} from 'react-onsenui';

export const Switch = (props) => (
  <div className="nzOptionsSwitchBlock">
    <SwitchO
      checked={props.checked}
      onChange={props.handleChangeSwitch}
      title={props.title}
    />
  </div>
);
