"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "When are the visiting hours?",
    answer:
      "We always welcome visitors. There are no set visiting hours. Please, however, be considerate of other patients during night hours.",
  },
  {
    question: "Is there a limit to the number of people that can visit at one time?",
    answer:
      "We suggest using the common areas of the facility to meet with your loved one. If it is not possible to visit in one of the common areas, we suggest a limit of two to three people in a resident room at one time.",
  },
  {
    question: "Is there any private space available to use?",
    answer:
      "You may reserve the use of the dining room for any special event (birthday, holidays, meals) in advance with the Activities Department.",
  },
  {
    question: "Can I bring my children to visit?",
    answer:
      "We encourage children to visit, however, we ask you to alert the charge nurse to anyone visiting the facility under the age of 12.",
  },
  {
    question: "Can I bring a family pet to the facility?",
    answer:
      "We would love for your family pet to come visit. Please remember to clean up after them and take the proper safety measures at all times. All pets should also be kept on a leash. Pet shot records are required and kept on file.",
  },
  {
    question: "How often will a physician or health professional visit?",
    answer:
      "Physicians generally see patients within 24–48 hours upon admission and once every 30 days thereafter. However, our nursing professionals are in constant contact with all of the physicians that visit the facility. Some insurance companies require that physicians visit more often. Check with our nursing staff for further information.",
  },
  {
    question: "Can I take my loved one home for a visit?",
    answer:
      "Patients may have a leave of absence only with MD authorization, which can be arranged through nursing staff. The resident or responsible party upon arrival and departure must sign the LOA (leave of absence) book, located at the nursing stations.",
  },
  {
    question: "Can my loved one receive mail?",
    answer: `Definitely. Mail is delivered to patients personally on a daily basis except for weekends and holidays.\n\nVineland Post Acute\nAttn: ____________ Room No.\n10830 Oxnard St\nNorth Hollywood, CA 91606`,
  },
  {
    question: "Is smoking permitted in the facility?",
    answer: "For the safety and welfare of all patients and staff, this facility is a non-smoking facility.",
  },
  {
    question: "My loved one has a favorite chair that I’d like to bring to the facility. Can you accommodate this?",
    answer:
      "We always want our patients to be comfortable; if space permits, small personal items from the resident’s home are always welcome.",
  },
  {
    question: "Will I be required to do my loved ones laundry?",
    answer:
      "Bed linens, hospital gowns and towels are provided and laundered by the facility. If you would prefer to do laundry for your loved one, please inform the charge nurse/social services designee.",
  },
  {
    question: "Is there someone who provides haircuts?",
    answer:
      "We have a beautician available Wednesday through Friday. Please contact our Social Service designee or stop by the nursing station to set up an appointment. Payment for all services is made in advance or at the Beauty Shop during appointments.",
  },
  {
    question: "Where should I park, when I come to visit?",
    answer:
      "Parking is available in the parking lot. Please observe all posted city parking signs. Avoid parking in spaces specifically reserved for the handicapped, employees, and physicians.",
  },
  {
    question: "Can I bring in my loved ones favorite food?",
    answer:
      "Consistent with the provision of special diets, always consult with the nursing staff before bringing food to patients. Any food kept in the resident room must be in properly sealed containers.",
  },
  {
    question: "What articles of clothing should I bring?",
    answer: `We recommend approximately five changes of clothing and a pair of comfortable rubber-soled shoes. All articles should be washed, clearly labeled with the resident’s name in permanent ink, and entered into the patients’ personal inventory log in the medical chart. Other personal items should be marked or engraved for identification.\n\nWe advise that patients do not keep valuable jewelry or large amounts of cash in the facility.\n\nLADIES\n• Dresses\n• Pants\n• Blouses (with front snaps)\n• Socks/Nylons\n• Walking shoes (non-skid soles; velcro)\n• Undergarments\n• Nightgown/Pajamas\n• Robe\n• Sweaters (with large buttons)\n\nGENTLEMEN\n• Shirts (button down suggested)\n• Pants\n• Belts/Suspenders\n• Socks\n• Walking Shoes (non-skid soles; velcro)\n• Undergarments\n• Pajamas\n• Robe\n• Electric Razor`,
  },
  {
    question: "Personal Laundry:",
    answer:
      "There is no charge for personal laundry. Families that wish to do their loved ones’ laundry must bring in a hamper for dirty clothes and ensure laundry is done at least once a week in order to comply with state hygiene regulations.",
  },
  {
    question: "Clothing and Laundry Tips:",
    answer: `All personal clothing is washed in an industrial washing machine at a temperature of 180-degrees. Make sure your loved ones’ clothing is appropriate for washing and drying in these hot temperatures. Clothing that requires cold or warm water or special care is subject to damage and fading.\n\nAll clothing must be labeled. Please label the clothing with the resident name, NOT the room number or initials. Mark clearly and in large letters on the inside neckline or waistband. All items must be marked including socks, shoes, and other personal items.`,
  },
  {
    question: "Will my loved one have telephone access?",
    answer:
      "Private phone access is available to every resident. Unlimited local and toll free calls can be made from resident phones. An unlimited number of phone calls from any incoming area code (national or international) can be received at the resident phones.",
  },
  {
    question: "Will my loved ones room have a television?",
    answer:
      "All resident rooms have DirecTV. If you would like to bring in your own television from home, please consult with our maintenance director to ensure proper placement according to county fire codes.",
  },
  {
    question: "What kinds of activities are planned for the patients?",
    answer:
      "We have a vibrant atmosphere with activities that match the capabilities and needs of our residents. We also have active resident and family councils and volunteer programs. Scheduled activities include: music, fitness activities, religious meetings, outside entertainment, games, gardening, field trips/outings and volunteer involvement. If you would like to arrange something special or have suggestions and ideas for individual or group activities, please inform our activities director. We welcome and encourage involvement from family and friends.",
  },
  {
    question: "How often will the Rehabilitation staff work with my loved one?",
    answer: "Our Rehabilitation staff will work with our residents 6 days a week up to 2 hours a day!",
  },
  {
    question: "Will Medicare Part A cover my stay in the facility?",
    answer:
      "Patients must have a Medicare card that reads Hospital Insurance. They must also be admitted to the facility with a physician order within 30 days of a three consecutive night hospital stay. Generally, during the first 20 days of care, Medicare will pay 100%. For days 21-100, a $185.50 daily co-insurance rate is required. Medicare does not cover skilled nursing fees over 100 days.",
  },
  {
    question: "Links to other helpful senior sites",
    answer: `Compare skilled nursing facilities in your area\nMedicare mainpage\nMedicare Eligibility\nFrequently asked Medicare questions\nMedicaid mainpage\nFrequently asked Medi-Cal questions\nAARP\nAmerican Diabetes Association\nAlzheimer’s Association\nFind a physician\nJoint Commission (JCAHO)\nMaking the Move to Assisted Living\nMoving Tips for Seniors\nSenior Health Resources\nNutrition Guide for the Aging and Elderly\nBoomer’s Roadmap to Aging in Place\nFinancial Resources for Seniors\nVeterans Benefits for Seniors\nLegal Planning for Alzheimer’s and Dementia`,
  },
];

export default function GeneralFAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      {/* Title */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-lg italic">Vineland Post Acute</p>
      </motion.section>

      {/* Hero Image */}
      <motion.div
        className="mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Image
          src="/about/FAQ.jpg"
          alt="Facility Outdoor"
          width={1400}
          height={400}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      {/* Intro */}
      <motion.p
        className="text-center text-gray-700 max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        You’ve got questions. We’ve got answers. If this page doesn’t solve your concerns, please call us and we’ll do
        our best to help you.
      </motion.p>

      {/* FAQ List with Staggered Animation */}
      <section className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-[#428f47] font-medium text-lg hover:bg-gray-50 transition"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-gray-400">{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <motion.div
                className="px-6 pb-4 text-gray-600 whitespace-pre-line"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </section>
    </main>
  );
}
