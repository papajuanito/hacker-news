import { ReactNode } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Container = styled(Link)<{ active: string }>`
  padding: 8px 20px;
  background-color: ${({ active }) =>
    active == 'true' ? '#3f97e5' : '#3d3d3d'};

  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  flex-shrink: 0;

  text-decoration: none;
  color: #ffffff;
`;

const IconContainer = styled.span`
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  icon: ReactNode;
  title: string;
  to: string;
};

export default function NavbarItem({ icon, title, to }: Props) {
  const { pathname } = useLocation();

  const active = pathname === to;

  return (
    <Container to={to} active={active.toString()}>
      <IconContainer>{icon}</IconContainer> {title}
    </Container>
  );
}
