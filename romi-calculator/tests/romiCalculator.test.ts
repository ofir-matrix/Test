import { describe, expect, it } from 'vitest'
import { calculateRomi, type RomiInputs } from '../src/utils/romi'

const buildInputs = (overrides: Partial<RomiInputs> = {}): RomiInputs => ({
  marketingSpend: 5000,
  incrementalRevenue: 15000,
  grossMarginPct: 65,
  additionalCosts: 500,
  ...overrides,
})

describe('calculateRomi', () => {
  it('returns the expected contribution metrics', () => {
    const result = calculateRomi(buildInputs())
    expect(result.grossProfit).toBeCloseTo(9750, 3)
    expect(result.netContribution).toBeCloseTo(4250, 3)
    expect(result.romiPercentage).toBeCloseTo(85, 3)
    expect(result.romiMultiple).toBeCloseTo(1.95, 3)
    expect(result.breakEvenRevenue).toBeCloseTo(8461.538, 3)
    expect(result.totalInvestment).toBe(5500)
  })

  it('gracefully handles zero marketing spend', () => {
    const result = calculateRomi(buildInputs({ marketingSpend: 0 }))
    expect(result.romiPercentage).toBe(0)
    expect(result.romiMultiple).toBe(0)
    expect(result.totalInvestment).toBeCloseTo(500, 3)
  })

  it('avoids divide-by-zero when margin is zero', () => {
    const result = calculateRomi(
      buildInputs({ grossMarginPct: 0, incrementalRevenue: 30000, marketingSpend: 10000 }),
    )
    expect(result.grossProfit).toBe(0)
    expect(result.breakEvenRevenue).toBe(0)
    expect(result.netContribution).toBe(-10500)
  })
})
