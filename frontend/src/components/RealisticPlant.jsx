import stage1 from "../assets/plant-stage-1.png";
import stage2 from "../assets/plant-stage-2.png";
import stage3 from "../assets/plant-stage-3.png";
import stage4 from "../assets/plant-stage-4.png";

const RealisticPlant = ({ progress }) => {
  const getImage = () => {
    if (progress < 25) return stage1;
    if (progress < 50) return stage2;
    if (progress < 75) return stage3;
    return stage4;
  };

  const scale = 0.8 + (progress / 100) * 0.4;

  <img
    src={getImage()}
    alt="Pflanzenstadium"
    style={{
      transform: `scale(${scale})`,
      transition: "transform 0.8s ease-in-out",
      transformOrigin: "bottom center",
    }}
  />;

  return (
    <div className="flex justify-center mt-4 shadow-lg shadow-green-200">
      <img
        src={getImage()}
        alt="Pflanzenstadium"
        className="max-h-[200px] transition-transform duration-700"
      />
    </div>
  );
};

export default RealisticPlant;
