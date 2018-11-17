import * as React from 'react';
// import { Field } from 'redux-form';
import { Input } from 'react-onsenui';

export const TextInput = (props) => (
  <Input
    className={props.className}
    modifier={props.modifier}
    float
    placeholder={props.placeholder}
    {...props}
  />
);

// const renderField = ({ input, custStyle }) => (
//   <Input
//     className={custStyle.className}
//     modifier={custStyle.modifier}
//     float
//     placeholder={custStyle.placeholder}
//     {...input}
//   />
// );

// export const TextInput = (props) => (
//   <Field
//     name={props.name}
//     component={renderField}
//     type="text"
//     custStyle={{
//       modifier: 'underbar',
//       className: props.className,
//       placeholder: props.placeholder,
//     }}
//   />
// );
