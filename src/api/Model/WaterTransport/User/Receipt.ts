import { User } from "./user";
import { ShipDetails } from "../Admin/ShipInterface";
import { Payment } from "./Payment";

export interface ReceiptDTO {
    receiptId: number;
    amount: number;
    date: string;
    payment: Payment
    user: User;
    ship: ShipDetails;
  }