# <p align="center">Shared React variables</p>

Easy and comfortable React mutable state manager on hooks. It's extremely simple - you generate a hook in one line and then you can use it anywhere to operate with your state! Also you can have any number of such variables in your application.

## <p align="center">1. Exported types</p>

```ts
type ReactVariableHook<T> = (rerenderOnChange?: boolean) => T;
```

## <p align="center">2. API</p>

### <p align="center">createUseSharedVariable</p>
#### **Description**
Takes initial state as a parameter. Returns a hook can be imported and used anywhere in your application. When you use this hook, it returns you mutable global state. Whenever this state is changed component will be rerendered (this behaviour can be changed via *rerenderOnChange* flag in the hook).

#### **Signature**
```ts
<T extends object>(initialState: T) => ReactVariableHook<T>;
```

#### **Usage example**
```ts
// feel free to use this state hook anywhere!
const useTimer = createUseSharedVariable({ ticks: 0 });

export { useTimer }
```

## <p align="center">3. Package usage example</p>

https://codesandbox.io/s/react-shared-variables-example-f7feo7