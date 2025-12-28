import { NextRequest } from "next/server";

export default function getClientIP(req: NextRequest) {
  return getIP(req);
}
function getIP(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
