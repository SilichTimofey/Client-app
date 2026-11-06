import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import accounts from '../../redux/Data/accounts';
import appStore from '../../redux/store/appStore';

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(appStore.getUser());

  useEffect(() => {
    const unsubscribe = appStore.subscribe((data) => {
      setUser(data.user);
    });
    return unsubscribe;
  }, []);

  if (user) {
    return <Navigate to="/orders" replace />;
  }

  const handleLogin = (loginValue, password) => {
    const found = accounts.find(
      (acc) => acc.login === loginValue && acc.password === password
    );
    if (found) {
      appStore.login({ login: found.login, name: found.name });
      navigate('/orders');
      return true;
    }
    return false;
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default LoginPage;
