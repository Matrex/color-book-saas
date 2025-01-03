import pageApi, { PaginateResult } from "../../apis/pageApi";
import { PaginatePage } from "../../components/PaginatePage";
import { PaginateData } from "../../services/apiService";
import { redirect, useLoaderData } from "react-router-dom";
import queryUtil from "../../utils/queryUtil";

interface LoaderData {
  paginate: PaginateData<PaginateResult[]>;
}

export async function pagesPublicLoader({
  request,
}: {
  request: Request;
}): Promise<LoaderData | Response> {
  const hasPlanParam = queryUtil.hasParam("plan", request.url);
  if (hasPlanParam) return redirect(queryUtil.followParams("/checkout"));
  const paginate = await pageApi.paginate({
    page: 1,
    search: "",
    sort: "latest",
    scope: "public",
  });
  if (!paginate) throw new Error("Failed to load pages");
  return { paginate };
}

export function PagesPublic() {
  const { paginate } = useLoaderData() as LoaderData;
  return (
    <PaginatePage module="public pages" paginate={paginate} scope="public" />
  );
}
