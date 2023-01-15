/** @typedef {import('@mui/material').SxProps} sx*/
/** @typedef {import('@mui/material').Theme} theme*/

/** @type {sx} */
export const box = (/** @type {theme} */ theme) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar - 1,
  backgroundColor: 'background.paper',
  mb: 2,
  boxShadow: `0 0 ${theme.spacing(1)} ${theme.spacing(1)} ${theme.palette.background.paper}`,
});

/** @type {sx} */
export const spacerToolBar = { mt: -1, mb: 2 };

/** @type {sx} */
export const fabShrinkFix = { flexShrink: 0 };
