import * as React from "react";
import AppRoute from "./route/AppRoute";
import { useAppSelector } from "./store/store";

export default function App() {
  return (
    <div className="w-[100vw] h-[100vh]">
      <AppRoute />
    </div>
  );
}
