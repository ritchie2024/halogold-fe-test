import { redirect } from "next/navigation";

// Root mengarahkan ke Onboarding — sesuai urutan blueprint resmi:
// Onboarding (perkenalan & trust-building) -> Login/Registrasi.
export default function Home() {
  redirect("/onboarding");
}
