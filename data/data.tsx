import { Ionicons } from "@expo/vector-icons";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
export const userTypeOptions = [
  { label: "Patient", value: "patient" },                                      // inside the WELCOME PAGE 
  { label: "Professional", value: "professional" },
  { label: "Organization", value: "organization" },
];


export const ProfessionalTypesOptions = [
    { Label: "Doctor", value: "doctor"},                                            //inside the FILTER panel in the Services & Facilities
    { Label: "Nurse", value: "nurse"},                                             // inside the SORT option in the HOME PAGE
    { Label: "Caretaker / Ward Assistant", value: "caretaker / ward assistant"},    // inside the COMPLETE PROFILE -->when user selects userType as professional at WELCOME SCREEN
];

export const OrganizationTypesOptions = [
    { Label: "Hospital", value: "hospital"},
    { Label: "Pharmacy/Medical Shop", value: "pharmacy/medical shop"},
    { Label: "Diagnostic Centre", value: "diagnostic centre"},
    { Label: "Gym Centre", value: "gym centre"},                                // inside the SORT option in the HOME PAGE
    { Label: "Yoga Centre", value: "yoga centre"},                              // inside the FILTER panel in the Services & Facilities
    { Label: "NGO", value: "ngo"},
    { Label: "Wellness & Alternative Medicine Centre / Swadeshi Vaidya", value: "wellness & alternative medicine centre / swadeshi vaidya"},
];

export const GovernmentInsuranceTypeOptions = [                         // inside the FILTER panel when user clicks on organization type as GOVERNMENT and select services & facilities of organization as hospital
    { label: "New India Assurance Company Ltd.", value: "New India Assurance Company Ltd." },       // SEARCH OPTION SHOULD BE INCLUDE IN THE DROPDOWN FOR EASIER NAVIAGATION
    { label: "National Insurance Company Ltd.", value: "National Insurance Company Ltd." },
    { label: "Oriental Insurance Company Ltd.", value: "Oriental Insurance Company Ltd." },
    { label: "United India Insurance Company Ltd.", value: "United India Insurance Company Ltd." },
    { label: "Employees’ State Insurance Corporation (ESIC)", value: "Employees’ State Insurance Corporation (ESIC)" },
    { label: "Central Government Health Scheme (CGHS)", value: "Central Government Health Scheme (CGHS)" },
    { label: "Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PM-JAY)", value: "Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PM-JAY)" },
    { label: "Rashtriya Swasthya Bima Yojana (RSBY)", value: "Rashtriya Swasthya Bima Yojana (RSBY)" },
    { label: "Aam Aadmi Bima Yojana (AABY)", value: "Aam Aadmi Bima Yojana (AABY)" },
    { label: "Mukhyamantri Amrutam Yojana", value: "Mukhyamantri Amrutam Yojana" },
    { label: "Bhamashah Swasthya Bima Yojana", value: "Bhamashah Swasthya Bima Yojana" },
    { label: "Awaz Health Insurance Scheme", value: "Awaz Health Insurance Scheme" },
    { label: "Yeshasvini Health Insurance Scheme", value: "Yeshasvini Health Insurance Scheme" },
    { label: "State Government Health Scheme", value: "State Government Health Scheme" },
    { label: "Chief Minister’s Comprehensive Health Insurance Scheme", value: "Chief Minister’s Comprehensive Health Insurance Scheme" },
    { label: "Dr. YSR Aarogyasri Health Care Trust", value: "Dr. YSR Aarogyasri Health Care Trust" },
    { label: "Arogya Karnataka", value: "Arogya Karnataka" },
    { label: "Mahatma Jyotiba Phule Jan Arogya Yojana", value: "Mahatma Jyotiba Phule Jan Arogya Yojana" },
    { label: "Universal Health Insurance Scheme (UHIS)", value: "Universal Health Insurance Scheme (UHIS)" },
];

export const PrivateInsuranceTypeOptions = [                                // // inside the FILTER panel when user clicks on organization type as PRIVATE and select services & facilities of organization as hospital
    { label: "Aditya Birla Health Insurance Co. Ltd.", value: "Aditya Birla Health Insurance Co. Ltd." },                   // SEARCH OPTION SHOULD BE INCLUDE IN THE DROPDOWN FOR EASIER NAVIAGATION
    { label: "Manipal Cigna Health Insurance Company Ltd.", value: "Manipal Cigna Health Insurance Company Ltd." },
    { label: "Care Health Insurance Ltd.", value: "Care Health Insurance Ltd." },
    { label: "Star Health and Allied Insurance Company Ltd.", value: "Star Health and Allied Insurance Company Ltd." },
    { label: "Narayana Health Insurance Ltd.", value: "Narayana Health Insurance Ltd." },
    { label: "Galaxy Health Insurance Company Ltd.", value: "Galaxy Health Insurance Company Ltd." },
    { label: "Acko General Insurance Ltd.", value: "Acko General Insurance Ltd." },
    { label: "Bajaj Allianz General Insurance Co. Ltd.", value: "Bajaj Allianz General Insurance Co. Ltd." },
    { label: "Cholamandalam MS General Insurance Co. Ltd.", value: "Cholamandalam MS General Insurance Co. Ltd." },
    { label: "Royal Sundaram General Insurance Co. Ltd.", value: "Royal Sundaram General Insurance Co. Ltd." },
    { label: "SBI General Insurance Company Ltd.", value: "SBI General Insurance Company Ltd." },
    { label: "Shriram General Insurance Company Ltd.", value: "Shriram General Insurance Company Ltd." },
    { label: "Tata AIG General Insurance Co. Ltd.", value: "Tata AIG General Insurance Co. Ltd." },
    { label: "Universal Sompo General Insurance Company Ltd.", value: "Universal Sompo General Insurance Company Ltd." },
    { label: "IFFCO Tokio General Insurance Company Ltd.", value: "IFFCO Tokio General Insurance Company Ltd." },
    { label: "Future Generali India Insurance Co. Ltd.", value: "Future Generali India Insurance Co. Ltd." },
    { label: "Go Digit General Insurance Ltd.", value: "Go Digit General Insurance Ltd." },
    { label: "HDFC ERGO General Insurance Co. Ltd.", value: "HDFC ERGO General Insurance Co. Ltd." },
    { label: "ICICI Lombard General Insurance Co. Ltd.", value: "ICICI Lombard General Insurance Co. Ltd." },
    { label: "Bharti AXA General Insurance Co. Ltd.", value: "Bharti AXA General Insurance Co. Ltd." },
    { label: "Navi General Insurance Ltd.", value: "Navi General Insurance Ltd." },
    { label: "Kshema General Insurance Limited", value: "Kshema General Insurance Limited" },
    { label: "Liberty General Insurance Ltd.", value: "Liberty General Insurance Ltd." },
    { label: "Magma HDI General Insurance Co. Ltd.", value: "Magma HDI General Insurance Co. Ltd." },
    { label: "Kotak General Insurance Co. Ltd.", value: "Kotak General Insurance Co. Ltd." },
    { label: "Raheja QBE General Insurance Co. Ltd.", value: "Raheja QBE General Insurance Co. Ltd." },
    { label: "Reliance General Insurance Company Ltd.", value: "Reliance General Insurance Company Ltd." },
    { label: "Zuno General Insurance Ltd.", value: "Zuno General Insurance Ltd." },
];

export const OrganizationTypesOptionsInCreateAccount = [
    { Label: "Hospital", value: "hospital"},
    { Label: "Pharmacy/Medical Shop", value: "pharmacy/medical shop"},
    { Label: "Diagnostic Centre", value: "diagnostic centre"},
    { Label: "Gym Centre", value: "gym centre"},                                // inside the COMPLETE PROFILE -->when user selects userType as organization at WELCOME SCREEN
    { Label: "Yoga Centre", value: "yoga centre"},                              
    { Label: "NGO", value: "ngo"},
    { Label: "Wellness & Alternative Medicine Centre / Swadeshi Vaidya", value: "wellness & alternative medicine centre / swadeshi vaidya"},
    { Label: "Medical College", value: "medical college"},
    { Label: "Insurance Provider", value: "insurance provider"},
];

export const changingData = [
    "Doctor",
    "Hospital",
    "Caretaker",
    "Wellness Center",
    "Gym Center",
    "Yoga Center",
    "Diagnostic Center"
]

export const partnerOrgs = [
    { id: '3',logo: require("../assets/images/metropolis.jpg"), height:80, width:80},
    { id: '5', logo: require("../assets/images/manipal.jpg"), height:180, width:180},
    { id: '2', logo: require("../assets/images/dabur.jpg"), height:60, width:60 },
];

export type HospitalType = 'Government' | 'Private' | 'Charity';

export const hotDeals = [
  {
    id: '7',
    name: 'Hiranandani\nHospital',
    type: 'Private' as HospitalType,
    rating: 4.6,
    opdPrice: 620,
    surgeryPrice: 34000,
    distanceKm: 3.0,
    services: ['ICU', 'Pharmacy', 'Diagnostics'],
    departments: ['Cardiology', 'Neurology'],
    features: ['24×7', 'Insurance'],
    accessibility: ['Wheelchair', 'Lift'],
    image: require("../assets/images/hiranandani.jpg"),
  },
{
    id: '8',
    name: 'KEM Government\nHospital',
    type: 'Government' as HospitalType,
    rating: 4.1,
    opdPrice: 150,
    surgeryPrice: 12000,
    distanceKm: 2.7,
    services: ['ICU', 'Ambulance', 'Blood Bank'],
    departments: ['Orthopedics', 'Pediatrics'],
    features: ['Emergency'],
    accessibility: ['Wheelchair'],
    image: require("../assets/images/KEM.jpg"),
  },
];

export const whyMyAayush = [ 
  { 
    id: '1', 
    title: 'Trusted & Verified', 
    description: 'Hospitals', 
    icon: 'ribbon', 
  }, 
  { 
    id: '2', 
    title: 'Compare Easily', 
    description: 'Doctors & Prices', 
    icon: 'speedometer', 
  }, 
  { 
    id: '3', 
    title: 'Insurance & Schemes', 
    description: 'Assistance', 
    icon: 'heart-circle', 
  }, 
  {
    id: '4',
    title: 'Care navigation',
    description: 'Guided support 24/7',
    icon: 'navigate-circle'
  }
];

export const recentlyViewed = [
  'Tata Memorial Mumbai',
  'Apollo Pune',
  'Cardiology',
  'Orthopedic Surgeon',
  'Neurology',
  'Cancer Care',
];

export interface PopularItem {
  id: string;
  title: string;
  icon: IoniconName;
}

export const popularSearches: PopularItem[] = [
  { id: '1', title: 'Cardiology Hospitals', icon: "heart-circle" },
  { id: '2', title: 'Orthopedic Doctors', icon: "fitness"    },
  { id: '3', title: 'Cancer Care Centres', icon: "ribbon"   },
  { id: '4', title: 'Affordable OPD', icon: "wallet" },
  { id: '5', title: '24/7 Emergency', icon: "medical" },
  { id: '6', title: 'Pediatric Care', icon: "happy"  },
];

export const popularLocations: PopularItem[] = [
  { id: '1', title: 'Mumbai', icon: 'business' },
  { id: '2', title: 'Pune', icon: 'location' },
  { id: '3', title: 'Delhi NCR', icon: 'navigate' },
  { id: '4', title: 'Hyderabad', icon: 'map' },
];


export const hospitals = [
  {
    id: '7',
    name: 'Hiranandani\nHospital',
    type: 'Private' as HospitalType,
    rating: 4.6,
    opdPrice: 620,
    surgeryPrice: 34000,
    distanceKm: 3.0,
    services: ['ICU', 'Pharmacy', 'Diagnostics'],
    departments: ['Cardiology', 'Neurology'],
    features: ['24×7', 'Insurance'],
    accessibility: ['Wheelchair', 'Lift'],
    image: require("../assets/images/hiranandani.jpg"),
  },
  {
    id: '8',
    name: 'KEM Government\nHospital',
    type: 'Government' as HospitalType,
    rating: 4.1,
    opdPrice: 150,
    surgeryPrice: 12000,
    distanceKm: 2.7,
    services: ['ICU', 'Ambulance', 'Blood Bank'],
    departments: ['Orthopedics', 'Pediatrics'],
    features: ['Emergency'],
    accessibility: ['Wheelchair'],
    image: require("../assets/images/KEM.jpg"),
  },
  {
    id: '4',
    name: 'Fortis\nHospital',
    type: 'Private' as HospitalType,
    rating: 4.4,
    opdPrice: 550,
    surgeryPrice: 28000,
    distanceKm: 4.6,
    services: ['ICU', 'Ambulance', 'Pharmacy'],
    departments: ['Orthopedics', 'Cardiology'],
    features: ['24×7', 'Emergency', 'Insurance'],
    accessibility: ['Wheelchair', 'Lift'],
    image: require("../assets/images/Fortis.jpg"),
  },
  {
    id: '2',
    name: 'AIIMS\nDelhi',
    type: 'Government' as HospitalType,
    rating: 4.8,
    opdPrice: 200,
    surgeryPrice: 15000,
    distanceKm: 5.1,
    services: ['ICU', 'Diagnostics', 'Blood Bank'],
    departments: ['Cardiology', 'Neurology', 'Oncology'],
    features: ['24×7', 'Emergency'],
    accessibility: ['Wheelchair', 'Lift'],
    image: require("../assets/images/Aiims.webp"),
  },
  {
    id: '3',
    name: 'Tata\nMemorial',
    type: 'Private' as HospitalType,
    rating: 4.7,
    opdPrice: 600,
    surgeryPrice: 35000,
    distanceKm: 3.8,
    services: ['ICU', 'Diagnostics'],
    departments: ['Oncology', 'Pediatrics'],
    features: ['24×7', 'Insurance'],
    accessibility: ['Wheelchair'],
    image: require("../assets/images/TMH.jpg"),
  },
  {
    id: '1',
    name: 'Apollo\nHospital',
    type: 'Private' as HospitalType,
    rating: 4.5,
    opdPrice: 499,
    surgeryPrice: 25000,
    distanceKm: 2.3,
    services: ['ICU', 'Ambulance', 'Pharmacy', 'Diagnostics'],
    departments: ['Cardiology', 'Orthopedics', 'Oncology'],
    features: ['24×7', 'Insurance'],
    accessibility: ['Wheelchair', 'Lift'],
    image: require("../assets/images/apollo1.jpg"),
  },
  // {
  //   id: '5',
  //   name: 'Charity Hospital',
  //   type: 'Charity' as HospitalType,
  //   rating: 4.2,
  //   opdPrice: 100,
  //   surgeryPrice: 5000,
  //   distanceKm: 1.9,
  //   services: ['ICU', 'Pharmacy'],
  //   departments: ['Pediatrics', 'Orthopedics'],
  //   features: ['24×7'],
  //   accessibility: ['Wheelchair'],
  //   image: 'https://via.placeholder.com/300x200/0D9488/ffffff?text=Charity',
  // },
  // {
  //   id: '6',
  //   name: 'Max Super Specialty',
  //   type: 'Private' as HospitalType,
  //   rating: 4.3,
  //   opdPrice: 750,
  //   surgeryPrice: 36000,
  //   distanceKm: 6.2,
  //   services: ['ICU', 'Ambulance', 'Diagnostics'],
  //   departments: ['Neurology', 'Orthopedics'],
  //   features: ['Emergency', 'Insurance'],
  //   accessibility: ['Wheelchair', 'Lift'],
  //   image: 'https://via.placeholder.com/300x200/14B8A6/ffffff?text=Max',
  // },
  
];

export const popularFatures = [
  {id:1, label:"24x7"},
  {id:2, label:"Emergency"}
]

export const Accessibility = [
  {id:1, label:"Wheelchair"},
  {id:2, label:"Lift"}
]

