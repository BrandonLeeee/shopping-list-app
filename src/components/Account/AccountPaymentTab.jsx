import { CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const AccountPaymentTab = ({ customerPayments, handlePaymentClick }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardType: "",
  });

  const handleForm = (e) => {
    e.preventDefault();
    handlePaymentClick(cardDetails);
    setCardDetails({
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      cardType: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === "cardNumber") {
      // Remove non-numeric characters
      formattedValue = value.replace(/\D/g, "");

      // Format card number with spaces after every 4 digits
      formattedValue = formattedValue.replace(/(\d{4})/g, "$1 ").trim();

      // Limit input to 16 digits (excluding spaces)
      if (formattedValue.replace(/\s/g, "").length > 16) return;
    }

    if (id === "expiryDate") {
      // Allow only numbers & limit format to MM/YYYY
      formattedValue = value.replace(/\D/g, "").slice(0, 6);

      if (formattedValue.length > 2) {
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
    }

    if (id === "cvc") {
      // Allow only numbers & limit to 3 digits
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setCardDetails((prev) => ({
      ...prev,
      [id]: formattedValue,
    }));
  };

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
      <CardContent className="space-y-4 text-start mt-4">
        <div>
          <h3 className="mb-4 text-lg font-medium">Add New Payment Method</h3>
          <form onSubmit={handleForm} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                maxLength={19}
                value={cardDetails.cardNumber}
                placeholder="1234 5678 9012 3456"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  maxLength={7}
                  value={cardDetails.expiryDate}
                  placeholder="MM/YYYY"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  maxLength={3}
                  placeholder="123"
                  value={cardDetails.cvc}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cardType">Card Type</Label>
                <Select
                  value={cardDetails.cardType}
                  onValueChange={(value) =>
                    setCardDetails((prev) => ({ ...prev, cardType: value }))
                  }
                  required
                >
                  <SelectTrigger id="cardType">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visa">Visa</SelectItem>
                    <SelectItem value="Master">Mastercard</SelectItem>
                    <SelectItem value="Amex">American Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardFooter>
              <Button>Add Payment Method</Button>
            </CardFooter>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountPaymentTab;
