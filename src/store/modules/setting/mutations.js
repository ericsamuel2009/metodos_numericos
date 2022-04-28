export function CHANGE_SETTING(state, { key, value }) {
  // eslint-disable-next-line no-prototype-builtins
  if (state.hasOwnProperty(key)) {
    state[key] = value
  }
}
