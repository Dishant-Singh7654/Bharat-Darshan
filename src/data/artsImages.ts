// Collection of image URLs for Indian arts and crafts

interface ArtImage {
  name: string;
  imageUrl: string;
}

export const ARTS_IMAGES: ArtImage[] = [
  {
    name: "Madhubani Painting",
    imageUrl: "https://d35l77wxi0xou3.cloudfront.net/opencart/image/productFromFeb2020/Traditional%20Madhubani%20Painting1615964610-600x600.jpg"
  },
  {
    name: "Tanjore Painting",
    imageUrl: "https://dailydesignist.com/cdn/shop/products/07102020112012.png?v=1603485247"
  },
  {
    name: "Pashmina Shawls",
    imageUrl: "https://img.perniaspopupshop.com/catalog/product/d/u/DUSAM112321_2.JPG?impolicy=detailimageprod"
  },
  {
    name: "Bidri Work",
    imageUrl: "https://cultureandheritage.org/wp-content/uploads/2021/10/abcd-25.jpg"
  },
  {
    name: "Phulkari",
    imageUrl: "https://www.swistylish.com/cdn/shop/products/rsz_185a5735_1080x.jpg?v=1629538004"
  },
  {
    name: "Blue Pottery",
    imageUrl: "https://c9admin.cottage9.com/uploads/2322/image_2023_01_20T09_08_11_450Z-1024x723.png"
  },
  {
    name: "Pattachitra",
    imageUrl: "https://c9admin.cottage9.com/uploads/2499/Exploring-the-Significance-of-Pattachitra-Art-in-Jagannath-Ratha-Yatra.jpg"
  },
  {
    name: "Warli Painting",
    imageUrl: "https://www.memeraki.com/cdn/shop/files/2-3A_Warli_Village_Warli_Art_by_Dilip_Bahotha_800x.jpg?v=1735562021"
  }
];

// Helper function to get image URL by art name
export const getArtImageUrl = (artName: string): string => {
  const art = ARTS_IMAGES.find(art => art.name === artName);
  return art?.imageUrl || "https://images.unsplash.com/photo-1582483122059-6b0ad2b07a4f?q=80&w=800&auto=format&fit=crop";
};