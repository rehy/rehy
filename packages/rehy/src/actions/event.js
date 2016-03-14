export const listenToEvent = (name, mapEventToAction, opts) => {
  const {
    filter = () => true,
    target = window,
    args = [],
  } = opts

  return (dispatch) => {
    function handleEvent(e) {
      if (filter(e)) {
        dispatch(mapEventToAction(e))
      }
    }

    target.addEventListener(name, handleEvent, ...args)
    return () => target.removeEventListener(name, handleEvent, ...args)
  }
}
