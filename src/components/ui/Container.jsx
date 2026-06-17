const Container = ({ children, className }) => {
  return (
    <div className={`${className} max-w-7xl mx-auto px-4`}>{children}</div>
  );
};

export default Container;
