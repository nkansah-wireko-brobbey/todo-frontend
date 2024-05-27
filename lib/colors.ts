import { text } from "stream/consumers";

const colors: Color[] = [
    {
        name:"Green",
        id:1,
        color:'bg-green-200',
        textColor:'text-green-700',

    },
    {
        name:"Red",
        id:2,
        color:'bg-red-200',
        textColor:'text-red-700',

    },
    {
        name:"Blue",
        id:3,
        color:'bg-blue-200',
        textColor:'text-blue-700',

    },
    {
        name:"Yellow",
        id:4,
        color:'bg-yellow-200',
        textColor:'text-yellow-700',

    },
    {
        name:"Gray",
        id:9,
        color:'bg-gray-200',
        textColor:'text-gray-700',

    }
]

export const getColor = (id: number|undefined): Color => {
    let color = colors.find((color) => color.id === id);
    return (color)?color:colors[4]; // default
}

export default colors

export type Color = {
    name: string;
    id: number;
    color: string;
    textColor: string;
}