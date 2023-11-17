import React from 'react'

const Empty = React.lazy(() => import('./views/empty/Empty'))

const routes = [{ path: '/empty', name: 'Empty', element: Empty }]

export default routes
