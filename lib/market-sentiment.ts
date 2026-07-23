import { MarketData, SentimentResult, SentimentFactor, SentimentLevel } from '@/types/market';

export function calculateSentiment(snapshots: MarketData[]): SentimentResult {
  const factors: SentimentFactor[] = [];
  let score = 0;

  const getQuote = (symbol: string) => snapshots.find(s => s.market.symbol === symbol)?.snapshot;

  // Factor 1 - Gift Nifty / Nifty 50
  const niftyData = getQuote('GIFT_NIFTY') || getQuote('^NSEI');
  if (niftyData && niftyData.change_percent !== null) {
    const cp = niftyData.change_percent;
    let signal: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    let val = 0;
    if (cp > 0.3) { signal = 'bullish'; val = 1; }
    else if (cp < -0.3) { signal = 'bearish'; val = -1; }
    
    score += val;
    factors.push({
      name: 'Indian Markets',
      value: `${cp.toFixed(2)}%`,
      signal,
      reason: signal === 'bullish' ? 'Strong upward momentum' : signal === 'bearish' ? 'Downward pressure' : 'Consolidating',
      icon: '🇮🇳'
    });
  }

  // Factor 2 - US Markets (DJI)
  const dji = getQuote('^DJI');
  if (dji && dji.change_percent !== null) {
    const cp = dji.change_percent;
    let signal: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    let val = 0;
    if (cp > 0) { signal = 'bullish'; val = 1; }
    else if (cp < -0.5) { signal = 'bearish'; val = -1; }
    
    score += val;
    factors.push({
      name: 'US Markets',
      value: `${cp.toFixed(2)}%`,
      signal,
      reason: signal === 'bullish' ? 'Positive global cues' : signal === 'bearish' ? 'Negative global cues' : 'Neutral global cues',
      icon: '🇺🇸'
    });
  }

  // Factor 3 - Asian Markets (Nikkei)
  const nikkei = getQuote('^N225');
  if (nikkei && nikkei.change_percent !== null) {
    const cp = nikkei.change_percent;
    let signal: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    let val = 0;
    if (cp > 0.3) { signal = 'bullish'; val = 1; }
    else if (cp < -0.3) { signal = 'bearish'; val = -1; }
    
    score += val;
    factors.push({
      name: 'Asian Markets',
      value: `${cp.toFixed(2)}%`,
      signal,
      reason: signal === 'bullish' ? 'Asian markets supportive' : signal === 'bearish' ? 'Asian markets weak' : 'Mixed regional cues',
      icon: '🌏'
    });
  }

  // Factor 4 - India VIX
  const vix = getQuote('^INDIAVIX');
  if (vix && vix.close !== null) {
    const close = vix.close;
    let signal: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    let val = 0;
    if (close < 15) { signal = 'bullish'; val = 1; }
    else if (close > 20) { signal = 'bearish'; val = -1; }
    
    score += val;
    factors.push({
      name: 'Volatility (VIX)',
      value: close.toFixed(2),
      signal,
      reason: signal === 'bullish' ? 'Low fear in market' : signal === 'bearish' ? 'High fear in market' : 'Normal volatility',
      icon: '📊'
    });
  }

  // Factor 5 - Crude Oil
  const crude = getQuote('CL=F');
  if (crude && crude.change_percent !== null) {
    const cp = crude.change_percent;
    let signal: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    let val = 0;
    if (cp < -1) { signal = 'bullish'; val = 1; }
    else if (cp > 2) { signal = 'bearish'; val = -1; }
    
    score += val;
    factors.push({
      name: 'Crude Oil',
      value: `${cp.toFixed(2)}%`,
      signal,
      reason: signal === 'bullish' ? 'Falling crude benefits India' : signal === 'bearish' ? 'Rising crude hurts India' : 'Stable energy costs',
      icon: '🛢️'
    });
  }

  // Factor 6 - Gold
  const gold = getQuote('GC=F');
  if (gold && gold.change_percent !== null) {
    const cp = gold.change_percent;
    let signal: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    let val = 0;
    if (cp > 1.5) { signal = 'bearish'; val = -1; }
    else if (cp < -0.5) { signal = 'bullish'; val = 1; }
    
    score += val;
    factors.push({
      name: 'Gold',
      value: `${cp.toFixed(2)}%`,
      signal,
      reason: signal === 'bullish' ? 'Risk-on environment' : signal === 'bearish' ? 'Safe haven demand rising' : 'Normal movement',
      icon: '🥇'
    });
  }

  // Factor 7 - Dollar Index
  const dollar = getQuote('DX-Y.NYB');
  if (dollar && dollar.change_percent !== null) {
    const cp = dollar.change_percent;
    let signal: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    let val = 0;
    if (cp > 0.5) { signal = 'bearish'; val = -1; }
    else if (cp < -0.3) { signal = 'bullish'; val = 1; }
    
    score += val;
    factors.push({
      name: 'Dollar Index',
      value: `${cp.toFixed(2)}%`,
      signal,
      reason: signal === 'bullish' ? 'Weak dollar supports EM' : signal === 'bearish' ? 'Strong dollar pressures INR' : 'Dollar stable',
      icon: '💵'
    });
  }

  let overall: SentimentLevel = 'Neutral';
  let summary = 'Market bias is Neutral with mixed signals across global and domestic indicators.';
  
  if (score >= 4) {
    overall = 'Very Bullish';
    summary = 'Market bias is Very Bullish: Broad-based positive cues across equities, commodities, and low volatility.';
  } else if (score >= 2) {
    overall = 'Bullish';
    summary = 'Market bias is Bullish: Global markets and domestic cues lean positive.';
  } else if (score <= -4) {
    overall = 'Very Bearish';
    summary = 'Market bias is Very Bearish: Significant negative pressure from global cues and commodities.';
  } else if (score <= -2) {
    overall = 'Bearish';
    summary = 'Market bias is Bearish: Multiple indicators suggest downward pressure on equities.';
  }

  return {
    overall,
    score,
    factors,
    summary
  };
}

export function getSentimentColor(level: SentimentLevel): string {
  switch (level) {
    case 'Very Bullish': return 'text-green-600 dark:text-green-400';
    case 'Bullish': return 'text-green-500 dark:text-green-300';
    case 'Bearish': return 'text-red-500 dark:text-red-300';
    case 'Very Bearish': return 'text-red-600 dark:text-red-400';
    default: return 'text-gray-500 dark:text-gray-400';
  }
}

export function getSentimentBgColor(level: SentimentLevel): string {
  switch (level) {
    case 'Very Bullish': return 'bg-green-100 dark:bg-green-900/30';
    case 'Bullish': return 'bg-green-50 dark:bg-green-900/20';
    case 'Bearish': return 'bg-red-50 dark:bg-red-900/20';
    case 'Very Bearish': return 'bg-red-100 dark:bg-red-900/30';
    default: return 'bg-gray-100 dark:bg-gray-800';
  }
}
