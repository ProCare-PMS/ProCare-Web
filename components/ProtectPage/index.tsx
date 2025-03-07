"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, ComponentType } from "react";

const ProtectPage = (
  WrappedComponent: ComponentType<any>,
  allowedRoles: string[]
) => {
  const ProtectedComponent = (props: any) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
      const userdata = localStorage.getItem("user");
      const parsedUser = userdata ? JSON.parse(userdata) : null;
      setUser(parsedUser);

      if (!parsedUser) {
        router.push("/login");
      } else if (
        !allowedRoles.some((role) => parsedUser.roles?.includes(role))
      ) {
        router.push("/403");
      }
    }, [router]);

    if (!user || !allowedRoles.some((role) => user.roles?.includes(role))) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Fix ESLint warning by assigning a display name
  ProtectedComponent.displayName = `ProtectPage(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ProtectedComponent;
};

export default ProtectPage;
