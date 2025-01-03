import { useLoaderData } from "react-router-dom";
import analyticApi, {
  AnalyticCharts,
  AnalyticCounters,
} from "../../apis/analyticApi";
import PageHeading from "../../components/PageHeading";
import Count from "../../components/admin/Count";
import LineChart from "../../components/admin/LineChart";

interface LoaderProps {
  counters: AnalyticCounters;
  charts: AnalyticCharts;
}

export async function dashboardLoader() {
  const counters = await analyticApi.counters();
  const charts = await analyticApi.charts();
  return { counters, charts };
}

export function Dashboard() {
  const { counters, charts } = useLoaderData() as LoaderProps;

  return (
    <div>
      <PageHeading heading="Dashboard" />
      <div className="grid gap-5 mb-7">
        <div>
          <h5 className="text-slate-300 text-tight mb-2 font-medium">
            This week
          </h5>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Count title="Users" amount={counters.week.users} />
            <Count title="Pages" amount={counters.week.pages} />
            <Count title="Colored pages" amount={counters.week.coloreds} />
            <Count title="Subscriptions" amount={counters.week.subscriptions} />
          </div>
        </div>
        <div>
          <h5 className="text-slate-300 text-tight mb-2 font-medium">
            All time
          </h5>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Count title="Users" amount={counters.total.users} />
            <Count title="Pages" amount={counters.total.pages} />
            <Count title="Colored pages" amount={counters.total.coloreds} />
            <Count
              title="Subscriptions"
              amount={counters.total.subscriptions}
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Monthly performance</h3>
        <div className="grid lg:grid-cols-2 gap-5">
          <LineChart
            data={charts.users}
            heading="Users"
            name="name"
            value="users"
          />
          <LineChart
            data={charts.pages}
            heading="Pages"
            name="name"
            value="pages"
          />
          <LineChart
            data={charts.coloreds}
            heading="Colored pages"
            name="name"
            value="coloreds"
          />
          <LineChart
            data={charts.subscriptions}
            heading="Subscriptions"
            name="name"
            value="subscriptions"
          />
        </div>
      </div>
    </div>
  );
}
