export function About() {
  return (
    <section className="py-18" id="about">
      <div className="mx-auto max-w-245 px-7">
        <p className="mb-5.5 flex items-center gap-2.5 text-xs tracking-[0.06em] text-slate-blue">
          <span className="inline-block h-px w-4.5 bg-slate-blue" />
          about me
        </p>
        <div className="text-[15px] leading-[1.85] text-text-dim [&_p]:mb-4.5 [&_p]:last:mb-0">
          <p>
            Hey, I&apos;m Yash, a software developer based in Bengaluru, India.
          </p>
          <p>
            I’ve always been curious about *why* things work the way they do. I
            think that curiosity is what eventually pulled me toward computer
            science.
          </p>
          <p>
            My first real curiosity about programming started around 10th grade,
            when I began wondering how websites actually worked. Around the same
            time, I started learning Python at school.
          </p>
          <p>
            One of the first programs I built was a simple marks calculator for
            my mom, who used to manually calculate and maintain her students’
            marks on paper. I wrote a small Python program in a Jupyter Notebook
            to keep track of the marks and calculate the totals, and it made me
            realize for the first time that programming could be more than
            something to learn—it could be a tool to solve real problems.
          </p>
          <p>
            Since then, I’ve been learning and working continuously and trying
            to understand what happens beneath the abstractions - from building
            web applications to learning more about systems and the fundamentals
            of computer science.
          </p>
          <p>
            Currently I’m exploring mobile development, because it’s an area I
            haven’t had much hands-on experience with yet.
          </p>
          <p>
            And when I’m not writing code, you’ll probably find me playing
            football, hanging out with friends, listening to music, or just
            being curious about something completely unrelated to software.
          </p>
        </div>
      </div>
    </section>
  );
}
