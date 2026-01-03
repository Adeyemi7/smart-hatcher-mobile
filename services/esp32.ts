// services/esp32.ts
export type ESP32Data = {
  temperature: number;
  humidity: number;
  alerts: string[];
};

export const fetchESP32Data = async (ip: string): Promise<ESP32Data> => {
  const response = await fetch(ip);
  if (!response.ok) throw new Error("ESP32 fetch failed");
  return await response.json();
};
export const sendESP32Command = async (
  ip: string,
  command: string,
): Promise<void> => {
  const response = await fetch(`${ip}/command`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command }),
  });
  if (!response.ok) throw new Error("ESP32 command failed");
};
