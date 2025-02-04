import { CreditCard, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import NewCard from "./NewCard";

export default function PaymentModal({
  savedCards,
  handleAddOrder,
  handlePaymentClick,
}) {
  const [showNewPayment, setShowNewPayment] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectCard = (card) => {
    setSelectedCard(card.id);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setSelectedCard(null);
      }}
    >
      <DialogTrigger asChild>
        <Button>Go to checkout</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Methods</DialogTitle>
        </DialogHeader>

        {!showNewPayment ? (
          <div className="space-y-6">
            <div className="space-y-4">
              {savedCards.length === 0 && (
                <div className="text-gray-600">
                  No payment methods available
                </div>
              )}
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleSelectCard(card)}
                  className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer
            ${
              selectedCard === card.id
                ? "bg-gray-500 text-white"
                : "hover:bg-gray-100 hover:text-accent-foreground"
            }
          `}
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-md border p-2">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div className="text-start">
                      <p className="font-medium">
                        {card.cardType} ending in {card.cardNumber.slice(-4)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {card.expiryDate}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div>
              {savedCards.length >= 5 ? (
                <div>You can only save up to 5 payment methods.</div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowNewPayment(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add new payment method
                </Button>
              )}
            </div>
            {selectedCard && (
              <Button onClick={handleAddOrder}>Complete Order</Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <Button
              variant="ghost"
              className="mb-2 -ml-4 h-auto p-4 text-sm"
              onClick={() => setShowNewPayment(false)}
            >
              ← Back to saved cards
            </Button>

            <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="card"
                  className="max-h-[82px] flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-black [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-2 h-6 w-6" />
                  Card
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="paypal"
                  id="paypal"
                  className="peer sr-only"
                  disabled
                />
                <Label
                  htmlFor="paypal"
                  className="max-h-[82px] flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <img
                    src="https://www.svgrepo.com/show/394337/paypal-p.svg"
                    alt="PayPal"
                    width={24}
                    height={24}
                    className="mb-2"
                  />
                  Paypal
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="apple"
                  id="apple"
                  className="peer sr-only"
                  disabled
                />
                <Label
                  htmlFor="apple"
                  className="max-h-[82px] flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/625px-Apple_logo_black.svg.png"
                    alt="Apple"
                    width={24}
                    height={24}
                    className="mb-2"
                  />
                  Apple
                </Label>
              </div>
            </RadioGroup>

            <NewCard
              handlePaymentClick={handlePaymentClick}
              setShowNewPayment={setShowNewPayment}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
