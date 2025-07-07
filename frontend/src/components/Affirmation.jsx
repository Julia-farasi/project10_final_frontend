// import { useEffect, useState } from "react";

// export const AffirmationOfTheDay = () => {
//   const fetchAffirmation = async () => {
//     try {
//       const response = await fetch(
//         "https://api.apirobots.pro/v1/affirmations/categories/success/random",
//         {
//           headers: {
//             "x-api-key": "4505a71a6emshddcb535de67b373p184dbfjsn64ed93458afb", // Ersetze mit deinem echten API-Key
//           },
//         }
//       );
//       const data = await response.json();
//       return data.text;
//     } catch (error) {
//       console.error("Fehler beim Laden der Affirmation:", error);
//       return "Heute ist ein guter Tag für deinen Erfolg!";
//     }
//   };

//   useEffect(() => {
//     const today = new Date().toISOString().split("T")[0];
//     const saved = JSON.parse(localStorage.getItem("affirmationOfTheDay"));

//     if (saved && saved.date === today) {
//       setAffirmation(saved.text);
//     } else {
//       fetchAffirmation().then((text) => {
//         setAffirmation(text);
//         localStorage.setItem(
//           "affirmationOfTheDay",
//           JSON.stringify({ date: today, text })
//         );
//       });
//     }
//   }, []);

//   return (
//     // <div className="bg-yellow-100 text-yellow-900 p-6 rounded-lg shadow-md text-center text-lg italic">
//     //   🌟 {affirmation || "Lade Affirmation..."}
//     // </div>
//   );
// };

// export default AffirmationOfTheDay;
