import styled from 'styled-components';
import NavbarItem from './NavbarItem';
import { AiFillStar } from 'react-icons/ai';
import { FaMicrophone } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;

  padding: 0 14px;
  gap: 8px;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NAVBAR_ITEMS = [
  {
    icon: <AiFillStar />,
    title: 'Top Stories',
    active: true,
  },
  {
    icon: <FaMicrophone />,
    title: 'Ask HN',
  },
  {
    icon: <AiFillStar />,
    title: 'Top Stories',
  },
  {
    icon: <FaMicrophone />,
    title: 'Ask HN',
  },
  {
    icon: <AiFillStar />,
    title: 'Top Stories',
  },
  {
    icon: <FaMicrophone />,
    title: 'Ask HN',
  },
  {
    icon: <AiFillStar />,
    title: 'Top Stories',
  },
  {
    icon: <FaMicrophone />,
    title: 'Ask HN',
  },
];

export default function Navbar() {
  return (
    <Container>
      {NAVBAR_ITEMS.map((item, index) => (
        <NavbarItem {...item} key={`${index}-${item.title}`} />
      ))}
    </Container>
  );
}
