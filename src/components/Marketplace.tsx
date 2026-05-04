import * as React from 'react';
import { mockDeals } from '@/types';
import { DealCard } from './DealCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List,
  TrendingDown,
  Filter,
  RefreshCcw,
  Zap
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export function Marketplace() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredDeals = mockDeals.filter(deal => 
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-primary/10 text-primary border-none rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-2">
            The Exchange
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">Deal Marketplace</h1>
          <p className="text-slate-500 max-w-xl text-lg">
            Discover premium business assets across tech, healthcare, and infrastructure. 
            All deals are pre-vetted by our analysts.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-slate-200">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Saved Searches
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
            <Zap className="h-4 w-4" />
            AI Deal Matching
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 shadow-sm sticky top-20 z-10">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by company name, industry, or location..." 
            className="pl-10 h-11 bg-slate-50/50 border-slate-100 focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-slate-100/50 p-1 rounded-xl border border-slate-100">
            <TabsList className="bg-transparent h-8 space-x-1">
              <TabsTrigger value="all" className="rounded-lg px-4 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">All Deals</TabsTrigger>
              <TabsTrigger value="new" className="rounded-lg px-4 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">Newly Listed</TabsTrigger>
              <TabsTrigger value="trending" className="rounded-lg px-4 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">Trending</TabsTrigger>
              <TabsTrigger value="watchlist" className="rounded-lg px-4 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">Watchlist</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="h-8 w-px bg-slate-200 mx-1 hidden lg:block" />
          
          <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100 h-10">
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-white shadow-sm rounded-lg">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 rounded-lg">
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" className="h-10 rounded-xl px-4 font-semibold border-slate-200">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border p-5 space-y-4">
              <div className="flex gap-3">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-12 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))
        ) : filteredDeals.length > 0 ? (
          filteredDeals.map((deal, idx) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <DealCard deal={deal} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold">No deals found</h3>
            <p className="text-slate-500 max-w-xs mt-2">
              We couldn't find any deals matching your search. Try adjusting your filters or keywords.
            </p>
            <Button variant="link" onClick={() => setSearchTerm('')} className="mt-4 text-primary font-bold">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
