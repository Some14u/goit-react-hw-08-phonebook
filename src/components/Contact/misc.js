function spaceToNonbreaking(str) {
  return str.replace(/ /g, '\xa0');
}
export { spaceToNonbreaking };
