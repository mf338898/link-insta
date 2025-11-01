import { promises as fs } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { getContactBySlug } from "@/data/contacts";

function escape(text: string | undefined) {
  if (!text) return "";
  return text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

async function getStaticVCard(slug: string) {
  if (!/^[a-z0-9_-]+$/i.test(slug)) return null;

  const filePath = join(process.cwd(), "public", "contacts", `${slug}.vcf`);

  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch {
    return null;
  }
}

function buildVCard(slug: string) {
  const c = getContactBySlug(slug);
  if (!c) return null;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escape(c.name)};;;;`,
    `FN:${escape(c.name)}`,
    c.org ? `ORG:${escape(c.org)}` : null,
    c.title ? `TITLE:${escape(c.title)}` : null,
    c.phone ? `TEL;TYPE=CELL:${escape(c.phone)}` : null,
    c.email ? `EMAIL;TYPE=INTERNET:${escape(c.email)}` : null,
    c.url ? `URL:${escape(c.url)}` : null,
    c.address ? `ADR;TYPE=WORK:;;;;;${escape(c.address)}` : null,
    c.note ? `NOTE:${escape(c.note)}` : null,
    "END:VCARD",
  ].filter(Boolean) as string[];

  return lines.join("\r\n");
}

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const vcf = (await getStaticVCard(slug)) ?? buildVCard(slug);
  if (!vcf) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(vcf, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename=contact-${slug}.vcf`,
      "Cache-Control": "public, max-age=600",
    },
  });
}

