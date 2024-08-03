import { NextRequest, NextResponse } from "next/server";
import data from "../data.json";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "updated";
    const order = searchParams.get("order") || "asc";
    const filterPriority = searchParams.get("filterPriority") || "";
    const filterStatus = searchParams.get("filterStatus") || "";

    let tickets = data.tickets;

    if (filterPriority) {
      tickets = tickets.filter((ticket) => ticket.priority === filterPriority);
    }

    if (filterStatus) {
      tickets = tickets.filter((ticket) => ticket.status === filterStatus);
    }

    if (search) {
      tickets = tickets.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(search.toLowerCase()) ||
          ticket.customerName.toLowerCase().includes(search.toLowerCase())
      );
    }

    tickets = tickets.sort((a, b) => {
      if (sort === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sort === "customerName") {
        return order === "asc"
          ? a.customerName.localeCompare(b.customerName)
          : b.customerName.localeCompare(a.customerName);
      }
      return order === "asc"
        ? new Date(a.updated).getTime() - new Date(b.updated).getTime()
        : new Date(b.updated).getTime() - new Date(a.updated).getTime();
    });

    const totalData = tickets.length;
    const totalPage = Math.ceil(totalData / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedTickets = tickets.slice(start, end);

    return NextResponse.json({
      page,
      data: paginatedTickets,
      totalData,
      totalPage,
      dataPerPage: limit,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}
