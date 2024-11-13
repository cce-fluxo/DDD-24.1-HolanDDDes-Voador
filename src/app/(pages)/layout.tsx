"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("@BonVoyage:token"); // Retrieve token from localStorage
        if (!token) {
          router.push("/login"); // If there's no token, redirect to the authentication page
        }
      }, []);

    return (
        <div>
            {children}
        </div>
    );
}
