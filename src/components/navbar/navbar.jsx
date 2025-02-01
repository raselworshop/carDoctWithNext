import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { NavigationMenuList } from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import { ModeToggle } from "../themeProvider/ModeToggle"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
        <NavigationMenu className="flex justify-between items-center  hover max-w-full">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink>
                            <Image src={'/assets/logo.svg'} alt="car-doctor" width={105} height={85} className="object-contain" />
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Home
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            About
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/services" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Services
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/blogs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Blogs
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/contacts" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Contacts
                        </NavigationMenuLink>
                    </Link>
                    <ModeToggle />
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList>
                <NavigationMenuItem className="flex gap-2">
                    <Link href="/register" legacyBehavior passHref>

                        <Button variant="outline">
                            Register
                        </Button>

                    </Link>
                    <Link href="/login">

                        <Button variant="outline">
                            Login
                        </Button>

                    </Link>
                    <Link href="/appointment" legacyBehavior passHref>

                        <Button variant="outline">
                            Appointment
                        </Button>

                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
