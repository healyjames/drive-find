import React from "react"
import Image from "next/image"

export const LogoAnimation = () => {

    return (
        <React.Fragment>
            <div className="flex flex-col justify-center items-center gap-4">
                <Image
                    src="/logo/primary.svg"
                    alt=""
                    width={120}
                    height={120} 
                    className="animate-flip"
                />
                <div className="h-4 w-full bg-[#000] rounded-[50%] opacity-20"></div>
            </div>
        </React.Fragment>
    )
}