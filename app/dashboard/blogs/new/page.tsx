import DashboardLayout from "@/components/layouts/DashboardLayout";
import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  return (
    <DashboardLayout>
      <BlogForm mode="new" />
    </DashboardLayout>
  );
}
