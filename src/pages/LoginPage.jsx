import { Cpu } from "lucide-react";

import { LoginForm } from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex xs:min-h-90 flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Cpu className="size-4" />
          </div>
          Lee Tech.
        </a>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
