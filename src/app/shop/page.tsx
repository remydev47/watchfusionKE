import ProductList from "@/components/ProductList";
import Filter from "@/components/Filter";
import { wixClientServer } from "@/lib/wixClientServer";
import Link from "next/link";
import { Suspense } from "react";

const SUBCATEGORIES = [
    { label: "All Products", slug: "" },
    { label: "Accessories", slug: "accessories" },
    { label: "Couple Sets", slug: "couple-sets" },
    { label: "Gents Watches", slug: "gents-watches" },
    { label: "Ladies Watches", slug: "ladies-watches" },
];

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;
    const catSlug = typeof resolvedParams.cat === "string" ? resolvedParams.cat : "";

    let categoryId = "";
    let categoryName = "All Products";

    if (catSlug) {
        try {
            const wixClient = await wixClientServer();
            const cat = await wixClient.collections.getCollectionBySlug(catSlug);
            categoryId = cat.collection?._id || "";
            categoryName = cat.collection?.name || catSlug;
        } catch {
            // If slug not found, fall back to all products
        }
    }

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
            {/* Header */}
            <div className="py-8 border-b">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {categoryName === "All Products" ? "Shop All Products" : categoryName}
                </h1>
                <p className="text-gray-600">
                    {categoryName === "All Products"
                        ? "Browse our complete collection"
                        : `Browse our ${categoryName} collection`}
                </p>
            </div>

            {/* Subcategory Navigation */}
            <div className="flex gap-3 flex-wrap py-6 border-b">
                {SUBCATEGORIES.map((sub) => (
                    <Link
                        key={sub.slug}
                        href={sub.slug ? `/shop?cat=${sub.slug}` : "/shop"}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                            catSlug === sub.slug
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        {sub.label}
                    </Link>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8 py-8">
                {/* Filter Sidebar */}
                <div className="w-full lg:w-1/4">
                    <div className="sticky top-8">
                        <h2 className="text-xl font-semibold mb-4">Filters</h2>
                        <Suspense fallback={<div>Loading filters...</div>}>
                            <Filter />
                        </Suspense>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="w-full lg:w-3/4">
                    <Suspense fallback={<ProductListSkeleton />}>
                        <ProductList
                            categoryId={categoryId}
                            searchParams={resolvedParams}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

function ProductListSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                    <div className="w-full h-80 bg-gray-200 rounded-md animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                </div>
            ))}
        </div>
    );
}