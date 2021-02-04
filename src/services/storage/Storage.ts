export interface IStorage {
  fetchAdminUsers(): Promise<string[]>;
}
