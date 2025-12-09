export function generateProductSchema() {
    return {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Lumina Prime",
        "image": [
            "https://lumina.com/images/product-1x1.jpg",
            "https://lumina.com/images/product-16x9.jpg"
        ],
        "description": "The next generation of high-fidelity wireless audio. Featuring crystalline architecture and quantum drivers.",
        "brand": {
            "@type": "Brand",
            "name": "Lumina"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://lumina.com/prime",
            "priceCurrency": "USD",
            "price": "399.00",
            "availability": "https://schema.org/PreOrder"
        }
    };
}
