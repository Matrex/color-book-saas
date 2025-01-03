import { ReactNode, useState } from "react";
import InputMultiItem, { CardComponent, Item } from "./InputMultiItem";
import Button from "../../Button";
import { Plus, SquarePen } from "lucide-react";
import { produce } from "immer";
import uuidUtil from "../../../utils/uuidUtil";
import { find, findIndex, forEach } from "lodash-es";
import FormHeading from "./FormHeading";
import FormRow from "./FormRow";

interface Module {
  singular: string;
  plural: string;
}

interface Props<Formdata> {
  module: Module;
  items: Item<Formdata>[];
  card: CardComponent<Formdata>;
  initialFormdata: Formdata;
  formdata: Formdata;
  form: ReactNode;
  onItemsChange(items: Item<Formdata>[]): void;
  onFormdataChange(formdata: Formdata): void;
}

export default function InputMulti<Formdata extends object>(
  props: Props<Formdata>
) {
  const [editId, setEditId] = useState<string | null>(null);

  const formHeading = `${editId ? "Edit" : "Add"} ${props.module.singular}`;

  const itemRepo = {
    createForAdd() {
      const item: Item<Formdata> = {
        id: uuidUtil.create(),
        ...props.formdata,
      };
      return produce(props.items, (items: Item<Formdata>[]) => {
        items.push(item);
      });
    },

    find(id: string) {
      const item = find(props.items, (item) => item.id === id);
      if (!item) throw new Error("Item not found");
      return item;
    },

    findIndex(id: string) {
      const index = findIndex(props.items, (item) => item.id === id);
      if (index < 0) throw new Error("Item index not found");
      return index;
    },

    delete(id: string) {
      return produce(props.items, (items) => {
        const index = this.findIndex(id);
        items.splice(index, 1);
      });
    },

    update() {
      if (!editId) throw new Error("Edit id not found");
      return produce(props.items, (items) => {
        const index = this.findIndex(editId);
        const item = items[index];
        forEach(props.formdata, (_value, key) => {
          const name = key as keyof Formdata;
          (item as Formdata)[name] = props.formdata[name];
        });
        items.splice(index, 1, item);
      });
    },
  };

  const formdataRepo = {
    createForEdit(id: string) {
      const item = itemRepo.find(id);
      return produce(props.formdata, (formdata) => {
        forEach(formdata, (_value, key) => {
          const name = key as keyof Formdata;
          (formdata as Formdata)[name] = item[name];
        });
      });
    },
  };

  const isitemActive = (id: string) => {
    return id === editId;
  };

  const handleAddClick = () => {
    const items = itemRepo.createForAdd();
    props.onItemsChange(items);
    props.onFormdataChange(props.initialFormdata);
  };

  const handleEditClick = (id: string) => {
    setEditId(id);
    const formdata = formdataRepo.createForEdit(id);
    props.onFormdataChange(formdata);
  };

  const handleDeleteClick = (id: string) => {
    const items = itemRepo.delete(id);
    props.onItemsChange(items);
    props.onFormdataChange(props.initialFormdata);
    setEditId(null);
  };

  const handleUpdateClick = () => {
    const items = itemRepo.update();
    props.onItemsChange(items);
    props.onFormdataChange(props.initialFormdata);
    setEditId(null);
  };

  return (
    <>
      <div className="col-span-2 grid gap-4">
        <FormHeading>{props.module.plural}</FormHeading>
        <FormRow>
          {Boolean(props.items.length) &&
            props.items.map((item) => (
              <InputMultiItem<Formdata>
                key={item.id}
                item={item}
                card={props.card}
                active={isitemActive(item.id)}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
        </FormRow>
        <FormHeading>{formHeading}</FormHeading>
        {props.form}
        <FormRow>
          {editId ? (
            <Button
              type="info"
              text={`Update ${props.module.singular}`}
              icon={SquarePen}
              hug={false}
              processing={false}
              onClick={handleUpdateClick}
            />
          ) : (
            <Button
              type="info"
              text={`Add ${props.module.singular}`}
              icon={Plus}
              hug={false}
              processing={false}
              onClick={handleAddClick}
            />
          )}
        </FormRow>
      </div>
    </>
  );
}
