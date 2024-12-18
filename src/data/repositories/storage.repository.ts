import { createClient } from "../infrastructures/supabase";
import BUCKETS from "../infrastructures/supabase/buckets";

export default class StorageRepository {
  constructor(public bucketName: keyof typeof BUCKETS) {}

  async uploadFile(file: File, filePath: string): Promise<string> {
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .upload(filePath, file);
    if (error) throw new Error(error.message);

    const fileURL = data.fullPath;
    return fileURL;
  }

  async uploadBase64(base64String: string, filePath: string) {
    const supabase = await createClient();
    const stoargeRef = supabase.storage.from(this.bucketName);
    const base64 = base64String.split("base64,")[1];
    const buffer = Buffer.from(base64, "base64");
    const { error } = await stoargeRef.upload(filePath, buffer, {
      contentType: "image/png",
      upsert: true,
    });
    if (error) throw new Error(error.message);

    const fileURL = stoargeRef.getPublicUrl(filePath).data.publicUrl;
    return fileURL;
  }
}
