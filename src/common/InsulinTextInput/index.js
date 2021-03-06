import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const InsulinTextInput = props => (
  <TextField
    fullWidth
    label={props.label}
    margin="dense"
    onChange={props.onChange}
    required
    type="number"
    value={props.value}
    inputProps={{
      min: 0,
      step: 1
    }}
  />
);

InsulinTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default InsulinTextInput;
