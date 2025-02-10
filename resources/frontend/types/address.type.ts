export type Address = {
  id: string;
  house_no: string | null;
  street: string | null;
  city: string | null;
  country: string | null;
  zip_code: string | null;
  is_primary: boolean;
  latitude: number | null;
  longitude: number | null;
  updated_at: Date;
  created_at: Date;
}
