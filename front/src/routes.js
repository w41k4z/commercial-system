import React from 'react'

const Empty = React.lazy(() => import('./views/empty/Empty'))
const Article = React.lazy(() => import('./views/crud/Article'))
const Fournisseur = React.lazy(() => import('./views/crud/Fournisseur'))
const NouveauBesoin = React.lazy(() => import('./views/besoin/NouveauBesoin'))
const DemandeProforma = React.lazy(() => import('./views/proforma/DemandeProforma'))
const EnAttenteProforma = React.lazy(() => import('./views/proforma/EnAttenteProforma'))
const NouveauProforma = React.lazy(() => import('./views/proforma/NouveauProforma'))
const MoinsDisant = React.lazy(() => import('./views/proforma/MoinsDisant'))

const routes = [
  { path: '/crud/article', name: 'Article', element: Article },
  { path: '/crud/fournisseur', name: 'Fournisseur', element: Fournisseur },
  { path: '/besoin/nouveau', name: 'Nouveau Besoin', element: NouveauBesoin },
  { path: '/proforma/demandeproforma', name: 'Demande Proforma', element: DemandeProforma },
  { path: '/proforma/enattenteproforma', name: 'En Attente Proforma', element: EnAttenteProforma },
  { path: '/proforma/nouveauproforma', name: 'Nouveau Proforma', element: NouveauProforma },
  { path: '/proforma/moinsdisant', name: 'Moins Disant', element: MoinsDisant },
  { path: '/empty', name: 'Empty', element: Empty },
]

export default routes
