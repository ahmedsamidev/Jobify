import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="count">{icon}</span>
      </header>
      <h1 className="title">{title}</h1>
    </Wrapper>
  );
};
export default StatItem;
