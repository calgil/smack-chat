import React, { useState, createContext, useContext } from 'react';
import './App.css';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import ChatApp from './components/ChatApp/ChatApp';
import UserLogin from './components/UserLogin/UserLogin';
import UserCreate from './components/UserCreate/UserCreate';
import { AuthService, ChatService, SocketService } from './services';

const authService = new AuthService();
const chatService = new ChatService(authService.getBearerHeader);
const socketService = new SocketService(chatService);
export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
    chatService,
    socketService,
    appSelectedChannel: {},
    appSetChannel: (ch) => {
      setAuthContext({ ...authContext, appSelectedChannel: ch });
      chatService.setSelectedChannel(ch);
    }
  }

  const [authContext, setAuthContext] = useState(context);

  return (
    <UserContext.Provider value={authContext}>
        {children}
    </UserContext.Provider>
  )
}

const RequireAuth = ({ children, ...props }) => {
  //get auth.isLoggedIn
  let location = useLocation();
  const context = useContext(UserContext)
  if (!context.authService.isLoggedIn) {
    return <Navigate {...props} to="/login" state={{ from: location }} replace />
  } 
  return children;
}

function App() {
  return (
    <AuthProvider>
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserCreate />} />
            <Route
              path='/'
              element={
                <RequireAuth>
                  <ChatApp />
                </RequireAuth>
              }
              />
          </Routes> 
          <Outlet />
    </AuthProvider>
  );
}

export default App;
