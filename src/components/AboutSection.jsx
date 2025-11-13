import React from "react";
import styled from "styled-components";

const AboutSection = () => {
  const problems = [
    "সিনেমা ট্র্যাক করতে পারো না, কোনটা দেখেছো আর কোনটা নয় তা মনে থাকে না।",
    "প্রিয় সিনেমাগুলো এক জায়গায় ম্যানেজ করার সহজ উপায় পাচ্ছো না।",
    "রেটিং, জেনার, বা বছরের ভিত্তিতে সিনেমা খুঁজতে কষ্ট হয়।",
    "নিজের কালেকশন বা ওয়াচলিস্ট তৈরি করতে পারছো না।",
  ];

  const solutions = [
    "MovieMaster Pro তোমাকে দেয় এক জায়গায় তোমার প্রিয় সিনেমা ম্যানেজ করার সুবিধা।",
    "তুমি সহজেই নিজের কালেকশন তৈরি করতে পারবে — যুক্ত, আপডেট ও ডিলিট করতে পারবে।",
    "রেটিং, রিলিজ ইয়ার, জেনার ইত্যাদির ভিত্তিতে অ্যাডভান্স ফিল্টার দিয়ে সিনেমা খুঁজে পাবে।",
    "ওয়াচলিস্ট ফিচার দিয়ে ভবিষ্যতে দেখার সিনেমাগুলো সেভ করে রাখতে পারবে।",
  ];

  return (
    <StyledWrapper>
      <section className="about-section">
        <h2 className="section-title">
          <span className="highlight">তোমার প্যারা 🎥</span> আমাদের সমাধান 🍿
        </h2>

        <div className="card-grid">
          {problems.map((problem, i) => (
            <div key={i} className="card">
              <div className="card-inner">
                <div className="card-front">
                  <p>😞 {problem}</p>
                </div>
                <div className="card-back">
                  <p>😄 {solutions[i]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </StyledWrapper>
  );
};

export default AboutSection;

const StyledWrapper = styled.div`
  .about-section {
    background: linear-gradient(to bottom, #0e0a23, #1a1238);
    color: #fff;
    text-align: center;
    padding: 4rem 1rem;
    border-radius: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 2rem;
  }

  .highlight {
    color: #facc15;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .card {
    width: 100%;
    height: 250px;
    perspective: 1000px;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.999s;
  }

  .card:hover .card-inner {
    transform: rotateY(180deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.6;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  }

  .card-front {
    background: linear-gradient(to bottom, #60193b, #3b0b22);
    border: 2px solid #7a1e42;
  }

  .card-back {
    background: linear-gradient(to bottom, #073b4c, #092e3d);
    border: 2px solid #0b4b5f;
    transform: rotateY(180deg);
  }
`;
