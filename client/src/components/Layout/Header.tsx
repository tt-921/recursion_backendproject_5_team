import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import { ChevronRight, Coins, Heart, History, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import type { User as UserType } from '@/types/authTypes';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/authAtoms';
import { fetchUser, logout } from '@/services/authService';

function Header() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  const handleLogoutClick = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

  const handleFavoriteClick = () => {
    navigate('/favorites');
  };

  return (
    <>
      <div className="border-b">
        <div className="w-full flex items-center container justify-between px-4 py-2 mx-auto">
          <span className="font-bold">SHOP LOGO</span>
          <NavigationMenu className="grow w-full">
            <NavigationMenuList className="flex-wrap">
              <NavigationMenuItem>
                <div className="relative w-full max-w-sm">
                  <Input className="placeholder:text-gray-400  pr-10" placeholder="検索" />
                  <Button
                    size="icon-sm"
                    aria-label="Submit"
                    variant="ghost"
                    className="absolute right-1 top-0 bottom-0 m-auto"
                  >
                    <Search color="gray" />
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
                <Button
                  size="icon-sm"
                  aria-label="Submit"
                  variant="ghost"
                  onClick={handleFavoriteClick}
                >
                  <Heart />
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon-sm" aria-label="Submit" variant="ghost">
                      <User />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="center">
                    {user ? (
                      <>
                        <DropdownMenuLabel>アカウント情報</DropdownMenuLabel>
                        <div className="px-2 py-1.5 text-sm">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-gray-600">{user.email}</div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogoutClick}>ログアウト</DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/login')}>
                          ログイン
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/signup')}>
                          新規登録
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Button variant="link">
                  <Coins />
                  12,000pt
                  <ChevronRight />
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
}

export default Header;
