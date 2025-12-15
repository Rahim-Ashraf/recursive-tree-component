"use client"

import Card from "@/src/components/Card";
import { RootState } from "@/src/lib/redux/store";
import { useSelector } from "react-redux";

export default function Home() {
  const rootNode = useSelector((state: RootState) => state.cards)
  return (
    <main className="px-4 py-2">
      <Card item={rootNode} />
    </main>
  );
}
