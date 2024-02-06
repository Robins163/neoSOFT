import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import { Provider } from 'react-redux';
import { ProtectedRoute } from './components/ProtectedRoutes/protected-routes';
import store from './store';
import TaskManagement from './pages/TaskManagement/TaskManagement';


function App() {
  return (
    <Provider store={store}>
      <div className='App'>
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute outlet={<Dashboard />} />} />
        <Route path="/taskmanagement" element={<ProtectedRoute outlet={<TaskManagement />} />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/signin" element={ <SignIn />} />
      </Routes>
      </div>
    </Provider>
   
  );
}



export default App;
