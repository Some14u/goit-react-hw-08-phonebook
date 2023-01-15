const buildResolver =
  (validators, { ...options }) =>
  async values => {
    const res = { values, errors: {} };
    for (let [key, value] of Object.entries(values)) {
      if (!validators[key]) continue;
      if (validators.setValueAs) {
        values[key] = validators.setValueAs(value, options);
      }
      for (const [type, validator] of Object.entries(validators[key])) {
        const error = validator(values[key], options);
        if (error) {
          res.errors[key] = { type, message: error };
          break;
        }
      }
    }
    return validators.postprocessFn?.(res, options) || res;
    };

export { buildResolver };