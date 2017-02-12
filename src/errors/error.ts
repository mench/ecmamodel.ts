export class Exception {
    private message:any | string;
    constructor (message?:any) {
        this.message = message;
        Error.apply(this, arguments);
    }
}
