"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("@BonVoyage:token");
        if (!token) {
          router.push("/login"); // Se o usuário não possuir um token, redireciona para a tela de login
        }
      }, []);

    return (
        <div>
            {children}
        </div>
    );
}
