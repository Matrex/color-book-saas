import { SquarePen, Trash } from "lucide-react";
import { FunctionComponent } from "react";

interface ItemBase {
  id: string;
}

export type Item<Formdata> = ItemBase & Formdata;

export interface CardProps<Formdata> {
  item: Item<Formdata>;
}

export type CardComponent<Formdata> = FunctionComponent<CardProps<Formdata>>;

interface Props<Item> {
  item: Item;
  card: CardComponent<Item>;
  active: boolean;
  onEdit(id: string): void;
  onDelete(id: string): void;
}

export default function InputMultiItem<Formdata>(props: Props<Item<Formdata>>) {
  const activeClass = props.active ? "border-slate-600" : " border-slate-800";

  const handleEditClick = () => {
    props.onEdit(props.item.id);
  };

  const handleDeleteClick = () => {
    props.onDelete(props.item.id);
  };

  return (
    <div
      className={`${activeClass} flex flex-col gap-4 p-4 border bg-slate-800 rounded-2xl`}
    >
      <div>
        <props.card item={props.item} />
      </div>
      <div className="flex justify-end items-center gap-2">
        <SquarePen
          size={20}
          className="text-slate-400 cursor-pointer"
          onClick={handleEditClick}
        />
        <Trash
          size={20}
          className="text-slate-400 cursor-pointer"
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
}
