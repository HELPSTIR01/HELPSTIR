// app/serverComponent.js (example of a Server Component)
import styled from "styled-components";

const Title = styled.h1`
  color: blue;
  font-size: 2rem;
  text-align: center;
`;

export default function TestComponent() {
  return <Title>Hello from a Server Component!</Title>;
}
