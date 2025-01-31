import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { NavigationMenuList } from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import { ModeToggle } from "../themeProvider/ModeToggle"

export default function Navbar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Documentation
                        </NavigationMenuLink>
                    </Link>
                    <ModeToggle/>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
