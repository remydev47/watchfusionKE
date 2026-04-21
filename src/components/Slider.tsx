import { wixClientServer } from "@/lib/wixClientServer";
import SliderClient, { SlideData } from "./SliderClient";
import { media as wixMedia } from "@wix/sdk";

// Fallback slides used when no CMS promotions exist
const fallbackSlides: SlideData[] = [
    {
        id: 'hero',
        title: 'WEAR THE MOMENT\nOWN THE LEGACY',
        description: 'Premium timepieces crafted for those who value precision, style, and the art of timekeeping.',
        categoryTag: 'Premium Collection',
        buttonText: 'Explore Collection',
        img: '/products/megir2.jpg',
        url: '/shop',
        bg: 'from-orange-400 via-orange-500 to-orange-600',
    },
    {
        id: 'elegance',
        title: 'TIMELESS\nELEGANCE',
        subtitle: 'REDEFINE YOUR STYLE',
        description: 'From boardroom to weekend — discover watches that complement every moment of your journey.',
        categoryTag: 'Gents & Ladies',
        buttonText: 'Shop Now',
        img: '/products/megirb.jpg',
        url: '/shop',
        bg: 'from-slate-700 via-slate-800 to-slate-900',
    },
    {
        id: 'arrivals',
        title: 'NEW ARRIVALS\nJUST LANDED',
        subtitle: 'FRESH STYLES',
        description: 'Be the first to rock the latest additions to our curated collection. Limited pieces, unlimited style.',
        categoryTag: 'Just Dropped',
        buttonText: 'Shop New In',
        img: '/products/cap1.jpeg',
        url: '/shop?cat=gents-watches',
        bg: 'from-emerald-600 via-emerald-700 to-emerald-800',
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