"use server";

import { createClient } from "@supabase/supabase-js";

export type InvestorRequestInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  investorType: string;
  range: string;
  heard: string;
};

export type InvestorRequestResult = { ok: true } | { ok: false; error: string };

const INVESTOR_TYPES = ["Angel", "VC", "Individual", "Other"];
const RANGES = ["Under $10k", "$10k – $50k", "$50k – $100k", "$100k+"];

export async function submitInvestorRequest(
  input: InvestorRequestInput
): Promise<InvestorRequestResult> {
  // server-side validation mirroring the client
  if (!input.firstName?.trim() || !input.lastName?.trim())
    return { ok: false, error: "First and last name are required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email ?? ""))
    return { ok: false, error: "Please enter a valid email address." };
  if (!INVESTOR_TYPES.includes(input.investorType) || !RANGES.includes(input.range))
    return {
      ok: false,
      error: "Please select an investor type and investment range.",
    };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key)
    return {
      ok: false,
      error: "Submissions aren't configured yet. Please email investors@directcuts.com.",
    };

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("investor_requests").insert({
    first_name: input.firstName.trim(),
    last_name: input.lastName.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || null,
    investor_type: input.investorType,
    investment_range: input.range,
    heard_about: input.heard?.trim() || null,
  });

  if (error) {
    console.error("investor_requests insert failed:", error.message);
    return {
      ok: false,
      error: "Something went wrong submitting your request. Please try again.",
    };
  }

  return { ok: true };
}
