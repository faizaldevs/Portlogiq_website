import "../Skeleton.css";
const Skeleton = ({ width, height, style }) => {
  return (
    <div
      className="skeleton"
      style={{
        width: width || "100%",
        height: height || "20px",
        ...style,
      }}
    ></div>
  );
};

export default Skeleton;
