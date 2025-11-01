"use client";
import ProfileCard from "@/components/ProfileCard";

type Props = {
  slug: string;
  name: string;
  title?: string;
  handle?: string;
  status?: string;
  avatarUrl?: string;
  miniAvatarUrl?: string;
};

export default function ContactCardClient({ slug, name, title, handle, status, avatarUrl, miniAvatarUrl }: Props) {
  return (
    <ProfileCard
      iconUrl="/images/logo/agency-logo.png?v=eb3a5442"
      iconSize={96}
      iconGap={28}
      name={name}
      title={title}
      handle={handle}
      status={status}
      avatarUrl={avatarUrl}
      miniAvatarUrl={miniAvatarUrl}
      behindGradient={undefined}
      innerGradient={undefined}
      contactText="Ajouter le contact"
      contactHref={`/api/vcard/${slug}`}
      contactDownloadName={`contact-${slug}.vcf`}
    />
  );
}
