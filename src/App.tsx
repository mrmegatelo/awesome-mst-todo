import React from 'react';
import {Helmet} from 'react-helmet';
import { Provider, RootStore } from "./store";
import TodoList from "./components/TodoList";

const App = () =>  (
    <Provider value={RootStore} >
      <div id="app">
        <Helmet>
          <title>Awesome Todo</title>
          <link rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?fa></scriptmily=Roboto:100,300,400,700" />
          <script src="https://use.fontawesome.com/releases/v5.1.1/js/all.js" />
        </Helmet>
        <TodoList />
        <div id="app__background-accent"/>
      </div>
    </Provider>
  );

export default App;
