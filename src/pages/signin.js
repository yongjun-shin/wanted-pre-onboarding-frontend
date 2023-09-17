import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Signin() {
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
        'Content-Type': 'application/json',
      };

      Axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin/', { email: email, password: password }, { headers })
        .then((response) => {
          console.log(response.data);

          if(response.status === 200){
            localStorage.setItem('jwt', response.data.jwt);
            console.log(response.data.jwt);
            navigate('/todo');
          }
          else{
            navigate('/signin');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" data-testid="email-input" placeholder="이메일" onChange={handleEmailChange}></input>
        <input type="password" data-testid="password-input" placeholder="비밀번호" onChange={handlePWChange}></input>
        <button type="submit" data-testid="signin-button" disabled={!isFormValid()}>로그인</button>
      </form>
    </>
  );
}

export default Signin;