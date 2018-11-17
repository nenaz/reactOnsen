// @flow
import * as React from 'react';
import { identity } from 'lodash';

export const baseFieldAdapter = (Component) => {
  function FieldAdapter({
    input, meta = {}, normalize = identity, ...props
  }) {
    const value = meta.active ? input.value : normalize(input.value);
    const highlightError = !meta.valid && meta.touched ? meta.error : undefined;
    return (
      <Component
        {...input}
        value={value}
        error={highlightError}
        {...props}
      />
    );
  }

  FieldAdapter.displayName = `BaseFieldAdapter(${Component.displayName || Component.name})`;
  return FieldAdapter;
};
