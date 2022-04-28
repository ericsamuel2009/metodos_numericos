import Cookies from 'js-cookie'
export function TOGGLE_SIDEBAR(state) {
  state.sidebar.opened = !state.sidebar.opened
  state.sidebar.withoutAnimation = false
  if (state.sidebar.opened) {
    Cookies.set('sidebarStatus', 1)
  } else {
    Cookies.set('sidebarStatus', 0)
  }
}

export function CLOSE_SIDEBAR(state, withoutAnimation) {
  Cookies.set('sidebarStatus', 0)
  state.sidebar.opened = false
  state.sidebar.withoutAnimation = withoutAnimation
}

export function TOGGLE_DEVICE(state, device) {
  state.device = device
}

export function SET_SIZE(state, size) {
  state.size = size
  Cookies.set('size', size)
}
