# React18

## Official Home
[https://react.dev/](https://react.dev/)

## Official blog about React18
[https://zh-hans.react.dev/blog/2022/03/29/react-v18](https://zh-hans.react.dev/blog/2022/03/29/react-v18)

## createRoot (replace render)

```js
// before
const container = document.getElementById('root'); // [!code --]
ReactDOM.render(<App />, container);  // [!code --]

// after
const container = document.getElementById('root');  // [!code ++]
const root = ReactDOM.createRoot(container);  // [!code ++]
root.render(<App/>);
```

## flushSync

`flushSync` lets you force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.
```js
flushSync(() => {
  setSomething(123);
});
// By this line, the DOM is updated.
```

## hydrateRoot (replace hydrate)

## hooks

### useId
`useId` is a React Hook for generating unique IDs that can be passed to accessibility attributes.

#### Usage
- Generating unique IDs for `accessibility attributes`
- Generating IDs for `several related elements`
- Specifying a `shared prefix` for all generated IDs
- Using the same ID prefix on the `client` and the `server`

```js
 const passwordHintId = useId();
```

### use 👻
### useCallback
### useContext
### useDebugValue
### useDeferredValue
### useEffect
### useImperativeHandle
### useInsertionEffect
### useLayoutEffect
### useMemo
### useOptimistic 👻
### useReducer
### useRef
### useState
### useSyncExternalStore
### useTransition
### useFormState 👻
### useFormStatus 👻