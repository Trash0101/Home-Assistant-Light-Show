
export interface Range {
    start: number
    end: number
}
export interface RangesAndFrequencies {
    frequencyRange: Range
    gainValues: Range
    hueRanges?: Range
}

export interface  Setting {
    beat: number
    random: boolean,
    timeRange: number[],
    ranges: {
        color: {
            brightness: number[]
            random: boolean,
            octaves: boolean,
            range: boolean
            colors: number[][]
            colorRanges: number[][]
        },
        darkness: {
            frequency: number[],
            difference: number
        },
        flash: {
            frequency: number[],
            difference: number
        }
    }
}
export interface SpecifiedSetting extends  Setting {
    entity_id: string
}
export interface SpecifiedSettingBeats {
    one: SpecifiedSetting[]
    two: SpecifiedSetting[]
    three: SpecifiedSetting[]
    four: SpecifiedSetting[]
    oneHalf: SpecifiedSetting[]
    oneFourth: SpecifiedSetting[]
    oneEight: SpecifiedSetting[]
}
export interface SpecifiedSettingBeatsTimeline {
    one: SpecifiedSetting[]|undefined
    two: SpecifiedSetting[]|undefined
    three: SpecifiedSetting[]|undefined
    four: SpecifiedSetting[]|undefined
    oneHalf: SpecifiedSetting[]|undefined
    oneFourth: SpecifiedSetting[]|undefined
    oneEight: SpecifiedSetting[]|undefined
}
export interface SongSetting {
    song: number,
    settings: Setting[]
}
export interface APILightSetting {
    mode: string,
    random?: boolean,
    color?: {
        brightness: number,
        color?: number[]
        colorRange?: number
    }
}
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
    songSettings:SongSetting[],
    selectedSetting: number
}
export interface Wave {
    color: string,
    animationDuration: string,
    animationDelay: string,
}

export interface Song {
    id: string
    URL: string
    tempo: number
    metaData: any
    cover: string
    duration: number
    sampleRate: number
    // spectre:       {
    //     min: number[]
    //     max: number[]
    //     median: number[]
    // }[]
    // RMS: {
    //     min: number
    //     max: number
    //     median: number
    // }[]
    // RMSMax: number
    // RMSMin: number
    // centroid: {
    //     min: number
    //     max: number
    //     median: number
    // }
    // centroidMax: number
    // centroidMin: number
    // rgb?: any
}
