import { useState } from "react";
import { produce } from "immer";
import { find, findIndex } from "lodash-es";
import { PaginateData } from "../../services/apiService";
import userApi, { PaginateResult } from "../../apis/userApi";
import { useLoaderData } from "react-router-dom";
import useConfirmStore from "../../stores/confirmStore";
import UserCard from "../../components/admin/UserCard";
import { Paginate } from "../../components/Paginate";

interface LoaderData {
  paginate: PaginateData<PaginateResult[]>;
}

export async function adminUsersLoader(): Promise<LoaderData> {
  const paginate = await userApi.paginate({
    page: 1,
    search: "",
  });
  if (!paginate) throw new Error("Failed to load users");
  return { paginate };
}

export function Users() {
  const loaderData = useLoaderData() as LoaderData;
  const [paginate, setPaginate] = useState(loaderData.paginate);
  const [users, setUsers] = useState(paginate.data);
  const [search, setSearch] = useState("");
  const replaceConfirm = useConfirmStore((state) => state.replace);
  const isLastPage = paginate.current_page === paginate.last_page;

  const handleLoadMoreClick = async (done: VoidFunction) => {
    const nextPage = paginate.current_page + 1;
    const result = await userApi.paginate({
      page: nextPage,
      search,
    });
    done();
    if (!result) return;
    setPaginate(result);
    setUsers((users) => [...users, ...result.data]);
  };

  const handleDebounceSearch = async (search: string) => {
    const result = await userApi.paginate({
      page: 1,
      search,
    });
    if (!result) return;
    setPaginate(result);
    setUsers(result.data);
  };

  const handleSearchChange = async (search: string) => {
    setSearch(search);
  };

  const handleBlockClick = (id: number) => {
    const user = find(users, (user) => user.id === id);
    if (!user) return;
    if (!user.blocked) {
      replaceConfirm("danger", "Are you sure to block the user?", id);
    } else {
      handleBlockToggle(id);
    }
  };

  const handleBlockToggle = async (id: number, onProceeded?: VoidFunction) => {
    const result = await userApi.toggleBlocked(id);
    if (onProceeded) onProceeded();
    if (!result) return;
    setUsers(
      produce((users) => {
        const index = findIndex(users, (user) => user.id === id);
        if (index < 0) return;
        const user = users[index];
        user.blocked = !user.blocked;
      })
    );
  };

  return (
    <>
      <Paginate
        module="users"
        items={
          <>
            {users.map((user) => (
              <UserCard key={user.id} user={user} onBlock={handleBlockClick} />
            ))}
          </>
        }
        search={search}
        isLastPage={isLastPage}
        create={true}
        onSearch={handleSearchChange}
        onLoadMore={handleLoadMoreClick}
        onProceed={handleBlockToggle}
        onDebounceSearch={handleDebounceSearch}
      />
    </>
  );
}
