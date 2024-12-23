import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

interface MaterialGroup {
  id: number;
  name: string;
  code: string;
  parent?: MaterialGroup;
}

const initialMaterialGroups: MaterialGroup[] = [
  {
    id: 1,
    name: "Level 1 - Metal",
    code: "m.01",
    parent: {
      id: 2,
      name: "Level 2 - Alloys",
      code: "a.01",
      parent: {
        id: 3,
        name: "Level 3 - Base Materials",
        code: "b.01",
        parent: {
          id: 4,
          name: "Level 4 - Raw Materials",
          code: "r.01",
          parent: {
            id: 5,
            name: "Level 5 - Mining Products",
            code: "mp.01",
          },
        },
      },
    },
  },
];

const renderParentHierarchy = (parent: MaterialGroup | undefined): JSX.Element[] => {
  if (!parent) return [];
  return [
    <div key={parent.id} style={{ paddingLeft: "20px", fontStyle: "italic", color: "gray" }}>
      <strong>Parent:</strong> {parent.name} ({parent.code})
    </div>,
    ...renderParentHierarchy(parent.parent), // Recursive çağrı ile tüm seviyeleri getir
  ];
};

const MaterialGroupTable = () => {
  const columns: ColumnDef<MaterialGroup>[] = [
    {
      id: "expander",
      header: "",
      cell: ({ row }) =>
        row.getCanExpand() ? (
          <button onClick={row.getToggleExpandedHandler()}>
            {row.getIsExpanded() ? "▼" : "▶"}
          </button>
        ) : null,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Code",
      accessorKey: "code",
    },
    {
      header: "Parent",
      cell: ({ row }) =>
        row.original.parent
          ? `${row.original.parent.name} (${row.original.parent.code})`
          : "No Parent",
    },
  ];

  const table = useReactTable({
    data: initialMaterialGroups,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => !!row.original.parent,
  });

  return (
    <table style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%" }}>
      <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              style={{
                border: "1px solid black",
                padding: "8px",
                background: "#f4f4f4",
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody>
      {table.getRowModel().rows.map((row) => (
        <React.Fragment key={row.id}>
          <tr>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
          {/* Expanded Row for Recursive Parents */}
          {row.getIsExpanded() && row.original.parent && (
            <tr>
              <td colSpan={columns.length}>
                {renderParentHierarchy(row.original.parent)}
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
      </tbody>
    </table>
  );
};

export default MaterialGroupTable;
