import { Nav, Tab, Breadcrumb, Pagination } from 'react-bootstrap'
import { DocsPage, PageHeader, H2, Callout, Preview, Do, Dont, DoDont, SpecTable } from '../../components/docs.jsx'

export default function Navigation() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Components"
        title="Navigation"
        lead="Help people move between views and always know where they are. Navigation should be predictable — the same control in the same place doing the same thing on every screen."
      />

      <H2>Tabs</H2>
      <p>
        Tabs switch between views of the <em>same</em> object without leaving the page — the
        Overview, Specs, and Reviews of one product. They aren't for navigating to unrelated
        destinations.
      </p>
      <Preview center={false} meta="Tabs with live content panels">
        <Tab.Container defaultActiveKey="overview">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item><Nav.Link eventKey="overview">Overview</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="specs">Specs</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="reviews">Reviews</Nav.Link></Nav.Item>
          </Nav>
          <Tab.Content className="text-secondary">
            <Tab.Pane eventKey="overview">Switching tabs swaps this content in place.</Tab.Pane>
            <Tab.Pane eventKey="specs">Fabric, sizing, and care details.</Tab.Pane>
            <Tab.Pane eventKey="reviews">Customer ratings and comments.</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Preview>

      <H2>Nav styles</H2>
      <Preview center={false} meta="Pills and underline variants of the same nav">
        <div className="w-100">
          <Nav variant="pills" defaultActiveKey="a" className="mb-3">
            <Nav.Item><Nav.Link eventKey="a">Active</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="b">Orders</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="c">Returns</Nav.Link></Nav.Item>
          </Nav>
          <Nav variant="underline" defaultActiveKey="a">
            <Nav.Item><Nav.Link eventKey="a">Active</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="b">Orders</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="c">Returns</Nav.Link></Nav.Item>
          </Nav>
        </div>
      </Preview>

      <H2>Breadcrumb</H2>
      <p>
        Breadcrumbs show the path to the current page in a hierarchy and let people jump back
        up. The current page is the last item and isn't a link.
      </p>
      <Preview center={false} meta="Chevron divider is the SanMar default">
        <Breadcrumb listProps={{ style: { marginBottom: 0 } }}>
          <Breadcrumb.Item href="#">Account</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Orders</Breadcrumb.Item>
          <Breadcrumb.Item active>Order #4821</Breadcrumb.Item>
        </Breadcrumb>
      </Preview>

      <H2>Pagination</H2>
      <p>
        Break long result sets into pages. The active page uses a soft-blue fill; First / Prev
        / Next / Last controls disable at the ends.
      </p>
      <Preview center={false} meta="The active page is tinted, not solid">
        <Pagination className="mb-0">
          <Pagination.Prev />
          <Pagination.Item>1</Pagination.Item>
          <Pagination.Item active>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Ellipsis disabled />
          <Pagination.Item>10</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </Preview>

      <H2>Tabs vs. links</H2>
      <DoDont>
        <Do preview={
          <Nav variant="tabs" defaultActiveKey="1" style={{ fontSize: '0.8rem' }}>
            <Nav.Item><Nav.Link eventKey="1">Details</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="2">History</Nav.Link></Nav.Item>
          </Nav>
        }>
          Use tabs for alternate views of one thing, kept on the same page.
        </Do>
        <Dont preview={
          <Nav variant="tabs" defaultActiveKey="1" style={{ fontSize: '0.8rem' }}>
            <Nav.Item><Nav.Link eventKey="1">Home</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="2">Checkout</Nav.Link></Nav.Item>
          </Nav>
        }>
          Use tabs to jump between unrelated destinations — that's what links and menus are for.
        </Dont>
      </DoDont>

      <SpecTable
        head={['Pattern', 'Best for']}
        rows={[
          ['Tabs', 'Alternate views of the same content'],
          ['Breadcrumb', 'Showing and retracing hierarchy depth'],
          ['Pagination', 'Splitting long lists / tables'],
          ['Pills / underline nav', 'Section switching within a page or account area'],
        ]}
      />

      <Callout variant="info" title="Keyboard & current state">
        Navs are keyboard-operable with arrow keys, and the active item is marked for
        assistive tech. Always keep exactly one item marked current so people know where they
        are.
      </Callout>
    </DocsPage>
  )
}
