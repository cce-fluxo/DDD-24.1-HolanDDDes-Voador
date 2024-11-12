"use client";

import Boxcheckin from "./boxcheckin";
import Box0checkin from "./box0checkin";

export default function Checkin() {
  return (
    <div className=" flex gap-[24px] overflow-x-auto">
      <Boxcheckin></Boxcheckin>
      <Boxcheckin></Boxcheckin>
      <Boxcheckin></Boxcheckin>
    </div>
  );
}
