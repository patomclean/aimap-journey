// Trip Form Types

export interface TripFormData {
  // Section 1: Trip Name
  tripName: string;

  // Section 2: Places
  originCity: string;
  destinations: Destination[];

  // Section 3: Dates
  dateType: 'specific' | 'flexible';
  startDate: string | null;
  endDate: string | null;
  flexibleMonth?: string;

  // Section 4: Budget
  budgetMin: number | null;
  budgetMax: number | null;
  currency: Currency;

  // Section 5: Spending Priorities
  priorities: SpendingPriorities;

  // Section 6: Companions
  numberOfPeople: number;
  ageRangeMin: number;
  ageRangeMax: number;
  travelWith: TravelWith;
  companionNotes: string;

  // Section 7: Interests
  interests: Interests;

  // Section 8: Additional
  additionalNotes: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image?: string;
}

export type Currency = 'USD' | 'EUR' | 'ARS' | 'BRL' | 'MXN' | 'CLP' | 'COP';

export type ImportanceLevel =
  | 'muy_importante'
  | 'importante'
  | 'normal'
  | 'poco_importante'
  | 'no_importa';

export type TravelWith = 'familia' | 'amigos' | 'pareja' | 'solo';

export interface SpendingPriorities {
  // Flights & Transfers
  flights: {
    importance: ImportanceLevel;
    noPreference: boolean;
    directFlight: boolean;
    personalBagOnly: boolean;
    privateTransport: boolean;
    preferredTimeSlot: string;
    avoid: string[];
  };

  // Accommodation
  accommodation: {
    importance: ImportanceLevel;
    type: AccommodationType[];
    breakfastIncluded: boolean;
    freeCancellation: boolean;
    noSelfCheckIn: boolean;
    petFriendly: boolean;
    amenities: string[];
  };

  // Meals
  meals: {
    importance: ImportanceLevel;
    localFood: boolean;
    restaurants: boolean;
    streetFood: boolean;
    supermarket: boolean;
    fastFood: boolean;
    dietaryRestrictions: string[];
    otherRestriction: string;
  };

  // Activities
  activities: {
    importance: ImportanceLevel;
    freeActivitiesOnly: boolean;
    nightlife: boolean;
    culturalTours: boolean;
    outdoorSports: boolean;
    avoid: string[];
  };
}

export type AccommodationType =
  | 'hotel'
  | 'hostel'
  | 'apartment'
  | 'house'
  | 'resort'
  | 'cabin';

export interface Interests {
  history: InterestItem;
  artCulture: InterestItem;
  nature: InterestItem;
  entertainment: InterestItem;
  sports: InterestItem;
  gastronomy: InterestItem;
  shopping: InterestItem;
  adventure: InterestItem;
}

export interface InterestItem {
  value: number; // 1-10
  comment: string;
}

// Form section status
export type SectionStatus = 'pending' | 'active' | 'completed';

export interface FormSection {
  id: string;
  name: string;
  icon: string;
  status: SectionStatus;
}

// Supabase types
export interface Trip {
  id: string;
  user_id: string | null;
  trip_name: string;
  form_data: TripFormData;
  itinerary_data?: Itinerary;
  status: 'draft' | 'generating' | 'completed';
  created_at: string;
  updated_at: string;
}

// Itinerary Types
export interface Itinerary {
  destination: string;
  country: string;
  totalDays: number;
  startDate: string;
  endDate: string;
  budgetMin: number;
  budgetMax: number;
  currency: Currency;
  inspirationImages: string[];
  days: ItineraryDay[];
  totalEstimatedCost: number;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  events: ItineraryEvent[];
  specialEvents?: SpecialEvent[];
}

export type EventType = 'flight' | 'hotel_checkin' | 'hotel_checkout' | 'meal' | 'activity' | 'custom';

export interface ItineraryEvent {
  id: string;
  type: EventType;
  time: string;
  title: string;
  location: string;
  description?: string;
  options?: EventOption[];
  selectedOptionId?: string;
  customOption?: string;
  travelTime?: TravelTime;
  isRemovable?: boolean;
}

export interface EventOption {
  id: string;
  name: string;
  description?: string;
  image?: string;
  rating?: number;
  priceRange?: string;
  price: number;
  currency: Currency;
  details?: Record<string, string>;
  affiliateUrl?: string;
  affiliateName?: string;
}

export interface FlightOption extends EventOption {
  airline: string;
  airlineLogo?: string;
  departureTime: string;
  arrivalTime: string;
  flightType: 'direct' | 'with_stops';
  baggage: string;
}

export interface HotelOption extends EventOption {
  stars: number;
  roomType: string;
  pricePerNight: number;
  amenities?: string[];
}

export interface RestaurantOption extends EventOption {
  cuisineType: string;
  pricePerPerson: number;
}

export interface ActivityOption extends EventOption {
  duration: string;
  tourType: string;
}

export interface TravelTime {
  minutes: number;
  mode: 'walking' | 'driving' | 'transit';
}

export interface SpecialEvent {
  id: string;
  type: 'music' | 'art' | 'sports' | 'festival' | 'theater' | 'other';
  name: string;
  date: string;
  time: string;
  location: string;
  price: number;
  currency: Currency;
  ticketUrl?: string;
}
