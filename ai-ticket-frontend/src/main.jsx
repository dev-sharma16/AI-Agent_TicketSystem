import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CheckAuth from './components/CheckAuth.jsx';
import Tickets from './pages/tickets.jsx';
import TicketDetailsPage from './pages/ticket.jsx';
import Login from './pages/login.jsx';
import SignUp from './pages/signup.jsx';
import Admin from './pages/admin.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route>
          path='/'
          element={
            <CheckAuth protected = {true}>
                <Tickets/>
            </CheckAuth>
          }
        </Route>

        <Route>
          path='/ticket/:id'
          element={
            <CheckAuth protected = {true}>
                <TicketDetailsPage/>
            </CheckAuth>
          }
        </Route>

        <Route>
          path='/login'
          element={
            <CheckAuth protected = {true}>
                <Login/>
            </CheckAuth>
          }
        </Route>

        <Route>
          path='/signup'
          element={
            <CheckAuth protected = {true}>
                <SignUp/>
            </CheckAuth>
          }
        </Route>

        <Route>
          path='/admin'
          element={
            <CheckAuth protected = {true}>
                <Admin/>
            </CheckAuth>
          }
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
