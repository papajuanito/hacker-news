import styled from 'styled-components';
import NavbarItem from './NavbarItem';
import { AiFillStar, AiFillEye } from 'react-icons/ai';
import { FaMicrophone } from 'react-icons/fa';
import { Category } from '../types/HackerNews';
import { TfiMedallAlt } from 'react-icons/tfi';
import { IoMdPaperPlane } from 'react-icons/io';
import { BsFillBriefcaseFill } from 'react-icons/bs';

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
    to: `/${Category.TOP_STORIES}`,
  },
  {
    icon: <FaMicrophone />,
    title: 'Ask HN',
    to: `/${Category.ASK_STORIES}`,
  },
  {
    icon: <AiFillEye />,
    title: 'Show HN',
    to: `/${Category.SHOW_STORIES}`,
  },
  {
    icon: <TfiMedallAlt />,
    title: 'Best Stories',
    to: `/${Category.BEST_STORIES}`,
  },
  {
    icon: <IoMdPaperPlane />,
    title: 'New Stories',
    to: `/${Category.NEW_STORIES}`,
  },
  {
    icon: <BsFillBriefcaseFill />,
    title: 'Jobs',
    to: `/${Category.JOB_STORIES}`,
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
