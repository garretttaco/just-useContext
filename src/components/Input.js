import styled from "@emotion/styled";

export let Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export default styled.input`
  display: block;
  width: 40%;
  height: calc(1.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
