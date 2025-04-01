import mongoose from "mongoose";

// Define the list of Egyptian governorates and their regions
export const GOVERNORATE_REGIONS = {
  // Greater Cairo Region
  Cairo: [
    "Nasr City",
    "Heliopolis",
    "Maadi",
    "Zamalek",
    "New Cairo",
    "Downtown",
    "Garden City",
    "6th of October",
    "Shobra",
    "Ain Shams",
    "Mokattam",
  ],
  Giza: [
    "Dokki",
    "Haram",
    "Mohandessin",
    "Sheikh Zayed",
    "6th of October City",
    "Faisal",
    "Imbaba",
  ],
  Qalyubia: [
    "Banha",
    "Shubra El Kheima",
    "Qalyub",
    "Tukh",
    "El Khanka",
    "Shebin El Qanater",
  ],

  // Nile Delta (Lower Egypt)
  Alexandria: [
    "Al-Montaza",
    "El Raml",
    "Amreya",
    "Borg El Arab",
    "Agami",
    "Sidi Bishr",
    "Cleopatra",
    "Stanley",
  ],
  Beheira: [
    "Damanhour",
    "Kafr El Dawwar",
    "Rashid (Rosetta)",
    "Edku",
    "El Mahmudiyah",
  ],
  Dakahlia: [
    "Mansoura",
    "Talkha",
    "Mit Ghamr",
    "El Senbellawein",
    "Dikirnis",
    "Belqas",
  ],
  Damietta: [
    "Damietta City",
    "New Damietta",
    "Faraskur",
    "Ezbet El Borg",
    "Kafr Saad",
  ],
  Gharbia: [
    "Tanta",
    "El Mahalla El Kubra",
    "Kafr El Zayat",
    "Zefta",
    "Samanoud",
    "Basyoun",
  ],
  Kafr_ElSheikh: [
    "Kafr El Sheikh City",
    "Desouk",
    "Baltim",
    "Sidi Salem",
    "Biyala",
  ],
  Monufia: ["Shebin El Kom", "Menouf", "Ashmoun", "Quesna", "Sers El Lyan"],
  Sharqia: [
    "Zagazig",
    "10th of Ramadan",
    "Belbeis",
    "Minya El Qamh",
    "Abu Hammad",
    "Fakous",
  ],
  Ismailia: ["Ismailia City", "Abu Suwir", "Fayed", "El Qantara"],
  Port_Said: ["Port Said City", "El Manzala", "Port Fuad"],
  Suez: ["Suez City", "Ataka", "Ain Sokhna", "Al Ganayen"],

  // Upper Egypt
  Aswan: [
    "Aswan City",
    "Edfu",
    "Kom Ombo",
    "Nasr El Nuba",
    "Daraw",
    "Abu Simbel",
  ],
  Asyut: [
    "Asyut City",
    "Abnoub",
    "Dairut",
    "Manfalut",
    "El Badari",
    "Sahel Selim",
    "El Qusiya",
  ],
  Beni_Suef: [
    "Beni Suef City",
    "Al Wasta",
    "Nasser",
    "Al Fashn",
    "Somosta",
    "Ihnasya",
  ],
  Fayoum: ["Fayoum City", "Tamiya", "Senuris", "Ibsheway", "Etsa"],
  Giza: [
    "Giza City",
    "6th of October City",
    "Sheikh Zayed",
    "Faisal",
    "Al Ayyat",
    "Al Saf",
  ],
  Luxor: ["Luxor City", "Esna", "Armant", "El Toud"],
  Minya: ["Minya City", "Mallawi", "Beni Mazar", "Samalut", "Deir Mawas"],
  Sohag: ["Sohag City", "Akhmim", "Girga", "Tahta", "Juhayna", "El Balyana"],
  Qena: ["Qena City", "Nag Hammadi", "Qus", "Abu Tesht", "Farshut"],

  // Canal and Red Sea Region
  Red_Sea: ["Hurghada", "Safaga", "Marsa Alam", "Quseer", "Ras Ghareb"],
  South_Sinai: ["Sharm El Sheikh", "Dahab", "Nuweiba", "Taba", "St. Catherine"],
  North_Sinai: ["Arish", "Sheikh Zuweid", "Rafah", "Bir al-Abed", "Nakhl"],

  // Western Desert
  Matruh: ["Marsa Matruh", "El Alamein", "Salloum", "Siwa"],
  New_Valley: ["Kharga", "Dakhla", "Farafra", "Baris"],
};

// Extract governorates for the enum list
const EGYPTIAN_GOVERNORATES = Object.keys(GOVERNORATE_REGIONS);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Customer", "Craftsman", "Admin"],
      required: true,
    },
    governorate: {
      type: String,
      enum: EGYPTIAN_GOVERNORATES,
      required: true,
    },
    region: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const governorateRegions = GOVERNORATE_REGIONS[this.governorate];
          return governorateRegions && governorateRegions.includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid region for the selected governorate!`,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    address: {
      location: {
        type: { type: String, default: "Point" },
        coordinates: [Number], // [longitude, latitude]
      },
      formatted: { type: String },
    },
    skills: [String], // Optional for Craftsmen
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes for improved query performance
userSchema.index({ role: 1, governorate: 1, region: 1 });
userSchema.index({ email: 1 });

export const User = mongoose.model("User", userSchema);