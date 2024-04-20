import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './scss/app.scss';
import Header from './components/Header'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

export const AppContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();
  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />

            </Routes>


          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
