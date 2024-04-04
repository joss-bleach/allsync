"use client";
import { redirect } from "next/navigation";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import { FullPageLoader } from "@/components/shared/full-page-loader";

interface InvitePageProps {
  params: {
    inviteCode: string;
  };
}

const InvitePage = ({ params }: InvitePageProps) => {
  const addMember = useMutation(api.membership.create);
  const data = addMember({ inviteCode: params.inviteCode });

  if (data === undefined) {
    return <FullPageLoader />;
  } else {
    if (!data) {
      return redirect("/");
    } else {
      data
        .then((result) => {
          redirect(`/server/${result}`);
        })
        .catch(() => redirect("/"));
    }
  }
};

export default InvitePage;
