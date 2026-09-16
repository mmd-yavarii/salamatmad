'use client';

import React from 'react';
import ProductCard from '@/components/ProductCard';

const products = [
    {
        id: 1,
        title: 'دستگاه فشار خون دیجیتال',
        image: 'https://www.dramirsolhjoo.com/wp-content/uploads/2026/03/2-9.jpg',
        description: 'دستگاه فشار خون دیجیتال با اندازه‌گیری دقیق و نمایشگر خوانا.',
        price: 1250000,
        oldPrice: 1500000,
        discount: 17,
    },
    {
        id: 2,
        title: 'دماسنج دیجیتال',
        image: 'https://www.dramirsolhjoo.com/wp-content/uploads/2026/03/2-9.jpg',
        description: 'دماسنج دیجیتال سریع و دقیق مناسب استفاده روزمره و خانگی.',
        price: 385000,
        oldPrice: 450000,
        discount: 14,
    },
    {
        id: 3,
        title: 'پالس اکسیمتر',
        image: 'https://www.dramirsolhjoo.com/wp-content/uploads/2026/03/2-9.jpg',
        description: 'پالس اکسیمتر کوچک و قابل حمل برای اندازه‌گیری سطح اکسیژن خون.',
        price: 690000,
        oldPrice: 820000,
        discount: 16,
    },
    {
        id: 4,
        title: 'دستگاه بخور سرد',
        image: 'https://www.dramirsolhjoo.com/wp-content/uploads/2026/03/2-9.jpg',
        description: 'دستگاه بخور سرد کم‌مصرف برای ایجاد رطوبت مناسب در محیط.',
        price: 980000,
        oldPrice: 1150000,
        discount: 15,
    },
];

export default function Home() {
    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-medium text-[var(--them)]">محصولات</p>

                    <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">لیست محصولات</h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--foreground)]/50">
                        محصولات مورد نیاز خود را با کیفیت مناسب و قیمت رقابتی مشاهده و انتخاب کنید.
                    </p>
                </div>

                {/* Products */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </main>
    );
}
