import React, { useRef, useEffect } from "react";

interface Ticket {
  id: string;
  title: string;
  customerName: string;
  date: string;
  priority: string;
  status: string;
  updated: string;
}

interface TicketModalProps {
  ticket: Ticket;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose, onApprove, onReject }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <div className="text-lg font-semibold mb-4">Ticket Details</div>
        <div className="mb-4">
          <strong>Title:</strong> {ticket.title}
        </div>
        <div className="mb-4">
          <strong>Customer Name:</strong> {ticket.customerName}
        </div>
        <div className="mb-4">
          <strong>Date:</strong> {ticket.date}
        </div>
        <div className="mb-4">
          <strong>Priority:</strong> {ticket.priority}
        </div>
        <div className="mb-4">
          <strong>Status:</strong> {ticket.status}
        </div>
        <div className="mb-4">
          <strong>Updated:</strong> {ticket.updated}
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onApprove} className="bg-green-500 text-white px-4 py-2 rounded-xl">
            Approve
          </button>
          <button onClick={onReject} className="bg-red-500 text-white px-4 py-2 rounded-xl">
            Reject
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-xl">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
