import InputMulti from "./InputMulti";
import Input from "../../Input";
import MetricCard from "./MetricCard";
import FormRow from "./FormRow";
import { Metric } from "../../../stores/appStore";
import { useState } from "react";

export interface Formdata {
  key: string;
  value: string;
}

interface Props {
  metrics: Metric[];
  onChange(metrics: Metric[]): void;
}

export default function InputMetric(props: Props) {
  const initialFormdata: Formdata = {
    key: "",
    value: "",
  };

  const [key, setKey] = useState(initialFormdata.key);
  const [value, setValue] = useState(initialFormdata.value);

  const formdata: Formdata = { key, value };

  const handleInputChange = (name: string, value: string) => {
    if (name === "key") setKey(value);
    if (name === "value") setValue(value);
  };

  const handleFormdataChange = (formdata: Formdata) => {
    setKey(formdata.key);
    setValue(formdata.value);
  };

  return (
    <InputMulti<Formdata>
      module={{ singular: "metric", plural: "metrics" }}
      items={props.metrics}
      card={MetricCard}
      initialFormdata={initialFormdata}
      formdata={formdata}
      form={
        <FormRow>
          <Input
            type="text"
            label="Key"
            name="key"
            value={formdata.key}
            background="dark"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Value"
            name="value"
            value={formdata.value}
            background="dark"
            onChange={handleInputChange}
          />
        </FormRow>
      }
      onItemsChange={props.onChange}
      onFormdataChange={handleFormdataChange}
    />
  );
}
