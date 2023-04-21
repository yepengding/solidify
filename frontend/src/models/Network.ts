/**
 * Response data type
 */
export type ResponseData<T> = {
    message: string,
    data: T,
    success: boolean
}

/**
 * Response util class
 */
export class Response {
    public static success<T>(data: T): ResponseData<T> {
        return {
            message: "ok",
            data: data,
            success: true
        }
    }

    public static failure(message: string): ResponseData<null> {
        return {
            message: message,
            data: null,
            success: false
        }
    }

}
