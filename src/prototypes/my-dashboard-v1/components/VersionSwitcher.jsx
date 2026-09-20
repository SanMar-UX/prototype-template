import { useNavigate } from 'react-router-dom'

// Demo chrome added to the otherwise-untouched V1 snapshot: lets reviewers
// jump to V2 (/my-dashboard). The changelog lives on the V2 side.
export default function VersionSwitcher() {
  const navigate = useNavigate()
  return (
    <div className="mdb-vswitcher">
      <div className="mdb-vswitcher__inner">
        <span className="mdb-vswitcher__label">Version:</span>
        <button type="button" className="mdb-vswitcher__btn mdb-vswitcher__btn--active">V1</button>
        <button type="button" className="mdb-vswitcher__btn" onClick={() => navigate('/my-dashboard')}>
          V2
        </button>
      </div>
    </div>
  )
}
