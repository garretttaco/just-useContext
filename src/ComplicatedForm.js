import React, { useState, useContext, createContext } from "react";
import { css } from "@emotion/core";
import Input, { Label } from "./components/Input";

let formContainer = css`
  margin: 20px;
`;

let defaultFormState = {
  topic: null,
  comparison: null,
  value: null
};

let FormContext = createContext(defaultFormState);

// Top level component
export default function ComplicatedForm() {
  let [form, setFormState] = useState(defaultFormState);
  let setForm = updatedState =>
    setFormState(state => ({ ...state, ...updatedState }));
  return (
    <div css={formContainer}>
      <FormContext.Provider value={{ ...form, setForm }}>
        <Topic />
        <Comparison />
        <Value />
      </FormContext.Provider>
    </div>
  );
}

function Topic() {
  let { topic } = useContext(FormContext);
  console.log("--------topic", topic);
  return (
    <div>
      <Label>Topic</Label>
      <Input value={topic} />
    </div>
  );
}

function Comparison() {
  let { comparison } = useContext(FormContext);
  console.log("--------comparison", comparison);
  return (
    <div>
      <Label>Comparison</Label>
      <Input value={comparison} />
    </div>
  );
}

function Value() {
  let { value } = useContext(FormContext);
  console.log("--------value", value);
  return (
    <div>
      <Label>Value</Label>
      <Input value={value} />
    </div>
  );
}
