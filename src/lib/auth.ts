import { supabase } from "./supabase";

export async function getUser() {
  // check existing session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    // create anonymous user - no OTP, no email
    const { error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Failed to get user");
  
  return user;
}
