import { socials } from "@/lib/socials";

type SocialLinksProps = {
  className?: string;
  iconSize?: number;
};

export function SocialLinks({ className = "", iconSize = 16 }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`.trim()}>
      {socials.map(({ href, label, Icon }) => (
        <a
          key={label}
          aria-label={label}
          className="text-text-faint transition-colors duration-150 hover:text-sage"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
