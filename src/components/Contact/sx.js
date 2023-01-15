/** @typedef {import('@mui/material').SxProps} sx*/
/** @typedef {import('@mui/material').Theme} theme*/

/** @type {sx} */
export const paper = selected => (/** @type {theme} */ theme) => ({
  backgroundColor: 'transparent',
  width: '100%',
  boxShadow: theme.shadows[selected ? 10 : 0],
});

/** @type {sx} */
export const button = selected =>
  selected
    ? {
        cursor: 'default',
        userSelect: 'text',
        '&:focus-within': {
          background: 'none',
        },
      }
    : undefined;

/** @type {sx} */
export const text = {
  py: 1 / 2,
};
