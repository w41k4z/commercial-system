import { Helmet } from 'react-helmet-async';

import ProformaView from 'src/sections/proforma/view/proforma-view';

// ----------------------------------------------------------------------

export default function ProformaPage() {
  return (
    <>
      <Helmet>
        <title> Proforma | Minimal UI </title>
      </Helmet>

      <ProformaView />
    </>
  );
}
