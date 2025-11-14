import { EPSILON, HUNDRED_PERCENT } from '../constants/calculator'

export interface RomiInputs {
  marketingSpend: number
  incrementalRevenue: number
  grossMarginPct: number
  additionalCosts: number
}

export interface RomiResult {
  grossProfit: number
  netContribution: number
  romiPercentage: number
  romiMultiple: number
  breakEvenRevenue: number
  totalInvestment: number
}

const safeDivide = (numerator: number, denominator: number) => {
  if (Math.abs(denominator) <= EPSILON) {
    return 0
  }
  return numerator / denominator
}

/**
 * Calculates ROMI KPIs using the standard contribution approach.
 * @param inputs - The financial levers that drive ROMI.
 * @returns A structured set of ROMI metrics that the UI can consume.
 */
export const calculateRomi = (inputs: RomiInputs): RomiResult => {
  console.debug('[romi] calculating with inputs', inputs)
  const marginRatio = inputs.grossMarginPct / HUNDRED_PERCENT
  const grossProfit = inputs.incrementalRevenue * marginRatio
  const totalInvestment = inputs.marketingSpend + inputs.additionalCosts
  const netContribution = grossProfit - totalInvestment
  const romiPercentage = safeDivide(netContribution, inputs.marketingSpend) * HUNDRED_PERCENT
  const romiMultiple = safeDivide(grossProfit, inputs.marketingSpend)
  const breakEvenRevenue = safeDivide(totalInvestment, marginRatio)
  const result: RomiResult = {
    grossProfit,
    netContribution,
    romiPercentage,
    romiMultiple,
    breakEvenRevenue,
    totalInvestment,
  }
  console.debug('[romi] calculated result', result)
  return result
}
