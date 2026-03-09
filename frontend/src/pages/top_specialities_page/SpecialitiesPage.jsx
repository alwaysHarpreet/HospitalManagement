import React from "react";
import { SpecialitiesCard } from "../../import-export/ImportExport";

// sample data in the component
const specialities = [
  {
    name: "Cardiology",
    icon: "/heart.png",
    desc: "For heart and blood pressure problems",
    symptoms: ["Chest pain", "Heart Failure", "Cholesterol"],
  },
  {
    name: "Dermatology",
    icon: "🌿",
    desc: "Specialists for skin and hair treatments",
    symptoms: ["Rashes", "Pimples", "Acne", "Hairfall", "Dandruff"],
  },
  {
    name: "ENT",
    icon: "👂",
    desc: "ENT specialists for Ear, Nose and Throat",
    symptoms: ["Earache", "Bad breath", "Swollen neck", "Vertigo"],
  },
  {
    name: "General Physician/Internal Medicine",
    icon: "🩺",
    desc: "Managing acute medical conditions",
    symptoms: ["Typhoid", "Abdominal Pain", "Migraine", "Infections"],
  },
  {
    name: "Neurology",
    icon: "🧠",
    desc: "Managing issues of the nervous system, brain",
    symptoms: ["Stroke", "Dementia", "Epilepsy", "Movement issues"],
  },
  {
    name: "Obstetrics & Gynaecology",
    icon: "🤰",
    desc: "For women health issues and surgeries",
    symptoms: ["Irregular periods", "Pregnancy", "PCOD/PCOS"],
  },
  {
    name: "Orthopaedics",
    icon: "🦴",
    desc: "Managing issues of bones, joints, knees",
    symptoms: ["Knee Pain", "Shoulder Pain", "Bone deformity"],
  },
  {
    name: "Paediatrics",
    icon: "👶",
    desc: "Specialists to care and treat children",
    symptoms: ["Constipation", "Puberty", "Nutrition", "Autism"],
  },
];
const SpecialitiesPage = () => {
  return (
    <div className="specialities-page">
      <div className="specialities-page__grid">
        {specialities.map((speciality, index) => (
          <SpecialitiesCard key={index} speciality={speciality} />
        ))}
      </div>
    </div>
  );
};

export default SpecialitiesPage;
