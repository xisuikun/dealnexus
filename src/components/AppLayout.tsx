import * as React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  PieChart, 
  Settings, 
  PlusCircle, 
  Search, 
  Bell, 
  User, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Marketplace', href: '/marketplace', icon: Briefcase },
  { name: 'Analytics', href: '/analytics', icon: PieChart },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Watchlist', href: '/watchlist', icon: Bookmark },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className={cn(
          "hidden md:flex flex-col border-r bg-white dark:bg-slate-900 transition-all duration-300 ease-in-out z-30",
          !isSidebarOpen && "items-center"
        )}
      >
        <div className="flex items-center h-16 px-6 border-bottom">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-xl tracking-tight whitespace-nowrap">DealNexus</span>
            )}
          </Link>
        </div>

        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link 
                key={item.name} 
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "" : "group-hover:text-primary transition-colors")} />
                {isSidebarOpen && (
                  <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
                )}
                {!isSidebarOpen && isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" 
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 mt-auto border-t">
          <Button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            variant="ghost" 
            size="sm" 
            className="w-full justify-start gap-2"
          >
            <ChevronRight className={cn("h-4 w-4 transition-transform duration-300", isSidebarOpen && "rotate-180")} />
            {isSidebarOpen && <span>Collapse</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40 bg-white shadow-sm border">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="flex flex-col h-full bg-white dark:bg-slate-900">
              <div className="p-6 border-b">
                <Link to="/" className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-xl">DealNexus</span>
                </Link>
              </div>
              <div className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200",
                        isActive ? "bg-primary text-primary-foreground" : "text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-20 sticky top-0">
          <div className="max-w-md w-full hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search deals, markets, investors..." 
                className="pl-10 bg-slate-100/50 border-none focus-visible:ring-1 focus-visible:ring-primary h-9 rounded-lg w-full transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-primary">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            
            <Link to="/list-deal">
              <Button variant="outline" size="sm" className="hidden lg:flex items-center gap-2 rounded-lg border-slate-200 font-medium">
                <PlusCircle className="h-4 w-4" />
                List a Deal
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer pl-2 hover:bg-slate-50 p-1 rounded-lg transition-colors">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-semibold leading-none">Alex Thompson</p>
                    <p className="text-xs text-slate-500 mt-1 capitalize">Investment Director</p>
                  </div>
                  <Avatar className="h-9 w-9 border-2 border-primary/10 shadow-sm ring-offset-2 ring-primary/5">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" />
                    <AvatarFallback>AT</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl border-slate-200 p-2 shadow-lg">
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Alex Thompson</p>
                    <p className="text-xs leading-none text-muted-foreground">alex.t@dealnexus.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>Admin Panel</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-4 md:p-8 max-w-[1600px] mx-auto w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
