import { Button } from '@/components/ui/button'
import React from 'react'
import AssetTable from './AssetTable'
import StockChart from './StockChart'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { CrossIcon, DotIcon, MessageCircle, Send } from 'lucide-react'

const initialMessages = [
    {
        id: 1,
        sender: 'bot',
        text: 'Welcome to BullTrade. Ask about crypto trends, portfolio health, or market sentiment.',
    },
]

const Home = () => {
    const [category, setCategory] = React.useState('all')
    const [isChatOpen, setIsChatOpen] = React.useState(false)
    const [messages, setMessages] = React.useState(initialMessages)
    const [draft, setDraft] = React.useState('')

    const handleCategory = (value) => {
        setCategory(value)
    }

    const handleSendMessage = () => {
        const trimmed = draft.trim()

        if (!trimmed) return

        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: trimmed,
        }

        const botReply = {
            id: Date.now() + 1,
            sender: 'bot',
            text: `You asked about “${trimmed}”. This is a demo chat surface for the trading dashboard.`,
        }

        setMessages((current) => [...current, userMessage, botReply])
        setDraft('')
    }

    return (
        <div className='relative min-h-[calc(100vh-4rem)]'>
            <div className='lg:flex'>
                <div className='lg:w-[50%] lg:border-r border-white/50'>
                    <div className='p-3 flex items-center gap-4'>
                        <Button
                            onClick={() => handleCategory('all')}
                            variant={category === 'all' ? 'default' : 'ghost'}
                            className='rounded-full border-white/10'
                        >
                            ALL
                        </Button>
                        <Button
                            onClick={() => handleCategory('top50')}
                            variant={category === 'top50' ? 'default' : 'ghost'}
                            className='rounded-full border-white/10'
                        >
                            Top 50
                        </Button>
                        <Button
                            onClick={() => handleCategory('topGainers')}
                            variant={category === 'topGainers' ? 'default' : 'ghost'}
                            className='rounded-full border-white/10'
                        >
                            Top Gainers
                        </Button>
                        <Button
                            onClick={() => handleCategory('topLosers')}
                            variant={category === 'topLosers' ? 'default' : 'ghost'}
                            className='rounded-full border-white/10'
                        >
                            Top Losers
                        </Button>
                    </div>
                    <AssetTable category={category} />
                </div>

                <div className='hidden lg:block lg:w-[50%] p-5'>
                    <StockChart />

                    <div className='flex gap-5 items-center'>
                        <div>
                            <Avatar>
                                <AvatarImage src='https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400' />
                            </Avatar>
                        </div>
                        <div>
                            <div className='flex items-center gap-2'>
                                <p>BTC</p>
                                <DotIcon className='text-gray-400' />
                                <p className='text-gray-400'>Bitcoin</p>
                            </div>
                            <div className='flex items-end gap-2'>
                                <p className='text-xl font-bold'>5464</p>
                                <p className='text-red-600'>
                                    <span>-15184401491.513184</span>
                                    <span>(-0.9665%)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className='fixed bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2'>
                {isChatOpen && (
                    <div className='rounded-2xl w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900 shadow-2xl border border-white/10 overflow-hidden flex flex-col'>
                        <div className='flex justify-between items-center border-b border-white/10 px-6 h-[12%]'>
                            <p className='text-lg font-semibold'>Chat Bot</p>
                            <Button variant='ghost' onClick={() => setIsChatOpen(false)} aria-label='Close chat'>
                                <CrossIcon />
                            </Button>
                        </div>

                        <div className='flex-1 overflow-y-auto px-4 py-3 space-y-3'>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                                        message.sender === 'user'
                                            ? 'ml-auto bg-blue-600 text-white'
                                            : 'bg-slate-800 text-slate-100'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            ))}
                        </div>

                        <div className='border-t border-white/10 p-3 flex gap-2'>
                            <input
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                placeholder='Ask about markets...'
                                className='flex-1 rounded-full border border-white/10 bg-slate-800 px-4 py-2 text-sm outline-none focus:border-blue-500'
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleSendMessage()
                                    }
                                }}
                            />
                            <Button onClick={handleSendMessage} size='icon' aria-label='Send message'>
                                <Send className='h-4 w-4' />
                            </Button>
                        </div>
                    </div>
                )}

                <div className='relative w-[10rem] cursor-pointer group'>
                    <Button
                        className='w-full h-[3rem] gap-2 items-center'
                        onClick={() => setIsChatOpen((current) => !current)}
                    >
                        <MessageCircle className='size-8 fill-[#1e293b] -rotate-90 stroke-none group-hover:fill-[#1a1a1a]' />
                        <span className='text-2xl'>Chat Bot</span>
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Home