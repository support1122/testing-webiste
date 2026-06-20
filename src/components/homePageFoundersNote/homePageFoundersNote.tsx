"use client";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

interface HomePageFoundersNoteProps {
  variant?: "default" | "pricing";
}

export default function HomePageFoundersNote({
  variant = "default",
}: HomePageFoundersNoteProps) {
  const whatsappNumber = "919817349846";
  const defaultMessage = "Hi! I'm interested in a free strategy call with Flashfire.";
  const encodedMessage = encodeURIComponent(defaultMessage);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  if (variant === "pricing") {
    return (
      <section
        id="founders-note"
        className="bg-[#fffaf8] px-4 py-[96px] font-['Space_Grotesk',sans-serif] max-[768px]:px-3 max-[768px]:py-12"
      >
        <div className="relative mx-auto grid min-h-[765px] w-full max-w-[1198px] grid-cols-[minmax(0,1fr)_372px] items-center gap-[82px] overflow-hidden rounded-[22px] bg-[#ff5a18] px-[61px] py-[72px] text-white max-[1000px]:grid-cols-[minmax(0,1fr)_320px] max-[1000px]:gap-10 max-[1000px]:px-10 max-[1000px]:py-16 max-[820px]:min-h-0 max-[820px]:grid-cols-1 max-[820px]:gap-8 max-[820px]:px-7 max-[820px]:py-9 max-[480px]:rounded-[16px] max-[480px]:px-5 max-[480px]:py-8">
          <div className="relative z-[1] max-w-[594px] text-left max-[820px]:max-w-none max-[820px]:pt-8">
            <div
              aria-hidden="true"
              className="absolute left-[-34px] top-[-82px] text-[170px] font-black leading-none text-white/25 max-[820px]:left-[-12px] max-[820px]:top-[-58px]"
            >
              &ldquo;
            </div>

            <p className="relative mb-6 text-[18px] font-medium leading-[1.35] max-[480px]:mb-4 max-[480px]:text-[14px]">
              To Every Job Seeker Who&apos;s Ready To Move Forward,
            </p>

            <div className="relative space-y-[18px] text-[18px] font-medium leading-[1.24] tracking-[-0.01em] max-[1000px]:text-[15px] max-[820px]:text-[14px] max-[480px]:space-y-[12px] max-[480px]:text-[12px] max-[480px]:leading-[1.3]">
              <p>
                I know how exhausting the job search can be. You keep sending out
                applications, waiting for replies, and start to wonder if it&apos;s
                you. Especially in the U.S., where hundreds apply for the same role,
                even the most talented people begin to lose hope.
              </p>
              <p>
                Flashfire was born from that same feeling. I watched my sister-
                smart, capable, and hardworking- apply to hundreds of roles and
                still get no response. It wasn&apos;t her fault. The system had
                stopped seeing people for who they are.
              </p>
              <p>
                That&apos;s when Pranjal joined me. He had been through the same
                struggle preparing hard, clearing rounds, yet still falling short.
                Not because he wasn&apos;t good enough, but because the process
                wasn&apos;t fair.
                <br />
                Together, we started building Flashfire with belief, empathy, and
                persistence. What began as a way to help one person is now helping
                hundreds find their &quot;yes.&quot;
              </p>
              <p className="pt-[12px] font-semibold">
                &quot;The Problem Was Never The People. It Was The Process.&quot;
              </p>
              <div className="pt-[10px] text-[20px] font-semibold leading-[1.25] max-[1000px]:text-[16px] max-[480px]:text-[14px]">
                <p>Adit</p>
                <p>Partner, Flashfire</p>
              </div>
            </div>
          </div>

          <div className="relative z-[1] flex items-center justify-end max-[820px]:justify-center">
            <div className="relative h-[591px] w-[372px] overflow-visible max-[1000px]:h-[508px] max-[1000px]:w-[320px] max-[820px]:h-[430px] max-[820px]:w-[290px] max-[480px]:h-[330px] max-[480px]:w-[220px]">
              <div className="absolute inset-0 overflow-hidden rounded-br-[10px] bg-[#022746]">
                <Image
                  src="/images/Adit.jpg"
                  alt="Adit Jain"
                  fill
                  sizes="247px"
                  className="scale-[1.035] object-contain object-center"
                />
              </div>

              <div className="absolute right-0 top-0 z-[2] h-[86px] w-[86px] rounded-bl-[18px] bg-[#ff5a18] max-[480px]:h-[58px] max-[480px]:w-[58px]" />
              <div className="absolute right-[-1px] top-[84px] z-[2] h-[56px] w-[56px] rounded-bl-[18px] bg-[#ff5a18] max-[480px]:top-[56px] max-[480px]:h-[40px] max-[480px]:w-[40px]" />
              <div className="absolute bottom-0 left-0 z-[2] h-[62px] w-[62px] rounded-tr-[12px] bg-[#ff5a18] max-[480px]:h-[42px] max-[480px]:w-[42px]" />
              <div className="absolute right-0 top-[-8px] z-[3] h-[59px] w-[59px] rounded-[13px] bg-[#022746] max-[480px]:h-[42px] max-[480px]:w-[42px]" />
              <a
                href="https://www.linkedin.com/in/adit-jain-907555218/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Adit Jain LinkedIn profile"
                className="absolute bottom-[12px] left-[12px] z-[4] flex h-[48px] w-[48px] items-center justify-center rounded-[4px] bg-white text-[#0a5481] shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-transform hover:scale-105 max-[480px]:h-[38px] max-[480px]:w-[38px]"
              >
                <FaLinkedin className="h-[35px] w-[35px] max-[480px]:h-[27px] max-[480px]:w-[27px]" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="founders-note"
      className="relative bg-[#fdf7f4] min-h-screen pl-56  pt-24  font-['Space_Grotesk',sans-serif] overflow-hidden max-[768px]:py-12 max-[768px]:px-4 max-[768px]:pl-4"
    >
      {/* Background Mascot */}
      <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none max-[768px]:bottom-[-20px] max-[768px]:right-[-10px] max-[480px]:bottom-[-10px] max-[480px]:right-[-80px]">
        <Image
          src="/images/character2.png"
          alt="Flashfire mascot"
          width={700}
          height={700}
          className="w-[700px] h-[700px] max-[768px]:w-[350px] max-[768px]:h-[350px]"
          unoptimized
        />
      </div>


      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Text Section */}
        <div className="max-w-[820px] mb-20">
          <h2 className="text-[#ff4c00] font-bold text-3xl leading-tight mb-8 max-[768px]:text-2xl">
            To Every Job Seeker Who&apos;s Ready To Move Forward,
          </h2>

          <div className="space-y-6 text-black font-['Space_Grotesk',sans-serif] font-medium text-lg leading-relaxed max-[768px]:text-base">
            <p>
              I know how exhausting the job search can be. You keep sending out
              applications, waiting for replies, and start to wonder if it&apos;s
              you. Especially in the U.S., where hundreds apply for the same role,
              even the most talented people begin to lose hope.
            </p>

            <p>
              Flashfire was born from that same feeling. I watched my sister—smart,
              capable, and hardworking—apply to hundreds of roles and still get no
              response. It wasn&apos;t her fault. The system had stopped seeing people
              for who they are.
            </p>

            <div className="bg-[#ff4c00]/10 border-l-4 border-[#ff4c00] px-6 py-4 rounded-md font-semibold text-black">
              The Problem Was Never The People. It Was The Process.
            </div>

            <p>
              That&apos;s when <span className="text-[#ff4c00] font-bold">Pranjal</span>{" "}
              joined me. He had been through the same struggle—preparing hard,
              clearing rounds, yet still falling short. Not because he wasn&apos;t good
              enough, but because the process wasn&apos;t fair.
            </p>

            <p>
              Together, we started building Flashfire with belief, empathy, and
              persistence. What began as a way to help one person is now helping
              hundreds find their “yes.”
            </p>
          </div>
        </div>


        <div className="flex items-start gap-6 mb-20 max-[800px]:flex-col max-[800px]:items-start">

          <div className="relative">

            {/* LEFT ORANGE STRIP */}
            <div className="absolute top-[6px] -left-[8px] h-[calc(100%-6px)] w-[8px] 
             bg-[#ff4c00] rounded-tl-lg z-0" />

            {/* BOTTOM ORANGE STRIP */}
            <div className="absolute -bottom-[8px] left-[-8px] w-[calc(100%+8px)] h-[8px] 
             bg-[#ff4c00] rounded-bl-lg rounded-br-md z-0" />


            {/* CARD */}
            <div className="relative bg-white p-[4px] z-10">
              {/* IMAGE WRAPPER */}
              <div className="relative w-[260px] h-[300px] overflow-visible max-[768px]:w-[220px] max-[768px]:h-[260px]">
                <Image
                  src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Adit.jpg"
                  alt="Adit Jain"
                  fill
                  className="object-cover object-[center_30%]"
                  unoptimized
                />

                {/* TOP-RIGHT BADGE */}
                <div className="absolute -top-6 -right-6 w-16 h-16 flex items-center justify-center z-20">
                  <Image
                    src="/images/character2.png"
                    alt="Flashfire"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

              </div>
            </div>
          </div>

          {/* TEXT SECTION */}
          <div className="relative bg-[#fdf7f4] min-w-[150px] flex flex-col gap-2">

            <div className="mt-2">
              <p className="font-bold text-xl">Adit</p>
              <p className="text-gray-600 text-sm">Partner, Flashfire</p>
            </div>

            <a
              href="https://www.linkedin.com/in/adit-jain-907555218/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#0077b5] transition"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>

          {/* CTA */}
          <a
            onClick={handleWhatsAppClick}
            className="text-[#ff4c00] font-semibold text-lg hover:underline mt-[250px] -ml-[170px] max-[800px]:mt-4 max-[800px]:ml-0 max-[800px]:text-base"
          >
            LET&apos;S TALK →
          </a>
        </div>

      </div>
    </section>
  );
}
