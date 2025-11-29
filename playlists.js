// playlists.js
// COMPLETE 81 MAHADASHA–ANTARDASHA PLAYLISTS + 6 PROBLEM PLAYLISTS

export const PROBLEM_PLAYLISTS = {
  job: "https://youtube.com/playlist?list=PLzV-R7eJU4ik35yPdfzcqK2Lz5qOOq-3K",
  business: "https://youtube.com/playlist?list=PLzV-R7eJU4ikf4FbDxhx5kY5LdmqiUrQ9",
  marriage: "https://youtube.com/playlist?list=PLzV-R7eJU4imht-w6XJ3GlymxoyaWEkd7",
  health: "https://youtube.com/playlist?list=PLzV-R7eJU4inMKCwwXEPPkFlFOukEweCA",
  education: "https://youtube.com/playlist?list=PLzV-R7eJU4ilVQkws-16ReMCjxvcHZOvP",
  other: "https://youtube.com/playlist?list=PLzV-R7eJU4im6ihHb2uq0QVPcwjJQEF_h",
};

// --------------------------------------------------
// 81 MAHADASHA – ANTARDASHA PLAYLISTS
// Each graha contains 9 antardasha links
// --------------------------------------------------

export const MAHADASHA_PLAYLISTS = {

  // ============================
  //        SURYA MAHADASHA
  // ============================
  Surya: {
    Surya:   "https://youtube.com/playlist?list=PLzV-R7eJU4ikm9URU-eKAPvfIAxNovuYO",
    Chandra: "https://youtube.com/playlist?list=PLzV-R7eJU4inrnjsWJE4qPWhlN-CVF1HP",
    Mangal:  "https://youtube.com/playlist?list=PLzV-R7eJU4in9U1qdffV69tTRO3lL7eRz",
    Budh:    "https://youtube.com/playlist?list=PLzV-R7eJU4inmgi-7S1i6PadFgiLinFF7",
    Guru:    " https://www.youtube.com/playlist?list=PLzV-R7eJU4imkfZekbrcUYxM9dcaxTXVV ,
    Shukra:  "https://youtube.com/playlist?list=PLzV-R7eJU4inAUzwycOxY5GgYBcVQA7yE",
    Shani:   "https://www.youtube.com/playlist?list=PLzV-R7eJU4injj5itR5JGH9z4zhcufbJX",
    Rahu:    "सूर्य / राहु: https://www.youtube.com/playlist?list=PLzV-R7eJU4ikdJC1VUCnojAcWzqDKnvzV",
    Ketu:    "https://youtube.com/playlist?list=PLzV-R7eJU4im3cvZTuzVxkd-P7q1o-zEg",
  },

  // ============================
  //        CHANDRA MAHADASHA
  // ============================
  Chandra: {
    Surya:   "https://youtube.com/playlist?list=PLzV-R7eJU4ikEcVQ3cNGcGZSoVEwF2DPR",
    Chandra: "https://youtube.com/playlist?list=PLzV-R7eJU4ikG55NiABqQ2TjcParBCzDd",
    Mangal:  "https://youtube.com/playlist?list=PLzV-R7eJU4ilgHfKTh4pXejvonzSHiLfJ",
    Budh:    "https://youtube.com/playlist?list=PLzV-R7eJU4ik33cPRdPLT5QUzMXra_h_0",
    Guru:    "https://youtube.com/playlist?list=PLzV-R7eJU4inVU96WyHE6VFUsmEEsF3qL",
    Shukra:  "https://youtube.com/playlist?list=PLzV-R7eJU4iniQmBZ7QMAD6wrAnpRee5m",
    Shani:   "https://youtube.com/playlist?list=PLzV-R7eJU4il_2NF2slGPEQxjsL0qBsB1",
    Rahu:    "https://youtube.com/playlist?list=PLzV-R7eJU4in-U2pRJbWCef1Qd4upjD6h",
    Ketu:    "https://youtube.com/playlist?list=PLzV-R7eJU4iksXILXw-g4m0AyWWc4Z6m2",
  },

  // ============================
  //        MANGAL MAHADASHA
  // ============================
  Mangal: {
    Surya:   "https://youtube.com/playlist?list=PLzV-R7eJU4ikxP2okNjVhE1M15e74wVcP",
    Chandra: "https://youtube.com/playlist?list=PLzV-R7eJU4ilIPoqAFkMEG3T54v1ZXzez",
    Mangal:  "https://www.youtube.com/playlist?list=PLzV-R7eJU4ikMg3GYLNrZfTA8XWPglMeL",
    Budh:    "https://youtube.com/playlist?list=PLzV-R7eJU4ikSNDhDmOrMtixsdiZabhf5",
    Guru:    "https://youtube.com/playlist?list=PLzV-R7eJU4inqhIz2aXGVN3wKkmZxNE3T",
    Shukra:  "https://youtube.com/playlist?list=PLzV-R7eJU4il5zis7jpRYNtSQMvv3GP6N",
    Shani:   "https://youtube.com/playlist?list=PLzV-R7eJU4imjQJRm5-Hb7u4NhTYzCbIA",
    Rahu:    "https://youtube.com/playlist?list=PLzV-R7eJU4imJ7Ez37wtifmabizt3U0zr",
    Ketu:    "https://youtube.com/playlist?list=PLzV-R7eJU4intJ2979-5t9cznBLnz_cr0",
  },

  // ============================
  //        BUDH MAHADASHA
  // ============================
  Budh: {
    Surya:   "https://www.youtube.com/playlist?list=PLzV-R7eJU4ili1YwAPkVb_LS-2SiTC8Wg",
    Chandra: "https://www.youtube.com/playlist?list=PLzV-R7eJU4ikV4ky1GcRdDg6khajODPyo",
    Mangal:  "https://www.youtube.com/playlist?list=PLzV-R7eJU4ilqW2o3ZDn3HEixCpjO6joO",
    Budh:    "https://youtube.com/playlist?list=PLzV-R7eJU4im2AdorPbSGoeipiBglj-_L",
    Guru:    "https://youtube.com/playlist?list=PLzV-R7eJU4ikSUzGNlJaTwWQpAx6cMOrQ",
    Shukra:  "https://youtube.com/playlist?list=PLzV-R7eJU4in-HudpTnbaUDTEdKISl3g2",
    Shani:   "https://youtube.com/playlist?list=PLzV-R7eJU4ik3stS8NToiVUzkQCSj0S1i",
    Rahu:    "https://youtube.com/playlist?list=PLzV-R7eJU4imj9zKLOuMC6DcwW1Jhdpj7",
    Ketu:    "https://youtube.com/playlist?list=PLzV-R7eJU4ik05Eeue0z7PydycjyALzik",
  },

  // ============================
  //         GURU MAHADASHA
  // ============================
  Guru: {
    Surya:   "https://youtube.com/playlist?list=PLzV-R7eJU4ilguFcV6-9Q85RVQ2u2-Ale",
    Chandra: "https://youtube.com/playlist?list=PLzV-R7eJU4im9sO9yC2MoqJzlTWeRcuIT",
    Mangal:  "https://www.youtube.com/playlist?list=PLzV-R7eJU4ilxgMypt4zeLG2uS_74jnkG",
    Budh:    "https://youtube.com/playlist?list=PLzV-R7eJU4im-LPuXPilc2OPDNy6egeyY",
    Guru:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4inNYldZ50oApbaQWVsTX5Mz",
    Shukra:  "https://youtube.com/playlist?list=PLzV-R7eJU4ilRYzcJe1o30BI6xgbivUjW",
    Shani:   "https://youtube.com/playlist?list=PLzV-R7eJU4illRgTc1kzQwuSKmXsvSeSF",
    Rahu:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4ilL5Cvi3yVC04A7AQinUGwp",
    Ketu:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4inLXlWlV5FkCw0G6MpCjLX5",
  },

  // ============================
  //        SHUKRA MAHADASHA
  // ============================
  Shukra: {
    Surya:   "https://www.youtube.com/playlist?list=PLzV-R7eJU4ikwt_iCBm64l2vr5yBs8WHV",
    Chandra: "https://www.youtube.com/playlist?list=PLzV-R7eJU4imAp7diijEddikqPGI0cDVK",
    Mangal:  "https://youtube.com/playlist?list=PLzV-R7eJU4ineQX_GOlsEQ4FTTyMaetR9",
    Budh:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4ikZoncLNAqfTCU0zy7NaGj5",
    Guru:    "https://youtube.com/playlist?list=PLzV-R7eJU4ile7zdrc6_dvIjz_M3BbTTe",
    Shukra:  "https://youtube.com/playlist?list=PLzV-R7eJU4ilLBU75DsbG4Y63pmEtRVwq",
    Shani:   "https://youtube.com/playlist?list=PLzV-R7eJU4ilGVDueyWTjaptmkR8Gtjps",
    Rahu:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4ikArboihiO4o1GsF0Rf3XBB",
    Ketu:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4in9ketxRONf6Q6Uz5fkUkcl",
  },

  // ============================
  //        SHANI MAHADASHA
  // ============================
  Shani: {
    Surya:   "https://www.youtube.com/playlist?list=PLzV-R7eJU4ik_ORhfVq_oCKDCzdgwCDI_",
    Chandra: "https://www.youtube.com/playlist?list=PLzV-R7eJU4ilV-EW69zOQvi-ZAAuiTnqB",
    Mangal:  "https://www.youtube.com/playlist?list=PLzV-R7eJU4ikPR9nkQZyIdJ3UIClxx9AK",
    Budh:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4ilyEGnMadPdf58in5ltzRrk",
    Guru:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4imKv92GbV171ftgku9_bEAT",
    Shukra:  "https://www.youtube.com/playlist?list=PLzV-R7eJU4imTXrYs6_V90LMf1lQjMoZL",
    Shani:   "https://youtube.com/playlist?list=PLzV-R7eJU4ilKe539dw6vwjvVMOS9fNLt",
    Rahu:    "https://youtube.com/playlist?list=PLzV-R7eJU4inRy0906kFdpTnY1KuBt84K",
    Ketu:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4ilagnNnNxLy7mhOmaRq55Nm",
  },

  // ============================
  //        RAHU MAHADASHA
  // ============================
  Rahu: {
    Surya:   "https://youtube.com/playlist?list=PLzV-R7eJU4inhYk4MvRk8rYLXD5fO__jR",
    Chandra: "https://www.youtube.com/playlist?list=PLzV-R7eJU4in8UhZz4NPBdxR4SrL9jPNc",
    Mangal:  "https://www.youtube.com/playlist?list=PLzV-R7eJU4ikzATXvJNlzJtZhUBVh8unZ",
    Budh:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4iknrbsRqC4MxPzUCsle6xOb",
    Guru:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4ilKfefpwJPJyp47Xf97C9TC",
    Shukra:  "https://www.youtube.com/playlist?list=PLzV-R7eJU4imL6nzWDRFK1LiIb9IYJJq-",
    Shani:   "https://youtube.com/playlist?list=PLzV-R7eJU4imDgfLesfOH7lBW_8OjgHI0",
    Rahu:    "https://youtube.com/playlist?list=PLzV-R7eJU4indlwaubChHvUM2nRPaQGTr",
    Ketu:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4ilKQL802hkTzFJ3SkBfJR3M",
  },

  // ============================
  //        KETU MAHADASHA
  // ============================
  Ketu: {
    Surya:   "https://www.youtube.com/playlist?list=PLzV-R7eJU4ilRe59V5ctJxisbnGFmfikG",
    Chandra: "https://www.youtube.com/playlist?list=PLzV-R7eJU4iklcaek1dUYMm9tVAfAETsn",
    Mangal:  "https://www.youtube.com/playlist?list=PLzV-R7eJU4ikeP-dcDtgN53YzXLAWtLa5,
    Budh:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4imLXJrTOh60q_X29xse6mDS",
    Guru:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4imoURjP_h7MCi4kkwn_Qn-x",
    Shukra:  "https://www.youtube.com/playlist?list=PLzV-R7eJU4imuqnVNasQyXMc_rrFhMerM",
    Shani:   "https://www.youtube.com/playlist?list=PLzV-R7eJU4imEgO_34VANuiG8nksoNcmK",
    Rahu:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4ilDfODifwye5-9tGq0uzg-t",
    Ketu:    "https://www.youtube.com/playlist?list=PLzV-R7eJU4im08cyIK-W-zhr6mEcYkuyw",
  },

};
