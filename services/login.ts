import { BASE_URL } from "@/lib/consts";
import { LoginErrorResponse, LoginResponse } from "@/types/login";

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result: LoginErrorResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Login failed");
  }

  return result;
};
