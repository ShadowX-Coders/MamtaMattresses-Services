import React, { useState } from 'react';
import { BEFORE_AFTER_ITEMS } from '../data/galleryData';
import { BeforeAfterItem } from '../types';
import { Sparkles, ArrowLeftRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const activeItem: BeforeAfterItem = BEFORE_AFTER_ITEMS[selectedItemIndex];

  return (
    <div className="clay-card p-6 sm:p-8 bg-white max-w-5xl mx-auto shadow-clay">
      
      {/* Header and Case Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#DCEBE2]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Visual Comparison</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#202824]">
            {activeItem.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#718078] mt-1 max-w-xl">
            {activeItem.description}
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {BEFORE_AFTER_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItemIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedItemIndex === idx
                  ? 'bg-[#176B52] text-white shadow-sm'
                  : 'bg-[#F7F8F4] text-[#718078] hover:bg-[#EAF1E8] hover:text-[#176B52] border border-[#DCEBE2]'
              }`}
            >
              Case {idx + 1}: {item.serviceCategory.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Slider Area */}
      <div className="relative mt-6 rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] select-none shadow-inner bg-[#EAF1E8]">
        
        {/* Layer 1: After Image (Full width background) */}
        <img
          src={activeItem.afterImage}
          alt={activeItem.afterLabel || "Restored Mattress Result"}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Layer 2: Before Image (Clipped to sliderPosition %) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={activeItem.beforeImage}
            alt={activeItem.beforeLabel || "Damaged Mattress Before Repair"}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: '100%', minWidth: '100%', height: '100%' }}
          />
          
          {/* Subtle dark tint over before side for realism contrast */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          
          {/* Before Pill Label */}
          <div className="absolute top-4 left-4 bg-[#202824]/85 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md border border-white/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span>BEFORE REPAIR</span>
          </div>
        </div>

        {/* After Pill Label */}
        <div className="absolute top-4 right-4 bg-[#176B52]/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md border border-white/20 flex items-center gap-1.5 pointer-events-none">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#B8DCC5]" />
          <span>AFTER AT-HOME REPAIR</span>
        </div>

        {/* Draggable Divider Line */}
        <div
          className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          {/* Tactile Handle Knob */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#176B52] border-2 border-[#176B52] shadow-xl flex items-center justify-center">
            <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Range Input for full touch and mouse interaction */}
        <input
          type="range"
          min="5"
          max="95"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
          aria-label="Drag to compare before and after repair"
        />
      </div>

      {/* Slider Instruction & Demo Disclosure */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#718078] gap-3">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-3.5 h-3.5 text-[#176B52]" />
          <span><strong>Slide left / right</strong> to view restoration transformation</span>
        </div>

        {activeItem.isIllustrativeDemo && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#718078] bg-[#EAF1E8] px-3 py-1 rounded-full border border-[#DCEBE2]">
            <AlertCircle className="w-3 h-3 text-[#176B52] shrink-0" />
            <span>Demonstration preview. Authentic on-site photos updated via CMS.</span>
          </div>
        )}
      </div>
    </div>
  );
};
