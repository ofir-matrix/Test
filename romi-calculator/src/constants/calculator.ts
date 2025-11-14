import type { RomiInputs } from '../utils/romi'

export const HUNDRED_PERCENT = 100
export const EPSILON = 1e-9
export const MONEY_STEP = 100
export const PERCENT_STEP = 1
export const MAX_MARGIN_PERCENT = 100
export const MIN_MARGIN_PERCENT = 0
export const PERCENT_DECIMALS = 1

export enum InputField {
  MarketingSpend = 'marketingSpend',
  IncrementalRevenue = 'incrementalRevenue',
  GrossMargin = 'grossMarginPct',
  AdditionalCosts = 'additionalCosts',
}

export enum ScenarioKey {
  Conservative = 'conservative',
  Base = 'base',
  Aggressive = 'aggressive',
}

export const DEFAULT_INPUTS: RomiInputs = {
  marketingSpend: 45000,
  incrementalRevenue: 125000,
  grossMarginPct: 62,
  additionalCosts: 5000,
}

export const SCENARIOS = [
  {
    key: ScenarioKey.Conservative,
    label: 'Conservative',
    revenueShift: -0.15,
    description: 'Covers execution gaps and delayed revenue capture.',
  },
  {
    key: ScenarioKey.Base,
    label: 'Expected',
    revenueShift: 0,
    description: 'Reflects the plan you committed to the business.',
  },
  {
    key: ScenarioKey.Aggressive,
    label: 'Aggressive',
    revenueShift: 0.2,
    description: 'Assumes operational excellence and halo impact.',
  },
] as const

export enum MetricTone {
  Positive = 'positive',
  Neutral = 'neutral',
  Negative = 'negative',
}

export const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export const PERCENT_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
})
