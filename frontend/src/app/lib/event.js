import sendRequest from "@/app/lib/request";

export async function getEvents() {
    const response = await sendRequest("/api/events", "GET");

    if (response.status !== 200) {
        throw new Error('Failed to fetch calendar events');
    }

    const json = await response.json();
    return json.events;
}