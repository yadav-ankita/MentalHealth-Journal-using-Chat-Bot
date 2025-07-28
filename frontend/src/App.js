import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Profile from './pages/Profile';
import MyPlan from './pages/MyPlan';
import HealthSpot from './pages/HealthSpot';
import {  Routes,Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './pages/PrivateRoute';
function App() {
  return (
      <Routes>
          <Route path='/'  element={<Home/>}>Home</Route>
          <Route path='/Dashboard' element={
            <PrivateRoute>
               <Dashboard/>
            </PrivateRoute>
           }>Dashboard</Route>
          <Route path='/About' element={<About/>}>About</Route>
          <Route path='/Login' element={<Login/>}>Login</Route>
          <Route path='/Signup' element={<Signup/>}>SignUp</Route>
          <Route path='/Profile' element={
            <PrivateRoute>
               <Profile/>
            </PrivateRoute>
            }>Profile</Route>
          <Route path='/MyPlan' element={
            <PrivateRoute> <MyPlan/></PrivateRoute>
           }>MyPlan</Route>
          <Route path='/HealthSpot' element={
            <PrivateRoute>
                <HealthSpot/>
            </PrivateRoute>
        }>FindDoctors</Route>
      </Routes>
  )
}
export default App;
