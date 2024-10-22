import { createClient } from "../infrastructures/supabase";
import { decode } from "base64-arraybuffer";
import BUCKETS from "../infrastructures/supabase/buckets";

export default class StorageRepository {
  supabase = createClient();

  constructor(public bucketName: keyof typeof BUCKETS) {}

  async uploadFile(file: File, filePath: string): Promise<string> {
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(filePath, file);
    if (error) throw new Error(error.message);

    const fileURL = data.fullPath;
    return fileURL;
  }

  async uploadBase64(base64String: string, filePath: string) {
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(filePath, decode(base64String), {
        contentType: "image/png",
        upsert: true,
      });
    if (error) throw new Error(error.message);

    const storageRef = data.fullPath;
    const fileURL =
      "https://fptovmbgnongnwzkdmdj.supabase.co/storage/v1/object/public/" +
      storageRef;
    return fileURL;
  }
}
