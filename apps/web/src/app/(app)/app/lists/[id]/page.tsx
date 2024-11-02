import ListDeleteButton from "@/app/(app)/app/lists/[id]/list-delete-button";
import ListEditButton from "@/app/(app)/app/lists/[id]/list-edit-button";
import { getList } from "@/lib/supabase/server/queries/lists";

interface ListDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListDetailPage({ params }: ListDetailPageProps) {
  const id = (await params).id;

  const list = await getList(id);

  return (
    <div>
      <h1 className="text-3xl font-medium">{list.title}</h1>
      <div>
        <p>{list.description}</p>
      </div>
      <p>{list.is_public ? "Public" : "Private"}</p>
      <ListEditButton id={id} />
      <ListDeleteButton id={id} />
    </div>
  );
}
