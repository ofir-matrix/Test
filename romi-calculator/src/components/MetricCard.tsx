import { MetricTone } from '../constants/calculator'

interface MetricCardProps {
  title: string
  value: string
  helper?: string
  trendLabel?: string
  tone?: MetricTone
}

export const MetricCard = ({
  title,
  value,
  helper,
  trendLabel,
  tone = MetricTone.Neutral,
}: MetricCardProps) => (
  <article className={`metric-card metric-card--${tone}`}>
    <div className="metric-card__header">
      <p className="metric-card__label">{title}</p>
      {trendLabel ? <span className="metric-card__badge">{trendLabel}</span> : null}
    </div>
    <p className="metric-card__value">{value}</p>
    {helper ? <p className="metric-card__helper">{helper}</p> : null}
  </article>
)
