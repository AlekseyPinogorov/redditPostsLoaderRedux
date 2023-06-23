import React, { useEffect } from "react";
import './main.global.css';
import { hot } from "react-hot-loader/root";
import { Content } from "./shared/Content/Content";
import { Header } from "./shared/Header/Header";
import { Layout } from "./shared/Layout";
import { CardsListContainer } from "./shared/CardsListContainer";

import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { Provider, useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./store/reducers";
import { saveToken } from "./store/token/actions";
import thunk from "redux-thunk";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

function AppComponent() {
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(saveToken())
  }, [])

  return (
    <Layout>
      <Header />
      <Content>
        <CardsListContainer />
      </Content>
    </Layout>
  );
}

export const App = hot(() => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
));
