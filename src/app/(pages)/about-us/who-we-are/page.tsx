"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function WhoWeArePage() {
  const { t } = useTranslation("common");

  const paragraphs = [
    t("wwa1"),
    t("wwa2"),
    t("wwa3"),
    t("wwa4"),
    t("wwa5"),
    t("wwa6"),
  ];

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16 relative overflow-hidden">
      {/* Title */}
      <motion.section className="text-center mb-12 relative z-10" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">{t("who")}</h1>
        <p className="text-gray-600 text-lg italic">Vineland Post Acute</p>
      </motion.section>

      <div className="flex flex-col lg:flex-row gap-10 relative z-10">
        {/* Images */}
        <motion.div className="flex-shrink-0 mx-auto lg:mx-0 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Image src="/about/WWA1.jpg" alt={t("wwaImg1Alt")} width={600} height={400} className="rounded-xl shadow-md object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <Image src="/about/WWA2.jpg" alt={t("wwaImg2Alt")} width={600} height={400} className="rounded-xl shadow-md object-cover" />
          </motion.div>
        </motion.div>

        {/* Paragraphs */}
        <div className="flex-1 text-gray-800 space-y-6 text-base leading-relaxed">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              dangerouslySetInnerHTML={{ __html: text }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

