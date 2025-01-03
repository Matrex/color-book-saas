import PageCard from "./PageCard";
import { useState } from "react";
import { Paginate } from "./Paginate";
import pageApi, { PaginateResult } from "../apis/pageApi";
import { produce } from "immer";
import { find, findIndex } from "lodash-es";
import useConfirmStore from "../stores/confirmStore";
import { useShallow } from "zustand/shallow";
import { PaginateData } from "../services/apiService";
import useAuthStore from "../stores/authStore";

interface Props {
  module: string;
  paginate: PaginateData<PaginateResult[]>;
  scope: "public" | "favorited" | "owned" | "colored";
}

export function PaginatePage(props: Props) {
  const user = useAuthStore((state) => {
    if (!state.user) throw new Error("No user found");
    return state.user;
  });
  const [paginate, setPaginate] = useState(props.paginate);
  const [pages, setPages] = useState(paginate.data);
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");
  const [replaceConfirm] = useConfirmStore(
    useShallow((state) => [state.replace])
  );
  const isLastPage = paginate.current_page === paginate.last_page;

  const handleLoadMoreClick = async (done: VoidFunction) => {
    const nextPage = paginate.current_page + 1;
    const result = await pageApi.paginate({
      page: nextPage,
      search,
      sort,
      scope: props.scope,
    });
    done();
    if (!result) return;
    setPaginate(result);
    setPages((pages) => [...pages, ...result.data]);
  };

  const handleSortChange = async (sort: string) => {
    setSort(sort);
    const result = await pageApi.paginate({
      page: 1,
      search,
      sort,
      scope: props.scope,
    });
    if (!result) return;
    setPaginate(result);
    setPages(result.data);
  };

  const handleDebounceSearch = async (search: string, sort: string) => {
    const result = await pageApi.paginate({
      page: 1,
      search,
      sort,
      scope: props.scope,
    });
    if (!result) return;
    setPaginate(result);
    setPages(result.data);
  };

  const handleSearchChange = async (search: string) => {
    setSearch(search);
  };

  const handleDeleteClick = (id: number) => {
    const page = find(pages, (page) => page.id === id);
    if (!page) return;
    if (!page.blocked) {
      const message = user.admin
        ? "Are you sure to block the page?"
        : "Are you sure to delete the page?";
      replaceConfirm("danger", message, id);
    } else {
      handleBlockToggle(id);
    }
  };

  const handleToggleFavorite = async (id: number) => {
    const result = await pageApi.toggleFavorited(id);
    if (!result) return;
    setPages(
      produce((pages) => {
        const page = find(pages, (page) => page.id === id);
        if (!page) return;
        page.is_favorited = !page.is_favorited;
        page.favorited_count = page.is_favorited
          ? page.favorited_count + 1
          : page.favorited_count - 1;
      })
    );
  };

  const handleBlockToggle = async (id: number, onProceeded?: VoidFunction) => {
    const result = await pageApi.toggleBlocked(id);
    if (onProceeded) onProceeded();
    if (!result) return;
    setPages(
      produce((pages) => {
        const index = findIndex(pages, (page) => page.id === id);
        if (index < 0) return;
        if (user.admin) {
          const page = pages[index];
          page.blocked = !page.blocked;
        } else {
          pages.splice(index, 1);
        }
      })
    );
  };

  return (
    <>
      <Paginate
        module={props.module}
        items={
          <>
            {pages.map((page) => (
              <PageCard
                key={page.id}
                page={page}
                date={page.created_at}
                onDelete={handleDeleteClick}
                onToggleFavorite={user.admin ? undefined : handleToggleFavorite}
              />
            ))}
          </>
        }
        search={search}
        sort={sort}
        sortOptions={[
          { label: "Trending", value: "trending" },
          { label: "Popularity", value: "popularity" },
          { label: "Latest", value: "latest" },
          { label: "Oldest", value: "oldest" },
          { label: "Most favorited", value: "mostFavorited" },
          { label: "Most colored", value: "mostColored" },
        ]}
        isLastPage={isLastPage}
        onSearch={handleSearchChange}
        onSort={handleSortChange}
        onLoadMore={handleLoadMoreClick}
        onProceed={handleBlockToggle}
        onDebounceSearch={handleDebounceSearch}
      />
    </>
  );
}
