import { useState } from "react";

type Rerenderer = () => void;

/**
 * React hook returning a function that causes a rerender when called.
 */
function useRerenderer() {
    const [, setNewDummyObject] = useState({});
    return (() => setNewDummyObject({})) as Rerenderer;
}
export { useRerenderer, Rerenderer };
