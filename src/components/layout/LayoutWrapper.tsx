'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/helpers';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';

export interface LayoutWrapperProps {
  children: ReactNode;
  variant?: 'default' | 'dashboard' | 'landing' | 'auth' | 'minimal';
  showNavbar?: boolean;
  showSidebar?: boolean;
  showFooter?: boolean;
  showMobileNav?: boolean;
  navbarProps?: Partial<React.ComponentProps<typeof Navbar>>;
  sidebarProps?: Partial<React.ComponentProps<typeof Sidebar>>;
  footerProps?: Partial<React.ComponentProps<typeof Footer>>;
  mobileNavProps?: Partial<React.ComponentProps<typeof MobileNav>>;
  className?: string;
  contentClassName?: string;
}

export function LayoutWrapper({
  children,
  variant = 'default',
  showNavbar = true,
  showSidebar = false,
  showFooter = true,
  showMobileNav = true,
  navbarProps = {},
  sidebarProps = {},
  footerProps = {},
  mobileNavProps = {},
  className,
  contentClassName,
}: LayoutWrapperProps) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDashboard = variant === 'dashboard';
  const isAuth = variant === 'auth';
  const isLanding = variant === 'landing';
  const isMinimal = variant === 'minimal';

  const mobileNavItems = [
    {
      id: 'home',
      label: 'Beranda',
      icon: '🏠',
      activeIcon: '🏠',
      href: '/',
    },
    {
      id: 'learning',
      label: 'Belajar',
      icon: '📚',
      activeIcon: '📚',
      href: '/learning',
      badge: 3,
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: '📊',
      activeIcon: '📊',
      href: '/progress',
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: '👤',
      activeIcon: '👤',
      href: '/profile',
    },
  ];

  const authPages = ['/login', '/register', '/forgot-password', '/reset-password'];

  if (authPages.includes(pathname || '')) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  if (isMinimal) {
    return (
      <div className={cn('min-h-screen flex flex-col', className)}>
        {showNavbar && <Navbar {...navbarProps} />}
        <main className={cn('flex-1', contentClassName)}>{children}</main>
        {showFooter && <Footer {...footerProps} />}
      </div>
    );
  }

  if (isLanding) {
    return (
      <div className={cn('min-h-screen flex flex-col', className)}>
        {showNavbar && (
          <Navbar
            variant="transparent"
            position="absolute"
            {...navbarProps}
          />
        )}
        <main className={cn('flex-1', contentClassName)}>{children}</main>
        {showFooter && <Footer {...footerProps} />}
      </div>
    );
  }

  if (isDashboard) {
    return (
      <div className={cn('min-h-screen flex flex-col', className)}>
        {showNavbar && (
          <Navbar
            position="sticky"
            variant="default"
            showProgress
            progressValue={65}
            {...navbarProps}
          />
        )}
        <div className="flex flex-1">
          {showSidebar && (
            <Sidebar
              variant="default"
              position="fixed"
              isCollapsed={isSidebarCollapsed}
              onCollapse={setIsSidebarCollapsed}
              showUserProfile
              showProgress
              showSearch
              sections={[
                {
                  id: 'main',
                  title: 'Main Menu',
                  items: [
                    {
                      id: 'dashboard',
                      label: 'Dashboard',
                      icon: '📊',
                      href: '/dashboard',
                    },
                    {
                      id: 'learning',
                      label: 'Learning',
                      icon: '📚',
                      href: '/learning',
                      badge: 3,
                      badgeColor: 'primary',
                      children: [
                        {
                          id: 'month1',
                          label: 'Bulan 1 - Excel',
                          icon: '📗',
                          href: '/learning/1',
                        },
                        {
                          id: 'month2',
                          label: 'Bulan 2 - SQL',
                          icon: '📘',
                          href: '/learning/2',
                        },
                        {
                          id: 'month3',
                          label: 'Bulan 3 - Power BI',
                          icon: '📙',
                          href: '/learning/3',
                        },
                      ],
                    },
                    {
                      id: 'progress',
                      label: 'Progress',
                      icon: '📈',
                      href: '/progress',
                    },
                    {
                      id: 'analytics',
                      label: 'Analytics',
                      icon: '📉',
                      href: '/analytics',
                    },
                  ],
                },
                {
                  id: 'projects',
                  title: 'Projects',
                  items: [
                    {
                      id: 'projects',
                      label: 'All Projects',
                      icon: '📋',
                      href: '/projects',
                      badge: 2,
                      badgeColor: 'success',
                    },
                    {
                      id: 'submissions',
                      label: 'Submissions',
                      icon: '✅',
                      href: '/submissions',
                    },
                  ],
                },
                {
                  id: 'resources',
                  title: 'Resources',
                  items: [
                    {
                      id: 'resources',
                      label: 'Library',
                      icon: '📚',
                      href: '/resources',
                    },
                    {
                      id: 'community',
                      label: 'Community',
                      icon: '👥',
                      href: '/community',
                      badge: 5,
                      badgeColor: 'warning',
                    },
                  ],
                },
              ]}
              user={{
                name: 'User',
                email: 'user@example.com',
                level: 3,
                xp: 450,
                nextLevelXp: 600,
              }}
              {...sidebarProps}
            />
          )}
          <main
            className={cn(
              'flex-1 transition-all duration-300',
              showSidebar && (isSidebarCollapsed ? 'ml-16' : 'ml-64'),
              contentClassName
            )}
          >
            <div className="p-4 sm:p-6 lg:p-8">{children}</div>
          </main>
        </div>
        {showFooter && (
          <Footer
            variant="simple"
            className={cn(
              'transition-all duration-300',
              showSidebar && (isSidebarCollapsed ? 'ml-16' : 'ml-64')
            )}
            {...footerProps}
          />
        )}
        {showMobileNav && (
          <MobileNav
            items={mobileNavItems}
            variant="default"
            position="bottom"
            {...mobileNavProps}
          />
        )}
      </div>
    );
  }

  // Default layout
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {showNavbar && <Navbar {...navbarProps} />}
      <main className={cn('flex-1', contentClassName)}>{children}</main>
      {showFooter && <Footer {...footerProps} />}
      {showMobileNav && (
        <MobileNav
          items={mobileNavItems}
          variant="default"
          position="bottom"
          {...mobileNavProps}
        />
      )}
    </div>
  );
}

export default LayoutWrapper;
