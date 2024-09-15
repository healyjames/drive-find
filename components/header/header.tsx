import Image from "next/image"
import Link from "next/link"

import { HamburgerIcon } from "@/components/icons/icon"
import { auth } from "@/auth"

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface HeaderProps {
    outerClass?: string
}

export const Header = async (props: HeaderProps) => {
    const session = await auth()

    return (
        <div className={`${props.outerClass || ''} top-0 left-0 w-full z-10 flex justify-between items-center p-4 bg-primary-base shadow`}>
            <div className="navbar-start">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <HamburgerIcon />
                </div>
            </div>
            <div>
                <Link href="/" className="btn btn-ghost text-xl">
                    <Image
                        src="/logo/primary.svg"
                        alt=""
                        width={75}
                        height={120}
                        className="self-start"
                    />
                </Link>
            </div>
            <div className="flex flex-row flex-nowrap gap-1">
                {
                    session?.user ? (
                        <Link href="/login" className='rounded-full outline-none hover:outline-secondary-base focus:outline-secondary-base'>
                            <Image
                                src={session?.user?.image ?? `https://ui-avatars.com/api/?name=${session?.user?.name}&format=png`}
                                alt=""
                                width={36}
                                height={36}
                                className="rounded-full"
                            />
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>Open</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>
        </div>
    )
}