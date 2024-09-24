export interface StandardMovementI {
  movementId: number;
  productId: number;
  productName: string;
  productPresentation: string;
  dateTime: Date;
  type: string;
  subtype: string;
  reason: string;
  comment: string;
  quantity: number;
}
