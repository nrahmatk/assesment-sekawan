import React, { useState, useRef, useEffect } from "react";

interface Ticket {
  title: string;
  customerName: string;
  date: string;
  priority: string;
  status: string;
}

interface TicketFormProps {
  onCreate: (ticket: Ticket) => void;
  onClose: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ onCreate, onClose }) => {
  const [ticket, setTicket] = useState<Ticket>({
    title: "",
    customerName: "",
    date: "",
    priority: "LOW",
    status: "unresolved",
  });

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(ticket);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={formRef}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <div className="text-lg font-semibold mb-4">Create Ticket</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={ticket.title}
              onChange={handleChange}
              className="border rounded-xl px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={ticket.customerName}
              onChange={handleChange}
              className="border rounded-xl px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={ticket.date}
              onChange={handleChange}
              className="border rounded-xl px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={ticket.priority}
              onChange={handleChange}
              className="border rounded-xl px-2 py-1 w-full"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={ticket.status}
              onChange={handleChange}
              className="border rounded-xl px-2 py-1 w-full"
            >
              <option value="unresolved">Unresolved</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
