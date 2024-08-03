'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = false; 

    if (!isAuthenticated) {
      router.push('/login'); 
    }
  }, [router]);
  return null
}
