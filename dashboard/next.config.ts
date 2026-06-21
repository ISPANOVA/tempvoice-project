import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // يحدد جذر المشروع الفعلي (المجلد الأعلى الذي يحتوي bot/ و dashboard/ معًا)
  // لأن حزمة next نفسها مثبتة هناك فقط بفضل npm workspaces، وليست مكررة
  // داخل dashboard/node_modules
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
