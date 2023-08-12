import { Route, Routes } from 'react-router-dom'
import CreateForm from './components/CreateForm'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Users from "./components/Users"
import AnswerForm from "./components/AnswerForm"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import useAuth from "./hooks/useAuth"
function App() {
    const {user}=useAuth()
    return (
      <>
        {user && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Home />
             </PrivateRoutes>
            }
          />
            <Route
            path="/dashboard"
            element={
              <PrivateRoutes>
                <Dashboard />
             </PrivateRoutes>
            }
          />
            <Route
            path="/form"
            element={
              <PrivateRoutes>
                <CreateForm/>
             </PrivateRoutes>
            }
          />
           <Route
            path="/dashboard/users/:uniqueLink"
            element={
              <PrivateRoutes>
                <Users/>
              </PrivateRoutes>
            }
          />
           <Route
            path="question/:uniqueLink"
            element={
              <PrivateRoutes>
                <AnswerForm/>
              </PrivateRoutes>
            }
          />
           <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
                </PublicRoutes>
    
            }
          />
           <Route
            path="/signup"
            element={
              <PublicRoutes>
                <Signup />
            </PublicRoutes>
            }
          />
          </Routes>
     
    </>
  )
}

export default App
