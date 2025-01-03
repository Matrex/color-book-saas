import { useState } from "react";
import { PaginateData } from "../../services/apiService";
import { useLoaderData } from "react-router-dom";
import { Paginate } from "../../components/Paginate";
import coloredApi, { PaginateResult } from "../../apis/coloredApi";
import PageCardBase from "../../components/PageCardBase";

interface LoaderData {
  paginate: PaginateData<PaginateResult[]>;
}

export async function adminColoredsLoader(): Promise<LoaderData> {
  const paginate = await coloredApi.paginate({
    page: 1,
    search: "",
  });
  if (!paginate) throw new Error("Failed to load pages");
  return { paginate };
}

export function PagesColored() {
  const loaderData = useLoaderData() as LoaderData;
  const [paginate, setPaginate] = useState(loaderData.paginate);
  const [coloreds, setColoreds] = useState(paginate.data);
  const [search, setSearch] = useState("");
  const isLastPage = paginate.current_page === paginate.last_page;

  const handleLoadMoreClick = async (done: VoidFunction) => {
    const nextPage = paginate.current_page + 1;
    const result = await coloredApi.paginate({
      page: nextPage,
      search,
    });
    done();
    if (!result) return;
    setPaginate(result);
    setColoreds((coloreds) => [...coloreds, ...result.data]);
  };

  const handleDebounceSearch = async (search: string) => {
    const result = await coloredApi.paginate({
      page: 1,
      search,
    });
    if (!result) return;
    setPaginate(result);
    setColoreds(result.data);
  };

  const handleSearchChange = async (search: string) => {
    setSearch(search);
  };

  return (
    <>
      <Paginate
        module="colored pages"
        items={
          <>
            {coloreds.map((colored) => (
              <PageCardBase
                key={colored.id}
                page={colored.page}
                photo={colored.preview}
                user={colored.user}
                date={colored.created_at}
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
