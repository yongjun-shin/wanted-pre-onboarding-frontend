import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CustomLink = styled(Link)`
  text-decoration: none;
`;

export function Home() {
  const [loginout, setLoginout] = useState(<CustomLink to={'/signin'}><button>로그인</button></CustomLink>);

  const checkLoginStatus = () => {
    const jwt = localStorage.getItem('jwt');
    
    if (jwt) {
      setLoginout(<CustomLink to={'/'}><button onClick={btnClick}>로그아웃</button></CustomLink>);
    } else {
      setLoginout();
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const btnClick = () => {
    localStorage.removeItem('jwt');
    checkLoginStatus();
  };

  return (
    <>
      <CustomLink to={'/signin'}><button>로그인</button></CustomLink>
      <CustomLink to={'/signup'}><button>회원가입</button></CustomLink>
      {loginout}
    </>
  );
}

export default Home;