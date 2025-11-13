import React from "react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AboutSection = () => {
  return (
    <motion.section
      className="py-16 px-2 bg-linear-to-b from-[#0e0a23] to-[#1a1238] text-white text-center rounded-2xl shadow-lg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.02 }}
      variants={sectionVariants}
    >
      {/* Heading */}
      <motion.h2
        className="text-base md:text-xl font-extrabold mb-10 tracking-wide"
        variants={cardVariants}
      >
        <span className="text-[#facc15]">তোমার প্যারা 🎥 </span>
        <span className="text-white">আমাদের সমাধান 🍿</span>
      </motion.h2>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {/* Problems */}
        {[
          "সিনেমা ট্র্যাক করতে পারো না, কোনটা দেখেছো আর কোনটা নয় তা মনে থাকে না।",
          "প্রিয় সিনেমাগুলো এক জায়গায় ম্যানেজ করার সহজ উপায় পাচ্ছো না।",
          "রেটিং, জেনার, বা বছরের ভিত্তিতে সিনেমা খুঁজতে কষ্ট হয়।",
          "নিজের কালেকশন বা ওয়াচলিস্ট তৈরি করতে পারছো না।",
        ].map((text, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="bg-linear-to-b from-[#60193b] to-[#3b0b22] p-4 rounded-xl shadow-md border border-[#7a1e42]"
          >
            <p className="text-base md:text-xl leading-relaxed">
              😞 <br />
              {text}
            </p>
          </motion.div>
        ))}

        {/* Solutions */}
        {[
          "MovieMaster Pro তোমাকে দেয় এক জায়গায় তোমার প্রিয় সিনেমা ম্যানেজ করার সুবিধা।",
          "তুমি সহজেই নিজের কালেকশন তৈরি করতে পারবে — যুক্ত, আপডেট ও ডিলিট করতে পারবে।",
          "রেটিং, রিলিজ ইয়ার, জেনার ইত্যাদির ভিত্তিতে অ্যাডভান্স ফিল্টার দিয়ে সিনেমা খুঁজে পাবে।",
          "ওয়াচলিস্ট ফিচার দিয়ে ভবিষ্যতে দেখার সিনেমাগুলো সেভ করে রাখতে পারবে।",
        ].map((text, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="bg-linear-to-b from-[#073b4c] to-[#092e3d] p-6 rounded-xl shadow-md border border-[#0b4b5f]"
          >
            <p className="text-base md:text-xl leading-relaxed">
              😄 <br />
              {text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Text */}
      <motion.p
        className="max-w-3xl mx-auto mt-12 text-gray-300 leading-relaxed"
        variants={cardVariants}
      >
        MovieMaster Pro হল একটি অল-ইন-ওয়ান সিনেমা ম্যানেজমেন্ট প্ল্যাটফর্ম
        যেখানে তুমি নিজের প্রিয় সিনেমা যোগ করতে, রেট করতে, এবং সহজেই কালেকশন
        তৈরি করতে পারবে। নিজের মতো করে সিনেমার জগৎ সাজাও!
      </motion.p>
    </motion.section>
  );
};

export default AboutSection;
