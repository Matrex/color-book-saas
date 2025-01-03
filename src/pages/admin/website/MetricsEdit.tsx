import PageHeading from "../../../components/PageHeading";
import { useState } from "react";
import InputMetric from "../../../components/admin/website/InputMetric";
import useAppStore, { Metric, MetricsSection } from "../../../stores/appStore";
import Form from "../../../components/admin/website/Form";
import FormRow from "../../../components/admin/website/FormRow";

export function MetricsEdit() {
  const path = "website.landing.metrics";
  const readByPath = useAppStore((state) => state.readByPath);
  const metricsData = readByPath<MetricsSection>(path);

  const [metrics, setMetrics] = useState<Metric[]>(metricsData.metrics);

  const data: MetricsSection = {
    metrics,
    visibility: metricsData.visibility,
  };

  const handleMetricsChange = (metrics: Metric[]) => {
    setMetrics(metrics);
  };

  return (
    <div>
      <PageHeading heading="Edit metrics" />
      <Form section="metrics" path={path} data={data}>
        <FormRow>
          <InputMetric metrics={metrics} onChange={handleMetricsChange} />
        </FormRow>
      </Form>
    </div>
  );
}
