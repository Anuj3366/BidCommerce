import styled, {css} from "styled-components";


const primary = "#0D3D29";

export const ButtonStyle = css`
  border:0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:500;
  border: 1px solid;
  svg{
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    width: 100%;
  `}


   ${props => props.$white && !props['data-outline'] && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.$white && props['data-outline'] && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}
  ${props => props.$black && !props['data-outline'] && css`
    background-color: #000;
    color: #fff;
  `}
  ${props => props.$black && props['data-outline'] && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.$primary && !props['data-outline'] && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color:#fff;
  `}
  ${props => props.$primary && props['data-outline'] && css`
    background-color: transparent;
    border: 1px solid ${primary};
    color:${primary};
  `}
  ${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
  @media screen and (max-width: 768px) {
    display : block;
    ${props => props.textAlign === 'center' && css`
      margin:auto;
      text-align: center;
    `}
    ${props => props.textAlign === 'start' && css`
      text-align: start;
    `}
  }
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({outline, children, ...rest}) {
  return (
    <StyledButton data-outline={outline} {...rest}>{children}</StyledButton>
  );
}
