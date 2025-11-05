export type Contact = {
  slug: string;
  name: string;
  title?: string;
  handle?: string;
  status?: string;
  avatarUrl?: string;
  miniAvatarUrl?: string;
  phone?: string;
  email?: string;
  org?: string;
  url?: string;
  address?: string;
  note?: string;
};

const contacts: Record<string, Contact> = {
  matthis: {
    slug: "matthis",
    name: "Matthis Foveau",
    title: "Conseiller immobilier & investisseur local",
    handle: "matthis_immobilier",
    status: "Accompagnement personnalisé et rigoureux",
    avatarUrl: "/images/avatars/matthis-pro.jpg",
    miniAvatarUrl: "/images/avatars/profile-solid.png",
    phone: "+33748944694",
    email: "contact@alvimmobilier.bzh",
    org: "ALV Immobilier",
    url: "https://www.alvimmobilier.com",
    address: "19 Pl. Charles de Gaulle, 29190 Pleyben, France",
    note: "Réponse uniquement pour les projets sérieux dans le Finistère.",
  },
};

export function getContactBySlug(slug: string): Contact | null {
  return contacts[slug] ?? null;
}

export function getAllContacts(): Contact[] {
  return Object.values(contacts);
}
