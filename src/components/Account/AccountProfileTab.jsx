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
import { Button } from "@/components/ui/button";
import IsLoading from "@/components/ui/IsLoading";
import { useLoading } from "@/contexts/LoadingContext";

const AccountProfileTab = ({
  customerInfo,
  handleCustomerInfoChange,
  handleEditToggle,
  isEditing,
}) => {
  const { loading } = useLoading();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Customer Information</CardTitle>
        <CardDescription>
          View and edit your personal information
        </CardDescription>
      </CardHeader>
      <CardContent className="text-start">
        <form onSubmit={handleEditToggle}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleCustomerInfoChange}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange}
                disabled
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={customerInfo.phoneNumber}
                onChange={handleCustomerInfoChange}
                disabled
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleCustomerInfoChange}
                disabled={!isEditing}
                required
              />
            </div>
          </div>
          <CardFooter>
            {loading ? (
              <>
                <IsLoading /> <p className="mx-2">Saving...</p>
              </>
            ) : (
              <Button>{isEditing ? "Save Changes" : "Edit Profile"}</Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountProfileTab;
