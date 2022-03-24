# Shared React variables

![npm](https://img.shields.io/npm/v/@alevnyacow/shared-react-variables)
![GitHub](https://img.shields.io/github/license/alevnyacow/shared-react-variables)
![GitHub last commit](https://img.shields.io/github/last-commit/alevnyacow/shared-react-variables)
![npm](https://img.shields.io/npm/dm/@alevnyacow/shared-react-variables)
![GitHub top language](https://img.shields.io/github/languages/top/alevnyacow/shared-react-variables)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## ✨ **About**

Shared React variables provide you easy and comfortable mutable state management based on hooks.

## 🔍 **Example**

```tsx
import { createUseSharedVariable } from "@alevnyacow/shared-react-variables"; 

const [useTimer] = createUseSharedVariable({ ticks: 0 });

const Timer = () => {
    const timer = useTimer();
    useEffect(() => {
        setInterval(() => {
            timer.ticks++;
        }, 1000);
    }, []);

    return <div>{timer.ticks}</div>
};

const AnotherTimerWithSameState = () => {
    // using the same variable in another component
    const timer = useTimer();

    return <div>{timer.ticks}</div>
};
```

## 💡 **Codesandbox**

https://codesandbox.io/s/react-shared-variables-example-f7feo7