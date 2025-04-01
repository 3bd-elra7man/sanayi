import React from "react";

function WorksSection() {
  const howItWorks = [
    {
      title: "Create an Account",
      description: "Sign up and complete your profile to get started.",
      icon: "👤",
    },
    {
      title: "Verify Your Identity",
      description: "Complete our verification process for added security.",
      icon: "🔐",
    },
    {
      title: "Browse Services",
      description:
        "Explore a wide range of services offered in your community.",
      icon: "🔍",
    },
    {
      title: "Post a Job",
      description:
        "Describe your needs and receive offers from service providers.",
      icon: "📝",
    },
    {
      title: "Compare Offers",
      description: "Review and compare offers from multiple providers.",
      icon: "⚖️",
    },
    {
      title: "Connect with Providers",
      description: "Chat with providers to discuss details and expectations.",
      icon: "🤝",
    },
    {
      title: "Book and Pay",
      description:
        "Schedule appointments and make secure payments through our platform.",
      icon: "💳",
    },
    {
      title: "Receive Service",
      description: "Get the service you need from skilled professionals.",
      icon: "🛠️",
    },
    {
      title: "Leave Feedback",
      description:
        "Rate and review your experience to help others in the community.",
      icon: "⭐",
    },
  ];
  return (
    <section className="mb-16 relative">
      <div className="absolute inset-0 bg-yellow-500 bg-opacity-10 blur-3xl -z-10"></div>
      <h3 className="text-3xl font-bold mb-8 text-center text-emerald-300">
        How It Works
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {howItWorks.map((step, index) => (
          <div
            key={index}
            className="bg-black bg-opacity-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 border border-emerald-800 flex flex-col items-center text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="text-4xl mb-4">{step.icon}</div>
            <h4 className="text-xl font-semibold mb-2 text-emerald-300">
              {step.title}
            </h4>
            <p className="text-green-100">{step.description}</p>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-tl-full transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorksSection;
