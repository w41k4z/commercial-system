import React from 'react'

const Empty = React.lazy(() => import('./views/empty/Empty'))
const Article = React.lazy(() => import('./views/crud/Article'))
const Fournisseur = React.lazy(() => import('./views/crud/Fournisseur'))
const NouveauBesoin = React.lazy(() => import('./views/besoin/NouveauBesoin'))

const DemandeProforma = React.lazy(() => import('./views/proforma/DemandeProforma'))
const EnAttenteProforma = React.lazy(() => import('./views/proforma/EnAttenteProforma'))
const NouveauProforma = React.lazy(() => import('./views/proforma/NouveauProforma'))
const MoinsDisant = React.lazy(() => import('./views/proforma/MoinsDisant'))
const BonEntree = React.lazy(() => import('./views/bonmagasin/BonEntree'))
const BonSortie = React.lazy(() => import('./views/bonmagasin/BonSortie'))

const PurchaseOrder = React.lazy(() => import('./views/purchase_order/new/New'))
const PurchaseOrderValidation = React.lazy(() => import('./views/purchase_order/status/Validation'))
const PurchaseOrderDetails = React.lazy(() => import('./views/purchase_order/status/Details'))
const DeliveryReceipt = React.lazy(() => import('./views/delivery_receipt/DeliveryReceipt'))

const routes = [
  { path: '/crud/article', name: 'Article', element: Article },
  { path: '/crud/fournisseur', name: 'Fournisseur', element: Fournisseur },
  { path: '/besoin/nouveau', name: 'Nouveau Besoin', element: NouveauBesoin },

  { path: '/proforma/demandeproforma', name: 'Demande Proforma', element: DemandeProforma },
  { path: '/proforma/enattenteproforma', name: 'En Attente Proforma', element: EnAttenteProforma },
  { path: '/proforma/nouveauproforma', name: 'Nouveau Proforma', element: NouveauProforma },
  { path: '/proforma/moinsdisant', name: 'Moins Disant', element: MoinsDisant },

  { path: '/purchase_order/new', name: 'Nouveau Bon de commande', element: PurchaseOrder },
  { path: '/purchase_order/new', name: 'Nouveau Bon de commande', element: PurchaseOrder },
  {
    path: '/purchase_order/validation',
    name: 'Validation de bon de commande',
    element: PurchaseOrderValidation,
  },
  {
    path: '/purchase_order/details',
    name: 'Validation de bon de commande',
    element: PurchaseOrderDetails,
  },
  { path: '/delivery_receipt/Generate', name: 'Bon de réception', element: DeliveryReceipt },

  { path: '/empty', name: 'Empty', element: Empty },
  { path: '/bonmagasin/entree', name: 'Bon d entree', element: BonEntree },
  { path: '/bonmagasin/sortie', name: 'Bon de sortie', element: BonSortie },
]

export default routes
