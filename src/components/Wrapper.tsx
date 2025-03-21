interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper = ({ children, className = "" }: WrapperProps) => {
  return (
    <div className={`
      w-full
      max-w-[1440px]
      min-h-screen  // Ensures it takes full viewport height
      px-4
      md:px-6
      lg:px-8
      mx-auto
      flex
      items-center  // Centers content vertically
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Wrapper;
