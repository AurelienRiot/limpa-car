import Loading from "@/app/(routes)/(public)/loading";
import { Suspense } from "react";
import { Billboard } from "@prisma/client";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl">
      <Suspense fallback={<Loading />}>
        <div
          className="rounded-xl relative aspect-square md:aspect-[3/1] overflow-hidden bg-cover"
          style={{ backgroundImage: `url(${data?.imageUrl})` }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
            <div className="max-w-xs p-2 pb-3 text-3xl font-bold bg-gray-800 rounded-lg sm:text-5xl lg:text-6xl sm:max-w-xl bg-opacity-40 text-gray-50">
              {data.description}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Billboard;
