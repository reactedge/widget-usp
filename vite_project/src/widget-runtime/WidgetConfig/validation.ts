import { z } from "zod";
import {defaultUspSettings} from "../../components/Types.ts";

export const baseWidgetContractSchema = z.object({
    data: z.unknown(),
    runtime: z.object({}).optional(),
    integrations: z.object({}).optional(),
}).strict();

export const uspSchema = baseWidgetContractSchema.extend({
    data: z.object({
        slides: z.array(
            z.object({
                text: z.string().min(1).max(200),
            }).strict()
        ).min(1),
    }).strict(),

    settings: z.object({
        mode: z.object({
            desktop: z.enum(["static", "slider"]),
            tablet: z.enum(["static", "slider"]),
            mobile: z.enum(["static", "slider"]),
        }).default(defaultUspSettings),
    })
});
