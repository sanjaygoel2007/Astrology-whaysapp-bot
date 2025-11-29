// astrology.js
// FREE MAHADASHA CALCULATION WITHOUT PAID API

// Dasha order (Vimshottari)
const DASHAS = [
  "Ketu", "Shukra", "Surya", "Chandra",
  "Mangal", "Rahu", "Guru", "Shani", "Budh"
];

// Dasha duration in years (Vimshottari)
const DASHA_YEARS = {
  Ketu: 7,
  Shukra: 20,
  Surya: 6,
  Chandra: 10,
  Mangal: 7,
  Rahu: 18,
  Guru: 16,
  Shani: 19,
  Budh: 17
};

// ----------------------------------------------------------
// Convert DOB + TOB + Place → Julian Day Number
// ----------------------------------------------------------
function getJulianDay(date) {
  let y = date.getUTCFullYear();
  let m = date.getUTCMonth() + 1;
  let d = date.getUTCDate();

  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);

  return Math.floor(365.25 * (y + 4716)) +
         Math.floor(30.6001 * (m + 1)) +
         d + B - 1524.5;
}

// ----------------------------------------------------------
// Nakshatra + Start Dasha Calculation
// ----------------------------------------------------------
function calculateStartingDasha(jd) {
  const moonLongitude = (jd % 27) * 13.3333; // approx 27 nakshatra cycle
  const nakshatraIndex = Math.floor(moonLongitude / (360 / 27));

  const rulingDashaIndex = nakshatraIndex % 9;
  const rulingDasha = DASHAS[rulingDashaIndex];

  // Percentage completed
  const partCompleted = (moonLongitude % (360/27)) / (360/27);
  const yearsCompleted = DASHA_YEARS[rulingDasha] * partCompleted;
  const yearsRemaining = DASHA_YEARS[rulingDasha] - yearsCompleted;

  return { rulingDasha, yearsRemaining };
}

// ----------------------------------------------------------
// Add years to date
// ----------------------------------------------------------
function addYears(date, years) {
  let newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}

// ----------------------------------------------------------
// MAIN FUNCTION (You will call this in your bot)
// ----------------------------------------------------------
export function getCurrentDasha(dob, tob) {
  const date = new Date(`${dob}T${tob}:00Z`);
  const jd = getJulianDay(date);

  // STEP 1 → Starting Mahadasha at birth
  const start = calculateStartingDasha(jd);
  let dashaIndex = DASHAS.indexOf(start.rulingDasha);

  // STEP 2 → Move forward from birth to TODAY
  let birth = new Date(`${dob}T${tob}:00Z`);
  let today = new Date();

  let currentMD = start.rulingDasha;
  let mdEnd = addYears(birth, start.yearsRemaining);

  while (mdEnd < today) {
    dashaIndex = (dashaIndex + 1) % 9;
    currentMD = DASHAS[dashaIndex];
    birth = mdEnd;
    mdEnd = addYears(mdEnd, DASHA_YEARS[currentMD]);
  }

  // ---------------------------
  // FIND ANTARDASHA
  // ---------------------------
  const mdYears = DASHA_YEARS[currentMD];
  const adLengthPerGraha = {};

  DASHAS.forEach(d => {
    adLengthPerGraha[d] = (mdYears * (DASHA_YEARS[d] / 120));
  });

  let adIndex = 0;
  let adName = DASHAS[adIndex];
  let adEnd = addYears(birth, adLengthPerGraha[adName]);

  while (adEnd < today) {
    adIndex = (adIndex + 1) % 9;
    adName = DASHAS[adIndex];
    birth = adEnd;
    adEnd = addYears(birth, adLengthPerGraha[adName]);
  }

  return {
    mahadasha: currentMD,
    antardasha: adName,
    antardasha_end_date: adEnd.toISOString().substring(0, 10)
  };
}
