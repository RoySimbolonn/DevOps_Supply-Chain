import { Card, Typography } from "@material-tailwind/react";

export function TableWithStripedColumns() {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              ></Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
