import { Navigate } from 'react-router-dom'
import { useGlobalContext } from '../context/AppContext';
import Loader from '../components/Loader'
const PrivateRoute = ({ children }) => {
    const { user,authChecking } = useGlobalContext();
     if (authChecking) {
        <div style={{marginTop:'300px'}}>
            <Loader />
            <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>Checking Authentication...</h2>
            <p style={{ textAlign: 'center', color: 'gray' }}>Please Wait.</p>
        </div>
      }
    return user ? children : <Navigate to="/"/>
}
export default PrivateRoute;
