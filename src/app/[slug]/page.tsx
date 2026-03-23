import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DOMPurify from "isomorphic-dompurify";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

    const wixClient = await wixClientServer();

    const products = await wixClient.products
        .queryProducts()
        .eq("slug", slug)
        .find();

    if (!products.items[0]) {
        return notFound();
    }

    const product = products.items[0];

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 py-8">
            {/* IMG */}
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <ProductImages items={product.media?.items} />
            </div>

            {/* TEXTS */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-4xl font-bold">{product.name}</h1>

                {product.description && (
                    <div
                        className="text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(product.description),
                        }}
                    />
                )}

                <div className="h-[2px] bg-gray-100" />

                {/* Price */}
                {product.price?.price === product.price?.discountedPrice ? (
                    <h2 className="font-semibold text-3xl">KES {product.price?.price}</h2>
                ) : (
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl text-gray-500 line-through">
                            KES {product.price?.price}
                        </h3>
                        <h2 className="font-semibold text-3xl text-rose-600">
                            KES {product.price?.discountedPrice}
                        </h2>
                    </div>
                )}

                <div className="h-[2px] bg-gray-100" />

                {/* Add to Cart / Customize */}
                {product.variants && product.productOptions ? (
                    <CustomizeProducts
                        productId={product._id!}
                        variants={product.variants}
                        productOptions={product.productOptions}
                    />
                ) : (
                    <Add
                        productId={product._id!}
                        variantId="00000000-0000-0000-0000-000000000000"
                        stockNumber={product.stock?.quantity || 0}
                    />
                )}

                <div className="h-[2px] bg-gray-100" />

                {/* Additional Info */}
                {product.additionalInfoSections?.map((section: any) => (
                    <div className="text-sm" key={section.title}>
                        <h4 className="font-semibold text-lg mb-2">{section.title}</h4>
                        <div
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(section.description || ""),
                            }}
                        />
                    </div>
                ))}

                <div className="h-[2px] bg-gray-100" />

                {/* REVIEWS */}
                <h2 className="text-2xl font-bold">User Reviews</h2>
                {/*<Suspense fallback={<div className="text-gray-500">Loading reviews...</div>}>*/}
                {/*    <Reviews productId={product._id!} />*/}
                {/*</Suspense>*/}
            </div>
        </div>
    );
};

export default SinglePage;