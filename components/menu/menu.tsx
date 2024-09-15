import Link from "next/link"

import { RocketIcon } from "@radix-ui/react-icons"
import { LightningBoltIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { 
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { HamburgerIcon } from "@/components/icons/icon"

const HamburgerMenuIcon = () => {
  return(
    <div className="navbar-start">
        <div tabIndex={0} role="button" className="p-2 rounded-full hover:bg-primary-light focus:bg-primary-light">
            <HamburgerIcon />
        </div>
    </div>
  )
}

const CustomBadge = (props: {children: React.ReactNode}) => {
  return(
    <Badge className='ml-2 bg-[#F5B700] text-primary-dark font-medium'>{props.children}</Badge>
  )
}

const SheetMenuItem = (props: {children: React.ReactNode}) => {
  return(
    <Link href='#'>
      <Button className='w-full text-md px-2 py-1 justify-start' variant={'ghost'}>{props.children}</Button>
    </Link>
  )
}

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent className='bg-primary-base border-r-0' side={'left'}>
        <div className='h-full flex flex-col justify-between'>
          <div>
            <SheetHeader className='ml-2 mb-6'>
              <SheetTitle className='text-white text-xl my-0'>Menu</SheetTitle>
              <SheetDescription className='mt-0'>Expore more on DriveFind.</SheetDescription>
            </SheetHeader>
            <SheetMenuItem>Home</SheetMenuItem>
            <SheetMenuItem>
              Trending 
              <CustomBadge>
                <LightningBoltIcon className="-ml-1" />
                Just Updated
              </CustomBadge>
            </SheetMenuItem>
            <SheetMenuItem>Latest</SheetMenuItem>
            <SheetMenuItem>Editor Picks</SheetMenuItem>
            <SheetMenuItem>Gallery</SheetMenuItem>
            <Separator className="my-4" />
            <SheetMenuItem>About</SheetMenuItem>
            <SheetMenuItem>Help</SheetMenuItem>
            <SheetMenuItem>Contact</SheetMenuItem>
          </div>
          <div>
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can help support our project by donating to our ...
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
