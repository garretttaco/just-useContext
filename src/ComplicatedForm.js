/** @jsx jsx */
import React, { useState, useContext, createContext, useEffect } from "react";
import { isEmpty, get } from "lodash";
import { css, jsx } from "@emotion/core";
import { Label } from "./components/Input";
import Select from "react-select";
import * as topicComparisonApi from "./api/topicComparisons";

let formContainer = css`
  margin: 20px;
`;

let defaultFormState = {
  topic: {},
  comparison: {},
  value: {},
  filteredTopicComparisons: []
};

let defaultApiData = {
  topics: [],
  comparisons: [],
  topicComparisons: []
};

let FormContext = createContext(defaultFormState);

export default function ComplicatedForm() {
  let [form, setFormState] = useState(defaultFormState);
  let [apiData, setApiData] = useState(defaultApiData);
  let setForm = stateUpdate => {
    setFormState(state => {
      let topic = get(stateUpdate, "topic", state.topic);
      let value = get(stateUpdate, "value", state.value);
      let comparison = get(stateUpdate, "comparison", state.comparison);
      let { topicComparisons } = apiData;
      let filteredTopicComparisons =
        isEmpty(topic) && isEmpty(value)
          ? topicComparisons
          : isEmpty(topic)
          ? topicComparisons.filter(tc => tc.topicId === value.id)
          : topicComparisons.filter(tc => tc.topicId === topic.id);
      let updatedState = stateUpdate;
      if (
        !isEmpty(filteredTopicComparisons) &&
        !filteredTopicComparisons.find(fc => fc.topicId === topic.id)
      ) {
        updatedState.topic = {};
      }
      if (
        !filteredTopicComparisons.find(fc => fc.comparisonId === comparison.id)
      ) {
        updatedState.comparison = {};
      }
      if (isEmpty(filteredTopicComparisons)) {
        updatedState.value = {};
      }
      return { ...state, ...updatedState, filteredTopicComparisons };
    });
  };
  // cDM
  useEffect(() => {
    topicComparisonApi
      .get()
      .then(resp => resp.data)
      .then(setApiData);
  }, []);
  return (
    <div css={formContainer}>
      <FormContext.Provider value={{ ...form, ...apiData, setForm }}>
        <Topic />
        <DisplayComparison />
      </FormContext.Provider>
    </div>
  );
}

function Topic() {
  let { topic, value, topics, setForm } = useContext(FormContext);
  let filteredTopics = topics.filter(t => t.id !== value.id);
  return (
    <div>
      <Label>Topic</Label>
      <Select
        options={filteredTopics}
        value={topic}
        onChange={selected => setForm({ topic: selected })}
      />
      <Comparison />
    </div>
  );
}

function Comparison() {
  let {
    comparison,
    comparisons,
    filteredTopicComparisons,
    setForm
  } = useContext(FormContext);
  let filteredComparisons = filteredTopicComparisons.map(tc =>
    comparisons.find(c => c.id === tc.comparisonId)
  );
  return (
    <div>
      <Label>Comparison</Label>
      <Select
        options={filteredComparisons}
        value={comparison}
        onChange={selected => setForm({ comparison: selected })}
      />
      <Value />
    </div>
  );
}

function Value() {
  let {
    value,
    topic,
    comparison,
    topics,
    topicComparisons,
    setForm
  } = useContext(FormContext);
  let filteredTopics = topicComparisons
    .filter(tc => tc.comparisonId === comparison.id)
    .filter(tc => tc.topicId !== topic.id)
    .map(tc => topics.find(t => t.id === tc.topicId));
  return (
    <div>
      <Label>Value</Label>
      <Select
        options={filteredTopics}
        value={value}
        onChange={selected => {
          if (selected.value === topic.value) {
            setForm({ topic: {} });
          }
          setForm({ value: selected });
        }}
      />
    </div>
  );
}

let displayContainer = css`
  margin-top: 20px;
`;
function DisplayComparison() {
  let { topic, comparison, value } = useContext(FormContext);
  if (isEmpty(topic) || isEmpty(comparison) || isEmpty(value)) {
    return (
      <div css={displayContainer}>
        Select a topic, comparison, and topic to compare above.
      </div>
    );
  }
  return (
    <div css={displayContainer}>
      {topic.label} {comparison.label} {value.label}
    </div>
  );
}
