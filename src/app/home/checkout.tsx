'use client'

import Boxcheckout from "./boxcheckout";
import Box0checkout from "./box0checkout"

export default function Checkout() {
    return(
        <div className=" flex gap-[24px] overflow-x-auto">
            <Box0checkout/>
        </div>
    )
}