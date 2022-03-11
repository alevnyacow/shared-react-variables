import { useState } from "react";

export function useRerenderer() {
    const [, setNewDummyObject] = useState({});
    return () => setNewDummyObject({});
}
