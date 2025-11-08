import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCsrfToken } from "@/lib/utils";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/authAtoms";
import { login } from "@/services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [, setUser] = useAtom(userAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const csrfToken = getCsrfToken();
    // ログインAPI呼び出し
    const response = await login(email, password, csrfToken!);
    if (response.ok) {
      const data = await response.json();
      setUser(data.user);

      const role = data.user?.role;
      if (role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/");
      }
    } else {
      setIsLoading(false);
      setError("ログイン失敗");
    }
  };

  return (
    <div className="mx-auto container p-4 max-w-md">
      <Heading>ログイン</Heading>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            required
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "ログイン中..." : "ログイン"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          アカウントをお持ちでない方は
          <button 
            className="text-blue-600 hover:underline ml-1"
            onClick={() => navigate("/signup")}
          >
            新規登録
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
