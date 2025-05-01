import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface Festival {
  name: string;
  time: string;
  bestPlace: string;
  state: string;
  description: string;
  imageUrl?: string;
}

// Function to generate Google Maps link for a location
const getGoogleMapsLink = (place: string, state: string): string => {
  const query = encodeURIComponent(`${place}, ${state}, India`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

const FESTIVALS_DATA: Festival[] = [
  {
    name: "Diwali",
    time: "October – November (according to the Hindu lunar calendar)",
    bestPlace: "Ayodhya",
    state: "Uttar Pradesh",
    description: "Diwali, known as the Festival of Lights, symbolizes the victory of light over darkness and good over evil. It is marked by decorating homes with diyas and rangoli, bursting fireworks, and exchanging sweets.",
    imageUrl: "https://people.com/thmb/eGdSI1etRXh5lHugeJzBCsjF8uw=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/diwali-102022-6-9f38d9cf21504b40a5e3657ed46f3c96.jpg"
  },
  {
    name: "Holi",
    time: "March (on the full moon day of the Hindu month of Phalguna)",
    bestPlace: "Vrindavan",
    state: "Uttar Pradesh",
    description: "Holi, the Festival of Colors, is a vibrant celebration of the arrival of spring and the triumph of good over evil. Participants joyfully throw colored powders and water, dance to music, and share festive treats.",
    imageUrl: "https://cdn.getyourguide.com/img/tour/73647fffe8531ad2.jpeg/146.jpg"
  },
  {
    name: "Dussehra",
    time: "September – October (as per the lunar calendar)",
    bestPlace: "Mysore",
    state: "Karnataka",
    description: "Dussehra, also known as Vijayadashami, commemorates Lord Rama's victory over the demon king Ravana, symbolizing the triumph of good over evil. The festival features dramatic reenactments of the Ramayana and the burning of effigies of Ravana.",
    imageUrl: "https://cdn1.img.sputniknews.in/img/07e7/0a/18/5055084_0:160:3072:1888_1920x0_80_0_0_27b1cfda9cfcfa75819c932caaaf5862.jpg"
  },
  {
    name: "Ganesh Chaturthi",
    time: "August – September (observed on the fourth day of the Hindu lunar month of Bhadrapada)",
    bestPlace: "Mumbai",
    state: "Maharashtra",
    description: "Ganesh Chaturthi celebrates the birth of Lord Ganesha, revered as the remover of obstacles and the deity of wisdom and prosperity. The festival is marked by installing clay idols, elaborate prayers, and vibrant processions culminating in immersion ceremonies.",
    imageUrl: "https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2019/08/Ganesh-Chaturthi-Festival-Mumbai.jpg"
  },
  {
    name: "Krishna Janmashtami",
    time: "August – September (celebrated on the eighth day of the Krishna Paksha in the month of Bhadrapada)",
    bestPlace: "Mathura",
    state: "Uttar Pradesh",
    description: "Krishna Janmashtami commemorates the birth of Lord Krishna, celebrated with fasting, devotional singing, and dramatic reenactments of episodes from his life. The festivities highlight his playful charm and divine teachings.",
    imageUrl: "https://www.livemint.com/lm-img/img/2023/09/06/original/PTI09-05-2023-000145B-0_1693976681921.jpg"
  },
  {
    name: "Navaratri",
    time: "September – October (spanning nine nights, typically concluding with Vijayadashami/Dussehra)",
    bestPlace: "Gujarat",
    state: "Gujarat",
    description: "Navaratri is a nine-night festival dedicated to the worship of Goddess Durga in her various forms, symbolizing the triumph of good over evil. The celebrations include fasting, ritual dances (such as Garba and Dandiya), and cultural performances.",
    imageUrl: "https://cdn.britannica.com/40/147140-050-63A7ED5B/dancing-Garba-festival-Navratri-Ahmadabad-India-Gujarat.jpg"
  },
  {
    name: "Durga Puja",
    time: "September – October (during the Hindu month of Ashwin)",
    bestPlace: "Kolkata",
    state: "West Bengal",
    description: "Durga Puja celebrates Goddess Durga's victory over the demon Mahishasura, symbolizing the triumph of good over evil. The festival features elaborate pandals, artistic displays, cultural performances, and communal feasting.",
    imageUrl: "https://c9admin.cottage9.com/uploads/2409/The-Dance-of-Dhunuchi.jpg"
  },
  {
    name: "Raksha Bandhan",
    time: "August (on the full moon day of the Hindu month of Shravana)",
    bestPlace: "New Delhi",
    state: "Delhi",
    description: "Raksha Bandhan honors the bond between brothers and sisters, where sisters tie a sacred thread (rakhi) on their brothers' wrists to signify protection and mutual love. The festival is marked by heartfelt exchanges and family gatherings.",
    imageUrl: "https://images.cnbctv18.com/uploads/2023/08/raksha-bandhan.jpg"
  },
  {
    name: "Eid-ul-Fitr",
    time: "Varies by lunar sighting (celebrated at the end of Ramadan, typically in May or June)",
    bestPlace: "Old Delhi",
    state: "Delhi",
    description: "Eid-ul-Fitr marks the end of Ramadan, the Islamic holy month of fasting, and is celebrated with communal prayers, feasting, and acts of charity. It is a joyous occasion that brings families and communities together.",
    imageUrl: "https://decondesigns.com/wp-content/uploads/2024/04/Eid-ul-Fitr-also-known-as-the-Festival-of-Breaking-the-Fast.webp"
  },
  {
    name: "Eid-ul-Adha",
    time: "Varies by lunar sighting; observed on the 10th day of Dhul Hijjah in the Islamic calendar",
    bestPlace: "Hyderabad",
    state: "Telangana",
    description: "Eid-ul-Adha, also known as Bakrid, commemorates Prophet Ibrahim's willingness to sacrifice his son in obedience to God. The festival is marked by special prayers, animal sacrifices, and generous sharing of meat with the needy.",
    imageUrl: "https://www.aljazeera.com/wp-content/uploads/2020/07/b7481239933346e08157dcbdb39331d2_18.jpeg"
  },
  {
    name: "Christmas",
    time: "December 25 (fixed date)",
    bestPlace: "Goa",
    state: "Goa",
    description: "Christmas celebrates the birth of Jesus Christ and is observed with festive decorations, midnight masses, caroling, and joyful family gatherings. It brings a spirit of warmth and goodwill throughout communities.",
    imageUrl: "https://images.wanderon.in/blogs/new/2022/12/visit-the-christmas-market-to-shop-for-something-special-1.jpg"
  },
  {
    name: "Pongal",
    time: "January (typically on January 14 or 15)",
    bestPlace: "Thanjavur",
    state: "Tamil Nadu",
    description: "Pongal is a vibrant Tamil harvest festival that honors the sun and the bountiful harvest. It is celebrated by cooking the traditional Pongal dish, creating colorful kolams, and enjoying community festivities.",
    imageUrl: "https://i0.wp.com/www.easeindiatrip.com/blog/wp-content/uploads/2024/12/Pongal-Festival-02.jpg"
  },
  {
    name: "Onam",
    time: "August – September (during the Malayalam month of Chingam)",
    bestPlace: "Kochi",
    state: "Kerala",
    description: "Onam is Kerala's grand harvest festival celebrating the legendary homecoming of King Mahabali. The festival features floral rangolis (Pookalam), traditional dances, boat races, and sumptuous feasts.",
    imageUrl: "https://cdn.britannica.com/88/263888-050-4655CCBD/Hinduism-Pulikali-Tiger-dance-dancers-during-Onam-Fesitval-Kerala-India.jpg"
  },
  {
    name: "Baisakhi",
    time: "April 13 or 14",
    bestPlace: "Amritsar",
    state: "Punjab",
    description: "Baisakhi marks the Punjabi New Year and the harvest season, and it also commemorates the formation of the Khalsa in 1699 by Guru Gobind Singh. The festival is celebrated with vibrant processions, energetic bhangra, and traditional music throughout Punjab.",
    imageUrl: "https://tourdefarm.in/wp-content/uploads/2017/04/Baisakhi-Festival_Indian-Harvest-Festival-1.jpg"
  },
  {
    name: "Lohri",
    time: "January 13",
    bestPlace: "Chandigarh",
    state: "Punjab",
    description: "Lohri is a winter harvest festival celebrated predominantly in Punjab, marking the end of winter and the reaping of rabi crops. It is observed with lively bonfires, folk songs, and traditional dance that bring communities together.",
    imageUrl: "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/01/12/Pictures/lohri-new-delhi_094b2b76-352a-11ea-84d3-ff42d0551712.jpg"
  },
  {
    name: "Makar Sankranti",
    time: "January 14",
    bestPlace: "Ahmedabad",
    state: "Gujarat",
    description: "Makar Sankranti signals the sun's northward journey into Capricorn, heralding longer days and a bountiful harvest season across India. Festivities include kite flying, feasting on sesame and jaggery sweets, and various cultural events that showcase regional traditions.",
    imageUrl: "https://images.herzindagi.info/image/2019/Jan/kite-festival-gujarat-6.jpg"
  },
  {
    name: "Ugadi",
    time: "March or April (as per the lunar calendar)",
    bestPlace: "Hyderabad",
    state: "Telangana",
    description: "Ugadi, the New Year festival for Telugu and Kannada communities, celebrates new beginnings with the symbolic mixing of different flavors in the traditional Ugadi Pachadi. The day is filled with cultural performances, prayers, and festive family gatherings.",
    imageUrl: "https://www.utsavpedia.com/wp-content/uploads/2015/06/1.-httparchives.deccanchronicle.com130412lifestyle-offbeatgalleryugadi-and-new-year-celebrations-around-world.jpg"
  },
  {
    name: "Vishu",
    time: "Mid-April (typically on April 14)",
    bestPlace: "Kochi",
    state: "Kerala",
    description: "Vishu marks the traditional Malayalam New Year in Kerala and heralds the arrival of spring with a ritual display known as Vishukkani, believed to bring prosperity and good fortune. The celebration includes special feasts and cultural performances.",
    imageUrl: "https://th-i.thgim.com/public/incoming/mi4hay/article66740159.ece/alternates/FREE_1200/80692_14_4_2023_19_22_27_1_15TVKZVISHU1.JPG"
  },
  {
    name: "Chhath Puja",
    time: "October – November (during the Hindu month of Kartik)",
    bestPlace: "Patna",
    state: "Bihar",
    description: "Chhath Puja is an ancient festival dedicated to the Sun God, observed with intense fasting, holy river rituals, and community prayers to thank the Sun for sustaining life. It embodies deep devotion and environmental reverence.",
    imageUrl: "https://cdn.shopify.com/s/files/1/0597/5592/1540/files/chhath_puja_in_bihar_1024x1024.jpg?v=1730701144"
  },
  {
    name: "Guru Nanak Jayanti",
    time: "November (date varies according to the lunar calendar)",
    bestPlace: "Amritsar",
    state: "Punjab",
    description: "Guru Nanak Jayanti, also known as Gurpurab, commemorates the birth of Guru Nanak, the founder of Sikhism. The day is celebrated with processions, devotional hymns, and langar (community meals) in gurdwaras, emphasizing equality and compassion.",
    imageUrl: "https://www.kidzherald.com/wp-content/uploads/2024/10/When-Is-Guru-Nanak-Jayanti-Celebrated-1-1024x649.webp"
  },
  {
    name: "Ram Navami",
    time: "March – April (on the ninth day of the bright half of Chaitra)",
    bestPlace: "Ayodhya",
    state: "Uttar Pradesh",
    description: "Ram Navami celebrates the birth of Lord Rama, a revered figure in Hindu mythology celebrated for his righteousness and valor. Devotees observe the day with fasting, devotional singing, and dramatic reenactments of episodes from the Ramayana.",
    imageUrl: "https://ihplb.b-cdn.net/wp-content/uploads/2021/04/Ram-Navami-in-Ayodhya1.jpg"
  },
  {
    name: "Karva Chauth",
    time: "October – November (fourth day after the full moon in Kartik)",
    bestPlace: "Jaipur",
    state: "Rajasthan",
    description: "Karva Chauth is a traditional North Indian festival where married women fast from sunrise to moonrise for the longevity and well-being of their husbands. The day is filled with rituals, prayers, and the ceremonial breaking of the fast upon sighting the moon.",
    imageUrl: "https://cdn0.weddingwire.in/article/4644/3_2/1280/jpg/124464-karwa-chauth-2024.webp"
  },
  {
    name: "Basant Panchami",
    time: "Late January or early February (on the fifth day of Magha)",
    bestPlace: "Chandigarh",
    state: "Punjab/Haryana",
    description: "Basant Panchami heralds the arrival of spring and is celebrated by worshipping Goddess Saraswati, the deity of knowledge and arts. The festival is marked by vibrant yellow attire, kite flying, and cultural programs that uplift the spirit of renewal.",
    imageUrl: "https://discoverindiabycar.com/wp-content/uploads/2023/03/1-19.jpg"
  },
  {
    name: "Maha Shivratri",
    time: "February – March (on the 14th night of the new moon in Phalguna)",
    bestPlace: "Varanasi",
    state: "Uttar Pradesh",
    description: "Maha Shivratri is a sacred Hindu festival dedicated to Lord Shiva, characterized by all-night vigils, fasting, and devotional rituals at Shiva temples. Devotees offer water, milk, and prayers to the Shiva lingam to seek blessings and spiritual growth.",
    imageUrl: "https://media.assettype.com/english-sentinelassam%2Fimport%2Fh-upload%2F2021%2F02%2F02%2F195323-shivratri-2019-7.webp?w=480&dpr=2&auto=format%2Ccompress&fit=max&q=85"
  },
  {
    name: "New Year",
    time: "January 1 (Gregorian New Year)",
    bestPlace: "Mumbai",
    state: "Maharashtra",
    description: "New Year in India is celebrated with a blend of modern revelry and traditional customs, featuring dazzling fireworks, music, and festive gatherings. It symbolizes new beginnings and is embraced with great enthusiasm in urban centers across the country.",
    imageUrl: "https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/10/New-Year-parties-in-Navi-Mumbai-Cover-Photo-840x425.jpg"
  },
  {
    name: "Easter",
    time: "March – April (observed on the first Sunday after the first full moon following the vernal equinox)",
    bestPlace: "Goa",
    state: "Goa",
    description: "Easter celebrates the resurrection of Jesus Christ and is one of the most important Christian festivals, marked by special church services, festive meals, and cultural traditions like egg decorating.",
    imageUrl: "https://www.distinctdestinations.in/DistinctDestinationsBackEndImg/BlogImage/easter-break-to-celebrate-and-chill-L-distinctdestinations.jpg"
  },
  {
    name: "Buddha Purnima",
    time: "April – May (on the full moon day of the Vaisakha month in the Buddhist calendar)",
    bestPlace: "Bodh Gaya",
    state: "Bihar",
    description: "Buddha Purnima commemorates the birth, enlightenment, and passing away of Gautama Buddha. Devotees observe the day with visits to stupas, meditation, and the lighting of lamps to symbolize the dispelling of darkness and ignorance.",
    imageUrl: "https://images.moneycontrol.com/static-mcnews/2024/05/20240523164431_AFP__20240523__34TK7ZE__v1__HighRes__IndiaReligionBuddhismFestival.jpg"
  },
  {
    name: "Gudi Padwa",
    time: "March – April (on the first day of the Chaitra month in the Hindu calendar)",
    bestPlace: "Pune",
    state: "Maharashtra",
    description: "Gudi Padwa marks the Marathi New Year and the arrival of spring, symbolizing new beginnings and prosperity. It is celebrated with the hoisting of a decorated Gudi, traditional music, and festive culinary delights.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1679485160044-90d513fdbdc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Rath Yatra",
    time: "June – July (typically during the month of Ashadha in the Hindu calendar)",
    bestPlace: "Puri",
    state: "Odisha",
    description: "Rath Yatra is a vibrant chariot festival where deities, especially Lord Jagannath, are paraded through the streets in elaborately decorated chariots. The event showcases devotion, communal harmony, and cultural grandeur.",
    imageUrl: "https://media.assettype.com/TNIE%2Fimport%2F2012%2F5%2F16%2F13%2Foriginal%2F14jul_puri.jpg?w=480&auto=format%2Ccompress&fit=max"
  },
  {
    name: "Bihu",
    time: "April (Bohag Bihu – the spring festival)",
    bestPlace: "Guwahati",
    state: "Assam",
    description: "Bihu is the quintessential Assamese harvest festival that celebrates the arrival of spring and the reaping of crops. It is renowned for its energetic folk dances, traditional music, and communal feasts that embody the spirit of Assam.",
    imageUrl: "https://images.moneycontrol.com/static-mcnews/2024/04/MixCollage-13-Apr-2024-09-27-AM-4458-770x433.jpg?impolicy=website&width=770&height=431"
  }
];

const Festivals = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Alternative approach for older browsers
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Indian Festivals</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          India is known for its rich cultural heritage and diverse festivals. Here are some of the most significant festivals and the best places to experience them.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FESTIVALS_DATA.map((festival) => (
            <Card key={festival.name} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur india-card india-card-hover">
              {/* Image Section */}
              {festival.imageUrl && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* Gradient overlay that appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-12 h-12 paisley-pattern opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 paisley-pattern opacity-60 rotate-180"></div>
                  
                  <img 
                    src={festival.imageUrl} 
                    alt={`${festival.name} festival`} 
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{festival.name}</CardTitle>
                <CardDescription>Celebrated in {festival.time}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Best Place</TableCell>
                      <TableCell>{festival.bestPlace}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">State</TableCell>
                      <TableCell>{festival.state}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium" colSpan={2}>
                        {festival.description}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open(getGoogleMapsLink(festival.bestPlace, festival.state), '_blank')}
                  className="flex items-center gap-2 india-button hover:shadow-md"
                >
                  <MapPin className="h-4 w-4" />
                  View Location
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Festivals;
