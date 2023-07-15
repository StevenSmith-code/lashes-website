import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Tab, Tabs } from "@mui/material";

function DashboardComponent() {
  const [data, setData] = useState([]);
  const [serviceId, setServiceId] = useState(13);

  const handleTabChange = (event, newServiceId) => {
    setServiceId(newServiceId);
  };
  const fetchData = () => {
    fetch(`/services/${serviceId}/users_with_appointments`)
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    fetchData();
  }, [serviceId]);
  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "username" },
    { header: "Email", accessorKey: "email" },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-[800px]">
      <Tabs
        value={serviceId}
        onChange={handleTabChange}
        aria-label="Service Tabs"
        centered
        sx={{ mb: 5 }}
      >
        <Tab label="Classic Lashes" value={13} />
        <Tab label="Volume Lashes" value={14} />
        <Tab label="Brow Extensions" value={15} />
      </Tabs>
      <table className="w-full">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
        <tbody className="text-center">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardComponent;
