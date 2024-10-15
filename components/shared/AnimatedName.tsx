type Props = {
  mainName: string;
  subName?: string;
};

export default function AnimatedName(props: Props) {
  const mainName = props.mainName;
  const subName = props.subName ?? props.mainName;

  return (
    <div className="font-medium transition-all">
      <span className="sr-only">{mainName}</span>
      <span aria-hidden="true" className="block overflow-hidden group relative">
        <span className="inline-block transition-all duration-350 ease-in-out group-hover:-translate-y-full">
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
        <span className="inline-block absolute left-0 top-0 transition-all duration-350 ease-in-out translate-y-full group-hover:translate-y-0">
          {subName.split("").map((letter, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
