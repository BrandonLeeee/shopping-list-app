import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import NewCard from "../NewCard";

const AccountPaymentTab = ({ customerPayments, handlePaymentClick }) => {
  return (
    <Card className="p-6 flex flex-col items-center text-center">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Payment Method</CardTitle>
        <CardDescription className="text-gray-500">
          Manage your payment information
        </CardDescription>
      </CardHeader>

      {!customerPayments?.length ? (
        <CardContent className="py-4 mb-8">
          <p className="text-gray-600">No payment methods available</p>
        </CardContent>
      ) : (
        <CardContent className="space-y-4 text-start">
          <div className="flex flex-wrap  justify-center gap-4">
            {customerPayments.map((card, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 rounded-md border p-4 max-w-[250px] w-full "
              >
                <CreditCard />
                <div className="flex-1 space-y-1 ">
                  <p className="text-sm font-medium leading-none">
                    {card.cardType} ending in {card.cardNumber.slice(-4)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Expires {card.expiryDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
      <Separator />
      {customerPayments.length >= 5 ? (
        <div className="mt-5">You can only save up to 5 payment methods.</div>
      ) : (
        <NewCard handlePaymentClick={handlePaymentClick} />
      )}
    </Card>
  );
};

export default AccountPaymentTab;
