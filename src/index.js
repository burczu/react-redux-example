import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

const reducer = (state = {counter: 0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, counter: state.counter+1};
    case 'DECREMENT':
      return {...state, counter: state.counter-1};
    default:
      return state;
    }
};

const store = createStore(reducer, {counter: 0},window.devToolsExtension ? window.devToolsExtension() : undefined);

let Counter = ({counter, onIncrement, onDecrement}) => (
  <div>
    <div>{counter}</div>
    <button onClick={onDecrement}>-</button>
    <button onClick={onIncrement}>+</button>
  </div>
);

const mapStateToProps = (state) => {
  return {counter: state.counter};
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({type: 'INCREMENT'}),
    onDecrement: () => dispatch({type: 'DECREMENT'})
  }
};

Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <Counter />
  </Provider>
  , document.getElementById('root')
);