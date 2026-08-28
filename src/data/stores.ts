export type Store = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  mapsUrl: string;
};

// Round 13 — real, confirmed Ishué store locations (Google Maps pins
// supplied by the business owner's family). No street addresses were
// collected yet, only coordinates + the Google Maps link for each store;
// exact addresses will be a follow-up once available. Two entries from the
// source list are deliberately excluded: a "Torino (general)" result that's
// very likely a duplicate of Sabotino/Area12 rather than a distinct store,
// and Vignate, which has no location data at all yet.
export const STORES: Store[] = [
  {
    id: "alba",
    name: "Alba",
    lat: 44.6934368,
    lng: 7.9425449,
    mapsUrl:
      "https://www.google.com/maps/place/Ishu%C3%A9/@44.7018707,7.902865,18635m/data=!3m2!1e3!5s0x12d2ad7181e656e9:0x1392eb24e8984d56!4m6!3m5!1s0x12d2ad7321265a5d:0x2f97de8fb7ff6bdd!8m2!3d44.6934368!4d7.9425449!16s%2Fg%2F11fnwh1m5c",
  },
  {
    id: "area12-torino",
    name: "Area12 (Torino)",
    lat: 45.1085181,
    lng: 7.6445449,
    mapsUrl:
      "https://www.google.com/maps/place/ISHU%C3%88/@45.1084575,7.6437071,308m/data=!3m1!1e3!4m6!3m5!1s0x47886c22c492cf4b:0x9669d594740b4e35!8m2!3d45.1085181!4d7.6445449!16s%2Fg%2F11g6mxwym9",
  },
  {
    id: "asti",
    name: "Asti",
    lat: 44.9066656,
    lng: 8.2323496,
    mapsUrl:
      "https://www.google.com/maps/place/Ishu%C3%A9/@44.9065384,8.2259958,1763m/data=!3m1!1e3!4m6!3m5!1s0x478793007feb89b7:0x913cbc14b9aeb2da!8m2!3d44.9066656!4d8.2323496!16s%2Fg%2F11yknl4wc2",
  },
  {
    id: "borgo-san-dalmazzo",
    name: "Borgo San Dalmazzo",
    lat: 44.3476097,
    lng: 7.5091724,
    mapsUrl:
      "https://www.google.it/maps/place/Ishu%C3%A9/@44.3594203,7.496891,13.32z/data=!4m12!1m5!3m4!2zNDTCsDE5JzUxLjIiTiA3wrAyOSc1MS4wIkU!8m2!3d44.3309!4d7.4975!3m5!1s0x12cd6c312554cb2d:0x700c3b94a625ef2a!8m2!3d44.3476097!4d7.5091724!16s%2Fg%2F11c2k2xdfx",
  },
  {
    id: "genola",
    name: "Genola",
    lat: 44.5997619,
    lng: 7.6592168,
    mapsUrl:
      "https://www.google.com/maps/place/Ishu%C3%A9/@44.596799,7.483575,43087m/data=!3m1!1e3!4m6!3m5!1s0x12cd50869636ffb9:0xf15b452624bc8ef8!8m2!3d44.5997619!4d7.6592168!16s%2Fg%2F11dybkj10l",
  },
  {
    id: "genova",
    name: "Genova",
    lat: 44.4467076,
    lng: 8.8938998,
    mapsUrl:
      "https://www.google.com/maps/place/ishu%C3%A9/@44.4282936,8.9052768,22225m/data=!3m1!1e3!4m6!3m5!1s0x12d346c28b4c93f9:0xb1fadca5f8fd5b29!8m2!3d44.4467076!4d8.8938998!16s%2Fg%2F11wxyjqftc",
  },
  {
    id: "mondo-juve-torino",
    name: "Mondo Juve (Torino)",
    lat: 44.9815494,
    lng: 7.6207045,
    mapsUrl:
      "https://www.google.com/maps/place/iSHUE'/@44.9815532,7.6181296,705m/data=!3m2!1e3!4b1!4m6!3m5!1s0x478813b6634ba2c5:0xcd31028c00969af6!8m2!3d44.9815494!4d7.6207045!16s%2Fg%2F11j1l3yhjj",
  },
  {
    id: "sabotino-torino",
    name: "Sabotino (Torino)",
    lat: 45.0653656,
    lng: 7.6488394,
    mapsUrl:
      "https://www.google.com/maps/place/Ishu%C3%A9/@45.0653694,7.6462645,704m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47886ce11180ea53:0xac8571d5c8a806ee!8m2!3d45.0653656!4d7.6488394!16s%2Fg%2F11csps65qh",
  },
  {
    id: "serravalle",
    name: "Serravalle",
    lat: 44.7340401,
    lng: 8.831018,
    mapsUrl:
      "https://www.google.com/maps/place/Ishu%C3%A9+Fashion+Identity/@44.7340439,8.8284431,1415m/data=!3m2!1e3!4b1!4m6!3m5!1s0x478767335cd93bb9:0x89f2309ef7c7b8da!8m2!3d44.7340401!4d8.831018!16s%2Fg%2F11f_4ghxg0",
  },
  {
    id: "tradate",
    name: "Tradate",
    lat: 45.6979597,
    lng: 8.9109267,
    mapsUrl:
      "https://www.google.com/maps/place/Ishu%C3%A8/@45.6979633,8.9060558,696m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47868f8ff456673b:0x7ce98f97f79189c3!8m2!3d45.6979597!4d8.9109267!16s%2Fg%2F11tmhzg06h",
  },
];
