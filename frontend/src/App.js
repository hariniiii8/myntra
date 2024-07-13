
import './App.css';
import DesignForm from './Components/DesignForm/DesignForm';

import Display from './Components/Display/Display.jsx';
import DOM from './Pages/DOM/DOM.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './Pages/Category/Category.jsx';
import LoginSignup from './Components/LoginSignup/LoginSingup.jsx';

function App() {
  return (
    <div>
    <BrowserRouter>
    {/* <Navbar/> */}
   
    
    
    <Routes>
      <Route path='/' element={<DOM />}/>
      <Route path='/pants' element={<Category category="pants" />}/>
      <Route path='/tops' element={<Category  category="tops"/>}/>
      <Route path='/dresses' element={<Category  category="dresses" />}/>
      <Route path='/ethnic' element={<Category  category="ethnic" />}/>
      <Route path='/submitdesign' element={<DesignForm/>}/>
      <Route path='/login' element={<LoginSignup />}/> 
      <Route path='/increasevotes' element={<Category category="tops" />}/> 
    </Routes>
    </BrowserRouter>
      
        
      
    </div>
  );
}

export default App;
