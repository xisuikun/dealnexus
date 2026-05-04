import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Building2, 
  DollarSign, 
  PieChart, 
  Upload,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const steps = [
  { id: 1, name: 'Business Basics', icon: Building2 },
  { id: 2, name: 'Financials', icon: DollarSign },
  { id: 3, name: 'Market Info', icon: PieChart },
  { id: 4, name: 'Documents', icon: Upload },
];

export function CreateListing() {
  const [currentStep, setCurrentStep] = React.useState(1);
  
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-serif italic text-primary">List Your Deal</h1>
        <p className="text-slate-500">Share your business with our network of 50,000+ accredited investors and firms.</p>
      </div>

      {/* Stepper UI */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
        <div className="relative z-10 flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-3">
              <div 
                className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-4 border-white shadow-xl",
                  currentStep >= step.id ? "bg-primary text-white scale-110" : "bg-slate-100 text-slate-400"
                )}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <step.icon className="h-6 w-6" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                currentStep >= step.id ? "text-primary" : "text-slate-400"
              )}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card className="rounded-3xl border-slate-200/60 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100">
          <CardTitle className="text-2xl font-bold">
            {steps[currentStep - 1].name}
          </CardTitle>
          <CardDescription>
            Step {currentStep} of {steps.length}: Please provide the necessary details below.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company Name</Label>
                    <Input placeholder="e.g. Acme Tech Solutions" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Industry</Label>
                    <Input placeholder="e.g. SaaS / Enterprise" className="h-12 rounded-xl" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">One-Line Pitch</Label>
                    <Input placeholder="A brief description of your business model..." className="h-12 rounded-xl" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Business Model & Description</Label>
                    <textarea 
                      className="w-full min-h-[120px] rounded-2xl border border-slate-200 p-4 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      placeholder="Go into more detail about what your company does, your unique value proposition, and why an investor should be interested..."
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Annual Revenue (ARR)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="0.00" className="h-12 pl-10 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">EBITDA</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="0.00" className="h-12 pl-10 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Year-over-Year Growth</Label>
                    <Input placeholder="%" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Desired Valuation</Label>
                    <Input placeholder="e.g. $50,000,000" className="h-12 rounded-xl" />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 flex items-start gap-4">
                    <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <p className="font-bold text-sm">Market Information Helps Filters</p>
                      <p className="text-xs text-slate-500">Accurate market categorization ensures your deal is seen by the right investors specializing in your sector.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Market Headquarters</Label>
                      <Input placeholder="City, Country" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Employee Count</Label>
                      <Input placeholder="e.g. 50-100" className="h-12 rounded-xl" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center space-y-4 hover:border-primary/50 transition-colors group cursor-pointer">
                    <div className="mx-auto h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="h-8 w-8 text-slate-400 group-hover:text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-lg">Click to upload or drag and drop</p>
                      <p className="text-sm text-slate-500">Upload Pitch Deck, Financial Statements, or Teasers (PDF, PPTX, XLSX)</p>
                    </div>
                    <Button variant="outline" className="rounded-xl border-slate-200">Select Files</Button>
                  </div>
                  <div className="space-y-4 pt-4">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Uploaded Files</Label>
                    <div className="bg-slate-50 p-4 rounded-xl text-center text-slate-400 text-sm">
                      No files uploaded yet.
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className="rounded-xl font-bold gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button 
            onClick={nextStep}
            className="rounded-xl font-bold px-8 shadow-lg shadow-primary/20 gap-2"
          >
            {currentStep === steps.length ? 'Submit Listing' : 'Next Step'}
            {currentStep < steps.length && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}
