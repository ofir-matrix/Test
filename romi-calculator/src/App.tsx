import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react'
import './App.css'
import {
  CURRENCY_FORMATTER,
  DEFAULT_INPUTS,
  InputField,
  MAX_MARGIN_PERCENT,
  MetricTone,
  MIN_MARGIN_PERCENT,
  MONEY_STEP,
  PERCENT_DECIMALS,
  PERCENT_FORMATTER,
  PERCENT_STEP,
  SCENARIOS,
  ScenarioKey,
  HUNDRED_PERCENT,
} from './constants/calculator'
import { MetricCard } from './components/MetricCard'
import { calculateRomi, type RomiInputs } from './utils/romi'

const ZERO_BOUNDARY = 0
const MULTIPLE_BASELINE = 1

const formatCurrency = (value: number) => CURRENCY_FORMATTER.format(Math.round(value))
const formatPercentValue = (value: number) => `${value.toFixed(PERCENT_DECIMALS)}%`

const resolveToneFromPercentage = (percentage: number) => {
  if (percentage >= HUNDRED_PERCENT) {
    return MetricTone.Positive
  }
  if (percentage > ZERO_BOUNDARY) {
    return MetricTone.Neutral
  }
  return MetricTone.Negative
}

const resolveToneFromContribution = (contribution: number) => {
  if (contribution > ZERO_BOUNDARY) {
    return MetricTone.Positive
  }
  if (contribution < ZERO_BOUNDARY) {
    return MetricTone.Negative
  }
  return MetricTone.Neutral
}

function App() {
  const [inputs, setInputs] = useState<RomiInputs>(DEFAULT_INPUTS)
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>(ScenarioKey.Base)
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault()

  const handleNumberChange =
    (field: InputField) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const rawValue = Number(event.target.value)
      setInputs((prev) => ({
        ...prev,
        [field]: Number.isNaN(rawValue) ? ZERO_BOUNDARY : rawValue,
      }))
    }

  const baseResult = useMemo(() => calculateRomi(inputs), [inputs])

  const scenarioResults = useMemo(
    () =>
      SCENARIOS.map((scenario) => {
        const revenueMultiplier = 1 + scenario.revenueShift
        const adjustedRevenue = Math.max(ZERO_BOUNDARY, inputs.incrementalRevenue * revenueMultiplier)
        const scenarioInputs: RomiInputs = {
          ...inputs,
          incrementalRevenue: adjustedRevenue,
        }
        return {
          ...scenario,
          ...calculateRomi(scenarioInputs),
        }
      }),
    [inputs],
  )

  const baseScenario =
    scenarioResults.find((scenario) => scenario.key === ScenarioKey.Base) ?? scenarioResults[0]
  const activeScenario =
    scenarioResults.find((scenario) => scenario.key === selectedScenario) ?? baseScenario

  return (
    <main className="app">
      <header className="hero">
        <p className="hero__eyebrow">ROMI cockpit</p>
        <h1>Return on Marketing Investment calculator</h1>
        <p className="hero__description">
          Track how marketing dollars convert into incremental contribution. Tweak the inputs, see
          the breakeven revenue you need, and share defensible ROMI targets with finance.
        </p>
      </header>

      <section className="dashboard">
        <form className="panel" onSubmit={handleFormSubmit}>
          <div className="panel__header">
            <h2>Investment levers</h2>
            <p>Update the assumptions that drive your ROMI story.</p>
          </div>

          <label className="field">
            <span className="field__label">Marketing spend</span>
            <input
              type="number"
              inputMode="decimal"
              min={ZERO_BOUNDARY}
              step={MONEY_STEP}
              value={inputs.marketingSpend}
              onChange={handleNumberChange(InputField.MarketingSpend)}
            />
            <span className="field__hint">Paid media, production, and agency retainers.</span>
          </label>

          <label className="field">
            <span className="field__label">Incremental revenue</span>
            <input
              type="number"
              inputMode="decimal"
              min={ZERO_BOUNDARY}
              step={MONEY_STEP}
              value={inputs.incrementalRevenue}
              onChange={handleNumberChange(InputField.IncrementalRevenue)}
            />
            <span className="field__hint">Attributed revenue lift from the program.</span>
          </label>

          <label className="field">
            <span className="field__label">Gross margin %</span>
            <input
              type="number"
              inputMode="decimal"
              min={MIN_MARGIN_PERCENT}
              max={MAX_MARGIN_PERCENT}
              step={PERCENT_STEP}
              value={inputs.grossMarginPct}
              onChange={handleNumberChange(InputField.GrossMargin)}
            />
            <span className="field__hint">Use blended margin for the mix you expect.</span>
          </label>

          <label className="field">
            <span className="field__label">Additional costs</span>
            <input
              type="number"
              inputMode="decimal"
              min={ZERO_BOUNDARY}
              step={MONEY_STEP}
              value={inputs.additionalCosts}
              onChange={handleNumberChange(InputField.AdditionalCosts)}
            />
            <span className="field__hint">Fulfillment, success incentives, or tooling.</span>
          </label>
        </form>

        <section className="panel panel--metrics">
          <div className="panel__header">
            <h2>ROMI snapshot</h2>
            <p>Outputs refresh instantly as you adjust the inputs.</p>
          </div>
          <div className="metrics-grid">
            <MetricCard
              title="ROMI %"
              value={formatPercentValue(baseResult.romiPercentage)}
              helper={
                baseResult.romiPercentage >= HUNDRED_PERCENT
                  ? 'Beats the 100% break-even bar.'
                  : 'Below the 100% break-even line.'
              }
              tone={resolveToneFromPercentage(baseResult.romiPercentage)}
            />
            <MetricCard
              title="ROMI multiple"
              value={`${baseResult.romiMultiple.toFixed(PERCENT_DECIMALS)}x`}
              helper={
                baseResult.romiMultiple > MULTIPLE_BASELINE
                  ? 'Every $1 creates more than $1 in gross profit.'
                  : 'Still burning cash vs. spend.'
              }
              tone={baseResult.romiMultiple > MULTIPLE_BASELINE ? MetricTone.Positive : MetricTone.Negative}
            />
            <MetricCard
              title="Net contribution"
              value={formatCurrency(baseResult.netContribution)}
              helper={baseResult.netContribution >= ZERO_BOUNDARY ? 'Incremental profit after spend.' : 'Shortfall to cover spend.'}
              tone={resolveToneFromContribution(baseResult.netContribution)}
            />
            <MetricCard
              title="Break-even revenue"
              value={formatCurrency(baseResult.breakEvenRevenue)}
              helper="Revenue required to cover total investment."
            />
            <MetricCard
              title="Total investment"
              value={formatCurrency(baseResult.totalInvestment)}
              helper="Marketing spend plus additional costs."
            />
            <MetricCard
              title="Gross profit"
              value={formatCurrency(baseResult.grossProfit)}
              helper="Incremental revenue multiplied by margin."
            />
          </div>
        </section>
      </section>

      <section className="panel">
        <div className="panel__header">
          <h2>Scenario stress test</h2>
          <p>Pressure-test ROMI by flexing revenue capture assumptions.</p>
        </div>

        <div className="scenario-selector">
          {scenarioResults.map((scenario) => (
            <button
              type="button"
              key={scenario.key}
              className={`scenario-selector__button${
                scenario.key === selectedScenario ? ' scenario-selector__button--active' : ''
              }`}
              aria-pressed={scenario.key === selectedScenario}
              onClick={() => setSelectedScenario(scenario.key)}
            >
              <span className="scenario-selector__label">{scenario.label}</span>
              <span className="scenario-selector__shift">
                {PERCENT_FORMATTER.format(scenario.revenueShift)}
              </span>
            </button>
          ))}
        </div>

        <div className="scenario-summary">
          <div>
            <p className="scenario-summary__eyebrow">Revenue delta</p>
            <p className="scenario-summary__value">
              {PERCENT_FORMATTER.format(activeScenario.revenueShift)}
            </p>
          </div>
          <div>
            <p className="scenario-summary__eyebrow">ROMI %</p>
            <p className="scenario-summary__value">
              {formatPercentValue(activeScenario.romiPercentage)}
            </p>
          </div>
          <div>
            <p className="scenario-summary__eyebrow">Net contribution</p>
            <p className="scenario-summary__value">{formatCurrency(activeScenario.netContribution)}</p>
          </div>
        </div>

        <p className="scenario-description">{activeScenario.description}</p>

        <table className="scenario-table">
          <thead>
            <tr>
              <th scope="col">Scenario</th>
              <th scope="col">Revenue shift</th>
              <th scope="col">ROMI %</th>
              <th scope="col">Net contribution</th>
            </tr>
          </thead>
          <tbody>
            {scenarioResults.map((scenario) => (
              <tr key={scenario.key}>
                <td>{scenario.label}</td>
                <td>{PERCENT_FORMATTER.format(scenario.revenueShift)}</td>
                <td>{formatPercentValue(scenario.romiPercentage)}</td>
                <td>{formatCurrency(scenario.netContribution)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default App
