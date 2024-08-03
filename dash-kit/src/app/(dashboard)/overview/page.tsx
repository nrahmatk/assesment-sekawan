"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/OverviewCard";
import OverviewChart from "@/components/OverviewChart";

const Overview = () => {
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [onHoldCount, setOnHoldCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [receivedCount, setReceivedCount] = useState(0);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [currentDate, setCurrentDate] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await fetch("/api/overview");
      const responseChart = await fetch("/api/charts");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      if (!responseChart.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const dataChart = await responseChart.json();
      return { data, dataChart };
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      if (fetchedData) {
        setData(fetchedData.data);
        setUnresolvedCount(
          fetchedData.data.filter((ticket) => ticket.status === "unresolved")
            .length
        );
        setOverdueCount(
          fetchedData.data.filter((ticket) => ticket.status === "overdue")
            .length
        );
        setOpenCount(
          fetchedData.data.filter((ticket) => ticket.status === "open").length
        );
        setOnHoldCount(
          fetchedData.data.filter((ticket) => ticket.status === "on hold")
            .length
        );
        setResolvedCount(
          fetchedData.data.filter((ticket) => ticket.status === "resolved")
            .length
        );
        setReceivedCount(fetchedData.data.length);
        setChartData(fetchedData.dataChart);
      }
    };
    loadData();

    const date = new Date().toLocaleString("en-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setCurrentDate(date);
  }, []);

  function calculateAverageFirstResponseTime() {
    return "33m";
  }

  function calculateAverageResponseTime() {
    return "3h 8m";
  }

  function calculateResolutionWithinSLA() {
    return "94%";
  }

  return (
    <div className="flex flex-col p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
        <Card title="Unresolved" count={unresolvedCount} />
        <Card title="Overdue" count={overdueCount} />
        <Card title="Open" count={openCount} />
        <Card title="On hold" count={onHoldCount} />
      </div>
      <div className="mt-6 flex flex-col lg:flex-row bg-white rounded-xl border border-gray-200">
        <div className="w-full lg:w-3/4 flex flex-col p-4 lg:p-8">
          <h3 className="font-medium text-xl">Today&apos;s trends</h3>
          <p className="text-sm text-gray-400 mb-1">as of {currentDate}</p>
          <OverviewChart chartData={chartData} />
        </div>
        <div className="w-full lg:flex-1 flex flex-col justify-between text-center border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="flex-1 flex flex-col justify-center p-4 lg:border-b border-gray-100">
            <p className="text-gray-400 mb-1">Resolved</p>
            <p className="text-2xl text-black font-medium">{resolvedCount}</p>
          </div>
          <div className="flex-1 flex flex-col justify-center p-4 lg:border-b border-gray-100">
            <p className="text-gray-400 mb-1">Received</p>
            <p className="text-2xl text-black font-medium">{receivedCount}</p>
          </div>
          <div className="flex-1 flex flex-col justify-center p-4 lg:border-b border-gray-100">
            <p className="text-gray-400 mb-1">Average first response time</p>
            <p className="text-2xl text-black font-medium">
              {calculateAverageFirstResponseTime(data)}
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-center p-4 lg:border-b border-gray-100">
            <p className="text-gray-400">Average response time</p>
            <p className="text-2xl text-black font-medium">
              {calculateAverageResponseTime(data)}
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-center p-4">
            <p className="text-gray-400">Resolution within SLA</p>
            <p className="text-2xl text-black font-medium">
              {calculateResolutionWithinSLA(data)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 my-8">
        <div className="w-full lg:flex-1 rounded-xl bg-white border border-gray-200">
          <div className="p-8 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-xl">Unresolved tickets</h3>
              <p className="text-sm text-gray-400 pt-2">
                Group: <span className="text-gray-800">Support</span>
              </p>
            </div>
            <div className="text-p-blue">
              <Link href="#">View details</Link>
            </div>
          </div>
          <div className="flex justify-between border-b-2 border-gray-200 py-5">
            <div className="px-8">Waiting on Feature Request</div>
            <div className="text-gray-400 px-8">4238</div>
          </div>
          <div className="flex justify-between border-b-2 border-gray-200 py-5">
            <div className="px-8">Awaiting Customer Response</div>
            <div className="text-gray-400 px-8">1005</div>
          </div>
          <div className="flex justify-between border-b-2 border-gray-200 py-5">
            <div className="px-8">Awaiting Developer Fix</div>
            <div className="text-gray-400 px-8">914</div>
          </div>
          <div className="flex justify-between py-5">
            <div className="px-8">Pending</div>
            <div className="text-gray-400 px-8">281</div>
          </div>
        </div>
        <div className="w-full lg:flex-1 rounded-xl bg-white border border-gray-200">
          <div className="p-8 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-xl">Task</h3>
              <p className="text-sm text-gray-400 pt-2">Today</p>
            </div>
            <div className="text-p-blue">
              <Link href="#">View all</Link>
            </div>
          </div>
          <div className="flex justify-between items-center text-center border-b-2 border-gray-200 py-3">
            <input
              type="text"
              className="mx-5 py-2 px-3 w-full"
              placeholder="Create new task"
            ></input>
            <button className="h-7 w-7 rounded-lg text-xl text-gray-400 bg-gray-200 me-8">
              +
            </button>
          </div>
          <div className="flex justify-between border-b-2 border-gray-200 py-5">
            <div className="px-8">Awaiting Customer Response</div>
            <div className="text-gray-400 px-8">1005</div>
          </div>
          <div className="flex justify-between border-b-2 border-gray-200 py-5">
            <div className="px-8">Awaiting Developer Fix</div>
            <div className="text-gray-400 px-8">914</div>
          </div>
          <div className="flex justify-between py-5">
            <div className="px-8">Pending</div>
            <div className="text-gray-400 px-8">281</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
