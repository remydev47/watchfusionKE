import { wixClientServer } from "@/lib/wixClientServer";
import Link from "next/link";

const CategoryList = async () => {
  const wixClient = await wixClientServer();
  const cats = await wixClient.collections.queryCollections().find();

  return (
    <div className="py-4 md:py-8">
      {/* Mobile: horizontal scroll strip */}
      <div className="flex md:hidden gap-3 px-4 overflow-x-auto scrollbar-hide">
        {cats.items.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            key={item._id}
            className="flex-shrink-0 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors duration-200 whitespace-nowrap"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Tablet & Desktop: centered row */}
      <div className="hidden md:flex justify-center items-center gap-8 md:gap-12 lg:gap-16 px-4 overflow-x-auto scrollbar-hide">
        {cats.items.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0 group"
            key={item._id}
          >
            <h1
              className="text-lg md:text-xl font-semibold text-gray-800 hover:text-yellow-400 transition-colors duration-200 whitespace-nowrap"
              style={{ fontFamily: "Futura, sans-serif", lineHeight: "25.5px" }}
            >
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;