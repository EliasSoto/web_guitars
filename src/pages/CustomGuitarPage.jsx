import CustomizedGuitar from "../components/CustomizedGuitar/CustomizedGuitar";

export default function CustomGuitarPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Custom Guitar</h1>
      <div>
        <CustomizedGuitar />
      </div>
      
    </div>
  );
}