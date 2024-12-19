type Props = {
  mainName: string;
  subName?: string;
};
// from @leerob
export default function AnimatedName(props: Props) {
  const mainName = props.mainName;
  const subName = props.subName ?? props.mainName;

  return (
    <div className="font-medium transition-all">
      <span className="sr-only">{mainName}</span>
      <span
        aria-hidden="true"
        className="group relative block overflow-hidden"
        tabIndex={-1}
      >
        <span className="group-hover:-translate-y-full inline-block transition-all duration-350 ease-in-out">
          {mainName.split("").map((letter, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className="inline-block"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
        <span className="absolute top-0 left-0 inline-block translate-y-full transition-all duration-350 ease-in-out group-hover:translate-y-0">
          {subName.split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}
