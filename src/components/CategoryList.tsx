import { wixClientServer } from "@/lib/wixClientServer";
import Link from "next/link";

const CategoryList = async () => {
  const wixClient = await wixClientServer();

  const cats = await wixClient.collections.queryCollections().find();

  return (
    <div className="px-4 py-8">
      <div className="flex justify-center items-center gap-8 md:gap-12 lg:gap-16 overflow-x-auto scrollbar-hide">
        {cats.items.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0 group"
            key={item._id}
          >
            <h1 className="text-lg md:text-xl font-normal text-gray-800 hover:text-yellow-400 transition-colors duration-200 whitespace-nowrap"
              style={{
                fontFamily: 'Futura, sans-serif',
                fontSize: '17px',
                fontWeight: '600',
                lineHeight: '25.5px'
              }}
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