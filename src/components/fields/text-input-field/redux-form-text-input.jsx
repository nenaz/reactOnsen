import * as React from 'react';
import { Field } from 'redux-form';
import { TextInputField } from './text-input-field';

export const ReduxFormTextInput = (props) => {
  console.log();
  return (
    <Field
      {...props}
      name={props.name}
      component={TextInputField}
      // type="text"
      // custStyle={{
      //   modifier: 'underbar',
      //   className: props.className,
      //   placeholder: props.placeholder,
      // }}
    />
  );
};