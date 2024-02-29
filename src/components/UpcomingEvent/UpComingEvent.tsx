import { GoDeviceCameraVideo } from "react-icons/go";

const UpComingEvent = () => {
  return (
    <section className="w-full px-10 flex flex-col gap-4">
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-darkBlue font-bold text-xl">Upcoming Events</h1>
        <button className="rounded-2xl text-white bg-darkBlue px-4 py-2">
          View All
        </button>
      </div>
      <h1 className="font-semibold text-slate-400">
        {" "}
        Today, {new Date().toUTCString().slice(4, 12)}
      </h1>
      <div className="w-full h-28 bg-lightBlue pl-2 rounded-lg truncate">
        <div className="h-full w-full bg-lightOrange flex p-4">
          <div className="w-full h-full flex flex-col gap-2">
            <h1 className="text-darkBlue font-semibold">
              First Section With Alex Stan
            </h1>
            <span className="text-slate-500">9:00 AM - 09:30 AM GMT+8</span>
            <span className="underline text-purple-600">
              View Client Profile
            </span>
          </div>
          <div className="h-full w-fit">
            <div className="w-10 h-10 bg-lightBlue text-white rounded-full flex items-center justify-center text-xl">
              <GoDeviceCameraVideo />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-28 bg-lightBlue pl-2 rounded-lg truncate">
        <div className="h-full w-full bg-lightOrange flex p-4">
          <div className="w-full h-full flex flex-col gap-2">
            <h1 className="text-darkBlue font-semibold">
              First Section With Alex Stan
            </h1>
            <span className="text-slate-500">9:00 AM - 09:30 AM GMT+8</span>
            <span className="underline text-purple-600">
              View Client Profile
            </span>
          </div>
          <div className="h-full w-fit">
            <div className="w-10 h-10 bg-lightBlue text-white rounded-full flex items-center justify-center text-xl">
              <GoDeviceCameraVideo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpComingEvent;
