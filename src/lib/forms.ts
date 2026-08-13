const enquiryEndpoint = import.meta.env.VITE_FORMSPREE_ENQUIRY_ENDPOINT as string | undefined
const newsletterEndpoint = import.meta.env.VITE_FORMSPREE_NEWSLETTER_ENDPOINT as string | undefined

export const isFormspreeConfigured = Boolean(enquiryEndpoint)

export interface EnquiryData {
  name: string
  email: string
  phone: string
  program: string
  message?: string
  goal?: string
}

export async function submitEnquiry(data: EnquiryData): Promise<boolean> {
  if (!enquiryEndpoint) return false
  try {
    const res = await fetch(enquiryEndpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: "New enquiry – Vetha Yogalaya website",
        _replyto: data.email,
        name: data.name,
        email: data.email,
        phone: data.phone,
        program: data.program,
        message: data.message ?? "",
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function subscribeNewsletter(email: string): Promise<boolean> {
  if (!newsletterEndpoint) return false
  try {
    const res = await fetch(newsletterEndpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: "Newsletter signup – Vetha Yogalaya",
        email,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}
