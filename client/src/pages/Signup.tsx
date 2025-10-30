import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCsrfToken } from "@/lib/utils";
import { signup } from "@/services/authService";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== passwordConfirmation) {
      setError("パスワードが一致しません");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("パスワードは8文字以上で入力してください");
      setIsLoading(false);
      return;
    }

    try {
      // CSRFトークン取得
      const csrfToken = getCsrfToken();

      // サインアップAPI呼び出し
      const response = await signup(name, email, password, passwordConfirmation, csrfToken);

      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          setError(errorMessages.join(", "));
        } else {
          setError(errorData.message || "サインアップに失敗しました");
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("ネットワークエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto container p-4 max-w-md">
      <Heading>新規登録</Heading>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="山田太郎"
            required
            disabled={isLoading}
          />
        </div>

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
            placeholder="8文字以上で入力"
            required
            disabled={isLoading}
            minLength={8}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passwordConfirmation">パスワード確認</Label>
          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="パスワードを再入力"
            required
            disabled={isLoading}
            minLength={8}
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "登録中..." : "新規登録"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          すでにアカウントをお持ちの方は
          <button 
            className="text-blue-600 hover:underline ml-1"
            onClick={() => navigate("/login")}
          >
            ログイン
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
