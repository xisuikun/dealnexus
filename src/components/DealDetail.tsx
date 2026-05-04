import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDeals } from '@/types';
import { cn } from '@/lib/utils';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Building2, 
  ExternalLink, 
  Download, 
  Lock, 
  CheckCircle2,
  Bookmark,
  Share2,
  FileText,
  DollarSign,
  TrendingUp,
  Briefcase,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';

export function DealDetail() {
  const { id } = useParams<{ id: string }>();
  const deal = mockDeals.find(d => d.id === id);
  const [isBookmarked, setIsBookmarked] = React.useState(deal?.isBookmarked || false);

  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Deal not found</h2>
        <Link to="/marketplace">
          <Button variant="outline">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <nav className="flex items-center justify-between mb-8">
        <Link to="/marketplace">
          <Button variant="ghost" className="gap-2 rounded-xl group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Exchange
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className={`rounded-xl border-slate-200 transition-colors ${isBookmarked ? 'text-primary bg-primary/5 border-primary/20' : ''}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="h-20 w-20 rounded-3xl bg-slate-100 flex items-center justify-center border-2 border-white shadow-xl shadow-slate-200/50">
                <Building2 className="h-10 w-10 text-slate-400" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold tracking-tight">{deal.name}</h1>
                  <Badge className="bg-emerald-50 text-emerald-700 border-none rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                    Active Listing
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-slate-500 font-medium pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{deal.location}</span>
                  </div>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>Founded {deal.yearFounded}</span>
                  </div>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{deal.employees} employees</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { label: 'Revenue', value: deal.revenue, icon: DollarSign },
                { label: 'EBITDA', value: deal.ebitda, icon: TrendingUp },
                { label: 'Growth', value: `${deal.growth}%`, icon: ArrowUpRight, trend: 'up' },
                { label: 'Valuation', value: deal.valuation, icon: Briefcase },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <item.icon className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
                  </div>
                  <span className="text-xl font-bold tracking-tight">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b rounded-none px-0 h-12 gap-8">
              {['overview', 'financials', 'documents', 'team'].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 font-bold text-sm uppercase tracking-wider text-slate-500 transition-all pb-3"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview" className="pt-8 space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Executive Summary</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {deal.description} This is a unique opportunity to acquire a high-growth asset in the {deal.industry} space. 
                  The company has established a market-leading position with a proprietary tech stack and a blue-chip customer base.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {deal.tags.map(tag => (
                    <Badge key={tag} className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none rounded-lg px-4 py-1 font-semibold">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="rounded-2xl border-slate-100 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <h4 className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      Investment Highlights
                    </h4>
                    <ul className="space-y-3">
                      {['Strong recurring revenue', 'Expert management team', 'High barriers to entry', 'Scalable operations'].map(h => (
                        <li key={h} className="text-sm text-slate-600 flex items-center gap-3">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border-slate-100 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <h4 className="font-bold flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Growth Drivers
                    </h4>
                    <ul className="space-y-3">
                      {['International expansion', 'New product vertical', 'Organic SEO growth', 'Recent strategic partnerships'].map(h => (
                        <li key={h} className="text-sm text-slate-600 flex items-center gap-3">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="financials" className="pt-8">
              <div className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="relative z-10 space-y-6">
                  <div className="mx-auto h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Confidential Financial Data</h3>
                    <p className="text-slate-400 max-w-sm mx-auto">
                      Please sign the Non-Disclosure Agreement (NDA) to unlock detailed financial statements and tax returns.
                    </p>
                  </div>
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold px-8 shadow-xl shadow-white/10">
                    Sign NDA to Unlock
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="documents" className="pt-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { name: 'Pitch Deck 2024', size: '12.4 MB', type: 'PDF' },
                   { name: 'Market Analysis Report', size: '4.2 MB', type: 'PDF' },
                   { name: 'Teaser One-Pager', size: '1.1 MB', type: 'PDF' },
                 ].map(doc => (
                   <div key={doc.name} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-primary/30 transition-colors group">
                     <div className="flex items-center gap-3">
                       <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-primary/5">
                         <FileText className="h-5 w-5 text-slate-400 group-hover:text-primary" />
                       </div>
                       <div>
                         <p className="font-bold text-sm">{doc.name}</p>
                         <p className="text-[10px] font-bold text-slate-400">{doc.type} • {doc.size}</p>
                       </div>
                     </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                       <Download className="h-4 w-4" />
                     </Button>
                   </div>
                 ))}
               </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Actions Sidebar */}
        <div className="space-y-6">
          <Card className="rounded-3xl border-slate-200 shadow-xl shadow-slate-200/30 sticky top-32 overflow-hidden">
            <div className="h-2 bg-primary w-full" />
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Asking Price</p>
                <h2 className="text-4xl font-bold text-center tracking-tight">{deal.valuation}</h2>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">Accepting Offers</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 text-md">
                  Express Interest
                </Button>
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold text-md border-slate-200">
                  Request Information
                </Button>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Advisory Team</h4>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-1 ring-slate-100">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-bold">John Doe</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">M&A Advisor • J.P. Morgan</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Button variant="link" className="p-0 h-auto text-[10px] font-bold p-0 text-primary uppercase">LinkedIn</Button>
                      <Button variant="link" className="p-0 h-auto text-[10px] font-bold p-0 text-primary uppercase">Contact</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Info className="h-3 w-3 text-primary" />
                  Listing Stats
                </h4>
                <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                  <span className="text-[11px] font-medium text-slate-500">Listed On</span>
                  <span className="text-[11px] font-bold">May 12, 2024</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                  <span className="text-[11px] font-medium text-slate-500">Interviews</span>
                  <span className="text-[11px] font-bold">12 Active</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-medium text-slate-500">Profile Views</span>
                  <span className="text-[11px] font-bold">4,520</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

