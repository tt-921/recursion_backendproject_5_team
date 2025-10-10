import { ChevronRight } from "lucide-react"
import { Button } from "./components/ui/button"

function Footer() {
    return (
        <>
            <footer className="w-full h-10 border-t">
                <div className="py-10 px-4 py-2 border-b container mx-auto">
                    <div className="grid grid-cols-3 gap-4">
                        <Button variant="link" className="text-sm justify-start p-0 border-b rounded-none hover:no-underline justify-between">
                            会社概要
                            <ChevronRight />
                        </Button>
                        <Button variant="link" className="text-sm justify-start p-0 border-b rounded-none hover:no-underline justify-between">
                            個人情報保護方針
                            <ChevronRight />
                        </Button>
                        <Button variant="link" className="text-sm justify-start p-0 border-b rounded-none hover:no-underline justify-between">
                            ご利用ガイド
                            <ChevronRight />
                        </Button>
                        <Button variant="link" className="text-sm justify-start p-0 border-b rounded-none hover:no-underline justify-between">
                            会員登録・ログイン
                            <ChevronRight />
                        </Button>
                        <Button variant="link" className="text-sm justify-start p-0 border-b rounded-none hover:no-underline justify-between">
                            商品一覧
                            <ChevronRight />
                        </Button>
                        <Button variant="link" className="text-sm justify-start p-0 border-b rounded-none hover:no-underline justify-between">
                            お問い合わせ
                            <ChevronRight />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-center bg-black">
                    <span className="text-sm text-white">© SHOP LOGO Inc.</span>
                </div>
            </footer>
        </>
    )
}

export default Footer