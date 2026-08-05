import { Button, ButtonGroup, Dropdown, DropdownButton, CloseButton } from 'react-bootstrap'
import { DocsPage, PageHeader, H2, Callout, Preview, SpecTable, Do, Dont, DoDont } from '../../components/docs.jsx'
import { IconArrowRight } from '../../components/icons.jsx'

const IconGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 3a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 8 3Z" />
  </svg>
)

export default function Actions() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Components"
        title="Actions"
        lead="Controls that let people do things — buttons and their relatives. Getting hierarchy right here is the single biggest driver of a clear, confident interface."
      />

      <H2>Buttons</H2>
      <p>
        Buttons trigger an action. Their variant signals importance and meaning: a solid
        primary button is the main action; outline and link buttons step back from it.
      </p>
      <Preview meta="Solid variants — use sparingly; one primary per screen">
        {['primary', 'secondary', 'success', 'danger'].map((v) => (
          <Button key={v} variant={v} className="text-capitalize">{v}</Button>
        ))}
      </Preview>
      <Preview meta="Outline & link — for secondary and tertiary actions">
        <Button variant="outline-primary">Outline</Button>
        <Button variant="link">Link button</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </Preview>
      <Preview meta="Sizes — small, default, large">
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary">Default</Button>
        <Button variant="primary" size="lg">Large</Button>
      </Preview>

      <H2>Button hierarchy</H2>
      <DoDont>
        <Do preview={
          <>
            <Button variant="primary" size="sm">Place order</Button>
            <Button variant="outline-secondary" size="sm">Cancel</Button>
          </>
        }>
          Pair one solid primary action with a quieter secondary. The eye goes straight to
          the important choice.
        </Do>
        <Dont preview={
          <>
            <Button variant="primary" size="sm">Place order</Button>
            <Button variant="primary" size="sm">Cancel</Button>
          </>
        }>
          Give two competing actions the same weight. The primary action stops standing out.
        </Dont>
      </DoDont>

      <H2>Icon buttons</H2>
      <p>
        A square, icon-only button for compact toolbars and repeated row actions. Always give
        it an <code>aria-label</code> — the icon alone isn't a name.
      </p>
      <Preview meta="Sizes and variants — each needs an aria-label">
        <Button variant="primary" className="btn-icon btn-sm" aria-label="Add"><IconGlyph /></Button>
        <Button variant="primary" className="btn-icon" aria-label="Add"><IconGlyph /></Button>
        <Button variant="outline-secondary" className="btn-icon" aria-label="Add"><IconGlyph /></Button>
      </Preview>

      <H2>Button group</H2>
      <p>Join related actions or a set of mutually exclusive choices into one unit.</p>
      <Preview meta="Horizontal group; inner corners collapse to the shared radius">
        <ButtonGroup>
          <Button variant="outline-primary">Day</Button>
          <Button variant="outline-primary" active>Week</Button>
          <Button variant="outline-primary">Month</Button>
        </ButtonGroup>
      </Preview>

      <H2>Links</H2>
      <p>
        Use a link for navigation — moving to another place — and a button for an action that
        changes something. A link that's styled like a button is fine; a button that navigates
        confuses assistive tech and breaks “open in new tab”.
      </p>
      <Preview meta="Text links inherit the theme; hover shifts 20% darker">
        <a href="#" onClick={(e) => e.preventDefault()} className="link-primary">Primary link</a>
        <a href="#" onClick={(e) => e.preventDefault()} className="link-secondary">Secondary link</a>
        <a href="#" onClick={(e) => e.preventDefault()} className="link-primary d-inline-flex align-items-center gap-1">
          Trailing arrow <IconArrowRight />
        </a>
      </Preview>

      <H2>Dropdown &amp; close</H2>
      <Preview meta="Dropdown button and the × close control">
        <DropdownButton title="Actions" variant="primary">
          <Dropdown.Item href="#" onClick={(e) => e.preventDefault()}>Edit</Dropdown.Item>
          <Dropdown.Item href="#" onClick={(e) => e.preventDefault()}>Duplicate</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#" onClick={(e) => e.preventDefault()}>Delete</Dropdown.Item>
        </DropdownButton>
        <CloseButton aria-label="Close" />
      </Preview>

      <H2>Reference</H2>
      <SpecTable
        head={['Action level', 'Use', 'Component']}
        rows={[
          ['Primary', 'The one main action', <><code>variant="primary"</code> (solid)</>],
          ['Secondary', 'Supporting actions', <><code>variant="outline-*"</code></>],
          ['Tertiary', 'Low-emphasis / inline', <><code>variant="link"</code></>],
          ['Destructive', 'Deletes or discards', <><code>variant="danger"</code> + confirm</>],
        ]}
      />

      <Callout variant="info" title="Accessibility built in">
        These controls ship with a visible focus ring, keyboard operation, and correct roles.
        Keep labels descriptive and don't disable a button without telling the user why.
      </Callout>
    </DocsPage>
  )
}
