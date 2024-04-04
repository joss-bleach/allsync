"use client";
import { redirect } from "next/navigation";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import { FullPageLoader } from "@/components/shared/full-page-loader";
import { CreateInitialServer } from "./_components/create-initial-server";

const InitPage = () => {
  const data = useQuery(api.memberships.get);

  if (data === undefined) {
    return <FullPageLoader />;
  } else {
    if (data && data.length === 0) {
      return <CreateInitialServer />;
    }
    return redirect(`/server/${data[0].serverId}`);
  }
};

export default InitPage;
