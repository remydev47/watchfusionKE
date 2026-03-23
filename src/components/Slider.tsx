import { wixClientServer } from "@/lib/wixClientServer";
import SliderClient, { SlideData } from "./SliderClient";
import { media as wixMedia } from "@wix/sdk";

// Fallback slides used when no CMS promotions exist
const fallbackSlides: SlideData[] = [
    {
        id: 'product',
        title: 'MEGIR TACTICAL\nCRAFTED BY YOU',
        description: 'Take advantage of premium materials and precision engineering with a timepiece built for the modern professional.',
        categoryTag: 'Premium & Precision',
        buttonText: 'Shop Now',
        img: '/products/megir2.jpg',
        url: '/shop',
        bg: 'from-orange-400 via-orange-500 to-orange-600',
    },
    {
        id: 'promotional',
        title: 'BLACK FRIDAY\nWEBSITE SALE',
        subtitle: 'UP TO 50% OFF',
        description: 'Celebrate our website launch with unbeatable deals on premium timepieces. Limited time offer on all collections.',
        categoryTag: 'Limited Time Only',
        buttonText: 'Shop Sale',
        img: '/products/megirb.jpg',
        url: '/deals',
        bg: 'from-red-500 via-red-600 to-red-700',
    },
    {
        id: 'deals',
        title: 'EXPLORE OUR\nCOLLECTION',
        subtitle: 'NEW ARRIVALS',
        description: 'Discover the latest additions to our premium watch collection. Style meets substance.',
        categoryTag: 'Just Dropped',
        buttonText: 'Shop Now',
        img: '/products/cap1.jpeg',
        url: '/shop',
        bg: 'from-slate-700 via-slate-800 to-slate-900',
    }
];

const Slider = async () => {
    let slides: SlideData[] = fallbackSlides;

    try {
        const wixClient = await wixClientServer();

        // Query the "Promotions" CMS collection for active promotions
        const { items: promotions } = await wixClient.items
            .query("Promotions")
            .ascending("order")
            .find();

        if (promotions && promotions.length > 0) {
            const cmsSlides: SlideData[] = promotions
                .filter((item) => item.data?.isActive !== false)
                .map((item) => {
                    const data = item.data!;
                    // Handle image: could be a Wix media URL or a string
                    let imgUrl = data.image || "/products/megir2.jpg";
                    if (typeof imgUrl === "string" && imgUrl.startsWith("wix:image://")) {
                        imgUrl = wixMedia.getScaledToFillImageUrl(imgUrl, 1200, 800, {});
                    } else if (typeof imgUrl === "object" && imgUrl?.src) {
                        // Handle Wix media object format
                        imgUrl = wixMedia.getScaledToFillImageUrl(imgUrl.src, 1200, 800, {});
                    }

                    return {
                        id: item._id || data.title || String(Math.random()),
                        title: data.title || "WATCH FUSION",
                        subtitle: data.subtitle || undefined,
                        description: data.description || "",
                        categoryTag: data.categoryTag || "",
                        buttonText: data.buttonText || "Shop Now",
                        img: imgUrl,
                        url: data.url || "/shop",
                        bg: data.bgGradient || "from-orange-400 via-orange-500 to-orange-600",
                    };
                });

            if (cmsSlides.length > 0) {
                slides = cmsSlides;
            }
        }
    } catch (err) {
        // If CMS query fails (e.g. collection doesn't exist yet), use fallback slides
        console.log("Using fallback slides (Promotions collection not found or error):", err);
    }

    return <SliderClient slides={slides} />;
};

export default Slider;