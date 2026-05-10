import { z } from 'zod';

export const WidgetConfigSchema = z.object({
    data: z.object({
        slides: z.array(
            z.object({
                text: z.string()
            }).strict()
        ).min(1)
    }).strict(),

    settings: z.object({
        mode: z.object({
            desktop: z.enum(['static', 'slider']),
            tablet: z.enum(['static', 'slider']),
            mobile: z.enum(['static', 'slider'])
        }).strict(),

        theme: z.enum([
            'light',
            'dark',
            'promo'
        ]).default('light')
    }).strict()

}).strict();

export type WidgetConfig =
    z.infer<typeof WidgetConfigSchema>;

export function parseConfig(
    input: unknown
): WidgetConfig {
    return WidgetConfigSchema.parse(input);
}