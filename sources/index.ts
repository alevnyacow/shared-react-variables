import { useCallback, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { deepProxy } from "@alevnyacow/deep-js-proxy";
import { useRerenderer } from "./use-rerenderer";
import { rerenderersList } from "./rerenderers-list";

type ReactVariableHook<T> = (rerenderOnChange?: boolean) => T;
type ReactVariableRewriteHook<T> = () => (
    generator: (oldState: T) => T
) => void;

function createUseSharedVariable<T extends object>(initialState: T) {
    const variableIdentifier = v4();
    let sharedVariable = deepProxy(
        [rerenderersList.fire],
        variableIdentifier
    )(initialState);

    const useSharedVariable: ReactVariableHook<T> = (
        rerenderOnChange = true
    ) => {
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
    };

    const useSharedVariableRewrite: ReactVariableRewriteHook<T> =
        () => (generator: (oldState: T) => T) => {
            sharedVariable = deepProxy(
                [rerenderersList.fire],
                variableIdentifier
            )(generator(sharedVariable)) as T;
            rerenderersList.fire(variableIdentifier);
        };

    return [useSharedVariable, useSharedVariableRewrite] as const;
}

export { createUseSharedVariable, ReactVariableHook, ReactVariableRewriteHook };
