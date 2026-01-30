"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Wallet, Copy, Check, Shield, ExternalLink, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { WalletInfo } from "@/types/wallet"
import { truncateStellarAddress } from "@/lib/mock-wallet"
import { formatDistanceToNow } from "date-fns"

interface WalletSheetProps {
    walletInfo: WalletInfo
    trigger?: React.ReactNode
}

export function WalletSheet({ walletInfo, trigger }: WalletSheetProps) {
    const [copied, setCopied] = useState(false)

    const handleCopyAddress = async () => {
        try {
            await navigator.clipboard.writeText(walletInfo.address)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            console.error("Failed to copy address:", error)
        }
    }

    const formatCurrency = (amount: number, currency: string = 'USD') => {
        if (currency === 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount)
        }
        return `${amount.toLocaleString()} ${currency}`
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="icon">
                        <Wallet className="h-4 w-4" />
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-white text-gray-900 px-6">
                <SheetHeader className="space-y-4">
                    <SheetTitle className="text-left">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-muted-foreground">Wallet</div>
                                <div className="text-lg font-semibold">{walletInfo.displayName}</div>
                            </div>
                            {walletInfo.isConnected && (
                                <div className="flex items-center gap-1 text-xs text-green-500">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    Connected
                                </div>
                            )}
                        </div>
                    </SheetTitle>

                    {/* Wallet Address */}
                    <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
                        <div className="flex-1 min-w-0">
                            <div className="text-xs text-muted-foreground mb-1">Address</div>
                            <div className="text-sm font-mono truncate">
                                {truncateStellarAddress(walletInfo.address)}
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCopyAddress}
                            className="ml-2 shrink-0"
                        >
                            {copied ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </SheetHeader>

                <div className="space-y-6 mt-6">
                    {/* Balance Section */}
                    <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-gray-200">
                        <div className="text-4xl font-bold mb-1">
                            {formatCurrency(walletInfo.balance, walletInfo.balanceCurrency)}
                        </div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wide">
                            Balance
                        </div>
                    </div>

                    {/* Security Prompt */}
                    {!walletInfo.has2FA && (
                        <>
                            <Separator />
                            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                <Shield className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm mb-1">Add Two Factor Authentication</div>
                                    <div className="text-xs text-muted-foreground mb-2">
                                        Secure your wallet with 2FA
                                    </div>
                                    <Button variant="link" className="h-auto p-0 text-xs text-blue-600 hover:text-blue-700" asChild>
                                        <a href="/settings/security">
                                            Go to Security Settings
                                            <ExternalLink className="ml-1 h-3 w-3" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}

                    {walletInfo.has2FA && (
                        <>
                            <Separator />
                            <div className="flex items-center gap-2 text-sm text-green-500">
                                <Check className="h-4 w-4" />
                                <span>Two-factor authentication enabled</span>
                            </div>
                        </>
                    )}

                    {/* Assets Section */}
                    <Separator />
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">Assets</h3>
                            {walletInfo.assets.length > 0 && (
                                <Button variant="link" className="h-auto p-0 text-xs" asChild>
                                    <a href="/wallet">
                                        View More
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                </Button>
                            )}
                        </div>

                        {walletInfo.assets.length === 0 ? (
                            <div className="text-center py-8 px-4">
                                <Wallet className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                                <div className="font-medium text-sm mb-1">Your wallet is empty</div>
                                <div className="text-xs text-muted-foreground max-w-xs mx-auto">
                                    Your rewards will show up here when you&apos;re paid by a sponsor for a win
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {walletInfo.assets.map((asset) => (
                                    <div
                                        key={asset.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-xs font-bold">{asset.tokenSymbol[0]}</span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">{asset.tokenSymbol}</div>
                                                <div className="text-xs text-muted-foreground">{asset.tokenName}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-sm">{asset.amount.toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {formatCurrency(asset.usdValue)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Activity Section */}
                    <Separator />
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">Activity</h3>
                            {walletInfo.recentActivity.length > 0 && (
                                <Button variant="link" className="h-auto p-0 text-xs" asChild>
                                    <a href="/wallet/activity">
                                        View More
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                </Button>
                            )}
                        </div>

                        {walletInfo.recentActivity.length === 0 ? (
                            <div className="text-center py-8 px-4">
                                <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                                    <ArrowUpRight className="h-6 w-6 text-muted-foreground/50" />
                                </div>
                                <div className="font-medium text-sm mb-1">No activity yet</div>
                                <div className="text-xs text-muted-foreground max-w-xs mx-auto">
                                    All earnings and withdrawals from your Earn wallet will show up here.
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {walletInfo.recentActivity.slice(0, 5).map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${activity.type === 'earning'
                                                ? 'bg-green-500/10'
                                                : activity.type === 'withdrawal'
                                                    ? 'bg-orange-500/10'
                                                    : 'bg-blue-500/10'
                                                }`}>
                                                {activity.type === 'earning' ? (
                                                    <ArrowDownLeft className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <ArrowUpRight className="h-4 w-4 text-orange-500" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm capitalize">{activity.type}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-medium text-sm ${activity.type === 'earning' ? 'text-green-500' : ''
                                                }`}>
                                                {activity.type === 'earning' ? '+' : '-'}
                                                {formatCurrency(activity.amount, activity.currency)}
                                            </div>
                                            <div className={`text-xs ${activity.status === 'completed'
                                                ? 'text-muted-foreground'
                                                : activity.status === 'pending'
                                                    ? 'text-amber-500'
                                                    : 'text-red-500'
                                                }`}>
                                                {activity.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <Separator />
                    <div className="text-center text-xs text-gray-500 pb-4">
                        Have questions? Reach out to us at{' '}
                        <a
                            href="mailto:support@boundlessfi.xyz"
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            support@boundlessfi.xyz
                        </a>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
