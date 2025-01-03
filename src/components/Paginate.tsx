import { ArrowDown, ArrowDownWideNarrow } from "lucide-react";
import Button from "./Button";
import useButton from "../hooks/useButton";
import PageHeading from "./PageHeading";
import Input from "./Input";
import { ReactNode, useCallback } from "react";
import Select, { Option } from "./Select";
import Confirm from "./Confirm";
import { debounce } from "lodash-es";
import stringUtil from "../utils/stringUtil";
import { RiAddCircleLine } from "@remixicon/react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  module: string;
  items: ReactNode;
  search: string;
  sort?: string;
  sortOptions?: Option[];
  isLastPage: boolean;
  create?: boolean;
  onSearch(term: string): void;
  onSort?(sort: string): void;
  onLoadMore(done: VoidFunction): void;
  onProceed?(id: number, onProceeded: VoidFunction): void;
  onDebounceSearch(search: string, sort?: string): void;
}

export function Paginate(props: Props) {
  const [loading, startLoading, stopLoading] = useButton();
  const location = useLocation();

  const handleLoadMoreClick = () => {
    startLoading();
    props.onLoadMore(() => {
      stopLoading();
    });
  };

  const debouncedSearch = useCallback(
    debounce(props.onDebounceSearch, 300),
    []
  );

  const handleSearchChange = (_name: string, value: string) => {
    props.onSearch(value);
    debouncedSearch(value, props.sort);
  };

  const handleSortChange = (_name: string, value: string) => {
    if (!props.onSort) return;
    props.onSort(value);
  };

  return (
    <div>
      <div className="flex">
        <PageHeading heading={stringUtil.uppercaseFirst(props.module)}>
          {props.create && (
            <Link to={`${location.pathname}/create`}>
              <RiAddCircleLine size={24} className="text-slate-500" />
            </Link>
          )}
        </PageHeading>
      </div>
      <div className="flex justify-between mb-6 gap-1 flex-wrap">
        <div className="max-w-80 w-full">
          <Input
            type="text"
            name="search"
            value={props.search}
            background="dark"
            placeholder={`Search ${props.module}`}
            onChange={handleSearchChange}
          />
        </div>
        <div className="max-w-64 w-full">
          {props.sort && props.sortOptions && (
            <Select
              name="sort"
              value={props.sort}
              icon={ArrowDownWideNarrow}
              options={props.sortOptions}
              onChange={handleSortChange}
            />
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {props.items}
      </div>
      {!props.isLastPage && (
        <div className="mt-6 flex justify-center">
          <Button
            type="secondary"
            text="Load more"
            icon={ArrowDown}
            hug={true}
            processing={loading}
            onClick={handleLoadMoreClick}
          />
        </div>
      )}
      {props.onProceed && <Confirm onProceed={props.onProceed} />}
    </div>
  );
}
