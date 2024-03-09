import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing:border-box;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

export default function Input(props) {
  return (
    <div>
      <StyledLabel>{props.name}</StyledLabel>
      <StyledInput {...props} />
    </div>
  );
}
