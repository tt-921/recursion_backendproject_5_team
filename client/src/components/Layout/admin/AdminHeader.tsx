import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { User } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/authAtoms';
import { fetchUser, logout } from '@/services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

function AdminHeader() {
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

  return (
    <>
      <div className="border-b">
        <div className="w-full flex items-center container justify-between px-4 py-2 mx-auto">
          <span className="font-bold">管理者専用画面</span>
          <NavigationMenu className="grow w-full">
            <NavigationMenuList className="flex-wrap">
              <NavigationMenuItem>
                <Button
                  aria-label="Submit"
                  variant="ghost"
                  onClick={() => navigate('/admin/products')}
                >
                  商品管理
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  aria-label="Submit"
                  variant="ghost"
                  onClick={() => navigate('/admin/categories')}
                >
                  カテゴリー管理
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
