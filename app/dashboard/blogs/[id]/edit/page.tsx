// app/dashboard/blogs/[id]/edit/page.tsx
import DashboardLayout from "@/components/layouts/DashboardLayout";
import BlogForm from "../../BlogForm";
import BlogFormWrapper from "@/components/wrappers/BlogFormWrapper";

interface Props {
  params: Promise<{ id: string | string[] }>; // Note the Promise
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params; // unwrap the promise
  const slug = Array.isArray(id) ? id[0] : id;

  return (
    <DashboardLayout>
      <BlogFormWrapper>
        <BlogForm mode="edit" blogId={slug} />
      </BlogFormWrapper>
    </DashboardLayout>
  );
}
