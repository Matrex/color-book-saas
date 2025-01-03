import pageApi, { PaginateResult } from "../../apis/pageApi";
import { PaginatePage } from "../../components/PaginatePage";
import { PaginateData } from "../../services/apiService";
import { useLoaderData } from "react-router-dom";

interface LoaderData {
  paginate: PaginateData<PaginateResult[]>;
}

export async function pagesLoader(): Promise<LoaderData> {
  const paginate = await pageApi.paginate({
    page: 1,
    search: "",
    sort: "latest",
    scope: "owned",
  });
  if (!paginate) throw new Error("Failed to load pages");
  return { paginate };
}

export function Pages() {
  const { paginate } = useLoaderData() as LoaderData;
  return <PaginatePage module="my pages" paginate={paginate} scope="owned" />;
}
