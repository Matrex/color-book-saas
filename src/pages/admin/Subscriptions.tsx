import { useState } from "react";
import { PaginateData } from "../../services/apiService";
import { useLoaderData } from "react-router-dom";
import { Paginate } from "../../components/Paginate";
import SubscriptionCard from "../../components/admin/SubscriptionCard";
import subscriptionApi, { PaginateResult } from "../../apis/subscriptionApi";

interface LoaderData {
  paginate: PaginateData<PaginateResult[]>;
}

export async function adminSubscriptionsLoader(): Promise<LoaderData> {
  const paginate = await subscriptionApi.paginate({
    page: 1,
    search: "",
  });
  if (!paginate) throw new Error("Failed to load subscriptions");
  return { paginate };
}

export function Subscriptions() {
  const loaderData = useLoaderData() as LoaderData;
  const [paginate, setPaginate] = useState(loaderData.paginate);
  const [subscriptions, setSubscriptions] = useState(paginate.data);
  const [search, setSearch] = useState("");
  const isLastPage = paginate.current_page === paginate.last_page;

  const handleLoadMoreClick = async (done: VoidFunction) => {
    const nextPage = paginate.current_page + 1;
    const result = await subscriptionApi.paginate({
      page: nextPage,
      search,
    });
    done();
    if (!result) return;
    setPaginate(result);
    setSubscriptions((subscriptions) => [...subscriptions, ...result.data]);
  };

  const handleDebounceSearch = async (search: string) => {
    const result = await subscriptionApi.paginate({
      page: 1,
      search,
    });
    if (!result) return;
    setPaginate(result);
    setSubscriptions(result.data);
  };

  const handleSearchChange = async (search: string) => {
    setSearch(search);
  };

  return (
    <>
      <Paginate
        module="subscriptions"
        items={
          <>
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
              />
            ))}
          </>
        }
        search={search}
        isLastPage={isLastPage}
        onSearch={handleSearchChange}
        onLoadMore={handleLoadMoreClick}
        onDebounceSearch={handleDebounceSearch}
      />
    </>
  );
}
