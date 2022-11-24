import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ active?: boolean }>`
  padding: 8px 20px;
  background-color: ${({ active }) => (active ? '#3f97e5' : '#3d3d3d')};

  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  flex-shrink: 0;
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
  active?: boolean;
};

export default function NavbarItem({ icon, title, active }: Props) {
  return (
    <Container active={active}>
      <IconContainer>{icon}</IconContainer> {title}
    </Container>
  );
}
