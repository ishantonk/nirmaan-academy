interface HeadingProps {
  title: string;
  description?: string;
}

export default function HeadingWithBackground({
  title,
  description,
}: HeadingProps) {
  return (
    <div className="relative z-10 text-center">
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2 tracking-tight">
        {title}
      </h1>
      {description && (
        <h2 className="text-sm md:text-base font-light text-gray-300 mb-4">
          {description}
        </h2>
      )}
      <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
    </div>
  );
}
