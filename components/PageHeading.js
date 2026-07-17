export default function PageHeading({ eyebrow, title, italic, subtitle, size = "lg" }) {
  const titleSize =
    size === "xl"
      ? "text-[2.6rem] sm:text-[3.2rem]"
      : "text-[2rem] sm:text-[2.5rem]";

  return (
    <div>
      {eyebrow ? (
        <p className="label-eyebrow flex items-center gap-3 text-gold-deep">
          <span className="inline-block h-px w-6 bg-gold-deep/70" />
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={`font-serif ${titleSize} mt-2.5 font-medium leading-[1.08] tracking-tight text-ink`}
      >
        {title}
        {italic ? <em className="text-gold-deep"> {italic}</em> : null}
      </h1>
      {subtitle ? (
        <p className="font-serif-italic mt-2 text-[15px] text-ink-2">
          {subtitle}
        </p>
      ) : null}
      <div className="gold-rule mt-4" />
    </div>
  );
}
