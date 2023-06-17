export const resizeMouseDownEventHandler = (
  direction,
  start,
  updateFn,
  endFn
) => {
  document.onselectstart = () => false
  document.body.style.cursor =
    direction === 'l' || direction === 'r' ? 'ew-resize' : 'ns-resize'

  document.onmousemove = (event) => {
    let delta
    if (direction === 'l') {
      delta = start - event.clientX
    } else if (direction === 'r') {
      delta = event.clientX - start
    } else if (direction === 't') {
      delta = start - event.clientY
    } else if (direction === 'd') {
      delta = event.clientY - start
    }
    updateFn(delta)
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onselectstart = null
    document.body.style.cursor = 'default'
    endFn()
  }
}
