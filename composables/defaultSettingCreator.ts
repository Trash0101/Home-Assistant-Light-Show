import type {Setting} from "~/types/types";

export default function ( duration:number, sampleRate:number):Setting {
    return {
        beat: 1,
        random: false,
        timeRange: [0, Math.floor(duration)],
        ranges:
            {
                color: {
                    brightness: [0, 255],
                    random: false,
                    octaves: true,
                    range: false,
                    colors: [
                        [255, 0, 0],
                        [255, 127, 0],
                        [255, 255, 0],
                        [0, 255, 0],
                        [0, 0, 255],
                        [75, 0, 130],
                        [143, 0, 255],
                        [255, 0, 255],
                        [128, 0, 128],
                        [255, 85, 255],
                        [165, 42, 42],
                        [192, 192, 192],
                    ],
                    colorRanges: [[0,360],[0,360],[0,360],[0,360],[0,360],[0,360],[0,360],[0,360],[0,360],[0,360],[0,360],[0,360],]
                },
                darkness: {
                    frequency: [0, Math.round((sampleRate / 2) * 0.25)],
                    difference: Math.round((sampleRate / 2) * 0.1)
                },
                flash: {
                    frequency: [Math.round(sampleRate / 2) - Math.round((sampleRate / 2) * 0.25), Math.round(sampleRate / 2)],
                    difference: Math.round((sampleRate / 2) * 0.1)
                }
            }
    }
}