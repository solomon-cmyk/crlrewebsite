export function getFormspreeEndpoint(): string | null {
  const url = process.env.NEXT_PUBLIC_FORMSPREE_FORM_URL?.trim();
  return url || null;
}

export type LeadFormPayload = {
  name: string;
  email: string;
  phone: string;
  collection: string;
  message: string;
  intent: "Reservation Agreement" | "More Information";
  tcpaConsent: boolean;
};

export async function submitLeadForm(payload: LeadFormPayload): Promise<void> {
  const endpoint = getFormspreeEndpoint();

  if (!endpoint) {
    throw new Error("Form endpoint is not configured yet. Please email mark@crlre.com directly.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      collection: payload.collection,
      message: payload.message,
      intent: payload.intent,
      tcpaConsent: payload.tcpaConsent ? "Yes" : "No",
      _subject: `${payload.intent} | ${payload.name}`,
    }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "Something went wrong. Please try again or email mark@crlre.com.");
  }
}
