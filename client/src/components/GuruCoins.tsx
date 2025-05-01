import { CogIcon } from '@heroicons/react/24/solid'

interface GuruCoinsProps {
  coins: number
  size?: 'sm' | 'md' | 'lg'
}

export default function GuruCoins({ coins, size = 'md' }: GuruCoinsProps) {
  const sizeClasses = {
    sm: 'text-sm gap-1',
    md: 'text-base gap-1.5',
    lg: 'text-lg gap-2'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      <CogIcon className={`${iconSizes[size]} text-yellow-500`} />
      <span className="font-semibold text-gray-900">{coins.toLocaleString()} GuruCoins</span>
    </div>
  )
}