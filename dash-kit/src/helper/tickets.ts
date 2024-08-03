export interface Ticket {
  id: string;
  title: string;
  customerName: string;
  date: string;
  priority: string;
  status: string;
  updated: string;
}

export const fetchTickets = async (params: {
  page: number;
  limit: number;
  search: string;
  sort: string;
  order: string;
  filterPriority: string;
  filterStatus: string;
}) => {
  try {
    const query = new URLSearchParams({
      ...params,
      page: params.page.toString(),
      limit: params.limit.toString(),
    }).toString();

    const response = await fetch(`/api/tickets?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching tickets");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { data: [], totalPage: 1 };
  }
};
