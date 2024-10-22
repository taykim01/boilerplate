import { createClient } from "../infrastructures/supabase";
import TABLES from "../infrastructures/supabase/tables";

export default class DBRepository<Entity> {
  constructor(public table: keyof typeof TABLES) {}
  serverClient = createClient();

  async create(requestData: Partial<Entity>): Promise<string> {
    const { data, error } = await this.serverClient
      .from(this.table)
      .insert(requestData)
      .select("id");
    if (error) throw new Error(error.message);
    return data[0].id;
  }

  async read(query: { [key: string]: string }): Promise<Entity[]> {
    let querySnapshot = this.serverClient.from(this.table).select("*");
    for (const key in query) {
      querySnapshot = querySnapshot.eq(key, query[key]);
    }
    const { data, error } = await querySnapshot;
    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, requestData: Partial<Entity>) {
    const { data, error } = await this.serverClient
      .from(this.table)
      .update(requestData)
      .eq("id", id)
      .select("id");
    if (error) throw new Error(error.message);
    return data;
  }

  async delete(id: string) {
    const { data, error } = await this.serverClient
      .from(this.table)
      .delete()
      .eq("id", id)
      .select("id");
    if (error) throw new Error(error.message);
    return data;
  }
}
