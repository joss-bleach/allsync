import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animation from "./lottie-loader.json";

export const FullPageLoader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-[80px] w-[80px]">
        <Lottie animationData={animation} loop></Lottie>
      </div>
    </div>
  );
};
