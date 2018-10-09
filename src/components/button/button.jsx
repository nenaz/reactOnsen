// @flow
import * as React from 'react';
import { Button as ButtonOUI } from 'react-onsenui';

type ButtonProps = {
  modifier?: string,
  disabled?: boolean,
  ripple?: boolean,
  onClick: () => any,
  label: string,
  type?: string,
};

export const Button = (props: ButtonProps) => (
  <ButtonOUI
    {...props}
    onClic={props.onClick}
  >{props.label}</ButtonOUI>
);
