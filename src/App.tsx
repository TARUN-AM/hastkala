import React from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { AuthProvider } from './lib/auth-context';
import { CartProvider } from './lib/cart-context';
import { WishlistProvider } from './lib/wishlist-context';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ArtisansPage } from './pages/ArtisansPage';
import { ArtisanProfilePage } from './pages/ArtisanProfilePage';
import { OurStoryPage } from './pages/OurStoryPage';
import { OurImpactPage } from './pages/OurImpactPage';
import { CraftStoriesPage } from './pages/CraftStoriesPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { SearchPage } from './pages/SearchPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { AuthPage } from './pages/AuthPage';
import { UserGuidePage } from './pages/UserGuidePage';

// Studio Pages
import { StudioOverview } from './pages/studio/StudioOverview';
import { StudioProducts } from './pages/studio/StudioProducts';
import { StudioProductForm } from './pages/studio/StudioProductForm';
import { StudioOrders } from './pages/studio/StudioOrders';
import { StudioProfile } from './pages/studio/StudioProfile';

// Admin Pages
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminArtisans } from './pages/admin/AdminArtisans';
import { AdminOrders } from './pages/admin/AdminOrders';

function AppRoutes() {
  const { path } = useRouter();

  const renderCurrentRoute = () => {
    // 1. Public Routes
    if (path === '/') return <HomePage />;
    if (path === '/shop') return <ShopPage />;
    if (path === '/craft-stories') return <CraftStoriesPage />;
    if (path === '/our-story') return <OurStoryPage />;
    if (path === '/our-impact' || path === '/impact') return <OurImpactPage />;
    if (path === '/search') return <SearchPage />;
    if (path === '/cart') return <CartPage />;
    if (path === '/checkout') return <CheckoutPage />;
    if (path === '/checkout/success') return <CheckoutSuccessPage />;
    if (path === '/orders') return <OrdersPage />;
    if (path === '/auth') return <AuthPage />;
    if (path === '/user-guide') return <UserGuidePage />;
    if (path === '/artisans') return <ArtisansPage />;

    // Craft Story detail route: /craft-stories/[slug]
    if (path.startsWith('/craft-stories/')) {
      const slug = path.replace('/craft-stories/', '');
      return <StoryDetailPage slug={slug} />;
    }

    // Category route: /categories/[slug]
    if (path.startsWith('/categories/')) {
      return <ShopPage />;
    }

    // Product detail route: /products/[slug]
    if (path.startsWith('/products/')) {
      const slug = path.replace('/products/', '');
      return <ProductDetailPage slug={slug} />;
    }

    // Artisan profile route: /artisans/[slug]
    if (path.startsWith('/artisans/')) {
      const slug = path.replace('/artisans/', '');
      return <ArtisanProfilePage slug={slug} />;
    }

    // Order detail route: /orders/[id]
    if (path.startsWith('/orders/')) {
      const id = path.replace('/orders/', '');
      return <OrderDetailPage id={id} />;
    }

    // 2. Artisan Studio Routes
    if (path === '/studio') return <StudioOverview />;
    if (path === '/studio/products') return <StudioProducts />;
    if (path === '/studio/products/new') return <StudioProductForm />;
    if (path.startsWith('/studio/products/') && path.endsWith('/edit')) {
      const id = path.replace('/studio/products/', '').replace('/edit', '');
      return <StudioProductForm productId={id} />;
    }
    if (path === '/studio/orders') return <StudioOrders />;
    if (path === '/studio/profile') return <StudioProfile />;

    // 3. Admin Routes
    if (path === '/admin') return <AdminOverview />;
    if (path === '/admin/products') return <AdminProducts />;
    if (path === '/admin/artisans') return <AdminArtisans />;
    if (path === '/admin/orders') return <AdminOrders />;

    // Fallback 404
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#29251F] mb-3">Page Not Found</h1>
        <p className="text-stone-600 text-xs mb-6">
          The requested craft route or collection does not exist.
        </p>
        <a
          href="/shop"
          className="px-6 py-3 bg-[#8A4935] text-white text-xs font-semibold rounded hover:bg-[#753C2B]"
        >
          Return to Marketplace
        </a>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F0E5] text-[#29251F]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div key={path} className="animate-in fade-in slide-in-from-bottom-1 duration-250 ease-out">
          {renderCurrentRoute()}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppRoutes />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </RouterProvider>
  );
}
