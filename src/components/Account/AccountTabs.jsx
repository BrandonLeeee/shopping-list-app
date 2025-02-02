import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountProfileTab from "./AccountProfileTab";
import AccountPaymentTab from "./AccountPaymentTab";
import AccountOrdersTab from "./AccountOrdersTab";

const AccountTabs = ({
  customerInfo,
  customerOrders,
  customerPayments,
  handleCustomerInfoChange,
  handleEditToggle,
  handlePaymentClick,
  isEditing,
}) => {
  return (
    <>
      <Tabs defaultValue="order" className="space-y-4">
        <TabsList>
          <TabsTrigger value="order">Orders</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="order">
          <AccountOrdersTab customerOrders={customerOrders} />
        </TabsContent>
        <TabsContent value="profile">
          <AccountProfileTab
            customerInfo={customerInfo}
            handleCustomerInfoChange={handleCustomerInfoChange}
            handleEditToggle={handleEditToggle}
            isEditing={isEditing}
          />
        </TabsContent>
        <TabsContent value="payment">
          <AccountPaymentTab
            customerPayments={customerPayments}
            handlePaymentClick={handlePaymentClick}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AccountTabs;
