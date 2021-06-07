import React, { useState } from "react";
import "./styles.scss";

const Counter = () => {
    const [ count, setCount ] = useState(0);

    return (
        <section className="counter">
            <h3 className="counter__title">Your number: { count }</h3>

            <article className="counter__panel">
                <button onClick={ e => setCount( count - 1 ) }>Decrement</button>
                <button onClick={ e => setCount( count + 1 ) }>Increment</button>
            </article>
        </section>
    )
};

export default Counter;