import styled from 'styled-components';
import { BsHouseFill, BsSearch } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';

const Container = styled.div`
  display: flex;
  background-color: #1e2026;
`;

const FooterItem = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 12px;
  flex: 1;

  > svg {
    margin-bottom: 4px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <FooterItem>
        <BsHouseFill size={18} />
        Stories
      </FooterItem>
      <FooterItem>
        <BsSearch size={18} />
        Search
      </FooterItem>
      <FooterItem>
        <FaUserAlt size={18} />
        Account
      </FooterItem>
      <FooterItem>
        <IoSettingsSharp size={18} />
        Settings
      </FooterItem>
    </Container>
  );
};

export default Footer;
