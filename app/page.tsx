import { Metadata } from "next";
import HomePage from "@/src/components/pages/home/Home";
import HomeImagePreloader from "./HomeImagePreloader";

export const metadata: Metadata = {
  title: "Flashfire: Automate Job Applications with AI",
  description:
    "Flashfire is an AI job application platform that automates job search, auto-applies to jobs using AI, and matches you with the right roles faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/",
  },
  openGraph: {
    title: "Flashfire: Automate Job Applications with AI",
    description:
      "Flashfire is an AI job application platform that automates job search, auto-applies to jobs using AI, and matches you with the right roles faster.",
    url: "https://www.flashfirejobs.com/",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flashfire: Automate Job Applications with AI",
    description:
      "Flashfire is an AI job application platform that automates job search, auto-applies to jobs using AI, and matches you with the right roles faster.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.flashfirejobs.com/#organization",
    "name": "Flashfirejobs",
    "url": "https://www.flashfirejobs.com/",
    "logo": "https://www.flashfirejobs.com/favicon.ico",
    "description": "Flashfire is an AI-powered job search platform helping candidates get interview calls faster through intelligent job matching and automation.",
    "sameAs": [
      "https://www.instagram.com/flashfirejobs/",
      "https://www.youtube.com/@flashfireindia",
      "https://www.linkedin.com/company/flashfire-pvt-ltd/"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What would the costs be, and are there any extra fees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You pay once up front, and the charges depend on the plan you choose. There are no hidden charges, and you get all the functions in your plan (resume optimization, job applications, LinkedIn help, and interview support)."
        }
      },
      {
        "@type": "Question",
        "name": "If I am not satisfied with the service, do I get a refund?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our priority is to ensure your satisfaction. If your expectations are not met, we additionally apply to 150-200 more jobs on your behalf; however, initiating a refund is not possible. Nonetheless, we ensure you get the maximum benefit from the service you have chosen."
        }
      },
      {
        "@type": "Question",
        "name": "What if I don't get any calls for interviews?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We will send 100 more applications and give you a free resume upgrade if you don't get any interview calls by the end of your plan. Only people who have signed up for our Premium Plan will be applicable for this. Your career is important to us, and we will help you every step of the way."
        }
      },
      {
        "@type": "Question",
        "name": "Why should I consider Flashfire, when I can apply on my own?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flashfire automates your entire job search process. A team applies to 1200+ high-matching jobs in just 5-6 weeks on your behalf, and your resume is optimized for each role, so you can just focus on interviews and skills building. You will save 200 hours with us and double your callback rates."
        }
      },
      {
        "@type": "Question",
        "name": "How successful is Flashfire at securing job placements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "More than 90% of the people who use Flashfire will get interview calls within the first four weeks. Most people get interviews faster than they thought they would with targeted applications and optimized resumes. Premium users get even better results."
        }
      },
      {
        "@type": "Question",
        "name": "How does Flashfire differ from any other job portal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We don't wait for you to apply like most job boards do. Instead, we apply for you every day. Our AI and human experts make each resume unique and keep track of all the submissions in your dashboard. No spam, no guessing, just results."
        }
      },
      {
        "@type": "Question",
        "name": "How will I track my job applications and progress?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You will be given credentials to your personalized dashboard where you can track your progress along with that a dedicated WhatsApp group of 3-4 people is created just for you. You will be kept updated throughout the process."
        }
      },
      {
        "@type": "Question",
        "name": "Is Flashfire a good choice for students and job seekers in the U.S.?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Of course. Flashfire is made for people with OPT, CPT, or H1B visas and international students. We know that every application is important, and our team makes sure you have the best chance of getting hired in the U.S. job market."
        }
      },
      {
        "@type": "Question",
        "name": "How many job applications will be applied for per day?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on the number of relevant openings, but our team applies to 30 jobs each day to ensure efficiency and quality."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeImagePreloader />
      <HomePage />
    </>
  );
}
