'use client'
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';

const fetchData = async (url: string) => {
    const response = await fetch(url);
    return response.json();
};

const Overview = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchOverviewData = async () => {
            const totalUnresolved = await fetchData('/api/total-unresolved');
            const totalOverview = await fetchData('/api/total-overview');
            const totalOpen = await fetchData('/api/total-open');
            const totalOnHold = await fetchData('/api/total-on-hold');
            const ticketsGraph = await fetchData('/api/tickets-graph');
            const unresolvedTickets = await fetchData('/api/unresolved-tickets');
            const latestTasks = await fetchData('/api/latest-tasks');
            const notifications = await fetchData('/api/notifications');

            setData({
                totalUnresolved,
                totalOverview,
                totalOpen,
                totalOnHold,
                ticketsGraph,
                unresolvedTickets,
                latestTasks,
                notifications,
            });
        };

        fetchOverviewData();
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div className="flex">
            <main className="flex-1 p-4">
                <header className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="text-lg font-bold">Overview</div>
                        <input
                            type="text"
                            placeholder="Search tasks"
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="bg-gray-200 p-2 rounded-full">
                                🔔
                            </button>
                            {/* Notification dropdown */}
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                                {data.notifications.map((notif: any, index: number) => (
                                    <div key={index} className="p-2 border-b last:border-0">
                                        {notif.message}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    </div>
                </header>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">Unresolved</h3>
                        <p>{data.totalUnresolved.count}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">Overview</h3>
                        <p>{data.totalOverview.count}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">Open</h3>
                        <p>{data.totalOpen.count}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-bold mb-2">On Hold</h3>
                        <p>{data.totalOnHold.count}</p>
                    </div>
                </section>
                <section className="mb-6">
                    <h3 className="text-lg font-bold mb-4">Today's trends</h3>
                    {/* Add your graph component here, e.g., a chart.js or other graph library */}
                    <div className="bg-white p-4 rounded shadow">
                        {/* Example: <GraphComponent data={data.ticketsGraph} /> */}
                    </div>
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Unresolved Tickets</h3>
                        <div className="bg-white p-4 rounded shadow">
                            <ul>
                                {data.unresolvedTickets.map((ticket: any, index: number) => (
                                    <li key={index} className="p-2 border-b last:border-0">
                                        {ticket.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Tasks</h3>
                        <div className="bg-white p-4 rounded shadow">
                            <ul>
                                {data.latestTasks.map((task: any, index: number) => (
                                    <li key={index} className="p-2 border-b last:border-0">
                                        {task.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Overview;
