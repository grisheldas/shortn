import supabase, { supabaseUrl } from "./supabase";

export const getUrls = async (user_id: string) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;
};

export const deleteUrl = async (id: string) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to delete URL");
  }
  return data;
};

export const createUrl = async (
  { title, longUrl, customUrl, user_id }: any,
  qrcode: any
) => {
  const shortUrl = Math.random().toString(36).substring(2, 6);
  const __filename = `QR-${shortUrl}`;

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(__filename, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs//${__filename}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url: shortUrl,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Unable to create short URL");
  }
  return data;
};
