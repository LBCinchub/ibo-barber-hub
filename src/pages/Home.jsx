import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import GallerySection from "../components/GallerySection";
import BookingModal from "../components/BookingModal";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookClick={openBooking} />
      <HeroSection onBookClick={openBooking} />
      <ServicesSection onBookClick={openBooking} />
      <GallerySection />
      <AboutSection />
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={closeBooking} />
      <WhatsAppButton />
    </div>
  );
}