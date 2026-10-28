import { createBrowserRouter, Navigate } from "react-router"
import ClientHome from "../pages/ClientHome"
import {
  AuthPage,
  NotFound,
  PortalLayout,
  PortalPage,
  RoleChoice,
} from "../pages/Portal"

const clientPages = [
  ["recherche", "search"],
  ["resultats", "results"],
  ["produit", "product"],
  ["comparateur", "compare"],
  ["supermarches", "stores"],
  ["supermarche", "store"],
  ["promotions", "promotions"],
  ["panier", "cart"],
  ["commande", "checkout"],
  ["confirmation", "confirmation"],
  ["suivi", "tracking"],
  ["commandes", "orders"],
  ["favoris", "favorites"],
  ["notifications", "notifications"],
  ["profil", "profile"],
  ["adresses", "addresses"],
  ["paiements", "payments"],
  ["parametres", "settings"],
  ["aide", "help"],
] as const

const partnerPages = [
  ["tableau-de-bord", "dashboard"],
  ["produits", "products"],
  ["nouveau-produit", "new-product"],
  ["promotions", "partner-promotions"],
  ["commandes", "partner-orders"],
  ["commande", "partner-order"],
  ["statistiques", "analytics"],
  ["magasin", "store-profile"],
  ["equipe", "team"],
  ["notifications", "partner-notifications"],
  ["parametres", "partner-settings"],
] as const

const adminPages = [
  ["tableau-de-bord", "admin-dashboard"],
  ["utilisateurs", "users"],
  ["supermarches", "partners"],
  ["validation", "approval"],
  ["catalogue", "catalog"],
  ["categories", "categories"],
  ["commandes", "admin-orders"],
  ["finances", "finance"],
  ["signalements", "reports"],
  ["parametres", "admin-settings"],
] as const

export const router = createBrowserRouter([
  { path: "/", Component: RoleChoice },
  { path: "/bienvenue", element: <AuthPage mode="welcome" /> },
  { path: "/connexion", element: <AuthPage mode="login" /> },
  { path: "/inscription", element: <AuthPage mode="register" /> },
  { path: "/mot-de-passe-oublie", element: <AuthPage mode="reset" /> },
  { path: "/client", element: <Navigate to="/client/accueil" replace /> },
  { path: "/client/accueil", Component: ClientHome },
  {
    path: "/client",
    element: <PortalLayout role="client" />,
    children: clientPages.map(([path, page]) => ({
      path,
      element: <PortalPage role="client" page={page} />,
    })),
  },
  {
    path: "/partenaire",
    element: <PortalLayout role="partner" />,
    children: [
      { index: true, element: <Navigate to="tableau-de-bord" replace /> },
      ...partnerPages.map(([path, page]) => ({
        path,
        element: <PortalPage role="partner" page={page} />,
      })),
    ],
  },
  {
    path: "/administration",
    element: <PortalLayout role="admin" />,
    children: [
      { index: true, element: <Navigate to="tableau-de-bord" replace /> },
      ...adminPages.map(([path, page]) => ({
        path,
        element: <PortalPage role="admin" page={page} />,
      })),
    ],
  },
  { path: "*", Component: NotFound },
])
