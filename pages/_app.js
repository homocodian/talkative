import "../styles/globals.css";
import configureStore from "../redux/store";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

export default MyApp;
