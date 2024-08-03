"use client";

import React, { useState, useEffect } from "react";
import { Ticket, fetchTickets } from "@/helper/tickets";
import SearchInput from "@/components/SearchInput";
import SortButton from "@/components/SortButton";
import FilterMenu from "@/components/FilterMenu";
import TicketModal from "@/components/TicketModal";
import TicketForm from "@/components/TicketForm";
import { formatedDate } from "@/app/helper/date";
import { HiDotsVertical } from "react-icons/hi";

export default function Tickets() {
  const [data, setData] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("updated");
  const [order, setOrder] = useState("asc");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTickets({
        page,
        limit,
        search,
        sort,
        order,
        filterPriority,
        filterStatus,
      });
      setData(response.data);
      setTotalPage(response.totalPage);
    };
    fetchData();
  }, [page, limit, search, sort, order, filterPriority, filterStatus]);

  const handleSortChange = (newSort: string) => {
    if (sort === newSort) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(newSort);
      setOrder("asc");
    }
  };

  const handleFilterPriorityChange = (priority: string) => {
    setFilterPriority(priority);
  };

  const handleFilterStatusChange = (status: string) => {
    setFilterStatus(status);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseDetail = () => {
    setSelectedTicket(null);
  };

  const handleCreate = (ticket: Ticket) => {
    setData([...data, ticket]);
    setShowForm(false);
  };

  const priorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500 text-white";
      case "NORMAL":
        return "bg-green-500 text-white";
      case "LOW":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="flex flex-col w-full m-8 p-8 rounded-xl-lg bg-white border border-gray-200 mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between pb-5">
        <div className="text-lg font-semibold">All Tickets</div>
        <div className="flex flex-wrap gap-4 items-center">
          <SearchInput search={search} setSearch={setSearch} />
          <SortButton onSortChange={handleSortChange} />
          <FilterMenu
            filterPriority={filterPriority}
            filterStatus={filterStatus}
            onFilterPriorityChange={handleFilterPriorityChange}
            onFilterStatusChange={handleFilterStatusChange}
          />
          <button
            onClick={() => setShowForm(true)}
            className="bg-p-blue text-white px-4 py-2 rounded-xl"
          >
            Create Ticket
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Ticket Details</th>
              <th className="px-4 py-2 border-b">Customer Name</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Priority</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Updated</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() => handleTicketClick(ticket)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="px-4 py-2 border-b">
                  <div>{ticket.title}</div>
                  <div className="text-sm text-gray-500">
                    {formatedDate(ticket.updated)}
                  </div>
                </td>
                <td className="px-4 py-2 border-b">{ticket.customerName}</td>
                <td className="px-4 py-2 border-b">
                  {formatedDate(ticket.date)}
                </td>
                <td className="px-4 py-2 border-b">
                  <div
                    className={`px-2 py-1 text-center text-sm rounded-xl ${priorityColor(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority}
                  </div>
                </td>
                <td className="px-4 py-2 border-b">{ticket.status}</td>
                <td className="px-4 py-2 border-b">
                  {formatedDate(ticket.updated)}
                </td>
                <td className="px-4 py-2 border-b">
                  <button className="text-p-blue">
                    <HiDotsVertical className="text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center pt-5">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="px-4 py-2 bg-gray-200 rounded-xl"
        >
          Previous
        </button>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`mx-1 px-3 py-1 ${
              num === page ? "bg-p-blue text-white" : "bg-gray-200"
            } rounded-xl`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setPage(page < totalPage ? page + 1 : totalPage)}
          className="px-4 py-2 bg-gray-200 rounded-xl"
        >
          Next
        </button>
      </div>
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={handleCloseDetail}
          onApprove={() => console.log("Ticket Approved")}
          onReject={() => console.log("Ticket Rejected")}
        />
      )}
      {showForm && (
        <TicketForm
          onCreate={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
