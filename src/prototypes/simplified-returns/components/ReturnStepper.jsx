import './ReturnStepper.css'

// Chevron progress stepper for the Simplified Returns flow.
// Fixed three-step sequence; `current` is the 1-based active step.
const STEPS = ['Select Return Items', 'Add Details', 'Review and Submit']

export default function ReturnStepper({ current = 1 }) {
  return (
    <ol className="returns-stepper">
      {STEPS.map((label, i) => {
        const isActive = i + 1 === current
        return (
          <li
            key={label}
            className={`returns-stepper__step${isActive ? ' returns-stepper__step--active' : ''}`}
            aria-current={isActive ? 'step' : undefined}
          >
            {i + 1}. {label}
          </li>
        )
      })}
    </ol>
  )
}
