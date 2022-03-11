import { useCallback, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { deepProxy } from "@alevnyacow/deep-js-proxy";
import { useRerenderer } from "./use-rerenderer";
import { rerenderersList } from "./rerenderers-list";

type ReactVariableHook<T> = (rerenderOnChange?: boolean) => T;

function createUseSharedVariable<T extends object>(
    initialState: T
): ReactVariableHook<T> {
    const variableIdentifier = v4();
    const sharedVariable = deepProxy(
        [rerenderersList.fire],
        variableIdentifier
    )(initialState);

    function useSharedVariable(rerenderOnChange = true) {
        const rerenderer = useRerenderer();
        const memoizedRerenderer = useCallback(rerenderer, []);
        const rerenderIdentifier = useRef(v4());
        useEffect(() => {
            rerenderersList.add(
                variableIdentifier,
                rerenderIdentifier.current,
                rerenderOnChange ? memoizedRerenderer : () => {}
            );
            return () => {
                rerenderersList.remove(
                    variableIdentifier,
                    rerenderIdentifier.current
                );
            };
        }, []);

        return sharedVariable;
    }

    return useSharedVariable;
}

export { createUseSharedVariable, ReactVariableHook };
