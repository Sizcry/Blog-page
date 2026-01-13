import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-blue-50 min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-20">
      
      {/* Text */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-6">
          Welcome to TechBlog
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover the latest in tech: laptops, mobiles, PCs, and accessories.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <Link href="/blogs" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Read Blogs
          </Link>
          <Link href="/categories" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition">
            Browse Categories
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end">
        <Image
          src="/hero.jpeg"
          alt="Hero Tech"
          width={500}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}
