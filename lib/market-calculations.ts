export function formatChange(value: number | null, decimals = 2): string {
  if (value === null) return '-';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(decimals)}`;
}

export function formatChangePercent(value: number | null, decimals = 2): string {
  if (value === null) return '-';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(decimals)}%`;
}

export function formatPrice(value: number | null, decimals = 2): string {
  if (value === null) return '-';
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function getSignal(changePercent: number | null): 'bullish' | 'bearish' | 'neutral' {
  if (changePercent === null) return 'neutral';
  if (changePercent > 0) return 'bullish';
  if (changePercent < 0) return 'bearish';
  return 'neutral';
}

export function getISTTime(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * 5.5);
}

export function getTodayIST(): string {
  const ist = getISTTime();
  const y = ist.getFullYear();
  const m = String(ist.getMonth() + 1).padStart(2, '0');
  const d = String(ist.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const NSE_HOLIDAYS_2025: string[] = [
  '2025-01-26', // Republic Day
  '2025-02-19', // Chhatrapati Shivaji Maharaj Jayanti
  '2025-03-14', // Holi
  '2025-04-10', // Id-ul-Fitr
  '2025-04-14', // Dr. Baba Saheb Ambedkar Jayanti
  '2025-04-18', // Good Friday
  '2025-04-01', // Annual Bank Closing
  '2025-05-01', // Maharashtra Day
  '2025-08-15', // Independence Day
  '2025-10-02', // Mahatma Gandhi Jayanti
  '2025-10-23', // Diwali (Laxmi Puja - Special Trading Session usually)
  '2025-11-05', // Guru Nanak Jayanti
  '2025-11-20', // Maharashtra Assembly Elections (Approx)
  '2025-12-25', // Christmas
];

export function isNSEHoliday(date?: Date): boolean {
  const checkDate = date || getISTTime();
  const y = checkDate.getFullYear();
  const m = String(checkDate.getMonth() + 1).padStart(2, '0');
  const d = String(checkDate.getDate()).padStart(2, '0');
  const dateString = `${y}-${m}-${d}`;
  
  return NSE_HOLIDAYS_2025.includes(dateString);
}

export function isNSEMarketOpen(): boolean {
  const ist = getISTTime();
  const day = ist.getDay();
  
  if (day === 0 || day === 6) return false;
  if (isNSEHoliday(ist)) return false;
  
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const time = hours + minutes / 60;
  
  // NSE normal trading hours 09:15 to 15:30 IST
  return time >= 9.25 && time < 15.5;
}

export function getMarketStatus(): 'open' | 'closed' | 'pre-open' {
  const ist = getISTTime();
  const day = ist.getDay();
  
  if (day === 0 || day === 6 || isNSEHoliday(ist)) {
    return 'closed';
  }
  
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const time = hours + minutes / 60;
  
  if (time >= 9.0 && time < 9.25) return 'pre-open';
  if (time >= 9.25 && time < 15.5) return 'open';
  return 'closed';
}

export function formatLastUpdated(isoString: string | null): string {
  if (!isoString) return 'Never';
  const date = new Date(isoString);
  const now = new Date();
  
  const diffSecs = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffSecs < 60) return 'Just now';
  if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
  if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
  
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function getCategoryLabel(category: string): string {
  switch(category) {
    case 'Indian Index': return 'Indian Markets';
    case 'Global Index': return 'Global Markets';
    case 'Commodities': return 'Commodities';
    case 'Currency': return 'Currencies';
    case 'Volatility': return 'Volatility & Sentiment';
    default: return category;
  }
}

export function getRefreshIntervalSeconds(): number {
  const status = getMarketStatus();
  if (status === 'open') return 60 * 5; // 5 minutes during market hours
  if (status === 'pre-open') return 60 * 1; // 1 minute in pre-open
  return 60 * 60; // 1 hour when closed
}
