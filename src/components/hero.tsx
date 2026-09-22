import { PitchSvg } from "./pitch-svg";

export function Hero() {
  return (
    <header className="pb-18 pt-10">
      <div className="mx-auto max-w-245 px-7">
        <div className="relative rounded-[20px] border-[1.5px] border-dashed border-line p-3.5">
          <div className="relative flex flex-col overflow-hidden rounded-[14px] bg-bg-raised">
            <PitchSvg />
            <div className="relative w-full px-6 py-8 sm:px-11 sm:pb-9.5 sm:pt-10">
              <h1 className="mb-4.5 font-sans tracking-[-0.01em]">
                <span className="block text-[20px] font-normal leading-[1.35] text-text-dim sm:text-[24px]">
                  Hey there, I’m
                </span>
                <span className="block bg-linear-to-r from-sage to-slate-blue bg-clip-text text-[40px] font-medium leading-[1.2] text-transparent sm:text-[58px]">
                  Yash Pandey.
                </span>
              </h1>
              <p className="mb-7 max-w-180 text-[17px] leading-[1.55] text-text-dim">
                A software developer who loves building things and seeing them
                come to life. I enjoy working across the stack, learning new
                technologies, and digging deeper whenever I can.
              </p>
              <div className="mb-8.5 flex flex-wrap gap-x-6 gap-y-3.5 text-[12.5px] text-text-dim sm:gap-7">
                <div>
                  <span className="mr-1.5 text-slate-blue">loc</span>
                  Bengaluru, IN
                </div>
                <div>
                  <span className="mr-1.5 text-slate-blue">focus</span>
                  Full-stack / Platform
                </div>
                <div>
                  <span className="mr-1.5 text-slate-blue">status</span>
                  SDE @ SnowmountainAI
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3.5">
                <a
                  className="inline-block rounded-sm border border-sage bg-sage px-5 py-2.75 text-[13px] text-background no-underline transition-[border-color,color] duration-150 ease-in-out hover:bg-sage-hover"
                  href="#experience"
                >
                  View work
                </a>
                <a
                  className="inline-block rounded-sm border border-line px-5 py-2.75 text-[13px] text-text-dim no-underline transition-[border-color,color] duration-150 ease-in-out hover:border-text-faint hover:text-foreground"
                  href="#contact"
                >
                  Get in touch →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
