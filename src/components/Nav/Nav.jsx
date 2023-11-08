import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '@/assets/icons/logo.svg';

function Nav() {
  return (
    <NavWrapper>
      <Link to="/">
        <NavTitle>
          <Logo src={logo} alt="로고 이미지" />
          <Title>Rolling</Title>
        </NavTitle>
      </Link>
      <Link to="/post">
        <PaperCreateButton>롤링 페이퍼 만들기</PaperCreateButton>
      </Link>
    </NavWrapper>
  );
}

export default Nav;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  gap: 7.9rem;
  width: 100%;
  height: 6.4rem;
  padding: 1.2rem 2rem;

  @media (min-width: 1200px) {
    max-width: 124rem;
  }
`;

const NavTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Logo = styled.img`
  width: 2.7818rem;
  height: 2.7818rem;
`;

const Title = styled.h1`
  color: var(--gray-light-gray-90, #4a494f);
  text-align: center;
  font-family: Poppins;
  font-size: 1.9971rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const PaperCreateButton = styled.button`
  display: flex;
  height: 4rem;
  padding: 0.8rem 1.6rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 6px;
  border: 1px solid var(--gray-300, #ccc);
  background: var(--white, #fff);
  color: var(--gray-900, #181818);
  text-align: center;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.6rem;
  letter-spacing: -0.016rem;

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
`;