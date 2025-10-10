import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { ChevronRight, Coins, Heart, History, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "./components/ui/button"

function Header() {
    return (
        <>
        <div className="border-b">
            <div className="w-full flex items-center container justify-between px-4 py-2 mx-auto">
                <span className="font-bold">SHOP LOGO</span>
                <NavigationMenu className="grow w-full">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <div className="relative w-full max-w-sm">
                                <Input className="placeholder:text-gray-400  pr-10" placeholder="検索"/>
                                <Button size="icon-sm" aria-label="Submit" variant="ghost" className="absolute right-1 top-0 bottom-0 m-auto">
                                    <Search color="gray"/>
                                </Button>
                            </div>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button size="icon-sm" aria-label="Submit" variant="ghost">
                                <ShoppingCart />
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button size="icon-sm" aria-label="Submit" variant="ghost">
                                <History />
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button size="icon-sm" aria-label="Submit" variant="ghost">
                                <Heart />
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button size="icon-sm" aria-label="Submit" variant="ghost">
                                <User />
                            </Button>
                        </NavigationMenuItem>                    
                        <NavigationMenuItem>
                            <Button variant="link">
                            <Coins />12,000pt<ChevronRight />
                            </Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
        </>
    )
}

export default Header