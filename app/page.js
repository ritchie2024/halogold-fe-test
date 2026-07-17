import { redirect } from "next/navigation";

// Root langsung mengarahkan pengguna ke halaman Login.
export default function Home() {
  redirect("/login");
}
