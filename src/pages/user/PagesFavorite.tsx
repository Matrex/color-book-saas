import pageApi, { PaginateResult } from "../../apis/pageApi";
import { PaginatePage } from "../../components/PaginatePage";
import { PaginateData } from "../../services/apiService";
import { useLoaderData } from "react-router-dom";

interface LoaderData {
  paginate: PaginateData<PaginateResult[]>;
}

export async function pagesFavoriteLoader(): Promise<LoaderData> {
  const paginate = await pageApi.paginate({
    page: 1,
    search: "",
    sort: "latest",
    scope: "favorited",
  });
  if (!paginate) throw new Error("Failed to load pages");
  return { paginate };
}

export function PagesFavorite() {
  const { paginate } = useLoaderData() as LoaderData;
  return (
    <PaginatePage
      module="favorite pages"
      paginate={paginate}
      scope="favorited"
    />
  );
}
