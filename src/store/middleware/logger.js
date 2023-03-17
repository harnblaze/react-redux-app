export function logger({ getState, dispatch }) {
  return function warpDispatch(next) {
    return function handleAction(action) {
      console.log(getState);
      console.log(dispatch);
      console.log(next);
      console.log(action);
      return next(action);
    };
  };
}
