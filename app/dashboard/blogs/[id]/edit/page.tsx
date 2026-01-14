import DashboardLayout from "@/components/layouts/DashboardLayout";
import BlogForm from "../../BlogForm";

interface Params {
  params: { id: string };
}

export default function EditBlogPage({ params }: Params) {
  return (
    <DashboardLayout>
      <BlogForm mode="edit" blogId={params.id} />
    </DashboardLayout>
  );
}
