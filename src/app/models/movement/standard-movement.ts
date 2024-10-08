export interface StandardMovementI {
  movementId: number;
  productId: number;
  productName: string;
  productPresentation: string;
  dateTime: string;
  type: string;
  subtype: string;
  reason: string;
  comment: string;
  quantity: number;
}
