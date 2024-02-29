const UpComingEvent = () => {
  return (
    <section className="w-full px-10 flex flex-col gap-4">
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-blue-500 font-bold text-xl">Upcoming Events</h1>
        <button className="rounded-2xl text-white bg-blue-500 px-4 py-2">
          View All
        </button>
      </div>
      <h1 className="font-semibold text-slate-400">
        {" "}
        Today, {new Date().toUTCString().slice(4, 12)}
      </h1>
      <div className="w-full h-28 bg-slate-500 pl-2 rounded-lg truncate">
        <div className="h-full w-full bg-orange-500">
          <h1>First Section With Alex Stan</h1>
        </div>
      </div>
    </section>
  );
};

export default UpComingEvent;
