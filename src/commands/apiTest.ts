import axios from "axios";

export async function apiTest(url: string) {
  try {
    const start = Date.now();

    const response = await axios.get(url);

    const duration = Date.now() - start;

    console.log(`Status: ${response.status}`);
    console.log(`Response Time: ${duration}ms`);
  } catch (error) {
    console.error("Request failed");
  }
}