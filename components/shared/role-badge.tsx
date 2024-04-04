interface RoleBadgeProps {
  role: "admin" | "moderator" | "guest" | null | undefined;
}

// Components
import { Badge } from "../ui/badge";

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  if (role === "guest") {
    return null;
  }
  return <Badge variant={role === "admin" ? "admin" : "default"}>{role}</Badge>;
};
