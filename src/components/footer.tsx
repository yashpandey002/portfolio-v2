import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="px-0 pb-12 pt-8 text-xs text-text-faint" id="contact">
      <div className="mx-auto flex w-full max-w-245 items-center justify-between px-7">
        <span>© 2026 Yash Pandey</span>
        <div className="flex items-center gap-4">
          <SocialLinks />
          <a
            className="text-text-faint no-underline hover:text-sage"
            href="#contact"
          >
            say hi →
          </a>
        </div>
      </div>
    </footer>
  );
}
