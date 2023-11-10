import { Route, Routes, useLocation} from "react-router-dom";
import './App.css'
import {NewsPage, ThemePage} from "./pages"
import {useEffect} from "react";
import {useTypedDispatch} from "./hooks/useTypedDispatch/useTypedDispatch.ts";
import { getTheme } from "./store/slices/themeSlice/themeSlice.ts";
import {Footer, Navbar} from "./components";

const App = () => {
  const location = useLocation()
  const dispatch = useTypedDispatch()
  
  const currentPage = location.pathname === '/' ? 'Новости' : 'Темы'
  
  useEffect(() => {
    const name = localStorage.getItem('theme')
    
    if (!name) {
      dispatch(getTheme('light'));
      localStorage.setItem('theme', 'light')
    } else {
      dispatch(getTheme(name));
    }
  }, [dispatch]);
  
  return (
    <div>
      <Navbar currentPage={currentPage}/>
        <Routes>
          <Route path='/' element={<NewsPage/>}/>
          <Route path='/themes' element={<ThemePage/>}/>
        </Routes>
      <Footer/>
    </div>
  );
};

export default App;
