import { useCallback, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { deepProxy } from "@alevnyacow/deep-js-proxy";
import { useRerenderer } from "./use-rerenderer";
import { rerenderersList } from "./rerenderers-list";

type ReactVariableHook<T> = (rerenderOnChange?: boolean) => T;
type ReactVariableRewriteHook<T> = () => (
    generator: (oldState: T) => T
) => void;

/**
 * Generates a tuple of two hooks: first hook is a React variable generator,
 * second hook can be used to rewrite a whole variable (you don't need this, most likely).
 *
 * @param initialState Initial state of a shared React variable.
 */
function createUseSharedVariable<T extends object>(initialState: T) {
    const variableIdentifier = v4();
    let sharedVariable = deepProxy(
        [rerenderersList.fire],
        variableIdentifier
    )(initialState);

    /**
     * React hook returning shared React variable.
     *
     * @param rerenderOnChange Flag can be used to prevent a rerender on React variable changes, when set to false.
     */
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

    /**
     * React hook returning function can be used to rewrite whole associated variable.
     */
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
