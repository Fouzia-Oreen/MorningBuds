import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
//import NavLink from './components/NavLink';
import PrivateRoute from './components/PrivateRoute';

import Footer from './components/Footer';
import Header from './components/Header';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import Contact from './pages/Contact';
import CreateCourse from './pages/CreateCourse';
import Dashboard from './pages/Dashboard';

function App() {


  return (
    <BrowserRouter>
      {/* <ScrollToTop /> */}
      {/* <NavLink /> */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        {/* <Route path='/search' element={<Search />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreateCourse />} />
          {/* <Route path='/update-post/:postId' element={<UpdatePost />} /> */}
        </Route>

        <Route path='/contact' element={<Contact />} />
        {/* <Route path='/post/:postSlug' element={<PostPage />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
      
  )
}

export default App
