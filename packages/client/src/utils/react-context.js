import React, { Fragment, useState } from 'react';

/**
 * Plug in many providers with a single component.
 * Use:
 * const Providers = provideBundle(ThemeProvider, LanguageProvider);
 * <Providers>
 *  <YourComponent></YourComponent>
 * </Providers> 
 */
function provideBundle(...components) {
  return (bundleProps) => {
    const reversedComponents = components.reverse(); // Bottom up approach
    return reversedComponents.reduce((ChildComponent, ParentComponent) => {
      return () => (
        <ParentComponent>
          <ChildComponent />
        </ParentComponent>
      );
    }, props => <Fragment>{bundleProps.children}</Fragment>)();
  };
}

/**
 * Pass consumer arguments as component props.
 * Use:
 * function MyComponent({ context }) {
 *   return <div>{context.color}</div>
 * }
 * export default connect(ThemeProvider.Consumer, MyComponent)
 */
function connect(Consumer, Component) {
  return (props) => (
    <Consumer>
      {(args) => {{
        const { context, ...restProps } = props || {};
        const newContext = {
          ...context,
          ...args,
        };
        const newProps = {
          context: newContext,
          ...restProps,
        };
        return <Component {...newProps}></Component>;
      }}}
    </Consumer>
  );
}

/**
 * Hooks state backe to local storage
 * Use:
 * const [foo, setFoo] = useLocalStorage('key', 'default');
 */
function useLocalStorage(key, initialState) {
  function localStorageSet(state) {
    const json = JSON.stringify(state);
    window.localStorage.setItem(key, json);
  }
  function localStorageGet(key) {
    const json = window.localStorage.getItem(key);
    return JSON.parse(json);
  }

  let state = localStorageGet(key);
  if (state === null) {
    localStorageSet(initialState);
    state = initialState;
  }
  const [item, setItem] = useState(state);

  function proxySetItem(newState) {
    localStorageSet(newState);
    return setItem(newState);
  }
  return [item, proxySetItem];
}

export {
  provideBundle,
  connect,
  useLocalStorage,
};
