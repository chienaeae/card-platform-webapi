export interface IGuardResult {
    succeeded: boolean;
    message?: string;
}

export interface IGuardArgument {
    argument: any;
    argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
    public static againstNullOrUndefined(argument: any, argumentName: string): IGuardResult {
        if (argument === null || argument === undefined) {
            return {
                succeeded: false,
                message: `${argumentName} is null or undefined`
            }
        } else {
            return {succeeded: true}
        }
    }

    public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
        for (let arg of args) {
            const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
            if (!result.succeeded) return result;
        }
        return {succeeded: true}
    }

    public static isOneOf(value: any, validValues: any[], argumentName: string): IGuardResult {
        let isValid = false;
        validValues.forEach(validValue => {
            if (value === validValue) {
                isValid = true;
            }
        })
        if (isValid) {
            return {succeeded: true}
        } else {
            return {
                succeeded: false,
                message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".`
            }
        }
    }

}