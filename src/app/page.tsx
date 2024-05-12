import Faq from "@/components/Faq";
import Footer from "@/components/users/Footer";
import Hero from "@/components/users/Hero";
import Menu from "@/components/users/Menu";
import Navbar from "@/components/users/Navbar";
import Restaurant from "@/components/users/Restaurant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "sign up - One Byte Food",
  description: "Authentication for One Byte Food.",
};

export default function AuthenticationPage() {
  return (
    <>
      <Navbar />
      {/* <Home /> */}
      <Hero />
      <Restaurant />
      <Menu />
      <Faq/>
      <Footer />
    </>
  );
}
