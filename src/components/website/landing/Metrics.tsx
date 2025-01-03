import { useShallow } from "zustand/shallow";
import useAppStore, { MetricsSection } from "../../../stores/appStore";

export default function Metrics() {
  const [readByPath] = useAppStore(useShallow((state) => [state.readByPath]));
  const metrics = readByPath<MetricsSection>("website.landing.metrics");
  if (!metrics.visibility) return null;

  return (
    <section id="metrics" className="pt-36">
      <div className="flex flex-wrap gap-10 items-center p-9 justify-around bg-slate-800 rounded-3xl">
        {metrics.metrics.map((metric) => {
          return (
            <div key={metric.id}>
              <h4 className="text-yellow-400 font-bold text-4xl leading-tight">
                {metric.value}
              </h4>
              <h6 className="font-medium text-xl text-slate-600">
                {metric.key}
              </h6>
            </div>
          );
        })}
      </div>
    </section>
  );
}
