import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CustomLink = styled(Link)`
  text-decoration: none;

`;

export function Home() {

  return (
    <>
      <CustomLink to={'/signin'}><button>로그인</button></CustomLink>
      <CustomLink to={'/signup'}><button>회원가입</button></CustomLink>
    </>
  );
}

export default Home;