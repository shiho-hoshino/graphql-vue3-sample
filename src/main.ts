import "./style.css";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import { createApp } from "vue";

import router from "./router";
import App from "./App.vue";

const AUTH_TOKEN = import.meta.env.VITE_GRAPHQL_AUTH_TOKEN || "";
const httpEndpoint =
  import.meta.env.VITE_GRAPHQL_HTTP || "http://localhost:4000/graphql";
const httpLink = new HttpLink({
  uri: httpEndpoint,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

/**
 * Create the Apollo client
 */
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
});

/**
 * Create the Apollo provider
 */
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

/**
 * Add the provider to your app
 */
const app = createApp(App);
app.use(router);
app.use(apolloProvider);

app.mount("#app");
