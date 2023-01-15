/** @typedef {import('@mui/material').SxProps} sx*/
/** @typedef {import('@mui/material').Theme} theme*/

/** @type {sx} */
export const typography = (/** @type {theme} */ theme) => ({
  pt: 1,
  textAlign: "center",
  [theme.breakpoints.down('sm')]: {
    textAlign: "left",
  },
});
