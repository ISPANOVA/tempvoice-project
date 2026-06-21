import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/session";
import { getAppBaseUrl } from "@/lib/url";

export async function GET(req: NextRequest) {
  await destroySession();
  return NextResponse.redirect(`${getAppBaseUrl()}/login`);
}
