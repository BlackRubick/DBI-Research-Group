import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/templates/LoginModal';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isOpen] = useState(true);

  const handleLogin = (credentials) => {
    const success = login(credentials);
    if (success) {
      navigate('/');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <LoginModal
      isOpen={isOpen}
      onClose={handleClose}
      onLogin={handleLogin}
    />
  );
};

export default LoginPage;
