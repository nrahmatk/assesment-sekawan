export default function Card({ title, count }) {
  return (
    <div className="bg-white h-32 rounded-lg flex flex-col items-center flex-wrap justify-center border-2">
      <div className="text-xl font-medium text-gray-400">{title}</div>
      <div className="text-4xl font-medium text-gray-900 mt-3">{count}</div>
    </div>
  );
}
