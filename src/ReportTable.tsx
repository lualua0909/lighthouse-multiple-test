import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Result } from "./App";

export const ReportTable = ({
  data
}: {
  data: { name: string; result: Result | null }[];
}) => {
  const tableRef = useRef(null);

  return (
    <div>
      <DownloadTableExcel
        filename="Lighthouse report"
        sheet="Report"
        currentTableRef={tableRef.current}
      >
        <button> Export excel </button>
      </DownloadTableExcel>

      <table ref={tableRef}>
        <tbody>
          <tr>
            <th>VIEW NAME</th>
            <th>Overall Score</th>
            <th>LCP</th>
            <th>FCP</th>
            <th>TBT</th>
            <th>CLS</th>
          </tr>

          {data.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item?.name}</td>
              <td>{item?.result?.totalScore}</td>
              <td>{item?.result?.lcp}</td>
              <td>{item?.result?.fcp}</td>
              <td>{item?.result?.tbt}</td>
              <td>{item?.result?.cls}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
