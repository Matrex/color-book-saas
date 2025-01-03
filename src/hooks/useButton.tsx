import { useState } from "react";

export default function useButton(): [boolean, VoidFunction, VoidFunction] {
  const [processing, setProcessing] = useState(false);

  const startProcessing = () => {
    setProcessing(true);
  };

  const stopProcessing = () => {
    setProcessing(false);
  };

  return [processing, startProcessing, stopProcessing];
}
