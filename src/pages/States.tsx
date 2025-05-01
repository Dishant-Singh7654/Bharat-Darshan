import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StateDialog from "@/components/StateDialog";
import { StateInfo, TouristPlace } from "@/types/states";
import { MapPin } from "lucide-react";

export const STATES_DATA: StateInfo[] = [
  {
    name: "Assam",
    capital: "Dispur",
    touristPlaces: [
      {
        id: "assam-kaziranga",
        name: "Kaziranga National Park",
        description: "A UNESCO World Heritage Site, Kaziranga is renowned for its population of the endangered one-horned rhinoceros. The park also hosts tigers, elephants, wild water buffalo, and a variety of bird species.",
        location: "Kaziranga, Assam",
        googleMapsUrl: "https://maps.app.goo.gl/ErcTHrtfuPqiSyHi8",
        bestTimeToVisit: "November to April",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Beauty_of_Kaziranga_National_Park.jpg",
        hotels: [
          {
            name: "Diphlu River Lodge",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/DT-9922UMQIQYI"
          },
          {
            name: "Iora – The Retreat",
            rating: 4.3,
            bookingUrl: "https://www.goibibo.com/hotels/iora-retreat-kaziranga-hotel-in-kohora-8453047756119108429"
          },
          {
            name: "Wild Grass Lodge",
            rating: 4.3,
            bookingUrl: "https://jsdl.in/DT-99MTSGWZ"
          },
          {
            name: "Landmark Woods",
            rating: 3.8,
            bookingUrl: "https://jsdl.in/DT-992A2AME6EY"
          },
          {
            name: "Infinity Resorts",
            rating: 4.2,
            bookingUrl: "https://jsdl.in/DT-99YYQIMU2AA"
          }
        ]
      },
      {
        id: "assam-majuli",
        name: "Majuli Island",
        description: "Majuli, the world's largest river island, is a cultural hub of Assam. It's known for its vibrant festivals, traditional satras (monasteries), and unique Mishing tribal culture.",
        location: "Majuli, Assam",
        googleMapsUrl: "https://maps.app.goo.gl/wGmtXZz2rN8RjmPG7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://footloosedev.com/wp-content/uploads/2016/01/bamboo-cottage.jpg",
        hotels: [
          {
            name: "Okegiga Homes",
            rating: 4.3,
            bookingUrl: "https://www.goibibo.com/hotels/okegiga-homes-hotel-in-majuli-4106235036116221770"
          },
          {
            name: "Eco-Camp Me: Po Okum Happy House",
            rating: 3.4,
            bookingUrl: "https://jsdl.in/DT-9998V4XV5SS"
          },
          {
            name: "Enchanting Majuli Resort",
            rating: 4.2,
            bookingUrl: "https://jsdl.in/DT-99AYMMUE6QU"
          },
          {
            name: "La Maison de Ananda",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/DT-99YY2E66MQU"
          },
          {
            name: "Risong Family Guest House",
            rating: 4.8,
            bookingUrl: "https://jsdl.in/DT-99INK3RQ9MQ"
          }
        ]
      },
      {
        id: "assam-kamakhya",
        name: "Kamakhya Temple",
        description: "Perched atop Nilachal Hill, Kamakhya Temple is one of the most revered Shakti Peethas in India. It's a significant pilgrimage site, attracting devotees from across the country.",
        location: "Guwahati, Assam",
        googleMapsUrl: "https://maps.app.goo.gl/ZVgQwhtMWkoQzax78",
        bestTimeToVisit: "October to April",
        imageUrl: "https://sacredsites.com/images/asia/india/Kamakhya-Temple-Guwahati-Assam-1-1200.jpg",
        hotels: [
          {
            name: "Hotel Rituraj",
            rating: 3.8,
            bookingUrl: "https://www.goibibo.com/hotels/rituraj-pure-veg-hotel-in-guwahati-6689556460003252963"
          },
          {
            name: "Swastik Inn",
            rating: 3.6,
            bookingUrl: "https://www.goibibo.com/hotels/rituraj-pure-veg-hotel-in-guwahati-1351467186181011580"
          },
          {
            name: "Dynasty Hotel",
            rating: 3.3,
            bookingUrl: "https://www.goibibo.com/hotels/dynasty-hotel-in-guwahati-278127428004273850/"
          },
          {
            name: "Radisson Blu Hotel",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/DT-996GHS2Q"
          },
          {
            name: "Vishwaratna Hotel",
            rating: 4.5,
            bookingUrl: "https://www.goibibo.com/hotels/vishwaratna-hotel-in-guwahati-3835116232762210675"
          }
        ]
      },
      {
        id: "assam-manas",
        name: "Manas National Park",
        description: "A UNESCO World Heritage Site, Manas National Park is a biosphere reserve and a Project Tiger reserve. It's home to rare species like the golden langur and pygmy hog.",
        location: "Manas, Assam",
        googleMapsUrl: "https://maps.app.goo.gl/VHXqBLXq6shyrbFB6",
        bestTimeToVisit: "November to April",
        imageUrl: "https://res.cloudinary.com/htoindia/images/f_auto,q_auto/v1513601560/manas-national-park-_vub2py/manas-national-park-_vub2py.jpg?_i=AA",
        hotels: [
          {
            name: "Manas Jungle Retreat",
            rating: 4.7,
            bookingUrl: "https://www.goibibo.com/hotels/manas-jungle-retreat-boutique-resort-hotel-in-manas-4312462902564387048"
          },
          {
            name: "Eagle Nest Eco Retreat",
            rating: 4.2,
            bookingUrl: "https://www.goibibo.com/hotels/eagle-nest-eco-retreat-hotel-in-manas-1299767369075626320"
          },
          {
            name: "Florican Cottages",
            rating: 4.6,
            bookingUrl: "https://www.goibibo.com/hotels/florican-cottage-hotel-in-manas-6596654398478702238"
          },
          {
            name: "Musa Jungle Retreat",
            rating: 4.3,
            bookingUrl: "https://www.goibibo.com/hotels/musa-jungle-retreat-cottage-rooms-restaurant-hotel-in-manas-5723283569435040242"
          },
          {
            name: "Bansbari Lodge",
            rating: 3.9,
            bookingUrl: "https://jsdl.in/DT-99QSMMYM"
          }
        ]
      },
      {
        id: "assam-sivasagar",
        name: "Sivasagar",
        description: "Once the capital of the Ahom Kingdom, Sivasagar is dotted with historical monuments, including temples, palaces, and tanks that reflect the architectural prowess of the Ahoms.",
        location: "Sivasagar, Assam",
        googleMapsUrl: "https://maps.app.goo.gl/qwNMihL5zGigWrkK8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.hotelpiccolo.in/assets/resources/Sivasagar-Shiva-Dol-01-700x480.jpg",
        hotels: [
          {
            name: "The White IBIS A Boutique Hotel",
            rating: 4.3,
            bookingUrl: "https://www.goibibo.com/hotels/the-white-ibis-a-boutique-hotel-in-sivasagar-1951713207441352558"
          },
          {
            name: "Hotel Holiday Palace",
            rating: 4.5,
            bookingUrl: "https://www.goibibo.com/hotels/holiday-palace-hotel-in-sivasagar-1796142454196156426"
          },
          {
            name: "Hotel Deo Volente",
            rating: 3.9,
            bookingUrl: "https://www.goibibo.com/hotels/deo-volente-hotel-in-sivasagar-8599019052560660882"
          },
          {
            name: "Hotel Kalita Palace",
            rating: 4.0,
            bookingUrl: "https://www.goibibo.com/hotels/kalita-palace-hotel-in-sivasagar-8790218213417445001"
          },
          {
            name: "Hotel Gulmohar Grand",
            rating: 4.2,
            bookingUrl: "https://www.goibibo.com/hotels/gulmohar-grand-hotel-in-jorhat-6569047562408249081"
          }
        ]
      }
    ],
  },
  {
    name: "Rajasthan",
    capital: "Jaipur",
    touristPlaces: [
      {
        id: "rajasthan-jaipur",
        name: "Jaipur",
        description: "Known as the \"Pink City,\" Jaipur boasts a rich cultural heritage with historic forts, palaces, and vibrant markets.",
        location: "Jaipur, Rajasthan",
        googleMapsUrl: "https://maps.app.goo.gl/u1cZumND17XzCbFo8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/amber-fort-jaipur-rajasthan-1-attr-hero?qlt=82&ts=1726660248715",
        hotels: [
          {
            name: "Taj Rambagh Palace",
            rating: 4.8,
            bookingUrl: "https://jsdl.in/RSL-VHE1745342987"
          },
          {
            name: "The Oberoi Rajvilas",
            rating: 4.8,
            bookingUrl: "https://jsdl.in/DT-307WMW1Y"
          },
          {
            name: "ITC Rajputana",
            rating: 4.6,
            bookingUrl: "https://www.goibibo.com/hotels/itc-rajputana-a-luxury-collection-hotel-in-jaipur-7431082656517804669/"
          },
          {
            name: "Jaipur Marriott Hotel",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/RSL-RJX1745343077"
          },
          {
            name: "Fairmont Jaipur",
            rating: 4.6,
            bookingUrl: "https://jsdl.in/RSL-RID1745343426"
          }
        ]
      },
      {
        id: "rajasthan-udaipur",
        name: "Udaipur",
        description: "Dubbed the \"City of Lakes,\" Udaipur is renowned for its picturesque lakes and majestic palaces.",
        location: "Udaipur, Rajasthan",
        googleMapsUrl: "https://maps.app.goo.gl/3hzS5unicFcBWdxt7",
        bestTimeToVisit: "September to March",
        imageUrl: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/74/b3/ab.jpg",
        hotels: [
          {
            name: "Sawai Man Mahal",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/RSL-CJC1745343577"
          },
          {
            name: "The Oberoi Udaivilas",
            rating: 4.6,
            bookingUrl: "https://jsdl.in/RSL-UQV1745343700"
          },
          {
            name: "The Leela Palace Udaipur",
            rating: 4.8,
            bookingUrl: "https://jsdl.in/RSL-YXL1745343807"
          },
          {
            name: "Trident Udaipur",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/RSL-TXU1745343876"
          },
          {
            name: "Fateh Prakash Palace",
            rating: 4.7,
            bookingUrl: "https://jsdl.in/RSL-FCC1745343924"
          }
        ]
      },
      {
        id: "rajasthan-jaisalmer",
        name: "Jaisalmer",
        description: "Known as the \"Golden City,\" Jaisalmer is famed for its yellow sandstone architecture and desert landscapes.",
        location: "Jaisalmer, Rajasthan",
        googleMapsUrl: "https://maps.app.goo.gl/2zRhnw4mksX53UTs9",
        bestTimeToVisit: "October to March",
        imageUrl: "https://powertraveller.com/wp-content/uploads/2024/08/1_3-days-jaisalmer-tour-from-jodhpur.jpg",
        hotels: [
          {
            name: "Suryagarh Jaisalmer",
            rating: 4.7,
            bookingUrl: "https://jsdl.in/RSL-AXF1745344012"
          },
          {
            name: "Jaisalmer Marriott Resort & Spa",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/RSL-VOL1745344097"
          },
          {
            name: "The Gulaal",
            rating: 4.8,
            bookingUrl: "https://jsdl.in/RSL-SNF1745344141"
          },
          {
            name: "Hotel Rang Mahal",
            rating: 4.1,
            bookingUrl: "https://jsdl.in/RSL-TTX1745344179"
          },
          {
            name: "The Thar Desert Resort & camp",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/RSL-ARB1745344265"
          }
        ]
      },
      {
        id: "rajasthan-jodhpur",
        name: "Jodhpur",
        description: "Known as the \"Blue City,\" Jodhpur is famous for its blue-painted houses and the imposing Mehrangarh Fort.",
        location: "Jodhpur, Rajasthan",
        googleMapsUrl: "https://maps.app.goo.gl/r77mmFG5WqVDH31KA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.jaipurtaxiservices.com/tourpackage/jodhpur-jaisalmer-4-days-tour.webp",
        hotels: [
          {
            name: "Umaid Bhawan Palace",
            rating: 4.6,
            bookingUrl: "https://jsdl.in/RSL-FAY1745344414"
          },
          {
            name: "RAAS Jodhpur",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/RSL-JLS1745344452"
          },
          {
            name: "Indana Palace",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/RSL-ACF1745344494"
          },
          {
            name: "Ajit Bhawan",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/RSL-BLP1745344655"
          },
          {
            name: "The Ummed Jodhpur",
            rating: 4.1,
            bookingUrl: "https://jsdl.in/RSL-FTL1745344700"
          }
        ]
      },
      {
        id: "rajasthan-pushkar",
        name: "Pushkar",
        description: "A sacred town known for its holy lake and the annual Pushkar Camel Fair.",
        location: "Pushkar, Rajasthan",
        googleMapsUrl: "https://maps.app.goo.gl/7WY8QXKQ81HGG7om9",
        bestTimeToVisit: "October to March",
        imageUrl: "https://static.toiimg.com/photo/msid-26212164,width-96,height-65.cms",
        hotels: [
          {
            name: "The Westin Pushkar Resort & Spa",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/RSL-VUK1745344760"
          },
          {
            name: "Ananta Spa & Resorts",
            rating: 4.3,
            bookingUrl: "https://jsdl.in/RSL-IQG1745344792"
          },
          {
            name: "Brahma Horizon",
            rating: 4.6,
            bookingUrl: "https://jsdl.in/RSL-TEE1745344852"
          },
          {
            name: "Dera Masuda",
            rating: 3.9,
            bookingUrl: "https://jsdl.in/RSL-YXB1745344889"
          },
          {
            name: "Pushkar Resorts",
            rating: 4.2,
            bookingUrl: "https://jsdl.in/RSL-ARB1745344919"
          }
        ]
      }
    ],
  },
  {
    name: "Uttar Pradesh",
    capital: "Lucknow",
    touristPlaces: [
      {
        id: "uttar-pradesh-taj-mahal",
        name: "Taj Mahal",
        description: "The Taj Mahal is a magnificent white marble mausoleum located in Agra, India, built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. Recognized as a UNESCO World Heritage Site, it is celebrated for its stunning architectural beauty and intricate craftsmanship, symbolizing eternal love.",
        location: "Agra, Uttar Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/UCX3C79GYByVuuX29",
        bestTimeToVisit: "October to March",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Taj_Mahal%2C_Agra%2C_India.jpg/1200px-Taj_Mahal%2C_Agra%2C_India.jpg",
        hotels: [
          {
            name: "The Oberoi Amarvilas",
            rating: 4.8,
            bookingUrl: "https://jsdl.in/RSL-SKD1745344997"
          },
          {
            name: "ITC Mughal",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/RSL-ULJ1745345026"
          },
          {
            name: "Taj Hotel & Convention Centre",
            rating: 4.3,
            bookingUrl: "https://jsdl.in/RSL-ASF1745345058"
          },
          {
            name: "Trident Agra",
            rating: 4.7,
            bookingUrl: "https://jsdl.in/RSL-XVO1745345088"
          },
          {
            name: "Courtyard by Marriott Agra",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/RSL-FOI1745345123"
          }
        ]
      },
      {
        id: "uttar-pradesh-varanasi",
        name: "Varanasi",
        description: "One of the world's oldest living cities, renowned for its ghats, spiritual rituals along the Ganges, and rich cultural heritage.",
        location: "Varanasi, Uttar Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/EE6FHkzPADt1xqTX7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://dhramshala.in/wp-content/uploads/2023/09/varanasi-ghats.jpg",
        hotels: [
          {
            name: "Taj Nadesar Palace",
            rating: 4.8,
            bookingUrl: "https://jsdl.in/RSL-XXW1745346204"
          },
          {
            name: "Brijrama Palace",
            rating: 4.7,
            bookingUrl: "https://jsdl.in/RSL-GMY1745346246"
          },
          {
            name: "Radisson Hotel",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/RSL-XED1745346429"
          },
          {
            name: "Hotel Clarks Varanasi",
            rating: 4.0,
            bookingUrl: "https://jsdl.in/RSL-RKB1745346353"
          },
          {
            name: "Ramada Plaza JHV",
            rating: 4.3,
            bookingUrl: "https://jsdl.in/RSL-EOB1745346389"
          }
        ]
      },
      {
        id: "uttar-pradesh-lucknow",
        name: "Lucknow",
        description: "Known as the \"City of Nawabs,\" Lucknow offers a fascinating blend of regal history, exquisite cuisine, and stunning architectural marvels.",
        location: "Lucknow, Uttar Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/We2X2zZbWxMC6uZC6",
        bestTimeToVisit: "October to March",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/1-chota-imambara-lucknow-uttar-pradesh-attr-hero?qlt=82&ts=1726648528039",
        hotels: [
          {
            name: "Taj Mahal Lucknow",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/RSL-UVY1745345263"
          },
          {
            name: "Hyatt Regency Lucknow",
            rating: 4.2,
            bookingUrl: "https://jsdl.in/RSL-BFG1745345305"
          },
          {
            name: "Fortune Hotel",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/RSL-AEW1745345480"
          },
          {
            name: "Fairfield by Marriott Lucknow",
            rating: 4.2,
            bookingUrl: "https://jsdl.in/RSL-IQT1745345584"
          },
          {
            name: "Hotel Arif Castles",
            rating: 3.9,
            bookingUrl: "https://jsdl.in/RSL-VEW1745345532"
          }
        ]
      },
      {
        id: "uttar-pradesh-allahabad",
        name: "Allahabad (Prayagraj)",
        description: "Famous for the sacred confluence of the Ganges, Yamuna, and Saraswati rivers, and known for hosting the grand Kumbh Mela.",
        location: "Prayagraj, Uttar Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/RB9XVtQ7eRfkvV4R7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://cdn1.prayagsamagam.com/media/2021/03/10174127/Prayagraj-wideview-prayagsamagam-u-1024x681.jpg",
        hotels: [
          {
            name: "Hotel Kanha Shyam",
            rating: 4.3,
            bookingUrl: "https://jsdl.in/RSL-VXW1745345619"
          },
          {
            name: "The Legend Hotel",
            rating: 4.3,
            bookingUrl: "https://jsdl.in/RSL-MMX1745345681"
          },
          {
            name: "Hotel Polo Ma",
            rating: 3.8,
            bookingUrl: "https://jsdl.in/RSL-UNN1745345726"
          },
          {
            name: "Hotel Harsh Ananda",
            rating: 3.7,
            bookingUrl: "https://jsdl.in/RSL-HYA1745345761"
          },
          {
            name: "Hotel Placid",
            rating: 4.0,
            bookingUrl: "https://jsdl.in/RSL-QAI1745345795"
          }
        ]
      },
      {
        id: "uttar-pradesh-mathura",
        name: "Mathura",
        description: "The birthplace of Lord Krishna, Mathura is steeped in mythological heritage and vibrant religious traditions.",
        location: "Mathura, Uttar Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/6EEXjjuwGCgPdCeF8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/05/5ff2db15dfdd68066ce88c2a9df1cc22_1000x1000.jpg",
        hotels: [
          {
            name: "Nidhivan Sarovar Portico",
            rating: 4.1,
            bookingUrl: "https://jsdl.in/RSL-NCP1745346511"
          },
          {
            name: "Hotel Ajay",
            rating: 4.6,
            bookingUrl: "https://jsdl.in/RSL-WQZ1745428441"
          },
          {
            name: "Shri Radha Resort",
            rating: 3.7,
            bookingUrl: "https://jsdl.in/RSL-CYL1745428482"
          },
          {
            name: "Hotel Dev Paradise",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/RSL-DRR1745428530"
          },
          {
            name: "Hotel S R Siddhi Vinayak",
            rating: 4.2,
            bookingUrl: "https://jsdl.in/RSL-LCU1745428300"
          }
        ]
      }
    ],
  },
  {
    name: "Tamil Nadu",
    capital: "Chennai",
    touristPlaces: [
      {
        id: "tamil-nadu-chennai",
        name: "Chennai",
        description: "A bustling metropolitan hub known for its rich cultural heritage, iconic Marina Beach, and vibrant arts and culinary scene.",
        location: "Chennai, Tamil Nadu",
        googleMapsUrl: "https://maps.app.goo.gl/dHJjmVXXjtmHWHzM6",
        bestTimeToVisit: "November to February",
        imageUrl: "https://i0.wp.com/trailstainedfingers.com/wp-content/uploads/2019/04/chennai.jpg?fit=1920%2C1280&ssl=1",
      },
      {
        id: "tamil-nadu-madurai",
        name: "Madurai",
        description: "One of India’s oldest cities, celebrated for the magnificent Meenakshi Amman Temple and its enduring Dravidian architecture.",
        location: "Madurai, Tamil Nadu",
        googleMapsUrl: "https://maps.app.goo.gl/bh61HYBKiES3WDSCA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Meenakshi_Amman_Temple_Tank.jpg",
      },
      {
        id: "tamil-nadu-ooty",
        name: "Ooty (Udagamandalam)",
        description: "A picturesque hill station set amid rolling tea gardens and verdant valleys, offering a cool escape from the plains.",
        location: "Udagamandalam, Tamil Nadu",
        googleMapsUrl: "https://maps.app.goo.gl/ejhLEHpDF6ztZiWi7",
        bestTimeToVisit: "April to June and September to November",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXXNWrOdIxtdjz-bqVqHhshajJ90pzz5hREHH15NykvNABinLVuJVfGbcLecQ1bqsaeyfE4uD_8or0F_Xl0IgpkzYZ5UuHvQMCkHRDmjAsF1C4P4s5_doNrK9wbOSEFI2POngjyT9cQYNb/s1600/ooty+tourism+must+see+places+in+ooty.jpg",
      },
      {
        id: "tamil-nadu-kodaikanal",
        name: "Kodaikanal",
        description: "Known as the “Princess of Hill Stations,” Kodaikanal charms visitors with its mist-covered mountains, serene lakes, and cascading waterfalls.",
        location: "Kodaikanal, Tamil Nadu",
        googleMapsUrl: "https://maps.app.goo.gl/PgHGPpipA5r9mXW37",
        bestTimeToVisit: "April to June and September to November",
        imageUrl: "https://www.stayvista.com/blog/wp-content/uploads/2024/11/24271869876_485a96419a_c.jpg",
      },
      {
        id: "tamil-nadu-rameswaram",
        name: "Rameswaram",
        description: "A sacred coastal town steeped in mythology, renowned for its ancient temples, pristine beaches, and spiritual ambiance.",
        location: "Rameswaram, Tamil Nadu",
        googleMapsUrl: "https://maps.app.goo.gl/NHphsws8W4ru6y8k9",
        bestTimeToVisit: "November to February",
        imageUrl: "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2024/07/17172058/rameswaram-1-1600x900.jpeg",
      },
    ],
  },
  {
    name: "Maharashtra",
    capital: "Mumbai",
    touristPlaces: [
      {
        id: "maharashtra-ajanta-caves",
        name: "Ajanta Caves",
        description: "A UNESCO World Heritage Site, the Ajanta Caves are renowned for their exquisite rock-cut Buddhist cave monuments dating back to the 2nd century BCE. The intricate paintings and sculptures depict the life of Buddha and are a testament to ancient Indian artistry.",
        location: "Aurangabad, Maharashtra",
        googleMapsUrl: "https://maps.app.goo.gl/LDPBuxRpSmUf2VG37",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.adotrip.com/public/images/areas/5f04898f9a9dd-Ajanta%20Caves%20Tours.jpg"
      },
      {
        id: "maharashtra-elephanta-caves",
        name: "Elephanta Caves",
        description: "Situated on Elephanta Island, these rock-cut caves house ancient sculptures dedicated to Lord Shiva, including the famous three-headed Shiva statue. The caves reflect the rich cultural heritage of India and are accessible via a ferry ride from Mumbai.",
        location: "Mumbai, Maharashtra",
        googleMapsUrl: "https://maps.app.goo.gl/Ndt7Jtq29SQPb1wa7",
        bestTimeToVisit: "November to February",
        imageUrl: "https://www.holidify.com/images/cmsuploads/compressed/shutterstock_694433434_20191213110339_20191213110412.png"
      },
      {
        id: "maharashtra-shirdi",
        name: "Shirdi",
        description: "A revered pilgrimage site, Shirdi is the home of the late 19th-century saint Sai Baba. Devotees from around the world visit the Sai Baba Temple, which stands as a symbol of faith and communal harmony.",
        location: "Ahmednagar District, Maharashtra",
        googleMapsUrl: "https://maps.app.goo.gl/v55KHruHkeFk5k6C7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://saibabatravels.com/wp-content/uploads/2019/08/Shirdi_Sai_Mandir_Namchi_Sikkim-2048x1536.jpg"
      },
      {
        id: "maharashtra-mahabaleshwar",
        name: "Mahabaleshwar",
        description: "Nestled in the Western Ghats, Mahabaleshwar is a picturesque hill station known for its strawberry farms, lush greenery, and panoramic viewpoints like Arthur's Seat and Elephant's Head Point.",
        location: "Satara District, Maharashtra",
        googleMapsUrl: "https://maps.app.goo.gl/X6QnVTFmSDuSrMW96",
        bestTimeToVisit: "October to June",
        imageUrl: "https://wallpaperaccess.com/full/7817951.jpg"
      },
      {
        id: "maharashtra-lonavala",
        name: "Lonavala",
        description: "A favored weekend getaway, Lonavala is celebrated for its scenic landscapes, waterfalls, and historic forts like Rajmachi and Lohagad. The monsoon season enhances its natural beauty, making it a haven for nature enthusiasts.",
        location: "Pune District, Maharashtra",
        googleMapsUrl: "https://maps.app.goo.gl/DHv5cZiZ9irdeeow7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.historywithtravel.com/images/lonavala-waterfall/giri-waterfall.jpg"
      }
    ],
  },
  {
      name: "Delhi (Union Territory)",
      capital: "New Delhi",
      touristPlaces: [
        {
          id: "delhi-red-fort",
          name: "Red Fort",
          description: "A historic fort and UNESCO World Heritage site showcasing the rich Mughal legacy.",
          location: "Old Delhi, Delhi",
          googleMapsUrl: "https://maps.app.goo.gl/4d8XeAjQY9zxZmHF8",
          bestTimeToVisit: "October to March",
          imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/10/3c/4a/42/fb-img-1502472371491.jpg"
        },
        {
          id: "delhi-qutub-minar",
          name: "Qutub Minar",
          description: "The world's tallest brick minaret, exemplifying Indo-Islamic architecture and history.",
          location: "Mehrauli, Delhi",
          googleMapsUrl: "https://maps.app.goo.gl/XHqRBYtVJafyKQcs8",
          bestTimeToVisit: "October to March",
          imageUrl: "https://www.thedelhitours.com/blog/wp-content/uploads/2024/09/Qutub-Minar.jpg"
        },
        {
          id: "delhi-india-gate",
          name: "India Gate",
          description: "A grand war memorial honoring the soldiers of World War I, set amidst expansive lawns.",
          location: "New Delhi, Delhi",
          googleMapsUrl: "https://maps.app.goo.gl/TsLzbhquaxdSQHwFA",
          bestTimeToVisit: "October to March",
          imageUrl: "https://tourguideblog.com/wp-content/uploads/2024/01/Untitled-design-6.jpg"
        },
        {
          id: "delhi-humayun-tomb",
          name: "Humayun's Tomb",
          description: "A UNESCO World Heritage site and a stunning example of Mughal architecture that inspired the Taj Mahal.",
          location: "New Delhi, Delhi",
          googleMapsUrl: "https://maps.app.goo.gl/CCBYCELQLMzZC3Zw6",
          bestTimeToVisit: "October to March",
          imageUrl: "https://kevinstandagephotography.wordpress.com/wp-content/uploads/2021/03/ksp_0329ss.jpg"
        },
        {
          id: "delhi-lotus-temple",
          name: "Lotus Temple",
          description: "A serene Bahá'í House of Worship known for its unique lotus-inspired design and tranquil ambiance.",
          location: "New Delhi, Delhi",
          googleMapsUrl: "https://maps.app.goo.gl/W6UJ7B5KnCAi9Ck16",
          bestTimeToVisit: "October to March",
          imageUrl: "https://chardhambooking.com/wp-content/uploads/2021/01/Lotus-Tmple-Photo-by-Arpan-Das.jpg"
        }
      ],
    },
  {
    name: "Odisha",
    capital: "Bhubaneswar",
    touristPlaces: [
      {
        id: "odisha-konark",
        name: "Konark Sun Temple",
        description: "A UNESCO World Heritage Site, the 13th-century Konark Sun Temple is renowned for its intricate stone carvings and chariot-shaped architecture dedicated to the Sun God.",
        location: "Konark, Odisha",
        googleMapsUrl: "https://maps.app.goo.gl/Z3MECQAou13aDNHz7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.mystreal.com/_next/image/?url=%2Ftemple%2Fkonark-sun-temple%2Fhero-konark-sun-temple.jpg&w=3840&q=75"
      },
      {
        id: "odisha-jagannath",
        name: "Jagannath Temple, Puri",
        description: "One of the Char Dham pilgrimage sites, this 12th-century temple is dedicated to Lord Jagannath and is famous for its annual Rath Yatra festival.",
        location: "Puri, Odisha",
        googleMapsUrl: "https://maps.app.goo.gl/A1WG9sVFzFn8M83d7",
        bestTimeToVisit: "October to February",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Shri_Jagannatha_Temple.jpg"
      },
      {
        id: "odisha-chilika",
        name: "Chilika Lake",
        description: "Asia's largest brackish water lagoon, Chilika Lake is a haven for migratory birds and the endangered Irrawaddy dolphins.",
        location: "Chilika, Odisha",
        googleMapsUrl: "https://maps.app.goo.gl/DSLxdDRFHMXkZ7YXA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://trueyatra.com/wp-content/uploads/2024/01/Nalaban-Island-Chilika-Lake-1024x576.png"
      },
      {
        id: "odisha-bhitarkanika",
        name: "Bhitarkanika National Park",
        description: "A rich biodiversity hotspot, this park is home to saltwater crocodiles, mangrove forests, and a variety of bird species.",
        location: "Bhitarkanika, Odisha",
        googleMapsUrl: "https://maps.app.goo.gl/XDV4HaAC5jFmMKiUA",
        bestTimeToVisit: "November to February",
        imageUrl: "https://apps.odishatourism.gov.in/Application/uploadDocuments/TravelTrailDoc/Banner20190328_155950.jpg"
      },
      {
        id: "odisha-simlipal",
        name: "Simlipal National Park",
        description: "A UNESCO Biosphere Reserve, Simlipal is known for its dense forests, waterfalls, and diverse wildlife including tigers and elephants.",
        location: "Simlipal, Odisha",
        googleMapsUrl: "https://maps.app.goo.gl/cob18uz1kHFTHgYT9",
        bestTimeToVisit: "November to June",
        imageUrl: "https://www.similipal.org/images/slider/devkund.jpg"
      }
    ],
  },
  {
    name: "Madhya Pradesh",
    capital: "Bhopal",
    touristPlaces: [
      {
        id: "madhya-pradesh-khajuraho",
        name: "Khajuraho Temples",
        description: "A UNESCO World Heritage Site, the Khajuraho Temples are renowned for their intricate sculptures and architectural brilliance, reflecting the rich cultural heritage of India.",
        location: "Khajuraho, Madhya Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/Q6n9PMjh8LxpFXB26",
        bestTimeToVisit: "October to February",
        imageUrl: "https://www.holidify.com/images/cmsuploads/compressed/shutterstock_1032564361_20200219140243.jpg"
      },
      {
        id: "madhya-pradesh-bandhavgarh",
        name: "Bandhavgarh National Park",
        description: "Famous for having one of the highest densities of Bengal tigers, this national park offers thrilling wildlife safaris amidst a rich biodiversity.",
        location: "Bandhavgarh, Madhya Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/YaXuvCNGqzY7DGFy8",
        bestTimeToVisit: "October to June",
        imageUrl: "https://www.adotrip.com/public/images/areas/master_images/60aca4d169777-Bandhavgarh_National_Park_Madhya_Pradesh.jpg"
      },
      {
        id: "madhya-pradesh-sanchi",
        name: "Sanchi Stupa",
        description: "One of the oldest stone structures in India, the Sanchi Stupa is a significant Buddhist monument, reflecting the country's ancient architectural prowess.",
        location: "Sanchi, Madhya Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/TYA92wxjkLRcx68K8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://travelandtrekking.com/wp-content/uploads/2018/01/Sanchi-Stupa-Madhya-Pradesh-picsc.jpg"
      },
      {
        id: "madhya-pradesh-pachmarhi",
        name: "Pachmarhi",
        description: "Known as the \"Queen of Satpura,\" Pachmarhi is a serene hill station adorned with waterfalls, caves, and colonial-era architecture.",
        location: "Pachmarhi, Madhya Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/kpG8qSbYjZNnA41DA",
        bestTimeToVisit: "October to June",
        imageUrl: "https://static.india.com/wp-content/uploads/2022/07/pachmarhi.jpg"
      },
      {
        id: "madhya-pradesh-gwalior",
        name: "Gwalior Fort",
        description: "A majestic hill fort, Gwalior Fort boasts of impressive architecture and has been a witness to many historical events, offering panoramic views of the city.",
        location: "Gwalior, Madhya Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/MAXPcVLnASTNTe8w6",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.bwallpaperhd.com/wp-content/uploads/2021/05/GwaliorFort.jpg"
      }
    ],
  },
  {
    name: "Tripura",
    capital: "Agartala",
    touristPlaces: [
      {
        id: "tripura-ujjayanta",
        name: "Ujjayanta Palace",
        description: "A majestic Indo-Saracenic palace built in 1901, now housing the Tripura State Museum, showcasing the region's rich cultural heritage.",
        location: "Agartala, Tripura",
        googleMapsUrl: "https://maps.app.goo.gl/G1DMMt9QoTmk8RHc6",
        bestTimeToVisit: "October to February",
        imageUrl: "https://cdn1.tripoto.com/media/filter/tst/img/2245490/Image/1690954804_ujjayantapalace.jpg.webp"
      },
      {
        id: "tripura-neermahal",
        name: "Neermahal",
        description: "A stunning water palace built in the middle of Rudrasagar Lake, blending Hindu and Mughal architectural styles.",
        location: "Melaghar, Tripura",
        googleMapsUrl: "https://maps.app.goo.gl/JibT3zA7ifBiwRRz9",
        bestTimeToVisit: "October to February",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/rudrasagar-lake-melaghar-2-attr-hero?qlt=82&ts=1726651019295"
      },
      {
        id: "tripura-unakoti",
        name: "Unakoti",
        description: "An ancient Shaivite pilgrimage site featuring rock-cut sculptures and carvings dating back to the 7th–9th centuries.",
        location: "Kailashahar, Tripura",
        googleMapsUrl: "https://maps.app.goo.gl/QPiYAFzC4BUR37pHA",
        bestTimeToVisit: "October to February",
        imageUrl: "https://thegypsychiring.com/wp-content/uploads/2023/08/Unakoti-Rock-Carvings-in-Tripura-India-The-Gypsy-Chiring.webp"
      },
      {
        id: "tripura-sundari",
        name: "Tripura Sundari Temple",
        description: "One of the 51 Shakti Peethas, this revered temple dedicated to Goddess Tripura Sundari is a significant pilgrimage site.",
        location: "Udaipur, Tripura",
        googleMapsUrl: "https://maps.app.goo.gl/ZwdFqaN2DFdD2dEQ8",
        bestTimeToVisit: "October to February",
        imageUrl: "https://exzept.com/wp-content/uploads/2024/08/tripura-sundari.jpg"
      },
      {
        id: "tripura-jampui",
        name: "Jampui Hills",
        description: "Known for its pleasant climate and panoramic views, Jampui Hills is a haven for nature lovers and offers orange orchards and trekking opportunities.",
        location: "Jampui Hills, Tripura",
        googleMapsUrl: "https://maps.app.goo.gl/oE5bRYAXYrmnqbfU8",
        bestTimeToVisit: "October to February",
        imageUrl: "https://indiano.travel/wp-content/uploads/2022/08/Untitled-design-77.jpg"
      }
    ],
  },
  {
    name: "Chhattisgarh",
    capital: "Raipur",
    touristPlaces: [
      {
        id: "chhattisgarh-chitrakote",
        name: "Chitrakote Waterfall",
        description: "Often referred to as the \"Niagara Falls of India,\" Chitrakote Waterfall is the widest waterfall in India, cascading from a height of about 30 meters. Surrounded by lush greenery, it's a breathtaking sight, especially during the monsoon season.",
        location: "Jagdalpur, Chhattisgarh",
        googleMapsUrl: "https://maps.app.goo.gl/LVqeSoZLCNuRVQqA9",
        bestTimeToVisit: "July to October (Monsoon season)",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/chitrakote-water-falls-jagdalpur-chhattisgarh-1-attr-hero?qlt=82&ts=1727011277081"
      },
      {
        id: "chhattisgarh-barnawapara",
        name: "Barnawapara Wildlife Sanctuary",
        description: "Located in the Mahasamund district, this sanctuary is home to a variety of wildlife, including leopards, sloth bears, and numerous bird species. The dense forests and serene environment make it a haven for nature lovers.",
        location: "Mahasamund, Chhattisgarh",
        googleMapsUrl: "https://maps.app.goo.gl/5t6NeDgyV2Ko5wHLA",
        bestTimeToVisit: "November to June",
        imageUrl: "https://www.easeindiatrip.com/blog/wp-content/uploads/2025/01/Chhatishgarh-Barnawapara-Wildlife-Sanctuary.jpg"
      },
      {
        id: "chhattisgarh-bhoramdeo",
        name: "Bhoramdeo Temple",
        description: "Often dubbed the \"Khajuraho of Chhattisgarh,\" Bhoramdeo Temple is an ancient temple complex known for its exquisite erotic sculptures and intricate carvings, reflecting the rich cultural heritage of the region.",
        location: "Kawardha, Chhattisgarh",
        googleMapsUrl: "https://maps.app.goo.gl/jLua994nGmczbSa26",
        bestTimeToVisit: "October to March",
        imageUrl: "https://chhattisgarhtourism.co.in/photo_gallery/bhoramdeo_temple/03.jpg"
      },
      {
        id: "chhattisgarh-kanger-valley",
        name: "Kanger Valley National Park",
        description: "Situated near Jagdalpur, this national park is renowned for its biodiversity, limestone caves, and picturesque waterfalls. It's a paradise for trekkers and wildlife enthusiasts.",
        location: "Jagdalpur, Chhattisgarh",
        googleMapsUrl: "https://maps.app.goo.gl/csDZobPTXjFAYrGV8",
        bestTimeToVisit: "November to June",
        imageUrl: "https://www.kangervalley.cg.nic.in/images/gallery/tirathgarh/I1.jpg"
      },
      {
        id: "chhattisgarh-sirpur",
        name: "Sirpur",
        description: "An archaeological site of immense historical significance, Sirpur boasts ancient temples, monasteries, and inscriptions dating back to the 5th century, reflecting the region's rich cultural tapestry.",
        location: "Mahasamund District, Chhattisgarh",
        googleMapsUrl: "https://maps.app.goo.gl/SQoe5Aab9UVmpCqYA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://tripindia.co.in//uploads/Sirpur4.jpg"
      }
    ],
  },
  {
    name: "Meghalaya",
    capital: "Shillong",
    touristPlaces: [
      {
        id: "meghalaya-double-decker-bridge",
        name: "Double Decker Living Root Bridge",
        description: "A marvel of bioengineering, this bridge is formed by intertwining the roots of rubber trees, creating a sturdy pathway over streams. The trek to reach it offers scenic views of the lush rainforest.",
        location: "Nongriat, near Cherrapunji",
        googleMapsUrl: "https://maps.app.goo.gl/wDon3345CTBMrfc2A",
        bestTimeToVisit: "October to April",
        imageUrl: "https://assets.telegraphindia.com/telegraph/3dcd10a8-a311-4c14-a70c-aa4ce601e46f.jpg"
      },
      {
        id: "meghalaya-dawki",
        name: "Dawki & Umngot River",
        description: "Famed for its crystal-clear waters, the Umngot River in Dawki offers mesmerizing boat rides where boats appear to float on air due to the water's clarity.",
        location: "Dawki, Meghalaya",
        googleMapsUrl: "https://maps.app.goo.gl/wyKx87h66aj9GWou8",
        bestTimeToVisit: "November to February",
        imageUrl: "https://res.cloudinary.com/jerrick/image/upload/v1729496352/67160520854709001d814617.jpg"
      },
      {
        id: "meghalaya-nohkalikai",
        name: "Nohkalikai Falls",
        description: "Plunging from a height of 340 meters, Nohkalikai is India's tallest plunge waterfall, surrounded by verdant cliffs and offering panoramic views.",
        location: "Cherrapunji, Meghalaya",
        googleMapsUrl: "https://maps.app.goo.gl/fMP5xiRcQ1q9W6tY7",
        bestTimeToVisit: "October to December",
        imageUrl: "https://www.meghalayatourism.in/wp-content/uploads/2020/07/Noh-Sngithiang-Falls-1.jpg"
      },
      {
        id: "meghalaya-mawlynnong",
        name: "Mawlynnong Village",
        description: "Dubbed the \"Cleanest Village in Asia,\" Mawlynnong is renowned for its cleanliness, community-driven eco-tourism, and the nearby single-decker living root bridge.",
        location: "Mawlynnong, Meghalaya",
        googleMapsUrl: "https://maps.app.goo.gl/raiaC8EM1TtZ89Wx8",
        bestTimeToVisit: "October to April",
        imageUrl: "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/19/ad850532a481cb0321a8d50598f7e15c_1000x1000.jpg"
      },
      {
        id: "meghalaya-umiam",
        name: "Umiam Lake",
        description: "A serene man-made reservoir, Umiam Lake is surrounded by pine-covered hills and offers activities like boating, kayaking, and picnicking.",
        location: "Near Shillong, Meghalaya",
        googleMapsUrl: "https://maps.app.goo.gl/J7Sift81MHwxJLdYA",
        bestTimeToVisit: "October to February",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Umiam_Lake%2C_Shillong%2C_Meghalaya.jpg/2560px-Umiam_Lake%2C_Shillong%2C_Meghalaya.jpg"
      }
    ],
  },
  {
    name: "Gujarat",
    capital: "Gandhinagar",
    touristPlaces: [
      {
        id: "gujarat-gir-national-park",
        name: "Gir National Park",
        description: "The sole habitat of the majestic Asiatic lions, Gir National Park is a haven for wildlife enthusiasts. Beyond lions, it boasts a rich biodiversity, including leopards, antelopes, and over 300 bird species.",
        location: "Sasan Gir, Gujarat",
        googleMapsUrl: "https://maps.app.goo.gl/VrQSNieGYASNm7Kb7",
        bestTimeToVisit: "December to March",
        imageUrl: "https://www.girnationalpark.in/uploads/sasan-gir-jungle.jpg"
      },
      {
        id: "gujarat-somnath-temple",
        name: "Somnath Temple",
        description: "An iconic pilgrimage site, the Somnath Temple stands as a testament to resilience, having been reconstructed multiple times. Its intricate architecture and serene coastal backdrop make it a spiritual and visual delight.",
        location: "Somnath, Gujarat",
        googleMapsUrl: "https://maps.app.goo.gl/P7sf9aTcB2AfTVj48",
        bestTimeToVisit: "November to February",
        imageUrl: "https://images.herzindagi.info/image/2022/Dec/somnath-temple-facts-in-hindi.jpg"
      },
      {
        id: "gujarat-rann-of-kutch",
        name: "Great Rann of Kutch",
        description: "A mesmerizing white salt desert, the Great Rann of Kutch transforms into a cultural hub during the Rann Utsav, showcasing traditional music, dance, and crafts under the moonlit sky.",
        location: "Kutch District, Gujarat",
        googleMapsUrl: "https://maps.app.goo.gl/Vr8wZQQbUFDaDuyy8",
        bestTimeToVisit: "November to February",
        imageUrl: "https://www.tripsavvy.com/thmb/nB_VbZj6wGNXdPGYnsnLpyvm9Wc=/2122x1412/filters:fill(auto,1)/GettyImages-537000923-541774dbe2d44759815fdf0719b04685.jpg"
      },
      {
        id: "gujarat-dwarkadhish-temple",
        name: "Dwarkadhish Temple",
        description: "One of the Char Dham pilgrimage sites, the Dwarkadhish Temple is dedicated to Lord Krishna. Its towering spire and intricate carvings draw devotees and tourists alike.",
        location: "Dwarka, Gujarat",
        googleMapsUrl: "https://maps.app.goo.gl/ciG38F8pVCyeVWTT8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://dharma.werindia.com/wp-content/uploads/2021/08/Unknown_Facts_Of_Dwarkadhish_Temple_That_You_Should_Know_Dharma_WeRIndia-e1629039605521.jpg"
      },
      {
        id: "gujarat-sabarmati-ashram",
        name: "Sabarmati Ashram",
        description: "Once the residence of Mahatma Gandhi, the Sabarmati Ashram offers insights into India's freedom struggle. The tranquil environment and preserved artifacts provide a reflective experience.",
        location: "Ahmedabad, Gujarat",
        googleMapsUrl: "https://maps.app.goo.gl/tyPfwWEzq3M33VCp8",
        bestTimeToVisit: "November to February",
        imageUrl: "https://www.garhatours.in/wp-content/uploads/2015/09/Gandhi_Ashram_Ahemdabad1-e1433503342407-800x480.jpg"
      },
    ],
  },
  {
    name: "Chandigarh (Union Territory)",
    capital: "Chandigarh",
    touristPlaces: [
      {
        id: "chandigarh-rock-garden",
        name: "Rock Garden",
        description: "A unique open-air art installation featuring innovative sculptures crafted from recycled materials.",
        location: "Chandigarh",
        googleMapsUrl: "https://maps.app.goo.gl/5dM6VMphmeDNKS78A",
        bestTimeToVisit: "October to March",
        imageUrl: "https://travelertree.in/wp-content/uploads/2022/07/rockgarden-10-of-19.jpg"
      },
      {
        id: "chandigarh-sukhna-lake",
        name: "Sukhna Lake",
        description: "A serene man-made lake offering boating, leisurely walks, and picturesque sunset views.",
        location: "Chandigarh",
        googleMapsUrl: "https://maps.app.goo.gl/FMND218qK2hUJB8f7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://treeofliferesorts.com/wp-content/uploads/2022/12/v52u7nl6wrhqun945be5g09z0c0a_1597150108_shutterstock_1211074951-1024x576.webp"
      },
      {
        id: "chandigarh-rose-garden",
        name: "Zakir Hussain Rose Garden",
        description: "Asia's largest rose garden, showcasing an extensive collection of vibrant and aromatic rose varieties.",
        location: "Chandigarh",
        googleMapsUrl: "https://maps.app.goo.gl/gf2ykCX2sEmLPYia9",
        bestTimeToVisit: "October to March",
        imageUrl: "https://i.pinimg.com/736x/2c/ce/59/2cce59bd3770dbb3b853d565f73ae38a.jpg"
      }
    ],
  },
  {
    name: "Lakshadweep (Union Territory)",
    capital: "Kavaratti",
    touristPlaces: [
      {
        id: "lakshadweep-bangaram",
        name: "Bangaram Island",
        description: "A pristine, uninhabited island renowned for its turquoise lagoons, powdery white sands, and vibrant coral reefs—ideal for water sports and tranquil escapes.",
        location: "Bangaram, Lakshadweep",
        googleMapsUrl: "https://maps.app.goo.gl/2C6oWo89ozF7mhEFA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.lakshadweeptoursandtravels.com/images/ba-4.jpg"
      },
      {
        id: "lakshadweep-minicoy",
        name: "Minicoy Island",
        description: "A culturally rich atoll celebrated for its iconic lighthouse, traditional customs, and panoramic ocean views.",
        location: "Minicoy, Lakshadweep",
        googleMapsUrl: "https://maps.app.goo.gl/UjNWzBvv9ubiX17PA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://lh3.googleusercontent.com/ZLDKB6i32xiFy6Vf0eb3AzKG6UDw79HJEGBsHGDEa6ghaq-vanpEUAYl7AC8jOBwy8dRqS1t0qGaivbgglU0kRY0faYogrWrbcJ9V9yg=h450-rw"
      },
      {
        id: "lakshadweep-kavaratti",
        name: "Kavaratti",
        description: "The administrative capital of Lakshadweep, known for its vibrant marine life, excellent water sports, and serene beaches.",
        location: "Kavaratti, Lakshadweep",
        googleMapsUrl: "https://maps.app.goo.gl/moS5KC5XZe68ANmVA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/thinnakara-kavaratti-lakshwadeep-1-musthead-hero?qlt=82&ts=1727011585498"
      }
    ],
  },
  {
    name: "Jammu and Kashmir (Union Territory)",
    capital: "Srinagar (Summer), Jammu (Winter)",
    touristPlaces: [
      {
        id: "jammu-kashmir-srinagar",
        name: "Srinagar",
        description: "The summer capital of Jammu and Kashmir, renowned for its enchanting Dal Lake, Mughal gardens, and iconic houseboats.",
        location: "Srinagar, Jammu and Kashmir",
        googleMapsUrl: "https://maps.app.goo.gl/mEFKt8mFxWdCdEpY9",
        bestTimeToVisit: "April to October",
        imageUrl: "https://img.cdn.zostel.com/zostel/gallery/images/Vvewff4-Ty6r2n42ug5FYQ/srinagar-20230223112934.png?w=600"
      },
      {
        id: "jammu-kashmir-gulmarg",
        name: "Gulmarg",
        description: "A picturesque hill station and premier skiing destination offering breathtaking views, snow-covered slopes, and a famous cable car ride.",
        location: "Gulmarg, Jammu and Kashmir",
        googleMapsUrl: "https://maps.app.goo.gl/kvceVieJm67Xs7bV6",
        bestTimeToVisit: "December to March (for skiing); April to June for sightseeing",
        imageUrl: "https://www.india.com/wp-content/uploads/2024/12/Gulmarg-1-1.jpg"
      },
      {
        id: "jammu-kashmir-pahalgam",
        name: "Pahalgam",
        description: "A scenic town set amidst lush green valleys and the Lidder River, popular for trekking, river rafting, and its serene landscapes.",
        location: "Pahalgam, Jammu and Kashmir",
        googleMapsUrl: "https://maps.app.goo.gl/qzdefHMMt7Fia5sw9",
        bestTimeToVisit: "April to June and September to November",
        imageUrl: "https://assets.cntraveller.in/photos/60ba1148a1a415b43b10b8a0/master/pass/Getaways-Lead.jpg"
      },
      {
        id: "jammu-kashmir-sonamarg",
        name: "Sonamarg",
        description: "A pristine valley known for its golden meadows, glacier-fed streams, and as a gateway for Himalayan treks and river rafting.",
        location: "Sonamarg, Jammu and Kashmir",
        googleMapsUrl: "https://maps.app.goo.gl/DbG8qHgDox35rtSTA",
        bestTimeToVisit: "June to September",
        imageUrl: "https://plutotours.in/places/wp-content/uploads/2024/02/8.-Krishnasar-Lake-1.webp"
      },
      {
        id: "jammu-kashmir-jammu-city",
        name: "Jammu City",
        description: "A historically rich city serving as the gateway to the valley, famed for its ancient temples, vibrant bazaars, and cultural heritage.",
        location: "Jammu, Jammu and Kashmir",
        googleMapsUrl: "https://maps.app.goo.gl/Ynbo4d1vPicasMs67",
        bestTimeToVisit: "October to March",
        imageUrl: "https://blogs.revv.co.in/blogs/wp-content/uploads/2021/11/Jammu.jpg"
      }
    ],
  },
  {
    name: "Dadra and Nagar Haveli and Daman and Diu(Union Territory)",
    capital: "Daman",
    touristPlaces: [
      {
        id: "daman-diu-fort",
        name: "Diu Fort",
        description: "Constructed by the Portuguese during the 16th century, Diu Fort stands as a testament to colonial architecture and offers panoramic views of the Arabian Sea.",
        location: "Diu, Dadra and Nagar Haveli and Daman and Diu",
        googleMapsUrl: "https://maps.app.goo.gl/YRuPtgHnVMWTP4Pb6",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.holidify.com/images/cmsuploads/compressed/Diu-Fort-1_20180123223556.jpg"
      },
      {
        id: "daman-gangeshwar-temple",
        name: "Gangeshwar Mahadev Temple",
        description: "Located near Fudam village in Diu, this temple is dedicated to Lord Shiva and is renowned for its five Shiva Lingas situated amidst rocks on the seashore.",
        location: "Fudam, Diu, Dadra and Nagar Haveli and Daman and Diu",
        googleMapsUrl: "https://maps.app.goo.gl/QVetVKe2XiB9bNmYA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://api.theindia.co.in/storage/image/places/shiv-linga-gangeswar-temple_519.jpeg"
      },
      {
        id: "daman-vasona-safari",
        name: "Vasona Lion Safari",
        description: "Situated in Dadra and Nagar Haveli, this sanctuary provides visitors with the opportunity to observe Asiatic lions in their natural habitat.",
        location: "Dadra and Nagar Haveli",
        googleMapsUrl: "https://maps.app.goo.gl/16WuVpS6m6r3atRh7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://xplro.com/wp-content/uploads/2024/08/Xplro-2024-08-02T014230.171.jpg.webp"
      },
      {
        id: "daman-fudam-sanctuary",
        name: "Fudam Bird Sanctuary",
        description: "A haven for bird enthusiasts, this sanctuary attracts various migratory species, including flamingos and painted storks.",
        location: "Fudam, Diu, Dadra and Nagar Haveli and Daman and Diu",
        googleMapsUrl: "https://maps.app.goo.gl/vZgUUwQv9yaiPRTJ8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://content3.jdmagicbox.com/comp/def_content_category/bird-sanctuary/dbdccce2bf-bird-sanctuary-4-dwhim.jpg"
      }
    ],
  },
  {
    name: "Sikkim",
    capital: "Gangtok",
    touristPlaces: [
      {
        id: "sikkim-gangtok",
        name: "Gangtok",
        description: "The capital city, Gangtok, offers a harmonious blend of tradition and modernity. Perched at an altitude of 1,650 meters, it provides panoramic views of the Himalayas. Key attractions include the Rumtek Monastery, Enchey Monastery, and the bustling MG Marg.",
        location: "Gangtok, Sikkim",
        googleMapsUrl: "https://maps.app.goo.gl/n16oGg89Jau6jxgS7",
        bestTimeToVisit: "March to June and September to November",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/tsomgo-lake-gangtok-sikkim-2-attr-hero?qlt=82&ts=1727355185446"
      },
      {
        id: "sikkim-pelling",
        name: "Pelling",
        description: "A tranquil town known for its stunning views of Mount Kanchenjunga, Pelling is also home to attractions like the Pemayangtse Monastery and the Rabdentse Ruins.",
        location: "Pelling, Sikkim",
        googleMapsUrl: "https://maps.app.goo.gl/P9bdVwC2DpCvDtsv7",
        bestTimeToVisit: "March to May and September to December",
        imageUrl: "https://www.trekkinginsikkims.com/ServerImage/a8a3f238-4431-46bc-82f5-a9c3a114e834.jpg"
      },
      {
        id: "sikkim-tsomgo-lake",
        name: "Tsomgo Lake",
        description: "Also known as Changu Lake, this glacial lake is situated at an elevation of 3,753 meters. Surrounded by snow-capped mountains, it's a sacred site for the locals.",
        location: "Tsomgo Lake, Sikkim",
        googleMapsUrl: "https://maps.app.goo.gl/nPSPndf5qNtPhq2AA",
        bestTimeToVisit: "April to May and October to November",
        imageUrl: "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/12/f09dff586c1bc6922554274fb5a451db_1000x1000.jpg"
      },
      {
        id: "sikkim-nathula-pass",
        name: "Nathula Pass",
        description: "A mountain pass connecting Sikkim with China's Tibet Autonomous Region, Nathula is part of the ancient Silk Route. Visitors can witness the Indo-China border trade market and enjoy mesmerizing views.",
        location: "Nathula Pass, Sikkim",
        googleMapsUrl: "https://maps.app.goo.gl/nQSPkHKW73cSkQCE7",
        bestTimeToVisit: "May to October",
        imageUrl: "https://nomadicweekends.com/blog/wp-content/uploads/2019/03/Nathula-Pass.jpg"
      },
      {
        id: "sikkim-yumthang-valley",
        name: "Yumthang Valley",
        description: "Known as the \"Valley of Flowers,\" Yumthang is a paradise for nature lovers, especially during the spring when rhododendrons bloom in abundance.",
        location: "Yumthang Valley, Sikkim",
        googleMapsUrl: "https://maps.app.goo.gl/eiaQzaLKBN5m7v9K6",
        bestTimeToVisit: "April to June and September to November",
        imageUrl: "https://www.sikkimtourismindia.com/uploads/yumthong-tour.jpg"
      }
    ],
  },
  {
    name: "Uttarakhand",
    capital: "Dehradun",
    touristPlaces: [
      {
        id: "uttarakhand-nainital",
        name: "Nainital",
        description: "A charming hill station famed for its scenic lake, colonial architecture, and pleasant ambience.",
        location: "Nainital, Uttarakhand",
        googleMapsUrl: "https://maps.app.goo.gl/cU2w9ydqoywwBVm6A",
        bestTimeToVisit: "April to June and September to November",
        imageUrl: "https://www.nainital.info/wp-content/uploads/2020/01/Nainital-Snowfall-City-View2.jpg"
      },
      {
        id: "uttarakhand-mussoorie",
        name: "Mussoorie",
        description: "A popular hill station offering breathtaking Himalayan views and a blend of colonial heritage and modern comforts.",
        location: "Mussoorie, Uttarakhand",
        googleMapsUrl: "https://maps.app.goo.gl/oXJXtd6Dm4HmbAkJ8",
        bestTimeToVisit: "March to June and September to November",
        imageUrl: "https://kanatalheights.com/wp-content/uploads/2021/03/mussorroe.jpg"
      },
      {
        id: "uttarakhand-rishikesh",
        name: "Rishikesh",
        description: "The yoga capital of the world, renowned for its spiritual retreats, adventure sports, and serene Ganges-side settings.",
        location: "Rishikesh, Uttarakhand",
        googleMapsUrl: "https://maps.app.goo.gl/CetwtXAi5hUvinMk9",
        bestTimeToVisit: "February to May and August to November",
        imageUrl: "https://www.mytourplans.com/storage/blogs/63feed7338b40156_temple-tour-in-rishikesh.jpg"
      },
      {
        id: "uttarakhand-haridwar",
        name: "Haridwar",
        description: "A sacred city on the banks of the Ganges, celebrated for its ghats, spiritual ceremonies, and cultural vibrancy.",
        location: "Haridwar, Uttarakhand",
        googleMapsUrl: "https://maps.app.goo.gl/oSKrNaZtD6TzAKd98",
        bestTimeToVisit: "September to March",
        imageUrl: "https://www.chardham-pilgrimage-tour.com/assets/images/haridwar-banner3.webp"
      },
      {
        id: "uttarakhand-jim-corbett",
        name: "Jim Corbett National Park",
        description: "India's oldest national park, offering thrilling wildlife safaris amidst lush forests and diverse fauna.",
        location: "Jim Corbett National Park, Uttarakhand",
        googleMapsUrl: "https://maps.app.goo.gl/cEQ6sRaXxsukhmFUA",
        bestTimeToVisit: "November to June",
        imageUrl: "https://static.toiimg.com/thumb/104466333/jim-corbett.jpg?width=1200&height=900"
      }
    ],
  },
  {
    name: "Telangana",
    capital: "Hyderabad",
    touristPlaces: [
      {
        id: "telangana-charminar",
        name: "Charminar",
        description: "The iconic monument of Hyderabad, symbolizing the city's rich history and architectural grandeur.",
        location: "Hyderabad, Telangana",
        googleMapsUrl: "https://maps.app.goo.gl/eNAorBcLV9p7RMAa7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://touradvisorhub.com/wp-content/uploads/2023/06/Charminar.jpg"
      },
      {
        id: "telangana-ramoji-film-city",
        name: "Ramoji Film City",
        description: "One of the world's largest film studio complexes offering immersive cinematic experiences and entertainment.",
        location: "Hyderabad, Telangana",
        googleMapsUrl: "https://maps.app.goo.gl/kNfPgSnn1ecdyxM89",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.travelure.in/wp-content/uploads/2022/03/Ramoji-Header-1.jpg"
      },
      {
        id: "telangana-golconda-fort",
        name: "Golconda Fort",
        description: "A majestic fortress known for its architectural brilliance and the captivating history of the Qutb Shahi dynasty.",
        location: "Hyderabad, Telangana",
        googleMapsUrl: "https://maps.app.goo.gl/bxnb87G8y8z8zYem8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://i0.wp.com/weekendyaari.in/wp-content/uploads/2024/09/weekend-yaari-golkonda.jpg?fit=1024%2C597&ssl=1"
      },
      {
        id: "telangana-hussain-sagar",
        name: "Hussain Sagar Lake",
        description: "A scenic man-made lake featuring the iconic Buddha statue at its center and offering leisurely boating experiences.",
        location: "Hyderabad, Telangana",
        googleMapsUrl: "https://maps.app.goo.gl/Twn9p4KNyd2FZB9q8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Hussain_Sagar_lake%2C_Hyderabad.jpg/1280px-Hussain_Sagar_lake%2C_Hyderabad.jpg"
      },
      {
        id: "telangana-salar-jung-museum",
        name: "Salar Jung Museum",
        description: "One of India's largest art museums, showcasing an eclectic collection of artifacts from diverse cultures and eras.",
        location: "Hyderabad, Telangana",
        googleMapsUrl: "https://maps.app.goo.gl/Yzjih3uoWrQ9eUdr8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://map.sahapedia.org/admin/assets/images/202105191621412730_Banner.jpg?__imr__=bannerMuseum"
      }
    ],
  },
  {
    name: "Punjab",
    capital: "Chandigarh",
    touristPlaces: [
      {
        id: "punjab-golden-temple",
        name: "Golden Temple (Harmandir Sahib)",
        description: "The holiest shrine of Sikhism, renowned for its stunning golden architecture and serene spiritual ambiance.",
        location: "Amritsar, Punjab",
        googleMapsUrl: "https://maps.app.goo.gl/z3vCCbmuyu5E9gocA",
        bestTimeToVisit: "November to March",
        imageUrl: "https://avathioutdoors.gumlet.io/travelGuide/dev/amritsar_P3837.jpg"
      },
      {
        id: "punjab-jallianwala-bagh",
        name: "Jallianwala Bagh",
        description: "A historic memorial marking the site of the 1919 massacre, symbolizing the sacrifices made during India's freedom struggle.",
        location: "Amritsar, Punjab",
        googleMapsUrl: "https://maps.app.goo.gl/ho5uvgfZca2fnsym7",
        bestTimeToVisit: "November to March",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/jallianwala-bagh-amritsar-punjab-1-attr-hero?qlt=82&ts=1726662275638"
      },
      {
        id: "punjab-wagah-border",
        name: "Wagah Border",
        description: "Famous for its daily border-closing ceremony, this site offers a dramatic display of patriotism and military precision.",
        location: "Amritsar, Punjab",
        googleMapsUrl: "https://maps.app.goo.gl/CEmUihgpTTv75unE6",
        bestTimeToVisit: "October to March",
        imageUrl: "https://visitplacesindia.com/wp-content/uploads/2024/11/wagah-border-amritsar.jpg"
      }
    ],
  },
  {
    name: "Nagaland",
    capital: "Kohima",
    touristPlaces: [
      {
        id: "nagaland-kohima",
        name: "Kohima",
        description: "As the capital city, Kohima is steeped in history and culture. It is home to the Kohima War Cemetery, a memorial dedicated to soldiers of World War II, and offers vibrant markets and traditional Naga architecture.",
        location: "Kohima, Nagaland",
        googleMapsUrl: "https://maps.app.goo.gl/fbd5teSAyUST22PG6",
        bestTimeToVisit: "October to May",
        imageUrl: "https://images.wanderon.in/blogs/new/2024/02/kohima-min.jpg"
      },
      {
        id: "nagaland-dimapur",
        name: "Dimapur",
        description: "Known as the commercial hub of Nagaland, Dimapur boasts historical sites like the Kachari Ruins and natural attractions such as the Triple Falls.",
        location: "Dimapur, Nagaland",
        googleMapsUrl: "https://maps.app.goo.gl/ZKttd8aYPEHwhtDH7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/62/13/76/pillars-at-kachari-ruins.jpg?w=1200&h=-1&s=1"
      },
      {
        id: "nagaland-mokokchung",
        name: "Mokokchung",
        description: "Considered the cultural center of the Ao Naga tribe, Mokokchung offers visitors a glimpse into traditional Naga life, with its vibrant festivals and scenic landscapes.",
        location: "Mokokchung, Nagaland",
        googleMapsUrl: "https://maps.app.goo.gl/nUH2nDqtFQfxS9fz9",
        bestTimeToVisit: "October to June",
        imageUrl: "https://res.cloudinary.com/kmadmin/image/upload/v1628589458/kiomoi/Mokokchung_1628589457653.jpg"
      },
      {
        id: "nagaland-mon",
        name: "Mon",
        description: "Home to the Konyak tribe, Mon is famed for its unique culture and traditions, including the practice of headhunting in the past. The region offers picturesque landscapes and traditional villages.",
        location: "Mon, Nagaland",
        googleMapsUrl: "https://maps.app.goo.gl/RJLDT2bCsVnQupmM6",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.footloosedev.com/wp-content/uploads/2017/12/nagaland-village.jpg"
      },
      {
        id: "nagaland-khonoma",
        name: "Khonoma Village",
        description: "Known as Asia's first green village, Khonoma has implemented community-led conservation efforts to protect its forests and wildlife. Visitors can experience eco-tourism, traditional Angami Naga culture, and scenic terraced fields.",
        location: "Khonoma, Nagaland",
        googleMapsUrl: "https://maps.app.goo.gl/qWgjRhf8hqX5iFpSA",
        bestTimeToVisit: "September to April",
        imageUrl: "https://footloosedev.com/wp-content/uploads/2017/12/khonoma-kohima.jpg"
      }
    ],
  },
  {
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    touristPlaces: [
      {
        id: "arunachal-pradesh-tawang",
        name: "Tawang",
        description: "Home to the Tawang Monastery, one of the largest Buddhist monasteries in India, Tawang offers breathtaking views of the Himalayas and a deep spiritual ambiance.",
        location: "Tawang, Arunachal Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/ubJWGJh9kASMeBC19",
        bestTimeToVisit: "March to October",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/bumla-pass-tawang-arunachal-pradesh-1-attr-hero?qlt=82&ts=1726743173012"
      },
      {
        id: "arunachal-pradesh-ziro-valley",
        name: "Ziro Valley",
        description: "Known for its lush paddy fields and the unique Apatani tribal culture, Ziro Valley is a haven for nature lovers and cultural enthusiasts.",
        location: "Ziro Valley, Arunachal Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/ejVvUrTxjZFonasY9",
        bestTimeToVisit: "Throughout the year",
        imageUrl: "https://s3.india.com/wp-content/uploads/2024/07/Ziro-Arunachal-Pradesh_-Top-Tips-For-First-Time-Travelers-Revealed.jpg"
      },
      {
        id: "arunachal-pradesh-bomdila",
        name: "Bomdila",
        description: "Offering panoramic views of the Himalayan ranges, Bomdila is famed for its Buddhist monasteries and apple orchards.",
        location: "Bomdila, Arunachal Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/W2ts7JLBtC6TZdsT6",
        bestTimeToVisit: "April to October",
        imageUrl: "https://vibrant.holiday/uploads/guide/images/15559218534.jpg"
      },
      {
        id: "arunachal-pradesh-dirang",
        name: "Dirang",
        description: "A picturesque valley known for its pleasant climate, hot water springs, and the Dirang Dzong, a historical fort.",
        location: "Dirang, Arunachal Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/Z5kddR57pz9Sx3MR9",
        bestTimeToVisit: "Throughout the year",
        imageUrl: "https://www.thetourindia.com/flashphotos/photos/8b230abcafe506769b8dcf1aad1d2eb1.webp"
      },
      {
        id: "arunachal-pradesh-itanagar",
        name: "Itanagar",
        description: "The capital city, blending modernity with tradition, is home to the Itanagar Wildlife Sanctuary and the historic Ita Fort.",
        location: "Itanagar, Arunachal Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/F6BUPyAkuNHuqq7S9",
        bestTimeToVisit: "October to April",
        imageUrl: "https://www.indianholiday.com/wordpress/wp-content/uploads/2024/08/dest_head_img-830.png"
      }
    ],
  },
  {
    name: "Ladakh (Union Territory)",
    capital: "Leh",
    touristPlaces: [
      {
        id: "ladakh-pangong-tso",
        name: "Pangong Tso",
        description: "A mesmerizing high-altitude lake famed for its ever-changing shades of blue set against a dramatic Himalayan backdrop.",
        location: "Pangong Tso, Ladakh",
        googleMapsUrl: "https://maps.app.goo.gl/JCbbaAmgqs2N99iF9",
        bestTimeToVisit: "May to September",
        imageUrl: "https://static.toiimg.com/thumb/msid-79549873,width-748,height-499,resizemode=4,imgsize-1296676/.jpg"
      },
      {
        id: "ladakh-leh-palace",
        name: "Leh Palace",
        description: "A 17th-century palace offering panoramic views of Leh and a glimpse into Ladakh's regal history.",
        location: "Leh, Ladakh",
        googleMapsUrl: "https://maps.app.goo.gl/fWrqmMHpod5UCmvm9",
        bestTimeToVisit: "May to September",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/leh-palace-leh-ladakh-2-musthead-hero?qlt=82&ts=1726668053114"
      },
      {
        id: "ladakh-nubra-valley",
        name: "Nubra Valley",
        description: "A surreal high-altitude desert valley known for its sand dunes, Bactrian camels, and stunning landscapes.",
        location: "Nubra Valley, Ladakh",
        googleMapsUrl: "https://maps.app.goo.gl/4mv3ZPmwej9ApAEHA",
        bestTimeToVisit: "June to September",
        imageUrl: "https://discoverwithdheeraj.com/wp-content/uploads/2014/10/258.jpg"
      },
      {
        id: "ladakh-hemis-monastery",
        name: "Hemis Monastery",
        description: "The largest monastery in Ladakh, celebrated for its vibrant annual festival and rich Buddhist cultural heritage.",
        location: "Hemis, Ladakh",
        googleMapsUrl: "https://maps.app.goo.gl/z8WbBDfaEMkd67fx8",
        bestTimeToVisit: "May to September",
        imageUrl: "https://www.savaari.com/blog/wp-content/uploads/2023/09/Hemis_festival1.webp"
      }
    ],
  },
  {
    name: "Puducherry (Union Territory)",
    capital: "Puducherry",
    touristPlaces: [
      {
        id: "puducherry-promenade-beach",
        name: "Promenade Beach",
        description: "A scenic seafront stretch in Puducherry known for its vibrant atmosphere, historical monuments, and sunset views.",
        location: "Puducherry",
        googleMapsUrl: "https://maps.app.goo.gl/RGoD3Bssp8PkDzt16",
        bestTimeToVisit: "October to March",
        imageUrl: "https://i0.wp.com/pondicherryin.com/wp-content/uploads/2021/01/Rock-Beach2-1.jpg?fit=1068%2C713&ssl=1"
      },
      {
        id: "puducherry-auroville",
        name: "Auroville",
        description: "An experimental township dedicated to sustainable living and spiritual growth, centered around the iconic Matrimandir.",
        location: "Auroville, Puducherry",
        googleMapsUrl: "https://maps.app.goo.gl/cDhGFzJZhhe4jNin7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://files.auroville.org/auroville-org/a6d6af4c-f63c-4eb9-be54-9a92561dd2bd.jpg"
      },
      {
        id: "puducherry-paradise-beach",
        name: "Paradise Beach",
        description: "A pristine, golden-sand beach accessible by boat, offering a tranquil escape with calm waters and scenic views.",
        location: "Paradise Beach, Puducherry",
        googleMapsUrl: "https://maps.app.goo.gl/edaqbAqw1T5RAYqr8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/28/d3/d0.jpg"
      },
      {
        id: "puducherry-french-quarter",
        name: "French Quarter (White Town)",
        description: "A charming area distinguished by its colonial architecture, vibrant streets, and a mix of quaint cafes and boutiques.",
        location: "French Quarter, Puducherry",
        googleMapsUrl: "https://maps.app.goo.gl/wkTz28rb6E86knm96",
        bestTimeToVisit: "October to March",
        imageUrl: "https://tripxl.com/blog/wp-content/uploads/2024/11/French-Quarter-White-Town.jpg"
      }
    ],
  },
  {
    name: "Andaman and Nicobar Islands(Union Territory)",
    capital: "Port Blair",
    touristPlaces: [
      {
        id: "andaman-radhanagar-beach",
        name: "Radhanagar Beach",
        description: "Located on Havelock Island (now Swaraj Dweep), Radhanagar Beach is often cited as one of Asia's best beaches, featuring powdery white sands and clear turquoise waters.",
        location: "Havelock Island, Andaman and Nicobar Islands",
        googleMapsUrl: "https://maps.app.goo.gl/459PVovskrHKT9P7A",
        bestTimeToVisit: "October to April",
        imageUrl: "https://www.andamanocean.in/wp-content/uploads/2023/04/radhanagar-beach-img2-min-1024x683.jpg"
      },
      {
        id: "andaman-cellular-jail",
        name: "Cellular Jail",
        description: "Situated in Port Blair, the Cellular Jail, also known as \"Kala Pani,\" was a colonial prison used by the British to exile political prisoners. Today, it stands as a national memorial, offering light and sound shows that depict its historical significance.",
        location: "Port Blair, Andaman and Nicobar Islands",
        googleMapsUrl: "https://maps.app.goo.gl/Cmauznuxj5vzGVpG7",
        bestTimeToVisit: "October to April",
        imageUrl: "https://elinepa.org/wp-content/uploads/2023/08/Kala-Pani-cover-800x415.jpg"
      },
      {
        id: "andaman-marine-park",
        name: "Mahatma Gandhi Marine National Park",
        description: "This park comprises numerous islands and is celebrated for its coral reefs and marine biodiversity. Activities like snorkeling and glass-bottom boat rides provide visitors with an intimate view of underwater life.",
        location: "Wandoor, Andaman and Nicobar Islands",
        googleMapsUrl: "https://maps.app.goo.gl/fNJkgXvwB52ShANw5",
        bestTimeToVisit: "October to April",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJkmYPC-Ha0-i-Mp9jLYmHoN2WzTTWQ5jpQ&s"
      },
      {
        id: "andaman-baratang",
        name: "Baratang Island",
        description: "Known for its limestone caves and mangrove creeks, Baratang offers a unique experience of the islands' geological formations and rich biodiversity.",
        location: "Baratang, Andaman and Nicobar Islands",
        googleMapsUrl: "https://maps.app.goo.gl/qX12YXhomgj4T5rP9",
        bestTimeToVisit: "October to April",
        imageUrl: "https://www.andamantourism.org/wp-content/uploads/2023/12/baratang-island-andaman.jpg"
      }
    ],
  },
  {
    name: "Jharkhand",
    capital: "Ranchi",
    touristPlaces: [
      {
        id: "jharkhand-ranchi",
        name: "Ranchi",
        description: "The capital city, Ranchi, is often called the \"City of Waterfalls\" due to its numerous cascades like Dassam Falls and Hundru Falls. It also boasts scenic spots such as Tagore Hill and the Rock Garden.",
        location: "Ranchi, Jharkhand",
        googleMapsUrl: "https://maps.app.goo.gl/6qSE5TxH6RkAnbwX8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://chanakyabnrranchi.com/wp-content/uploads/2025/01/attractions-in-ranchi.jpg"
      },
      {
        id: "jharkhand-jamshedpur",
        name: "Jamshedpur",
        description: "Known as the \"Steel City,\" Jamshedpur is home to Tata Steel and offers attractions like Jubilee Park, a vast urban park, and the Tata Steel Zoological Park.",
        location: "Jamshedpur, Jharkhand",
        googleMapsUrl: "https://maps.app.goo.gl/FRv12RxCLJN5ao7H7",
        bestTimeToVisit: "November to February",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/e2/a5/9a/jubilee-park.jpg?w=1200&h=-1&s=1"
      },
      {
        id: "jharkhand-deoghar",
        name: "Deoghar",
        description: "A significant pilgrimage center, Deoghar houses the Baidyanath Temple, one of the twelve Jyotirlingas. The town also offers serene spots like Nandan Pahar and Trikuta Hills.",
        location: "Deoghar, Jharkhand",
        googleMapsUrl: "https://maps.app.goo.gl/ZH2Ftuh6DrZDDiEaA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.ishaansarovarportico.com/img/baidyanath-dham-deoghar.jpg"
      },
      {
        id: "jharkhand-hazaribagh",
        name: "Hazaribagh",
        description: "Known for the Hazaribagh Wildlife Sanctuary, this area offers rich biodiversity and scenic landscapes. The Canary Hill and Hazaribagh Lake are also popular attractions.",
        location: "Hazaribagh, Jharkhand",
        googleMapsUrl: "https://maps.app.goo.gl/BYPVj7RBV9JciZao8",
        bestTimeToVisit: "October to April",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/hazaribagh-national-park-ranchi-jharkhand-1-attr-hero?qlt=82&ts=1727010993475"
      },
      {
        id: "jharkhand-netarhat",
        name: "Netarhat",
        description: "Dubbed the \"Queen of Chotanagpur,\" Netarhat is a hill station known for its stunning sunrises and sunsets, especially from the Magnolia Point.",
        location: "Netarhat, Jharkhand",
        googleMapsUrl: "https://maps.app.goo.gl/3m35pWHoe5C1w5qJ9",
        bestTimeToVisit: "October to March",
        imageUrl: "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/08/9ffc869f0419cc62a4e18896dc9b388b_1000x1000.jpg"
      }
    ],
  },
  {
    name: "Andhra Pradesh",
    capital: "Amaravati",
    touristPlaces: [
      {
        id: "andhra-pradesh-tirupati",
        name: "Tirupati",
        description: "A revered pilgrimage center home to the iconic Sri Venkateswara Temple, attracting millions of devotees annually.",
        location: "Tirupati, Andhra Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/Tj9aG5C1UJ1GNUbA9",
        bestTimeToVisit: "September to February",
        imageUrl: "https://www.hindustantimes.com/ht-img/img/2024/09/20/550x309/tirupati_1726807067926_1726807102179.jpg"
      },
      {
        id: "andhra-pradesh-araku-valley",
        name: "Araku Valley",
        description: "A scenic hill station nestled in the Eastern Ghats, famous for its lush landscapes, tribal culture, and coffee plantations.",
        location: "Araku Valley, Andhra Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/Jpv1Mv4bEJo856Tj7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.savaari.com/blog/wp-content/uploads/2021/05/Araku-Valley7-waterfalls.jpg"
      },
      {
        id: "andhra-pradesh-visakhapatnam",
        name: "Visakhapatnam (Vizag)",
        description: "A vibrant coastal city known for its pristine beaches, scenic hills, and a blend of modernity with traditional charm.",
        location: "Visakhapatnam, Andhra Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/S1BGVfqZwHk5wDnn8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.bizzbuzz.news/h-upload/2024/01/19/1850440-vizag.webp"
      },
      {
        id: "andhra-pradesh-vijayawada",
        name: "Vijayawada",
        description: "A historic city steeped in cultural heritage, highlighted by the iconic Kanaka Durga Temple overlooking the Krishna River.",
        location: "Vijayawada, Andhra Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/1PpZrtSZnomCffsGA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://s3.india.com/wp-content/uploads/2024/09/vijayawada-photography.jpg"
      },
      {
        id: "andhra-pradesh-srisailam",
        name: "Srisailam",
        description: "A sacred town set against the backdrop of the Nallamala forests, renowned for the ancient Mallikarjuna temple and its serene environs.",
        location: "Srisailam, Andhra Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/HCq2QKtSidQvPGSq6",
        bestTimeToVisit: "November to February",
        imageUrl: "https://s3.ap-southeast-1.amazonaws.com/images.deccanchronicle.com/dc-Cover-5i1ltlh26neka5e88ctds9so05-20190226052124.Medi.jpeg"
      }
    ],
  },
  {
    name: "Bihar",
    capital: "Patna",
    touristPlaces: [
      {
        id: "bihar-bodh-gaya",
        name: "Bodh Gaya",
        description: "Renowned as the place where Gautama Buddha attained enlightenment under the Bodhi Tree, Bodh Gaya is a UNESCO World Heritage Site and a significant pilgrimage destination for Buddhists worldwide. The Mahabodhi Temple complex stands as a testament to this profound event.",
        location: "Bodh Gaya, Bihar",
        googleMapsUrl: "https://maps.app.goo.gl/RKED5J4RF6wcEuLa8",
        bestTimeToVisit: "October to March",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Great_Buddha_Statue%2C_Bodh_Gaya.jpg"
      },
      {
        id: "bihar-nalanda",
        name: "Nalanda",
        description: "Home to the ancient Nalanda University, one of the world's first residential universities, this site offers a glimpse into early academic excellence. The ruins reflect a rich architectural heritage and are also recognized as a UNESCO World Heritage Site.",
        location: "Nalanda, Bihar",
        googleMapsUrl: "https://maps.app.goo.gl/q3Xzy1TobrEbkjkG7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg"
      },
      {
        id: "bihar-rajgir",
        name: "Rajgir",
        description: "Nestled in a valley surrounded by hills, Rajgir is sacred to both Buddhists and Jains. It was the ancient capital of the Magadha Empire and hosts attractions like the Vulture's Peak and hot springs.",
        location: "Rajgir, Bihar",
        googleMapsUrl: "https://maps.app.goo.gl/p1PdTpUkMzMmKaaTA",
        bestTimeToVisit: "October to March",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGrqpkNZnrxShGKDLvd6GuOOVPBZ1oq0qn6w&s"
      },
      {
        id: "bihar-patna",
        name: "Patna",
        description: "The capital city of Bihar, Patna, boasts a rich historical tapestry with sites like the Patna Sahib Gurudwara, Golghar, and the Patna Museum. Its vibrant markets and riverside ghats add to its charm.",
        location: "Patna, Bihar",
        googleMapsUrl: "https://maps.app.goo.gl/YjCHYrESANkpDmDK6",
        bestTimeToVisit: "October to March",
        imageUrl: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/patna/buddha_smriti_park/buddha-samiti-park.jpg/jcr:content/renditions/cq5dam.web.480.480.jpeg"
      },
      {
        id: "bihar-vaishali",
        name: "Vaishali",
        description: "An important archaeological site, Vaishali is believed to be the world's first republic. It's also significant in Buddhist and Jain traditions, being the birthplace of Lord Mahavira and a place where Buddha delivered his last sermon.",
        location: "Vaishali, Bihar",
        googleMapsUrl: "https://maps.app.goo.gl/Xwjerjv9RnBy23VY6",
        bestTimeToVisit: "October to March",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/b2/07/89/ananda-stupa-with-ashoka.jpg?w=1200&h=700&s=1"
      }
    ],
  },
  {
    name: "Haryana",
    capital: "Chandigarh",
    touristPlaces: [
      {
        id: "haryana-sultanpur-national-park",
        name: "Sultanpur National Park",
        description: "A renowned bird sanctuary that attracts nature lovers with over 250 species of migratory and resident birds.",
        location: "Sultanpur, Haryana",
        googleMapsUrl: "https://maps.app.goo.gl/qcT5bhrg7MeL3Hct5",
        bestTimeToVisit: "October to March",
        imageUrl: "https://farm6.staticflickr.com/5100/5459003810_a334a19c10_z.jpg",
        hotels: [
          {
            name: "Heritage Village Resort & Spa",
            rating: 4.3,
            bookingUrl: "https://jsdl.in/RSL-ZEH1745346801"
          },
          {
            name: "Hyatt Regency Gurgaon",
            rating: 4.3,
            bookingUrl: "https://jsdl.in/RSL-OQT1745346873"
          },
          {
            name: "Taj City Centre Gurgaon",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/RSL-LPJ1745346913"
          },
          {
            name: "ITC Grand Bharat",
            rating: 4.7,
            bookingUrl: "https://jsdl.in/RSL-PGX1745346942"
          },
          {
            name: "The Gateway Resort Damdama Lake",
            rating: 4.3,
            bookingUrl: "https://jsdl.in/RSL-WNG1745346989"
          }
        ]
      },
      {
        id: "haryana-pinjore-gardens",
        name: "Pinjore Gardens (Yadavindra Gardens)",
        description: "A historic 17th-century Mughal garden famed for its terraced lawns, vibrant flower beds, and elegant fountains.",
        location: "Pinjore, Haryana",
        googleMapsUrl: "https://maps.app.goo.gl/aUXcgup1fZVzUEPa9",
        bestTimeToVisit: "October to April",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/81/91/c1/yadvinder-garden.jpg?w=900&h=500&s=1",
        hotels: [
          {
            name: "Taj Chandigarh",
            rating: 4.5,
            bookingUrl: "https://jsdl.in/RSL-RIL1745347355"
          },
          {
            name: "JW Marriott Hotel Chandigarh",
            rating: 4.6,
            bookingUrl: "https://jsdl.in/RSL-RIF1745347393"
          },
          {
            name: "Hyatt Regency Chandigarh",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/RSL-WFH1745347428"
          },
          {
            name: "Hotel Sheronz",
            rating: 3.7,
            bookingUrl: "https://jsdl.in/RSL-UKL1745428934"
          },
          {
            name: "Hotel Mountview",
            rating: 4.4,
            bookingUrl: "https://jsdl.in/RSL-EQX1745347537"
          }
        ]
      },
      {
        id: "haryana-morni-hills",
        name: "Morni Hills",
        description: "A tranquil hill station in Haryana offering panoramic views, lush greenery, and a cool respite from city life.",
        location: "Morni Hills, Haryana",
        googleMapsUrl: "https://maps.app.goo.gl/5BdsZCtsFuSznoif6",
        bestTimeToVisit: "March to June and September to November",
        imageUrl: "https://media.holidify.com/images/cmsuploads/compressed/navbharat-times_20241203093706.jpg",
        hotels: [
          {
            name: "Little Morni Family Resort",
            rating: 4.2,
            bookingUrl: "https://www.goibibo.com/hotels/little-morni-family-resort-hotel-in-morni-3416209279685658599"
          },
          {
            name: "Prateek resorts Morni hills",
            rating: 3.3,
            bookingUrl: "https://www.goibibo.com/hotels/prateek-resorts-morni-hills-hotel-in-morni-4549843440510197198"
          },
          {
            name: "Morni Hills Retreat & Heaven",
            rating: 4.6,
            bookingUrl: "https://www.goibibo.com/hotels/morni-hills-retreat-heaven-hotel-in-morni-2521673430412673379/"
          },
          {
            name: "Inscape Eco Village",
            rating: 3.5,
            bookingUrl: "https://www.goibibo.com/hotels/inscape-eco-village-hotel-in-morni-8799867636694982741"
          },
          {
            name: "The Morni Resort",
            rating: 3.6,
            bookingUrl: "https://www.goibibo.com/hotels/the-morni-resort-hotel-in-morni-4335066772345031494"
          }
        ]
      }
    ],
  },
  {
    name: "Himachal Pradesh",
    capital: "Shimla",
    touristPlaces: [
      {
        id: "himachal-pradesh-shimla",
        name: "Shimla",
        description: "A charming colonial hill station offering scenic mountain views and a blend of history with modern amenities.",
        location: "Shimla, Himachal Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/Jy7f5s5JBTjTmAyu6",
        bestTimeToVisit: "March to June and September to November",
        imageUrl: "https://www.clubmahindra.com/blog/media/section_images/shuttersto-1a47b83e6a03271.jpg"
      },
      {
        id: "himachal-pradesh-manali",
        name: "Manali",
        description: "A picturesque town famed for its adventure sports, ancient temples, and breathtaking snow-capped mountains.",
        location: "Manali, Himachal Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/AgUipa9tvHRcrLc59",
        bestTimeToVisit: "March to June and September to November",
        imageUrl: "https://www.naturetravelagency.com/uploads/1703234831best%20time%20to%20visit%20Manali%20for%20snowfall.jpg"
      },
      {
        id: "himachal-pradesh-dharamshala",
        name: "Dharamshala",
        description: "Nestled in the Dhauladhar range, this serene town is celebrated for its Tibetan culture and spiritual ambiance.",
        location: "Dharamshala, Himachal Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/tcfHhviu2fYvGBPy8",
        bestTimeToVisit: "March to June and September to November",
        imageUrl: "https://yatralipi.com/wp-content/uploads/2022/04/Dharamshala-scaled-1.jpg"
      },
      {
        id: "himachal-pradesh-dalhousie",
        name: "Dalhousie",
        description: "A quaint hill station with colonial charm, offering panoramic vistas and a peaceful retreat from the hustle.",
        location: "Dalhousie, Himachal Pradesh",
        googleMapsUrl: "https://maps.app.goo.gl/X7iHyzVaQz13mBTk6",
        bestTimeToVisit: "March to June and September to November",
        imageUrl: "https://www.bharatbooking.com/admin/webroot/img/uploads/holiday-package-gallery/1699516712_712785-dalhousie-khajjiar-chamba-tour-package-slider-image.webp"
      }
    ],
  },
  
  {
    name: "Karnataka",
    capital: "Bengaluru",
    touristPlaces: [
      {
        id: "karnataka-mysore",
        name: "Mysore",
        description: "Famed for its royal heritage, magnificent palaces, and vibrant festivals, Mysore is a cultural gem in Karnataka.",
        location: "Mysore, Karnataka",
        googleMapsUrl: "https://maps.app.goo.gl/UUjiHu2n8CZRMDhx9",
        bestTimeToVisit: "October to February",
        imageUrl: "https://www.holidaymonk.com/wp-content/uploads/2022/05/Mysore-Palace-1024x684.webp"
      },
      {
        id: "karnataka-hampi",
        name: "Hampi",
        description: "A UNESCO World Heritage site showcasing ancient ruins, stunning temples, and surreal landscapes from the Vijayanagara empire.",
        location: "Hampi, Karnataka",
        googleMapsUrl: "https://maps.app.goo.gl/KYJHY5ZDzL1fCJPX8",
        bestTimeToVisit: "October to February",
        imageUrl: "https://beonthetrail.com/storage/blogs/5/0C1lRwEGGcEnY2R47O2hPOPlZTpmOjKtNGkW8817.jpg"
      },
      {
        id: "karnataka-coorg",
        name: "Coorg (Kodagu)",
        description: "Known as the Scotland of India, Coorg is celebrated for its lush coffee plantations, scenic waterfalls, and cool, refreshing climate.",
        location: "Coorg, Karnataka",
        googleMapsUrl: "https://maps.app.goo.gl/Nphx4LhU3srbC4yB7",
        bestTimeToVisit: "October to March",
        imageUrl: "https://anjaneyatravels.com/wp-content/uploads/2024/06/Featured-image-Green-hills-at-CoorgIndia-1244x700-1.jpg"
      },
      {
        id: "karnataka-bangalore",
        name: "Bangalore (Bengaluru)",
        description: "A dynamic metropolis blending modernity with heritage, highlighted by landmarks such as the Bangalore Palace and lush gardens.",
        location: "Bangalore, Karnataka",
        googleMapsUrl: "https://maps.app.goo.gl/GW7ndY5GyEYiV6fp8",
        bestTimeToVisit: "November to February",
        imageUrl: "https://deih43ym53wif.cloudfront.net/bangalore-india-shutterstock_662210488_ac0dd8543d.jpeg"
      },
      {
        id: "karnataka-bandipur",
        name: "Bandipur National Park",
        description: "A premier wildlife sanctuary offering thrilling jeep safaris and a chance to witness diverse flora and fauna in their natural habitat.",
        location: "Bandipur, Karnataka",
        googleMapsUrl: "https://maps.app.goo.gl/WjTW9Xt7BqbsCaNa8",
        bestTimeToVisit: "October to May",
        imageUrl: "https://irisholidays.com/keralatourism/wp-content/uploads/2024/09/bandipur-national-park.jpg"
      }
    ],
  },
  {
    name: "Goa",
    capital: "Panaji",
    touristPlaces: [
      {
        id: "goa-baga-beach",
        name: "Baga Beach",
        description: "A lively beach known for water sports, vibrant nightlife, and an array of dining options.",
        location: "North Goa, Goa",
        googleMapsUrl: "https://maps.app.goo.gl/AWXSBDTWSuaYMyX38",
        bestTimeToVisit: "November to February",
        imageUrl: "https://blog.hireavilla.in/wp-content/uploads/2024/05/chair-table-dinning-beach-sea-with-blue-sky-scaled.jpg"
      },
      {
        id: "goa-calangute-beach",
        name: "Calangute Beach",
        description: "Dubbed the 'Queen of Beaches,' it's the largest in North Goa, attracting tourists with its festive atmosphere.",
        location: "North Goa, Goa",
        googleMapsUrl: "https://maps.app.goo.gl/q19eyZ6LHn5QD1Ju8",
        bestTimeToVisit: "November to February",
        imageUrl: "https://www.goa.gov.in/wp-content/uploads/2020/08/Calangutemain.jpg"
      },
      {
        id: "goa-panaji",
        name: "Panaji (Panjim)",
        description: "The capital city, known for its colonial architecture, vibrant markets, and the historic Our Lady of the Immaculate Conception Church.",
        location: "Panaji, Goa",
        googleMapsUrl: "https://maps.app.goo.gl/nsd1Jd4qVkpaFmMy7",
        bestTimeToVisit: "November to February",
        imageUrl: "https://d26dp53kz39178.cloudfront.net/media/uploads/Travel_Guide_Images/Panaji_result.webp"
      },
      {
        id: "goa-palolem-beach",
        name: "Palolem Beach",
        description: "A serene beach known for its crescent shape, calm waters, and vibrant nightlife.",
        location: "South Goa, Goa",
        googleMapsUrl: "https://maps.app.goo.gl/3uGjtWgiw5Mx1a7J6",
        bestTimeToVisit: "November to February",
        imageUrl: "https://clubmahindra.gumlet.io/blog/media/section_images/palolembea-b0b10c223bd68f2.webp?w=376&dpr=2.6"
      }
    ],
  },
  
  
  
  {
    name: "West Bengal",
    capital: "Kolkata",
    touristPlaces: [
      {
        id: "west-bengal-victoria",
        name: "Victoria Memorial",
        description: "A grand marble monument built between 1906 and 1921, the Victoria Memorial is dedicated to Queen Victoria and houses a museum with a rich collection of artifacts from the British colonial period.",
        location: "Kolkata, West Bengal",
        googleMapsUrl: "https://maps.app.goo.gl/3a7EVjbGHonGbKP16",
        bestTimeToVisit: "October to March",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Victoria_Memorial_situated_in_Kolkata.jpg"
      },
      {
        id: "west-bengal-darjeeling",
        name: "Darjeeling",
        description: "Known as the \"Queen of the Hills,\" Darjeeling offers panoramic views of the Himalayas, lush tea gardens, and the famous Darjeeling Himalayan Railway, a UNESCO World Heritage Site.",
        location: "Darjeeling, West Bengal",
        googleMapsUrl: "https://maps.app.goo.gl/zoJuxMJt4JsjkGQ59",
        bestTimeToVisit: "March to June and September to November",
        imageUrl: "https://www.pashupatitravels.com/wp-content/uploads/2017/04/Darjeeling-happytrips.jpg"
      },
      {
        id: "west-bengal-sundarbans",
        name: "Sundarbans National Park",
        description: "A UNESCO World Heritage Site, the Sundarbans is the largest tidal halophytic mangrove forest in the world and home to the Royal Bengal Tiger and diverse wildlife.",
        location: "Sundarbans, West Bengal",
        googleMapsUrl: "https://maps.app.goo.gl/zBawAZYg1VRZjTkb6",
        bestTimeToVisit: "November to February",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sundarban_Tiger.jpg/1200px-Sundarban_Tiger.jpg"
      },
      {
        id: "west-bengal-kalimpong",
        name: "Kalimpong",
        description: "A serene hill station known for its Buddhist monasteries, colonial architecture, and panoramic views of the Teesta River valley.",
        location: "Kalimpong, West Bengal",
        googleMapsUrl: "https://maps.app.goo.gl/5994AqaHa3QpWWVx9",
        bestTimeToVisit: "March to May and September to November",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/lord-buddha-statue-kalimpong-west-bengal-city-1-hero?qlt=82&ts=1726645267006"
      },
      {
        id: "west-bengal-shantiniketan",
        name: "Shantiniketan",
        description: "Founded by Nobel Laureate Rabindranath Tagore, Shantiniketan is a cultural hub known for Visva-Bharati University and its emphasis on arts, music, and literature.",
        location: "Shantiniketan, West Bengal",
        googleMapsUrl: "https://maps.app.goo.gl/AwYTRkqpD5nE7Pgm9",
        bestTimeToVisit: "November to February",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ppDRybmWFEdC2uf62-h8RzqOglF4LwqlSQ&s"
      }
    ],
  },
  {
    name: "Kerala",
    capital: "Thiruvananthapuram",
    touristPlaces: [
      {
        id: "kerala-munnar",
        name: "Munnar",
        description: "A charming hill station famous for its sprawling tea gardens, rolling hills, and cool, refreshing climate.",
        location: "Munnar, Kerala",
        googleMapsUrl: "https://maps.app.goo.gl/VUfuy8H1UPpwkxrH9",
        bestTimeToVisit: "September to March",
        imageUrl: "https://content.r9cdn.net/rimg/dimg/a9/dd/d6b29241-city-44818-166a7453734.jpg?width=1366&height=768&xhint=1600&yhint=1049&crop=true"
      },
      {
        id: "kerala-alleppey",
        name: "Alleppey (Alappuzha)",
        description: "Known as the \"Venice of the East,\" Alleppey enchants visitors with its intricate network of backwaters and houseboat cruises.",
        location: "Alleppey, Kerala",
        googleMapsUrl: "https://maps.app.goo.gl/TJtSmn8csiS5EYX88",
        bestTimeToVisit: "November to February",
        imageUrl: "https://www.seawatersports.com/images/places/alleppey-in-kerala.jpg"
      },
      {
        id: "kerala-kochi",
        name: "Kochi (Cochin)",
        description: "A vibrant port city that beautifully blends historical charm with modern amenities and scenic coastal views.",
        location: "Kochi, Kerala",
        googleMapsUrl: "https://maps.app.goo.gl/jvxCU2kWPfNyVvTH9",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.india.com/wp-content/uploads/2024/08/Fort-Kochi.jpg"
      },
      {
        id: "kerala-kovalam",
        name: "Kovalam",
        description: "A picturesque coastal town celebrated for its crescent-shaped beaches, iconic lighthouse, and water sports.",
        location: "Kovalam, Kerala",
        googleMapsUrl: "https://maps.app.goo.gl/FCvdksXMzMicz39T6",
        bestTimeToVisit: "September to March",
        imageUrl: "https://www.thebyke.com/wp-content/uploads/2023/06/Kovalam-2.jpg"
      },
      {
        id: "kerala-wayanad",
        name: "Wayanad",
        description: "A lush, scenic district renowned for its dense forests, waterfalls, wildlife sanctuaries, and rich tribal heritage.",
        location: "Wayanad, Kerala",
        googleMapsUrl: "https://maps.app.goo.gl/A9SaBFo33k1tC2Xa7",
        bestTimeToVisit: "October to May",
        imageUrl: "https://s3.india.com/wp-content/uploads/2024/06/10-Must-Do-Activities-in-Wayanad.jpg?impolicy=Medium_Widthonly&w=350&h=263"
      }
    ],
  },
  {
    name: "Manipur",
    capital: "Imphal",
    touristPlaces: [
      {
        id: "manipur-imphal",
        name: "Imphal",
        description: "The capital city of Manipur, Imphal is a blend of historical significance and natural beauty. Key attractions include the Kangla Fort, a symbol of Manipur's royal heritage, and the bustling Ima Market, one of the largest all-women's markets in Asia.",
        location: "Imphal, Manipur",
        googleMapsUrl: "https://maps.app.goo.gl/AtbWLs9KSnCqPfLi7",
        bestTimeToVisit: "October to April",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/2-iskcon-temple-imphal-manipur-2-city-hero?qlt=82&ts=1726666482936"
      },
      {
        id: "manipur-loktak-lake",
        name: "Loktak Lake",
        description: "Located near Moirang, Loktak Lake is the largest freshwater lake in northeastern India, renowned for its phumdis (floating islands). The lake is also home to the Keibul Lamjao National Park, the only floating national park globally, which shelters the endangered Sangai deer.",
        location: "Moirang, Manipur",
        googleMapsUrl: "https://maps.app.goo.gl/sKK5GXqvUp2WQw2a7",
        bestTimeToVisit: "November to March",
        imageUrl: "https://insideindiatour.files.wordpress.com/2020/09/1466c2a3c90e6f8abd81d115cc0a842d.jpg"
      },
      {
        id: "manipur-thoubal",
        name: "Thoubal",
        description: "Thoubal is known for its scenic landscapes, including the Thoubal River, making it ideal for outdoor activities like rafting and kayaking. The town also boasts several markets and temples, reflecting the local culture.",
        location: "Thoubal, Manipur",
        googleMapsUrl: "https://maps.app.goo.gl/7pHpYQ3u1F5tjKxj6",
        bestTimeToVisit: "October to March",
        imageUrl: "https://img.traveltriangle.com/blog/wp-content/uploads/2019/01/cover-for-Places-To-Visit-In-Manipur.jpg"
      },
      {
        id: "manipur-ukhrul",
        name: "Ukhrul",
        description: "A serene hill station, Ukhrul is famous for its natural beauty, including the Shirui Lily, which blooms only in this region. The area is also known for its vibrant tribal culture and festivals.",
        location: "Ukhrul, Manipur",
        googleMapsUrl: "https://maps.app.goo.gl/c2TY75nt4uw7sV1w5",
        bestTimeToVisit: "April to June",
        imageUrl: "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/04/Geographical-1.jpg?size=*:900"
      },
      {
        id: "manipur-chandel",
        name: "Chandel",
        description: "Bordering Myanmar, Chandel is known for its rich biodiversity and as a cultural hub for various tribes. The area offers lush landscapes and unique cultural experiences.",
        location: "Chandel, Manipur",
        googleMapsUrl: "https://maps.app.goo.gl/bYs3Rt2mj6zu1fx77",
        bestTimeToVisit: "October to March",
        imageUrl: "https://www.vivacepanorama.com/wp-content/uploads/2015/10/Chandel-of-Bundelkhand.jpg"
      }
    ],
  },
  {
    name: "Mizoram",
    capital: "Aizawl",
    touristPlaces: [
      {
        id: "mizoram-aizawl",
        name: "Aizawl",
        description: "The capital city, Aizawl, is perched atop a ridge at 1,132 meters, offering panoramic views of the surrounding hills. It's a cultural hub showcasing Mizo traditions, bustling markets, and colonial-era architecture.",
        location: "Aizawl, Mizoram",
        googleMapsUrl: "https://maps.app.goo.gl/YcgRy467W5od98TV6",
        bestTimeToVisit: "November to March",
        imageUrl: "https://www.indian-travel-places.com/wp-content/uploads/2022/02/Aizawl.jpg"
      },
      {
        id: "mizoram-reiek",
        name: "Reiek",
        description: "Reiek is a mountain and tourist spot located 29 km from Aizawl, standing at 1,465 meters. It offers panoramic views of the surrounding valleys and hills, and on clear days, the plains of Bangladesh are visible. The area is rich in flora and fauna, making it ideal for nature enthusiasts.",
        location: "Reiek, Mizoram",
        googleMapsUrl: "https://maps.app.goo.gl/eUg1HkayXsU6PaBE7",
        bestTimeToVisit: "November to March",
        imageUrl: "https://www.connectingtraveller.com/images/localtip/1654204982Ed_OjxoX0AEiMHq.jpg"
      },
      {
        id: "mizoram-champhai",
        name: "Champhai",
        description: "Champhai, located near the Myanmar border, is known as the \"Rice Bowl of Mizoram.\" It offers expansive rice fields, scenic landscapes, and ancient relics, making it a blend of natural beauty and historical significance.",
        location: "Champhai, Mizoram",
        googleMapsUrl: "https://maps.app.goo.gl/YgAKbgM9fQ2qzoQe6",
        bestTimeToVisit: "November to March",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/6-rih-dhdil-lake-champhai-mizoram-city-hero-new?qlt=82&ts=1726674860746"
      },
      {
        id: "mizoram-phawngpui",
        name: "Phawngpui National Park",
        description: "Also known as the Blue Mountain National Park, Phawngpui is the highest peak in Mizoram at 2,157 meters. The park is renowned for its diverse flora and fauna, including rare species like the clouded leopard and the Blyth's tragopan.",
        location: "Phawngpui National Park, Mizoram",
        googleMapsUrl: "https://maps.app.goo.gl/kwH9tJUe17MJFhP36",
        bestTimeToVisit: "November to April",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Phawngpui_national_park.jpg"
      },
      {
        id: "mizoram-tam-dil",
        name: "Tam Dil Lake",
        description: "Tam Dil, meaning 'Lake of Mustard,' is a serene natural lake surrounded by evergreen forests. It's a popular spot for picnics, boating, and fishing, offering tranquility away from urban life.",
        location: "Tam Dil Lake, Mizoram",
        googleMapsUrl: "https://maps.app.goo.gl/o22L2V4cDxoQgvAw5",
        bestTimeToVisit: "November to March",
        imageUrl: "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/18/9ab369846345d355942669a9baf7807b_1000x1000.jpg"
      }
    ],
  }
];

const States = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Alternative approach for older browsers
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, []);

  const filteredStates = STATES_DATA.filter((state) => {
    // Check if state name matches the search query
    const stateNameMatches = state.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if any tourist place name matches the search query
    const placesMatch = state.touristPlaces.some(place => 
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Return true if either the state name or any place name matches
    return stateNameMatches || placesMatch;
  });


  // Function to get a random image URL for each state
  const getStateImage = (state: StateInfo) => {
    return state.touristPlaces[0]?.imageUrl || "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Indian States</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Discover the unique cultural heritage, traditions, and tourist destinations of each Indian state.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <Input
            type="text"
            placeholder="Search states or tourist places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-lg py-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStates.map((state) => (
            <Card
              key={state.name}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => setSelectedState(state)}
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${getStateImage(state)}')`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <CardTitle className="text-2xl font-bold text-white">
                    {state.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Capital: {state.capital}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Tourist Places: {state.touristPlaces.length}
                    </span>
                    <span className="text-primary font-medium">
                      View Details →
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    Featured: {state.touristPlaces.map(place => place.name).join(', ')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedState && (
          <StateDialog
            isOpen={!!selectedState}
            onClose={() => setSelectedState(null)}
            stateName={selectedState.name}
            places={selectedState.touristPlaces}
          />
        )}
      </div>
    </div>
  );
};

export default States;
