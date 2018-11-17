// @flow
import { compose } from 'redux';
import { baseFieldAdapter } from './base-field-adapter';


export const fieldAdapter = compose(
  baseFieldAdapter,
);
