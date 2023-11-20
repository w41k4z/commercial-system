import React from 'react'

const Empty = React.lazy(() => import('./views/empty/Empty'))
const Article = React.lazy(() => import('./views/crud/Article'))
const Fournisseur = React.lazy(() => import('./views/crud/Fournisseur'))
const NouveauBesoin = React.lazy(() => import('./views/besoin/NouveauBesoin'))
const PurchaseOrder = React.lazy(() => import('./views/purchase_order/new/New'))
const PurchaseOrderValidation = React.lazy(() => import('./views/purchase_order/status/Validation'))

const routes = [
  { path: '/crud/article', name: 'Article', element: Article },
  { path: '/crud/fournisseur', name: 'Fournisseur', element: Fournisseur },
  { path: '/besoin/nouveau', name: 'Nouveau Besoin', element: NouveauBesoin },
  { path: '/purchase_order/new', name: 'Nouveau Bon de commande', element: PurchaseOrder },
  {
    path: '/purchase_order/validation',
    name: 'Validation de bon de commande',
    element: PurchaseOrderValidation,
  },
  { path: '/empty', name: 'Empty', element: Empty },
]

export default routes
