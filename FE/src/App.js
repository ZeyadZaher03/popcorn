import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import ProductList from './pages/products/ProductList';
import ProductDetails from './pages/products/ProductDetails';
import ProductForm from './pages/products/ProductForm';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <Router>
      <Header />
      <main className='flex flex-col gap-10 mx-[20rem] mt-5'>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/products/create' element={<ProductForm />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/products/edit/:id' element={<ProductForm />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
