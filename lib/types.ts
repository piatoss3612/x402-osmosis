import { Coin, StdSignDoc, StdSignature } from "@keplr-wallet/types";

// Protocol version
export const X402_VERSION = 1;

// Osmosis networks
export const OSMOSIS_SCHEME = "exact";
export const OSMOSIS_MAINNET = "osmosis";
export const OSMOSIS_TESTNET = "osmo-test"; // chain identifier

// Route Configuration
export interface RouteConfig {
  price: string;
  network?: string;
  config?: {
    description?: string;
    mimeType?: string;
    outputSchema?: object | null;
    maxTimeoutSeconds?: number;
  };
}

// Facilitator Configuration
export interface FacilitatorConfig {
  url: string;
}

export interface PaymentRequirements {
  /** Scheme of the payment protocol to use (e.g., "exact") */
  scheme: string;

  /** Network of the blockchain to send payment on (e.g., "testnet", "mainnet") */
  network: string;

  /** Maximum amount required to pay for the resource in atomic units */
  maxAmountRequired: string;

  /** URL of resource to pay for */
  resource: string;

  /** Description of the resource */
  description: string;

  /** MIME type of the resource response */
  mimeType: string;

  /** Output schema of the resource response (optional) */
  outputSchema?: object | null;

  /** Address to pay value to */
  payTo: string;

  /** Maximum time in seconds for the resource server to respond */
  maxTimeoutSeconds: number;

  /** Extra information about the payment details specific to the scheme */
  extra?: object | null;
}

/**
 * Payment Required Response (402 response body)
 */
export interface PaymentRequiredResponse {
  /** Version of the x402 payment protocol */
  x402Version: number;

  /** List of payment requirements that the resource server accepts */
  accepts: PaymentRequirements[];

  /** Error message (optional) */
  error?: string;
}

export interface PaymentPayload {
  /** Version of the x402 payment protocol */
  x402Version: number;

  /** Scheme value of the accepted paymentRequirements */
  scheme: string;

  /** Network id of the accepted paymentRequirements */
  network: string;
  payload: {
    signed: StdSignDoc;
    signature: StdSignature;
  };
}

/**
 * Facilitator /verify endpoint request
 */
export interface VerifyRequest {
  /** Version of the x402 payment protocol */
  x402Version: number;

  /** The X-PAYMENT header value (base64 encoded PaymentPayload) */
  paymentHeader: string;

  /** The payment requirements being verified against */
  paymentRequirements: PaymentRequirements;
}

/**
 * Facilitator /verify endpoint response
 */
export interface VerifyResponse {
  /** Whether the payment is valid */
  isValid: boolean;

  /** Reason for invalidity (if isValid is false) */
  invalidReason: string | null;
}

/**
 * Facilitator /settle endpoint request
 */
export interface SettleRequest {
  /** Version of the x402 payment protocol */
  x402Version: number;

  /** The X-PAYMENT header value (base64 encoded PaymentPayload) */
  paymentHeader: string;

  /** The payment requirements being settled */
  paymentRequirements: PaymentRequirements;
}

/**
 * Facilitator /settle endpoint response
 */
export interface SettleResponse {
  /** Whether the payment was successful */
  success: boolean;

  /** Error message from the facilitator server (if success is false) */
  error: string | null;

  /** Transaction hash of the settled payment */
  txHash: string | null;

  /** Network id of the blockchain the payment was settled on */
  networkId: string | null;
}

/**
 * X-PAYMENT-RESPONSE header content (base64 encoded JSON)
 */
export interface PaymentResponseHeader {
  /** Settlement response from facilitator */
  settlement: SettleResponse;
}

export interface PaymentOptions {
  from: string;
  to: string;
  coin: Coin[];
  memo: string;
  network: string;
}

export interface SignedPayment {
  paymentPayload: PaymentPayload;
  paymentHeader: string;
}
