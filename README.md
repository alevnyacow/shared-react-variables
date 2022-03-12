# Shared React variables

![npm](https://img.shields.io/npm/v/@alevnyacow/shared-react-variables)
![GitHub](https://img.shields.io/github/license/alevnyacow/shared-react-variables)
![GitHub last commit](https://img.shields.io/github/last-commit/alevnyacow/shared-react-variables)
![npm](https://img.shields.io/npm/dm/@alevnyacow/shared-react-variables)
![GitHub top language](https://img.shields.io/github/languages/top/alevnyacow/shared-react-variables)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## ✨ **About**

Shared React variables provide you easy and comfortable mutable state management based on hooks. It's extremely simple - you generate a hook in one line and then you can use it anywhere to operate with your state! Also you can have any number of such state variables in your application. 

```tsx
// creating timer state hook
const useTimer = createUseSharedVariable({ ticks: 0 });

const Timer = () => {
    // using timer state
    const timer = useTimer();
    useEffect(() => {
        setInterval(() => {
            // state is mutable
            timer.ticks++;
        }, 1000);
    }, []);

    return <div>{timer.ticks}</div>
};

const AnotherTimerWithSameState = () => {
    // using same timer state in another component
    const timer = useTimer();

    return <div>{timer.ticks}</div>
};
```

## 🔍 **Exported types**

```ts
type ReactVariableHook<T> = (rerenderOnChange?: boolean) => T;
```

## 📖 **API**

### <p align="center">createUseSharedVariable</p>
#### Description
Takes initial state as a parameter. Returns a hook can be imported and used anywhere in your application. When you use this hook, it returns you mutable global state. Whenever this state is changed component will be rerendered (this behaviour can be changed via *rerenderOnChange* flag in the hook).

#### Signature
```ts
<T extends object>(initialState: T) => ReactVariableHook<T>;
```

#### Usage example
```ts
// feel free to use this state hook anywhere!
const useTimer = createUseSharedVariable({ ticks: 0 });

export { useTimer }
```

## 💡 **Package usage example**

https://codesandbox.io/s/react-shared-variables-example-f7feo7