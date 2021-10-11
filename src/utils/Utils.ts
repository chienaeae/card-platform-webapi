import {UrlWithParsedQuery, parse} from "url";

export class Utils {

    public static parseUrl(url: string): UrlWithParsedQuery{
        if(!url) {
            throw new Error('Empty url!');
        }

        console.log('Hello World')

        return parse(url, true);
    }

    public static toUpperCase(arg: string){
        return arg.toUpperCase();
    }
}