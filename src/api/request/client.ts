export interface CreatePaymentRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  recipient: string;
  paymentCode: string;
  referenceNumber: string;
  paymentPurpose: string;
}

export interface SentCodeRequest {
  content: string;
  paymentId: string;
}
