export interface NewPaymentRequest {
  fromAccount: string;
  toAccount: string;
  recipient: string;
  fromAmount: number;
  paymentCode: string;
  paymentPurpose: string;
  referenceNumber: string;
  saveRecipient: boolean;
  otpCode: string;
}
