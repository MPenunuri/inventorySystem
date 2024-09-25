export interface MovementEntityI {
  user_id: number;
  id: number;
  product_id: number;
  date_time: Date;
  type: string;
  subtype: string;
  reason: string;
  comment: string;
  quantity: number;
  supplier_id: number | null;
  from_location_id: number | null;
  to_location_id: number | null;
  transaction_type: string | null;
  transaction_subtype: string | null;
  transaction_value: number | null;
  transaction_currency_id: number | null;
}
