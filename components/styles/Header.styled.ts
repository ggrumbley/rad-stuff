import styled from 'styled-components';

export const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${(props) => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.XL}) {
    margin: 0;
    text-align: center;
  }
`;

export const Bar = styled.div`
  border-bottom: 10px solid ${(props) => props.theme.black};
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  align-items: stretch;
  @media (max-width: ${(props) => props.theme.breakpoints.XL}) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

export const SubBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
`;
