"use client";

import { useState } from "react";
import styles from "./homePageFAQ.module.css";
import { FaPlus, FaTimes } from "react-icons/fa";
import { questionsData } from "@/src/data/questionsData";
import { trackButtonClick } from "@/src/utils/PostHogTracking";

export default function HomePageFAQClient() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div id="faq-header" className={styles.header}>
        <h2>FAQs About Our AI Job Application Platform & Auto-Apply Features</h2>
        <p>
          We get it, AI job search can sound complex. Here’s everything
          explained, plain and simple.
        </p>
      </div>

      <div className={styles.faqContainer}>
        {questionsData.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            <button
              className={styles.faqQuestion}
              onClick={() => {
                handleToggle(index);
                trackButtonClick(`FAQ ${index + 1}`, "faq_item", "link", {
                  button_location: "faq_section",
                  faq_question: faq.question,
                  faq_index: index + 1
                });
              }}
            >
              <span>{faq.question}</span>
              <span className={styles.icon}>
                {activeIndex === index ? <FaTimes /> : <FaPlus />}
              </span>
            </button>

            {activeIndex === index && (
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
