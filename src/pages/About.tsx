import React from "react";

const About: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-black uppercase text-center mb-6">
        About Us
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-700 text-lg mb-4">
          Welcome to <span className="font-semibold">Bike Tracker</span> — your
          trusted partner in bike safety and recovery. Our platform is designed
          to empower cyclists with a simple, secure, and comprehensive solution
          to protect their bikes and combat bike theft.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Our Mission
        </h2>
        <p className="text-gray-700 mt-2">
          We aim to create a safer cycling community by making it harder for
          stolen bikes to circulate and easier for rightful owners to recover
          their bikes. By building a public, searchable database, we connect
          bike owners, law enforcement, and bike shops in the fight against
          theft.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Features and Benefits
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
          <li>
            <span className="font-semibold">Free Registration:</span> Securely
            register your bike with detailed information and photos.
          </li>
          <li>
            <span className="font-semibold">Stolen Bike Alerts:</span> Notify
            the community and law enforcement if your bike is stolen.
          </li>
          <li>
            <span className="font-semibold">Public Database:</span> Search for
            stolen bikes or verify a bike’s history before purchase.
          </li>
          <li>
            <span className="font-semibold">Recovery Assistance:</span> Access
            tools and resources to improve your chances of recovering a stolen
            bike.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Why Choose Us?
        </h2>
        <p className="text-gray-700 mt-2">
          At Bike Tracker, we believe in the power of community. Our platform is
          built to serve cyclists of all levels, from casual riders to
          enthusiasts, ensuring peace of mind and a safer cycling experience.
          Join us in making the cycling world a better place for everyone.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Get Involved
        </h2>
        <p className="text-gray-700 mt-2">
          Ready to take the first step? Register your bike today and become a
          part of a growing community dedicated to cycling safety and security.
        </p>
      </div>
    </div>
  );
};

export default About;
