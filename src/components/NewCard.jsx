import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import IsLoading from "./ui/IsLoading";

const NewCard = ({ handlePaymentClick, setShowNewPayment }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardType: "",
  });

  const handleForm = async (e) => {
    e.preventDefault();
    setIsAddingCard(true);
    try {
      await handlePaymentClick(cardDetails);
      setCardDetails({
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        cardType: "",
      });
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setIsAddingCard(false);
      if (setShowNewPayment) {
        setShowNewPayment(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { id: inputId, value } = e.target;
    let formattedValue = value;

    if (inputId === "cardNumber") {
      // Remove non-numeric characters
      formattedValue = value.replace(/\D/g, "");

      // Limit input to 16 digits (excluding spaces)
      if (formattedValue.replace(/\s/g, "").length > 16) return;

      // Format card number with spaces after every 4 digits
      formattedValue = formattedValue.replace(/(\d{4})/g, "$1 ").trim();
    }

    if (inputId === "expiryDate") {
      // Allow only numbers & limit format to MM/YYYY
      formattedValue = value.replace(/\D/g, "").slice(0, 6);

      if (formattedValue.length > 2) {
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
    }

    if (inputId === "cvc") {
      // Allow only numbers & limit to 3 digits
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setCardDetails((prev) => ({
      ...prev,
      [inputId]: inputId === "cardType" ? value : formattedValue,
    }));
  };

  return (
    <div>
      <CardContent className="space-y-4 text-start mt-4">
        <div>
          <h3 className="mb-4 text-lg font-medium">Add New Payment Method</h3>
          <form onSubmit={handleForm} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                maxLength={19}
                minLength={19}
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
                  minLength={7}
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
                  minLength={3}
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
                    handleInputChange({ target: { id: "cardType", value } })
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
            <CardFooter className="flex justify-center">
              {isAddingCard ? (
                <>
                  <IsLoading /> <p className="mx-2">Saving...</p>
                </>
              ) : (
                <Button>Add Payment Method</Button>
              )}
            </CardFooter>
          </form>
        </div>
      </CardContent>
    </div>
  );
};

export default NewCard;
