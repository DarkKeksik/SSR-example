import React from "react";
import { render } from "react-dom";

import "./styles/commons.scss";
import { MainLayout } from "./layouts";
import Counter from "./components/Counter";

const App = () => (
    <MainLayout>
        <Counter />
    </MainLayout>
);

render(<App/>, document.getElementById("reactApp"))