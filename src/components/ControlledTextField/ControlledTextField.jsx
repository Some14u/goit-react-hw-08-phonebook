import { TextField } from '@mui/material';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';

const ControlledTextField = forwardRef(({ apiError, ...props }, ref) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  // This is the current input in the apiError
  const apiErrorInput = apiError?.value?.find(
    item => item.element === props.name
  );

  /**
   *  Removes current input element error status on Blur.
   *  Api errors are such type of errors that don't require
   *  to retain the error status
   */
  const onBlur = event => {
    if (!!apiErrorInput) {
      apiError.dispatch({ type: 'clearField', name: props.name });
    }
    return field.onBlur(event);
  };

  return (
    <TextField
      error={!!error || !!apiErrorInput}
      {...props}
      {...field}
      // I decided to show errors in the label element
      label={error?.message || apiErrorInput?.message || props.label}
      onBlur={onBlur}
      inputRef={ref}
    />
  );
});

export default ControlledTextField;
