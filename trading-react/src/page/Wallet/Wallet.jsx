import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CopyIcon, WalletIcon, RefreshCwIcon, DollarSign, UploadIcon, ShuffleIcon } from "lucide-react"
import TopupForm from "./TopupForm"
import WithdrawalForm from "./WithdrawalForm"
import TransferForm from "./TransferForm"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"


const Wallet = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='pt-10 w-full lg:w-[60%] '>
        <Card className='bg-transparent border-0 shadow-none'>
          <CardHeader className='pb-6'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-5'>
                <WalletIcon size={30} color="white"/>
                <div>
                  <CardTitle className='text-2xl font-bold text-gray-100'>My Wallet</CardTitle>
                  <div className='flex items-center gap-2'>
                    <p className='text-gray-200 text-sm'>
                      #A475Ed
                    </p>
                    <CopyIcon size={15} className='cursor-pointer text-gray-200 hover:text-slate-400'/>
                  </div>
                </div>
              </div>
              <div>
                <RefreshCwIcon className="w-6 h-6 text-gray-200 cursor-pointer hover:text-gray-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent >
            <div className='flex items-center'>
              <DollarSign color="white"/>
              <span className='text-2xl font-semibold text-gray-100'>
                20000
              </span>
            </div>
            <div className='flex gap-7 mt-10'>
              <Dialog >
                <DialogTrigger asChild>
                  <div className='h-24 w-24 text-gray-200 hover:text-gray-400 
                  cursor-pointer flex flex-col items-center justify-center 
                  rounded-md shadow-slate-800 shadow-md'>
                    <UploadIcon />
                    <span className='text-sm mt-2'>Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent className='bg-[#020214] border-slate-700 p-6 max-w-md rounded-2xl'>
                  <DialogHeader>
                    <DialogTitle className='text-white text-xl font-semibold'>
                      Top up Your Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TopupForm />
                </DialogContent>
              </Dialog>

               <Dialog >
                <DialogTrigger asChild>
                  <div className='h-24 w-24 text-gray-200 hover:text-gray-400 
                  cursor-pointer flex flex-col items-center justify-center 
                  rounded-md shadow-slate-800 shadow-md'>
                    <UploadIcon/>
                    <span className='text-sm mt-2'>Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent className='bg-[#020214] border-slate-700 p-6 max-w-md rounded-2xl'>
                  <DialogHeader>
                    <DialogTitle className='text-white text-xl font-semibold'>
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              <Dialog >
                <DialogTrigger asChild>
                  <div className='h-24 w-24 text-gray-200 hover:text-gray-400 
                  cursor-pointer flex flex-col items-center justify-center 
                  rounded-md shadow-slate-800 shadow-md'>
                    <ShuffleIcon/>
                    <span className='text-sm mt-2'>Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent className='bg-[#020214] border-slate-700 p-6 max-w-md rounded-2xl'>
                  <DialogHeader>
                    <DialogTitle className='text-white text-xl font-semibold text-center'>
                      Transfer to other wallet 
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <div className='py-5 pt-10'>
          <div className='flex gap-2 items-center pb-5'>
            <h1 className='text-2xl font-semibold'>History</h1>
            <RefreshCwIcon className="w-6 h-6 text-gray-200 cursor-pointer hover:text-gray-400" />
          </div>
          <div className='space-y-5'>
            {[1,1,1,1,1,1,1,1,1,1].map((item, i)=>
              <div key={i}>
              <Card className='px-5 p-2 bg-transparent border-0 shadow-none'>
                <div className='flex items-center justify-between gap-5'>
                  <div className='flex items-center gap-5'>
                    <Avatar className='bg-transparent border border-white/10'>
                      <AvatarFallback className='bg-transparent text-gray-200'>
                        <ShuffleIcon />
                      </AvatarFallback>
                    </Avatar>
                    <div className='space-y-1'>
                      <h1 className='text-white text-xl'>Buy Assets</h1>
                      <p className='text-sm text-gray-400'>2026-07-08</p>
                    </div>
                  </div>
                  <div className='text-green-500 font-medium'>999 USD</div>
                </div>
              </Card>
            </div>  )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet