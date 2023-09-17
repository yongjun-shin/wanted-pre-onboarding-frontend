import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

export function Header() {

  return (
    <>
    <CustomLink to={'/'}><p>Home</p></CustomLink>
    </>
  );
}

export default Header;