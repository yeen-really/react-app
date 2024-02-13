import './App.css';
import About from './Pages/About/About';
import Auth from './Pages/Auth/Auth';
import SignUp from './Pages/Auth/SignUp';
// import ErrorPage from './Pages/Error/ErrorPage';
import NavBar from './Pages/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Places from './Pages/Places/Places';
import Error from './Pages/Error/Error';
import CityInfo from './Pages/Cities/CityInfo';
// import SignUp from './Pages/Auth/Components/SignUp';

function App() {
  return (
<>
<BrowserRouter>
      <NavBar/>
          <Routes>
            <Route path='/about' element={<About/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/places' element={<Places/>}/>
            {/* <Route path='/errorpage' element={<ErrorPage/>}/>
            <Route path='/signup' element={<SignUp/>}/>  */}
            {/* <Route path='/register' element={<SignUp/>}/> */}
            <Route path='/errorpage' element={<Error/>}/>
            <Route path='/cityinfo' element={<CityInfo/>}/>


          </Routes>
      </BrowserRouter>
</>
  );
}

export default App;
