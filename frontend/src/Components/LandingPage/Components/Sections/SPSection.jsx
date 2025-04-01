import React from "react";
import { Link } from "react-router-dom";

function SPSection() {
  const recommendedCategories = [
    { name: "Plumber", icon: "🔧" },
    { name: "Electrician", icon: "⚡" },
    { name: "Tutor", icon: "📚" },
    { name: "Personal Trainer", icon: "💪" },
    { name: "Web Developer", icon: "💻" },
    { name: "Graphic Designer", icon: "🎨" },
    { name: "Language Teacher", icon: "🗣️" },
    { name: "Handyman", icon: "🔨" },
    { name: "Painter", icon: "🖌️" },
    { name: "Gardener", icon: "🌱" },
    { name: "Cleaner", icon: "🧹" },
    { name: "Photographer", icon: "📷" },
  ];
  return (
    <section className="mb-16 relative">
      <div className="absolute inset-0 bg-red-500 bg-opacity-10 blur-3xl -z-10"></div>
      <h3 className="text-3xl font-bold mb-8 text-center text-emerald-300">
        Recommended Service Providers
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {recommendedCategories.map((category, index) => (
              <Link
                key={index}
                to={`/Listing/${category.name.toLowerCase().replace(' ', '-')}`}
                className="bg-black bg-opacity-50 rounded-lg p-4 text-center hover:bg-opacity-70 transition duration-300 border border-emerald-800 group hover:scale-105 transform"
              >
            <div className="text-3xl mb-2 group-hover:scale-110 transition duration-300">
              {category.icon}
            </div>
            <span className="text-lg font-semibold text-emerald-300 group-hover:text-emerald-200">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SPSection;
