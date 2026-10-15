import {
  User,
  Destination,
  Package,
  Hotel,
  Cab,
  Activity,
  Offer,
  Blog,
  FAQ,
  Category,
  Review,
  Coupon,
} from '../models';

export async function seedDatabase(clear = true): Promise<void> {
  if (clear) {
    await Promise.all([
      User.deleteMany({}),
      Destination.deleteMany({}),
      Package.deleteMany({}),
      Hotel.deleteMany({}),
      Cab.deleteMany({}),
      Activity.deleteMany({}),
      Offer.deleteMany({}),
      Blog.deleteMany({}),
      FAQ.deleteMany({}),
      Category.deleteMany({}),
      Review.deleteMany({}),
      Coupon.deleteMany({}),
    ]);
  }

  const existing = await Package.countDocuments();
  if (existing > 0 && !clear) {
    console.log('Database already seeded');
    return;
  }

  await User.create([
    {
      name: 'Admin',
      email: 'admin@exploremybharat.com',
      phone: '+919876543210',
      password: 'Admin@123',
      role: 'admin',
    },
    {
      name: 'Aarav Traveler',
      email: 'traveler@exploremybharat.com',
      phone: '+919811122233',
      password: 'Travel@123',
      role: 'customer',
    },
  ]);

  const destinations = await Destination.insertMany([
    dest('Himachal Pradesh', 'himachal', 'Himachal Pradesh', 'North', 'Snow peaks, pine valleys and hill-station escapes.', '/images/destinations/himachal.jpg', 2, 7999, ['Manali', 'Shimla', 'Spiti']),
    dest('Kashmir', 'kashmir', 'Jammu & Kashmir', 'North', 'Lakes, meadows and Mughal gardens in the valley.', '/images/destinations/kashmir.jpg', 1, 12999, ['Srinagar', 'Gulmarg', 'Pahalgam']),
    dest('Rajasthan', 'rajasthan', 'Rajasthan', 'West', 'Forts, deserts and royal city trails.', '/images/destinations/rajasthan.jpg', 1, 15999, ['Jaipur', 'Udaipur', 'Jaisalmer']),
    dest('Gujarat', 'gujarat', 'Gujarat', 'West', 'Rann of Kutch, heritage cities and coastal escapes.', '/images/destinations/gujarat.jpg', 1, 11999, ['Rann of Kutch', 'Ahmedabad', 'Dwarka', 'Somnath']),
    dest('Northeast', 'northeast', 'Meghalaya', 'Northeast', 'Cloud forests, living root bridges and quiet trails.', '/images/destinations/northeast.jpg', 1, 15999, ['Shillong', 'Cherrapunji']),
  ]);

  const bySlug = Object.fromEntries(destinations.map((d) => [d.slug, d]));

  const packages = await Package.insertMany([
    pkg('Manali Mountain Escape', 'manali-mountain-escape', bySlug.himachal._id, 4, 3, 7999, 20, '/images/packages/manali.jpg', 'Snow views, Solang thrills and cozy stays in Manali.', 'Bestseller', 'family', '3 Star', 'Breakfast', 'family'),
    pkg('Shimla Hills Getaway', 'shimla-hills-getaway', bySlug.himachal._id, 3, 2, 6999, 15, '/images/destinations/himachal.jpg', 'Mall Road evenings and cedar forest walks in Shimla.', 'Weekend', 'weekend', '3 Star', 'Breakfast', 'weekend'),
    pkg('Kashmir Valley Romance', 'kashmir-valley-romance', bySlug.kashmir._id, 6, 5, 12999, 25, '/images/packages/kashmir.jpg', 'Srinagar houseboat, Gulmarg meadows and Pahalgam valleys.', '40% OFF', 'honeymoon', '3 Star', 'Breakfast', 'honeymoon'),
    pkg('Rajasthan Desert Trail', 'rajasthan-desert-trail', bySlug.rajasthan._id, 6, 5, 25960, 10, '/images/packages/rajasthan.jpg', 'Jaipur, Pushkar, Jodhpur and Jaisalmer dunes.', undefined, 'cultural', '4 Star', 'Breakfast', 'group'),
    pkg('Gujarat Heritage Circuit', 'gujarat-heritage-circuit', bySlug.gujarat._id, 5, 4, 11999, 12, '/images/destinations/gujarat.jpg', 'Ahmedabad heritage, Dwarka and Somnath coastal temples.', 'New', 'pilgrimage', '3 Star', 'Breakfast', 'family'),
    pkg('Northeast Cloud Trail', 'northeast-cloud-trail', bySlug.northeast._id, 6, 5, 15999, 18, '/images/destinations/northeast.jpg', 'Shillong, Cherrapunji and living root bridge walks.', 'Adventure', 'adventure', '3 Star', 'Breakfast', 'adventure'),
  ]);

  await Hotel.insertMany([
    hotel('Pine Crest Manali', 'pine-crest-manali', bySlug.himachal._id, 'Hadimba Road, Manali', '/images/hotels/manali.jpg', 3000, 360, 13),
    hotel('Dal View Srinagar', 'dal-view-srinagar', bySlug.kashmir._id, 'Boulevard Road, Srinagar', '/images/destinations/kashmir.jpg', 4500, 540, 10),
    hotel('Desert Haveli Jaisalmer', 'desert-haveli-jaisalmer', bySlug.rajasthan._id, 'Near Fort, Jaisalmer', '/images/hotels/rajasthan.jpg', 3800, 456, 12),
    hotel('Rann Resort Tent Stay', 'rann-resort-tent-stay', bySlug.gujarat._id, 'Near White Rann, Kutch', '/images/destinations/gujarat.jpg', 5200, 624, 8),
    hotel('Pinewood Shillong', 'pinewood-shillong', bySlug.northeast._id, 'Police Bazaar, Shillong', '/images/destinations/northeast.jpg', 2800, 336, 10),
  ]);

  await Cab.insertMany([
    { name: 'Comfort Sedan', slug: 'comfort-sedan', vehicleType: 'Sedan', image: '/images/activities/cab-sedan.jpg', seats: 4, luggage: 2, ac: true, startingPrice: 2499, description: 'Ideal for couples and small families.', features: ['AC', 'Verified driver'] },
    { name: 'Family SUV', slug: 'family-suv', vehicleType: 'SUV', image: '/images/activities/cab-suv.jpg', seats: 6, luggage: 4, ac: true, startingPrice: 3999, description: 'Spacious SUV for hill roads.', features: ['AC', 'Hill-ready'] },
    { name: 'Innova Crysta', slug: 'innova-crysta', vehicleType: 'Innova', image: '/images/activities/cab-innova.jpg', seats: 7, luggage: 5, ac: true, startingPrice: 4999, description: 'Premium MUV comfort for families.', features: ['AC', 'Charging points'] },
    { name: 'Tempo Traveller', slug: 'tempo-traveller', vehicleType: 'Tempo Traveller', image: '/images/activities/cab-tempo.jpg', seats: 12, luggage: 10, ac: true, startingPrice: 7999, description: 'Perfect for group tours.', features: ['Pushback seats', 'AC'] },
  ]);

  await Activity.insertMany([
    activity('Solang Valley Adventure Day', 'solang-valley-adventure-day', bySlug.himachal._id, 'Solang, Manali', 'Adventure', '/images/activities/adventure.jpg', '6 hours', 2499),
    activity('Dal Lake Shikara Ride', 'dal-lake-shikara-ride', bySlug.kashmir._id, 'Srinagar', 'Sightseeing', '/images/activities/sightseeing.jpg', '1 hour', 999),
    activity('Jaipur Cultural Evening', 'jaipur-cultural-evening', bySlug.rajasthan._id, 'Jaipur', 'Cultural', '/images/activities/cultural.jpg', '3 hours', 1799),
    activity('White Rann Sunset Visit', 'white-rann-sunset-visit', bySlug.gujarat._id, 'Rann of Kutch', 'Sightseeing', '/images/destinations/gujarat.jpg', '4 hours', 1999),
    activity('Living Root Bridge Trek', 'living-root-bridge-trek', bySlug.northeast._id, 'Meghalaya', 'Trekking', '/images/activities/adventure.jpg', '5 hours', 2499),
  ]);

  await Offer.insertMany([
    { title: 'Weekend Ready', slug: 'weekend-ready', subtitle: 'Holiday packages from ₹9,999', description: 'Hotels, transfers and sightseeing planned together.', image: '/images/offers/weekend.jpg', destination: 'Himachal', discountLabel: 'From ₹9,999', startingPrice: 9999, ctaLabel: 'View Packages', ctaLink: '/packages?budget=15000', featured: true, order: 1 },
    { title: 'Himachal', slug: 'offer-himachal', description: 'Hill escapes starting under ₹10k.', image: '/images/destinations/himachal.jpg', destination: 'Himachal', discountLabel: '35% OFF', startingPrice: 9999, ctaLabel: 'View Packages', ctaLink: '/packages?destination=himachal', order: 2 },
    { title: 'Kashmir', slug: 'offer-kashmir', description: 'Valley packages with houseboat nights.', image: '/images/destinations/kashmir.jpg', destination: 'Kashmir', discountLabel: '40% OFF', startingPrice: 12999, ctaLabel: 'View Packages', ctaLink: '/packages?destination=kashmir', order: 3 },
    { title: 'Rajasthan', slug: 'offer-rajasthan', description: 'Forts and desert evenings.', image: '/images/destinations/rajasthan.jpg', destination: 'Rajasthan', discountLabel: '25% OFF', startingPrice: 15999, ctaLabel: 'View Packages', ctaLink: '/packages?destination=rajasthan', order: 4 },
    { title: 'Gujarat', slug: 'offer-gujarat', description: 'Rann nights and heritage circuits.', image: '/images/destinations/gujarat.jpg', destination: 'Gujarat', discountLabel: '20% OFF', startingPrice: 11999, ctaLabel: 'View Packages', ctaLink: '/packages?destination=gujarat', order: 5 },
    { title: 'Northeast', slug: 'offer-northeast', description: 'Cloud forests and quiet trails.', image: '/images/destinations/northeast.jpg', destination: 'Northeast', discountLabel: '35% OFF', startingPrice: 15999, ctaLabel: 'View Packages', ctaLink: '/packages?destination=northeast', order: 6 },
  ]);

  await Category.insertMany([
    { name: 'Adventure', slug: 'adventure', description: 'Hikes, wildlife and adrenaline with expert-led safety.', image: '/images/categories/adventure.jpg', order: 1 },
    { name: 'Family', slug: 'family', description: 'Kid-friendly pacing and spacious stays.', image: '/images/categories/family.jpg', order: 2 },
    { name: 'Honeymoon', slug: 'honeymoon', description: 'Private experiences and serene escapes.', image: '/images/categories/honeymoon.jpg', order: 3 },
    { name: 'Pilgrimage', slug: 'pilgrimage', description: 'Respectful itineraries with comfortable transport.', image: '/images/categories/pilgrimage.jpg', order: 4 },
    { name: 'Luxury', slug: 'luxury', description: 'Signature stays and white-glove planning.', image: '/images/categories/luxury.jpg', order: 5 },
    { name: 'Corporate', slug: 'corporate', description: 'MICE-ready logistics and group billing.', image: '/images/categories/corporate.jpg', order: 6 },
    { name: 'Weekend Getaways', slug: 'weekend', description: 'Short escapes for Friday-to-Sunday calendars.', image: '/images/categories/weekend.jpg', order: 7 },
    { name: 'Group Tours', slug: 'group', description: 'Fixed departures for like-minded explorers.', image: '/images/categories/group.jpg', order: 8 },
  ]);

  await FAQ.insertMany([
    { question: 'Do you offer customized itineraries?', answer: 'Yes. Our travel designers build bespoke routes around your dates, budget and interests.', order: 1 },
    { question: 'How can I book a package?', answer: 'Search a destination, open a package, and click Get Quote or Book Now.', order: 2 },
    { question: 'Can I customize hotels?', answer: 'Yes. Hotel category and properties can be upgraded before confirmation.', order: 3 },
    { question: 'Do you provide cab services?', answer: 'Yes. Sedans, SUVs, Innova and Tempo Travellers are available.', order: 4 },
    { question: 'Can I get a quotation?', answer: 'Use Get Quote on any package or the Plan My Trip form.', order: 5 },
    { question: 'What is your cancellation policy?', answer: 'Cancellation windows vary by package and season and are listed before you pay.', order: 6 },
    { question: 'Do you provide travel support?', answer: 'Yes. ExploreMyBharat offers 24/7 trip support for active bookings.', order: 7 },
  ]);

  await Blog.insertMany([
    { title: 'Best time to visit Himachal Pradesh', slug: 'best-time-to-visit-himachal', category: 'Guides', excerpt: 'Month-by-month weather and what to pack for the hills.', content: '<p>Himachal shines from March to June and again in autumn for clear mountain views.</p>', image: '/images/destinations/himachal.jpg', author: 'ExploreMyBharat Team', publishedAt: new Date('2026-03-01') },
    { title: 'How to plan a Kashmir honeymoon', slug: 'kashmir-honeymoon-guide', category: 'Honeymoon', excerpt: 'Houseboats, Gulmarg and romantic valley pacing.', content: '<p>Start in Srinagar on a deluxe houseboat, add Gulmarg, and keep a quiet day in Pahalgam.</p>', image: '/images/destinations/kashmir.jpg', publishedAt: new Date('2026-04-12') },
    { title: 'Gujarat in 5 days: heritage to the Rann', slug: 'gujarat-5-days-itinerary', category: 'Itineraries', excerpt: 'Ahmedabad, Dwarka and a White Rann evening.', content: '<p>Begin in Ahmedabad, continue to Dwarka–Somnath, and end with a Rann of Kutch sunset.</p>', image: '/images/destinations/gujarat.jpg', publishedAt: new Date('2026-05-20') },
  ]);

  await Review.insertMany([
    { name: 'Neha Sharma', city: 'Mumbai', avatar: '/images/avatars/a1.jpg', rating: 5, comment: 'Everything was perfectly planned from hotels to sightseeing.', tripName: 'Manali Mountain Escape', package: packages[0]._id, featured: true },
    { name: 'Rahul Mehta', city: 'Bengaluru', avatar: '/images/avatars/a2.jpg', rating: 5, comment: 'Clear pricing and a travel expert who answered late at night.', tripName: 'Rajasthan Desert Trail', package: packages[3]._id, featured: true },
    { name: 'Ananya Iyer', city: 'Chennai', avatar: '/images/avatars/a3.jpg', rating: 4, comment: 'Loved the houseboat night. Custom hotel upgrade was seamless.', tripName: 'Kashmir Valley Romance', package: packages[2]._id, featured: true },
  ]);

  await Coupon.create({
    code: 'BHARAT10',
    description: '10% off first enquiry booking assist',
    discountType: 'percent',
    discountValue: 10,
    active: true,
  });

  console.log(`Seeded ${packages.length} packages and ${destinations.length} destinations.`);
}

function dest(
  name: string,
  slug: string,
  state: string,
  region: string,
  shortDescription: string,
  image: string,
  packageCount: number,
  startingPrice: number,
  topAttractions: string[],
) {
  return {
    name,
    slug,
    state,
    region,
    shortDescription,
    description: `${shortDescription} Explore holiday packages with ExploreMyBharat.`,
    image,
    gallery: [image],
    bestTimeToVisit: 'October to March (varies by region)',
    topAttractions,
    travelTips: ['Book early in peak season', 'Carry layers for hill destinations'],
    packageCount,
    startingPrice,
    featured: true,
    published: true,
    seoTitle: `${name} Tour Packages | ExploreMyBharat`,
    seoDescription: `${name} tour packages with hotels, transfers and sightseeing.`,
    faqs: [{ question: `Is ${name} good for first-timers?`, answer: 'Yes — our experts pace itineraries for first visits.' }],
  };
}

function pkg(
  title: string,
  slug: string,
  destination: unknown,
  duration: number,
  nights: number,
  price: number,
  discount: number,
  image: string,
  shortDescription: string,
  badge: string | undefined,
  category: string,
  hotelCategory: string,
  mealPlan: string,
  travelType: string,
) {
  return {
    title,
    slug,
    destination,
    country: 'India',
    duration,
    nights,
    price,
    discount,
    images: [image],
    shortDescription,
    description: `${shortDescription} Includes hotels, selected meals, transfers and sightseeing as listed.`,
    highlights: ['Handpicked hotels', 'Private transfers', 'Local experiences'],
    itinerary: Array.from({ length: duration }, (_, i) => ({
      day: i + 1,
      title: i === 0 ? 'Arrival & check-in' : i === duration - 1 ? 'Departure' : `Day ${i + 1} exploration`,
      description:
        i === 0
          ? 'Arrive, transfer to hotel and settle in.'
          : i === duration - 1
            ? 'Breakfast and departure transfer.'
            : 'Sightseeing and leisure as per itinerary.',
    })),
    inclusions: ['Hotel stay', 'Breakfast', 'Transfers', 'Sightseeing as per itinerary'],
    exclusions: ['Flights', 'Personal expenses', 'Optional activities'],
    hotels: [`${hotelCategory} hotel`],
    meals: mealPlan,
    transfers: 'Airport/station transfers and sightseeing cab',
    activities: ['Sightseeing'],
    faqs: [{ question: 'Can hotels be upgraded?', answer: 'Yes, based on availability and budget.' }],
    rating: 4.5 + (discount % 5) / 10,
    reviewCount: 40 + discount,
    featured: true,
    published: true,
    badge,
    category,
    hotelCategory,
    mealPlan,
    travelType,
    seoTitle: `${title} | ExploreMyBharat`,
    seoDescription: shortDescription,
  };
}

function hotel(
  name: string,
  slug: string,
  destination: unknown,
  location: string,
  image: string,
  pricePerNight: number,
  taxes: number,
  discount: number,
) {
  return {
    name,
    slug,
    destination,
    location,
    description: `${name} offers a comfortable stay with essential amenities for leisure travellers.`,
    images: [image],
    starRating: 3,
    rating: 4.3,
    reviewCount: 100,
    amenities: ['Wi-Fi', 'Restaurant', 'Parking'],
    propertyType: 'Hotel',
    mealPlan: 'Breakfast',
    pricePerNight,
    taxes,
    discount,
    rooms: [{ name: 'Deluxe Room', maxGuests: 2, price: pricePerNight, amenities: ['Wi-Fi', 'AC'] }],
    policies: ['Check-in 2 PM', 'Check-out 11 AM'],
    featured: true,
    published: true,
  };
}

function activity(
  title: string,
  slug: string,
  destination: unknown,
  location: string,
  category: string,
  image: string,
  duration: string,
  price: number,
) {
  return {
    title,
    slug,
    destination,
    location,
    category,
    image,
    images: [image],
    duration,
    price,
    discount: 5,
    rating: 4.6,
    reviewCount: 50,
    description: `${title} is a carefully hosted experience with local experts.`,
    highlights: ['Local host', 'Safety first'],
    inclusions: ['Guide'],
    exclusions: ['Personal expenses'],
    published: true,
    featured: true,
  };
}
