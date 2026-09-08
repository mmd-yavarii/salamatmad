import { memo } from 'react';

const NEON_EFFECTS = [
    {
        id: 'cyan-neon',
        className: `
            top-[-8rem]
            left-[-10rem]

            h-[24rem]
            w-[24rem]

            bg-cyan-400/[0.07]
            dark:bg-cyan-400/[0.09]

            blur-[100px]

            md:h-[32rem]
            md:w-[32rem]
            md:bg-cyan-400/[0.09]
            md:blur-[120px]

            lg:h-[38rem]
            lg:w-[38rem]
            lg:bg-cyan-400/10
            lg:blur-[140px]
        `,
    },

    {
        id: 'fuchsia-neon',
        className: `
            top-[-6rem]
            right-[-10rem]

            h-[24rem]
            w-[24rem]

            bg-fuchsia-500/[0.06]
            dark:bg-fuchsia-500/[0.08]

            blur-[100px]

            md:h-[32rem]
            md:w-[32rem]
            md:bg-fuchsia-500/[0.08]
            md:blur-[120px]

            lg:h-[38rem]
            lg:w-[38rem]
            lg:bg-fuchsia-500/10
            lg:blur-[140px]
        `,
    },

    {
        id: 'violet-neon',
        className: `
            bottom-[-12rem]
            left-1/2
            -translate-x-1/2

            h-[26rem]
            w-[26rem]

            bg-violet-600/[0.05]
            dark:bg-violet-600/[0.07]

            blur-[110px]

            md:h-[34rem]
            md:w-[34rem]
            md:bg-violet-600/[0.08]
            md:blur-[130px]

            lg:h-[42rem]
            lg:w-[42rem]
            lg:bg-violet-600/[0.08]
            lg:blur-[150px]
        `,
    },
];

export const BackgroundEffects = memo(function BackgroundEffects() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                fixed
                inset-0
                z-0
                overflow-hidden
                select-none
                transform-gpu
            "
        >
            {NEON_EFFECTS.map(({ id, className }) => (
                <div
                    key={id}
                    className={`
                        absolute
                        rounded-full
                        will-change-transform
                        ${className}
                    `}
                />
            ))}

            <div
                className="
                    absolute
                    inset-0

                    opacity-[0.025]
                    dark:opacity-[0.035]

                    bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)]

                    bg-[size:3.5rem_3.5rem]

                    [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]
                "
            />
        </div>
    );
});

export default BackgroundEffects;
