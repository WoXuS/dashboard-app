interface CustomTickProps {
  x: number;
  y: number;
  payload: { value: string };
  textLengthLimit: number;
}

const CustomTick: React.FC<CustomTickProps> = ({
  x,
  y,
  payload,
  textLengthLimit,
}) => {
  const text = payload.value as string;
  const textChunks = [];

  for (let i = 0; i < text.length; i += textLengthLimit) {
    textChunks.push(text.slice(i, i + textLengthLimit));
  }

  const rotation = 45;
  const transform = `rotate(${rotation},${x},${y})`;

  return (
    <text x={x} y={y} dy={16} textAnchor="middle" fill="#666" transform={transform}>
      {textChunks.map((chunk, index) => (
        <tspan x={x} dy={index === 0 ? 0 : 16} key={index}>
          {chunk}
        </tspan>
      ))}
    </text>
  );
};
export default CustomTick;
