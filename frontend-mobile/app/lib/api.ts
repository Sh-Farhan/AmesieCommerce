// app/lib/api.ts
import { Platform } from "react-native";

export const API_BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:8001"
    : "http://192.168.1.7:8001"; // Wi-Fi IP

// 👇 REAL backend endpoint from docs
const ORDER_ENDPOINT = "/api/mobile-coffee-orders";

export interface CoffeeOrderPayload {
  items: {
    id: string;
    name: string;
    size: string;
    ml: number;
    qty: number;
    price: number;
  }[];
  address: string;
  note?: string;
  total: number;
  createdAt: string;
}

export async function submitCoffeeOrder(
  order: CoffeeOrderPayload,
  token?: string
) {
  const res = await fetch(`${API_BASE_URL}${ORDER_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.log("ORDER SUBMIT ERROR:", res.status, text);
    throw new Error(`Order submit failed: ${res.status} ${text}`);
  }

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return res.json();
  }
  return null;
}
