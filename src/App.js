import Routes from './components/Routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './App.css';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
