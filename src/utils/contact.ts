import profileData from "../data/profile.json";

export const getWhatsAppUrl = (message: string): string =>
  `https://wa.me/${profileData.whatsappNumber}?text=${encodeURIComponent(message)}`;
