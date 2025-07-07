// const plantEmojis = ["🌱", "🌿", "🌷", "🌻", "🌼", "🍀", "🌸"];

// const MoodGardenProgress = ({ progress }) => {
//   const numPlants = Math.floor(progress / 10); // eine Pflanze pro 10 %
//   const plants = Array.from(
//     { length: numPlants },
//     (_, i) => plantEmojis[i % plantEmojis.length]
//   );

//   return (
//     <div className="relative bg-gradient-to-t from-green-100 to-green-50 border border-green-300 rounded-lg p-4 overflow-hidden">
//       <div
//         className="absolute bottom-0 left-0 right-0 h-2 bg-green-400 rounded-full"
//         style={{ width: `${progress}%` }}
//       />
//       <div className="flex justify-start items-end space-x-2 mt-4 flex-wrap">
//         {plants.map((plant, index) => (
//           <span
//             key={index}
//             className="text-3xl hover:animate-wiggle cursor-pointer transition-transform duration-300"
//             style={{ animationDelay: `${index * 100}ms` }}
//           >
//             {plant}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MoodGardenProgress;
import React from "react";

const plantEmojis = ["🌱", "🌿", "🌷", "🌻", "🌼", "🍀", "🌸"];

const MoodGardenProgress = ({ progress, target_amount, saved_amount }) => {
  const numPlants = Math.floor(progress / 10);
  const plants = Array.from(
    { length: numPlants },
    (_, i) => plantEmojis[i % plantEmojis.length]
  );
  const remaining = Math.max(0, target_amount - saved_amount);

  // Dynamische Farbe je nach Fortschritt
  const getProgressColor = () => {
    if (progress < 33) return "bg-red-400";
    if (progress < 66) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="relative bg-green-50 border border-green-200 rounded-lg p-4">
      {/* Fortschrittsbalken */}
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Prozentanzeige */}
      <div className="text-sm text-gray-700 mb-2">
        {progress.toFixed(1)} % erreicht · Noch {remaining.toFixed(2)} € bis zum
        Ziel
      </div>

      {/* Pflanzenanzeige */}
      <div className="flex flex-wrap gap-2 mt-2">
        {plants.map((plant, index) => (
          <span
            key={index}
            className="text-3xl hover:animate-wiggle cursor-pointer transition-transform duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {plant}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MoodGardenProgress;
