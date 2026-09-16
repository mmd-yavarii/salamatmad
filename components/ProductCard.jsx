'use client';

import React from 'react';
import Link from 'next/link';

function ProductCard({ id, title, image, description, price, discount, oldPrice }) {
    return (
        <Link href={`/products/${id}`} className="block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
                <img src={image} alt={title} className="h-full w-full object-cover" />

                {/* Discount */}
                {discount > 0 && (
                    <div className="absolute right-3 top-3 rounded-full bg-[var(--them)] px-3 py-1 text-xs font-bold text-white">
                        {discount}٪ تخفیف
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h2 className="line-clamp-1 text-base font-semibold text-[var(--foreground)]">{title}</h2>

                {/* Description */}
                <p className="mt-2 line-clamp-2 min-h-[42px] text-sm leading-6 text-[var(--foreground)]/55">{description}</p>

                {/* Price */}
                <div className="mt-4">
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-[var(--foreground)]">{price.toLocaleString('fa-IR')}</span>

                        <span className="text-xs text-[var(--foreground)]/50">تومان</span>
                    </div>

                    {oldPrice && <span className="text-xs text-[var(--foreground)]/35 line-through">{oldPrice.toLocaleString('fa-IR')}</span>}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
