import "./globals.css";
import Shell from "@/components/Shell";

export const metadata = { title: "Orkestra - AI Agent Dashboard", description: "Dashboard otomatisasi agency dan media lokal" };

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body><Shell>{children}</Shell></body>
    </html>
  );
}
