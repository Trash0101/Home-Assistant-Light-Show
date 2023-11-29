import type {Light} from "~/types/types";

export default async function  (body:Light) {
    await $fetch('/api/setLightParams', {
        method: "post",
        body: {
            entity_id: body.entity_id,
            brightness: body.attributes.brightness ?? 255,
            rgb_color: body.attributes.rgb_color ?? [255, 255, 255],
        }
    })
}