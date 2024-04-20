import { useQueryClient } from "@tanstack/react-query";
import { createContextMenu } from "~/api";
import { useGlobalState } from "~/store";
import { type Tag } from "~/types";

type Props = {
  tag: Tag;
};

export default function TagItem({ tag }: Props) {
  const { activeNote, setActiveNote } = useGlobalState();
  const queryClient = useQueryClient();

  const handleSetActiveTag = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setActiveNote({
      context: "tag",
      note: activeNote.note,
      tag: tag,
      archivedNote: undefined,
    });

    await queryClient.invalidateQueries({ queryKey: ["notes"] });
  };

  const handleContextMenu = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault(); // prevent the default behaviour when right clicked
    const id = tag.id;
    await createContextMenu({ menuKind: "TagItem", id });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleSetActiveTag}
      key={tag.id}
      className={`flex h-full w-full cursor-pointer select-none flex-col rounded-md px-4 py-2 text-sm font-medium ${tag.name === activeNote.tag?.name && "bg-muted/80"}`}
    >
      <span
        className={`select-none text-muted-foreground ${tag.name === activeNote.tag?.name && "text-secondary-foreground"}`}
      >
        {tag.name}
      </span>
    </div>
  );
}
