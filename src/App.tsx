import LeftSide from "./components/LeftSide/LeftSide";
import RightSide from "./components/RightSide/RightSide";

function App() {
  return (
    <main className="bg-[#dbe9f2] h-screen w-full p-4">
      <div className="bg-white h-full w-full rounded flex truncate shadow-xl">
        <LeftSide />
        <RightSide />
      </div>
    </main>
  );
}

export default App;
