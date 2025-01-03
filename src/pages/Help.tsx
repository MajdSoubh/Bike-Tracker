import React from "react";

const Help: React.FC = () => {
  const faqs = [
    {
      question: "Who can register bikes?",
      answer: "Everyone can register bikes, for free.",
    },
    {
      question: "How do you verify the bikes that people register?",
      answer:
        "Registering your bike at one of our partner shops verifies the registration (shops may choose to only register bikes that they sell). Any question of verification is dealt with by reviewing your registration information. This hasn't been an issue.",
    },
    {
      question: "Can you tell me what bike I have based on its serial number?",
      answer:
        "No. This is a feature we're working on, but we aren't there yet. For now, we recommend searching for your bike's serial number. We will show you any registered bikes that have similar serial numbers. If there are any bikes with similar serial numbers, particularly if just the last few numbers are different — your bike is most likely that make and model.",
    },
    {
      question: "What if I sell my bike?",
      answer:
        "Bike registration is permanent, it's free to transfer bikes. Go to the edit page for the bike and select the \"Transfer Ownership\" page. Enter the new owner's email address and save the changes! You will still be able to edit the bike until the new owner claims it.",
    },
    {
      question: "Can my local bike shop partner with Bike Index?",
      answer:
        "Absolutely! Have them visit the organization signup page, we'll set them up with an organization account so they can register bikes for free.",
    },
    {
      question: "How can I advertise on Bike Index?",
      answer:
        "We're in the process of setting up advertising opportunities throughout the site, particularly for local bike shops. Email gavin@bikeindex.org to find out more!",
    },
    {
      question: "My bike was already stolen. What should I do?",
      answer:
        "Add the bike and details about the theft to the Index now! Bike Index is a comprehensive public database - if your bike was stolen, we think everyone should know about it. First, add your stolen bike to Bike Index! Once you've done that, we'll show you a checklist of what to do to improve your chances of recovery.",
    },
    {
      question: "How does this prevent bike theft?",
      answer:
        "Right now people with good intentions buy stolen bikes because there isn't a single searchable, simple resource to check before buying a bike. Bike Index is that resource. The next time you buy a used bike, check the Index first. We offer bike shops and law enforcement an easy to use interface to look up any suspicious bikes they encounter, and a way to quickly contact the proper owner. We successfully recover stolen bikes every week through this process.",
    },
    {
      question: "How can I stay up to date on what Bike Index is doing?",
      answer:
        "Read our blog! We post most cool things we do there. You can also follow us on Twitter and Facebook.",
    },
    {
      question:
        "Is it possible for bike thieves to search Index to check if a bike is listed as stolen before they sell it?",
      answer:
        "It’s always a possibility, but the advantages of a public database far outweigh this concern. Our mission is to make stolen bikes harder to sell and easier to recover.",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-black mb-8">
        Help & FAQs
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-6 border-b border-gray-200 pb-4 last:border-none"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {faq.question}
            </h2>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
