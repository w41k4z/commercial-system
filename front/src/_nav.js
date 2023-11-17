import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilList,
  cilNoteAdd,
  cilNotes,
  cilObjectGroup,
  cilPen,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilTruck,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'CRUD',
  },
  {
    component: CNavItem,
    name: 'Article',
    to: '/crud/article',
    icon: <CIcon icon={cilObjectGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Fournisseur',
    to: '/crud/fournisseur',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Besoin',
  },
  {
    component: CNavItem,
    name: 'Nouveau',
    to: '/besoin/nouveau',
    icon: <CIcon icon={cilPen} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Liste',
    to: '/empty',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Proforma',
  },
  {
    component: CNavItem,
    name: 'Demande',
    to: '/empty',
    icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Saisie',
    to: '/empty',
    icon: <CIcon icon={cilPen} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Moins disant',
    to: '/empty',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Bon de commande',
  },
  {
    component: CNavItem,
    name: 'Generer',
    to: '/empty',
    icon: <CIcon icon={cilPen} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Liste',
    to: '/empty',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
]

export default _nav
