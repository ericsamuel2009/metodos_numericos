export function ADD_VISITED_VIEW(state, view) {
  if (state.visitedViews.some(v => v.path === view.path)) return
  state.visitedViews.push(
    Object.assign({}, view, {
      title: view.meta.title || 'no-name'
    })
  )
}

export function ADD_CACHED_VIEW(state, view) {
  if (state.cachedViews.includes(view.name)) return
  if (!view.meta.noCache) {
    state.cachedViews.push(view.name)
  }
}

export function DEL_VISITED_VIEW(state, view) {
  for (const [i, v] of state.visitedViews.entries()) {
    if (v.path === view.path) {
      state.visitedViews.splice(i, 1)
      break
    }
  }
}

export function DEL_CACHED_VIEW(state, view) {
  const index = state.cachedViews.indexOf(view.name)
  index > -1 && state.cachedViews.splice(index, 1)
}

export function DEL_OTHERS_VISITED_VIEWS(state, view) {
  state.visitedViews = state.visitedViews.filter(v => {
    return v.meta.affix || v.path === view.path
  })
}

export function DEL_OTHERS_CACHED_VIEWS(state, view) {
  const index = state.cachedViews.indexOf(view.name)
  if (index > -1) {
    state.cachedViews = state.cachedViews.slice(index, index + 1)
  } else {
    // if index = -1, there is no cached tags
    state.cachedViews = []
  }
}

export function DEL_ALL_VISITED_VIEWS(state) {
  // keep affix tags
  const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
  state.visitedViews = affixTags
}

export function DEL_ALL_CACHED_VIEWS(state) {
  state.cachedViews = []
}

export function UPDATE_VISITED_VIEW(state, view) {
  for (let v of state.visitedViews) {
    if (v.path === view.path) {
      v = Object.assign(v, view)
      break
    }
  }
}
