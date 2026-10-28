import { useMemo, useState, type ReactNode } from "react"
import { useNavigate } from "react-router"

type IconName = "arrow" | "basket" | "bell" | "chevron" | "clock" | "heart" | "home" | "location" | "menu" | "minus" | "percent" | "plus" | "search" | "shop" | "sparkles" | "user"

type IconProps = {
  name: IconName
  size?: number
  strokeWidth?: number
}

function Icon({ name, size = 20, strokeWidth = 1.8 }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="m9 18 6-6-6-6" />,
    basket: (
      <>
        <path d="M4 9h16l-1.4 10H5.4L4 9Z" />
        <path d="m8 9 4-6 4 6M9 13v2m6-2v2" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
        <path d="M10 21h4" />
      </>
    ),
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
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
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    minus: <path d="M5 12h14" />,
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
    shop: (
      <>
        <path d="M4 10v10h16V10M3 10l2-6h14l2 6" />
        <path d="M3 10a3 3 0 0 0 5 2 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5-2M9 20v-5h6v5" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
        <path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Zm13-2 .8 2.2 2.2.8-2.2.8L18 18l-.8-2.2L15 15l2.2-.8L18 12Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
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
      strokeWidth={strokeWidth}
    >
      {paths[name]}
    </svg>
  )
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand" aria-label="ProxiMarché">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#ffc107" />
          <path
            d="M17 31h34l-4 15H23l-6-22h-6"
            fill="none"
            stroke="#ff7a00"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path
            d="M32 11c-7 0-12 5-12 12 0 9 12 18 12 18s12-9 12-18c0-7-5-12-12-12Zm0 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
            fill="#0f9d58"
          />
          <circle cx="27" cy="51" r="4" fill="#0f9d58" />
          <circle cx="43" cy="51" r="4" fill="#0f9d58" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-name">
          Proxi<span>Marché</span>
        </span>
      )}
    </div>
  )
}

function Button({
  children,
  className = "",
  icon,
  onClick,
  variant = "primary",
}: {
  children: ReactNode
  className?: string
  icon?: IconName
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
}) {
  return (
    <button
      className={`button button-${variant} ${className}`}
      onClick={onClick}
      type="button"
    >
      {children}
      {icon && <Icon name={icon} size={18} />}
    </button>
  )
}

const shops = [
  {
    name: "Super U",
    area: "Akpakpa",
    distance: "1,2 km",
    rating: "4,8",
    time: "15–25 min",
    image:
      "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?auto=format&fit=crop&w=900&q=85",
    accent: "shop-green",
  },
  {
    name: "Erevan Super U",
    area: "Ganhi",
    distance: "2,8 km",
    rating: "4,7",
    time: "25–35 min",
    image:
      "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=900&q=85",
    accent: "shop-orange",
  },
  {
    name: "Franc Prix",
    area: "Cadjèhoun",
    distance: "2,1 km",
    rating: "4,6",
    time: "20–30 min",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",
    accent: "shop-blue",
  },
]

const deals = [
  {
    name: "Huile végétale",
    detail: "Dinor · 1 L",
    price: "1 850 F",
    old: "2 000 F",
    discount: "-8%",
    color: "product-yellow",
    emoji: "oil",
  },
  {
    name: "Riz parfumé",
    detail: "La Rizière · 5 kg",
    price: "8 500 F",
    old: "9 200 F",
    discount: "-7%",
    color: "product-cream",
    emoji: "rice",
  },
  {
    name: "Lait en poudre",
    detail: "Peak · 400 g",
    price: "1 500 F",
    old: "1 750 F",
    discount: "-14%",
    color: "product-blue",
    emoji: "milk",
  },
  {
    name: "Tomates fraîches",
    detail: "Panier · 1 kg",
    price: "950 F",
    old: "1 200 F",
    discount: "-20%",
    color: "product-red",
    emoji: "tomato",
  },
]

function ProductVisual({ kind }: { kind: string }) {
  if (kind === "oil")
    return (
      <div className="oil-bottle">
        <i />
        <b>DINOR</b>
      </div>
    )
  if (kind === "rice")
    return (
      <div className="rice-bag">
        <b>Riz</b>
        <span>Parfumé</span>
      </div>
    )
  if (kind === "milk")
    return (
      <div className="milk-tin">
        <b>PEAK</b>
        <span>LAIT</span>
      </div>
    )
  return (
    <div className="tomatoes">
      <i />
      <i />
      <i />
    </div>
  )
}

export default function App() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Accueil")
  const [cartCount, setCartCount] = useState(2)
  const [favorites, setFavorites] = useState<string[]>([])
  const [query, setQuery] = useState("")
  const [notice, setNotice] = useState("")

  const filteredDeals = useMemo(
    () =>
      deals.filter((deal) =>
        `${deal.name} ${deal.detail}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  )

  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(""), 2400)
  }

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    )
  }

  return (
    <div className="app-shell">
      {notice && (
        <div className="toast">
          <Icon name="sparkles" size={18} />
          {notice}
        </div>
      )}

      <header className="topbar">
        <div className="topbar-inner">
          <Brand />
          <div className="location">
            <span className="location-icon">
              <Icon name="location" size={19} />
            </span>
            <span>
              <small>Votre position</small>
              <strong>Akpakpa, Cotonou</strong>
            </span>
            <Icon name="chevron" size={16} />
          </div>
          <nav className="desktop-nav" aria-label="Navigation principale">
            {[
              ["Accueil", "/client/accueil"],
              ["Supermarchés", "/client/supermarches"],
              ["Promotions", "/client/promotions"],
            ].map(([item, path]) => (
              <button
                className={activeTab === item ? "active" : ""}
                onClick={() => {
                  setActiveTab(item)
                  navigate(path)
                }}
                type="button"
                key={item}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="top-actions">
            <button
              className="icon-button hide-mobile"
              aria-label="Notifications"
              onClick={() => navigate("/client/notifications")}
              type="button"
            >
              <Icon name="bell" />
            </button>
            <button
              className="icon-button hide-mobile"
              aria-label="Favoris"
              onClick={() => navigate("/client/favoris")}
              type="button"
            >
              <Icon name="heart" />
            </button>
            <button
              className="cart-button"
              onClick={() => navigate("/client/panier")}
              type="button"
            >
              <Icon name="basket" />
              <span>Panier</span>
              <b>{cartCount}</b>
            </button>
            <button
              className="profile-button hide-mobile"
              onClick={() => navigate("/client/profil")}
              type="button"
            >
              <span>AK</span>
              <Icon name="chevron" size={15} />
            </button>
            <button
              className="mobile-menu"
              aria-label="Ouvrir le menu"
              type="button"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-shape hero-shape-one" />
          <div className="hero-shape hero-shape-two" />
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">
                <Icon name="sparkles" size={16} /> Les meilleurs prix près de
                chez vous
              </span>
              <h1>
                Trouvez. Comparez.
                <br />
                <span>Achetez mieux.</span>
              </h1>
              <p>
                Comparez les prix de vos supermarchés préférés et faites vos
                courses sans perdre de temps.
              </p>
              <div className="search-box">
                <Icon name="search" size={22} />
                <input
                  aria-label="Rechercher un produit"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Que recherchez-vous aujourd'hui ?"
                  value={query}
                />
                <Button
                  onClick={() =>
                    query
                      ? navigate("/client/resultats")
                      : showNotice("Saisissez un produit")
                  }
                >
                  Rechercher
                </Button>
              </div>
              <div className="popular">
                <span>Recherches populaires :</span>
                {["Riz", "Huile", "Lait", "Tomates"].map((term) => (
                  <button
                    onClick={() => setQuery(term)}
                    type="button"
                    key={term}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="photo-card">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=90"
                  alt=""
                />
                <div className="photo-gradient" />
              </div>
              <div className="floating-card savings">
                <span>
                  <Icon name="percent" size={20} />
                </span>
                <div>
                  <strong>12 400 F</strong>
                  <small>économisés ce mois</small>
                </div>
              </div>
              <div className="floating-card delivery">
                <span>
                  <Icon name="clock" size={20} />
                </span>
                <div>
                  <strong>Livraison rapide</strong>
                  <small>Dès 25 minutes</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="quick-section content-width">
          <div className="section-heading">
            <div>
              <span className="kicker">EXPLOREZ</span>
              <h2>Que cherchez-vous ?</h2>
            </div>
            <Button
              variant="ghost"
              icon="arrow"
              onClick={() => navigate("/client/recherche")}
            >
              Voir tout
            </Button>
          </div>
          <div className="quick-grid">
            {[
              {
                icon: "shop" as IconName,
                title: "Supermarchés",
                text: "Découvrez les magasins proches",
                className: "quick-green",
              },
              {
                icon: "percent" as IconName,
                title: "Promotions",
                text: "Les meilleures offres du moment",
                className: "quick-orange",
              },
              {
                icon: "basket" as IconName,
                title: "Produits",
                text: "Trouvez tout ce qu'il vous faut",
                className: "quick-blue",
              },
              {
                icon: "location" as IconName,
                title: "Livraison",
                text: "Faites-vous livrer rapidement",
                className: "quick-yellow",
              },
            ].map((item) => (
              <button
                className={`quick-card ${item.className}`}
                onClick={() =>
                  navigate(
                    {
                      Supermarchés: "/client/supermarches",
                      Promotions: "/client/promotions",
                      Produits: "/client/recherche",
                      Livraison: "/client/suivi",
                    }[item.title] ?? "/client/recherche",
                  )
                }
                type="button"
                key={item.title}
              >
                <span className="quick-icon">
                  <Icon name={item.icon} size={27} />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </span>
                <i>
                  <Icon name="arrow" size={17} />
                </i>
              </button>
            ))}
          </div>
        </section>

        <section className="content-width section-block">
          <div className="section-heading">
            <div>
              <span className="kicker">À PROXIMITÉ</span>
              <h2>Supermarchés autour de vous</h2>
            </div>
            <Button
              variant="ghost"
              icon="arrow"
              onClick={() => navigate("/client/supermarches")}
            >
              Voir sur la carte
            </Button>
          </div>
          <div className="shop-grid">
            {shops.map((shop) => (
              <article className="shop-card" key={shop.name}>
                <div className="shop-image">
                  <img src={shop.image} alt={`Rayons de ${shop.name}`} />
                  <span className={`shop-logo ${shop.accent}`}>
                    {shop.name.slice(0, 1)}
                  </span>
                  <button
                    aria-label={`Ajouter ${shop.name} aux favoris`}
                    className={`favorite ${
                      favorites.includes(shop.name) ? "selected" : ""
                    }`}
                    onClick={() => toggleFavorite(shop.name)}
                    type="button"
                  >
                    <Icon name="heart" size={18} />
                  </button>
                  <span className="open-badge">Ouvert</span>
                </div>
                <div className="shop-info">
                  <div>
                    <h3>{shop.name}</h3>
                    <span>
                      {shop.area} · {shop.distance}
                    </span>
                  </div>
                  <span className="rating">★ {shop.rating}</span>
                </div>
                <div className="shop-meta">
                  <span>
                    <Icon name="clock" size={15} /> {shop.time}
                  </span>
                  <span>Livraison dès 500 F</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="deal-section">
          <div className="content-width">
            <div className="section-heading">
              <div>
                <span className="kicker kicker-orange">À NE PAS MANQUER</span>
                <h2>Promotions du jour</h2>
              </div>
              <Button
                variant="ghost"
                icon="arrow"
                onClick={() => navigate("/client/promotions")}
              >
                Toutes les promotions
              </Button>
            </div>
            <div className="deal-grid">
              {filteredDeals.length > 0 ? (
                filteredDeals.map((deal) => (
                  <article className="product-card" key={deal.name}>
                    <div className={`product-image ${deal.color}`}>
                      <span className="discount">{deal.discount}</span>
                      <button
                        aria-label={`Ajouter ${deal.name} aux favoris`}
                        className={`favorite ${
                          favorites.includes(deal.name) ? "selected" : ""
                        }`}
                        onClick={() => toggleFavorite(deal.name)}
                        type="button"
                      >
                        <Icon name="heart" size={18} />
                      </button>
                      <ProductVisual kind={deal.emoji} />
                    </div>
                    <div className="product-info">
                      <small>{deal.detail}</small>
                      <h3>{deal.name}</h3>
                      <div className="price-row">
                        <span>
                          <strong>{deal.price}</strong>
                          <del>{deal.old}</del>
                        </span>
                        <button
                          aria-label={`Ajouter ${deal.name} au panier`}
                          onClick={() => {
                            setCartCount((count) => count + 1)
                            showNotice(`${deal.name} ajouté au panier`)
                          }}
                          type="button"
                        >
                          <Icon name="plus" size={19} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  Aucune promotion ne correspond à « {query} ».
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <nav className="mobile-nav" aria-label="Navigation mobile">
        {[
          {
            label: "Accueil",
            icon: "home" as IconName,
            path: "/client/accueil",
          },
          {
            label: "Explorer",
            icon: "search" as IconName,
            path: "/client/recherche",
          },
          {
            label: "Panier",
            icon: "basket" as IconName,
            path: "/client/panier",
          },
          {
            label: "Favoris",
            icon: "heart" as IconName,
            path: "/client/favoris",
          },
          {
            label: "Profil",
            icon: "user" as IconName,
            path: "/client/profil",
          },
        ].map((item) => (
          <button
            className={activeTab === item.label ? "active" : ""}
            onClick={() => {
              setActiveTab(item.label)
              navigate(item.path)
            }}
            type="button"
            key={item.label}
          >
            <span>
              <Icon name={item.icon} size={21} />
              {item.label === "Panier" && <b>{cartCount}</b>}
            </span>
            <small>{item.label}</small>
          </button>
        ))}
      </nav>
    </div>
  )
}
