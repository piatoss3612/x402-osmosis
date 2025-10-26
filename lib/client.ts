/**
 * x402 Client Payment Creation for Osmosis (Cosmos SDK)
 */

import { getKeplrFromWindow } from "@keplr-wallet/stores";

import type { PaymentOptions, PaymentPayload, SignedPayment } from "./types";

function createOsmosisMessage(options: PaymentOptions) {
  // TODO: implement this
  throw new Error("Not implemented");
}

export async function signPaymentWithKeplr(
  chainId: string,
  options: PaymentOptions,
): Promise<SignedPayment> {
  const keplr = await getKeplrFromWindow();
  if (!keplr) {
    throw new Error("Keplr not found");
  }

  const signDoc = createOsmosisMessage(options) as unknown as any;

  // Sign using ADR-36 arbitrary signing. Keplr signs the provided string bytes.
  const result = await keplr.signAmino(chainId, options.from, signDoc);

  const paymentPayload: PaymentPayload = {
    x402Version: 1,
    scheme: "exact",
    network: options.network,
    payload: result,
  };

  const paymentHeader = Buffer.from(JSON.stringify(paymentPayload)).toString(
    "base64",
  );

  return { paymentPayload, paymentHeader };
}
