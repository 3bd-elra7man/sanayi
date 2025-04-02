import axios from "axios";
import React from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export let GovernomentContext = createContext(0);

export default function GovernomentContextProvider(props) {
  const GOVERNORATE_REGIONS = {
    Cairo: [
      "Nasr City", "Heliopolis", "Maadi", "Zamalek", 
      "New Cairo", "Downtown", "Garden City", 
      "6th of October", "Shobra", "Ain Shams", "Mokattam"
    ],
    Giza: [
      "Dokki", "Haram", "Mohandessin", 
      "Sheikh Zayed", "6th of October City", 
      "Faisal", "Imbaba"
    ],
    Alexandria: [
      "Al-Montaza", "El Raml", "Amreya", 
      "Borg El Arab", "Agami", "Sidi Bishr", 
      "Cleopatra", "Stanley"
    ],
    Qalyubia: [
      "Banha",
      "Shubra El Kheima",
      "Qalyub",
      "Tukh",
      "El Khanka",
      "Shebin El Qanater",
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
    New_Valley: ["Kharga", "Dakhla", "Farafra", "Baris"]  
    // Add the rest of the governorate-region data...
  };
  const [governorate, setGovernorate] = useState("");
  const [region, setRegion] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
  localStorage.getItem('isAuthenticated') === 'true');
  const [errormsg, setErrormsg] = useState("");
  const [userData, setUserData] = useState(localStorage.getItem('userData') || "");
  const [profileData, setProfileData] = useState(localStorage.getItem('ProfileData') || "");
  const navigate = useNavigate();
  const notify = (msg) => toast.success(msg);
  const [loading, setLoading] = useState(null);

  const [user, setUser] =useState({
    email: "",
    password: "",
  })
  async function logIn(e){
    setLoading(true)
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,
      user,
      {withCredentials: true}
    )
    .then((res)=>{     
      console.log(res);
      const dataUser = res.data.user;
      setUserData(dataUser);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(dataUser)); // Store as JSON string
      setLoading(false);
      notify(res.data.message);
      navigate("/");
    }).catch((err)=>{
      setErrormsg(err.response.data.message);
      setLoading(false);
      setIsAuthenticated(false);
    });
    }
    async function checkAuth(e){
      axios.defaults.withCredentials = true
      e.preventDefault();
      axios.get(`${process.env.REACT_APP_API_URL}/api/auth/check-auth`,
      {},
      { withCredentials: true }
    )
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
}  
    async function getProfile(){
     setLoading(true);
     axios.defaults.withCredentials = true;
     axios.get(`${process.env.REACT_APP_API_URL}/api/profile`,
      {},
      { withCredentials: true }
    )
    .then((res)=>{
        console.log(res);
        const dataProfile = res.data.user;
        setProfileData(dataProfile);
        localStorage.setItem('ProfileData', JSON.stringify(dataProfile));
        setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    })
}
    async function logOut(){
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userData');
      navigate("/login");
      console.log("logged out"); 
    } 
return (
  <GovernomentContext.Provider value={
    {region,
    setRegion,
    governorate,
    setGovernorate,
    GOVERNORATE_REGIONS,
    isAuthenticated,
    setIsAuthenticated,
    errormsg,
    setErrormsg, 
    user,
    setUser,
    loading,
    logIn,
    userData,
    logOut,
    notify,
    getProfile,
    }}>
    {props.children}
  </GovernomentContext.Provider>
);
}
