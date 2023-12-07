import { Helmet } from 'react-helmet-async';

import { OrderView } from 'src/sections/orders/view';

const order = () => (
    <>
        <Helmet>
            <title> Orders | Minimal UI </title>
        </Helmet>
        <OrderView/>
    </>
  )

export default order