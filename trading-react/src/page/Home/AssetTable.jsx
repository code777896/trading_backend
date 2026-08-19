import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow } from '@/components/ui/table'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AssetTable = ({ category = 'all' }) => {
    const navigate = useNavigate()
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true)
            try {
                const endpoint = category === 'top50' ? 'http://localhost:5454/coins/top50' : 'http://localhost:5454/coins?page=1'
                const response = await fetch(endpoint)
                if (response.ok) {
                    const data = await response.json()
                    setCoins(Array.isArray(data) ? data : [])
                }
            } catch (err) {
                console.error('Error fetching coin list:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchCoins()
    }, [category])

    return (
        <Table>
            <TableHeader>
                <TableRow className="border border-white/10">
                <TableHead className="w-[100px]">COIN</TableHead>
                <TableHead>SYMBOL</TableHead>
                <TableHead>VOLUME</TableHead>
                <TableHead>MARKET CAP</TableHead>
                <TableHead>24H</TableHead>
                <TableHead className="text-right">PRICE</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-400">Loading market coins...</TableCell>
                    </TableRow>
                ) : coins.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-400">No coins available.</TableCell>
                    </TableRow>
                ) : (
                    coins.map((coin, index) => (
                        <TableRow key={coin.id || index} className="border border-white/10 hover:bg-white/5 cursor-pointer">
                            <TableCell onClick={() => navigate(`/market/${coin.id}`)} className="font-medium flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={coin.image} alt={coin.name} />
                                </Avatar>
                                <span>{coin.name}</span>
                            </TableCell>
                            <TableCell>{coin.symbol?.toUpperCase()}</TableCell>
                            <TableCell>{coin.total_volume ? coin.total_volume.toLocaleString() : 'N/A'}</TableCell>
                            <TableCell>{coin.market_cap ? `$${coin.market_cap.toLocaleString()}` : 'N/A'}</TableCell>
                            <TableCell className={coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
                                {coin.price_change_percentage_24h ? `${coin.price_change_percentage_24h.toFixed(2)}%` : '0.00%'}
                            </TableCell>
                            <TableCell className="text-right">${coin.current_price ? coin.current_price.toLocaleString() : 'N/A'}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}

export default AssetTable
