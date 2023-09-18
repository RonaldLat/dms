/** @type {import('./$types').PageLoad} */
import { supabase } from "$lib/supabaseClient.js";


export async function load({ params }) {
  const { data: { user } } = await supabase.auth.getUser()
  let { data: notes, error } = await supabase
    .from("notes")
    .select()
    .eq('authorID', user.id)
  //$notes = data;
  console.log("error", error);
  console.log("user", user.id);
  return {
    notes
  };
}
