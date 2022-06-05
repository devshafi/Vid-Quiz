import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/App.css';
import PrivateOutlet from './../routes/PrivateOutlet';
import PublicOutlet from './../routes/PublicOutlet';
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

            <Route path="/*" element={<PublicOutlet />}>
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>

            {/* Not recommended */}
            {/* <Route path="quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} /> 
            <Route path="result" element={<PrivateRoute><Result /></PrivateRoute>} /> */}

            <Route path="/*" element={<PrivateOutlet />} >
              <Route path="quiz/:id" element={<Quiz />} />
              <Route path="result/:id" element={<Result />} />
            </Route>


          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
