import * as React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Users, 
  Eye, 
  Handshake, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronRight,
  TrendingUp,
  Briefcase,
  History,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const trafficData = [
  { name: 'Mon', views: 240 },
  { name: 'Tue', views: 320 },
  { name: 'Wed', views: 480 },
  { name: 'Thu', views: 380 },
  { name: 'Fri', views: 520 },
  { name: 'Sat', views: 600 },
  { name: 'Sun', views: 550 },
];

const activity = [
  { 
    id: 1, 
    user: 'Sarah Miller', 
    action: 'viewed your listing', 
    target: 'CloudScale AI', 
    time: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  },
  { 
    id: 2, 
    user: 'Goldman Sachs Co.', 
    action: 'requested access to data room', 
    target: 'FinFlow Payments', 
    time: '5h ago',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100'
  },
  { 
    id: 3, 
    user: 'Mark Cuban', 
    action: 'bookmarked', 
    target: 'GreenPulse Energy', 
    time: '1d ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 font-serif italic text-primary">Overview</h1>
          <p className="text-slate-500">Welcome back, Alex. Your marketplace activity is up 12.5% this week.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl font-semibold border-slate-200">
            Export Report
          </Button>
          <Button size="sm" className="rounded-xl font-semibold shadow-lg shadow-primary/20">
            View My Listings
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pipeline Value', value: '$1.2B', change: '+14%', icon: DollarSign, trend: 'up' },
          { label: 'Active Listings', value: '1,248', change: '+2.4%', icon: Briefcase, trend: 'up' },
          { label: 'Total Views', value: '45.2K', change: '+8%', icon: Eye, trend: 'up' },
          { label: 'Successful Exits', value: '124', change: '-2%', icon: Handshake, trend: 'down' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-2xl border-slate-200/60 shadow-sm overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-primary transition-colors">
                    <stat.icon className="h-5 w-5 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                  <Badge variant="outline" className={cn(
                    "font-bold text-[10px] rounded-full px-2 py-0.5",
                    stat.trend === 'up' ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-rose-600 bg-rose-50 border-rose-100"
                  )}>
                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-0.5 inline" /> : <ArrowDownRight className="h-3 w-3 mr-0.5 inline" />}
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-500 mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 rounded-3xl border-slate-200/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">Deal Volume</CardTitle>
              <CardDescription>Aggregate deal volume across all active markets.</CardDescription>
            </div>
            <Tabs defaultValue="monthly" className="w-auto">
              <TabsList className="h-9 bg-slate-100 p-1 rounded-lg">
                <TabsTrigger value="weekly" className="text-xs rounded-md">Weekly</TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs rounded-md">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(val) => `$${val/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <Card className="rounded-3xl border-slate-200/60 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/30">
              <CardTitle className="text-lg font-bold flex items-center justify-between">
                Recent Interest
                <History className="h-4 w-4 text-slate-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {activity.map((item) => (
                  <div key={item.id} className="p-4 flex items-start gap-3 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-slate-100">
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold">
                        <span className="text-slate-900 group-hover:text-primary transition-colors">{item.user}</span>
                        <span className="text-slate-500 font-normal"> {item.action} </span>
                        <span className="text-slate-900 font-bold">{item.target}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-3 border-t bg-slate-50/30 text-center">
              <Button variant="ghost" size="sm" className="w-full text-xs font-bold gap-2 rounded-lg">
                View All Activity
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </Card>

          <Card className="rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="h-32 w-32" />
            </div>
            <CardContent className="p-8 relative z-10">
              <h3 className="text-2xl font-serif italic mb-2">Deal Insights AI</h3>
              <p className="text-primary-foreground/70 text-sm mb-6 leading-relaxed">
                Connect your account to get deep insights into market trends and personalized acquisition targets.
              </p>
              <Button className="w-full bg-white text-primary hover:bg-slate-50 rounded-xl font-bold shadow-sm">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
