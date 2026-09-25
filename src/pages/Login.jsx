import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Авторизация пока в разработке! Используйте кнопку "Войти без авторизации"');
  };

  return (
    <div>
      <div>
        <h2>Вход в систему</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input 
              type="text" 
              placeholder="Логин" 
              value={login}
              onChange={e => setLogin(e.target.value)} 
              required 
            />
          </div>
          <br />
          <div>
            <input 
              type="password" 
              placeholder="Пароль" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <br />
          <button type="submit">Войти</button>
        </form>
        
        <br />
        <hr />
        <br />
        
        <button onClick={() => navigate('/dashboard')}>
          Войти без авторизации (Dev)
        </button>
      </div>
    </div>
  );
}

export default Login;