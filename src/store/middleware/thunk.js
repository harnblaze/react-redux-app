export function thunk({ getState, dispatch }) {
  return function warpDispatch(next) {
    return function handleAction(action) {
      if (typeof action === "function") {
        action(dispatch, getState);
      } else {
        return next(action);
      }
    };
  };
}
