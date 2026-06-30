import { Form } from 'react-bootstrap'
import './ShippingOptions.css'

// Return shipping method picker (radio group). Data-driven so it covers every
// Figma variant: pass `options` (each { id, label, detail? }) and the selected
// `value`; the selected option reveals its `detail` (e.g. cost or address).
// `notRequired` renders the "no ship-back needed" message instead.
export default function ShippingOptions({
  name,
  title = 'Select your return shipping method',
  options = [],
  value,
  onChange,
  notRequired = false,
  notRequiredText = 'Shipback is not required for this item',
}) {
  if (notRequired) {
    return <div className="shipping-options">{notRequiredText}</div>
  }

  return (
    <div className="shipping-options">
      <div className="shipping-options__title">{title}</div>
      {options.map((opt) => (
        <div key={opt.id} className="shipping-options__option">
          <Form.Check
            type="radio"
            name={name}
            id={`${name}-${opt.id}`}
            label={opt.label}
            checked={value === opt.id}
            onChange={() => onChange?.(opt.id)}
            className="mb-0"
          />
          {value === opt.id && opt.detail && (
            <div className="shipping-options__detail">{opt.detail}</div>
          )}
        </div>
      ))}
    </div>
  )
}
