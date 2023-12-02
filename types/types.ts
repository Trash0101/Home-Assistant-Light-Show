

export interface Light {
    entity_id: string,
    state: string,
    attributes: {
        min_color_temp_kelvin: number,
        max_color_temp_kelvin: number,
        color_temp_kelvin: number,
        min_mireds: number,
        max_mireds: number,
        supported_color_modes: string[],
        color_mode: string,
        brightness: number,
        hs_color?: number[],
        rgb_color?: number[],
        xy_color: number[],
        friendly_name: string,
        supported_features: number
    }
}
export interface Song {
    id: string
    URL: string
    buffer: AudioBuffer
    tempo: number
    metaData: any
}