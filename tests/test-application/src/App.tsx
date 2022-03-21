import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createUseSharedVariable } from "@alevnyacow/shared-react-variables";

const [useCounter, useCounterRewrite] = createUseSharedVariable({ ticks: 0 });

function App() {
    const counter = useCounter();
    const counterRewrite = useCounterRewrite();
    useCounterRewrite();
    return (
        <div className="App">
            <header className="App-header">
                <p
                    onClick={() => {
                        counter.ticks = 5;
                    }}
                >
                    Set to five.
                </p>
                <p
                    onClick={() => {
                        counterRewrite(() => ({ ticks: 0 }));
                    }}
                >
                    Reset with counterRewrite.
                </p>
                <h2 data-testid="test">{counter.ticks}</h2>
            </header>
        </div>
    );
}

export default App;
