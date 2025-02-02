import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import IsLoading from "@/components/ui/IsLoading";
import AccountTabs from "@/components/Account/AccountTabs";
import useFirestore from "@/hooks/useFirestore";

export default function Account() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(AuthContext);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [customerOrders, setCustomerOrders] = useState(null);
  const [customerPayments, setCustomerPayments] = useState(null);
  const { addUserPayment, getUserById, updateUserData } = useFirestore();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;
      try {
        const userData = await getUserById(user.id);
        setCustomerInfo(userData.userInfo);
        setCustomerOrders(userData.userOrders);
        setCustomerPayments(userData.userPayments);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [user]);

  const handleEditToggle = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await updateUserData(user.id, customerInfo);
      } catch (error) {
        console.error("Failed to update user profile:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handlePaymentClick = async (paymentData) => {
    try {
      await addUserPayment(user.id, paymentData);
      const userData = await getUserById(user.id);
      setCustomerPayments(userData.userPayments);
    } catch (error) {
      console.error("Failed to add payment method:", error);
    }
  };

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  if (!customerInfo) {
    return (
      <div className="min-h-[70vh] sm:min-h-90 flex justify-center items-center">
        <IsLoading />
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col mx-auto w-full max-w-[1382px] px-2 360:py-0 360:px-2">
        <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8 md:y-6">
          <AccountTabs
            customerInfo={customerInfo}
            customerOrders={customerOrders}
            customerPayments={customerPayments}
            handleCustomerInfoChange={handleCustomerInfoChange}
            handlePaymentClick={handlePaymentClick}
            handleEditToggle={handleEditToggle}
            isEditing={isEditing}
          />
        </main>
      </div>
    </div>
  );
}
