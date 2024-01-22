

export default function (r:number, g:number, b:number) {
    const componentToHex = (c:number) => {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}