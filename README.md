# shared-react-variables

Easy and comfortable React state manager.

## API

### **createUseSharedVariable**
Takes initial state as a parameter. Returns a hook can be imported and used anywhere in your application. When you use this hook, it returns you mutable global state. Whenever this state is changed component will be rerendered (this behaviour can be changed via *rerenderOnChange* flag).

#### Signature
```ts
function createUseSharedVariable<T extends object>(initialState: T): (rerenderOnChange?: boolean) => T
```

#### Usage example
```ts
// feel free to use this state hook anywhere!
const useTimer = createUseSharedVariable({ ticks: 0 });

export { useTimer }
```

## Example

https://codesandbox.io/s/react-shared-variables-example-f7feo7