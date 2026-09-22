import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="px-0 pb-12 pt-4 text-xs text-text-faint">
      <div className="mx-auto flex w-full max-w-245 items-center justify-between px-7">
        <span>Made with ❤️ by Yash Pandey.</span>
        <div className="flex items-center gap-4">
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
