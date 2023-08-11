import { Route, Routes } from 'react-router-dom'
import CreateForm from './components/CreateForm'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Users from "./components/Users"
import AnswerForm from "./components/AnswerForm"
function App() {
    const user=true
    return (
      <>
        {user && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
            //   <PrivateRoutes>
                <Home />
            //   </PrivateRoutes>
            }
          />
            <Route
            path="/dashboard"
            element={
            //   <PrivateRoutes>
                <Dashboard />
            //   </PrivateRoutes>
            }
          />
            <Route
            path="/form"
            element={
            //   <PrivateRoutes>
                <CreateForm/>
            //   </PrivateRoutes>
            }
          />
           <Route
            path="/dashboard/users"
            element={
            //   <PrivateRoutes>
                <Users/>
            //   </PrivateRoutes>
            }
          />
           <Route
            path="question/:uniqueLink"
            element={
            //   <PrivateRoutes>
                <AnswerForm/>
            //   </PrivateRoutes>
            }
          />
           {/* <Route
            path="/login"
            element={
            //   <PrivateRoutes>
                <Home />
            //   </PrivateRoutes>
            }
          />
           <Route
            path="/signup"
            element={
            //   <PrivateRoutes>
                <Home />
            //   </PrivateRoutes>
            }
          /> */}
          </Routes>
     
    </>
  )
}

export default App
