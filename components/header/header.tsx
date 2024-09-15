import Image from "next/image"
import Link from "next/link"

import { auth, signOut } from "@/auth"
import { PersonIcon } from "@radix-ui/react-icons"
import { HamburgerIcon } from "@/components/icons/icon"

import { Menu } from "@/components/menu/menu"

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { 
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"

interface HeaderProps {
    outerClass?: string
    removeLogo?: boolean
}

export const Header = async (props: HeaderProps) => {
    const session = await auth()

    return (
        <div className={`${props.outerClass || ''} top-0 left-0 w-full z-10 flex justify-between items-center p-4 bg-primary-base shadow`}>
            <Menu />
            {!props.removeLogo && (
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
            )}
            <div className="flex flex-row flex-nowrap gap-1">
                {
                    session?.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Link href="/login" className='rounded-full outline-none hover:outline-secondary-base focus:outline-secondary-base'>
                                    <Avatar>
                                        <AvatarImage src={session.user.image || undefined} alt="User avatar profile image" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                </Link>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <form
                                            action={async () => {
                                                "use server"
                                                await signOut()
                                            }}
                                        >
                                            <button>
                                                <p>Sign Out</p>
                                            </button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login" className="p-2 rounded-full hover:bg-primary-light focus:bg-primary-light">
                            <PersonIcon className="h-6 w-6" />
                        </Link>
                    )
                }
            </div>
        </div>
    )
}