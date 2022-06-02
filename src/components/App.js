import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from "../routes/PrivateRoute";
import '../styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
            <Route path="result" element={<PrivateRoute><Result /></PrivateRoute>} />

            {/* wrong routes */}
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
