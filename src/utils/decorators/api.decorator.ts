/**
 * Turns a simple ApiEndpoint definition into a usable Serverless endpoint
 * 
 * @param args 
 */
export const ApiEndpoint = (args) => {
    return (
        target: any,
        prop: string
    ): void => {
        let val = target[prop];

        const getter = () =>  {
            return val;
        };

        const setter = (next) => {
            val = {
                handler: `src/${next.service}.${args.provider}`,
                events: [
                    {
                        http: {
                            method: args.method,
                            path: `${next.path}${args.path}`,
                            cors: {
                                origin: '*',
                                headers: [
                                    'Content-Type',
                                    'X-Amz-Date',
                                    'Authorization',
                                    'X-Api-Key',
                                    'X-Amz-Security-Token',
                                    'X-Amz-User-Agent',
                                    'authorizationToken'
                                ]
                            },
                            authorizer: {
                                type: "aws_iam"
                            }
                        }
                    }
                ],
                ...args.custom
            };
        };

        Object.defineProperty(target, prop, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}

/**
 * Builds the controller
 * 
 * @param path 
 */
export function Controller(path): any {
    return (
        CurrentController
    ) => {
        let newController = {};
        let controller = new CurrentController();
        controller.path = path;

        Object.getOwnPropertyNames(CurrentController.prototype).forEach(ApiEndpoint => {
            const controllerParams = ['path', 'constructor', 'service'];
            if(controllerParams.includes(ApiEndpoint)) return;
            
            controller[ApiEndpoint] = {
                service: controller.service,
                path
            }

            newController[ApiEndpoint] = controller[ApiEndpoint];
        });

        return newController;
    }
}

/**
 * Merges the controller list
 * 
 * @param props 
 */
export const Module = (props) => {
    return (
        _constructor
    ) => {
        let module: any = {};

        props.controllers.forEach(CurrentController => {
            module = {
                ...module,
                ...CurrentController
            }
        });
        return module;
    };
}
