import Footer from "@/components/users/Footer";
import Hero from "@/components/users/Hero";
import Home from "@/components/users/Home";
import Menu from "@/components/users/Menu";
import Navbar from "@/components/users/Navbar";
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
      <Menu />
      <Footer />
    </>
  );
}
