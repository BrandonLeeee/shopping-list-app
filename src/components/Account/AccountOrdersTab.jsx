import { Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AccountOrdersTab = ({ customerOrders }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB");
  };

  if (!customerOrders || customerOrders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>No orders found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Sort orders by descending date
  customerOrders = customerOrders.sort(
    (dateA, dateB) =>
      (dateB.createdAt.seconds || 0) - (dateA.createdAt.seconds || 0)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>
          View your recent orders and their details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="hidden xs:table-cell">Total</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerOrders.map((order, index) => (
              <TableRow key={order.id} className="text-center">
                <TableCell className="truncate  max-w-[70px]  overflow-hidden">
                  {order.id}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {formatDate(order.createdAt.seconds)}
                </TableCell>
                <TableCell className="hidden xs:table-cell">
                  ${order.totalCart}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  Processing
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                          Order ID: {order.id}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label
                            htmlFor="items"
                            className="text-right mb-4 text-md font-semibold"
                          >
                            Items
                          </Label>
                          <ul>
                            {order.items.map((item, index) => (
                              <li
                                className="flex items-center  justify-between space-x-4 my-4 mx-10"
                                key={index}
                              >
                                <div>
                                  <span className="font-semibold">
                                    {item.qty}x{" "}
                                  </span>
                                  <span>{item.title}</span>
                                </div>
                                <p>${item.price}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="total"
                            className="text-right text-md font-semibold"
                          >
                            Total
                          </Label>
                          <div className="col-span-3">{order.totalCart}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="date"
                            className="text-right text-md font-semibold"
                          >
                            Date
                          </Label>
                          <div className="col-span-3">
                            {formatDate(order.createdAt.seconds)}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="status"
                            className="text-right text-md font-semibold"
                          >
                            Status
                          </Label>
                          <div className="col-span-3">Processing</div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AccountOrdersTab;
