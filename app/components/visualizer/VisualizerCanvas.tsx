'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Frame } from '@/lib/types';

interface VisualizerCanvasProps {
    frame: Frame;
    array: number[]; // Current array state to render
    maxVal: number;
}

const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({ frame, array, maxVal }) => {
    return (
        <div className="w-full h-80 md:h-96 bg-slate-900 rounded-xl p-6 shadow-inner border border-slate-700 flex flex-col relative">
            {/* Legend inside canvas */}
            <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur border border-slate-700 p-3 rounded-lg flex flex-col gap-2 z-10 shadow-lg">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Legend</span>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-3 h-3 rounded bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div> Default
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-3 h-3 rounded bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div> Selected
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-3 h-3 rounded bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div> Comparing
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-3 h-3 rounded bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div> Swapping
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-3 h-3 rounded bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div> Sorted / Found
                </div>
            </div>

            {/* Array Bars Container */}
            <div className="flex-1 flex items-end justify-center gap-1.5 pb-12 w-full mt-4">
                <AnimatePresence>
                    {array.map((value, index) => {
                        const isHighlighted = frame.highlights.includes(index);
                        const isSwap = frame.action === 'swap' && frame.highlights.includes(index);
                        const isCompare = frame.action === 'compare' && frame.highlights.includes(index);
                        const isFound = frame.action === 'found' && (frame.highlights.length === 0 || frame.highlights.includes(index));

                        // Define colors based on action
                        let bgColor = '#3b82f6'; // blue-500
                        let shadowColor = 'rgba(59, 130, 246, 0.4)';
                        
                        if (isFound) {
                            bgColor = '#22c55e'; // green-500
                            shadowColor = 'rgba(34, 197, 94, 0.6)';
                        } else if (isSwap) {
                            bgColor = '#ef4444'; // red-500
                            shadowColor = 'rgba(239, 68, 68, 0.6)';
                        } else if (isCompare) {
                            bgColor = '#eab308'; // yellow-500
                            shadowColor = 'rgba(234, 179, 8, 0.6)';
                        } else if (isHighlighted) {
                            bgColor = '#a855f7'; // purple-500
                            shadowColor = 'rgba(168, 85, 247, 0.6)';
                        }

                        // Height percentage (minimum 5% so 0 isn't invisible)
                        const heightPercentage = Math.max(5, (value / maxVal) * 100);
                        const height = `${heightPercentage}%`;

                        // Calculate width dynamically
                        const barWidth = Math.min(48, Math.max(8, (800 / array.length) - 4));
                        const showValue = barWidth > 20; // Only show text if bar is wide enough

                        // Find pointers for this index
                        const activePointers = Object.entries(frame.pointers)
                            .filter(([_, ptrIndex]) => ptrIndex === index)
                            .map(([name]) => name);

                        return (
                            <motion.div
                                key={`${index}-${value}`}
                                layout
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height,
                                    opacity: 1,
                                    backgroundColor: bgColor,
                                    boxShadow: `0 0 12px ${shadowColor}, inset 0 2px 4px rgba(255,255,255,0.3)`
                                }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className="rounded-t-md relative flex flex-col items-center justify-end group transition-colors duration-150"
                                style={{ width: `${barWidth}px` }}
                            >
                                {/* Value Text inside/above bar */}
                                {showValue ? (
                                    <span className="text-white font-bold text-xs mb-1 text-shadow-sm select-none z-10 pb-1">
                                        {value}
                                    </span>
                                ) : (
                                    <span className="absolute -top-6 bg-slate-800 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                        {value}
                                    </span>
                                )}

                                {/* Pointers (i, j, mid, etc.) */}
                                {activePointers.length > 0 && (
                                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 w-full">
                                        <div 
                                            className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] mb-1"
                                            style={{ borderBottomColor: bgColor }}
                                        ></div>
                                        <div className="flex flex-wrap justify-center gap-1 w-20">
                                            {activePointers.map((ptrName, i) => (
                                                <span 
                                                    key={i} 
                                                    className="text-[10px] font-bold text-slate-900 bg-slate-200 px-1 rounded shadow-sm uppercase tracking-tighter"
                                                >
                                                    {ptrName}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default VisualizerCanvas;
