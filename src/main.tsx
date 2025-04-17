import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Public.tsx'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/LoginPage.tsx'
import { Provider } from 'react-redux';
import { store } from './store/store.tsx'
import Register from './pages/auth/RegisterPage.tsx'
import RegistrationPending from './pages/auth/RegistrationPending.tsx'
import ResetPassword from './pages/auth/ResetPasswordRequestPage.tsx'
import SetNewPassword from './pages/auth/SetNewPasswordPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Dashboard from './pages/admin/Dashboard.tsx'
import DashboardPage from './pages/admin/DashboardPage.tsx'
import StudentsListPage from './pages/admin/students/StudentsListPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter >
      <Routes>
          <Route path='/' element={<App />} >
            <Route index element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='registration-pending' element={<RegistrationPending />} />
            <Route path='reset-password' >
              <Route index element={<ResetPassword />} />
              <Route path=':token' element={<SetNewPassword />} />
            </Route>
            <Route path='protected' element={<ProtectedRoute> <> <h1> Protected Route </h1> <Outlet />  </>  </ProtectedRoute>}  >
                <Route index element={<h1> Protected route child </h1>} />
            </Route>  
          </Route>
          {/* Admin Routes */}
          <Route path='/admin' element={<Dashboard />} >
              <Route index element={<DashboardPage />} />
              {/* Students */}
              <Route path='students'>
                  <Route index element={<StudentsListPage />} />
              </Route>
              {/* Not Found */}
              <Route path='*' element={<h1> Not Found  </h1>} />
          </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
