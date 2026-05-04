import { Deal } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  DollarSign, 
  MapPin, 
  ArrowUpRight, 
  Globe, 
  Users,
  Bookmark,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full group overflow-hidden border-slate-200 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 bg-white dark:bg-slate-900 rounded-2xl">
        <CardHeader className="p-5 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-100 group-hover:bg-primary/5 transition-colors">
                <Building2 className="h-6 w-6 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors line-clamp-1">{deal.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{deal.industry}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full transition-colors",
                deal.isBookmarked ? "text-primary bg-primary/5" : "text-slate-400 hover:text-primary"
              )}
            >
              <Bookmark className={cn("h-4 w-4", deal.isBookmarked && "fill-current")} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-4 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 min-h-[40px] leading-relaxed">
            {deal.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</p>
              <p className="font-semibold text-sm">{deal.revenue}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">EBITDA</p>
              <p className="font-semibold text-sm">{deal.ebitda}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth</p>
              <p className="font-semibold text-sm flex items-center gap-1 text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />
                {deal.growth}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valuation</p>
              <p className="font-bold text-sm text-primary">{deal.valuation}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {deal.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0 border-none rounded-md">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 border-t bg-slate-50/50 dark:bg-slate-800/50 mt-4 h-14">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1 text-slate-400">
              <MapPin className="h-3 w-3" />
              <span className="text-[10px] font-medium">{deal.location}</span>
            </div>
            <Link to={`/deal/${deal.id}`}>
              <Button size="sm" variant="ghost" className="h-8 text-[11px] font-bold gap-1 hover:bg-primary hover:text-white rounded-lg group/btn">
                View Deal
                <ChevronRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
