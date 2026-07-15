import type { Product } from '../types';

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Noor Chikankari Kurta Set",
    slug: "noor-chikankari-kurta-set",
    category: "Suits",
    price: 1899,
    originalPrice: 2999,
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop"
    ],
    description: "An elegant white Lucknowi Chikankari embroidered kurta set in premium cotton. Featuring fine hand-inspired thread work that celebrates heritage and craftsmanship. Perfectly paired with a matching churidar and a sheer, lightweight dupatta.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 12,
    isNew: true,
    isFeatured: true,
    keywords: ["white", "chikankari", "kurta set", "lucknowi", "cotton", "embroidery"],
    rating: 4.8,
    details: [
      "Authentic Lucknowi Chikankari design inspiration",
      "Includes Kurta, Bottom, and Dupatta",
      "Features delicate floral vines and leaf embroidery",
      "Breathable premium cotton fabric",
      "Semi-transparent look; lining suggested"
    ],
    fabricCare: [
      "Fabric: 100% Pure Cotton",
      "Hand wash separately in cold water",
      "Use mild detergent",
      "Dry in shade to maintain color longevity",
      "Iron on reverse side"
    ],
    shippingInfo: "Pan India shipping. Orders are dispatched within 24-48 hours and typically delivered within 3-5 business days.",
    returnPolicy: "Easy 7-day return and exchange policy. Product must be unused with all tags intact."
  },
  {
    id: "prod-2",
    name: "Meher Embroidered Suit",
    slug: "meher-embroidered-suit",
    category: "Suits",
    price: 2299,
    originalPrice: 3499,
    images: [
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Discover a masterpiece of style with our Meher Embroidered Suit. Designed in a rich teal shade with intricate gold-toned floral highlights around the neckline and borders. Ideal for evening celebrations and festive gatherings.",
    sizes: ["M", "L", "XL"],
    stock: 8,
    isNew: false,
    isFeatured: true,
    keywords: ["teal", "embroidered suit", "festive wear", "gold border", "silk blend"],
    rating: 4.6,
    details: [
      "Luxurious silk blend base",
      "Gold-toned hand-guided embroidery",
      "Comes with a heavy banarasi border dupatta",
      "Tailored straight silhouette",
      "Comfortable matching straight pants included"
    ],
    fabricCare: [
      "Fabric: Silk Blend",
      "Dry clean only recommended",
      "Cool iron if necessary",
      "Store in a muslin bag to protect gold threadwork"
    ],
    shippingInfo: "Pan India shipping. Free delivery on orders above ₹1,999. Delivered in 3-6 business days.",
    returnPolicy: "7-day return policy. Items must be in original condition with tags attached."
  },
  {
    id: "prod-3",
    name: "Zoya Cotton Chikankari Set",
    slug: "zoya-cotton-chikankari-set",
    category: "Suits",
    price: 1499,
    originalPrice: 1999,
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A soft, pastel peach cotton suit decorated with classic white shadow embroidery. Perfect for everyday wear, summer outings, and comfortable office elegance. Designed for high breathability and effortless grace.",
    sizes: ["S", "M", "L", "XL"],
    stock: 15,
    isNew: true,
    isFeatured: false,
    keywords: ["peach", "cotton", "everyday wear", "chikankari", "embroidered", "kurta"],
    rating: 4.5,
    details: [
      "Pure mulmul cotton construction",
      "Allover delicate shadow-work floral motifs",
      "Comfortable palazzo pants included",
      "Soft chiffon dupatta with lace trim border",
      "Round neck with V-cut detail"
    ],
    fabricCare: [
      "Fabric: 100% Mulmul Cotton",
      "Gentle machine wash in cold water",
      "Wash with similar colors",
      "Do not bleach",
      "Warm iron"
    ],
    shippingInfo: "Pan India shipping. Standard delivery in 4-6 business days.",
    returnPolicy: "Hassle-free 7-day returns. Reverse pick-up available in selected pin codes."
  },
  {
    id: "prod-4",
    name: "Aafreen Festive Suit",
    slug: "aafreen-festive-suit",
    category: "Suits",
    price: 2799,
    originalPrice: 3999,
    images: [
      "https://images.unsplash.com/photo-1631857455684-a54a2f03665f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A celebration of colors and embroidery, the Aafreen Festive Suit features detailed threadwork and subtle sequin embellishments. Crafted in a rich mustard yellow shade, it brings warmth and luxury to every festive occasion.",
    sizes: ["M", "L", "XL", "XXL"],
    stock: 5,
    isNew: true,
    isFeatured: true,
    keywords: ["mustard", "yellow", "festive suit", "sequin", "georgette", "embroidery"],
    rating: 4.9,
    details: [
      "Premium faux georgette base with soft lining",
      "Intricate zari and thread handwork",
      "Paired with comfortable satin salwar pants",
      "Scalloped border dupatta with matching sequins",
      "Elegant long sleeves with embroidered cuffs"
    ],
    fabricCare: [
      "Fabric: Georgette and Satin",
      "Dry clean preferred",
      "Steam iron on low heat",
      "Avoid direct contact with perfume sprays"
    ],
    shippingInfo: "Express shipping available. Standard shipping takes 3-5 business days across India.",
    returnPolicy: "Eligible for exchange or store credit within 7 days of delivery."
  },
  {
    id: "prod-5",
    name: "Inaya Lucknowi Suit",
    slug: "inaya-lucknowi-suit",
    category: "Suits",
    price: 3499,
    originalPrice: 4999,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A luxury classic representation of Lucknow's finest craft heritage. Handcrafted motifs detailed beautifully on a premium silk base. Perfect for brides, festive hosts, and women who appreciate traditional elegance.",
    sizes: ["S", "M", "L", "XL"],
    stock: 4,
    isNew: false,
    isFeatured: true,
    keywords: ["luxury", "silk suit", "lucknowi craft", "premium", "beige", "gold embroidery"],
    rating: 4.9,
    details: [
      "100% Premium Chanderi Silk",
      "High neck styling with gold button details",
      "Ornate hand-inspired heavy border embroidery",
      "Includes pure silk straight trousers",
      "Tissue silk dupatta with embroidered border"
    ],
    fabricCare: [
      "Fabric: Chanderi Silk",
      "Dry clean only",
      "Iron with an overlay cloth on medium heat",
      "Store wrapped in soft cotton fabric"
    ],
    shippingInfo: "Premium boxed shipping. Secure delivery across India in 3-5 days.",
    returnPolicy: "7-day returns. Item must be in brand-new condition with all tags and original packaging."
  },
  {
    id: "prod-6",
    name: "Mahira Embroidered Kurta Set",
    slug: "mahira-embroidered-kurta-set",
    category: "Suits",
    price: 1799,
    originalPrice: 2299,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Embrace everyday elegance with the Mahira Kurta Set. Done in a pastel mint green with fine floral shadow embroidery around the neck and sleeves. Lightweight and comfortable for year-round styling.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 20,
    isNew: false,
    isFeatured: false,
    keywords: ["mint green", "kurta set", "cotton blend", "pastel", "shadow embroidery"],
    rating: 4.4,
    details: [
      "Breathable cotton linen blend fabric",
      "Exquisite tone-on-tone embroidery",
      "Features utility pockets in pants",
      "Elegant V-neck and 3/4th sleeves",
      "Ankle-length straight pants"
    ],
    fabricCare: [
      "Fabric: Cotton Linen Blend",
      "Machine wash cold with like colors",
      "Tumble dry low",
      "Warm iron on reverse side"
    ],
    shippingInfo: "Standard shipping in 3-6 business days. Cash on delivery available.",
    returnPolicy: "Easy 7-day returns via our portal."
  },
  {
    id: "prod-7",
    name: "Gulnaar Heritage Saree",
    slug: "gulnaar-heritage-saree",
    category: "Sarees",
    price: 3499,
    originalPrice: 4999,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Our signature Gulnaar Saree features a striking crimson red shade with gold zari woven details all over. Inspired by the royal drapes of India, this saree brings a touch of royalty and heritage to your wardrobe.",
    sizes: ["One Size"],
    stock: 6,
    isNew: true,
    isFeatured: true,
    keywords: ["red", "saree", "zari work", "heritage", "royal drape", "silk saree"],
    rating: 5.0,
    details: [
      "Length: 5.5 meters plus 0.8 meters running blouse piece",
      "Woven Banarasi-inspired borders with antique gold zari",
      "Soft, luxurious drape that flatters all body types",
      "Richly detailed pallu with traditional paisley motifs",
      "Includes high-quality matching blouse fabric"
    ],
    fabricCare: [
      "Fabric: Art Silk",
      "Dry clean only recommended",
      "Do not squeeze or wring",
      "Store folded in a breathable cotton saree cover"
    ],
    shippingInfo: "Pan India delivery. Free shipping. Dispatched in 24 hours.",
    returnPolicy: "7-day return policy. Uncut blouse piece and original folding must be maintained."
  },
  {
    id: "prod-8",
    name: "Nazakat Embroidered Saree",
    slug: "nazakat-embroidered-saree",
    category: "Sarees",
    price: 2799,
    originalPrice: 3500,
    images: [
      "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A lightweight, ethereal organza saree in a delicate sky blue tone. Detailed with fine hand-guided Chikankari-inspired threadwork and scalloped edges. A perfect blend of modernity and age-old Indian craftsmanship.",
    sizes: ["One Size"],
    stock: 10,
    isNew: true,
    isFeatured: false,
    keywords: ["blue", "saree", "organza", "scallop border", "chikankari threadwork"],
    rating: 4.7,
    details: [
      "Length: 5.5 meters + 0.8 meters embroidery blouse piece",
      "Ethereal transparent organza silk fabric",
      "Beautiful scalloped border embroidery detailing",
      "Features small floral spray motifs all over the body",
      "Starch-free soft finish for easy draping"
    ],
    fabricCare: [
      "Fabric: Organza Silk",
      "Dry clean only",
      "Iron on low heat under a protective cloth",
      "Keep away from sharp objects to prevent snags"
    ],
    shippingInfo: "Standard shipping inside India within 4-7 days.",
    returnPolicy: "7-day returns. Saree must be unworn and un-draped."
  },
  {
    id: "prod-9",
    name: "Rooh Elegant Saree",
    slug: "rooh-elegant-saree",
    category: "Sarees",
    price: 1899,
    originalPrice: 2499,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Elegant, minimalist, and timeless. The Rooh Saree features a soothing cream base with soft antique gold border lines. A classic choice for daytime festivities, cultural events, or family ceremonies.",
    sizes: ["One Size"],
    stock: 15,
    isNew: false,
    isFeatured: true,
    keywords: ["cream", "gold border", "minimalist saree", "day wear", "cotton silk"],
    rating: 4.8,
    details: [
      "Length: 5.5 meters + 0.8 meters plain blouse piece",
      "Cotton-silk blend fabric offering subtle luster",
      "Thin antique gold zari border and geometric pallu lines",
      "Extremely lightweight and easy to carry",
      "Semi-formal classic layout"
    ],
    fabricCare: [
      "Fabric: Cotton Silk Blend",
      "Dry clean or gentle hand wash in cold water",
      "Do not soak for long durations",
      "Iron on medium heat"
    ],
    shippingInfo: "Pan India shipping. Delivered within 3-5 business days.",
    returnPolicy: "Easy 7-day exchange or returns."
  },
  {
    id: "prod-10",
    name: "Mehrunisa Festive Saree",
    slug: "mehrunisa-festive-saree",
    category: "Sarees",
    price: 3899,
    originalPrice: 5499,
    images: [
      "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Designed for grand celebrations, the Mehrunisa Festive Saree is crafted in premium georgette silk with dense golden zardosi embroidery details. Step into the spotlight and exude true heritage glamour.",
    sizes: ["One Size"],
    stock: 3,
    isNew: false,
    isFeatured: true,
    keywords: ["georgette", "saree", "gold embroidery", "zardosi", "heavy saree", "wedding"],
    rating: 4.9,
    details: [
      "Length: 5.5 meters + 0.8 meters heavy work blouse piece",
      "Premium heavy georgette with satin borders",
      "Allover golden zardosi work border and matching pallu",
      "Falls beautifully with a heavy weight fall",
      "Designed for grand weddings and celebrations"
    ],
    fabricCare: [
      "Fabric: Heavy Georgette Silk",
      "Dry clean only",
      "Store wrapped in tissue or clean muslin cloth",
      "Avoid heavy hangers; store folded flat"
    ],
    shippingInfo: "Premium secure delivery across India in 3-5 business days.",
    returnPolicy: "Eligible for exchange or return within 7 days. Blouse piece must remain unstitched."
  },
  {
    id: "prod-11",
    name: "Adaa Traditional Saree",
    slug: "adaa-traditional-saree",
    category: "Sarees",
    price: 2299,
    originalPrice: 2999,
    images: [
      "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A gorgeous green cotton saree with traditional border weaves. Known for its earthy tones and high breathability, it offers a traditional look while keeping you comfortable all day long.",
    sizes: ["One Size"],
    stock: 11,
    isNew: false,
    isFeatured: false,
    keywords: ["green", "saree", "cotton saree", "traditional weave", "earthy"],
    rating: 4.5,
    details: [
      "Length: 5.5 meters + 0.8 meters contrast blouse piece",
      "100% Pure handloom cotton",
      "Traditional borders inspired by temple weaves",
      "Perfect drape for hot and humid climates",
      "Rich rustic textures"
    ],
    fabricCare: [
      "Fabric: 100% Handloom Cotton",
      "First wash dry clean; subsequent washes cold hand wash",
      "Wash separately to prevent dye bleeding",
      "Starch lightly for a crisp traditional fall"
    ],
    shippingInfo: "Pan India delivery in 4-6 business days.",
    returnPolicy: "7-day return policy. Standard conditions apply."
  },
  {
    id: "prod-12",
    name: "Noorani Celebration Saree",
    slug: "noorani-celebration-saree",
    category: "Sarees",
    price: 3299,
    originalPrice: 4299,
    images: [
      "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Feel absolutely beautiful in this premium mulberry silk saree with exquisite silver threadwork. Elegant and graceful, the Noorani Saree is a gorgeous choice for festive gatherings, evening parties, and cultural celebrations.",
    sizes: ["One Size"],
    stock: 7,
    isNew: false,
    isFeatured: false,
    keywords: ["mulberry silk", "saree", "silver threadwork", "celebration", "pastel green"],
    rating: 4.8,
    details: [
      "Length: 5.5 meters + 0.8 meters silver work blouse piece",
      "100% Premium Mulberry Silk blend",
      "Intricate silver thread floral motifs all over",
      "Luxurious soft sheen and lightweight comfort",
      "Graceful border draping"
    ],
    fabricCare: [
      "Fabric: Mulberry Silk Blend",
      "Dry clean only",
      "Store wrapped in clean muslin cloth",
      "Iron on very low heat under silk setting"
    ],
    shippingInfo: "Premium secure delivery across India in 3-5 days.",
    returnPolicy: "7-day returns. Must be in original folded condition with tags intact."
  }
];
