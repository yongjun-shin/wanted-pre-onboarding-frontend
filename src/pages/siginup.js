import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePWChange = (e) => {
    setPassword(e.target.value);
  };

  const isFormValid = () => {
    if (!email.includes('@') || password.length < 8) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    if (isFormValid()) {
      const headers = {
        'Content-Type': 'application/json'
      };

      Axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup/', {email: email, password: password,}, {headers}).then((response) => {
          console.log(response.data);
          navigate('/signin');
        }).catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" data-testid="email-input" value={email} onChange={handleEmailChange} placeholder="이메일" />
        <input type="password" data-testid="password-input" value={password} onChange={handlePWChange} placeholder="비밀번호" />
        <button type="submit" data-testid="signup-button" disabled={!isFormValid()}>회원가입</button>
      </form>
    </>
  );
}

export default Signup;