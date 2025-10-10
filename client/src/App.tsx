import { Button } from "./components/ui/button"
import Footer from "./Footer"
import Header from "./Header"
import Heading from "./Heading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight, Coins } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

function App() {

  return (
    <>
      <Header></Header>
      <div className="mx-auto container p-4">
        <div className="grid grid-cols-2 gap-15">
          <div>
            <section className="mb-6">
              <Heading>お届け先</Heading>
              <div className="border p-4 rounded-sm mb-2">
                <p className="text-sm text-gray-600 mb-2">会員情報と同じお届け先</p>
                <p className="text-sm font-bold mb-2">山田 太朗</p>
                <p className="text-sm text-gray-600">〒123-4567 東京都渋谷区道玄坂1-2-3</p>
                <p className="text-sm text-gray-600">TEL: 03-1234-5678</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">変更する</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <Heading>お届け先の変更</Heading>
                  </DialogHeader>
                  <div>
                    <div className="mb-5">
                      <Label htmlFor="name" className="mb-2">氏名</Label>
                      <Input className="w-full text-sm" placeholder="氏名を入力してください"/>
                    </div>
                    <div className="mb-5">
                      <Label htmlFor="phone" className="mb-2 flex justify-between">電話番号<span className="text-gray-400 text-xm">ハイフンなし</span></Label>
                      <Input className="w-full text-sm" placeholder="電話番号を入力してください"/>
                    </div>
                    <div className="mb-5">
                      <Label htmlFor="postal" className="mb-2 flex justify-between">郵便番号（半角数字）<span className="text-gray-400 text-xm">ハイフンなし</span></Label>
                      <Input className="w-full text-sm" placeholder="郵便番号を入力してください"/>
                    </div>
                    <div className="mb-5">
                      <Label htmlFor="name" className="mb-2">都道府県</Label>
                      <Select>
                        <SelectTrigger className="w-full mb-2">
                          <SelectValue placeholder="都道府県を選択する" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tokyo">東京都</SelectItem>
                          <SelectItem value="osaka">大阪府</SelectItem>
                          <SelectItem value="kyoto">京都府</SelectItem>
                          <SelectItem value="hokkaido">北海道</SelectItem>
                          <SelectItem value="okinawa">沖縄県</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mb-5">
                      <Label htmlFor="name" className="mb-2">市区町村</Label>
                      <Input className="w-full text-sm" placeholder="例：〇〇市〇〇町"/>
                    </div>
                    <div className="mb-5">
                      <Label htmlFor="name" className="mb-2">丁目・番地・号（数字は半角数字）</Label>
                      <Input className="w-full text-sm" placeholder="例：1-2-3"/>
                    </div>
                    <div className="mb-5">
                      <Label htmlFor="name" className="mb-2">建物名</Label>
                      <Input className="w-full text-sm" placeholder="例：〇〇〇マンション"/>
                    </div>
                    <div className="mb-5">
                      <Label htmlFor="name" className="mb-2">部屋番号（数字は半角数字）</Label>
                      <Input className="w-full text-sm" placeholder="例：123"/>
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start">
                      <Button type="button" className="w-full">
                        変更する
                      </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </section>
            <section className="mb-6">
              <Heading>配達希望日時</Heading>
              <Select>
                <SelectTrigger className="w-full mb-2">
                  <SelectValue placeholder="配達希望日" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20230401">2023年4月1日</SelectItem>
                  <SelectItem value="20230402">2023年4月2日</SelectItem>
                  <SelectItem value="20230403">2023年4月3日</SelectItem>
                  <SelectItem value="20230404">2023年4月4日</SelectItem>
                  <SelectItem value="20230405">2023年4月5日</SelectItem>
                  <SelectItem value="20230406">2023年4月6日</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="配達希望時間" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="19:00-20:00">19:00-20:00</SelectItem>
                  <SelectItem value="20:00-21:00">20:00-21:00</SelectItem>
                  <SelectItem value="21:00-22:00">21:00-22:00</SelectItem>
                  <SelectItem value="指定なし">指定なし</SelectItem>
                </SelectContent>
              </Select>
            </section>
            <section className="mb-6">
              <Heading>お支払い方法</Heading>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">クレジットカード</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">代金引換</Label>
                </div>
              </RadioGroup>
            </section>
            <section className="mb-6">
              <Heading>ご利用可能なポイント</Heading>
              <div className="border p-4 rounded-sm mb-2 flex justify-between items-center">
                <p className="text-sm font-bold">利用可能ポイント</p>
                <p className="text-lg font-bold text-lg mr-1 flex items-center">
                  <Coins />12,000<span className="text-sm ml-1">pt</span>
                </p>
              </div>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">利用しない</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">すべて利用する</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">一部のみ利用する</Label>
                </div>
                <Input className="ml-5 w-full max-w-xs text-sm" placeholder="利用するポイント数"/>
              </RadioGroup>
            </section>
            <section className="mb-6">
              <Heading>ご利用可能なクーポン</Heading>
              <div className="grid grid-cols-3 gap-10">
                <Skeleton className="h-[100px] w-[100px] rounded bg-gray-200" />
                <Skeleton className="h-[100px] w-[100px] rounded bg-gray-200" />
                <Skeleton className="h-[100px] w-[100px] rounded bg-gray-200" />
              </div>
            </section>
          </div>
          <div>
            <section className="mb-6">
              <div className="border-b">
                <dl className="mb-2 flex justify-between text-sm">
                  <dt>商品の小計：</dt>
                  <dd>12,000円</dd>
                </dl>
                <dl className="flex justify-between text-sm">
                  <dt>配送料・サービス料：</dt>
                  <dd>1,200円</dd>
                </dl>
                <dl className="py-6 flex justify-between align-end text-sm font-bold">
                  <dt>ご請求額：</dt>
                  <dd className="text-lg font-bold">13,200円</dd>
                </dl>
              </div>
              <Button variant="link" className="text-sm flex justify-end p-0 rounded-none hover:no-underline ml-auto mb-4">
                  キャンセル・ポリシーについて
                  <ChevronRight />
              </Button>              
              <Button className="w-full rounded">注文を確定する</Button>
            </section>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
