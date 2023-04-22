export type Record = {
    id: number,
    content: string
}


export const isRecord = (object: any): object is Record => {
    return Object.keys(object).length === 2 && "id" in object && typeof object.id === "number" && "content" in object && typeof object.content === "string"
}

