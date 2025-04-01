import React from "react";

function ServicesSection() {
  const services = [
    {
      title: "Home Repair",
      description: "Find skilled professionals for all your home repair needs.",
      icon: "🔧",
    },
    {
      title: "Education",
      description: "Connect with tutors and educational programs in your area.",
      icon: "📚",
    },
    {
      title: "Personal Training",
      description:
        "Get fit with personal trainers specializing in various disciplines.",
      icon: "💪",
    },
    {
      title: "Tech Support",
      description:
        "Get help with your tech issues from local IT professionals.",
      icon: "💻",
    },
    {
      title: "Creative Services",
      description:
        "Hire local artists, designers, and creatives for your projects.",
      icon: "🎨",
    },
    {
      title: "Language Learning",
      description:
        "Learn new languages with experienced tutors in your community.",
      icon: "🗣️",
    },
  ];

  return (
    <section className="mb-16 relative">
      <div className="absolute inset-0 bg-purple-500 bg-opacity-10 blur-3xl -z-10"></div>
      <h3 className="text-3xl font-bold mb-8 text-center text-emerald-300">
        Our Services
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-black bg-opacity-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 border border-emerald-800 hover:border-emerald-500"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h4 className="text-xl font-semibold mb-2 text-emerald-300">
              {service.title}
            </h4>
            <p className="text-green-100">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
