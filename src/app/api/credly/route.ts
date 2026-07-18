import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch live badges from Credly services
    const res = await fetch(
      "https://services.credly.com/api/v1/users/vinicius-silva-de-andrade/badges",
      {
        headers: {
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 3600 }, // Cache on CDN for 1 hour
      }
    );

    if (!res.ok) {
      throw new Error(`Credly services API returned status: ${res.status}`);
    }

    const data = await res.json();
    
    // Format response to match required client structure
    const badges = (data.data || []).map((badge: any) => ({
      name: badge.badge_template.name,
      issuer: badge.issuer.name,
      image: badge.badge_template.image.url,
      date: new Date(badge.issued_at).getFullYear().toString(),
      id: badge.id,
      credentialUrl: `https://www.credly.com/badges/${badge.id}/public_url`,
    }));

    return NextResponse.json(badges);
  } catch (error) {
    console.error("Credly API Error, returning empty list for fallback:", error);
    return NextResponse.json([]);
  }
}
