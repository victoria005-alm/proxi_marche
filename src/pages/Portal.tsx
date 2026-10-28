import { useMemo, useState, type ReactNode } from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router"

type Role = "client" | "partner" | "admin"

type NavItem = {
  label: string
  path: string
  icon: IconName
}

type IconName = "analytics" | "arrow" | "basket" | "bell" | "box" | "card" | "check" | "chevron" | "clock" | "close" | "download" | "edit" | "eye" | "filter" | "heart" | "help" | "home" | "location" | "logout" | "menu" | "minus" | "more" | "percent" | "plus" | "search" | "settings" | "shield" | "shop" | "star" | "team" | "trash" | "user" | "users"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    analytics: (
      <>
        <path d="M4 20V10m6 10V4m6 16v-7m4 7V7" />
      </>
    ),
    arrow: <path d="m9 18 6-6-6-6" />,
    basket: (
      <>
        <path d="M4 9h16l-1.4 10H5.4L4 9Z" />
        <path d="m8 9 4-6 4 6" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
        <path d="M10 21h4" />
      </>
    ),
    box: (
      <>
        <path d="m3 7 9-4 9 4-9 4-9-4Z" />
        <path d="m3 7 9 4 9-4v10l-9 4-9-4V7Z" />
      </>
    ),
    card: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M6 15h3" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    download: (
      <>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 20h16" />
      </>
    ),
    edit: (
      <>
        <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
        <path d="m14 7 3 3" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    filter: <path d="M4 6h16M7 12h10m-7 6h4" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.3 2.3 0 1 1 3.3 2c-1 .5-1.1 1.1-1.1 2M12 17h.01" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    logout: <path d="M10 17l5-5-5-5m5 5H3m11-9h6v18h-6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    minus: <path d="M5 12h14" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),
    percent: (
      <>
        <path d="m7 17 10-10" />
        <circle cx="7" cy="7" r="2" />
        <circle cx="17" cy="17" r="2" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 4 6v5c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    shop: (
      <>
        <path d="M4 10v10h16V10M3 10l2-6h14l2 6" />
        <path d="M3 10a3 3 0 0 0 5 2 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5-2" />
      </>
    ),
    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    ),
    team: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20a6 6 0 0 1 12 0m2-15a3 3 0 0 1 0 6m1 3a5 5 0 0 1 4 5" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2" />
        <path d="M3 20a6 6 0 0 1 12 0m1-5a5 5 0 0 1 5 5" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  )
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`portal-brand ${light ? "light" : ""}`} to="/">
      <span className="portal-brand-mark">
        <Icon name="location" size={22} />
        <Icon name="basket" size={17} />
      </span>
      <strong>
        Proxi<span>Marché</span>
      </strong>
    </Link>
  )
}

const nav: Record<Role, NavItem[]> = {
  client: [
    { label: "Accueil", path: "/client/accueil", icon: "home" },
    { label: "Rechercher", path: "/client/recherche", icon: "search" },
    { label: "Supermarchés", path: "/client/supermarches", icon: "shop" },
    { label: "Promotions", path: "/client/promotions", icon: "percent" },
    { label: "Panier", path: "/client/panier", icon: "basket" },
    { label: "Mes commandes", path: "/client/commandes", icon: "box" },
    { label: "Favoris", path: "/client/favoris", icon: "heart" },
    { label: "Mon profil", path: "/client/profil", icon: "user" },
    { label: "Paramètres", path: "/client/parametres", icon: "settings" },
    { label: "Aide", path: "/client/aide", icon: "help" },
  ],
  partner: [
    {
      label: "Tableau de bord",
      path: "/partenaire/tableau-de-bord",
      icon: "home",
    },
    { label: "Produits", path: "/partenaire/produits", icon: "box" },
    { label: "Promotions", path: "/partenaire/promotions", icon: "percent" },
    { label: "Commandes", path: "/partenaire/commandes", icon: "basket" },
    {
      label: "Statistiques",
      path: "/partenaire/statistiques",
      icon: "analytics",
    },
    { label: "Mon magasin", path: "/partenaire/magasin", icon: "shop" },
    { label: "Équipe", path: "/partenaire/equipe", icon: "team" },
    { label: "Paramètres", path: "/partenaire/parametres", icon: "settings" },
  ],
  admin: [
    {
      label: "Vue d'ensemble",
      path: "/administration/tableau-de-bord",
      icon: "home",
    },
    {
      label: "Utilisateurs",
      path: "/administration/utilisateurs",
      icon: "users",
    },
    {
      label: "Supermarchés",
      path: "/administration/supermarches",
      icon: "shop",
    },
    { label: "Validation", path: "/administration/validation", icon: "shield" },
    { label: "Catalogue", path: "/administration/catalogue", icon: "box" },
    { label: "Catégories", path: "/administration/categories", icon: "filter" },
    { label: "Commandes", path: "/administration/commandes", icon: "basket" },
    { label: "Finances", path: "/administration/finances", icon: "card" },
    {
      label: "Signalements",
      path: "/administration/signalements",
      icon: "bell",
    },
    {
      label: "Paramètres",
      path: "/administration/parametres",
      icon: "settings",
    },
  ],
}

const roleLabels: Record<Role, {
  title: string
  user: string
  initials: string
}> = {
  client: { title: "Espace client", user: "Armand K.", initials: "AK" },
  partner: {
    title: "Espace partenaire",
    user: "Super U Akpakpa",
    initials: "SU",
  },
  admin: { title: "Administration", user: "Mireille A.", initials: "MA" },
}

export function PortalLayout({ role }: { role: Role }) {
  const [open, setOpen] = useState(false)
  const roleInfo = roleLabels[role]
  const location = useLocation()
  const activeItem = nav[role].find((item) =>
    location.pathname.startsWith(item.path),
  )

  return (
    <div className={`portal-shell portal-${role}`}>
      <aside className={`portal-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <Brand light />
          <button
            aria-label="Fermer le menu"
            className="sidebar-close"
            onClick={() => setOpen(false)}
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>
        <span className="role-pill">{roleInfo.title}</span>
        <nav className="sidebar-nav">
          {nav[role].map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              key={item.path}
              onClick={() => setOpen(false)}
              to={item.path}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.label === "Commandes" && <b>8</b>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">
          <Link to="/">
            <Icon name="logout" size={18} />
            Changer d'espace
          </Link>
          <small>ProxiMarché · Version 1.0</small>
        </div>
      </aside>
      {open && (
        <button
          aria-label="Fermer le menu"
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
          type="button"
        />
      )}
      <div className="portal-main">
        <header className="portal-topbar">
          <button
            aria-label="Ouvrir le menu"
            className="portal-menu"
            onClick={() => setOpen(true)}
            type="button"
          >
            <Icon name="menu" />
          </button>
          <div className="portal-breadcrumb">
            <small>{roleInfo.title}</small>
            <strong>{activeItem?.label ?? "ProxiMarché"}</strong>
          </div>
          <div className="portal-actions">
            <label className="portal-global-search">
              <Icon name="search" size={17} />
              <input placeholder="Rechercher..." />
            </label>
            <Link
              aria-label="Notifications"
              className="portal-icon-button"
              to={
                role === "client"
                  ? "/client/notifications"
                  : role === "partner"
                    ? "/partenaire/notifications"
                    : "/administration/signalements"
              }
            >
              <Icon name="bell" size={19} />
              <i />
            </Link>
            <button className="portal-user" type="button">
              <span>{roleInfo.initials}</span>
              <b>{roleInfo.user}</b>
              <Icon name="chevron" size={15} />
            </button>
          </div>
        </header>
        <main className="portal-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

const pageMeta: Record<string, {
  eyebrow: string
  title: string
  description: string
  action?: string
}> = {
  search: {
    eyebrow: "C02 · RECHERCHE",
    title: "Que recherchez-vous ?",
    description: "Trouvez rapidement un produit disponible près de chez vous.",
  },
  results: {
    eyebrow: "C03 · RÉSULTATS",
    title: "Résultats pour « Riz »",
    description: "32 produits trouvés dans 8 supermarchés.",
  },
  product: {
    eyebrow: "C04 · PRODUIT",
    title: "Riz parfumé La Rizière",
    description: "Comparez les prix et choisissez l'offre la plus avantageuse.",
  },
  compare: {
    eyebrow: "C05 · COMPARATEUR",
    title: "Comparer les offres",
    description: "Les prix disponibles pour votre sélection.",
    action: "Partager",
  },
  stores: {
    eyebrow: "C06 · SUPERMARCHÉS",
    title: "Supermarchés à proximité",
    description: "Découvrez les enseignes disponibles autour de vous.",
  },
  store: {
    eyebrow: "C07 · SUPERMARCHÉ",
    title: "Super U Akpakpa",
    description: "Ouvert aujourd'hui de 08:00 à 21:00.",
  },
  promotions: {
    eyebrow: "C08 · PROMOTIONS",
    title: "Les bons plans du moment",
    description: "Économisez sur les produits que vous aimez.",
  },
  cart: {
    eyebrow: "C09 · PANIER",
    title: "Votre panier",
    description: "4 articles chez Super U Akpakpa.",
  },
  checkout: {
    eyebrow: "C10 · COMMANDE",
    title: "Finaliser la commande",
    description: "Vérifiez la livraison et choisissez votre moyen de paiement.",
  },
  confirmation: {
    eyebrow: "C11 · CONFIRMATION",
    title: "Commande confirmée",
    description: "Votre commande #PX-2948 a bien été enregistrée.",
  },
  tracking: {
    eyebrow: "C12 · SUIVI",
    title: "Votre commande est en route",
    description: "Livraison estimée entre 18:20 et 18:35.",
  },
  orders: {
    eyebrow: "C13 · COMMANDES",
    title: "Mes commandes",
    description: "Retrouvez vos commandes passées et en cours.",
  },
  favorites: {
    eyebrow: "C14 · FAVORIS",
    title: "Mes favoris",
    description: "Vos produits et supermarchés enregistrés.",
  },
  notifications: {
    eyebrow: "C15 · NOTIFICATIONS",
    title: "Centre de notifications",
    description: "Restez informé des offres et de vos commandes.",
  },
  profile: {
    eyebrow: "C16 · PROFIL",
    title: "Informations personnelles",
    description: "Gérez votre identité et vos coordonnées.",
  },
  addresses: {
    eyebrow: "C17 · ADRESSES",
    title: "Mes adresses",
    description: "Gérez vos lieux de livraison habituels.",
    action: "Ajouter une adresse",
  },
  payments: {
    eyebrow: "C18 · PAIEMENTS",
    title: "Moyens de paiement",
    description: "Mobile Money et cartes enregistrées.",
    action: "Ajouter un moyen",
  },
  settings: {
    eyebrow: "C19 · PARAMÈTRES",
    title: "Préférences",
    description: "Personnalisez votre expérience ProxiMarché.",
  },
  help: {
    eyebrow: "C20 · AIDE",
    title: "Comment pouvons-nous vous aider ?",
    description: "Trouvez une réponse ou contactez notre équipe.",
  },
  dashboard: {
    eyebrow: "S01 · TABLEAU DE BORD",
    title: "Bonjour, Super U Akpakpa",
    description: "Voici l'activité de votre magasin aujourd'hui.",
    action: "Télécharger le rapport",
  },
  products: {
    eyebrow: "S02 · CATALOGUE",
    title: "Gestion des produits",
    description: "1 248 produits actifs dans votre catalogue.",
    action: "Ajouter un produit",
  },
  "new-product": {
    eyebrow: "S03 · PRODUIT",
    title: "Ajouter un produit",
    description: "Renseignez les informations et la disponibilité.",
  },
  "partner-promotions": {
    eyebrow: "S04 · PROMOTIONS",
    title: "Gérer les promotions",
    description: "Créez et pilotez vos campagnes commerciales.",
    action: "Nouvelle promotion",
  },
  "partner-orders": {
    eyebrow: "S05 · COMMANDES",
    title: "Commandes reçues",
    description: "8 commandes nécessitent votre attention.",
  },
  "partner-order": {
    eyebrow: "S06 · COMMANDE",
    title: "Commande #PX-2948",
    description: "Passée aujourd'hui à 17:42 par Armand K.",
  },
  analytics: {
    eyebrow: "S07 · STATISTIQUES",
    title: "Performances du magasin",
    description: "Analyse des ventes et de votre catalogue.",
    action: "Exporter",
  },
  "store-profile": {
    eyebrow: "S08 · MAGASIN",
    title: "Profil du magasin",
    description: "Informations visibles par les clients.",
  },
  team: {
    eyebrow: "S09 · ÉQUIPE",
    title: "Membres de l'équipe",
    description: "Gérez les accès et responsabilités.",
    action: "Inviter un membre",
  },
  "partner-notifications": {
    eyebrow: "S10 · NOTIFICATIONS",
    title: "Notifications",
    description: "Activité récente de votre espace partenaire.",
  },
  "partner-settings": {
    eyebrow: "S11 · PARAMÈTRES",
    title: "Paramètres du partenaire",
    description: "Livraison, paiements et préférences du magasin.",
  },
  "admin-dashboard": {
    eyebrow: "A01 · VUE D'ENSEMBLE",
    title: "Pilotage de la plateforme",
    description: "Les indicateurs clés de ProxiMarché en temps réel.",
    action: "Rapport mensuel",
  },
  users: {
    eyebrow: "A02 · UTILISATEURS",
    title: "Gestion des utilisateurs",
    description: "24 682 comptes enregistrés sur la plateforme.",
  },
  partners: {
    eyebrow: "A03 · PARTENAIRES",
    title: "Supermarchés partenaires",
    description: "Suivez les enseignes actives et leurs performances.",
    action: "Ajouter un partenaire",
  },
  approval: {
    eyebrow: "A04 · VALIDATION",
    title: "Demandes de validation",
    description: "6 dossiers partenaires attendent une décision.",
  },
  catalog: {
    eyebrow: "A05 · CATALOGUE",
    title: "Catalogue global",
    description: "Supervisez les produits publiés sur la plateforme.",
  },
  categories: {
    eyebrow: "A06 · CATÉGORIES",
    title: "Catégories de produits",
    description: "Organisez l'arborescence du catalogue.",
    action: "Nouvelle catégorie",
  },
  "admin-orders": {
    eyebrow: "A07 · COMMANDES",
    title: "Toutes les commandes",
    description: "Suivi transversal des transactions.",
  },
  finance: {
    eyebrow: "A08 · FINANCES",
    title: "Finances et commissions",
    description: "Vue consolidée des revenus de la plateforme.",
    action: "Exporter la période",
  },
  reports: {
    eyebrow: "A09 · MODÉRATION",
    title: "Signalements et litiges",
    description: "Traitez les incidents remontés par les utilisateurs.",
  },
  "admin-settings": {
    eyebrow: "A10 · PARAMÈTRES",
    title: "Configuration de la plateforme",
    description: "Règles métier, sécurité et communications.",
  },
}

export function PortalPage({ page, role }: { page: string; role: Role }) {
  const meta = pageMeta[page]
  const navigate = useNavigate()
  const [toast, setToast] = useState("")
  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2200)
  }

  const actionTarget: Record<string, string> = {
    products: "/partenaire/nouveau-produit",
    cart: "/client/commande",
    checkout: "/client/confirmation",
    "partner-orders": "/partenaire/commande",
    orders: "/client/suivi",
  }

  return (
    <>
      {toast && (
        <div className="portal-toast">
          <Icon name="check" size={17} />
          {toast}
        </div>
      )}
      <div className="page-head">
        <div>
          <span>{meta.eyebrow}</span>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </div>
        {meta.action && (
          <button
            className="portal-button primary"
            onClick={() => notify(`${meta.action} : action enregistrée`)}
            type="button"
          >
            <Icon
              name={
                meta.action.includes("Télécharger") ||
                meta.action.includes("Exporter") ||
                meta.action.includes("Rapport")
                  ? "download"
                  : "plus"
              }
              size={17}
            />
            {meta.action}
          </button>
        )}
      </div>
      <PageContent
        notify={notify}
        onPrimary={() => {
          const target = actionTarget[page]
          if (target) navigate(target)
          else notify("Modifications enregistrées")
        }}
        page={page}
        role={role}
      />
    </>
  )
}

function PageContent({
  notify,
  onPrimary,
  page,
  role,
}: {
  notify: (message: string) => void
  onPrimary: () => void
  page: string
  role: Role
}) {
  if (page === "dashboard" || page === "admin-dashboard")
    return <Dashboard role={role} />
  if (
    page === "search" ||
    page === "results" ||
    page === "promotions" ||
    page === "favorites"
  ) {
    return <CatalogView mode={page} />
  }
  if (page === "product") return <ProductDetail onPrimary={onPrimary} />
  if (page === "compare") return <CompareView />
  if (page === "stores") return <StoreList />
  if (page === "store") return <StoreDetail />
  if (page === "cart") return <Cart onPrimary={onPrimary} />
  if (page === "checkout") return <Checkout onPrimary={onPrimary} />
  if (page === "confirmation") return <Confirmation />
  if (page === "tracking") return <Tracking />
  if (page === "orders") return <Orders onPrimary={onPrimary} />
  if (page === "notifications" || page === "partner-notifications")
    return <Notifications />
  if (page === "profile" || page === "store-profile" || page === "new-product")
    return <FormPage mode={page} onPrimary={onPrimary} />
  if (page === "addresses") return <Addresses />
  if (page === "payments") return <Payments />
  if (
    page === "settings" ||
    page === "partner-settings" ||
    page === "admin-settings"
  )
    return <Settings role={role} notify={notify} />
  if (page === "help") return <Help />
  if (page === "products" || page === "catalog")
    return <ProductTable role={role} onPrimary={onPrimary} />
  if (page === "partner-promotions") return <PromotionManager />
  if (page === "partner-orders" || page === "admin-orders")
    return <OrderTable role={role} onPrimary={onPrimary} />
  if (page === "partner-order") return <PartnerOrder notify={notify} />
  if (page === "analytics" || page === "finance")
    return <Analytics mode={page} />
  if (page === "team" || page === "users") return <People mode={page} />
  if (page === "partners" || page === "approval")
    return <Partners mode={page} notify={notify} />
  if (page === "categories") return <Categories />
  if (page === "reports") return <Reports notify={notify} />
  return <Dashboard role={role} />
}

function StatCard({
  change,
  icon,
  label,
  value,
}: {
  change: string
  icon: IconName
  label: string
  value: string
}) {
  return (
    <article className="stat-card">
      <span>
        <Icon name={icon} />
      </span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <em>{change}</em>
      </div>
    </article>
  )
}

function Dashboard({ role }: { role: Role }) {
  const stats =
    role === "admin"
      ? [
          ["Utilisateurs actifs", "18 429", "+12,5%", "users"],
          ["Partenaires actifs", "84", "+6 ce mois", "shop"],
          ["Volume d'affaires", "48,2 M F", "+18,4%", "card"],
          ["Commandes", "12 642", "+9,2%", "basket"],
        ]
      : [
          ["Ventes du jour", "842 500 F", "+14,2%", "card"],
          ["Commandes", "48", "+8 aujourd'hui", "basket"],
          ["Panier moyen", "17 550 F", "+3,8%", "analytics"],
          ["Produits actifs", "1 248", "96% disponibles", "box"],
        ]
  return (
    <div className="portal-stack">
      <div className="stat-grid">
        {stats.map(([label, value, change, icon]) => (
          <StatCard
            change={change}
            icon={icon as IconName}
            key={label}
            label={label}
            value={value}
          />
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <PanelHead
            action="30 derniers jours"
            title={
              role === "admin"
                ? "Croissance de la plateforme"
                : "Évolution des ventes"
            }
          />
          <div className="line-chart">
            <div className="chart-labels">
              <span>1,2 M</span>
              <span>800 k</span>
              <span>400 k</span>
              <span>0</span>
            </div>
            <svg preserveAspectRatio="none" viewBox="0 0 700 230">
              <defs>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#0f9d58" stopOpacity=".25" />
                  <stop offset="1" stopColor="#0f9d58" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 195 C60 170 80 180 125 140 S205 165 255 105 S350 130 400 75 S490 120 535 58 S630 86 700 30 V230 H0Z"
                fill="url(#area)"
              />
              <path
                d="M0 195 C60 170 80 180 125 140 S205 165 255 105 S350 130 400 75 S490 120 535 58 S630 86 700 30"
                fill="none"
                stroke="#0f9d58"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <div className="chart-days">
              <span>01</span>
              <span>05</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>
        </section>
        <section className="panel">
          <PanelHead
            action="Voir tout"
            title={role === "admin" ? "Activité récente" : "Commandes récentes"}
          />
          <div className="activity-list">
            {["#PX-2948", "#PX-2947", "#PX-2946", "#PX-2945"].map(
              (id, index) => (
                <div key={id}>
                  <span className={`activity-icon tone-${index}`}>
                    <Icon name={index % 2 ? "user" : "basket"} size={17} />
                  </span>
                  <p>
                    <strong>
                      {role === "admin"
                        ? [
                            "Nouveau partenaire",
                            "Commande livrée",
                            "Compte créé",
                            "Paiement reçu",
                          ][index]
                        : id}
                    </strong>
                    <small>
                      {role === "admin"
                        ? [
                            "Marché du Port",
                            "Armand K.",
                            "Prisca D.",
                            "Franc Prix",
                          ][index]
                        : [
                            "Armand K.",
                            "Carine S.",
                            "Rodrigue A.",
                            "Mélissa T.",
                          ][index]}
                    </small>
                  </p>
                  <span>
                    <b>
                      {role === "admin"
                        ? ["", "24 500 F", "", "142 000 F"][index]
                        : ["24 500 F", "18 750 F", "32 100 F", "11 900 F"][
                            index
                          ]}
                    </b>
                    <small>Il y a {index + 1} h</small>
                  </span>
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function PanelHead({ action, title }: { action: string; title: string }) {
  return (
    <div className="panel-head">
      <h2>{title}</h2>
      <button type="button">
        {action}
        <Icon name="chevron" size={14} />
      </button>
    </div>
  )
}

const products = [
  {
    name: "Riz parfumé La Rizière",
    meta: "Sac · 5 kg",
    price: "8 500 F",
    old: "9 200 F",
    color: "yellow",
    initial: "RZ",
  },
  {
    name: "Huile végétale Dinor",
    meta: "Bouteille · 1 L",
    price: "1 850 F",
    old: "2 000 F",
    color: "orange",
    initial: "HD",
  },
  {
    name: "Lait en poudre Peak",
    meta: "Boîte · 400 g",
    price: "1 500 F",
    old: "1 750 F",
    color: "blue",
    initial: "LP",
  },
  {
    name: "Tomates fraîches",
    meta: "Panier · 1 kg",
    price: "950 F",
    old: "1 200 F",
    color: "red",
    initial: "TF",
  },
  {
    name: "Pâtes alimentaires",
    meta: "Paquet · 500 g",
    price: "650 F",
    old: "750 F",
    color: "green",
    initial: "PA",
  },
  {
    name: "Jus d'ananas naturel",
    meta: "Bouteille · 1 L",
    price: "1 200 F",
    old: "1 400 F",
    color: "yellow",
    initial: "JA",
  },
]

function CatalogView({ mode }: { mode: string }) {
  const [query, setQuery] = useState("")
  const visible = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )
  return (
    <div className="portal-stack">
      <div className="catalog-toolbar">
        <label>
          <Icon name="search" size={18} />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un produit, une marque..."
            value={query}
          />
        </label>
        <button type="button">
          <Icon name="filter" size={17} />
          Filtres
        </button>
        <button type="button">
          <Icon name="location" size={17} />À moins de 5 km
        </button>
      </div>
      {mode === "promotions" && (
        <div className="promo-hero">
          <div>
            <span>OFFRES DE LA SEMAINE</span>
            <h2>Jusqu'à -40% sur vos essentiels</h2>
            <p>Valable dans les supermarchés participants jusqu'à dimanche.</p>
          </div>
          <Icon name="percent" size={72} />
        </div>
      )}
      {mode === "favorites" && (
        <div className="content-tabs">
          <button className="active" type="button">
            Produits <b>12</b>
          </button>
          <button type="button">
            Supermarchés <b>3</b>
          </button>
        </div>
      )}
      <div className="product-grid">
        {visible.map((product, index) => (
          <article className="catalog-card" key={product.name}>
            <div className={`catalog-image tone-${product.color}`}>
              <span>{product.initial}</span>
              {(mode === "promotions" || index < 3) && <b>-{8 + index * 3}%</b>}
              <button aria-label="Ajouter aux favoris" type="button">
                <Icon name="heart" size={18} />
              </button>
            </div>
            <div className="catalog-info">
              <small>{product.meta}</small>
              <h3>{product.name}</h3>
              <div className="store-line">
                <span className="mini-store">S</span>
                <span>Super U · 1,2 km</span>
              </div>
              <div className="catalog-price">
                <span>
                  <strong>{product.price}</strong>
                  <del>{product.old}</del>
                </span>
                <Link to="/client/produit">
                  <Icon name="plus" size={18} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function ProductDetail({ onPrimary }: { onPrimary: () => void }) {
  return (
    <div className="detail-layout">
      <section className="product-showcase">
        <span className="showcase-badge">-7%</span>
        <div className="product-pack">
          <strong>Riz</strong>
          <span>La Rizière</span>
          <small>PARFUMÉ · 5 KG</small>
        </div>
        <div className="thumbnail-row">
          <button className="active" type="button">
            Face
          </button>
          <button type="button">Dos</button>
          <button type="button">Détail</button>
        </div>
      </section>
      <section className="product-detail-copy">
        <span className="product-category">ÉPICERIE · RIZ & CÉRÉALES</span>
        <h2>Riz parfumé La Rizière</h2>
        <div className="rating-line">
          <span>★ 4,8</span>
          <small>124 avis</small>
          <small>Réf. PRX-00942</small>
        </div>
        <p>
          Un riz long grain délicatement parfumé, sélectionné pour sa qualité et
          sa cuisson homogène.
        </p>
        <div className="best-price">
          <small>Meilleur prix à proximité</small>
          <strong>8 500 F</strong>
          <del>9 200 F</del>
          <span>Économisez 700 F</span>
        </div>
        <div className="offer-choice">
          <div>
            <span className="mini-store">S</span>
            <p>
              <strong>Super U Akpakpa</strong>
              <small>1,2 km · Ouvert</small>
            </p>
          </div>
          <b>8 500 F</b>
        </div>
        <div className="quantity-action">
          <div>
            <button type="button">
              <Icon name="minus" />
            </button>
            <span>1</span>
            <button type="button">
              <Icon name="plus" />
            </button>
          </div>
          <button onClick={onPrimary} type="button">
            <Icon name="basket" />
            Ajouter au panier
          </button>
        </div>
        <Link className="compare-link" to="/client/comparateur">
          <Icon name="analytics" size={17} />
          Comparer les 6 offres disponibles
          <Icon name="arrow" size={16} />
        </Link>
      </section>
    </div>
  )
}

function CompareView() {
  return (
    <div className="panel compare-panel">
      <div className="compare-product">
        <span className="compare-pack">RZ</span>
        <div>
          <strong>Riz parfumé La Rizière</strong>
          <small>Sac · 5 kg</small>
        </div>
        <button type="button">Changer de produit</button>
      </div>
      <div className="compare-list">
        {[
          ["Super U Akpakpa", "1,2 km", "8 500 F", "Meilleur prix"],
          ["Franc Prix Cadjèhoun", "2,1 km", "8 750 F", ""],
          ["Erevan Super U", "2,8 km", "8 900 F", ""],
          ["Marché du Port", "3,4 km", "9 150 F", ""],
        ].map((row, index) => (
          <div className={index === 0 ? "best" : ""} key={row[0]}>
            <span className={`store-avatar tone-${index}`}>{row[0][0]}</span>
            <p>
              <strong>{row[0]}</strong>
              <small>
                <Icon name="location" size={12} />
                {row[1]} · En stock
              </small>
            </p>
            <span>
              <strong>{row[2]}</strong>
              {row[3] && <small>{row[3]}</small>}
            </span>
            <button type="button">
              <Icon name="basket" size={17} />
              Choisir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function StoreList() {
  return (
    <div className="store-layout">
      <div className="store-results">
        <div className="catalog-toolbar">
          <label>
            <Icon name="search" size={18} />
            <input placeholder="Rechercher une enseigne..." />
          </label>
          <button type="button">
            <Icon name="filter" size={17} />
            Filtres
          </button>
        </div>
        {[
          "Super U Akpakpa",
          "Franc Prix Cadjèhoun",
          "Erevan Super U",
          "Marché du Port",
        ].map((store, index) => (
          <Link className="store-row" to="/client/supermarche" key={store}>
            <span className={`store-avatar tone-${index}`}>{store[0]}</span>
            <p>
              <strong>{store}</strong>
              <small>
                <Icon name="location" size={13} />
                {1.2 + index * 0.7} km · <b>Ouvert</b>
              </small>
              <small>
                Livraison en {20 + index * 5}–{30 + index * 5} min
              </small>
            </p>
            <span>
              <b>★ 4,{8 - index}</b>
              <small>Plus de 850 produits</small>
            </span>
            <Icon name="arrow" />
          </Link>
        ))}
      </div>
      <div className="map-panel">
        <div className="map-grid" />
        <span className="map-road road-one" />
        <span className="map-road road-two" />
        {[1, 2, 3, 4].map((pin) => (
          <i className={`map-pin pin-${pin}`} key={pin}>
            <Icon name="shop" size={17} />
          </i>
        ))}
      </div>
    </div>
  )
}

function StoreDetail() {
  return (
    <div className="portal-stack">
      <section className="store-hero">
        <div className="store-hero-photo" />
        <div className="store-hero-info">
          <span className="store-avatar tone-0">S</span>
          <div>
            <h2>Super U Akpakpa</h2>
            <p>
              <Icon name="location" size={14} />
              Carrefour Sobebra, Akpakpa · 1,2 km
            </p>
            <span>
              <b>★ 4,8</b> · 356 avis · <em>Ouvert jusqu'à 21:00</em>
            </span>
          </div>
          <button type="button">
            <Icon name="heart" />
            Ajouter aux favoris
          </button>
        </div>
      </section>
      <div className="store-features">
        {[
          ["clock", "Livraison", "20–30 min"],
          ["basket", "Minimum", "5 000 F"],
          ["card", "Paiement", "À la livraison"],
          ["box", "Catalogue", "1 248 produits"],
        ].map(([icon, title, value]) => (
          <div key={title}>
            <Icon name={icon as IconName} />
            <span>
              <small>{title}</small>
              <strong>{value}</strong>
            </span>
          </div>
        ))}
      </div>
      <CatalogView mode="store" />
    </div>
  )
}

const cartRows = [
  ["Riz parfumé La Rizière", "Sac · 5 kg", "8 500 F", "RZ"],
  ["Huile végétale Dinor", "Bouteille · 1 L", "1 850 F", "HD"],
  ["Lait en poudre Peak", "Boîte · 400 g", "1 500 F", "LP"],
  ["Tomates fraîches", "Panier · 1 kg", "950 F", "TF"],
]

function Cart({ onPrimary }: { onPrimary: () => void }) {
  return (
    <div className="checkout-layout">
      <section className="panel cart-list">
        <PanelHead action="Vider le panier" title="Super U Akpakpa" />
        {cartRows.map((row, index) => (
          <div className="cart-row" key={row[0]}>
            <span className={`cart-thumb tone-${index}`}>{row[3]}</span>
            <p>
              <strong>{row[0]}</strong>
              <small>{row[1]}</small>
              <button type="button">
                <Icon name="trash" size={13} />
                Supprimer
              </button>
            </p>
            <div className="quantity-small">
              <button type="button">
                <Icon name="minus" size={14} />
              </button>
              <span>{index === 0 ? 2 : 1}</span>
              <button type="button">
                <Icon name="plus" size={14} />
              </button>
            </div>
            <b>{index === 0 ? "17 000 F" : row[2]}</b>
          </div>
        ))}
      </section>
      <OrderSummary button="Passer la commande" onPrimary={onPrimary} />
    </div>
  )
}

function OrderSummary({
  button,
  onPrimary,
}: {
  button: string
  onPrimary: () => void
}) {
  return (
    <aside className="panel order-summary">
      <h2>Récapitulatif</h2>
      <div>
        <span>Sous-total</span>
        <b>21 300 F</b>
      </div>
      <div>
        <span>Livraison</span>
        <b>500 F</b>
      </div>
      <div>
        <span>Réduction</span>
        <b className="positive">− 1 200 F</b>
      </div>
      <label>
        <input placeholder="Code promo" />
        <button type="button">Appliquer</button>
      </label>
      <div className="total">
        <span>Total</span>
        <strong>20 600 F</strong>
      </div>
      <button
        className="portal-button primary wide"
        onClick={onPrimary}
        type="button"
      >
        {button}
        <Icon name="arrow" size={17} />
      </button>
      <small>
        <Icon name="shield" size={14} />
        Paiement sécurisé et données protégées
      </small>
    </aside>
  )
}

function Checkout({ onPrimary }: { onPrimary: () => void }) {
  const [method, setMethod] = useState("mtn")
  return (
    <div className="checkout-layout">
      <div className="portal-stack">
        <section className="panel checkout-section">
          <h2>
            <span>1</span>Adresse de livraison
          </h2>
          <label className="choice-card selected">
            <input defaultChecked name="address" type="radio" />
            <Icon name="home" />
            <p>
              <strong>Domicile</strong>
              <small>Rue 12.147, Akpakpa, Cotonou</small>
            </p>
            <button type="button">
              <Icon name="edit" size={16} />
            </button>
          </label>
          <button className="text-action" type="button">
            <Icon name="plus" size={16} />
            Utiliser une autre adresse
          </button>
        </section>
        <section className="panel checkout-section">
          <h2>
            <span>2</span>Mode de livraison
          </h2>
          <label className="choice-card selected">
            <input defaultChecked name="delivery" type="radio" />
            <Icon name="clock" />
            <p>
              <strong>Livraison standard</strong>
              <small>Aujourd'hui entre 18:20 et 18:35</small>
            </p>
            <b>500 F</b>
          </label>
        </section>
        <section className="panel checkout-section">
          <h2>
            <span>3</span>Moyen de paiement
          </h2>
          <div className="payment-options">
            {[
              ["mtn", "MTN Mobile Money", "97 •• •• 42"],
              ["moov", "Moov Money", "Paiement mobile"],
              ["cash", "Paiement à la livraison", "Espèces uniquement"],
            ].map(([id, title, sub]) => (
              <button
                className={method === id ? "selected" : ""}
                onClick={() => setMethod(id)}
                type="button"
                key={id}
              >
                <span>
                  {id === "cash" ? (
                    <Icon name="card" />
                  ) : (
                    id.toUpperCase().slice(0, 3)
                  )}
                </span>
                <p>
                  <strong>{title}</strong>
                  <small>{sub}</small>
                </p>
                <i>{method === id && <Icon name="check" size={14} />}</i>
              </button>
            ))}
          </div>
        </section>
      </div>
      <OrderSummary button="Confirmer et payer" onPrimary={onPrimary} />
    </div>
  )
}

function Confirmation() {
  return (
    <div className="success-card">
      <span>
        <Icon name="check" size={42} />
      </span>
      <small>COMMANDE #PX-2948</small>
      <h2>Merci pour votre commande !</h2>
      <p>
        Super U Akpakpa prépare votre panier. Vous recevrez une notification dès
        que le livreur sera en route.
      </p>
      <div>
        <span>
          <Icon name="clock" />
          <small>Livraison estimée</small>
          <strong>18:20 – 18:35</strong>
        </span>
        <span>
          <Icon name="card" />
          <small>Total payé</small>
          <strong>20 600 F</strong>
        </span>
      </div>
      <Link className="portal-button primary" to="/client/suivi">
        Suivre ma commande
        <Icon name="arrow" />
      </Link>
      <Link className="secondary-link" to="/client/accueil">
        Retour à l'accueil
      </Link>
    </div>
  )
}

function Tracking() {
  return (
    <div className="tracking-layout">
      <section className="panel tracking-map">
        <div className="map-grid" />
        <span className="map-road road-one" />
        <span className="map-road road-two" />
        <i className="map-pin pin-1">
          <Icon name="shop" size={17} />
        </i>
        <i className="courier">
          <Icon name="location" size={23} />
        </i>
        <div className="courier-card">
          <span>JD</span>
          <p>
            <strong>Jean D.</strong>
            <small>Votre livreur · ★ 4,9</small>
          </p>
          <button type="button">Appeler</button>
        </div>
      </section>
      <aside className="panel tracking-info">
        <span className="tracking-status">EN LIVRAISON</span>
        <h2>Arrivée dans 15–20 min</h2>
        <p>Jean se dirige vers votre adresse à Akpakpa.</p>
        <div className="timeline">
          {[
            ["Commande confirmée", "17:42", true],
            ["Préparation terminée", "18:02", true],
            ["En cours de livraison", "18:10", true],
            ["Commande livrée", "Estimée à 18:30", false],
          ].map(([label, time, done]) => (
            <div className={done ? "done" : ""} key={label as string}>
              <i>{done && <Icon name="check" size={12} />}</i>
              <span>
                <strong>{label}</strong>
                <small>{time}</small>
              </span>
            </div>
          ))}
        </div>
        <Link className="text-action" to="/client/commande">
          <Icon name="eye" />
          Voir le détail de la commande
        </Link>
      </aside>
    </div>
  )
}

function Orders({ onPrimary }: { onPrimary: () => void }) {
  return (
    <div className="panel table-card">
      <div className="content-tabs">
        <button className="active" type="button">
          Toutes <b>12</b>
        </button>
        <button type="button">
          En cours <b>1</b>
        </button>
        <button type="button">
          Livrées <b>10</b>
        </button>
        <button type="button">
          Annulées <b>1</b>
        </button>
      </div>
      {["#PX-2948", "#PX-2812", "#PX-2645", "#PX-2511"].map((id, index) => (
        <div className="order-history" key={id}>
          <span className={`order-icon ${index ? "" : "active"}`}>
            <Icon name={index ? "check" : "clock"} />
          </span>
          <p>
            <strong>{id}</strong>
            <small>
              {index ? `${14 - index} mai 2026` : "Aujourd'hui, 17:42"} · Super
              U Akpakpa
            </small>
          </p>
          <span>
            <b>{["20 600 F", "14 850 F", "32 100 F", "9 400 F"][index]}</b>
            <small className={index ? "status-done" : "status-progress"}>
              {index ? "Livrée" : "En livraison"}
            </small>
          </span>
          <button onClick={onPrimary} type="button">
            Voir le détail
            <Icon name="arrow" size={15} />
          </button>
        </div>
      ))}
    </div>
  )
}

function Notifications() {
  return (
    <div className="panel notification-list">
      {[
        [
          "Votre commande est en route",
          "Jean vient de récupérer votre commande #PX-2948.",
          "Il y a 5 min",
          "location",
        ],
        [
          "Baisse de prix détectée",
          "Le riz La Rizière est maintenant à 8 500 F chez Super U.",
          "Il y a 2 h",
          "percent",
        ],
        [
          "Nouvelle promotion",
          "-20% sur les produits frais jusqu'à dimanche.",
          "Hier",
          "star",
        ],
        [
          "Commande livrée",
          "Votre commande #PX-2812 a été livrée avec succès.",
          "12 mai",
          "check",
        ],
        [
          "Sécurité du compte",
          "Une connexion a été détectée depuis un nouvel appareil.",
          "10 mai",
          "shield",
        ],
      ].map(([title, text, time, icon], index) => (
        <div className={index < 2 ? "unread" : ""} key={title}>
          <span className={`notification-icon tone-${index}`}>
            <Icon name={icon as IconName} />
          </span>
          <p>
            <strong>{title}</strong>
            <small>{text}</small>
            <time>{time}</time>
          </p>
          <button type="button">
            <Icon name="more" />
          </button>
        </div>
      ))}
    </div>
  )
}

function FormPage({ mode, onPrimary }: { mode: string; onPrimary: () => void }) {
  const store = mode === "store-profile"
  const product = mode === "new-product"
  return (
    <div className="form-layout">
      <section className="panel form-card">
        <h2>
          {product
            ? "Informations du produit"
            : store
              ? "Informations publiques"
              : "Informations du compte"}
        </h2>
        <div className="avatar-upload">
          <span>
            {product ? <Icon name="box" size={34} /> : store ? "SU" : "AK"}
          </span>
          <div>
            <strong>
              {product
                ? "Photo principale"
                : store
                  ? "Logo du magasin"
                  : "Photo de profil"}
            </strong>
            <small>PNG ou JPG, 5 Mo maximum</small>
            <button type="button">Changer l'image</button>
          </div>
        </div>
        <div className="form-grid">
          {(product
            ? [
                ["Nom du produit", "Riz parfumé La Rizière"],
                ["Code-barres", "3123456789012"],
                ["Catégorie", "Épicerie"],
                ["Marque", "La Rizière"],
                ["Prix de vente", "8 500 F"],
                ["Stock disponible", "46"],
              ]
            : store
              ? [
                  ["Nom commercial", "Super U Akpakpa"],
                  ["Téléphone", "+229 01 97 00 00 00"],
                  ["Adresse", "Carrefour Sobebra, Akpakpa"],
                  ["Ville", "Cotonou"],
                  ["Ouverture", "08:00"],
                  ["Fermeture", "21:00"],
                ]
              : [
                  ["Prénom", "Armand"],
                  ["Nom", "Kouton"],
                  ["E-mail", "armand.k@email.com"],
                  ["Téléphone", "+229 01 97 00 00 42"],
                  ["Date de naissance", "12 septembre 1992"],
                  ["Genre", "Homme"],
                ]
          ).map(([label, value]) => (
            <label key={label}>
              <span>{label}</span>
              <input defaultValue={value} />
            </label>
          ))}
        </div>
        <label className="full-field">
          <span>Description</span>
          <textarea
            defaultValue={
              product
                ? "Riz long grain délicatement parfumé, idéal pour toutes vos recettes."
                : store
                  ? "Votre supermarché de proximité à Akpakpa."
                  : "Client fidèle ProxiMarché."
            }
          />
        </label>
        <div className="form-actions">
          <button type="button">Annuler</button>
          <button
            className="portal-button primary"
            onClick={onPrimary}
            type="button"
          >
            Enregistrer les modifications
          </button>
        </div>
      </section>
      <aside className="panel info-aside">
        <Icon name="shield" size={28} />
        <h3>Vos informations sont protégées</h3>
        <p>
          ProxiMarché chiffre les données sensibles et ne les partage jamais
          sans votre accord.
        </p>
        <a href="#security">En savoir plus</a>
      </aside>
    </div>
  )
}

function Addresses() {
  return (
    <div className="address-grid">
      {[
        ["Domicile", "Rue 12.147, Akpakpa", "Cotonou, Littoral", "home"],
        ["Bureau", "Immeuble Erevan, Ganhi", "Cotonou, Littoral", "shop"],
      ].map(([title, line, city, icon], index) => (
        <article
          className={`panel address-card ${index === 0 ? "default" : ""}`}
          key={title}
        >
          <span>
            <Icon name={icon as IconName} />
          </span>
          <div>
            <strong>{title}</strong>
            {index === 0 && <small>Adresse par défaut</small>}
            <p>
              {line}
              <br />
              {city}
            </p>
            <button type="button">
              <Icon name="edit" size={15} />
              Modifier
            </button>
            <button type="button">
              <Icon name="trash" size={15} />
              Supprimer
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

function Payments() {
  return (
    <div className="payment-grid">
      {[
        ["MTN", "MTN Mobile Money", "97 •• •• 42", "yellow"],
        ["MOOV", "Moov Money", "96 •• •• 18", "green"],
        ["VISA", "Carte bancaire", "••••  ••••  ••••  4821", "blue"],
      ].map(([mark, title, number, color], index) => (
        <article className="panel payment-card" key={title}>
          <span className={`payment-logo tone-${color}`}>{mark}</span>
          <p>
            <strong>{title}</strong>
            <small>{number}</small>
          </p>
          {index === 0 && <em>Par défaut</em>}
          <button type="button">
            <Icon name="more" />
          </button>
        </article>
      ))}
    </div>
  )
}

function Settings({
  notify,
  role,
}: {
  notify: (message: string) => void
  role: Role
}) {
  const sections =
    role === "admin"
      ? [
          ["Sécurité", "Double authentification et règles d'accès"],
          ["Commissions", "Taux appliqués aux partenaires"],
          ["Notifications système", "Alertes et communications automatisées"],
          ["Maintenance", "Disponibilité de la plateforme"],
        ]
      : [
          ["Notifications push", "Commandes, promotions et nouveautés"],
          ["Offres personnalisées", "Suggestions basées sur vos préférences"],
          ["Localisation", "Détection des commerces à proximité"],
          ["Mode économie de données", "Réduire le chargement des images"],
        ]
  return (
    <div className="settings-layout">
      <section className="panel settings-list">
        {sections.map(([title, text], index) => (
          <div key={title}>
            <span className={`settings-icon tone-${index}`}>
              <Icon
                name={
                  ["bell", "percent", "location", "settings"][index] as IconName
                }
              />
            </span>
            <p>
              <strong>{title}</strong>
              <small>{text}</small>
            </p>
            <button
              className={index < 3 ? "toggle on" : "toggle"}
              onClick={(event) => {
                event.currentTarget.classList.toggle("on")
                notify("Préférence mise à jour")
              }}
              type="button"
            >
              <i />
            </button>
          </div>
        ))}
      </section>
      <section className="panel danger-zone">
        <h2>Zone sensible</h2>
        <p>Ces actions peuvent avoir un impact important sur votre espace.</p>
        <button type="button">
          {role === "admin"
            ? "Journal d'audit"
            : "Se déconnecter de tous les appareils"}
        </button>
      </section>
    </div>
  )
}

function Help() {
  return (
    <div className="portal-stack">
      <label className="help-search">
        <Icon name="search" />
        <input placeholder="Rechercher dans le centre d'aide..." />
      </label>
      <div className="help-grid">
        {[
          [
            "Commandes & livraison",
            "Suivre, modifier ou annuler une commande",
            "basket",
          ],
          ["Paiements", "Moyens de paiement et remboursements", "card"],
          [
            "Compte & sécurité",
            "Profil, connexion et confidentialité",
            "shield",
          ],
          ["Produits & prix", "Disponibilité, prix et promotions", "box"],
        ].map(([title, text, icon]) => (
          <article className="panel" key={title}>
            <span>
              <Icon name={icon as IconName} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
            <button type="button">
              Consulter les articles
              <Icon name="arrow" size={15} />
            </button>
          </article>
        ))}
      </div>
      <section className="support-banner">
        <div>
          <h2>Vous n'avez pas trouvé votre réponse ?</h2>
          <p>Notre équipe est disponible du lundi au samedi, de 8h à 20h.</p>
        </div>
        <button type="button">Démarrer une conversation</button>
      </section>
    </div>
  )
}

function ProductTable({
  onPrimary,
  role,
}: {
  onPrimary: () => void
  role: Role
}) {
  return (
    <div className="panel table-card">
      <div className="table-toolbar">
        <label>
          <Icon name="search" size={17} />
          <input placeholder="Rechercher dans le catalogue..." />
        </label>
        <button type="button">
          <Icon name="filter" size={16} />
          Filtrer
        </button>
        <button
          className="portal-button primary"
          onClick={onPrimary}
          type="button"
        >
          <Icon name="plus" size={16} />
          {role === "partner" ? "Ajouter" : "Importer"}
        </button>
      </div>
      <div className="data-table">
        <div className="table-head">
          <span>Produit</span>
          <span>Catégorie</span>
          <span>Prix</span>
          <span>Stock</span>
          <span>Statut</span>
          <span />
        </div>
        {products.map((product, index) => (
          <div className="table-row" key={product.name}>
            <span className="table-product">
              <i className={`tone-${product.color}`}>{product.initial}</i>
              <p>
                <strong>{product.name}</strong>
                <small>PRX-00{942 + index}</small>
              </p>
            </span>
            <span>
              {
                [
                  "Épicerie",
                  "Épicerie",
                  "Produits laitiers",
                  "Fruits & légumes",
                  "Épicerie",
                  "Boissons",
                ][index]
              }
            </span>
            <strong>{product.price}</strong>
            <span>{[46, 82, 24, 18, 65, 12][index]} unités</span>
            <em className={index === 5 ? "status-low" : "status-active"}>
              {index === 5 ? "Stock faible" : "Actif"}
            </em>
            <button type="button">
              <Icon name="more" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function PromotionManager() {
  return (
    <div className="portal-stack">
      <div className="stat-grid compact">
        <StatCard
          change="+18% vs précédente"
          icon="eye"
          label="Vues des offres"
          value="12 840"
        />
        <StatCard
          change="Taux de 8,4%"
          icon="basket"
          label="Conversions"
          value="1 078"
        />
        <StatCard
          change="Ce mois"
          icon="percent"
          label="Réductions accordées"
          value="642 500 F"
        />
      </div>
      <div className="campaign-grid">
        {[
          ["Essentiels du mois", "12 produits", "Du 10 au 31 mai", "Active"],
          ["Week-end fraîcheur", "8 produits", "Du 17 au 19 mai", "Programmée"],
          [
            "Ramadan solidaire",
            "24 produits",
            "Terminée le 8 avril",
            "Terminée",
          ],
        ].map(([title, count, period, status], index) => (
          <article className="panel campaign-card" key={title}>
            <div className={`campaign-visual tone-${index}`}>
              <Icon name="percent" size={40} />
            </div>
            <div>
              <em className={`campaign-status status-${index}`}>{status}</em>
              <h3>{title}</h3>
              <p>
                {count} · {period}
              </p>
              <div>
                <span>
                  <small>Vues</small>
                  <strong>{[6842, 0, 9215][index]}</strong>
                </span>
                <span>
                  <small>Commandes</small>
                  <strong>{[574, 0, 782][index]}</strong>
                </span>
              </div>
              <button type="button">
                Gérer la campagne
                <Icon name="arrow" size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function OrderTable({ onPrimary, role }: { onPrimary: () => void; role: Role }) {
  return (
    <div className="panel table-card">
      <div className="content-tabs">
        <button className="active" type="button">
          Toutes <b>48</b>
        </button>
        <button type="button">
          À préparer <b>8</b>
        </button>
        <button type="button">
          Prêtes <b>4</b>
        </button>
        <button type="button">
          En livraison <b>12</b>
        </button>
      </div>
      <div className="data-table order-table">
        <div className="table-head">
          <span>Commande</span>
          <span>Client</span>
          <span>Magasin</span>
          <span>Montant</span>
          <span>Statut</span>
          <span />
        </div>
        {["#PX-2948", "#PX-2947", "#PX-2946", "#PX-2945", "#PX-2944"].map(
          (id, index) => (
            <div className="table-row" key={id}>
              <strong>
                {id}
                <small>
                  Aujourd'hui · {17 - index}:4{index}
                </small>
              </strong>
              <span>
                {
                  [
                    "Armand K.",
                    "Carine S.",
                    "Rodrigue A.",
                    "Mélissa T.",
                    "Victor H.",
                  ][index]
                }
              </span>
              <span>
                {role === "admin"
                  ? [
                      "Super U",
                      "Franc Prix",
                      "Erevan",
                      "Super U",
                      "Marché du Port",
                    ][index]
                  : "Super U Akpakpa"}
              </span>
              <strong>
                {
                  ["20 600 F", "18 750 F", "32 100 F", "11 900 F", "27 400 F"][
                    index
                  ]
                }
              </strong>
              <em className={`order-status status-${index}`}>
                {
                  ["À préparer", "Prête", "En livraison", "Livrée", "Annulée"][
                    index
                  ]
                }
              </em>
              <button onClick={onPrimary} type="button">
                <Icon name="eye" />
              </button>
            </div>
          ),
        )}
      </div>
    </div>
  )
}

function PartnerOrder({ notify }: { notify: (message: string) => void }) {
  return (
    <div className="detail-layout order-detail-layout">
      <section className="panel cart-list">
        <PanelHead action="Imprimer" title="4 articles" />
        {cartRows.map((row, index) => (
          <div className="cart-row" key={row[0]}>
            <span className={`cart-thumb tone-${index}`}>{row[3]}</span>
            <p>
              <strong>{row[0]}</strong>
              <small>
                {row[1]} · Qté {index === 0 ? 2 : 1}
              </small>
            </p>
            <b>{index === 0 ? "17 000 F" : row[2]}</b>
          </div>
        ))}
        <div className="order-total-line">
          <span>Total de la commande</span>
          <strong>20 600 F</strong>
        </div>
      </section>
      <aside className="portal-stack">
        <section className="panel customer-card">
          <h2>Client</h2>
          <div>
            <span>AK</span>
            <p>
              <strong>Armand Kouton</strong>
              <small>18 commandes · ★ 4,9</small>
            </p>
          </div>
          <p>
            <Icon name="location" size={16} />
            Rue 12.147, Akpakpa, Cotonou
          </p>
          <p>
            <Icon name="card" size={16} />
            Payé par MTN Mobile Money
          </p>
        </section>
        <section className="panel order-actions">
          <h2>Mettre à jour le statut</h2>
          <button
            className="portal-button primary wide"
            onClick={() => notify("Commande marquée comme prête")}
            type="button"
          >
            <Icon name="check" />
            Commande prête
          </button>
          <button
            onClick={() => notify("Le client a été contacté")}
            type="button"
          >
            Contacter le client
          </button>
        </section>
      </aside>
    </div>
  )
}

function Analytics({ mode }: { mode: string }) {
  return (
    <div className="portal-stack">
      <div className="stat-grid">
        <StatCard
          change="+14,2%"
          icon="card"
          label={
            mode === "finance" ? "Volume d'affaires" : "Chiffre d'affaires"
          }
          value={mode === "finance" ? "48,2 M F" : "18,4 M F"}
        />
        <StatCard
          change="+9,8%"
          icon="basket"
          label="Commandes"
          value="1 248"
        />
        <StatCard
          change="+4,1%"
          icon="analytics"
          label={mode === "finance" ? "Commissions" : "Panier moyen"}
          value={mode === "finance" ? "2,41 M F" : "14 740 F"}
        />
        <StatCard
          change="+82 ce mois"
          icon="users"
          label="Nouveaux clients"
          value="642"
        />
      </div>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <PanelHead
            action="Cette année"
            title={
              mode === "finance"
                ? "Revenus et commissions"
                : "Ventes mensuelles"
            }
          />
          <div className="bar-chart">
            {[42, 57, 48, 72, 68, 84, 76, 91, 87, 98, 89, 100].map(
              (height, index) => (
                <div key={index}>
                  <i style={{ height: `${height}%` }} />
                  <span>
                    {
                      [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                      ][index]
                    }
                  </span>
                </div>
              ),
            )}
          </div>
        </section>
        <section className="panel">
          <PanelHead action="Voir le catalogue" title="Top produits" />
          <div className="ranking-list">
            {products.slice(0, 5).map((product, index) => (
              <div key={product.name}>
                <b>{index + 1}</b>
                <span className={`cart-thumb tone-${product.color}`}>
                  {product.initial}
                </span>
                <p>
                  <strong>{product.name}</strong>
                  <small>{842 - index * 113} ventes</small>
                </p>
                <strong>
                  {(842 - index * 113) * 8500 > 1000000
                    ? `${(((842 - index * 113) * 8500) / 1000000).toFixed(1)} M F`
                    : "842 k F"}
                </strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function People({ mode }: { mode: string }) {
  const users =
    mode === "team"
      ? [
          ["Nadia H.", "Gérante", "Actif"],
          ["Samuel T.", "Responsable catalogue", "Actif"],
          ["Clarisse A.", "Préparatrice", "Actif"],
          ["Joël M.", "Préparateur", "Invitation envoyée"],
        ]
      : [
          ["Armand Kouton", "Client", "Actif"],
          ["Carine Sossa", "Client", "Actif"],
          ["Samuel Tossa", "Partenaire", "Actif"],
          ["Mélissa T.", "Client", "Suspendu"],
          ["Victor Hounton", "Client", "Actif"],
        ]
  return (
    <div className="panel table-card">
      <div className="table-toolbar">
        <label>
          <Icon name="search" size={17} />
          <input placeholder="Rechercher une personne..." />
        </label>
        <button type="button">
          <Icon name="filter" size={16} />
          Tous les rôles
        </button>
        <button className="portal-button primary" type="button">
          <Icon name="plus" size={16} />
          {mode === "team" ? "Inviter" : "Créer un compte"}
        </button>
      </div>
      <div className="people-list">
        {users.map(([name, role, status], index) => (
          <div key={name}>
            <span className={`people-avatar tone-${index}`}>
              {name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </span>
            <p>
              <strong>{name}</strong>
              <small>
                {["nadia", "carine", "samuel", "melissa", "victor"][index]}
                @email.com
              </small>
            </p>
            <span>{role}</span>
            <em
              className={
                status === "Actif"
                  ? "status-active"
                  : status === "Suspendu"
                    ? "status-low"
                    : ""
              }
            >
              {status}
            </em>
            <small>Dernière activité : {index + 1} h</small>
            <button type="button">
              <Icon name="more" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Partners({
  mode,
  notify,
}: {
  mode: string
  notify: (message: string) => void
}) {
  const rows = [
    "Marché du Port",
    "Carrefour Market Fidjrossè",
    "La Bonne Épicerie",
    "Fresh Market Calavi",
  ]
  return (
    <div className={mode === "approval" ? "approval-grid" : "panel table-card"}>
      {mode !== "approval" && (
        <div className="table-toolbar">
          <label>
            <Icon name="search" size={17} />
            <input placeholder="Rechercher un supermarché..." />
          </label>
          <button type="button">
            <Icon name="filter" size={16} />
            Tous les statuts
          </button>
        </div>
      )}
      {rows.map((name, index) =>
        mode === "approval" ? (
          <article className="panel approval-card" key={name}>
            <div>
              <span className={`store-avatar tone-${index}`}>{name[0]}</span>
              <p>
                <strong>{name}</strong>
                <small>
                  <Icon name="location" size={12} />
                  {
                    ["Cotonou", "Fidjrossè", "Porto-Novo", "Abomey-Calavi"][
                      index
                    ]
                  }
                </small>
              </p>
              <em>En attente</em>
            </div>
            <dl>
              <div>
                <dt>RCCM</dt>
                <dd>RB/COT/26 B {1420 + index}</dd>
              </div>
              <div>
                <dt>Soumis le</dt>
                <dd>{12 - index} mai 2026</dd>
              </div>
              <div>
                <dt>Documents</dt>
                <dd>4 fichiers</dd>
              </div>
            </dl>
            <div>
              <button
                onClick={() => notify(`Dossier de ${name} refusé`)}
                type="button"
              >
                Refuser
              </button>
              <button
                className="portal-button primary"
                onClick={() => notify(`${name} a été approuvé`)}
                type="button"
              >
                <Icon name="check" size={16} />
                Approuver
              </button>
            </div>
          </article>
        ) : (
          <div className="partner-row" key={name}>
            <span className={`store-avatar tone-${index}`}>{name[0]}</span>
            <p>
              <strong>{name}</strong>
              <small>
                {["Cotonou", "Fidjrossè", "Porto-Novo", "Abomey-Calavi"][index]}{" "}
                · Depuis {2022 + index}
              </small>
            </p>
            <span>
              <small>Produits</small>
              <strong>{1248 - index * 146}</strong>
            </span>
            <span>
              <small>Commandes</small>
              <strong>{642 - index * 75}</strong>
            </span>
            <span>
              <small>CA ce mois</small>
              <strong>{(8.4 - index * 1.2).toFixed(1)} M F</strong>
            </span>
            <em className="status-active">Actif</em>
            <button type="button">
              <Icon name="more" />
            </button>
          </div>
        ),
      )}
    </div>
  )
}

function Categories() {
  const categories = [
    ["Fruits & légumes", "284 produits", "green"],
    ["Épicerie", "1 842 produits", "orange"],
    ["Boissons", "652 produits", "blue"],
    ["Produits laitiers", "428 produits", "yellow"],
    ["Hygiène & beauté", "712 produits", "red"],
    ["Maison & entretien", "536 produits", "green"],
  ]
  return (
    <div className="category-admin-grid">
      {categories.map(([name, count, color], index) => (
        <article className="panel category-admin-card" key={name}>
          <span className={`tone-${color}`}>
            <Icon
              name={
                ["star", "basket", "card", "box", "heart", "home"][
                  index
                ] as IconName
              }
            />
          </span>
          <div>
            <h3>{name}</h3>
            <p>
              {count} · {4 + index} sous-catégories
            </p>
          </div>
          <button type="button">
            <Icon name="edit" size={16} />
          </button>
          <button type="button">
            <Icon name="more" size={18} />
          </button>
        </article>
      ))}
    </div>
  )
}

function Reports({ notify }: { notify: (message: string) => void }) {
  return (
    <div className="report-columns">
      {["En attente", "En cours", "Résolus"].map((column, columnIndex) => (
        <section key={column}>
          <h2>
            {column}
            <b>{[4, 3, 12][columnIndex]}</b>
          </h2>
          {[0, 1, 2].map((item) => (
            <article className="panel report-card" key={item}>
              <div>
                <span className={`report-priority priority-${columnIndex}`}>
                  {columnIndex === 0
                    ? "Urgent"
                    : columnIndex === 1
                      ? "Moyen"
                      : "Résolu"}
                </span>
                <small>#SIG-{384 - columnIndex * 10 - item}</small>
              </div>
              <h3>
                {
                  [
                    "Produit non conforme",
                    "Commande non reçue",
                    "Erreur de prix",
                  ][item]
                }
              </h3>
              <p>
                {
                  [
                    "Le produit livré ne correspond pas à la description affichée.",
                    "La commande est indiquée livrée mais le client ne l'a pas reçue.",
                    "Le prix facturé diffère du prix affiché dans l'application.",
                  ][item]
                }
              </p>
              <span>
                Par {["Armand K.", "Carine S.", "Victor H."][item]} · Il y a{" "}
                {item + 1} h
              </span>
              <button
                onClick={() => notify("Signalement ouvert")}
                type="button"
              >
                Ouvrir le dossier
                <Icon name="arrow" size={14} />
              </button>
            </article>
          ))}
        </section>
      ))}
    </div>
  )
}

export function RoleChoice() {
  return (
    <main className="role-page">
      <div className="role-bg-shape one" />
      <div className="role-bg-shape two" />
      <div className="role-page-inner">
        <Brand />
        <div className="role-intro">
          <span>BIENVENUE SUR PROXIMARCHÉ</span>
          <h1>
            Votre marché, <em>plus proche.</em>
          </h1>
          <p>
            Choisissez votre espace pour accéder à une expérience adaptée à vos
            besoins.
          </p>
        </div>
        <div className="role-cards">
          <Link to="/client/accueil">
            <span className="role-card-icon client">
              <Icon name="basket" size={30} />
            </span>
            <small>POUR MES COURSES</small>
            <h2>Espace client</h2>
            <p>
              Comparez les prix, trouvez les meilleures offres et faites-vous
              livrer.
            </p>
            <b>
              Accéder à l'espace
              <Icon name="arrow" size={18} />
            </b>
          </Link>
          <Link to="/partenaire">
            <span className="role-card-icon partner">
              <Icon name="shop" size={30} />
            </span>
            <small>POUR MON MAGASIN</small>
            <h2>Espace partenaire</h2>
            <p>
              Gérez votre catalogue, vos promotions et les commandes clients.
            </p>
            <b>
              Gérer mon magasin
              <Icon name="arrow" size={18} />
            </b>
          </Link>
          <Link to="/administration">
            <span className="role-card-icon admin">
              <Icon name="shield" size={30} />
            </span>
            <small>GESTION DE LA PLATEFORME</small>
            <h2>Administration</h2>
            <p>
              Pilotez l'écosystème ProxiMarché et accompagnez les partenaires.
            </p>
            <b>
              Ouvrir l'administration
              <Icon name="arrow" size={18} />
            </b>
          </Link>
        </div>
        <div className="role-footer">
          <span>Vous découvrez ProxiMarché ?</span>
          <Link to="/bienvenue">Voir la présentation</Link>
          <span>·</span>
          <Link to="/connexion">Se connecter</Link>
        </div>
      </div>
    </main>
  )
}

export function AuthPage({
  mode,
}: {
  mode: "welcome" | "login" | "register" | "reset"
}) {
  const navigate = useNavigate()
  const welcome = mode === "welcome"
  const copy = {
    login: [
      "Heureux de vous revoir",
      "Connectez-vous pour poursuivre vos courses.",
    ],
    register: [
      "Créer votre compte",
      "Rejoignez ProxiMarché en quelques secondes.",
    ],
    reset: [
      "Mot de passe oublié ?",
      "Nous vous enverrons un lien de réinitialisation.",
    ],
    welcome: [
      "Trouvez tout, au meilleur prix",
      "ProxiMarché réunit les supermarchés proches de vous.",
    ],
  }[mode]
  if (welcome)
    return (
      <main className="welcome-page">
        <div className="welcome-copy">
          <Brand light />
          <span>VOTRE MARCHÉ, PLUS PROCHE</span>
          <h1>{copy[0]}</h1>
          <p>{copy[1]}</p>
          <div className="welcome-points">
            {[
              ["search", "Trouvez", "Des milliers de produits près de vous"],
              ["analytics", "Comparez", "Les prix de plusieurs supermarchés"],
              ["basket", "Achetez", "En magasin ou livré à domicile"],
            ].map(([icon, title, text]) => (
              <div key={title}>
                <span>
                  <Icon name={icon as IconName} />
                </span>
                <p>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/inscription")} type="button">
            Commencer gratuitement
            <Icon name="arrow" />
          </button>
          <Link to="/connexion">J'ai déjà un compte</Link>
        </div>
        <div className="welcome-art">
          <div className="welcome-phone">
            <div className="phone-top" />
            <span className="phone-brand">ProxiMarché</span>
            <div className="phone-search">
              <Icon name="search" size={13} />
              Rechercher un produit...
            </div>
            <div className="phone-banner">
              <small>OFFRES DU JOUR</small>
              <strong>Économisez jusqu'à 30%</strong>
            </div>
            <div className="phone-products">
              {products.slice(0, 3).map((product) => (
                <i className={`tone-${product.color}`} key={product.name}>
                  {product.initial}
                </i>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  return (
    <main className="auth-page">
      <div className="auth-brand">
        <Brand />
      </div>
      <section className="auth-card">
        <span className="auth-icon">
          <Icon
            name={
              mode === "reset"
                ? "help"
                : mode === "register"
                  ? "user"
                  : "shield"
            }
            size={25}
          />
        </span>
        <h1>{copy[0]}</h1>
        <p>{copy[1]}</p>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            navigate("/client/accueil")
          }}
        >
          {mode === "register" && (
            <div className="auth-row">
              <label>
                <span>Prénom</span>
                <input placeholder="Armand" />
              </label>
              <label>
                <span>Nom</span>
                <input placeholder="Kouton" />
              </label>
            </div>
          )}
          <label>
            <span>
              {mode === "reset" ? "Adresse e-mail" : "E-mail ou téléphone"}
            </span>
            <input
              placeholder={
                mode === "reset" ? "vous@email.com" : "E-mail ou +229..."
              }
            />
          </label>
          {mode !== "reset" && (
            <label>
              <span>Mot de passe</span>
              <input placeholder="8 caractères minimum" type="password" />
            </label>
          )}
          {mode === "login" && (
            <Link className="forgot-link" to="/mot-de-passe-oublie">
              Mot de passe oublié ?
            </Link>
          )}
          <button className="portal-button primary wide" type="submit">
            {mode === "login"
              ? "Se connecter"
              : mode === "register"
                ? "Créer mon compte"
                : "Envoyer le lien"}
            <Icon name="arrow" />
          </button>
        </form>
        <div className="auth-separator">
          <span>ou continuer avec</span>
        </div>
        <button className="social-login" type="button">
          <b>G</b>Google
        </button>
        <p className="auth-switch">
          {mode === "login"
            ? "Pas encore de compte ?"
            : "Vous avez déjà un compte ?"}{" "}
          <Link to={mode === "login" ? "/inscription" : "/connexion"}>
            {mode === "login" ? "S'inscrire" : "Se connecter"}
          </Link>
        </p>
      </section>
      <Link className="auth-back" to="/">
        <Icon name="arrow" size={16} />
        Retour au choix de l'espace
      </Link>
    </main>
  )
}

export function NotFound() {
  return (
    <main className="not-found">
      <Brand />
      <strong>404</strong>
      <h1>Cette page reste introuvable</h1>
      <p>Le produit ou l'espace demandé a peut-être été déplacé.</p>
      <Link className="portal-button primary" to="/">
        Retour à l'accueil
      </Link>
    </main>
  )
}
