import React from "react";
import { hydrate } from "react-dom";

import "./styles/commons.scss";
import { MainLayout } from "./layouts";
import Counter from "./components/Counter";

const App = () => (
    <MainLayout>
        <Counter />
    </MainLayout>
);

hydrate(<App/>, document.getElementById("reactApp"))

export default App;