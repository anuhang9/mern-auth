import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { About } from './pages/aboout'
import { Contact } from './pages/contact'
import { Login } from './pages/login'
import { Registration } from './pages/registration'
import { Navbar } from './layouts/Navbar'

function App() {

  return (
    <div>
    <Navbar/>
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>
    </Routes>
    </div>
    </div>
  )
}

export default App
